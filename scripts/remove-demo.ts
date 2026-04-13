import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  const prisma = new PrismaClient({ adapter });
  const demoEmails = ["aidana@test.kz","nursultan@test.kz","aliya@test.kz","temirlan@test.kz","madina@test.kz"];
  const users = await prisma.user.findMany({ where: { email: { in: demoEmails } } });
  for (const u of users) {
    await prisma.testResult.deleteMany({ where: { userId: u.id } });
    await prisma.user.delete({ where: { id: u.id } });
  }
  console.log("Deleted", users.length, "demo students");
  await prisma.$disconnect();
}
main();
