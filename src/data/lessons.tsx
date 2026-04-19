"use client";

import type { ReactNode } from "react";

export type Scene = {
  duration: number;
  render: () => ReactNode;
};

export type LessonConfig = {
  audioSrc: string;
  scenes: Scene[];
  matchSection?: RegExp;
  title: string;
  durationLabel: string;
};

export const LESSON_01_NATURAL_NUMBERS: LessonConfig = {
  audioSrc: "/lessons/lesson-01-audio.mp3",
  title: "САБАҚ №1 · НАТУРАЛ САНДАР",
  durationLabel: "Ұзақтығы: 1 минут",
  scenes: [
    {
      duration: 9000,
      render: () => (
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="px-5 py-2 rounded-full bg-sky-500/15 border border-sky-400/40 text-sky-300 text-xs font-semibold tracking-[0.2em] uppercase">
            САБАҚ №1
          </span>
          <h1 className="text-5xl md:text-7xl font-black leading-tight bg-gradient-to-r from-white to-sky-400 bg-clip-text text-transparent">
            Натурал сандар
            <br />
            және амалдар
          </h1>
          <p className="text-slate-400 text-lg md:text-xl mt-2">Математика · 5-6 сынып</p>
        </div>
      ),
    },
    {
      duration: 8000,
      render: () => (
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold">Натурал сан дегеніміз не?</h2>
          <p className="text-slate-400 text-lg md:text-xl">Заттарды санауға арналған сандар</p>
          <div className="font-mono text-4xl md:text-6xl font-bold text-amber-400 tracking-widest mt-4 animate-pulse-slow">
            1, 2, 3, 4, 5, ...
          </div>
        </div>
      ),
    },
    {
      duration: 15000,
      render: () => (
        <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold">3 негізгі ереже</h2>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-4 p-4 bg-white/5 border-l-4 border-red-500 rounded-lg animate-slide-in" style={{ animationDelay: "0.2s" }}>
              <span className="text-3xl">❌</span>
              <span className="text-lg md:text-2xl font-semibold">Нөл натурал сан <b>емес</b></span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white/5 border-l-4 border-emerald-500 rounded-lg animate-slide-in" style={{ animationDelay: "4s" }}>
              <span className="text-3xl">✅</span>
              <span className="text-lg md:text-2xl font-semibold">Ең кіші натурал сан — <b>1</b></span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white/5 border-l-4 border-amber-500 rounded-lg animate-slide-in" style={{ animationDelay: "8s" }}>
              <span className="text-3xl">♾</span>
              <span className="text-lg md:text-2xl font-semibold">Ең үлкені <b>жоқ</b> — шексіз</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      duration: 18000,
      render: () => (
        <div className="flex flex-col items-center gap-6 w-full max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold">4 негізгі амал</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full font-mono">
            {[
              { label: "Қосу", eq: "3 + 2 =", result: "5", delay: "0.5s" },
              { label: "Азайту", eq: "7 − 4 =", result: "3", delay: "4.5s" },
              { label: "Көбейту", eq: "4 × 3 =", result: "12", delay: "9s" },
              { label: "Бөлу", eq: "10 ÷ 2 =", result: "5", delay: "13s" },
            ].map((op) => (
              <div key={op.label} className="p-5 bg-white/5 border border-white/10 rounded-xl opacity-0 animate-fade-up" style={{ animationDelay: op.delay }}>
                <div className="font-sans text-xs text-slate-400 uppercase tracking-[0.2em] mb-2">{op.label}</div>
                <div className="text-2xl md:text-4xl font-bold">
                  {op.eq} <span className="text-emerald-400">{op.result}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      duration: 7000,
      render: () => (
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold">НИШ емтиханында</h2>
          <div className="px-12 py-8 rounded-2xl bg-gradient-to-br from-blue-800 to-purple-700 shadow-[0_20px_60px_rgba(109,40,217,0.3)]">
            <div className="text-7xl md:text-9xl font-black text-white leading-none">3–5</div>
            <div className="text-sm md:text-lg text-slate-200 mt-2">сұрақ осы тақырыптан</div>
          </div>
          <p className="text-slate-400 text-base md:text-lg mt-2">Сондықтан жақсы меңгеру өте маңызды!</p>
        </div>
      ),
    },
    {
      duration: 4000,
      render: () => (
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="px-5 py-2 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-[0.2em] uppercase">
            ДАЙЫНСЫҢ БА?
          </span>
          <div className="text-4xl md:text-6xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent leading-tight">
            Тесттерді шешіп
            <br />
            көрейік!
          </div>
          <p className="text-slate-400 text-lg mt-2">Сәттілік!</p>
        </div>
      ),
    },
  ],
};

export type LessonKey =
  | "lesson-01-natural-numbers"
  | "lesson-02-razryad"
  | "lesson-03-amaldar-reti"
  | "lesson-04-darezhe";

export const LESSON_02_RAZRYAD: LessonConfig = {
  audioSrc: "/lessons/lesson-02-audio.mp3",
  title: "БӨЛІМ №2 · РАЗРЯДТАР",
  durationLabel: "Ұзақтығы: 1 минут",
  matchSection: /разряд/i,
  scenes: [
    {
      duration: 8000,
      render: () => (
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="px-5 py-2 rounded-full bg-purple-500/15 border border-purple-400/40 text-purple-300 text-xs font-semibold tracking-[0.2em] uppercase">
            БӨЛІМ №2
          </span>
          <h1 className="text-5xl md:text-7xl font-black leading-tight bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
            Разрядтар
          </h1>
          <p className="text-slate-400 text-lg md:text-xl mt-2">Цифрдың орны және мәні</p>
        </div>
      ),
    },
    {
      duration: 8000,
      render: () => (
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold">Разряд дегеніміз не?</h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-xl">
            Цифрдың сандағы <b className="text-amber-300">орны</b>.
            <br />
            Орын цифрдың мәнін анықтайды.
          </p>
        </div>
      ),
    },
    {
      duration: 14000,
      render: () => (
        <div className="flex flex-col items-center gap-6 w-full max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-bold">Мысал: 3847</h2>
          <div className="font-mono flex gap-2 md:gap-4">
            {[
              { digit: "3", label: "мыңдық", value: "3000", color: "text-sky-400" },
              { digit: "8", label: "жүздік", value: "800", color: "text-amber-400" },
              { digit: "4", label: "ондық", value: "40", color: "text-emerald-400" },
              { digit: "7", label: "бірлік", value: "7", color: "text-pink-400" },
            ].map((d, i) => (
              <div
                key={d.digit}
                className="flex flex-col items-center gap-2 p-3 md:p-5 bg-white/5 border border-white/10 rounded-xl opacity-0 animate-fade-up"
                style={{ animationDelay: `${0.5 + i * 2.5}s` }}
              >
                <div className={`text-5xl md:text-7xl font-black ${d.color}`}>{d.digit}</div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider text-slate-400">{d.label}</div>
                <div className="text-sm md:text-lg font-bold">{d.value}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      duration: 18000,
      render: () => (
        <div className="flex flex-col items-center gap-5 w-full max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-bold">Негізгі разрядтар</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 w-full font-mono">
            {[
              { name: "Бірлік", val: "1", delay: "0.3s" },
              { name: "Ондық", val: "10", delay: "2.3s" },
              { name: "Жүздік", val: "100", delay: "4.3s" },
              { name: "Мыңдық", val: "1 000", delay: "6.3s" },
              { name: "Он мыңдық", val: "10 000", delay: "8.3s" },
              { name: "Жүз мыңдық", val: "100 000", delay: "10.3s" },
              { name: "Миллион", val: "1 000 000", delay: "12.3s" },
              { name: "...", val: "→", delay: "14.3s" },
            ].map((r) => (
              <div
                key={r.name}
                className="p-3 bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-lg opacity-0 animate-fade-up"
                style={{ animationDelay: r.delay }}
              >
                <div className="font-sans text-[10px] md:text-xs uppercase tracking-wider text-slate-400 mb-1">{r.name}</div>
                <div className="text-base md:text-xl font-bold text-amber-300">{r.val}</div>
              </div>
            ))}
          </div>
          <p className="text-sm md:text-base text-slate-400 text-center mt-2">
            Әр разряд алдыңғысынан <b className="text-amber-300">10 есе</b> үлкен
          </p>
        </div>
      ),
    },
    {
      duration: 10000,
      render: () => (
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-2xl md:text-4xl font-bold">Сұрақ:</h2>
          <div className="font-mono text-4xl md:text-6xl font-black">
            5<span className="text-red-400">2</span>34
          </div>
          <p className="text-base md:text-xl text-slate-300">
            Цифр <b className="text-red-400">2</b> қандай разрядта?
          </p>
          <div className="px-8 py-4 rounded-xl bg-emerald-500/15 border-2 border-emerald-400 animate-fade-up" style={{ animationDelay: "3s" }}>
            <div className="text-2xl md:text-3xl font-bold text-emerald-300">Жүздіктерде!</div>
            <div className="text-sm md:text-base text-slate-400 mt-1">Мәні: 200</div>
          </div>
        </div>
      ),
    },
    {
      duration: 4000,
      render: () => (
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="px-5 py-2 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-[0.2em] uppercase">
            ЖАТТЫҒ ВАҚЫТЫ
          </span>
          <div className="text-4xl md:text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Разрядтарды
            <br />
            жаттығайық!
          </div>
        </div>
      ),
    },
  ],
};

export const LESSON_03_AMALDAR_RETI: LessonConfig = {
  audioSrc: "/lessons/lesson-03-audio.mp3",
  title: "БӨЛІМ №3 · АМАЛДАР РЕТІ",
  durationLabel: "Ұзақтығы: 1:17",
  matchSection: /амалдар реті|амалдар\s*рет/i,
  scenes: [
    {
      duration: 8000,
      render: () => (
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="px-5 py-2 rounded-full bg-rose-500/15 border border-rose-400/40 text-rose-300 text-xs font-semibold tracking-[0.2em] uppercase">
            БӨЛІМ №3
          </span>
          <h1 className="text-5xl md:text-7xl font-black leading-tight bg-gradient-to-r from-white to-rose-400 bg-clip-text text-transparent">
            Амалдар реті
          </h1>
          <p className="text-slate-400 text-lg md:text-xl mt-2">
            НИШ-те ең көп қате жіберілетін жер
          </p>
        </div>
      ),
    },
    {
      duration: 20000,
      render: () => (
        <div className="flex flex-col items-center gap-2 md:gap-4 w-full max-w-2xl">
          <h2 className="text-lg md:text-3xl font-bold">4 қадамдық тәртіп</h2>
          <div className="flex flex-col gap-1.5 md:gap-3 w-full">
            {[
              { n: 1, name: "Жақша", sym: "( )", color: "border-sky-500", bgColor: "bg-sky-500/15", delay: "0.3s" },
              { n: 2, name: "Дәреже", sym: "²  ³", color: "border-amber-500", bgColor: "bg-amber-500/15", delay: "5s" },
              { n: 3, name: "Көбейту / Бөлу", sym: "× ÷", color: "border-emerald-500", bgColor: "bg-emerald-500/15", delay: "9s" },
              { n: 4, name: "Қосу / Азайту", sym: "+ −", color: "border-purple-500", bgColor: "bg-purple-500/15", delay: "13s" },
            ].map((r) => (
              <div
                key={r.n}
                className={`flex items-center gap-2 md:gap-4 px-2 py-1.5 md:p-4 ${r.bgColor} border-l-4 ${r.color} rounded-lg opacity-0 animate-slide-in`}
                style={{ animationDelay: r.delay }}
              >
                <div className="w-6 h-6 md:w-11 md:h-11 rounded-full bg-white/10 flex items-center justify-center text-xs md:text-xl font-black flex-shrink-0">
                  {r.n}
                </div>
                <div className="flex-1 text-sm md:text-2xl font-semibold truncate">{r.name}</div>
                <div className="font-mono text-base md:text-2xl font-bold flex-shrink-0">{r.sym}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      duration: 6000,
      render: () => (
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-slate-400 text-base md:text-lg uppercase tracking-[0.3em]">
            Есте сақта
          </p>
          <div className="font-mono text-3xl md:text-5xl font-black flex flex-wrap items-center justify-center gap-2 md:gap-3">
            <span className="text-sky-400">Жақша</span>
            <span className="text-slate-500">→</span>
            <span className="text-amber-400">Дәреже</span>
            <span className="text-slate-500">→</span>
            <span className="text-emerald-400">КБ</span>
            <span className="text-slate-500">→</span>
            <span className="text-purple-400">ҚА</span>
          </div>
        </div>
      ),
    },
    {
      duration: 15000,
      render: () => (
        <div className="flex flex-col items-center gap-5 w-full max-w-2xl">
          <h2 className="text-xl md:text-3xl font-bold text-slate-300">Оңай мысал</h2>
          <div className="font-mono text-4xl md:text-6xl font-black">
            2 + 3 × 4
          </div>
          <div className="flex flex-col gap-2 items-center mt-2">
            <div className="px-5 py-2 rounded-lg bg-emerald-500/15 border border-emerald-400/40 font-mono text-xl md:text-3xl opacity-0 animate-fade-up" style={{ animationDelay: "3s" }}>
              3 × 4 = <span className="text-emerald-400 font-bold">12</span>
            </div>
            <div className="px-5 py-2 rounded-lg bg-emerald-500/15 border border-emerald-400/40 font-mono text-xl md:text-3xl opacity-0 animate-fade-up" style={{ animationDelay: "7s" }}>
              2 + 12 = <span className="text-emerald-400 font-bold">14</span>
            </div>
            <div className="mt-2 text-sm md:text-base text-slate-400 opacity-0 animate-fade-up" style={{ animationDelay: "10s" }}>
              Көбейту бірінші — сондықтан 20 емес, <b className="text-emerald-400">14</b>!
            </div>
          </div>
        </div>
      ),
    },
    {
      duration: 10000,
      render: () => (
        <div className="flex flex-col items-center gap-4 w-full max-w-xl">
          <span className="px-5 py-2 rounded-full bg-red-500/15 border border-red-400/40 text-red-300 text-xs font-semibold tracking-[0.2em] uppercase">
            Жиі қате
          </span>
          <div className="font-mono text-3xl md:text-5xl font-bold text-center">
            2 + 3 × 4 <span className="text-red-400">≠</span> 20
          </div>
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <p className="text-sm md:text-base text-slate-300 text-center">
              Солдан оңға жай санау: <span className="line-through text-red-400">2+3=5, 5×4=20</span>
              <br />
              Көбейту әрқашан <b className="text-amber-300">қосудан бұрын</b>!
            </p>
          </div>
        </div>
      ),
    },
    {
      duration: 15000,
      render: () => (
        <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
          <h2 className="text-xl md:text-3xl font-bold text-slate-300">Күрделі мысал</h2>
          <div className="font-mono text-2xl md:text-4xl font-black">
            5 + 3 × 2² − 1
          </div>
          <div className="flex flex-col gap-2 items-center mt-2 font-mono text-base md:text-xl">
            <div className="px-4 py-2 rounded-lg bg-amber-500/15 border border-amber-400/40 opacity-0 animate-fade-up" style={{ animationDelay: "2s" }}>
              <span className="text-xs text-slate-400 mr-2">1)</span>
              2² = <span className="text-amber-400 font-bold">4</span>
            </div>
            <div className="px-4 py-2 rounded-lg bg-emerald-500/15 border border-emerald-400/40 opacity-0 animate-fade-up" style={{ animationDelay: "5s" }}>
              <span className="text-xs text-slate-400 mr-2">2)</span>
              3 × 4 = <span className="text-emerald-400 font-bold">12</span>
            </div>
            <div className="px-4 py-2 rounded-lg bg-purple-500/15 border border-purple-400/40 opacity-0 animate-fade-up" style={{ animationDelay: "8s" }}>
              <span className="text-xs text-slate-400 mr-2">3)</span>
              5 + 12 − 1 = <span className="text-purple-300 font-bold">16</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      duration: 3000,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="text-3xl md:text-5xl font-black bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent leading-tight">
            Ретін ұмытпа!
          </div>
          <p className="text-slate-400 text-sm md:text-base">Жаттығайық →</p>
        </div>
      ),
    },
  ],
};

export const LESSON_04_DAREZHE: LessonConfig = {
  audioSrc: "/lessons/lesson-04-audio.mp3",
  title: "БӨЛІМ №4 · ДӘРЕЖЕ",
  durationLabel: "Ұзақтығы: 1:09",
  matchSection: /^#*\s*дәреже/i,
  scenes: [
    {
      duration: 7000,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="px-5 py-2 rounded-full bg-indigo-500/15 border border-indigo-400/40 text-indigo-300 text-xs font-semibold tracking-[0.2em] uppercase">
            БӨЛІМ №4
          </span>
          <h1 className="text-5xl md:text-7xl font-black leading-tight bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent">
            Дәреже
          </h1>
          <p className="text-slate-400 text-base md:text-xl mt-1">Қысқа жазудың күшті тәсілі</p>
        </div>
      ),
    },
    {
      duration: 8000,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-xl md:text-3xl font-bold">Дәреже дегеніміз не?</h2>
          <p className="text-slate-300 text-base md:text-xl max-w-lg">
            Санды өзіне <b className="text-amber-300">бірнеше рет көбейту</b>
          </p>
          <div className="font-mono text-2xl md:text-4xl font-bold mt-2 flex items-baseline gap-2">
            <span>a</span>
            <sup className="text-indigo-300 text-base md:text-2xl">n</sup>
            <span className="text-slate-500 mx-2">=</span>
            <span>a × a × ... × a</span>
          </div>
          <p className="text-xs md:text-sm text-slate-500">n рет</p>
        </div>
      ),
    },
    {
      duration: 14000,
      render: () => (
        <div className="flex flex-col items-center gap-5 w-full max-w-2xl">
          <h2 className="text-xl md:text-3xl font-bold">Мысалдар</h2>
          <div className="flex flex-col gap-3 font-mono">
            <div className="flex items-center justify-center gap-2 md:gap-4 opacity-0 animate-fade-up" style={{ animationDelay: "1s" }}>
              <div className="text-2xl md:text-4xl font-bold flex items-baseline">
                5<sup className="text-amber-400 text-base md:text-2xl">2</sup>
              </div>
              <span className="text-slate-500 text-xl md:text-3xl">=</span>
              <div className="text-xl md:text-3xl text-slate-300">5 × 5</div>
              <span className="text-slate-500 text-xl md:text-3xl">=</span>
              <div className="text-2xl md:text-4xl font-black text-emerald-400">25</div>
            </div>
            <div className="flex items-center justify-center gap-2 md:gap-4 opacity-0 animate-fade-up" style={{ animationDelay: "5.5s" }}>
              <div className="text-2xl md:text-4xl font-bold flex items-baseline">
                2<sup className="text-amber-400 text-base md:text-2xl">3</sup>
              </div>
              <span className="text-slate-500 text-xl md:text-3xl">=</span>
              <div className="text-xl md:text-3xl text-slate-300">2 × 2 × 2</div>
              <span className="text-slate-500 text-xl md:text-3xl">=</span>
              <div className="text-2xl md:text-4xl font-black text-emerald-400">8</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      duration: 12000,
      render: () => (
        <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
          <h2 className="text-xl md:text-3xl font-bold">10-ның дәрежелері</h2>
          <div className="grid grid-cols-3 gap-2 md:gap-4 font-mono w-full">
            {[
              { base: "10", exp: "2", val: "100", delay: "0.5s" },
              { base: "10", exp: "3", val: "1 000", delay: "3s" },
              { base: "10", exp: "4", val: "10 000", delay: "5.5s" },
            ].map((p) => (
              <div
                key={p.exp}
                className="flex flex-col items-center gap-2 p-3 md:p-4 bg-gradient-to-br from-indigo-500/15 to-purple-500/15 border border-indigo-500/30 rounded-xl opacity-0 animate-fade-up"
                style={{ animationDelay: p.delay }}
              >
                <div className="text-2xl md:text-4xl font-bold flex items-baseline">
                  {p.base}
                  <sup className="text-indigo-300 text-sm md:text-xl">{p.exp}</sup>
                </div>
                <div className="text-slate-500 text-sm">=</div>
                <div className="text-lg md:text-2xl font-black text-amber-300">{p.val}</div>
              </div>
            ))}
          </div>
          <p className="text-xs md:text-sm text-slate-400 text-center">
            Көрсеткіш ↑ — нөлдер саны ↑
          </p>
        </div>
      ),
    },
    {
      duration: 9000,
      render: () => (
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-xs font-semibold tracking-[0.2em] uppercase">
            Маңызды ереже
          </span>
          <div className="font-mono text-4xl md:text-7xl font-black flex items-baseline">
            a<sup className="text-indigo-300 text-xl md:text-3xl">0</sup>
            <span className="mx-4 text-slate-500">=</span>
            <span className="text-emerald-400">1</span>
          </div>
          <p className="text-slate-300 text-sm md:text-lg max-w-md">
            Кез келген санның нөлінші дәрежесі — бір
          </p>
          <div className="font-mono text-base md:text-xl text-slate-400 flex gap-4 md:gap-6">
            <span>5⁰ = 1</span>
            <span>100⁰ = 1</span>
            <span>99⁰ = 1</span>
          </div>
        </div>
      ),
    },
    {
      duration: 14000,
      render: () => (
        <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
          <span className="px-4 py-1.5 rounded-full bg-red-500/15 border border-red-400/40 text-red-300 text-xs font-semibold tracking-[0.2em] uppercase">
            Жиі қате
          </span>
          <h2 className="text-lg md:text-2xl font-bold">Шатастырма!</h2>
          <div className="grid grid-cols-2 gap-3 md:gap-5 w-full font-mono">
            <div className="p-3 md:p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center opacity-0 animate-fade-up" style={{ animationDelay: "1s" }}>
              <div className="text-xs md:text-sm text-emerald-400 uppercase tracking-wider mb-2">Дәреже</div>
              <div className="text-2xl md:text-4xl font-bold flex items-baseline justify-center">
                3<sup className="text-amber-400 text-base md:text-2xl">3</sup>
              </div>
              <div className="text-sm md:text-lg text-slate-400 mt-1">3×3×3</div>
              <div className="text-2xl md:text-4xl font-black text-emerald-400 mt-1">27</div>
            </div>
            <div className="p-3 md:p-5 rounded-xl bg-red-500/10 border border-red-500/30 text-center opacity-0 animate-fade-up" style={{ animationDelay: "5s" }}>
              <div className="text-xs md:text-sm text-red-400 uppercase tracking-wider mb-2">Көбейту</div>
              <div className="text-2xl md:text-4xl font-bold">3 × 3</div>
              <div className="text-sm md:text-lg text-slate-400 mt-3">тек екі рет</div>
              <div className="text-2xl md:text-4xl font-black text-red-400 mt-1">9</div>
            </div>
          </div>
          <p className="text-xs md:text-sm text-slate-400 text-center opacity-0 animate-fade-up" style={{ animationDelay: "9s" }}>
            27 ≠ 9 — мүлдем басқа!
          </p>
        </div>
      ),
    },
    {
      duration: 5000,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="text-3xl md:text-5xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent leading-tight">
            Дәрежені
            <br />
            игеретін уақыт!
          </div>
          <p className="text-slate-400 text-sm md:text-base">Тесттерге дайындалайық →</p>
        </div>
      ),
    },
  ],
};

export const LESSONS_BY_KEY: Record<LessonKey, LessonConfig> = {
  "lesson-01-natural-numbers": LESSON_01_NATURAL_NUMBERS,
  "lesson-02-razryad": LESSON_02_RAZRYAD,
  "lesson-03-amaldar-reti": LESSON_03_AMALDAR_RETI,
  "lesson-04-darezhe": LESSON_04_DAREZHE,
};
