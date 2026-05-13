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

Para migraciones Prisma contra Supabase falta el connection string de PostgreSQL:

```bash
DATABASE_URL="postgresql://postgres.[PROJECT_ID]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
```

Para migraciones, Supabase tambien suele ofrecer una conexion directa en puerto `5432`. Esa es la opcion mas comoda si esta habilitada.

## Uso recomendado

- Prisma gestiona estructura, migraciones y consultas server-side.
- Supabase Auth gestiona login, registro y recuperacion de cuenta.
- Supabase Storage guarda imagenes de productos.
- La anon key solo se usa en cliente.
- La service role key solo se usa en servidor y nunca se expone en el navegador.
