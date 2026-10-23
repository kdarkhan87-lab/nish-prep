import Link from "next/link";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getUserProgress } from "@/lib/progress";
import { MOCK_EXAM_DURATION_SEC, MOCK_EXAM_SIZE } from "@/lib/mock-exam";

export const dynamic = "force-dynamic";

const LEADERBOARD_SIZE = 10;

/**
 * Рейтинг через агрегацию в БД (одна строка на ученика),
 * а не выгрузка всех результатов в память.
 */
async function getLeaderboard() {
  const grouped = await prisma.testResult.groupBy({
    by: ["userId"],
    _sum: { score: true, total: true },
    _count: { _all: true },
  });

  const ranked = grouped
    .map((g) => {
      const totalPossible = g._sum.total ?? 0;
      const totalScore = g._sum.score ?? 0;
      return {
        userId: g.userId,
        tests: g._count._all,
        avg: totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0,
      };
    })
    .sort((a, b) => b.avg - a.avg || b.tests - a.tests)
    // берём с запасом: часть кандидатов может оказаться админами
    .slice(0, LEADERBOARD_SIZE * 2);

  if (ranked.length === 0) return [];

  const users = await prisma.user.findMany({
    where: { id: { in: ranked.map((r) => r.userId) }, role: { not: "admin" }, blocked: false },
    select: { id: true, name: true, grade: true },
  });
  const byId = new Map(users.map((u) => [u.id, u]));

  return ranked
    .filter((r) => byId.has(r.userId))
    .slice(0, LEADERBOARD_SIZE)
    .map((r) => {
      const u = byId.get(r.userId)!;
      return { name: u.name, grade: u.grade, tests: r.tests, avg: r.avg };
    });
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;

  const [subjects, leaderboard, progress] = await Promise.all([
    prisma.subject.findMany({ include: { topics: { select: { id: true } } } }),
    getLeaderboard(),
    userId ? getUserProgress(userId).catch(() => null) : Promise.resolve(null),
  ]);

  const medals = ["🥇", "🥈", "🥉"];
  const firstName = session?.user?.name?.split(" ")[0];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-orange-400">НИШ</span> және{" "}
            <span className="text-green-400">БИЛ</span>-ге дайындал!
          </h1>
          <p className="text-lg md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
            5-6 сынып оқушыларына математика және логика бойынша видео-сабақтар, түсінікті теория және интерактивті тесттер
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href={progress ? progress.nextStep.href : "/subjects"}
              className="bg-orange-500 hover:bg-orange-400 text-white px-8 py-4 rounded-xl text-lg font-bold transition shadow-lg hover:shadow-xl"
            >
              {progress ? "Жалғастыру" : "Дайындықты бастау"}
            </Link>
            {!session && (
              <Link
                href="/auth/register"
                className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-xl text-lg font-bold transition backdrop-blur"
              >
                Тіркелу
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Продолжить — для вошедшего ученика */}
      {progress && (
        <section className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">
                  Сәлем, {firstName}! Келесі қадам
                </div>
                <div className="text-lg md:text-xl font-bold text-gray-800">{progress.nextStep.title}</div>
                <p className="text-gray-500 text-sm mt-1">{progress.nextStep.description}</p>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800 tabular-nums">
                    {progress.totals.topicsMastered}<span className="text-gray-300">/{progress.totals.topicsTotal}</span>
                  </div>
                  <div className="text-[11px] text-gray-400">тақырып</div>
                </div>
                {progress.totals.streakDays > 0 && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500 tabular-nums">🔥{progress.totals.streakDays}</div>
                    <div className="text-[11px] text-gray-400">күн</div>
                  </div>
                )}
                <Link
                  href={progress.nextStep.href}
                  className="bg-gray-900 hover:bg-gray-700 text-white px-5 py-3 rounded-xl font-bold transition text-sm"
                >
                  {progress.nextStep.cta} →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Subjects */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Пәнді таңда</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {subjects.map((subject) => {
            const sp = progress?.subjects.find((s) => s.slug === subject.slug);
            return (
              <Link
                key={subject.id}
                href={`/subjects/${subject.slug}`}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl p-8 transition group border-2 border-transparent hover:border-blue-500"
              >
                <div className="text-5xl mb-4">{subject.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition">{subject.name}</h3>
                <p className="text-gray-500 mt-2">
                  {subject.topics.length} тақырып
                  {sp && sp.topicsStarted > 0 && (
                    <span className="text-emerald-600"> · {sp.topicsMastered} меңгерілді</span>
                  )}
                </p>
                {sp && subject.topics.length > 0 && (
                  <div className="mt-3 bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 bg-emerald-500 rounded-full"
                      style={{ width: `${Math.round((sp.topicsMastered / subject.topics.length) * 100)}%` }}
                    />
                  </div>
                )}
                <div className="mt-4 text-blue-600 font-medium group-hover:translate-x-2 transition-transform inline-block">
                  Өту &rarr;
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Leaderboard */}
      <section className="bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 py-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">🏆</div>
            <h2 className="text-3xl font-bold text-gray-800">Үздік оқушылар тақтасы</h2>
            <p className="text-gray-500 mt-2">Ең жақсы нәтиже көрсеткен оқушылар</p>
          </div>

          {leaderboard.length > 0 ? (
            <div className="space-y-3">
              {leaderboard.map((user, i) => (
                <div
                  key={`${user.name}-${i}`}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition ${
                    i === 0 ? "bg-yellow-100 border-2 border-yellow-400 shadow-md" :
                    i === 1 ? "bg-gray-100 border-2 border-gray-300" :
                    i === 2 ? "bg-orange-100 border-2 border-orange-300" :
                    "bg-white border border-gray-200"
                  }`}
                >
                  <div className="flex-shrink-0 w-10 text-center">
                    {i < 3 ? (
                      <span className="text-2xl">{medals[i]}</span>
                    ) : (
                      <span className="text-lg font-bold text-gray-400">{i + 1}</span>
                    )}
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 ${
                    i === 0 ? "bg-yellow-500" : i === 1 ? "bg-gray-400" : i === 2 ? "bg-orange-400" : "bg-blue-400"
                  }`}>
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-800 truncate">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.grade}-сынып · {user.tests} тест</div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="w-20 bg-gray-200 rounded-full h-2.5 hidden sm:block">
                      <div
                        className={`h-2.5 rounded-full ${user.avg >= 80 ? "bg-green-500" : user.avg >= 50 ? "bg-orange-400" : "bg-red-400"}`}
                        style={{ width: `${user.avg}%` }}
                      />
                    </div>
                    <span className={`text-lg font-extrabold tabular-nums ${user.avg >= 80 ? "text-green-600" : user.avg >= 50 ? "text-orange-500" : "text-red-500"}`}>
                      {user.avg}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white/70 backdrop-blur rounded-3xl border-2 border-dashed border-yellow-300 p-10 text-center">
              <div className="flex justify-center gap-3 text-4xl mb-4">
                <span className="opacity-30">🥇</span>
                <span className="opacity-20">🥈</span>
                <span className="opacity-10">🥉</span>
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Тақта бос... Әзірше!</h3>
              <p className="text-gray-500 mb-6">
                Тесттерді тапсыр, үздіктер тізіміне шық!<br/>
                Бірінші болып орын ал!
              </p>
              <Link
                href="/subjects"
                className="inline-block bg-yellow-500 hover:bg-yellow-400 text-white px-6 py-3 rounded-xl font-bold transition shadow-md"
              >
                Тест тапсыру
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Mock Exam CTA */}
      <section className="bg-gradient-to-r from-red-500 to-orange-500 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">🎯 Пробный емтихан НИШ/БИЛ</h2>
          <p className="text-red-100 mb-6">
            {MOCK_EXAM_SIZE} сұрақ · {MOCK_EXAM_DURATION_SEC / 60} минут · Барлық тақырыптан микс · Нақты емтихан форматы
          </p>
          <Link
            href="/mock-exam"
            className="inline-block bg-white text-red-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-red-50 transition shadow-lg"
          >
            Емтиханды бастау
          </Link>
        </div>
      </section>

      {/* Как это работает — методика в 3 шага */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-3 text-gray-800">Қалай жұмыс істейді?</h2>
          <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
            Кішкентай қадамдар: оқы → тексер → қатені түсін. Әр тақырып 15–20 минутқа есептелген.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🎬", title: "1. Көр және оқы", desc: "Қысқа видео-сабақ және мысалдармен түсінікті теория. Әр бөлімнен кейін — кішкентай тексеру." },
              { icon: "✅", title: "2. Тест тапсыр", desc: "Әр жауаптан кейін бірден түсіндірме: не дұрыс, не қате және неге. Қате — оқудың бір бөлігі." },
              { icon: "📊", title: "3. Прогресті көр", desc: "Жеке кабинетте әлсіз тақырыптар мен келесі қадам. Ата-анаға — дайын есеп бір батырмамен." },
            ].map((f) => (
              <div key={f.title} className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="text-5xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
