# Despliegue y Configuracion

## Entorno local

1. Instala dependencias con `npm install`.
2. Copia `.env.example` a `.env` y reemplaza los valores reales.
3. Levanta PostgreSQL con `npm run db:up`.
4. Ejecuta `npm run prisma:migrate` y `npm run prisma:seed`.
5. Ejecuta `npm run dev` y abre `http://localhost:3000`.

## Base de datos

El proyecto queda preparado para PostgreSQL con Prisma.

- Desarrollo rapido: Supabase, Neon o Railway PostgreSQL.
- Produccion: PostgreSQL administrado con backups y variables separadas por ambiente.
- Comandos utiles: `npm run prisma:generate`, `npm run prisma:migrate`, `npm run prisma:studio`.

## Vercel

1. Conecta el repositorio GitHub en Vercel.
2. Agrega las variables de `.env.example` en Project Settings.
3. Usa `npm run build` como build command.
4. Activa dominios, preview deployments y proteccion de rama principal.

## Roadmap tecnico

- Sprint 1: Design system, layout publico, modelo de datos y deploy preview.
- Sprint 2: Shop, detalle de producto, filtros y favoritos.
- Sprint 3: Autenticacion, carrito y checkout.
- Sprint 4: Dashboard admin, panel seller e inventario.
- Sprint 5: SEO, analitica, testing y optimizacion.
