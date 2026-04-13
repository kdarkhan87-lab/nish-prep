"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-12 text-center text-white">
          <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl">
            D
          </div>
          <h1 className="text-3xl font-bold mb-2">Дархан</h1>
          <p className="text-blue-200 text-lg">Основатель НИШ/БИЛ Дайындық</p>
        </div>

        {/* Bio */}
        <div className="px-8 py-8">
          <p className="text-gray-600 text-center text-lg leading-relaxed mb-8">
            Онлайн-платформа для подготовки учеников 5-6 классов к поступлению в НИШ и БИЛ.
            Интерактивные тесты, теория и пробные экзамены по математике и логике.
          </p>

          {/* Contact cards */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {/* Instagram */}
            <a
              href="https://instagram.com/Dark_Han_KZ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 p-5 rounded-2xl transition group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-500">Instagram</div>
                <div className="font-bold text-gray-800 group-hover:text-purple-600 transition">@Dark_Han_KZ</div>
              </div>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/dark_han_of_kz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 p-5 rounded-2xl transition group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-500">Telegram</div>
                <div className="font-bold text-gray-800 group-hover:text-blue-600 transition">@dark_han_of_kz</div>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:kdarkhan87@gmail.com"
              className="flex items-center gap-4 bg-gradient-to-r from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100 p-5 rounded-2xl transition group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-orange-500 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <div className="font-bold text-gray-800 group-hover:text-red-600 transition">kdarkhan87@gmail.com</div>
              </div>
            </a>

            {/* Website */}
            <Link
              href="/"
              className="flex items-center gap-4 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 p-5 rounded-2xl transition group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0">
                🎓
              </div>
              <div>
                <div className="text-sm text-gray-500">Сайт</div>
                <div className="font-bold text-gray-800 group-hover:text-green-600 transition">nish-prep.vercel.app</div>
              </div>
            </Link>
          </div>

          {/* CTA */}
          <div className="bg-blue-50 rounded-2xl p-6 text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Ынтымақтастық / Ұсыныстар</h3>
            <p className="text-gray-600 mb-4">
              Платформаны жақсарту бойынша идеяларыңыз бар ма? Немесе бірге жұмыс істегіңіз келе ме? Хабарласыңыз!
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://t.me/dark_han_of_kz"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition"
              >
                Telegram-ға жазу
              </a>
              <a
                href="https://instagram.com/Dark_Han_KZ"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold transition"
              >
                Instagram-ға жазу
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
