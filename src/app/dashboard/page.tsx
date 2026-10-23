"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { UserProgress, TopicProgress, SubjectProgress } from "@/lib/progress";
import { formatDateTimeKk } from "@/lib/format";

// ---------- кішкентай көмекшілер ----------

function tone(p: number | null) {
  if (p === null) return { bar: "bg-gray-200", text: "text-gray-400", soft: "bg-gray-50" };
  if (p >= 80) return { bar: "bg-emerald-500", text: "text-emerald-600", soft: "bg-emerald-50" };
  if (p >= 60) return { bar: "bg-amber-400", text: "text-amber-600", soft: "bg-amber-50" };
  return { bar: "bg-rose-400", text: "text-rose-600", soft: "bg-rose-50" };
}

const formatDate = formatDateTimeKk;

function Bar({ value, className = "" }: { value: number | null; className?: string }) {
  const t = tone(value);
  return (
    <div className={`bg-gray-100 rounded-full h-2 overflow-hidden ${className}`}>
      <div className={`h-2 rounded-full transition-all duration-700 ${t.bar}`} style={{ width: `${value ?? 0}%` }} />
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6 ${className}`}>
      {children}
    </section>
  );
}

function SectionTitle({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 mb-4">
      <h2 className="text-lg font-bold text-gray-800">{children}</h2>
      {hint && <span className="text-xs text-gray-400">{hint}</span>}
    </div>
  );
}

// ---------- блоктар ----------

function NextStepCard({ step }: { step: UserProgress["nextStep"] }) {
  const palette = {
    repeat: "from-amber-50 to-orange-50 border-amber-200",
    start: "from-sky-50 to-indigo-50 border-sky-200",
    mock: "from-rose-50 to-orange-50 border-rose-200",
    done: "from-emerald-50 to-teal-50 border-emerald-200",
  }[step.kind];
  const icon = { repeat: "🔁", start: "🚀", mock: "🎯", done: "🏅" }[step.kind];

  return (
    <section className={`rounded-2xl border bg-gradient-to-br ${palette} p-5 md:p-6`}>
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="text-4xl md:text-5xl flex-shrink-0">{icon}</div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">Келесі қадам</div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-tight">{step.title}</h2>
          <p className="text-gray-600 mt-1 text-sm md:text-base">{step.description}</p>
        </div>
        <Link
          href={step.href}
          className="flex-shrink-0 inline-flex items-center justify-center bg-gray-900 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-bold transition shadow-sm"
        >
          {step.cta} →
        </Link>
      </div>
    </section>
  );
}

function StatTile({ icon, value, label, sub }: { icon: string; value: string | number; label: string; sub?: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-5">
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        {sub && <span className="text-[11px] text-gray-400">{sub}</span>}
      </div>
      <div className="text-2xl md:text-3xl font-bold text-gray-800 mt-2 tabular-nums">{value}</div>
      <div className="text-xs md:text-sm text-gray-500">{label}</div>
    </div>
  );
}

function SubjectRow({ s }: { s: SubjectProgress }) {
  const donePct = s.topicsTotal > 0 ? Math.round((s.topicsMastered / s.topicsTotal) * 100) : 0;
  return (
    <Link href={`/subjects/${s.slug}`} className="block rounded-xl hover:bg-gray-50 transition p-3 -mx-3">
      <div className="flex items-center gap-3">
        <span className="text-2xl flex-shrink-0">{s.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-medium text-gray-800 truncate">{s.name}</span>
            <span className="text-xs text-gray-500 flex-shrink-0 tabular-nums">
              {s.topicsMastered}/{s.topicsTotal} меңгерілді
            </span>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <Bar value={donePct} className="flex-1" />
            {s.avgBest !== null && (
              <span className={`text-xs font-bold tabular-nums ${tone(s.avgBest).text}`}>{s.avgBest}%</span>
            )}
          </div>
          <div className="mt-1 text-[11px] text-gray-400">
            {s.topicsStarted === 0 ? "әзірше бастамадың" : `${s.topicsStarted} тақырып бастадың`}
          </div>
        </div>
      </div>
    </Link>
  );
}

function WeakTopicRow({ t }: { t: TopicProgress }) {
  const tn = tone(t.best);
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${tn.soft} ${tn.text}`}>
        {t.best}%
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-gray-800 truncate">{t.name}</div>
        <div className="text-xs text-gray-400">
          {t.subjectName} · {t.attempts} рет тапсырдың
        </div>
      </div>
      <div className="flex gap-1.5 flex-shrink-0">
        <Link
          href={`/subjects/${t.subjectSlug}/${t.id}/theory`}
          className="text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition"
        >
          Теория
        </Link>
        <Link
          href={`/subjects/${t.subjectSlug}/${t.id}/test`}
          className="text-xs font-medium bg-orange-50 text-orange-700 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition"
        >
          Тест
        </Link>
      </div>
    </div>
  );
}

