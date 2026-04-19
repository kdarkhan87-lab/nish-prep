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
      duration: 8487,
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
      duration: 7947,
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
      duration: 14908,
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
      duration: 16961,
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
      duration: 7355,
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
      duration: 4711,
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
  | "lesson-04-darezhe"
  | "lesson-05-addition-properties"
  | "lesson-06-multiplication-properties"
  | "lesson-t02-intro-shamalar";

export const LESSON_02_RAZRYAD: LessonConfig = {
  audioSrc: "/lessons/lesson-02-audio.mp3",
  title: "БӨЛІМ №2 · РАЗРЯДТАР",
  durationLabel: "Ұзақтығы: 1 минут",
  matchSection: /разряд/i,
  scenes: [
    {
      duration: 6105,
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
      duration: 6987,
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
      duration: 15118,
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
      duration: 16092,
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
      duration: 11316,
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
      duration: 6237,
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
      duration: 10184,
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
      duration: 15342,
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
      duration: 8842,
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
      duration: 12171,
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
      duration: 12487,
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
      duration: 17788,
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
      duration: 5472,
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
      duration: 7158,
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
      duration: 10697,
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
      duration: 10408,
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
      duration: 8342,
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
      duration: 10697,
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
      duration: 13895,
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
      duration: 7972,
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

export const LESSON_05_ADDITION_PROPS: LessonConfig = {
  audioSrc: "/lessons/lesson-05-audio.mp3",
  title: "БӨЛІМ №5 · ҚОСУДЫҢ ҚАСИЕТТЕРІ",
  durationLabel: "Ұзақтығы: 52с",
  matchSection: /қосу.*қасиет/i,
  scenes: [
    {
      duration: 7132,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="px-5 py-2 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-xs font-semibold tracking-[0.2em] uppercase">
            БӨЛІМ №5
          </span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
            Қосудың қасиеттері
          </h1>
          <p className="text-slate-400 text-base md:text-xl mt-1">Жылдам санаудың кілті</p>
        </div>
      ),
    },
    {
      duration: 12947,
      render: () => (
        <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
          <h2 className="text-xl md:text-3xl font-bold">1. Ауыстыру қасиеті</h2>
          <div className="font-mono text-3xl md:text-5xl font-black p-4 md:p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            a + b <span className="text-emerald-400">=</span> b + a
          </div>
          <div className="flex gap-4 md:gap-8 font-mono text-lg md:text-2xl">
            <div className="opacity-0 animate-fade-up" style={{ animationDelay: "4s" }}>
              3 + 7 = <span className="text-amber-400 font-bold">10</span>
            </div>
            <div className="opacity-0 animate-fade-up" style={{ animationDelay: "7s" }}>
              7 + 3 = <span className="text-amber-400 font-bold">10</span>
            </div>
          </div>
          <p className="text-xs md:text-sm text-slate-400">Орын ауысса да — жауап бірдей</p>
        </div>
      ),
    },
    {
      duration: 9842,
      render: () => (
        <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
          <h2 className="text-xl md:text-3xl font-bold">2. Топтау қасиеті</h2>
          <div className="font-mono text-2xl md:text-4xl font-black p-4 md:p-6 rounded-xl bg-sky-500/10 border border-sky-500/30 text-center">
            (a + b) + c <span className="text-sky-400">=</span> a + (b + c)
          </div>
          <p className="text-sm md:text-base text-slate-300 text-center max-w-lg">
            Қосылғыштарды қалағанша <b className="text-amber-300">топтауға</b> болады
          </p>
        </div>
      ),
    },
    {
      duration: 8895,
      render: () => (
        <div className="flex flex-col items-center gap-4 w-full max-w-xl">
          <span className="px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-[0.2em] uppercase">
            Пайдалы мысал
          </span>
          <div className="font-mono text-3xl md:text-5xl font-black">
            37 + 48 + 63 <span className="text-slate-500">= ?</span>
          </div>
          <p className="text-sm md:text-base text-slate-400 text-center">
            Тікелей есептеу ауыр...
            <br />
            Қолайлы жұп табайық!
          </p>
        </div>
      ),
    },
    {
      duration: 8895,
      render: () => (
        <div className="flex flex-col items-center gap-3 w-full max-w-2xl font-mono">
          <div className="text-xl md:text-3xl font-bold text-slate-300">37 + 48 + 63</div>
          <div className="px-4 py-2 rounded-lg bg-emerald-500/15 border border-emerald-400/40 text-lg md:text-2xl opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <span className="text-emerald-400">37 + 63</span> + 48 = <span className="text-amber-300 font-bold">100</span> + 48
          </div>
          <div className="px-4 py-2 rounded-lg bg-amber-500/15 border border-amber-400/40 text-2xl md:text-4xl font-black opacity-0 animate-fade-up" style={{ animationDelay: "4.5s" }}>
            = <span className="text-amber-300">148</span>
          </div>
          <p className="text-xs md:text-sm text-slate-400 text-center mt-1">Жұмыр санды бірінші — үш есе жылдам!</p>
        </div>
      ),
    },
    {
      duration: 4329,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="text-3xl md:text-5xl font-black bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent leading-tight">
            Қолданып көрейік!
          </div>
        </div>
      ),
    },
  ],
};

export const LESSON_06_MULTIPLICATION_PROPS: LessonConfig = {
  audioSrc: "/lessons/lesson-06-audio.mp3",
  title: "БӨЛІМ №6 · КӨБЕЙТУДІҢ ҚАСИЕТТЕРІ",
  durationLabel: "Ұзақтығы: 54с",
  matchSection: /көбейту.*қасиет/i,
  scenes: [
    {
      duration: 7737,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="px-5 py-2 rounded-full bg-pink-500/15 border border-pink-400/40 text-pink-300 text-xs font-semibold tracking-[0.2em] uppercase">
            БӨЛІМ №6
          </span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight bg-gradient-to-r from-white to-pink-400 bg-clip-text text-transparent">
            Көбейтудің қасиеттері
          </h1>
          <p className="text-slate-400 text-base md:text-xl mt-1">Үлестіру — ең күшті қару</p>
        </div>
      ),
    },
    {
      duration: 10500,
      render: () => (
        <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
          <h2 className="text-xl md:text-3xl font-bold">1. Ауыстыру</h2>
          <div className="font-mono text-3xl md:text-5xl font-black p-4 md:p-6 rounded-xl bg-sky-500/10 border border-sky-500/30">
            a × b <span className="text-sky-400">=</span> b × a
          </div>
          <div className="font-mono text-lg md:text-2xl text-slate-300">
            4 × 25 = 25 × 4 = <span className="text-amber-300 font-bold">100</span>
          </div>
        </div>
      ),
    },
    {
      duration: 10500,
      render: () => (
        <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
          <span className="px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-400/40 text-pink-300 text-xs font-semibold tracking-[0.2em] uppercase">
            Ең маңыздысы
          </span>
          <h2 className="text-xl md:text-3xl font-bold">2. Үлестіру қасиеті</h2>
          <div className="font-mono text-xl md:text-3xl font-black p-4 md:p-6 rounded-xl bg-gradient-to-br from-pink-500/15 to-purple-500/15 border border-pink-500/40 text-center">
            a × (b + c) <span className="text-pink-400">=</span> a×b + a×c
          </div>
        </div>
      ),
    },
    {
      duration: 7394,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-[0.2em] uppercase">
            Мысал
          </span>
          <div className="font-mono text-2xl md:text-4xl font-black">
            36 × 5 + 64 × 5 <span className="text-slate-500">= ?</span>
          </div>
          <p className="text-sm md:text-base text-slate-400">Тікелей санау ауыр...</p>
        </div>
      ),
    },
    {
      duration: 8211,
      render: () => (
        <div className="flex flex-col items-center gap-3 w-full max-w-2xl font-mono">
          <div className="text-lg md:text-2xl text-slate-300">36 × 5 + 64 × 5</div>
          <div className="text-slate-500 text-lg md:text-2xl">↓</div>
          <div className="px-4 py-3 rounded-lg bg-pink-500/15 border border-pink-400/40 text-xl md:text-3xl font-bold opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
            (<span className="text-amber-300">36 + 64</span>) × 5
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1">Бесті жақшаның сыртына шығардық</p>
        </div>
      ),
    },
    {
      duration: 5987,
      render: () => (
        <div className="flex flex-col items-center gap-3 w-full max-w-xl font-mono">
          <div className="text-xl md:text-3xl text-slate-300 opacity-0 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            (36 + 64) × 5
          </div>
          <div className="text-xl md:text-3xl opacity-0 animate-fade-up" style={{ animationDelay: "2s" }}>
            = <span className="text-amber-300 font-bold">100</span> × 5
          </div>
          <div className="text-3xl md:text-5xl font-black opacity-0 animate-fade-up" style={{ animationDelay: "4s" }}>
            = <span className="text-emerald-400">500</span>
          </div>
        </div>
      ),
    },
    {
      duration: 3789,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="text-3xl md:text-5xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent leading-tight">
            Үлестіру — күш!
          </div>
        </div>
      ),
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// TOPIC 2: Шамалар және өлшем бірліктері
// ═══════════════════════════════════════════════════════════════

export const LESSON_T02_INTRO_SHAMALAR: LessonConfig = {
  audioSrc: "/lessons/lesson-t02-intro-audio.mp3",
  title: "ТАҚЫРЫП №2 · ШАМАЛАР",
  durationLabel: "Ұзақтығы: 1 минут",
  scenes: [
    {
      duration: 8000,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="px-5 py-2 rounded-full bg-teal-500/15 border border-teal-400/40 text-teal-300 text-xs font-semibold tracking-[0.2em] uppercase">
            ТАҚЫРЫП №2
          </span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight bg-gradient-to-r from-white to-teal-400 bg-clip-text text-transparent">
            Шамалар және
            <br />
            өлшем бірліктері
          </h1>
          <p className="text-slate-400 text-base md:text-xl mt-1">Математика · 5-6 сынып</p>
        </div>
      ),
    },
    {
      duration: 11132,
      render: () => (
        <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
          <h2 className="text-xl md:text-3xl font-bold">Шама дегеніміз не?</h2>
          <p className="text-slate-300 text-base md:text-xl text-center max-w-lg">
            <b className="text-teal-300">Өлшенетін нәрсе</b>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 w-full mt-2 text-xs md:text-base">
            <div className="p-2 md:p-3 rounded-lg bg-white/5 border border-white/10 text-center">
              <div className="text-2xl md:text-3xl mb-1">🍎</div>
              <div className="text-slate-300">Алманың салмағы</div>
            </div>
            <div className="p-2 md:p-3 rounded-lg bg-white/5 border border-white/10 text-center">
              <div className="text-2xl md:text-3xl mb-1">⏱</div>
              <div className="text-slate-300">Жүру уақыты</div>
            </div>
            <div className="p-2 md:p-3 rounded-lg bg-white/5 border border-white/10 text-center">
              <div className="text-2xl md:text-3xl mb-1">🛣</div>
              <div className="text-slate-300">Қашықтық</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      duration: 15289,
      render: () => (
        <div className="flex flex-col items-center gap-4 w-full max-w-3xl">
          <h2 className="text-xl md:text-3xl font-bold">6 түрлі өлшем</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 w-full">
            {[
              { icon: "📏", name: "Ұзындық", unit: "м, км", color: "border-sky-500/40 bg-sky-500/10", delay: "1s" },
              { icon: "⚖️", name: "Масса", unit: "г, кг", color: "border-amber-500/40 bg-amber-500/10", delay: "3s" },
              { icon: "⏰", name: "Уақыт", unit: "с, мин, сағ", color: "border-purple-500/40 bg-purple-500/10", delay: "5s" },
              { icon: "🔲", name: "Аудан", unit: "м², га", color: "border-emerald-500/40 bg-emerald-500/10", delay: "7.5s" },
              { icon: "📦", name: "Көлем", unit: "м³, л", color: "border-pink-500/40 bg-pink-500/10", delay: "9s" },
              { icon: "🚀", name: "Жылдамдық", unit: "км/сағ", color: "border-rose-500/40 bg-rose-500/10", delay: "11s" },
            ].map((m) => (
              <div
                key={m.name}
                className={`p-2 md:p-3 rounded-xl border ${m.color} text-center opacity-0 animate-fade-up`}
                style={{ animationDelay: m.delay }}
              >
                <div className="text-xl md:text-3xl mb-1">{m.icon}</div>
                <div className="text-xs md:text-base font-bold">{m.name}</div>
                <div className="text-[10px] md:text-xs text-slate-400 font-mono">{m.unit}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      duration: 11261,
      render: () => (
        <div className="flex flex-col items-center gap-4 text-center w-full max-w-xl">
          <span className="px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-[0.2em] uppercase">
            Негізгі идея
          </span>
          <h2 className="text-xl md:text-3xl font-bold">Бірліктерді ауыстыру</h2>
          <div className="font-mono text-2xl md:text-4xl font-black p-4 rounded-xl bg-white/5 border border-white/10">
            1 м <span className="text-amber-300">=</span> 100 см
          </div>
          <div className="font-mono text-lg md:text-2xl opacity-0 animate-fade-up" style={{ animationDelay: "5s" }}>
            5 м <span className="text-slate-500">=</span> <span className="text-emerald-400 font-bold">500 см</span>
          </div>
        </div>
      ),
    },
    {
      duration: 9239,
      render: () => (
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-xl md:text-3xl font-bold">НИШ емтиханында</h2>
          <div className="px-10 py-6 md:px-12 md:py-8 rounded-2xl bg-gradient-to-br from-teal-700 to-cyan-700 shadow-[0_20px_60px_rgba(13,148,136,0.3)]">
            <div className="text-6xl md:text-8xl font-black text-white leading-none">3–4</div>
            <div className="text-xs md:text-base text-slate-200 mt-1">сұрақ</div>
          </div>
          <p className="text-xs md:text-sm text-amber-300 max-w-md">
            ⚠️ Аудан мен көлемге аса назар — жиі шатастырылады!
          </p>
        </div>
      ),
    },
    {
      duration: 5026,
      render: () => (
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="px-5 py-2 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-[0.2em] uppercase">
            ДАЙЫНСЫҢ БА?
          </span>
          <div className="text-4xl md:text-6xl font-black bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
            Бастадық!
          </div>
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
  "lesson-05-addition-properties": LESSON_05_ADDITION_PROPS,
  "lesson-06-multiplication-properties": LESSON_06_MULTIPLICATION_PROPS,
  "lesson-t02-intro-shamalar": LESSON_T02_INTRO_SHAMALAR,
};
