@AGENTS.md

# NISH-Prep — проект дайындық платформасы

Next.js 16 (turbopack) + Prisma (PostgreSQL в prod, SQLite может быть в dev) + NextAuth + Tailwind.
Продакшн: https://nish-prep.vercel.app

## Деплой

Vercel **не привязан к GitHub push** для этого репо. После `git push` автодеплой **не срабатывает**.
**Всегда деплоить вручную** из папки проекта:

```bash
cd /c/projects/nish-prep
npx vercel --prod --yes
```

## Анимированные видео-уроки

Каждая тема теории может иметь:
- **Интро-видео** (над теорией) — через `<LessonVideoByKey lessonKey="..." />` в [theory/page.tsx](src/app/subjects/%5Bslug%5D/%5BtopicId%5D/theory/page.tsx)
- **Секционные видео** (внутри теории, после заголовка раздела) — через `sectionLessonKeys` в `<TheoryRenderer>`

**Полный гайд с пайплайном генерации аудио + создания сцен:**
→ [scripts/lessons/README.md](scripts/lessons/README.md)

### Критически важно при работе с видео:

1. **Длительности сцен** (`duration: NNNN`) в [src/data/lessons.tsx](src/data/lessons.tsx) **ОБЯЗАТЕЛЬНО** брать из `timings.json`, который производит [scripts/lessons/generate_all.py](scripts/lessons/generate_all.py). Ручной подбор = рассинхрон аудио.

2. **Сцены проигрываются через `audio.currentTime`** в [src/components/LessonVideo.tsx](src/components/LessonVideo.tsx) — тик привязан к реальному времени аудио, не к wall clock. Это гарантирует идеальную синхронизацию.

3. **Функции `render` нельзя передавать через RSC boundary**. Server Component передаёт только строковые `lessonKey`. Клиентские компоненты (TheoryRenderer, LessonVideoByKey) делают lookup через `LESSONS_BY_KEY`.

4. **Исходники текстов** уроков в [scripts/lessons/texts/](scripts/lessons/texts/) — редактируй их если нужно поправить формулировку, потом пересгенерируй аудио + обнови `duration` в lessons.tsx.

5. **Сцены не должны обрезаться на мобилке**. Каждая сцена рендерится в 16:9 контейнер. Используй `text-XL md:text-2XL` и не перебарщивай с контентом (max 4-5 элементов).

### Архитектура компонентов видео

```
theory/page.tsx (server)
  │
  ├─ LessonVideoByKey (client) ← intro video над теорией
  │    └─ LessonVideo (client, общий рендерер)
  │
  └─ TheoryRenderer (client)
       └─ sectionLessons → LessonVideo для каждой секции
```

Все клиентские компоненты импортируют `LESSONS_BY_KEY` из [src/data/lessons.tsx](src/data/lessons.tsx).

### Как добавить видео для новой темы / раздела

1. Написать сценарий в `scripts/lessons/texts/lesson-XX.txt`
2. Добавить в `LESSONS` dict в `scripts/lessons/generate_all.py`
3. `cd scripts/lessons && python generate_all.py`
4. `cp lesson-XX-audio.mp3 ../../public/lessons/`
5. Добавить `LESSON_XX` конфиг + `LessonKey` в `src/data/lessons.tsx` (durations из timings.json)
6. Подключить в `theory/page.tsx` через `sectionLessonKeys` или `<LessonVideoByKey>`
7. `npx vercel --prod --yes`

Подробности — в [scripts/lessons/README.md](scripts/lessons/README.md).

## Правила для тем теории

Секционная нумерация в `TheoryRenderer.tsx` пропускает разделы:
- с заголовком "не үшін керек", "есте сақта", "жиі қателер", "дегеніміз не"
- содержащие эмодзи ⚠️ или 🧠
- короче 80 символов

`matchSection` regex в lessons.tsx должен тестироваться против ПЕРВОЙ строки раздела (`## Title`).

## База данных

Dev: `.env` содержит `DATABASE_URL="file:./dev.db"` — SQLite.
Prod: `.env.production` содержит DATABASE_URL для Postgres (Vercel Postgres/Neon).

`src/lib/prisma.ts` **всегда использует PrismaPg adapter** — поэтому локальный dev может падать с ECONNREFUSED если нет подключения к реальной Postgres. Для локальной разработки либо поднимать локальный Postgres, либо рефакторить prisma.ts на условный выбор адаптера.

## Типы тем математики

На момент написания в `math` 16 тем (по `order`). Тема 1 "Натурал сандар және амалдар" имеет полный комплект из 6 видео-уроков. Остальные темы пока без видео — план повторить эту схему для каждой.
