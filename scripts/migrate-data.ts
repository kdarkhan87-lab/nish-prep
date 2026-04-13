import Database from "better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

async function main() {
  const localDb = new Database("prisma/dev.db");
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  const pg = new PrismaClient({ adapter });

  // Clear remote
  await pg.testResult.deleteMany();
  await pg.question.deleteMany();
  await pg.topic.deleteMany();
  await pg.subject.deleteMany();

  // Migrate subjects
  const subjects = localDb.prepare("SELECT * FROM Subject").all() as any[];
  for (const s of subjects) {
    await pg.subject.create({ data: { id: s.id, name: s.name, slug: s.slug, icon: s.icon } });
  }
  console.log(`Subjects: ${subjects.length}`);

  // Migrate topics
  const topics = localDb.prepare("SELECT * FROM Topic").all() as any[];
  for (const t of topics) {
    await pg.topic.create({
      data: { id: t.id, name: t.name, theory: t.theory, quizzes: t.quizzes || "[]", order: t.order, subjectId: t.subjectId }
    });
  }
  console.log(`Topics: ${topics.length}`);

  // Migrate questions
  const questions = localDb.prepare("SELECT * FROM Question").all() as any[];
  for (const q of questions) {
    await pg.question.create({
      data: { id: q.id, text: q.text, options: q.options, answer: q.answer, explanation: q.explanation || "", topicId: q.topicId }
    });
  }
  console.log(`Questions: ${questions.length}`);

  // Migrate users (keep passwords)
  const users = localDb.prepare("SELECT * FROM User").all() as any[];
  for (const u of users) {
    await pg.user.upsert({
      where: { email: u.email },
      update: { name: u.name, password: u.password, role: u.role, grade: u.grade },
      create: { id: u.id, name: u.name, email: u.email, password: u.password, role: u.role, grade: u.grade }
    });
  }
  console.log(`Users: ${users.length}`);

  await pg.$disconnect();
  console.log("Migration complete!");
}
main();
