// Supabase Edge Function for Stripe Webhooks

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@11.1.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8';

// WARNING: The linter will complain about 'Deno' and URL imports.
// This is normal for Supabase Edge Functions. The code will run correctly when deployed.

// These variables are automatically provided by the Supabase runtime.
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// These are the secrets you must set in your project dashboard.
const stripeApiKey = Deno.env.get('STRIPE_API_KEY')!;
const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SIGNING_SECRET')!;

// Initialize Stripe
const stripe = new Stripe(stripeApiKey, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

const cryptoProvider = Stripe.createSubtleCryptoProvider();

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

console.log('Stripe Webhook Function Initialized');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const signature = req.headers.get('Stripe-Signature');
  const body = await req.text();

  let receivedEvent: Stripe.Event;
  try {
    receivedEvent = await stripe.webhooks.constructEventAsync(
      body,
      signature!,
      webhookSecret,
      undefined,
      cryptoProvider
    );
    console.log(`✅ Stripe event verified: ${receivedEvent.id}`);
  } catch (err) {
    console.error(`❌ Webhook signature verification failed: ${err.message}`);
    return new Response(err.message, { status: 400 });
  }

  if (receivedEvent.type === 'payment_intent.succeeded') {
    const paymentIntent = receivedEvent.data.object as Stripe.PaymentIntent;
    try {
      const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

      const { user_id } = paymentIntent.metadata;
      if (!user_id) {
        throw new Error('User ID not found in payment intent metadata.');
      }

      const { error } = await supabaseAdmin.from('donations').insert({
        user_id: user_id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        stripe_payment_intent_id: paymentIntent.id,
        status: 'succeeded',
      });

      if (error) {
        console.error('Error inserting donation into Supabase:', error);
        throw error;
      }

      console.log(`Donation for user ${user_id} successfully recorded.`);
    } catch (error) {
      console.error('Error processing payment intent:', error.message);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200, headers: corsHeaders });
});
