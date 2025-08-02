# CueMasters DJ

![Version](https://img.shields.io/badge/version-1.0.1-blue.svg)

Plataforma de solicitudes musicales diseñada para revolucionar la interacción entre DJs y su audiencia. Permite a los asistentes a un evento solicitar canciones y ofrecer propinas, todo en tiempo real a través de una interfaz web moderna y fluida.

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

## 📄 Changelog - v1.0.1 (31/07/2025)

- **Refactorización de la Página de Inicio:** Se unificaron `LandingPage.tsx` y `Index.tsx` en una sola página modular y reutilizable.
- **Componentes Modulares:** Se refactorizaron las secciones de la página de inicio (`Hero`, `HowItWorks`, etc.) en componentes independientes y animados.
- **Tipos Centralizados:** Se creó un archivo `src/types/index.ts` para centralizar las interfaces (`DJProfile`, `DJEvent`) y eliminar la duplicidad.
- **Auditoría y Limpieza:** Se eliminaron archivos redundantes y se corrigieron rutas de importación en todo el proyecto.

## 📄 Changelog - v1.0.2 (31/07/2025)
 - developer ' Ing. Juan carlos Mendez N. (dj wacko) '
