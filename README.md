# De Segunda Marketplace

Starter de marketplace/ecommerce de moda de segunda mano basado en el documento maestro del proyecto.

## Stack

- Next.js + React + TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- Supabase preparado para Auth, Storage y PostgreSQL administrado
- Zustand, Axios, React Hook Form, Zod
- Preparado para Vercel y base de datos administrada

## Desarrollo local

```bash
npm install
npm run db:up
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

Abre `http://localhost:3000`.

## Scripts

- `npm run dev`: servidor local.
- `npm run build`: build de produccion.
- `npm run typecheck`: validacion TypeScript.
- `npm run db:up`: levanta PostgreSQL local con Docker.
- `npm run db:down`: apaga PostgreSQL local.
- `npm run prisma:generate`: genera Prisma Client.
- `npm run prisma:deploy`: aplica migraciones en entornos remotos.
- `npm run prisma:migrate`: crea/aplica migraciones locales.
- `npm run prisma:seed`: carga categorias, seller y productos iniciales.

## Configuracion

Copia `.env.example` a `.env` y completa las credenciales reales antes de conectar servicios externos.

- Supabase: ver `docs/supabase.md`.
- Vercel: ver `docs/vercel.md`.
- Modelo de datos: ver `docs/database-design.md`.

## Documento base

La estrategia funcional y visual original esta en `documento_maestro_ecommerce_de_segunda.md`.
