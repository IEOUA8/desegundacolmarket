# Vercel

## Build

El proyecto usa Next.js y Prisma. `postinstall` ejecuta `prisma generate`, asi Vercel genera el cliente Prisma antes del build.

```bash
Framework Preset: Next.js
Install Command: npm install
Build Command: npm run build
Output Directory: .next
```

## Variables de entorno

Configura estas variables en Vercel Project Settings:

```bash
DATABASE_URL="postgresql://postgres.btawegolhzbuztkaswaj:***@aws-1-us-east-2.pooler.supabase.com:5432/postgres?sslmode=require&sslaccept=accept_invalid_certs&connect_timeout=10"
NEXT_PUBLIC_APP_URL="https://TU-DOMINIO.vercel.app"
NEXT_PUBLIC_BRAND_NAME="De Segunda"
NEXT_PUBLIC_SUPABASE_URL="https://btawegolhzbuztkaswaj.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY=""
JWT_SECRET="..."
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
MERCADOPAGO_ACCESS_TOKEN=""
WOMPI_PUBLIC_KEY=""
WOMPI_PRIVATE_KEY=""
```

No subas `.env` al repositorio. La URL de base de datos y tokens privados viven solo en Vercel/Supabase.

## Migraciones

Las migraciones viven en `prisma/migrations`. Para aplicar cambios futuros en Supabase:

```bash
npm run prisma:deploy
```

Ejecuta migraciones antes o junto al deploy cuando haya cambios de schema.

## Supabase Auth Redirects

En Supabase Dashboard > Authentication > URL Configuration:

```bash
Site URL: https://TU-DOMINIO.vercel.app
Redirect URLs:
http://localhost:3000/auth/callback
https://TU-DOMINIO.vercel.app/auth/callback
https://*.vercel.app/auth/callback
```

El callback intercambia el `code` por sesion y redirige al `next` recibido.
