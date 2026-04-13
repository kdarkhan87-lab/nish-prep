import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  const prisma = new PrismaClient({ adapter });
  const r = await prisma.user.deleteMany({ where: { email: "admin@nishprep.kz" } });
  console.log("Deleted:", r.count);
  await prisma.$disconnect();
}
main();
