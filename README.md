# Sabor Real · CRM de Restaurante

CRM para gestionar pedidos y el catálogo de platos de un restaurante, con actualizaciones en tiempo real. Frontend en **TanStack Start + React 19 + Tailwind CSS v4** y backend en **Convex** (base de datos, funciones y sincronización reactiva).

## Funcionalidades

- **Kanban de pedidos** (`/`): columnas Pendiente → En preparación → Listo → Entregado, drag & drop entre columnas, prioridades, notas, totales y estadísticas en vivo.
- **Administración de platos** (`/platos`): catálogo con búsqueda y filtro por categoría, crear/editar/eliminar platos y toggle de disponibilidad.
- **Tiempo real**: todos los cambios se reflejan al instante entre clientes vía Convex.
- **Responsive**: drawer de navegación en móvil, kanban con scroll horizontal y modales adaptados.

## Stack

- [TanStack Start](https://tanstack.com/start) + [TanStack Router](https://tanstack.com/router) (file-based routing)
- [Convex](https://convex.dev) — base de datos reactiva, queries/mutations y seed
- [Tailwind CSS v4](https://tailwindcss.com/), [lucide-react](https://lucide.dev/) y [Biome](https://biomejs.dev/)

## Estructura

```
convex/               # Backend Convex
  schema.ts           # Tablas: orders y dishes (con índices)
  orders.ts           # list / create / updateStatus / remove
  dishes.ts           # list / create / update / toggleAvailable / remove
  seed.ts             # Seed idempotente de datos de ejemplo
src/
  routes/             # / (kanban) y /platos (catálogo)
  components/
    kanban/           # Board, Column, OrderCard, OrderFormModal
    dishes/           # DishCard, DishFormModal
    layout/           # Sidebar (drawer en móvil)
  lib/mock-data.ts    # Constantes y tipos de payload
```

## Puesta en marcha

1. Instalar dependencias:

   ```bash
   bun install
   ```

2. Configurar variables de entorno en `.env.local` (desde el dashboard de Convex):

   ```bash
   CONVEX_DEPLOYMENT=tu-deployment
   VITE_CONVEX_URL=https://tu-deployment.convex.cloud
   ```

3. Levantar el backend Convex (pushea el esquema y las funciones):

   ```bash
   npx convex dev
   ```

4. Ejecutar el seed (idempotente, se puede re-ejecutar):

   ```bash
   npx convex run seed:seed
   ```

5. Levantar el frontend:

   ```bash
   bun --bun run dev
   ```

   La app queda en http://localhost:3000.

## Scripts

```bash
bun --bun run dev        # Servidor de desarrollo (Vite)
bun --bun run build      # Build de producción
bun --bun run preview    # Preview del build
bun --bun run check      # Biome (lint + formato)
bun --bun run lint       # Biome lint
bun --bun run format     # Biome format
```

## Build de producción

El proyecto usa Nitro como adaptador de servidor; el build genera un servidor Node autocontenido:

```bash
bun --bun run build
node dist/server/index.mjs
```

Para hosts específicos (Vercel, Netlify, Cloudflare, etc.) ver https://v3.nitro.build/deploy.

## Convex

- **Desplegar a producción**: `npx convex deploy`
- **Re-seed**: `npx convex run seed:seed` (borra e inserta los datos de ejemplo)
- **Dashboard**: https://dashboard.convex.dev
- Tipos: los tipos generados en `convex/_generated/` se actualizan automáticamente con `npx convex dev`.
