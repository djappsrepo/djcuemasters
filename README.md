# CueMasters DJ

CueMastersDJ es una plataforma web moderna diseñada para conectar a DJs con clientes. Los DJs pueden crear perfiles, gestionar eventos y recibir solicitudes, mientras que los clientes pueden descubrir y contratar talento local basado en la geolocalización.

## Stack Tecnológico

Este proyecto está construido con un stack moderno y escalable:

- **Frontend:** React, Vite, TypeScript
- **Backend & Base de Datos:** Supabase (PostgreSQL, Auth, Edge Functions)
- **Estilos:** TailwindCSS y Shadcn/UI
- **Componentes UI:** Radix UI
- **Calidad de Código:** ESLint, Prettier

---

## Calidad de Código y Auditoría

Se ha implementado un sistema robusto de auditoría de código utilizando **ESLint** para garantizar un código limpio, consistente y libre de errores.

### Proceso de Auditoría

El proceso de `linting` está configurado para analizar todos los archivos TypeScript y JavaScript del proyecto, ignorando directorios de builds y dependencias para mayor eficiencia.

**Para ejecutar la auditoría, utiliza el siguiente comando:**

```bash
npm run lint
```

Este comando generará un reporte detallado en el archivo `lint-report.json`, permitiendo un análisis exhaustivo de cualquier error o advertencia sin las limitaciones de la salida del terminal.

### Refactorización y Buenas Prácticas

Recientemente, se completó una auditoría completa que resultó en la refactorización de varios componentes de la UI. La principal mejora fue la **separación de responsabilidades**, moviendo la lógica de negocio (hooks) y las variantes de estilo (CVA) fuera de los archivos de componentes. Esto no solo soluciona advertencias de `linting` relacionadas con el "Fast Refresh" de Vite, sino que también promueve un código más limpio, modular y fácil de mantener.

---

## Scripts Disponibles

En el archivo `package.json`, encontrarás varios scripts útiles:

- `npm run dev`: Inicia el servidor de desarrollo local.
- `npm run build`: Compila la aplicación para producción.
- `npm run lint`: Ejecuta la auditoría de código con ESLint.
- `npm run preview`: Previsualiza la build de producción localmente.

## ✨ Características Principales

- **Panel de DJ Personalizado:** Cada DJ tiene acceso a un dashboard para gestionar eventos, moderar solicitudes y visualizar ingresos.
- **Sistema de Propinas:** Las solicitudes pueden incluir propinas, incentivando una mayor interacción y monetización para el DJ.
- **Gestión en Tiempo Real:** Las solicitudes aparecen instantáneamente en el panel del DJ, permitiendo una gestión fluida durante el evento.
- **Autenticación Segura:** Sistema de roles (DJ, Invitado, Admin) gestionado con Supabase Auth y Row Level Security (RLS).
- **Interfaz Moderna:** Construido con React, TypeScript y Tailwind CSS, utilizando componentes de ShadCN/UI para una experiencia de usuario profesional.

## 🛠️ Stack Tecnológico

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, ShadCN/UI
- **Backend & Base de Datos:** Supabase (PostgreSQL, Auth, RLS)
- **Pagos:** Stripe para la gestión de propinas.
- **Animaciones:** Framer Motion para una UI más dinámica.

## 📂 Estructura del Proyecto

El proyecto sigue una arquitectura modular y escalable con separación clara de responsabilidades. Cada directorio tiene un propósito específico para facilitar el mantenimiento y la escalabilidad.

### 🗂️ Directorio Raíz (`src/`)

```
src/
├── 📁 assets/                    # Recursos estáticos
├── 📁 components/               # Componentes React reutilizables
├── 📁 contexts/                 # Contextos de React para estado global
├── 📁 hooks/                    # Custom hooks reutilizables
├── 📁 integrations/             # Integraciones con servicios externos
├── 📁 lib/                      # Utilidades y configuraciones
├── 📁 pages/                    # Componentes de página principales
├── 📁 providers/                # Proveedores de contexto
├── 📁 router/                   # Configuración de rutas
├── 📄 App.tsx                   # Componente raíz de la aplicación
├── 📄 main.tsx                  # Punto de entrada de la aplicación
├── 📄 index.css                 # Estilos globales
└── 📄 vite-env.d.ts            # Definiciones de tipos para Vite
```

### 📦 Desglose Detallado por Directorio

#### 🎨 `assets/` - Recursos Estáticos
```
assets/
├── cuemastersdj_logo_eq_animated.svg    # Logo animado principal
├── dj-hero.jpg                          # Imagen de fondo principal
└── dj-icon.jpg                          # Icono de DJ
```

