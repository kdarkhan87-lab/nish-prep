import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import type { Metadata } from "next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getUserProgress, MASTERED_PCT, WEAK_PCT, type TopicStatus } from "@/lib/progress";
import { PrintButton } from "@/components/PrintButton";
import { formatDateRu } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ата-анаға есеп",
  robots: { index: false, follow: false },
};

const STATUS_LABEL: Record<TopicStatus, { text: string; cls: string }> = {
  mastered: { text: "Меңгерілді", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  progress: { text: "Жолда", cls: "bg-amber-50 text-amber-700 border-amber-200" },
  weak: { text: "Нығайту керек", cls: "bg-rose-50 text-rose-700 border-rose-200" },
  new: { text: "Бастамаған", cls: "bg-gray-50 text-gray-500 border-gray-200" },
};

const fmtDate = formatDateRu;

export default async function ParentReportPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) redirect("/auth/login");

  const [user, progress] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId }, select: { name: true, grade: true, createdAt: true } }),
    getUserProgress(userId),
  ]);
  if (!user) redirect("/auth/login");

  const { totals, subjects, topics, weakTopics, mockExams, nextStep } = progress;

  // Простой вывод для родителя: что хорошо, что требует внимания
  const verdict =
    totals.tests === 0
      ? "Ребёнок пока не прошёл ни одного теста. Начните с теории первой темы и короткого теста — 15 минут в день достаточно."
      : totals.avgPct >= MASTERED_PCT
      ? "Отличный уровень: средний результат выше 80%. Поддерживайте форму пробными экзаменами раз в неделю."
      : totals.avgPct >= WEAK_PCT
      ? "Хороший прогресс. Есть темы, которые стоит закрепить — они перечислены ниже вместе с рекомендацией."
      : "Есть над чем работать: средний результат ниже 60%. Рекомендуем вернуться к теории слабых тем и пересдать тесты.";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-10 print:py-0 print:px-0">
      {/* Панель действий (скрыта при печати) */}
      <div className="flex items-center justify-between gap-3 mb-6 print:hidden">
        <Link href="/dashboard" className="text-blue-600 hover:underline text-sm">&larr; Кабинетке оралу</Link>
        <PrintButton />
      </div>

      <article className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-10 print:shadow-none print:border-0 print:p-0">
        {/* Шапка */}
        <header className="border-b border-gray-100 pb-6 mb-6">
          <div className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">Отчёт о подготовке к НИШ/БИЛ</div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{user.name}</h1>
          <div className="text-gray-500 text-sm mt-1">
            {user.grade}-класс · на платформе с {fmtDate(user.createdAt)} · отчёт сформирован {fmtDate(progress.generatedAt)}
          </div>
        </header>

        {/* Вывод */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Коротко</h2>
          <p className="text-gray-700 leading-relaxed">{verdict}</p>
        </section>

        {/* Ключевые цифры */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Тестов пройдено", value: totals.tests },
            { label: "Средний результат", value: `${totals.avgPct}%` },
            { label: "Тем освоено (80%+)", value: `${totals.topicsMastered} из ${totals.topicsTotal}` },
            { label: "Активных дней за неделю", value: `${totals.activeDays7} из 7` },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="text-2xl font-bold text-gray-900 tabular-nums">{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </section>

        {/* Рекомендация */}
        <section className="mb-8 rounded-xl border border-blue-100 bg-blue-50 p-5">
          <h2 className="text-base font-bold text-blue-900 mb-1">Рекомендуемый следующий шаг</h2>
          <p className="text-blue-900 font-medium">{nextStep.title}</p>
          <p className="text-blue-800 text-sm mt-1">{nextStep.description}</p>
        </section>

        {/* Темы, требующие внимания */}
        {weakTopics.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Темы, требующие внимания</h2>
            <ul className="space-y-2">
              {weakTopics.map((t) => (
                <li key={t.id} className="flex items-center justify-between gap-3 rounded-xl border border-rose-100 bg-rose-50/50 px-4 py-3">
                  <div>
                    <div className="font-medium text-gray-800">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.subjectName} · попыток: {t.attempts}</div>
                  </div>
                  <div className="text-rose-600 font-bold tabular-nums">{t.best}%</div>
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 mt-2">
              Совет: перечитать теорию вместе с ребёнком, разобрать объяснения к ошибкам и пересдать тест через 1–2 дня.
            </p>
          </section>
        )}

        {/* Таблица по предметам */}
        {subjects.map((s) => {
          const rows = topics.filter((t) => t.subjectSlug === s.slug);
          return (
            <section key={s.slug} className="mb-8 break-inside-avoid">
              <div className="flex items-baseline justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-800">{s.icon} {s.name}</h2>
                <span className="text-sm text-gray-500 tabular-nums">
                  освоено {s.topicsMastered} из {s.topicsTotal}
                  {s.avgBest !== null && ` · средний лучший ${s.avgBest}%`}
                </span>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                    <th className="py-2 pr-2 w-8">№</th>
                    <th className="py-2 pr-2">Тема</th>
                    <th className="py-2 pr-2 text-right">Лучший</th>
                    <th className="py-2 pr-2 text-right hidden sm:table-cell">Попыток</th>
                    <th className="py-2 text-right">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((t, i) => {
                    const st = STATUS_LABEL[t.status];
                    return (
                      <tr key={t.id} className="border-b border-gray-50">
                        <td className="py-2 pr-2 text-gray-400 tabular-nums">{i + 1}</td>
                        <td className="py-2 pr-2 text-gray-800">{t.name}</td>
                        <td className="py-2 pr-2 text-right font-bold tabular-nums text-gray-800">
                          {t.best === null ? "—" : `${t.best}%`}
                        </td>
                        <td className="py-2 pr-2 text-right text-gray-500 tabular-nums hidden sm:table-cell">{t.attempts || "—"}</td>
                        <td className="py-2 text-right">
                          <span className={`inline-block text-[11px] font-medium border rounded-md px-2 py-0.5 ${st.cls}`}>{st.text}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          );
        })}

        {/* Пробные экзамены */}
        <section className="mb-4 break-inside-avoid">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Пробные экзамены НИШ/БИЛ</h2>
          {mockExams.length === 0 ? (
            <p className="text-sm text-gray-500">Пробный экзамен ещё не сдавался. Это лучший способ понять готовность к реальному формату: 30 вопросов за 60 минут.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                  <th className="py-2 pr-2">Дата</th>
                  <th className="py-2 pr-2 text-right">Баллы</th>
                  <th className="py-2 text-right">Результат</th>
                </tr>
              </thead>
              <tbody>
                {mockExams.slice(0, 10).map((m) => (
                  <tr key={m.id} className="border-b border-gray-50">
                    <td className="py-2 pr-2 text-gray-700">{fmtDate(m.createdAt)}</td>
                    <td className="py-2 pr-2 text-right tabular-nums text-gray-700">{m.score}/{m.total}</td>
                    <td className={`py-2 text-right font-bold tabular-nums ${m.pct >= MASTERED_PCT ? "text-emerald-600" : m.pct >= WEAK_PCT ? "text-amber-600" : "text-rose-600"}`}>{m.pct}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <footer className="mt-8 pt-4 border-t border-gray-100 text-xs text-gray-400">
          Шкала: «Меңгерілді» — лучший результат от {MASTERED_PCT}%; «Жолда» — от {WEAK_PCT}% до {MASTERED_PCT - 1}%; «Нығайту керек» — ниже {WEAK_PCT}%.
          Отчёт сформирован автоматически на nish-prep.vercel.app.
        </footer>
      </article>
    </div>
  );
}
