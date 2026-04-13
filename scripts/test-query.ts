import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  const prisma = new PrismaClient({ adapter });
  const results = await prisma.testResult.findMany({
    include: { user: { select: { id: true, name: true, grade: true, role: true } } },
  });
  console.log("Total results:", results.length);
  const userStats: Record<string, any> = {};
  for (const r of results) {
    if (r.user.role === "admin") continue;
    if (!userStats[r.user.id]) {
      userStats[r.user.id] = { name: r.user.name, grade: r.user.grade, totalScore: 0, totalPossible: 0, tests: 0 };
    }
    userStats[r.user.id].totalScore += r.score;
    userStats[r.user.id].totalPossible += r.total;
    userStats[r.user.id].tests++;
  }
  const leaderboard = Object.values(userStats)
    .map((u: any) => ({ ...u, avg: Math.round((u.totalScore / u.totalPossible) * 100) }))
    .sort((a: any, b: any) => b.avg - a.avg || b.tests - a.tests)
    .slice(0, 10);
  console.log("Leaderboard:", leaderboard);
  await prisma.$disconnect();
}
main();
