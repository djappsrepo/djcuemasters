# Guía para Desarrolladores de CueMastersDJApp

Bienvenido al equipo de desarrollo de CueMastersDJApp (también conocido como CueFlow). Este documento proporciona una visión general de la arquitectura del proyecto, la estructura de directorios y las convenciones utilizadas.

## Tech Stack

- **Framework:** React (con Vite)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Componentes UI:** ShadCN
- **Backend & Base de Datos:** Supabase
- **Gestor de Paquetes:** pnpm
- **Testing:** Vitest + React Testing Library

## Cómo Empezar

1.  **Clonar el repositorio:**
    ```bash
    git clone git@github.com:djappsrepo/djcuemasters.git
    cd cuemastersdjapp
    ```

2.  **Instalar dependencias:** Asegúrate de tener `pnpm` instalado. Este proyecto lo utiliza como único gestor de paquetes.
    ```bash
    pnpm install
    ```

3.  **Configurar Supabase:** Crea un archivo `.env` en la raíz del proyecto y añade las variables de entorno para tu instancia de Supabase:
    ```
    VITE_SUPABASE_URL=URL_DE_TU_PROYECTO_SUPABASE
    VITE_SUPABASE_ANON_KEY=TU_ANON_KEY
    ```

4.  **Ejecutar el servidor de desarrollo:**
    ```bash
    pnpm dev
    ```

## Estructura de Directorios

La estructura del proyecto está organizada para separar claramente las responsabilidades y facilitar la escalabilidad.

```
cuemastersdjapp/
├── public/                    # Archivos estáticos (iconos, fuentes, manifest)
├── src/
│   ├── assets/                # Imágenes y recursos multimedia
│   │   ├── dj-hero.jpg       # Imagen de fondo principal
│   │   ├── dj-icon.jpg       # Icono del DJ
│   │   └── logo.svg          # Logo animado SVG
│   ├── components/            # Componentes React reutilizables
│   │   ├── admin/            # Componentes del panel administrativo (2 archivos)
│   │   │   ├── AdminStats.tsx
│   │   │   └── UserManagement.tsx
│   │   ├── auth/             # Componentes de autenticación (2 archivos)
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── dashboard/        # Componentes del dashboard (3 archivos)
│   │   │   ├── DashboardStats.tsx
│   │   │   ├── EventsList.tsx
│   │   │   └── QuickActions.tsx
│   │   ├── discovery/        # Componentes de descubrimiento (1 archivo)
│   │   │   └── DJCard.tsx
│   │   ├── dj/               # Componentes específicos para DJs (7 archivos)
│   │   │   ├── DJEventForm.tsx
│   │   │   ├── DJProfileSetup.tsx
│   │   │   ├── DJQRCodeSection.tsx
│   │   │   ├── DJStatsCards.tsx
│   │   │   ├── DeleteAccountSection.tsx
│   │   │   ├── EventCard.tsx
│   │   │   └── RequestCard.tsx
│   │   ├── layout/           # Componentes de estructura (5 archivos)
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── LoadingScreen.tsx  # Pantalla de carga con logo animado
│   │   │   ├── MainLayout.tsx
│   │   │   └── WelcomeModal.tsx
│   │   ├── page-components/  # Componentes específicos por página
│   │   │   ├── home/         # Componentes de la página principal (8 archivos)
│   │   │   │   ├── BenefitsSection.tsx
│   │   │   │   ├── CtaSection.tsx
│   │   │   │   ├── FeatureCard.tsx
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── HowItWorksSection.tsx
│   │   │   │   ├── MusicWave.tsx
│   │   │   │   ├── PricingCard.tsx
│   │   │   │   └── PricingSection.tsx
│   │   │   └── request/      # Componentes de solicitudes (3 archivos)
│   │   │       ├── CheckoutForm.tsx
│   │   │       ├── DjProfileCard.tsx
│   │   │       └── RequestForm.tsx
│   │   └── ui/               # Componentes base de ShadCN (55 archivos)
│   │       ├── button.tsx, card.tsx, input.tsx, etc.
│   │       ├── GenericLoader.tsx     # Loader genérico reutilizable
│   │       ├── PageLoader.tsx        # Loader específico para páginas
│   │       └── toaster.tsx           # Sistema de notificaciones
│   ├── contexts/             # Contextos de React
│   │   ├── AuthContext.tsx   # Contexto principal de autenticación
│   │   └── auth.context.ts   # Tipos del contexto de auth
│   ├── hooks/                # Hooks personalizados
│   │   ├── use-toast.ts      # Hook para notificaciones
│   │   ├── useDJEventForm.ts # Hook para formularios de eventos DJ
│   │   ├── useDJEvents.ts    # Hook para gestión de eventos DJ
│   │   ├── useDJProfileSetup.ts # Hook para configuración de perfil DJ
│   │   └── useDJStats.ts     # Hook para estadísticas DJ
│   ├── integrations/         # Integraciones con servicios externos
│   │   └── supabase/         # Configuración y tipos de Supabase
│   │       ├── client.ts
│   │       └── types.ts
│   ├── lib/                  # Funciones de utilidad
│   │   └── utils.ts          # Utilidades generales (cn para clases)
│   ├── pages/                # Páginas principales (14 archivos)
│   │   ├── AdminDashboard.tsx
│   │   ├── AuthPage.tsx
│   │   ├── BillingPage.tsx
│   │   ├── Dashboard.tsx
│   │   ├── DashboardContent.tsx
│   │   ├── DashboardError.tsx
│   │   ├── DiscoveryPage.tsx
│   │   ├── Index.tsx         # Página principal con fondo dj-hero
│   │   ├── LandingPage.tsx   # Página alternativa con modal de bienvenida
│   │   ├── NotFound.tsx
│   │   ├── PaymentSuccessPage.tsx
│   │   ├── PrivacyPage.tsx
│   │   ├── RequestPage.tsx
│   │   └── TermsPage.tsx
│   ├── router/               # Configuración de rutas
│   │   └── AdminRoute.tsx    # Ruta protegida para administradores
│   ├── types/                # Definiciones de tipos TypeScript
│   │   └── index.ts
│   └── tests/                # Archivos de prueba (Vitest)
├── supabase/
│   └── migrations/           # Migraciones de la base de datos
└── ...                       # Archivos de configuración
```

