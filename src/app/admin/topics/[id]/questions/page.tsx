"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Question { id: string; text: string; options: string; answer: number }

export default function QuestionsPage() {
  const { id: topicId } = useParams<{ id: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [topicName, setTopicName] = useState("");
  const [loading, setLoading] = useState(true);

  // New question form
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [optA, setOptA] = useState("");
  const [optB, setOptB] = useState("");
  const [optC, setOptC] = useState("");
  const [optD, setOptD] = useState("");
  const [answer, setAnswer] = useState(0);
  const [saving, setSaving] = useState(false);

  function loadData() {
    fetch(`/api/admin/topics/${topicId}`)
      .then((r) => r.json())
      .then((data) => {
        setTopicName(data.name);
        setQuestions(data.questions || []);
        setLoading(false);
      });
  }

  useEffect(() => { loadData(); }, [topicId]); // eslint-disable-line

  function resetForm() {
    setText(""); setOptA(""); setOptB(""); setOptC(""); setOptD("");
    setAnswer(0); setEditId(null); setShowForm(false);
  }

  function editQuestion(q: Question) {
    const opts = JSON.parse(q.options);
    setText(q.text);
    setOptA(opts[0] || ""); setOptB(opts[1] || ""); setOptC(opts[2] || ""); setOptD(opts[3] || "");
    setAnswer(q.answer);
    setEditId(q.id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const options = [optA, optB, optC, optD];

    if (editId) {
      await fetch(`/api/admin/questions/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, options, answer }),
      });
    } else {
      await fetch("/api/admin/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, options, answer, topicId }),
      });
    }

    setSaving(false);
    resetForm();
    loadData();
  }

  async function deleteQuestion(qId: string) {
    if (!confirm("Удалить этот вопрос?")) return;
    await fetch(`/api/admin/questions/${qId}`, { method: "DELETE" });
    loadData();
  }

  if (loading) {
    return <div className="max-w-4xl mx-auto px-4 py-20 text-center text-gray-500">Загрузка...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link href="/admin" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Админ-панель</Link>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Вопросы: {topicName}</h1>
      <p className="text-gray-500 mb-6">{questions.length} вопросов</p>

      {/* Add/edit form */}
      {!showForm ? (
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition mb-6"
        >
          + Добавить вопрос
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-6 mb-6 space-y-4">
          <h3 className="font-bold text-gray-800">{editId ? "Редактировать вопрос" : "Новый вопрос"}</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Текст вопроса</label>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-800"
              placeholder="Чему равно 2+2?"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "A", val: optA, set: setOptA },
              { label: "B", val: optB, set: setOptB },
              { label: "C", val: optC, set: setOptC },
              { label: "D", val: optD, set: setOptD },
            ].map((opt) => (
              <div key={opt.label} className="flex items-center gap-2">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  answer === ["A", "B", "C", "D"].indexOf(opt.label) ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
                }`}>
                  {opt.label}
                </span>
                <input
                  value={opt.val}
                  onChange={(e) => opt.set(e.target.value)}
                  required
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-gray-800 text-sm"
                  placeholder={`Вариант ${opt.label}`}
                />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Правильный ответ</label>
            <div className="flex gap-3">
              {["A", "B", "C", "D"].map((letter, i) => (
                <button
                  key={letter}
                  type="button"
                  onClick={() => setAnswer(i)}
                  className={`w-12 h-12 rounded-xl font-bold text-lg transition ${
                    answer === i
                      ? "bg-green-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50">
              {saving ? "Сохраняю..." : editId ? "Сохранить" : "Добавить"}
            </button>
            <button type="button" onClick={resetForm} className="text-gray-500 hover:text-gray-700">Отмена</button>
          </div>
        </form>
      )}

      {/* Questions list */}
      <div className="space-y-3">
        {questions.map((q, idx) => {
          const opts = JSON.parse(q.options);
          return (
            <div key={q.id} className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium text-gray-800">
                  <span className="text-gray-400 mr-2">#{idx + 1}</span>
                  {q.text}
                </div>
                <div className="flex gap-2 ml-4 shrink-0">
                  <button
                    onClick={() => editQuestion(q)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Изменить
                  </button>
                  <button
                    onClick={() => deleteQuestion(q.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Удалить
                  </button>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {opts.map((opt: string, i: number) => (
                  <span
                    key={i}
                    className={`text-xs px-2 py-1 rounded ${
                      i === q.answer ? "bg-green-100 text-green-700 font-bold" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}: {opt}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
