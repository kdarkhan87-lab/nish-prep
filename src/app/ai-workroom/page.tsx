"use client";

import { useState } from "react";

const agents = [
  {
    name: "ChatGPT",
    role: "Мозг проекта",
    color: "bg-blue-50 border-blue-200 text-blue-800",
    tasks: [
      "Стратегия продукта и архитектура обучения",
      "Методический аудит материалов",
      "Промты и задачи для Codex / Claude Code",
      "Проверка UX для ребёнка и отчётов для родителей",
    ],
  },
  {
    name: "Claude Code",
    role: "Исполнитель кода локально",
    color: "bg-purple-50 border-purple-200 text-purple-800",
    tasks: [
      "Редактирует файлы проекта",
      "Запускает npm / build / lint",
      "Исправляет ошибки TypeScript и UI",
      "Делает большие refactor-задачи по шагам",
    ],
  },
  {
    name: "Codex",
    role: "GitHub / PR исполнитель",
    color: "bg-green-50 border-green-200 text-green-800",
    tasks: [
      "Создаёт ветки, commit, PR",
      "Проверяет diff и CI",
      "Делает точечные исправления",
      "Пишет UPGRADE_NOTES.md после работы",
    ],
  },
];

const backlog = [
  { title: "Диагностика ученика", owner: "Codex", status: "Next", impact: "Родитель сразу видит уровень ребёнка" },
  { title: "Parent report", owner: "Claude Code", status: "Next", impact: "Повышает доверие и коммерческую ценность" },
  { title: "Structured content importer", owner: "Codex", status: "Planned", impact: "Материалы будут управляться как система" },
  { title: "Gold-standard lesson: Бөлінгіштік", owner: "ChatGPT + Claude", status: "Planned", impact: "Эталон качества для всех тем" },
  { title: "Adaptive weak-skill review", owner: "Codex", status: "Planned", impact: "Сайт реально повышает навык" },
  { title: "NIS/BIL exam modes", owner: "ChatGPT + Codex", status: "Planned", impact: "Реалистичная подготовка к поступлению" },
];

const prompts = [
  {
    title: "Общий промт для Codex / Claude Code",
    text: `Ты работаешь над проектом nish-prep.\n\nЦель: сделать профессиональную коммерческую платформу подготовки 5–6 класса к НИШ/БИЛ.\n\nРаботай автономно. Пользователя не спрашивай, если вопрос технический.\n\nПравила:\n1. Создавай отдельную ветку под задачу.\n2. Не ломай существующие страницы.\n3. После изменений запускай npm run lint и npm run build.\n4. Если ошибка — исправляй сам.\n5. В конце пиши UPGRADE_NOTES.md: что сделал, что проверил, что осталось.`,
  },
  {
    title: "Промт для методического аудита",
    text: `Проверь материал как строгий методист НИШ/БИЛ.\n\nОцени:\n- понятность для 5–6 класса;\n- есть ли пример;\n- есть ли частая ошибка;\n- есть ли подсказка;\n- объяснение учит или просто показывает ответ;\n- есть ли skill и mistakeType;\n- готово ли для платного продукта.\n\nЕсли качество ниже 4/5 — перепиши.`,
  },
  {
    title: "Промт для PR результата",
    text: `После выполнения задачи создай отчёт:\n\n1. Какие файлы изменены.\n2. Что добавлено для ученика.\n3. Что добавлено для родителя.\n4. npm run lint: pass/fail.\n5. npm run build: pass/fail.\n6. Какие риски остались.\n7. Следующий рекомендуемый PR.`,
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <button
      onClick={copy}
      className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-gray-700"
    >
      {copied ? "Скопировано" : "Копировать"}
    </button>
  );
}

export default function AiWorkroomPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <section className="mb-8 rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-700 p-8 text-white shadow-lg">
        <div className="mb-3 inline-flex rounded-full bg-white/15 px-4 py-1 text-sm font-bold">
          AI Workroom для nish-prep
        </div>
        <h1 className="text-3xl font-extrabold md:text-5xl">
          Единая страница управления GPT, Claude Code и Codex
        </h1>
        <p className="mt-4 max-w-3xl text-blue-50">
          Здесь фиксируется кто за что отвечает, какие задачи делать дальше, какие промты давать агентам и какой результат ждать по проекту НИШ/БИЛ.
        </p>
      </section>

      <section className="mb-8 grid gap-5 md:grid-cols-3">
        {agents.map((agent) => (
          <div key={agent.name} className={`rounded-3xl border-2 p-6 shadow-sm ${agent.color}`}>
            <div className="text-sm font-bold uppercase opacity-70">{agent.role}</div>
            <h2 className="mt-1 text-2xl font-extrabold">{agent.name}</h2>
            <ul className="mt-4 space-y-2 text-sm font-medium">
              {agent.tasks.map((task) => (
                <li key={task} className="flex gap-2">
                  <span>✓</span>
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">Общий workflow</h2>
            <p className="mt-1 text-gray-500">Так агенты должны работать над одной задачей без хаоса.</p>
          </div>
          <div className="rounded-2xl bg-amber-50 px-4 py-3 text-sm font-bold text-amber-700">
            Источник правды: GitHub branch + UPGRADE_NOTES.md
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          {["1. GPT ставит задачу", "2. Codex создаёт ветку", "3. Claude/Codex меняет код", "4. lint/build", "5. PR + notes"].map((step) => (
            <div key={step} className="rounded-2xl bg-gray-50 p-4 text-center font-bold text-gray-700">
              {step}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <h2 className="mb-4 text-2xl font-extrabold text-gray-900">Backlog по сайту</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-gray-600">
                <th className="p-4">Задача</th>
                <th className="p-4">Исполнитель</th>
                <th className="p-4">Статус</th>
                <th className="p-4">Польза</th>
              </tr>
            </thead>
            <tbody>
              {backlog.map((item) => (
                <tr key={item.title} className="border-b last:border-0">
                  <td className="p-4 font-bold text-gray-900">{item.title}</td>
                  <td className="p-4 text-gray-700">{item.owner}</td>
                  <td className="p-4">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{item.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {prompts.map((prompt) => (
          <div key={prompt.title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <div className="mb-4 flex items-start justify-between gap-3">
              <h3 className="text-lg font-extrabold text-gray-900">{prompt.title}</h3>
              <CopyButton text={prompt.text} />
            </div>
            <pre className="max-h-72 overflow-auto whitespace-pre-wrap rounded-2xl bg-gray-950 p-4 text-xs leading-relaxed text-gray-100">
              {prompt.text}
            </pre>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-3xl bg-gray-900 p-6 text-white">
        <h2 className="text-2xl font-extrabold">Важное ограничение</h2>
        <p className="mt-3 max-w-4xl text-gray-200">
          Эта страница является командным центром. Реальное автоматическое общение между ChatGPT, Claude Code и Codex возможно только через общий источник: GitHub PR, issues, notes или отдельный backend с API-ключами. Поэтому текущий рабочий стандарт — все агенты пишут результат в GitHub и UPGRADE_NOTES.md.
        </p>
      </section>
    </div>
  );
}
