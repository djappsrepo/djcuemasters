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

El proyecto sigue una arquitectura modular y escalable. Los componentes de la UI están organizados por funcionalidad (`layout`, `page-components`) para facilitar su mantenimiento y reutilización.

- `src/components/layout`: Componentes estructurales como `Header` y `Footer`.
- `src/components/page-components`: Componentes específicos de cada página (ej. `home`, `request`).
- `src/pages`: Contenedores de página que ensamblan los componentes.
- `src/contexts`: Contextos de React para la gestión del estado global (ej. `AuthContext`).
- `src/types`: Definiciones centralizadas de TypeScript para mantener la consistencia.

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

## 🚀 Changelog - v1.1.1 (06/08/2025)

Esta versión se enfoca en la **auditoría y limpieza del código** para mejorar la consistencia, mantenibilidad y escalabilidad del proyecto.

- **🔍 Auditoría Exhaustiva de Código:**
  - Se realizó un análisis completo de la estructura de directorios y archivos.
  - Se identificó y documentó la función específica de cada directorio y componente.
  - Se creó un mapa detallado de la arquitectura del proyecto en `DEVELOPERS.md`.

- **⚙️ Unificación de Imports `useAuth`:**
  - **Problema Identificado:** 13+ archivos importaban `useAuth` desde ubicaciones inconsistentes.
  - **Solución:** Se unificaron TODOS los imports para usar `@/contexts/AuthContext` como fuente única.
  - **Archivos Corregidos:** Pages, hooks, componentes auth, componentes DJ, y rutas administrativas.

- **🧹 Eliminación de Código Duplicado:**
  - Se eliminó `src/hooks/useAuth.ts` (duplicado del contexto principal).
  - Se eliminó `src/components/ui/use-toast.ts` (duplicado del hook principal).
  - Se mejoró la consistencia en la gestión del estado de autenticación.

- **📚 Documentación Mejorada:**
  - **`DEVELOPERS.md`:** Estructura completa de directorios con descripción detallada de cada componente.
  - **Convenciones Establecidas:** Guías claras para imports, estructura de componentes y hooks.
  - **Próximos Pasos:** Roadmap para testing, performance y accesibilidad.

- **🎯 Beneficios Obtenidos:**
  - **Consistencia:** Eliminación de imports inconsistentes en toda la aplicación.
  - **Mantenibilidad:** Código más limpio y fácil de mantener.
  - **Escalabilidad:** Base sólida para futuras funcionalidades.
  - **Claridad:** Documentación completa para nuevos desarrolladores.

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
