import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const subjects = await prisma.subject.findMany({
    include: { topics: true },
  });

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-orange-400">НИШ</span> және{" "}
            <span className="text-green-400">БІЛ</span>-ге дайындал!
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

      {/* Mock Exam CTA */}
      <section className="bg-gradient-to-r from-red-500 to-orange-500 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            🎯 Пробный емтихан НИШ/БІЛ
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
