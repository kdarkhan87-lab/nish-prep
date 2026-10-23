/**
 * Пробный емтихан (mock exam) — общие константы и чистая логика подбора вопросов.
 * Файл не импортирует Prisma, поэтому его можно использовать и на клиенте, и на сервере.
 */

/** Сколько вопросов в полном пробном экзамене. */
export const MOCK_EXAM_SIZE = 30;

/** Длительность экзамена в секундах (60 минут). */
export const MOCK_EXAM_DURATION_SEC = 60 * 60;

/**
 * Псевдо-идентификатор темы, под которым результаты пробного экзамена
 * сохраняются в TestResult (у TestResult.topicId нет внешнего ключа).
 */
export const MOCK_EXAM_TOPIC_ID = "mock-exam";

/** Человекочитаемое название для истории результатов. */
export const MOCK_EXAM_LABEL = "Пробный емтихан НИШ/БИЛ";

/** Fisher–Yates: возвращает перемешанную копию массива. */
export function shuffle<T>(items: readonly T[]): T[] {
  const result = items.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Выбирает до `size` вопросов, равномерно распределяя их по темам.
 *
 * Алгоритм:
 *  1. Вопросы группируются по topicId, каждая группа перемешивается.
 *  2. Круг за кругом из каждой темы берётся по одному вопросу (round-robin),
 *     пока не набрано `size` или вопросы не закончились.
 *
 * Всегда завершается: если в базе меньше `size` вопросов — вернёт все, что есть.
 * Если вопросов нет вообще — вернёт пустой массив.
 */
export function pickBalancedQuestions<T extends { id: string; topicId: string }>(
  questions: readonly T[],
  size: number = MOCK_EXAM_SIZE
): T[] {
  if (size <= 0 || questions.length === 0) return [];

  const byTopic = new Map<string, T[]>();
  for (const q of questions) {
    const group = byTopic.get(q.topicId);
    if (group) group.push(q);
    else byTopic.set(q.topicId, [q]);
  }

  // Перемешиваем вопросы внутри каждой темы и порядок самих тем
  const pools = shuffle(Array.from(byTopic.values()).map((group) => shuffle(group)));

  const target = Math.min(size, questions.length);
  const selected: T[] = [];
  let round = 0;

  while (selected.length < target) {
    let tookAny = false;
    for (const pool of pools) {
      if (selected.length >= target) break;
      const q = pool[round];
      if (q !== undefined) {
        selected.push(q);
        tookAny = true;
      }
    }
    if (!tookAny) break; // все пулы исчерпаны — защита от бесконечного цикла
    round++;
  }

  return shuffle(selected);
}

/** Безопасный разбор JSON-строки с вариантами ответов. */
export function parseOptions(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map(String);
  if (typeof raw !== "string") return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}
