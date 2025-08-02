# Pasos para Desplegar la Función `geocode-address` Manualmente

Esta guía explica cómo desplegar la Edge Function `geocode-address` directamente desde el panel de control de Supabase, sin usar la línea de comandos.

### Paso 1: Ir a la Sección de Edge Functions

1.  Abre tu proyecto en [supabase.com](https://supabase.com).
2.  En el menú de la izquierda, busca el icono de un rayo (⚡) que dice **Edge Functions**. Haz clic ahí.

### Paso 2: Crear la Nueva Función

1.  Haz clic en el botón **"Create a new function"**.
2.  En el campo del nombre, escribe exactamente: `geocode-address`
3.  Haz clic en **"Create function"**.

### Paso 3: Copiar y Pegar el Código

Se abrirá un editor de código en tu navegador. Borra todo el contenido que aparezca por defecto y **pega el siguiente código en su lugar**:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

// Headers CORS incluidos directamente para simplificar el despliegue manual
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

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
```

### Paso 4: Guardar y Desplegar

1.  Asegúrate de que el código que pegaste es el único contenido en el editor.
2.  Haz clic en el botón **"Save and Deploy"** (Guardar y Desplegar) que está en la esquina superior derecha.

¡Listo! La función estará activa en la nube y lista para ser usada por la aplicación. 