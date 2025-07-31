Plataforma de Solicitudes Musicales para DJs

## 🎯 Objetivo General:
Desarrollar una plataforma web que funcione como una herramienta para DJs, donde los asistentes a un evento puedan hacer solicitudes de canciones con opción de propina. La plataforma prioriza las canciones según el monto donado, y cada DJ tiene un panel de administración personalizado para gestionar las solicitudes en tiempo real. Además, el sistema solo es accesible por DJs invitados o registrados, y el acceso completo al sistema lo controla el desarrollador (el usuario de este prompt).

## 🛠️ Stack Tecnológico:
- Frontend: React + TailwindCSS + ShadCN/UI
- Backend: Supabase (PostgreSQL, Auth, RLS)
- Pagos: Stripe (para propinas y suscripciones)
- Panel personalizado por DJ
- Roles separados por DJ, Cliente y Desarrollador
- Multitenencia asegurada vía RLS y filtros por DJ

## 🔐 Subscripción y acceso:
- Solo el desarrollador (yo) tiene acceso al panel de configuración global y monetización (Stripe).
- El acceso de los DJs está condicionado a invitación o registro.
- Sistema de suscripciones con prueba gratuita (3 días) solo para el desarrollador/administrador (no para DJs).
- Planes disponibles: prueba gratis (3 días), 1 mes, 3 meses, 6 meses y 1 año.
- Integración con Stripe para estos planes, con lógica de expiración y renovación.

## 🧩 Flujos principales:
1. **DJ**
   - Se registra e inicia sesión
   - Accede a un panel de control personalizado
   - Gestiona solicitudes, prioriza por monto, marca como reproducidas
   - Historial por evento, configura monto mínimo de propina, etc.

2. **Cliente (Asistente al evento)**
   - Escanea un código QR o accede por enlace
   - Envía una solicitud con nombre de canción y propina
   - Solicitudes se ordenan por monto y se actualiza el estado (en cola, reproducida, archivada)

3. **Administrador (Desarrollador)**
   - Accede al panel global
   - Visualiza estadísticas generales, usuarios, y gestiona Stripe

## 🖥️ Página de Inicio (index.tsx)
Incluye:
- Explicación clara de qué es la plataforma
- Flujo DJ ↔ Cliente
- Beneficios para el DJ: monetización, control, organización
- Beneficios para el Cliente: interacción simple, posibilidad de destacar su solicitud
- Aclaración: herramienta **exclusiva para DJs**

## 💵 Detalles de Propina y Pagos:
- Monto mínimo: $2 USD (configurable)
- Pagos vía Stripe
- Webhooks actualizan estado del pago

## 🔐 Seguridad y roles:
- Supabase Auth
- Roles: `admin`, `dj`, `cliente`
- RLS: acceso restringido según el usuario

## 📈 Dashboard del DJ:
- Lista con nombre cliente, canción, artista, monto, estado, hora
- Acciones: marcar como reproducida, archivar, eliminar
- Configuración avanzada

## 🌐 Opcionales:
- Proyección pública de la cola
- Modo oscuro
- Notificaciones sonoras

## 🚀 Primeros Pasos

Sigue estos pasos para levantar el entorno de desarrollo local:

```sh
# 1. Clona el repositorio
git clone <URL_DEL_REPOSITORIO>

# 2. Navega al directorio del proyecto
cd cuemastersdjapp

# 3. Instala las dependencias
npm install

# 4. Inicia el servidor de desarrollo
npm run dev
```
