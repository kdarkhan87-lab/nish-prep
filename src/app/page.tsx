import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const subjects = await prisma.subject.findMany({
    include: { topics: true },
  });

  // Top 10 leaderboard
  const allResults = await prisma.testResult.findMany({
    include: { user: { select: { id: true, name: true, grade: true, role: true } } },
  });

  const userStats: Record<string, { name: string; grade: number; totalScore: number; totalPossible: number; tests: number }> = {};
  for (const r of allResults) {
    if (r.user.role === "admin") continue;
    if (!userStats[r.user.id]) {
      userStats[r.user.id] = { name: r.user.name, grade: r.user.grade, totalScore: 0, totalPossible: 0, tests: 0 };
    }
    userStats[r.user.id].totalScore += r.score;
    userStats[r.user.id].totalPossible += r.total;
    userStats[r.user.id].tests++;
  }

  const leaderboard = Object.values(userStats)
    .map(u => ({ ...u, avg: Math.round((u.totalScore / u.totalPossible) * 100) }))
    .sort((a, b) => b.avg - a.avg || b.tests - a.tests)
    .slice(0, 10);

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 relative overflow-hidden">
        {/* Animated Penguin - left */}
        <div className="hidden md:block absolute left-6 lg:left-16 top-1/2 -translate-y-1/2 animate-bounce-slow">
          <div className="text-7xl lg:text-8xl drop-shadow-2xl select-none" style={{ animationDuration: '3s' }}>
            🐧
          </div>
          <div className="text-center mt-2 bg-white/20 backdrop-blur rounded-xl px-3 py-1 text-xs font-bold">
            Оқы!
          </div>
        </div>

        {/* Animated Lion - right */}
        <div className="hidden md:block absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 animate-bounce-slow" style={{ animationDelay: '1.5s' }}>
          <div className="text-7xl lg:text-8xl drop-shadow-2xl select-none">
            🦁
          </div>
          <div className="text-center mt-2 bg-white/20 backdrop-blur rounded-xl px-3 py-1 text-xs font-bold">
            Тапсыр!
          </div>
        </div>

        {/* Floating math symbols */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <span className="absolute text-white/10 text-4xl animate-float-up left-[10%] top-[20%]">+</span>
          <span className="absolute text-white/10 text-5xl animate-float-up left-[25%] top-[60%]" style={{ animationDelay: '2s' }}>%</span>
          <span className="absolute text-white/10 text-3xl animate-float-up right-[15%] top-[30%]" style={{ animationDelay: '1s' }}>=</span>
          <span className="absolute text-white/10 text-4xl animate-float-up right-[25%] top-[70%]" style={{ animationDelay: '3s' }}>?</span>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-orange-400">НИШ</span> және{" "}
            <span className="text-green-400">БИЛ</span>-ге дайындал!
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            5-6 сынып оқушыларына математика және логика бойынша интерактивті тесттер мен теория
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/subjects"
              className="bg-orange-500 hover:bg-orange-400 text-white px-8 py-4 rounded-xl text-lg font-bold transition shadow-lg hover:shadow-xl"
            >
              Дайындықты бастау
            </Link>
            <Link
              href="/auth/register"
              className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-xl text-lg font-bold transition backdrop-blur"
            >
              Тіркелу
            </Link>
          </div>

          {/* Mobile mascots */}
          <div className="flex justify-center gap-8 mt-8 md:hidden">
            <div className="text-5xl animate-bounce-slow">🐧</div>
            <div className="text-5xl animate-bounce-slow" style={{ animationDelay: '1s' }}>🦁</div>
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Пәнді таңда
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              href={`/subjects/${subject.slug}`}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-8 transition group border-2 border-transparent hover:border-blue-500"
            >
              <div className="text-5xl mb-4">{subject.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition">
                {subject.name}
              </h3>
              <p className="text-gray-500 mt-2">
                {subject.topics.length} тақырып
              </p>
              <div className="mt-4 text-blue-600 font-medium group-hover:translate-x-2 transition-transform inline-block">
                Өту &rarr;
              </div>
            </Link>
          ))}
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
                  key={i}
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
                    <span className={`text-lg font-extrabold ${user.avg >= 80 ? "text-green-600" : user.avg >= 50 ? "text-orange-500" : "text-red-500"}`}>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            🎯 Пробный емтихан НИШ/БИЛ
          </h2>
          <p className="text-red-100 mb-6">
            30 сұрақ · 60 минут · Барлық тақырыптан микс · Нақты емтихан форматы
          </p>
          <Link
            href="/mock-exam"
            className="inline-block bg-white text-red-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-red-50 transition shadow-lg"
          >
            Емтиханды бастау
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
            Неге біздің платформа?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "📚", title: "Түсінікті теория", desc: "Әр тақырып бойынша мысалдармен қарапайым түсіндірмелер" },
              { icon: "✅", title: "Интерактивті тесттер", desc: "Білімді тексер, прогресті бақыла" },
              { icon: "📊", title: "Жеке кабинет", desc: "Нәтижелерді бақылап, баллдарды жақсарт" },
            ].map((f) => (
              <div key={f.title} className="text-center p-6">
                <div className="text-5xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