## Refactorización Realizada

Una de las tareas iniciales más importantes fue la **modularización de la página principal (`src/pages/Index.tsx`)**. Originalmente, contenía todo el JSX de la landing page, lo que la hacía difícil de mantener.

**Acciones realizadas:**

-   Se extrajeron grandes bloques de JSX en componentes independientes y reutilizables.
-   Estos componentes ahora residen en `src/components/page-components/home/`.
-   Los nuevos componentes creados son:
    -   `Header.tsx` y `Footer.tsx` (en `src/components/layout/`)
    -   `HeroSection.tsx`
    -   `HowItWorksSection.tsx`
    -   `BenefitsSection.tsx`
    -   `CtaSection.tsx`
-   `Index.tsx` ahora actúa como un ensamblador de estos componentes, resultando en un código más limpio, legible y fácil de mantener.

## Auditoría de Código Realizada (Enero 2025)

Se realizó una auditoría exhaustiva del código para identificar y corregir inconsistencias, duplicados y problemas de estructura.

### 🔍 **Problemas Identificados y Corregidos:**

#### **1. Inconsistencia en Imports de `useAuth`**
**Problema:** Diferentes archivos importaban `useAuth` desde ubicaciones distintas:
- ❌ `import { useAuth } from "@/hooks/useAuth"`
- ✅ `import { useAuth } from "@/contexts/AuthContext"`

**Solución:** Se unificaron TODOS los imports para usar `@/contexts/AuthContext` como fuente única.

**Archivos corregidos:**
- `src/pages/LandingPage.tsx`
- `src/router/AdminRoute.tsx`
- `src/pages/DashboardError.tsx`
- `src/pages/Dashboard.tsx`
- `src/pages/AuthPage.tsx`
- `src/pages/AdminDashboard.tsx`
- `src/hooks/useDJProfileSetup.ts`
- `src/hooks/useDJEvents.ts`
- `src/hooks/useDJEventForm.ts`
- `src/components/dj/DJStatsCards.tsx`
- `src/components/dj/DJProfileSetup.tsx`
- `src/components/auth/RegisterForm.tsx`
- `src/components/auth/LoginForm.tsx`

#### **2. Archivos Duplicados Eliminados**
- ❌ `src/hooks/useAuth.ts` (duplicado, eliminado)
- ❌ `src/components/ui/use-toast.ts` (duplicado, eliminado previamente)

#### **3. Páginas con Funcionalidad Similar**
- `src/pages/Index.tsx` - Página principal con fondo `dj-hero.jpg`
- `src/pages/LandingPage.tsx` - Página alternativa con `WelcomeModal`

**Decisión:** Se mantienen ambas para diferentes casos de uso.

### 🎯 **Beneficios de la Auditoría:**

1. **Consistencia:** Todos los archivos ahora usan la misma fuente para `useAuth`
2. **Mantenibilidad:** Eliminación de código duplicado
3. **Claridad:** Estructura de directorios bien documentada
4. **Escalabilidad:** Base sólida para futuras funcionalidades

### 📋 **Convenciones Establecidas:**

#### **Imports de Autenticación:**
```typescript
// ✅ CORRECTO - Usar siempre esta importación
import { useAuth } from "@/contexts/AuthContext";

// ❌ INCORRECTO - No usar
import { useAuth } from "@/hooks/useAuth";
```

#### **Estructura de Componentes:**
- **`/components/ui/`** - Componentes base reutilizables (ShadCN)
- **`/components/page-components/`** - Componentes específicos por página
- **`/components/layout/`** - Componentes de estructura (Header, Footer, etc.)
- **`/components/[feature]/`** - Componentes agrupados por funcionalidad

#### **Hooks Personalizados:**
- Todos en `/hooks/` con prefijo `use`
- Importar dependencias desde `@/contexts/` cuando sea necesario
- Documentar parámetros y valores de retorno

### 🚀 **Próximos Pasos Recomendados:**

1. **Testing:** Implementar pruebas unitarias para componentes críticos
2. **Performance:** Optimizar componentes con `React.memo` donde sea necesario
3. **Accessibility:** Revisar y mejorar accesibilidad de componentes UI
4. **Documentation:** Documentar props de componentes complejos
5. **Code Quality:** Configurar pre-commit hooks para ESLint y Prettier
