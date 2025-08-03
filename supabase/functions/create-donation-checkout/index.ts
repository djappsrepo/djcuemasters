import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'
import Stripe from 'https://esm.sh/stripe@10.17.0?target=deno'

// Inicializa Stripe con la clave secreta obtenida de las variables de entorno de Supabase.
// ¡Asegúrate de añadir STRIPE_SECRET_KEY a tus secretos en el dashboard de Supabase!
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  // @ts-expect-error: La API de Deno es compatible con la de fetch, pero los tipos de TypeScript no coinciden exactamente.
  httpClient: Stripe.createFetchHttpClient(),
  apiVersion: '2024-04-10',
})

serve(async (req) => {
  // Manejo de la solicitud pre-vuelo (preflight) de CORS.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { amount, djEmail } = await req.json()

    // Validación básica de los datos de entrada
    if (!amount || typeof amount !== 'number' || amount < 1) {
      return new Response(JSON.stringify({ error: 'La cantidad debe ser un número mayor o igual a 1.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }
    if (!djEmail || typeof djEmail !== 'string') {
        return new Response(JSON.stringify({ error: 'Se requiere el email del DJ.' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        })
      }

    // Crea una sesión de pago en Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donación para CueMasters',
              description: `Apoyo para el DJ: ${djEmail}`,
            },
            unit_amount: Math.round(amount * 100), // El monto debe estar en centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // URLs a las que Stripe redirigirá al usuario después del pago.
      // ¡Asegúrate de que estas rutas existan en tu aplicación React!
      success_url: `${Deno.env.get('SITE_URL')}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${Deno.env.get('SITE_URL')}/dashboard`,
      // Almacenamos el email del DJ en los metadatos para usarlo en el webhook después.
      metadata: {
        dj_email_for_raffle: djEmail,
      },
    })

    return new Response(JSON.stringify({ sessionId: session.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error creating Stripe session:', error)
    return new Response(JSON.stringify({ error: 'Hubo un problema al crear la sesión de pago.' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
