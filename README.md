# De Segunda Marketplace

Starter de marketplace/ecommerce de moda de segunda mano basado en el documento maestro del proyecto.

## Stack

- Next.js + React + TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- Zustand, Axios, React Hook Form, Zod
- Preparado para Vercel y base de datos administrada

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Scripts

- `npm run dev`: servidor local.
- `npm run build`: build de produccion.
- `npm run typecheck`: validacion TypeScript.
- `npm run prisma:generate`: genera Prisma Client.
- `npm run prisma:migrate`: crea/aplica migraciones locales.

## Configuracion

Copia `.env.example` a `.env` y completa las credenciales reales antes de conectar servicios externos.

## Documento base

La estrategia funcional y visual original esta en `documento_maestro_ecommerce_de_segunda.md`.
