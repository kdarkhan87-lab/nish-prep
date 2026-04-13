import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  const prisma = new PrismaClient({ adapter });
  const hash = await bcrypt.hash("test123", 10);

  const students = [
    { name: "Айдана", email: "aidana@test.kz", grade: 5 },
    { name: "Нұрсұлтан", email: "nursultan@test.kz", grade: 6 },
    { name: "Алия", email: "aliya@test.kz", grade: 5 },
    { name: "Темірлан", email: "temirlan@test.kz", grade: 6 },
    { name: "Мадина", email: "madina@test.kz", grade: 5 },
  ];

  const topics = await prisma.topic.findMany({ select: { id: true } });

  for (const s of students) {
    const user = await prisma.user.upsert({
      where: { email: s.email },
      update: {},
      create: { name: s.name, email: s.email, password: hash, role: "student", grade: s.grade },
    });

    // Random test results for 3-8 topics
    const numTests = 3 + Math.floor(Math.random() * 6);
    const shuffled = topics.sort(() => Math.random() - 0.5).slice(0, numTests);
    for (const t of shuffled) {
      const total = 15;
      const score = 5 + Math.floor(Math.random() * 11); // 5-15
      await prisma.testResult.create({
        data: { score, total, userId: user.id, topicId: t.id },
      });
    }
    console.log(`${s.name}: ${numTests} tests`);
  }

  await prisma.$disconnect();
  console.log("Demo students created!");
}
main();
