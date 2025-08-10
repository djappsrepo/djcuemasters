import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@11.1.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.0.0';

// Get the Stripe webhook signing secret from environment variables.
const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SIGNING_SECRET');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Stripe.
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2022-11-15',
  httpClient: Stripe.createFetchHttpClient(),
});

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const signature = req.headers.get('Stripe-Signature');
  const body = await req.text();

  let event: Stripe.Event;
  try {
    if (!signature || !stripeWebhookSecret) {
      throw new Error('Missing Stripe signature or webhook secret.');
    }
    event = await stripe.webhooks.constructEventAsync(body, signature, stripeWebhookSecret);
  } catch (err) {
    console.error(`Error verifying webhook signature: ${err.message}`);
    return new Response(JSON.stringify({ error: `Webhook signature verification failed: ${err.message}` }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const djId = session.metadata?.djId;
    const amount = session.amount_total;
    const stripePaymentId = session.payment_intent as string;
    // IMPORTANT: For a real app, you'd get the logged-in user's ID.
    // For this example, we'll use a placeholder or the customer ID from Stripe if it exists.
    const donatorId = session.customer ? session.customer.toString() : 'anonymous_user';

    if (!djId || !amount || !stripePaymentId) {
      return new Response(JSON.stringify({ error: 'Missing required session data.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    try {
      // Create a Supabase client with the service role key
      const supabaseAdmin = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      );

      const { error } = await supabaseAdmin.from('donations').insert({
        dj_id: djId,
        donador_id: donatorId, // Placeholder
        monto: amount / 100, // Convert from cents to dollars/euros/etc.
        stripe_payment_id: stripePaymentId,
      });

      if (error) {
        throw new Error(`Supabase DB Error: ${error.message}`);
      }

    } catch (dbError) {
      console.error(dbError.message);
      return new Response(JSON.stringify({ error: dbError.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
