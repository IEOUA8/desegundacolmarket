# Supabase

## Proyecto

- Project ID: `btawegolhzbuztkaswaj`
- Public URL: `https://btawegolhzbuztkaswaj.supabase.co`

La anon key queda solo en `.env` local y debe configurarse tambien en Vercel como `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## Variables necesarias

Para frontend, auth, storage y realtime:

```bash
NEXT_PUBLIC_SUPABASE_URL="https://btawegolhzbuztkaswaj.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
```

Para Prisma con Supabase en este proyecto se usa el session pooler:

```bash
DATABASE_URL="postgresql://postgres.btawegolhzbuztkaswaj:[PASSWORD]@aws-1-us-east-2.pooler.supabase.com:5432/postgres?sslmode=require&sslaccept=accept_invalid_certs&connect_timeout=10"
```

El transaction pooler `6543` no se usa para Prisma Migrate porque puede bloquear la verificacion de conexion. El session pooler `5432` funciona para migraciones y queries server-side.

## Auth redirects

Configura estos redirects en Supabase Authentication:

```bash
http://localhost:3000/auth/callback
https://TU-DOMINIO.vercel.app/auth/callback
https://*.vercel.app/auth/callback
```

## Uso recomendado

- Prisma gestiona estructura, migraciones y consultas server-side.
- Supabase Auth gestiona login, registro y recuperacion de cuenta.
- Supabase Storage guarda imagenes de productos.
- La anon key solo se usa en cliente.
- La service role key solo se usa en servidor y nunca se expone en el navegador.
