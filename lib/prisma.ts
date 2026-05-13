import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import pg from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required to initialize Prisma Client.");
}

const normalizedConnectionString = new URL(connectionString);
normalizedConnectionString.searchParams.delete("sslmode");
normalizedConnectionString.searchParams.delete("sslaccept");

const pool = new pg.Pool({
  connectionString: normalizedConnectionString.toString(),
  ssl: connectionString.includes("supabase")
    ? { rejectUnauthorized: false }
    : undefined
});

const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
