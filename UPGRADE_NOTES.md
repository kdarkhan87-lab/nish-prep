# UPGRADE_NOTES

## 2026-10-23 — P0: безопасный mock exam + устойчивость тестов

### Что было сломано

1. **`GET /api/mock-exam` зависал навсегда**, если в базе меньше 30 вопросов.
   Цикл `while (selected.length < 30)` никогда не завершался — запрос висел,
   Vercel-функция упиралась в таймаут, страница «Емтиханды бастау» крутила «Жүктелуде...».
   При **нуле** вопросов роут падал с `TypeError` (`topicIds[NaN]`).
2. **Результаты пробного экзамена не сохранялись.** На странице написано «Кіріңіз — нәтижені
   сақтау үшін», но `POST /api/mock-exam/results` ничего не писал в `TestResult`.
   Ребёнок не видел экзамен в кабинете, родитель — в истории, рейтинг его не учитывал.
3. **Деление на ноль** в `/api/results`, `/api/mock-exam/results`, дашборде и админ-статистике
   (`score / total` при `total = 0` → `NaN%`).
4. **Страница теста по теме падала** (`q.text` на `undefined`), если у темы нет вопросов или
   API вернул ошибку.
5. **Таймеры** в обоих тестах вызывали `submit` изнутри `setState`-апдейтера (side effect в
   updater — в StrictMode срабатывает дважды) и пересоздавали `setInterval` каждую секунду.
6. **Отсутствовала валидация** входных данных в `/api/results`, `/api/mock-exam/results`,
   `/api/register` (`answers: undefined` → 500; пароль из 1 символа; email с пробелами/заглавными).
7. **`npm run lint` падал с 13 ошибками** (`no-explicit-any`, `prefer-const`, доступ к ref в render).

### Что изменено

| Файл | Изменение |
|------|-----------|
| `src/lib/mock-exam.ts` (новый) | Константы (`MOCK_EXAM_SIZE = 30`, `MOCK_EXAM_DURATION_SEC`, `MOCK_EXAM_TOPIC_ID = "mock-exam"`), Fisher–Yates `shuffle`, `pickBalancedQuestions` (round-robin по темам, всегда завершается, возвращает `min(30, всего)`), `parseOptions` (безопасный JSON.parse). |
| `src/app/api/mock-exam/route.ts` | Использует `pickBalancedQuestions`. Нет бесконечного цикла. При ошибке БД — 500 с текстом вместо падения. |
| `src/app/api/mock-exam/results/route.ts` | Валидация `answers`/`questionIds`, 400/404 на пустой ввод. Детали возвращаются в порядке экзамена (раньше — в порядке БД, нумерация «#1» не совпадала). **Результат сохраняется в `TestResult` с `topicId = "mock-exam"`.** |
| `src/app/api/results/route.ts` | Валидация тела, 404 если у темы нет вопросов, `userId` проверяется. |
| `src/app/mock-exam/page.tsx` | Обработка ошибок загрузки/отправки, пустого набора вопросов, таймер через `useRef` без side effect в updater, подтверждение при незавершённых ответах, ссылка в кабинет после экзамена. Числа 30/60 берутся из констант. |
| `src/app/subjects/[slug]/[topicId]/test/page.tsx` | Экран «в теме нет вопросов» со ссылкой на теорию, экран ошибки с «Қайта жүктеу», таймер через `useRef`, обработка ошибок отправки, сброс таймера при пересдаче. |
| `src/app/dashboard/page.tsx` | Пробный экзамен показывается как «🎯 Пробный емтихан НИШ/БИЛ», защита от `total = 0`. |
| `src/app/api/admin/stats/route.ts` | То же для админ-ленты результатов. |
| `src/app/api/register/route.ts` | Trim + lowercase email, проверка формата, пароль ≥ 6 символов, класс 1–11. |
| `src/lib/auth.ts` | Вход регистронезависим по email (сначала lowercase, затем как введено — для старых аккаунтов). |
| `src/app/admin/page.tsx`, `src/app/subjects/**`, `src/components/LessonVideo.tsx`, `scripts/*.ts` | Исправления под ESLint: типы вместо `any`, `const`, прогресс видео из state вместо ref. |

### Команды и результат

```
npm ci                          OK
npx eslint                      0 errors, 1 warning (неиспользуемая findBestSection — было и раньше)
npx tsc --noEmit                OK
npx next build                  OK (21 страниц, все роуты собрались)
npx tsx <scratch>/check-pick.ts 13/13 проверок pickBalancedQuestions: 0, 5, 30, 100 вопросов,
                                перекошенные темы, size=0, parseOptions
```

`npm run build` целиком (`prisma migrate deploy && next build`) здесь не запускался — нет доступа
к продовой БД. Схема Prisma не менялась, миграции не требуются.

### Что НЕ сделано / на что обратить внимание

- **Деплой на Vercel не выполнялся** (по CLAUDE.md деплой ручной: `npx vercel --prod --yes`).
- Результаты экзамена идут в общий рейтинг на главной наравне с тестами по темам. Если это
  нежелательно — отфильтровать по `MOCK_EXAM_TOPIC_ID` в `src/app/page.tsx`.
- `findBestSection` в `TheoryRenderer.tsx` не используется — можно удалить отдельным коммитом.

### Критерии ChatGPT-плана

- build/lint не сломаны — ✅ (lint стал чище: 13 → 0 ошибок)
- ребёнок получает понятный следующий шаг — ✅ пустая тема ведёт в теорию, после экзамена — в кабинет
- родитель видит прогресс — ✅ экзамены теперь в истории кабинета и в админ-ленте
- ошибка объясняется — ✅ вместо вечной загрузки/белого экрана показывается текст ошибки и кнопка повтора
