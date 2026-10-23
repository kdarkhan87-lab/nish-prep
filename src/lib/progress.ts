import { prisma } from "@/lib/prisma";
import { MOCK_EXAM_TOPIC_ID } from "@/lib/mock-exam";

/**
 * Единая модель прогресса ученика.
 * Используется кабинетом (/api/dashboard), отчётом для родителя (/dashboard/report)
 * и блоком «продолжить» на главной.
 */

export const MASTERED_PCT = 80;
export const WEAK_PCT = 60;

export type TopicStatus = "new" | "weak" | "progress" | "mastered";

export interface TopicProgress {
  id: string;
  name: string;
  order: number;
  subjectName: string;
  subjectSlug: string;
  subjectIcon: string;
  questionCount: number;
  attempts: number;
  best: number | null;
  last: number | null;
  lastAt: string | null;
  status: TopicStatus;
}

export interface SubjectProgress {
  slug: string;
  name: string;
  icon: string;
  topicsTotal: number;
  topicsStarted: number;
  topicsMastered: number;
  avgBest: number | null;
}

export interface MockExamEntry {
  id: string;
  score: number;
  total: number;
  pct: number;
  createdAt: string;
}

export interface HistoryEntry {
  id: string;
  topicId: string;
  title: string;
  subtitle: string | null;
  isMockExam: boolean;
  score: number;
  total: number;
  pct: number;
  createdAt: string;
}

export interface NextStep {
  kind: "repeat" | "start" | "mock" | "done";
  title: string;
  description: string;
  href: string;
  cta: string;
  topicName?: string;
}

export interface UserProgress {
  totals: {
    tests: number;
    mockExams: number;
    avgPct: number;
    bestPct: number;
    correct: number;
    answered: number;
    streakDays: number;
    activeDays7: number;
    topicsMastered: number;
    topicsTotal: number;
  };
  subjects: SubjectProgress[];
  topics: TopicProgress[];
  weakTopics: TopicProgress[];
  mockExams: MockExamEntry[];
  mockTrend: number | null;
  history: HistoryEntry[];
  nextStep: NextStep;
  generatedAt: string;
}

export function pct(score: number, total: number): number {
  return total > 0 ? Math.round((score / total) * 100) : 0;
}

export function topicStatus(best: number | null): TopicStatus {
  if (best === null) return "new";
  if (best >= MASTERED_PCT) return "mastered";
  if (best < WEAK_PCT) return "weak";
  return "progress";
}

