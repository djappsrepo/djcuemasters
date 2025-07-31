Plataforma de Solicitudes Musicales para DJs

## 🎯 Objetivo General:
Desarrollar una plataforma web que funcione como una herramienta para DJs, donde los asistentes a un evento puedan hacer solicitudes de canciones con opción de propina. La plataforma prioriza las canciones según el monto donado, y cada DJ tiene un panel de administración personalizado para gestionar las solicitudes en tiempo real. Además, el sistema solo es accesible por DJs invitados o registrados, y el acceso completo al sistema lo controla el desarrollador (el usuario de este prompt).

## 🛠️ Stack Tecnológico:
- Frontend: React + TailwindCSS + ShadCN/UI
- Backend: Supabase (PostgreSQL, Auth, RLS)
- Pagos: Stripe (para propinas y suscripciones)
- Panel personalizado por DJ
- Roles separados por DJ, Cliente y Desarrollador

El objetivo es crear una experiencia fluida y atractiva tanto para los DJs, que pueden gestionar sus eventos y monetizar su trabajo, como para la audiencia, que puede interactuar directamente con la música.

---

## 🚀 Cómo Empezar

Para configurar el entorno de desarrollo local, sigue estos pasos.
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