// ---------- бет ----------

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<UserProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAllHistory, setShowAllHistory] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status, router]);

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch("/api/dashboard", { cache: "no-store" });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.totals) throw new Error(json?.error || "Деректерді жүктеу мүмкін болмады");
      setData(json as UserProgress);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Деректерді жүктеу мүмкін болмады");
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") load();
  }, [status, load]);

  if (status === "loading" || (status === "authenticated" && !data && !error)) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10 animate-pulse" aria-busy="true">
        <div className="h-9 w-64 bg-gray-200 rounded-lg mb-2" />
        <div className="h-4 w-40 bg-gray-100 rounded mb-8" />
        <div className="h-28 bg-gray-100 rounded-2xl mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[0, 1, 2, 3].map((i) => <div key={i} className="h-28 bg-white border border-gray-100 rounded-2xl" />)}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="h-64 bg-white border border-gray-100 rounded-2xl" />
          <div className="h-64 bg-white border border-gray-100 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!session) return null;

  if (error || !data) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
          <div className="text-5xl mb-4">⚠️</div>
          <p className="text-gray-600 mb-6">{error ?? "Деректер жоқ"}</p>
          <button onClick={load} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition">
            🔄 Қайта жүктеу
          </button>
        </div>
      </div>
    );
  }

  const { totals, subjects, weakTopics, mockExams, mockTrend, history, nextStep } = data;
  const visibleHistory = showAllHistory ? history : history.slice(0, 8);
  const firstName = session.user?.name?.split(" ")[0] ?? "";

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Сәлем, {firstName}! 👋</h1>
          <p className="text-gray-500 mt-1">
            {totals.tests === 0
              ? "Бүгін дайындықты бастайық."
              : totals.streakDays >= 2
              ? `Жарайсың! ${totals.streakDays} күн қатарынан дайындалып жатырсың 🔥`
              : "Күнде 15 минут — нәтиже міндетті түрде болады."}
          </p>
        </div>
        <Link
          href="/dashboard/report"
          className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-blue-300 hover:text-blue-700 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium transition self-start md:self-auto"
        >
          📄 Ата-анаға есеп
        </Link>
      </div>

      {/* Next step */}
      <div className="mb-6">
        <NextStepCard step={nextStep} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatTile icon="📝" value={totals.tests} label="Тест тапсырылды" sub={totals.mockExams > 0 ? `${totals.mockExams} емтихан` : undefined} />
        <StatTile icon="📊" value={`${totals.avgPct}%`} label="Орташа балл" sub={totals.answered > 0 ? `${totals.correct}/${totals.answered} дұрыс` : undefined} />
        <StatTile icon="🏅" value={`${totals.topicsMastered}/${totals.topicsTotal}`} label="Тақырып меңгерілді" sub="80%+" />
        <StatTile icon="🔥" value={totals.streakDays} label="Күн қатарынан" sub={`7 күнде: ${totals.activeDays7}`} />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Subjects */}
        <Card>
          <SectionTitle hint="меңгерілген тақырыптар">Пәндер бойынша прогресс</SectionTitle>
          {subjects.length === 0 ? (
            <p className="text-sm text-gray-400">Пәндер әзірше қосылмаған.</p>
          ) : (
            <div className="space-y-1">
              {subjects.map((s) => <SubjectRow key={s.slug} s={s} />)}
            </div>
          )}
        </Card>

        {/* Weak topics */}
        <Card>
          <SectionTitle hint="80%-тен төмен">Нығайту керек</SectionTitle>
          {weakTopics.length === 0 ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-2">{totals.tests === 0 ? "🌱" : "✨"}</div>
              <p className="text-sm text-gray-500">
                {totals.tests === 0
                  ? "Бірінші тестті тапсырған соң мұнда әлсіз тақырыптар көрінеді."
                  : "Әлсіз тақырып жоқ — барлық бастаған тақырып 80%-тен жоғары!"}
              </p>
            </div>
          ) : (
            <div>
              {weakTopics.map((t) => <WeakTopicRow key={t.id} t={t} />)}
            </div>
          )}
        </Card>
      </div>

      {/* Mock exams */}
      <Card className="mb-6">
        <SectionTitle hint="30 сұрақ · 60 минут">🎯 Пробный емтихан</SectionTitle>
        {mockExams.length === 0 ? (
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-sm text-gray-500 flex-1">
              Емтихан әзірше тапсырылмаған. Нақты формат — барлық тақырыптан микс, уақыт шектеулі.
            </p>
            <Link href="/mock-exam" className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2.5 rounded-xl font-bold transition text-sm text-center">
              Емтиханды бастау
            </Link>
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div>
                <div className="text-xs text-gray-400">Соңғы нәтиже</div>
                <div className={`text-3xl font-bold tabular-nums ${tone(mockExams[0].pct).text}`}>{mockExams[0].pct}%</div>
              </div>
              {mockTrend !== null && (
                <div className={`text-sm font-bold px-3 py-1.5 rounded-lg ${
                  mockTrend > 0 ? "bg-emerald-50 text-emerald-700" : mockTrend < 0 ? "bg-rose-50 text-rose-600" : "bg-gray-50 text-gray-500"
                }`}>
                  {mockTrend > 0 ? `▲ +${mockTrend}%` : mockTrend < 0 ? `▼ ${mockTrend}%` : "= өзгеріссіз"}
                  <span className="font-normal text-xs ml-1 opacity-70">алдыңғымен салыстырғанда</span>
                </div>
              )}
              <Link href="/mock-exam" className="ml-auto bg-rose-500 hover:bg-rose-600 text-white px-5 py-2.5 rounded-xl font-bold transition text-sm">
                Қайта тапсыру
              </Link>
            </div>
            <div className="flex items-end gap-2 h-24 border-b border-gray-100">
              {mockExams.slice(0, 12).reverse().map((m) => (
                <div key={m.id} className="w-10 flex flex-col items-center gap-1 group" title={`${formatDate(m.createdAt)} — ${m.score}/${m.total}`}>
                  <span className={`text-[11px] font-bold tabular-nums ${tone(m.pct).text}`}>{m.pct}%</span>
                  <div className={`w-full rounded-t-md ${tone(m.pct).bar}`} style={{ height: `${Math.max(4, m.pct * 0.6)}px` }} />
                </div>
              ))}
            </div>
            <div className="text-[11px] text-gray-400 mt-1">
              {mockExams.length === 1 ? "Бірінші емтихан. Келесіні тапсырған соң динамика көрінеді." : "Соңғы емтихандар, солдан оңға — ескіден жаңаға."}
            </div>
          </div>
        )}
      </Card>

      {/* History */}
      <Card>
        <SectionTitle hint={history.length > 0 ? `соңғы ${history.length}` : undefined}>Тест тарихы</SectionTitle>
        {history.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-3">📚</div>
            <p className="text-gray-500 mb-5">Сіз әлі тест тапсырмадыңыз</p>
            <Link href="/subjects" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition">
              Дайындықты бастау
            </Link>
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-50">
              {visibleHistory.map((h) => {
                const tn = tone(h.pct);
                return (
                  <div key={h.id} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <div className="font-medium text-gray-800 truncate">
                        {h.isMockExam ? "🎯 " : ""}{h.title}
                        {h.subtitle && <span className="text-sm text-gray-400"> · {h.subtitle}</span>}
                      </div>
                      <div className="text-xs text-gray-400">{formatDate(h.createdAt)}</div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <Bar value={h.pct} className="w-20 hidden sm:block" />
                      <span className={`font-bold text-sm tabular-nums ${tn.text}`}>
                        {h.score}/{h.total} <span className="text-xs">({h.pct}%)</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            {history.length > 8 && (
              <button
                onClick={() => setShowAllHistory((v) => !v)}
                className="mt-3 text-sm text-blue-600 hover:underline"
              >
                {showAllHistory ? "Жасыру" : `Барлығын көрсету (${history.length})`}
              </button>
            )}
          </>
        )}
      </Card>
    </div>
  );
}