/** Ключ дня в UTC (YYYY-MM-DD) — сервер и клиент считают одинаково. */
function dayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function shiftDay(key: string, delta: number): string {
  const d = new Date(`${key}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + delta);
  return dayKey(d);
}

/** Серия дней подряд с активностью, заканчивающаяся сегодня или вчера. */
export function computeStreak(dates: readonly Date[], now: Date = new Date()): number {
  if (dates.length === 0) return 0;
  const days = new Set(dates.map(dayKey));
  const today = dayKey(now);
  let cursor = days.has(today) ? today : shiftDay(today, -1);
  if (!days.has(cursor)) return 0;
  let streak = 0;
  while (days.has(cursor)) {
    streak++;
    cursor = shiftDay(cursor, -1);
  }
  return streak;
}

export function computeActiveDays(dates: readonly Date[], windowDays: number, now: Date = new Date()): number {
  const since = new Date(now.getTime() - windowDays * 24 * 60 * 60 * 1000);
  const days = new Set(dates.filter((d) => d >= since).map(dayKey));
  return days.size;
}

export function pickNextStep(
  topics: readonly TopicProgress[],
  mockExams: readonly MockExamEntry[]
): NextStep {
  const started = topics.filter((t) => t.attempts > 0);
  const weak = topics
    .filter((t) => t.status === "weak" || t.status === "progress")
    .sort((a, b) => (a.best ?? 0) - (b.best ?? 0));

  // 1. Есть слабая тема — повторить теорию и пересдать
  if (weak.length > 0) {
    const t = weak[0];
    return {
      kind: "repeat",
      title: "Әлсіз тақырыпты нығайт",
      description: `«${t.name}» — ең жақсы нәтиже ${t.best}%. Теорияны қайта оқып, тестті қайта тапсыр.`,
      href: `/subjects/${t.subjectSlug}/${t.id}/theory`,
      cta: "Теорияны оқу",
      topicName: t.name,
    };
  }

  // 2. Все начатые темы освоены, но есть новые — начать следующую по порядку
  const fresh = topics.filter((t) => t.status === "new" && t.questionCount > 0);
  if (fresh.length > 0) {
    const t = fresh[0];
    return {
      kind: "start",
      title: started.length === 0 ? "Дайындықты баста" : "Келесі тақырыпқа өт",
      description: `«${t.name}» (${t.subjectName}) — теорияны оқып, тест тапсыр.`,
      href: `/subjects/${t.subjectSlug}/${t.id}/theory`,
      cta: "Бастау",
      topicName: t.name,
    };
  }

  // 3. Все темы освоены — пробный экзамен
  if (mockExams.length === 0 || mockExams[0].pct < MASTERED_PCT) {
    return {
      kind: "mock",
      title: "Пробный емтихан тапсыр",
      description:
        mockExams.length === 0
          ? "Барлық тақырып өтілді. Нақты емтихан форматында өзіңді тексер."
          : `Соңғы емтихан: ${mockExams[0].pct}%. ${MASTERED_PCT}%-тен асуға тырыс.`,
      href: "/mock-exam",
      cta: "Емтиханды бастау",
    };
  }

  return {
    kind: "done",
    title: "Тамаша! Сен дайынсың 🎉",
    description: "Барлық тақырып пен емтихан жоғары нәтижемен өтілді. Форманы сақтау үшін аптасына бір емтихан тапсыр.",
    href: "/mock-exam",
    cta: "Емтиханды қайталау",
  };
}

export async function getUserProgress(userId: string): Promise<UserProgress> {
  const [subjects, results] = await Promise.all([
    prisma.subject.findMany({
      include: {
        topics: {
          orderBy: { order: "asc" },
          select: { id: true, name: true, order: true, _count: { select: { questions: true } } },
        },
      },
    }),
    prisma.testResult.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  // --- агрегируем результаты по теме ---
  const byTopic = new Map<string, { attempts: number; best: number; last: number; lastAt: Date }>();
  const mockExams: MockExamEntry[] = [];
  let correct = 0;
  let answered = 0;

  for (const r of results) {
    const p = pct(r.score, r.total);
    correct += r.score;
    answered += r.total;

    if (r.topicId === MOCK_EXAM_TOPIC_ID) {
      mockExams.push({ id: r.id, score: r.score, total: r.total, pct: p, createdAt: r.createdAt.toISOString() });
      continue;
    }
    const agg = byTopic.get(r.topicId);
    if (!agg) {
      // results отсортированы по убыванию даты — первый встреченный = последний по времени
      byTopic.set(r.topicId, { attempts: 1, best: p, last: p, lastAt: r.createdAt });
    } else {
      agg.attempts++;
      if (p > agg.best) agg.best = p;
    }
  }

  // --- темы и предметы ---
  const topics: TopicProgress[] = [];
  const subjectProgress: SubjectProgress[] = [];
  const topicNameById = new Map<string, { name: string; subjectName: string }>();

  for (const s of subjects) {
    let started = 0;
    let mastered = 0;
    let bestSum = 0;

    for (const t of s.topics) {
      const agg = byTopic.get(t.id);
      const best = agg ? agg.best : null;
      const status = topicStatus(best);
      if (agg) {
        started++;
        bestSum += agg.best;
        if (status === "mastered") mastered++;
      }
      topicNameById.set(t.id, { name: t.name, subjectName: s.name });
      topics.push({
        id: t.id,
        name: t.name,
        order: t.order,
        subjectName: s.name,
        subjectSlug: s.slug,
        subjectIcon: s.icon,
        questionCount: t._count.questions,
        attempts: agg?.attempts ?? 0,
        best,
        last: agg?.last ?? null,
        lastAt: agg ? agg.lastAt.toISOString() : null,
        status,
      });
    }

    subjectProgress.push({
      slug: s.slug,
      name: s.name,
      icon: s.icon,
      topicsTotal: s.topics.length,
      topicsStarted: started,
      topicsMastered: mastered,
      avgBest: started > 0 ? Math.round(bestSum / started) : null,
    });
  }

  const weakTopics = topics
    .filter((t) => t.status === "weak" || t.status === "progress")
    .sort((a, b) => (a.best ?? 0) - (b.best ?? 0))
    .slice(0, 5);

  // --- история ---
  const history: HistoryEntry[] = results.slice(0, 30).map((r) => {
    const isMock = r.topicId === MOCK_EXAM_TOPIC_ID;
    const meta = topicNameById.get(r.topicId);
    return {
      id: r.id,
      topicId: r.topicId,
      title: isMock ? "Пробный емтихан НИШ/БИЛ" : meta?.name ?? "Тақырып",
      subtitle: isMock ? null : meta?.subjectName ?? null,
      isMockExam: isMock,
      score: r.score,
      total: r.total,
      pct: pct(r.score, r.total),
      createdAt: r.createdAt.toISOString(),
    };
  });

  const allPcts = results.map((r) => pct(r.score, r.total));
  const dates = results.map((r) => r.createdAt);

  return {
    totals: {
      tests: results.length,
      mockExams: mockExams.length,
      avgPct: allPcts.length > 0 ? Math.round(allPcts.reduce((a, b) => a + b, 0) / allPcts.length) : 0,
      bestPct: allPcts.length > 0 ? Math.max(...allPcts) : 0,
      correct,
      answered,
      streakDays: computeStreak(dates),
      activeDays7: computeActiveDays(dates, 7),
      topicsMastered: topics.filter((t) => t.status === "mastered").length,
      topicsTotal: topics.length,
    },
    subjects: subjectProgress,
    topics,
    weakTopics,
    mockExams,
    mockTrend: mockExams.length >= 2 ? mockExams[0].pct - mockExams[1].pct : null,
    history,
    nextStep: pickNextStep(topics, mockExams),
    generatedAt: new Date().toISOString(),
  };
}
