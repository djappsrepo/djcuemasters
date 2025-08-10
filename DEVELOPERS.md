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
├── public/           # Archivos estáticos (iconos, fuentes)
├── src/
│   ├── assets/         # Imágenes y otros recursos
│   ├── components/     # Componentes React reutilizables
│   │   ├── dj/           # Componentes específicos para el panel del DJ
│   │   ├── layout/       # Componentes de estructura (Header, Footer)
│   │   ├── page-components/ # Componentes grandes para páginas específicas
│   │   └── ui/           # Componentes base de ShadCN (Button, Card, etc.)
│   ├── contexts/       # Contextos de React (Ej: AuthContext)
│   ├── hooks/          # Hooks personalizados
│   ├── integrations/   # Lógica para conectar con servicios externos (Supabase)
│   ├── lib/            # Funciones de utilidad (Ej: cn para clases)
│   ├── pages/          # Componentes que representan una página/ruta
│   └── tests/          # Archivos de prueba (Vitest)
├── supabase/
│   └── migrations/     # Migraciones de la base de datos
└── ...                 # Archivos de configuración (vite.config.ts, package.json, etc.)
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
