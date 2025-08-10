
# ComplicesConectaSw — Plan de campaña Beta & Implementación técnica
Fecha de la beta: **15/08/2025 → 22/12/2025**

Este documento contiene todo lo necesario para que tu IA de desarrollo (o cualquier dev) implemente la **campaña de donaciones** con premio por monto, ranking en tiempo real y banner dinámico. Copia y pégalo en tu flujo de trabajo, o usa el paquete ZIP incluido.

---

## Resumen de la mecánica
- Periodo: **15/08/2025** al **22/12/2025**.
- Los usuarios donan a DJs. Las donaciones se almacenan en la tabla `donaciones`.
- Al final de la beta, según el monto total acumulado por DJ, se les asigna una membresía (1 / 3 / 6 / 12 meses).
- Un banner público (o privado dentro de la app) muestra el ranking TOP N y un mensaje tipo: 
  > 🎉 Felicidades DJ Alex — Ganaste una membresía de 3 meses

---

## Reglas de negocio (lógicas)
- Sumar todas las donaciones por `dj_id`.
- Rangos de premios ejemplo (ajustar según moneda / mercado):
  - total >= 1200 → **12 meses**
  - total >= 600 → **6 meses**
  - total >= 300 → **3 meses**
  - total >= 100 → **1 mes**
  - otherwise → sin premio
- El cálculo puede hacerse en SQL (vista) o en el backend (función JS). Mantener la misma regla en ambos lugares.

---

## Esquema de base de datos (Supabase / Postgres)

```sql
-- Tabla de DJs
create table djs (
  id uuid primary key default uuid_generate_v4(),
  nombre text not null,
  foto_url text,
  creado_en timestamp default now()
);

-- Tabla de donaciones
create table donaciones (
  id uuid primary key default uuid_generate_v4(),
  dj_id uuid references djs(id),
  donador text,
  monto numeric(10,2) not null,
  fecha timestamp default now()
);

-- Vista para ranking con premios
create or replace view ranking_djs as
select 
    d.id as dj_id,
    d.nombre,
    d.foto_url,
    coalesce(sum(do.monto),0) as total_donado,
    case 
        when coalesce(sum(do.monto),0) >= 1200 then '12 meses'
        when coalesce(sum(do.monto),0) >= 600 then '6 meses'
        when coalesce(sum(do.monto),0) >= 300 then '3 meses'
        when coalesce(sum(do.monto),0) >= 100 then '1 mes'
        else null
    end as premio
from djs d
left join donaciones do on do.dj_id = d.id
group by d.id, d.nombre, d.foto_url
order by total_donado desc;
```

---

## Endpoints sugeridos (Next.js / API REST)

### `/api/ranking` — devuelve TOP N de DJs con total y premio
```javascript
// pages/api/ranking.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from('ranking_djs')
    .select('*')
    .order('total_donado', { ascending: false })
    .limit(10);

  if (error) return res.status(500).json({ error });

  res.status(200).json(data);
}
```

### Webhook Stripe: guardar donación
```javascript
// pages/api/stripe/webhook.js
import { buffer } from 'micro';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  const sig = req.headers['stripe-signature'];
  const buf = await buffer(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SIGNING_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Asume que en session.metadata viene dj_id y opcionalmente nombre o email
    await supabase.from('donaciones').insert([{
      dj_id: session.metadata.dj_id,
      donador: session.customer_email || session.metadata.donador || 'anon',
      monto: (session.amount_total || 0) / 100
    }]);
  }

  res.json({ received: true });
}
```

---

## Lógica de asignación de premio (JS — alternativa a la vista SQL)

```javascript
function asignarPremio(monto) {
  if (monto >= 1200) return '12 meses';
  if (monto >= 600) return '6 meses';
  if (monto >= 300) return '3 meses';
  if (monto >= 100) return '1 mes';
  return null;
}
```

---

## Banner/Componente (React + Supabase Realtime)

- Este banner consulta `/api/ranking` y se suscribe a cambios en la tabla `donaciones` para actualizarse en tiempo real.

```javascript
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function RankingBanner() {
  const [ranking, setRanking] = useState([]);

  const fetchRanking = async () => {
    const { data, error } = await supabase
      .from('ranking_djs')
      .select('*')
      .order('total_donado', { ascending: false })
      .limit(10);

    if (!error) setRanking(data);
  };

  useEffect(() => {
    fetchRanking();

    const subscription = supabase
      .channel('donaciones-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'donaciones' }, () => {
        fetchRanking();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <div style={{ background: '#111', color: '#fff', padding: '1rem', borderRadius: '8px' }}>
      <h3>🏆 Ranking de Donaciones — Beta 2025 🎶</h3>
      <ul>
        {ranking.map((dj, i) => (
          <li key={dj.dj_id}>
            <strong>{i + 1}. {dj.nombre}</strong> — ${dj.total_donado} MXN 
            {dj.premio && <span> 🎉 {dj.premio} gratis</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Mensajes automáticos / Banner de 'Felicidades'
- Puedes mostrar un banner tipo toast o un bloque fijo cuando el `premio` de un DJ cambie y supere un umbral.
- Ejemplo: en el backend, al insertar una nueva donación calcular el `nuevo_total`. Si `nuevo_premio !== premio_anterior`, emitir un evento (Realtime/WS) con un payload:
```json
{
  "type": "PREMIO_ACTUALIZADO",
  "dj_id": "uuid",
  "nombre": "DJ Alex",
  "premio": "6 meses",
  "total": 650
}
```
- El front escucha y muestra: `🎉 Felicidades DJ Alex — Ganaste una membresía de 6 meses`.

---

## Variables de entorno recomendadas
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SIGNING_SECRET=
```

---

## Pasos de despliegue rápidos
1. Crear proyecto en Supabase y ejecutar scripts SQL anteriores.
2. Configurar Stripe (productos / precios, checkout) y webhook apuntando a `/api/stripe/webhook`.
3. Subir proyecto Next.js a Vercel (o tu host) con variables de entorno.
4. Probar flujo: crear DJ, lanzar checkout con `metadata.dj_id`, completar pago, verificar que `donaciones` se inserta y banner se actualiza.
5. Comunicaciones: anunciar la beta en RRSS y dentro de la app; mostrar reglas y fechas visibles.

---

## Sugerencias de mejora (futuro)
- Mostrar TOP 10 en pantalla grande durante eventos.
- Panel admin para asignar manualmente premios / revisar fraude.
- Logs y verificación con Stripe para evitar donaciones revertidas.
- Soporte multi-moneda y conversión automática.
- Integración de email/SMS para notificar ganadores el 22/12/2025.

---

## Licencia y notas
- Este pack es una guía técnica; ajusta umbrales y textos al idioma/mercado.
- No incluyas claves secretas en el repositorio público.

---

Fin del documento.
