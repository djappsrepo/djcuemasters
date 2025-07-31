import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@11.1.0?target=deno";
import { corsHeaders } from "../_shared/cors.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.44.2';

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") as string, {
  apiVersion: "2023-10-16",
  httpClient: Stripe.createFetchHttpClient(),
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const signature = req.headers.get("Stripe-Signature");
    const body = await req.text();
    const event = await stripe.webhooks.constructEventAsync(
      body,
      signature!,
      Deno.env.get("STRIPE_WEBHOOK_SIGNING_SECRET")!
    );

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        const requestId = paymentIntent.metadata.request_id;

        if (!requestId) {
          throw new Error("Request ID faltante en los metadatos del PaymentIntent");
        }

        const supabaseAdmin = createClient(
          Deno.env.get('VITE_SUPABASE_URL')!,
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        );

        const { error } = await supabaseAdmin
          .from('music_requests')
          .update({ payment_status: 'completed' })
          .eq('id', requestId);

        if (error) {
          throw new Error(`Error al actualizar la solicitud de música: ${error.message}`);
        }

        console.log(`Solicitud ${requestId} actualizada a 'completed'.`);
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
});