#### 🧩 `components/` - Componentes React (92 archivos)
```
components/
├── 📁 admin/                    # Componentes del panel administrativo
│   ├── StatCards.tsx           # Tarjetas de estadísticas
│   └── UserTable.tsx           # Tabla de gestión de usuarios
├── 📁 auth/                     # Componentes de autenticación
│   ├── LoginForm.tsx           # Formulario de inicio de sesión
│   └── RegisterForm.tsx        # Formulario de registro
├── 📁 dashboard/                # Componentes del dashboard
│   ├── ClientView.tsx          # Vista para clientes
│   └── DjView.tsx              # Vista para DJs
├── 📁 discovery/                # Componentes de descubrimiento
│   └── DJDiscovery.tsx         # Búsqueda y filtrado de DJs
├── 📁 dj/                       # Componentes específicos para DJs (11 archivos)
│   ├── DJEventForm.tsx         # Formulario de eventos
│   ├── DJEventManager.tsx      # Gestor de eventos
│   ├── DJProfileSetup.tsx      # Configuración de perfil
│   ├── DJQRCodeSection.tsx     # Sección de código QR
│   ├── DJRequestsQueue.tsx     # Cola de solicitudes
│   ├── DJStatsCards.tsx        # Tarjetas de estadísticas
│   └── DeleteAccountSection.tsx # Eliminación de cuenta
├── 📁 donations/                # Sistema de donaciones
│   └── DonationButton.tsx      # Botón de donación
├── 📁 layout/                   # Componentes de layout
│   ├── Footer.tsx              # Pie de página
│   ├── Header.tsx              # Cabecera de navegación
│   ├── LoadingScreen.tsx       # Pantalla de carga
│   └── WelcomeModal.tsx        # Modal de bienvenida
├── 📁 page-components/          # Componentes específicos de páginas
│   ├── 📁 home/                # Componentes de la página principal (10 archivos)
│   │   ├── BenefitsSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── PricingSection.tsx
│   │   └── ...
│   └── 📁 request/             # Componentes de solicitudes (3 archivos)
│       ├── CheckoutForm.tsx
│       ├── DjProfileCard.tsx
│       └── RequestForm.tsx
└── 📁 ui/                       # Componentes UI reutilizables (40+ archivos)
    ├── UnifiedLoader.tsx       # ✨ Componente de carga unificado
    ├── button.tsx              # Botones con variantes
    ├── card.tsx                # Tarjetas
    ├── form.tsx                # Formularios
    ├── input.tsx               # Campos de entrada
    └── ...                     # Más componentes UI de ShadCN
```

#### 🔗 `contexts/` - Gestión de Estado Global
```
contexts/
└── AuthContext.tsx             # Contexto de autenticación con tipos Supabase
```

#### 🎣 `hooks/` - Custom Hooks (22 archivos)
```
hooks/
├── use-dj-*.ts                 # Hooks específicos para funcionalidades DJ
├── use-form-field.ts           # Hook para campos de formulario
├── use-mobile.tsx              # Hook para detección móvil
├── use-toast.ts                # Hook para notificaciones
├── useAuth.ts                  # ❌ ELIMINADO - Hook de autenticación duplicado
├── useCheckoutForm.ts          # Hook para formularios de pago
├── useDJEvents.ts              # Hook para eventos de DJ
├── useDJProfileSetup.ts        # Hook para configuración de perfil
└── ...                         # Más hooks especializados
```

#### 🔌 `integrations/` - Servicios Externos
```
integrations/
└── supabase/
    ├── client.ts               # Cliente de Supabase configurado
    └── types.ts                # Tipos generados automáticamente
```

#### 🛠️ `lib/` - Utilidades
```
lib/
└── utils.ts                    # Funciones utilitarias (cn, clsx)
```

#### 📄 `pages/` - Páginas Principales (13 archivos)
```
pages/
├── AdminDashboard.tsx          # Panel administrativo
├── AuthPage.tsx                # Página de autenticación
├── Dashboard.tsx               # Dashboard principal
├── DashboardContent.tsx        # Contenido del dashboard
├── DiscoveryPage.tsx           # Página de descubrimiento
├── LandingPage.tsx             # Página de inicio
├── NotFound.tsx                # Página 404
├── PaymentSuccessPage.tsx      # Confirmación de pago
├── RequestPage.tsx             # Página de solicitudes
└── ...                         # Más páginas
```

