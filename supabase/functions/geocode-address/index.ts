import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { address } = await req.json()
    if (!address) {
      throw new Error('La dirección es requerida.')
    }

    const encodedAddress = encodeURIComponent(address)
    const url = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1`

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'CueMastersDJApp/1.0 (djappsrepoupport@outlook.es)'
      }
    });

    if (!response.ok) {
      throw new Error(`Error en el servicio de geocodificación: ${response.statusText}`)
    }

    const data = await response.json()

    if (data.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No se encontraron coordenadas para la dirección proporcionada.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
      )
    }

    const { lat, lon } = data[0];

    return new Response(
      JSON.stringify({ latitude: parseFloat(lat), longitude: parseFloat(lon) }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
