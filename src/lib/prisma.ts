import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  if (process.env.NODE_ENV === "production") {
    const { PrismaPg } = require("@prisma/adapter-pg");
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
    return new PrismaClient({ adapter });
  } else {
    const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
    const path = require("node:path");
    const dbPath = path.join(process.cwd(), "prisma", "dev.db");
    const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
    return new PrismaClient({ adapter });
  }
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