#### 🎯 `providers/` - Proveedores de Contexto
```
providers/
└── AuthProvider.tsx            # ✨ Proveedor de autenticación refactorizado
```

#### 🛣️ `router/` - Configuración de Rutas
```
router/
└── AdminRoute.tsx              # Rutas protegidas para administradores
```

### 🧹 Optimizaciones Recientes

#### ✅ **Componentes de Loading Consolidados**
- **Antes:** 3 componentes separados (`GenericLoader`, `LoadingSpinner`, `PageLoader`)
- **Ahora:** 1 componente unificado (`UnifiedLoader`) con 4 variantes configurables:
  - `page` - Carga de página completa
  - `inline` - Carga en línea
  - `spinner` - Spinner simple
  - `logo` - Con logo animado

#### ✅ **Limpieza de Componentes UI**
- **Componentes utilizados:** 40 de 51 componentes UI
- **Componentes eliminados:** 11 componentes no utilizados
- **Resultado:** Reducción del bundle size y mejor mantenibilidad

#### ✅ **Eliminación de Duplicados**
- **Eliminado:** `src/hooks/useAuth.ts` (duplicado)
- **Mantenido:** `useAuth` hook en `AuthContext.tsx` (fuente única de verdad)

### 🔧 Patrones de Arquitectura

#### **Separación de Responsabilidades**
- **Componentes UI:** Solo presentación y interacción
- **Hooks:** Lógica de negocio y estado
- **Contexts:** Estado global compartido
- **Pages:** Composición de componentes

#### **Gestión de Tipos**
- **Fuente única:** Tipos generados automáticamente desde Supabase
- **Consistencia:** Todos los componentes usan los mismos tipos
- **Mantenibilidad:** Cambios en BD se reflejan automáticamente

#### **Importaciones Organizadas**
- **Alias de ruta:** `@/` apunta a `src/`
- **Imports relativos:** Solo para archivos en el mismo directorio
- **Barrel exports:** Centralizados donde sea apropiado

## 🚀 Cómo Empezar

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local:

```sh
# 1. Clona el repositorio
git clone https://github.com/djappsrepo/djcuemasters.git

# 2. Navega al directorio del proyecto
cd cuemastersdjapp

# 3. Instala las dependencias
npm install

# 4. Inicia el servidor de desarrollo
npm run dev
```

## 🚀 Changelog - v1.1.0 (02/08/2025)

Esta versión introduce una renovación completa de la identidad visual y la experiencia de usuario, junto con mejoras significativas en la estabilidad.

- **✨ Rebranding y Nuevo Logo Animado:**
  - Se actualizó toda la marca de la aplicación a **CueMasters**.
  - Se reemplazó el ícono estático por un **logo SVG animado** que ahora se utiliza como favicon y en la cabecera, proporcionando una identidad visual moderna y dinámica.

- **🎨 Mejoras de Interfaz de Usuario (UI/UX):**
  - **Fondo Global Consistente:** Se implementó una imagen de fondo (`dj-hero.jpg`) en toda la aplicación con un overlay oscuro para mejorar la legibilidad.
  - **Efecto "Glassmorphism":** Se unificó el estilo de las tarjetas en la página principal con un efecto de vidrio esmerilado (fondo semitransparente y `backdrop-blur`) para una apariencia cohesiva y moderna.
  - **Pantalla de Carga Profesional:** Se añadió una nueva pantalla de carga animada que se muestra al iniciar la aplicación, mejorando la percepción de rendimiento y la experiencia del usuario.

- **🐛 Corrección de Errores Críticos:**
  - Se solucionaron errores de sintaxis en `App.tsx` que impedían el correcto renderizado de la aplicación.
  - Se corrigieron problemas de despliegue relacionados con la configuración del componente principal.

## 📄 Changelog - v1.0.2 (31/07/2025)

- **Developer:** Ing. Juan Carlos Mendez N. (dj wacko)

## 📄 Changelog - v1.0.1 (31/07/2025)

- **Refactorización de la Página de Inicio:** Se unificaron `LandingPage.tsx` y `Index.tsx` en una sola página modular y reutilizable.
- **Componentes Modulares:** Se refactorizaron las secciones de la página de inicio (`Hero`, `HowItWorks`, etc.) en componentes independientes y animados.
- **Tipos Centralizados:** Se creó un archivo `src/types/index.ts` para centralizar las interfaces (`DJProfile`, `DJEvent`) y eliminar la duplicidad.
- **Auditoría y Limpieza:** Se eliminaron archivos redundantes y se corrigieron rutas de importación en todo el proyecto.
