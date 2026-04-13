import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  const prisma = new PrismaClient({ adapter });
  const hash = await bcrypt.hash("admin123", 10);
  const user = await prisma.user.create({
    data: { name: "Дархан", email: "admin@nishprep.kz", password: hash, role: "admin", grade: 5 }
  });
  console.log("Admin created:", user.email);
  await prisma.$disconnect();
}
main();
