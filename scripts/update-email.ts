import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  const prisma = new PrismaClient({ adapter });
  const user = await prisma.user.update({
    where: { email: "admin@nishprep.kz" },
    data: { email: "kdarkhan87@gmail.com" }
  });
  console.log("Updated:", user.email);
  await prisma.$disconnect();
}
main();
