import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'
// @ts-expect-error - La librería de Stripe no tiene tipos para Deno, pero funciona.
import stripe from 'https://esm.sh/stripe@11.1.0?target=deno'

console.log(`Function 'create-payment-intent' up and running!`);

const stripeClient = stripe(Deno.env.get('STRIPE_SECRET_KEY'))

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { amount, requestId, currency = 'usd' } = await req.json()

    if (!amount || !requestId) {
      throw new Error('Amount and Request ID are required.');
    }

    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects amount in cents
      currency: currency,
      automatic_payment_methods: { enabled: true },
      metadata: { request_id: requestId },
    });

    return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
