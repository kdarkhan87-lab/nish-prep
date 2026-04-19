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
      duration: 9558,
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
      duration: 8989,
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
      duration: 16336,
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
      duration: 18503,
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
      duration: 8364,
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
      duration: 4972,
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
  | "lesson-t02-intro-shamalar"
  | "lesson-t02-length"
  | "lesson-t02-mass"
  | "lesson-t02-time"
  | "lesson-t02-area"
  | "lesson-t02-volume"
  | "lesson-t02-speed"
  | "lesson-t02-compare";

export const LESSON_02_RAZRYAD: LessonConfig = {
  audioSrc: "/lessons/lesson-02-audio.mp3",
  title: "БӨЛІМ №2 · РАЗРЯДТАР",
  durationLabel: "Ұзақтығы: 1 минут",
  matchSection: /разряд/i,
  scenes: [
    {
      duration: 7044,
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
      duration: 7975,
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
      duration: 16558,
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
      duration: 17586,
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
      duration: 12544,
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
      duration: 6583,
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
      duration: 11350,
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
      duration: 16794,
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
      duration: 9933,
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
      duration: 13447,
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
      duration: 13781,
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
      duration: 19375,
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
      duration: 5775,
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
      duration: 8156,
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
      duration: 11892,
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
      duration: 11586,
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
      duration: 9406,
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
      duration: 11892,
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
      duration: 15267,
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
      duration: 8414,
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
      duration: 8128,
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
      duration: 14267,
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
      duration: 10989,
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
      duration: 9989,
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
      duration: 9989,
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
      duration: 4569,
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
      duration: 8767,
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
      duration: 11683,
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
      duration: 11683,
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
      duration: 8404,
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
      duration: 9268,
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
      duration: 6919,
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
      duration: 4000,
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
      duration: 9044,
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
      duration: 12350,
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
      duration: 16739,
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
      duration: 12483,
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
      duration: 10356,
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
      duration: 5306,
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

// ─── Section videos for Topic 2 ─────────────────────────────────

export const LESSON_T02_LENGTH: LessonConfig = {
  audioSrc: "/lessons/lesson-t02-length-audio.mp3",
  title: "БӨЛІМ №1 · ҰЗЫНДЫҚ",
  durationLabel: "Ұзақтығы: 45с",
  matchSection: /ұзындық/i,
  scenes: [
    {
      duration: 5475,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="px-5 py-2 rounded-full bg-sky-500/15 border border-sky-400/40 text-sky-300 text-xs font-semibold tracking-[0.2em] uppercase">БӨЛІМ №1</span>
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white to-sky-400 bg-clip-text text-transparent">Ұзындық</h1>
          <p className="text-slate-400 text-base md:text-xl">Күнделікті қолданатын өлшем</p>
        </div>
      ),
    },
    {
      duration: 17475,
      render: () => (
        <div className="flex flex-col items-center gap-3 w-full max-w-2xl">
          <h2 className="text-xl md:text-3xl font-bold">Негізгі бірліктер</h2>
          <div className="grid grid-cols-1 gap-2 w-full font-mono">
            {[
              { l: "1 км", r: "1000 м", delay: "2s" },
              { l: "1 м", r: "100 см = 10 дм", delay: "5s" },
              { l: "1 дм", r: "10 см = 100 мм", delay: "8s" },
              { l: "1 см", r: "10 мм", delay: "11s" },
            ].map((u) => (
              <div key={u.l} className="flex justify-between items-center px-4 py-2 md:px-5 md:py-3 rounded-xl bg-sky-500/10 border border-sky-500/30 opacity-0 animate-fade-up" style={{ animationDelay: u.delay }}>
                <span className="text-lg md:text-2xl font-bold text-sky-300">{u.l}</span>
                <span className="text-base md:text-xl text-amber-300">= {u.r}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      duration: 10392,
      render: () => (
        <div className="flex flex-col items-center gap-4 w-full max-w-xl">
          <span className="px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-[0.2em] uppercase">Ауыстыру</span>
          <div className="font-mono text-xl md:text-3xl space-y-2 text-center">
            <div className="opacity-0 animate-fade-up" style={{ animationDelay: "1s" }}>3 км = <span className="text-emerald-400 font-bold">3000 м</span></div>
            <div className="opacity-0 animate-fade-up" style={{ animationDelay: "5s" }}>200 см = <span className="text-emerald-400 font-bold">2 м</span></div>
          </div>
        </div>
      ),
    },
    {
      duration: 4142,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center max-w-xl">
          <p className="text-base md:text-xl text-slate-300">
            Үлкен → кіші: <b className="text-amber-300">× көбейтеміз</b>
            <br />
            Кіші → үлкен: <b className="text-sky-300">÷ бөлеміз</b>
          </p>
        </div>
      ),
    },
    {
      duration: 10347,
      render: () => (
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="text-3xl md:text-5xl font-black bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">Ұзындық — негіз!</div>
        </div>
      ),
    },
  ],
};

export const LESSON_T02_MASS: LessonConfig = {
  audioSrc: "/lessons/lesson-t02-mass-audio.mp3",
  title: "БӨЛІМ №2 · МАССА",
  durationLabel: "Ұзақтығы: 50с",
  matchSection: /масса/i,
  scenes: [
    {
      duration: 9160,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="px-5 py-2 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-[0.2em] uppercase">БӨЛІМ №2</span>
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white to-amber-400 bg-clip-text text-transparent">Масса</h1>
          <p className="text-slate-400 text-base md:text-xl">Заттың салмағы</p>
        </div>
      ),
    },
    {
      duration: 18040,
      render: () => (
        <div className="flex flex-col items-center gap-3 w-full max-w-2xl">
          <h2 className="text-xl md:text-3xl font-bold">Негізгі бірліктер</h2>
          <div className="grid grid-cols-1 gap-2 w-full font-mono">
            {[
              { l: "1 т", r: "1000 кг", delay: "2s" },
              { l: "1 ц", r: "100 кг", delay: "4.5s" },
              { l: "1 кг", r: "1000 г", delay: "7s" },
              { l: "1 г", r: "1000 мг", delay: "9.5s" },
            ].map((u) => (
              <div key={u.l} className="flex justify-between items-center px-4 py-2 md:px-5 md:py-3 rounded-xl bg-amber-500/10 border border-amber-500/30 opacity-0 animate-fade-up" style={{ animationDelay: u.delay }}>
                <span className="text-lg md:text-2xl font-bold text-amber-300">{u.l}</span>
                <span className="text-base md:text-xl text-emerald-300">= {u.r}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      duration: 23870,
      render: () => (
        <div className="flex flex-col items-center gap-3 w-full max-w-2xl">
          <h2 className="text-lg md:text-2xl font-bold text-slate-300">Қайсы — қашан?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full text-xs md:text-sm">
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
              <div className="text-2xl mb-1">💊</div>
              <b className="text-amber-300">Кішкене</b>
              <div className="text-slate-400 font-mono">мг</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
              <div className="text-2xl mb-1">🍎</div>
              <b className="text-amber-300">Орташа</b>
              <div className="text-slate-400 font-mono">г, кг</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
              <div className="text-2xl mb-1">🚛</div>
              <b className="text-amber-300">Үлкен</b>
              <div className="text-slate-400 font-mono">т</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      duration: 11180,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center font-mono max-w-xl">
          <span className="px-4 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/40 text-sky-300 text-xs font-semibold tracking-[0.2em] uppercase">Мысал</span>
          <div className="text-xl md:text-3xl">1,5 т = <span className="text-slate-500">?</span></div>
          <div className="text-2xl md:text-4xl font-black opacity-0 animate-fade-up text-emerald-400" style={{ animationDelay: "3s" }}>1500 кг</div>
        </div>
      ),
    },
    {
      duration: 7910,
      render: () => (
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="text-3xl md:text-5xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Салмақты білу — маңызды!</div>
        </div>
      ),
    },
  ],
};

export const LESSON_T02_TIME: LessonConfig = {
  audioSrc: "/lessons/lesson-t02-time-audio.mp3",
  title: "БӨЛІМ №3 · УАҚЫТ",
  durationLabel: "Ұзақтығы: 40с",
  matchSection: /уақыт/i,
  scenes: [
    {
      duration: 5433,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="px-5 py-2 rounded-full bg-purple-500/15 border border-purple-400/40 text-purple-300 text-xs font-semibold tracking-[0.2em] uppercase">БӨЛІМ №3</span>
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">Уақыт</h1>
        </div>
      ),
    },
    {
      duration: 12808,
      render: () => (
        <div className="flex flex-col items-center gap-3 w-full max-w-2xl">
          <h2 className="text-xl md:text-3xl font-bold">Негізгі бірліктер</h2>
          <div className="grid grid-cols-1 gap-1.5 w-full font-mono text-sm md:text-lg">
            {[
              { l: "1 сағат", r: "60 минут", delay: "2s" },
              { l: "1 минут", r: "60 секунд", delay: "4s" },
              { l: "1 тәулік", r: "24 сағат", delay: "6s" },
              { l: "1 апта", r: "7 күн", delay: "8s" },
              { l: "1 жыл", r: "365 күн", delay: "10s" },
            ].map((u) => (
              <div key={u.l} className="flex justify-between items-center px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-purple-500/10 border border-purple-500/30 opacity-0 animate-fade-up" style={{ animationDelay: u.delay }}>
                <span className="font-bold text-purple-300">{u.l}</span>
                <span className="text-amber-300">= {u.r}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      duration: 8128,
      render: () => (
        <div className="flex flex-col items-center gap-3 w-full max-w-xl">
          <span className="px-4 py-1.5 rounded-full bg-red-500/15 border border-red-400/40 text-red-300 text-xs font-semibold tracking-[0.2em] uppercase">Назар!</span>
          <p className="text-base md:text-xl text-slate-300 text-center">
            Уақыт — <b className="text-amber-300">ондық жүйеде емес</b>
          </p>
          <div className="font-mono text-lg md:text-2xl text-center">
            1 сағ 30 мин = <span className="text-emerald-400">1,5 сағ</span>
            <br />
            <span className="text-red-400 line-through">1 сағ 50</span> ≠ <span className="text-red-400">1,5</span>
          </div>
        </div>
      ),
    },
    {
      duration: 9531,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center font-mono">
          <span className="px-4 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/40 text-sky-300 text-xs font-semibold tracking-[0.2em] uppercase">Мысал</span>
          <div className="text-xl md:text-3xl">1 сағ 15 мин = <span className="text-slate-500">?</span> мин</div>
          <div className="text-xl md:text-3xl opacity-0 animate-fade-up text-slate-400" style={{ animationDelay: "3s" }}>60 + 15</div>
          <div className="text-2xl md:text-4xl font-black opacity-0 animate-fade-up text-emerald-400" style={{ animationDelay: "5s" }}>= 75 мин</div>
        </div>
      ),
    },
    {
      duration: 7069,
      render: () => (
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="text-3xl md:text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Уақыт — қымбат!</div>
        </div>
      ),
    },
  ],
};

export const LESSON_T02_AREA: LessonConfig = {
  audioSrc: "/lessons/lesson-t02-area-audio.mp3",
  title: "БӨЛІМ №4 · АУДАН",
  durationLabel: "Ұзақтығы: 54с",
  matchSection: /аудан/i,
  scenes: [
    {
      duration: 5586,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="px-5 py-2 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-xs font-semibold tracking-[0.2em] uppercase">БӨЛІМ №4</span>
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">Аудан</h1>
          <p className="text-slate-400 text-base md:text-xl">Беттің мөлшері</p>
        </div>
      ),
    },
    {
      duration: 8017,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-base md:text-xl text-slate-300 max-w-lg">
            Аудан <b className="text-amber-300">квадрат бірліктермен</b> өлшенеді
          </p>
          <div className="font-mono text-2xl md:text-4xl font-black">
            м², см², км²
          </div>
        </div>
      ),
    },
    {
      duration: 11461,
      render: () => (
        <div className="flex flex-col items-center gap-3 w-full max-w-xl">
          <span className="px-4 py-1.5 rounded-full bg-red-500/15 border border-red-400/40 text-red-300 text-xs font-semibold tracking-[0.2em] uppercase">Маңызды!</span>
          <div className="font-mono text-center">
            <div className="text-base md:text-xl text-slate-400">1 м = 100 см</div>
            <div className="text-sm md:text-base text-slate-500 my-1">↓</div>
            <div className="text-xl md:text-3xl font-bold">1 м² = 100 × 100</div>
            <div className="text-2xl md:text-4xl font-black text-emerald-400 opacity-0 animate-fade-up" style={{ animationDelay: "4s" }}>= 10 000 см²</div>
          </div>
        </div>
      ),
    },
    {
      duration: 13419,
      render: () => (
        <div className="flex flex-col items-center gap-3 w-full max-w-2xl">
          <h2 className="text-lg md:text-2xl font-bold">Бірліктер кестесі</h2>
          <div className="grid grid-cols-1 gap-1.5 w-full font-mono text-xs md:text-base">
            {[
              { l: "1 км²", r: "1 000 000 м²" },
              { l: "1 га", r: "10 000 м²" },
              { l: "1 ар (сотка)", r: "100 м²" },
              { l: "1 м²", r: "10 000 см²" },
              { l: "1 дм²", r: "100 см²" },
            ].map((u) => (
              <div key={u.l} className="flex justify-between px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                <span className="font-bold text-emerald-300">{u.l}</span>
                <span className="text-amber-300">= {u.r}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      duration: 8406,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center max-w-xl">
          <span className="px-4 py-1.5 rounded-full bg-red-500/15 border border-red-400/40 text-red-300 text-xs font-semibold tracking-[0.2em] uppercase">Жиі қате</span>
          <p className="text-base md:text-xl font-bold">
            <span className="text-red-400">1 м ≠ 100 см²</span>
            <br />
            <span className="text-emerald-400">1 м² = 10 000 см²</span>
          </p>
        </div>
      ),
    },
    {
      duration: 9750,
      render: () => (
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="text-3xl md:text-5xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Квадратын ұмытпа!</div>
        </div>
      ),
    },
  ],
};

export const LESSON_T02_VOLUME: LessonConfig = {
  audioSrc: "/lessons/lesson-t02-volume-audio.mp3",
  title: "БӨЛІМ №5 · КӨЛЕМ",
  durationLabel: "Ұзақтығы: 39с",
  matchSection: /көлем/i,
  scenes: [
    {
      duration: 5892,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="px-5 py-2 rounded-full bg-pink-500/15 border border-pink-400/40 text-pink-300 text-xs font-semibold tracking-[0.2em] uppercase">БӨЛІМ №5</span>
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white to-pink-400 bg-clip-text text-transparent">Көлем</h1>
        </div>
      ),
    },
    {
      duration: 6781,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-base md:text-xl text-slate-300 max-w-lg">
            Көлем — <b className="text-amber-300">куб бірліктермен</b>
          </p>
          <div className="font-mono text-2xl md:text-4xl font-black">м³, см³, л, мл</div>
        </div>
      ),
    },
    {
      duration: 5642,
      render: () => (
        <div className="flex flex-col items-center gap-3 w-full max-w-xl font-mono text-center">
          <div className="text-base md:text-xl text-slate-400">1 м = 100 см</div>
          <div className="text-xl md:text-3xl font-bold">1 м³ = 100×100×100</div>
          <div className="text-2xl md:text-4xl font-black text-emerald-400 opacity-0 animate-fade-up" style={{ animationDelay: "2s" }}>= 1 000 000 см³</div>
        </div>
      ),
    },
    {
      duration: 15669,
      render: () => (
        <div className="flex flex-col items-center gap-3 w-full max-w-2xl">
          <h2 className="text-lg md:text-2xl font-bold">Көлем ↔ Сыйымдылық</h2>
          <div className="grid grid-cols-1 gap-1.5 w-full font-mono text-sm md:text-lg">
            {[
              { l: "1 л", r: "1 дм³ = 1000 мл", delay: "1s" },
              { l: "1 мл", r: "1 см³", delay: "4s" },
              { l: "1 м³", r: "1000 л", delay: "8s" },
            ].map((u) => (
              <div key={u.l} className="flex justify-between px-4 py-2 md:px-5 md:py-3 rounded-xl bg-pink-500/10 border border-pink-500/30 opacity-0 animate-fade-up" style={{ animationDelay: u.delay }}>
                <span className="font-bold text-pink-300">{u.l}</span>
                <span className="text-amber-300">= {u.r}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      duration: 7083,
      render: () => (
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="text-3xl md:text-5xl font-black bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">Айналамызда — көлем</div>
        </div>
      ),
    },
  ],
};

export const LESSON_T02_SPEED: LessonConfig = {
  audioSrc: "/lessons/lesson-t02-speed-audio.mp3",
  title: "БӨЛІМ №6 · ЖЫЛДАМДЫҚ",
  durationLabel: "Ұзақтығы: 32с",
  matchSection: /жылдамдық/i,
  scenes: [
    {
      duration: 6239,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="px-5 py-2 rounded-full bg-rose-500/15 border border-rose-400/40 text-rose-300 text-xs font-semibold tracking-[0.2em] uppercase">БӨЛІМ №6</span>
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white to-rose-400 bg-clip-text text-transparent">Жылдамдық</h1>
        </div>
      ),
    },
    {
      duration: 6683,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-base md:text-xl text-slate-300 max-w-lg">Бір уақытта өтілген жол</p>
          <div className="font-mono text-2xl md:text-4xl font-black p-4 rounded-xl bg-rose-500/10 border border-rose-500/30">
            v = <span className="text-amber-300">s ÷ t</span>
          </div>
        </div>
      ),
    },
    {
      duration: 4669,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center font-mono">
          <div className="text-2xl md:text-4xl font-bold">км/сағ</div>
          <div className="text-slate-500">·</div>
          <div className="text-2xl md:text-4xl font-bold">м/с</div>
        </div>
      ),
    },
    {
      duration: 10947,
      render: () => (
        <div className="flex flex-col items-center gap-3 w-full max-w-xl font-mono text-center">
          <span className="px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-[0.2em] uppercase">Ереже</span>
          <div className="text-base md:text-xl text-slate-300">км/сағ → м/с</div>
          <div className="text-xl md:text-3xl font-bold">бөлу <span className="text-amber-300">3,6</span></div>
          <div className="text-base md:text-xl opacity-0 animate-fade-up" style={{ animationDelay: "4s" }}>
            36 км/сағ = <span className="text-emerald-400 font-bold">10 м/с</span>
          </div>
        </div>
      ),
    },
    {
      duration: 5917,
      render: () => (
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="text-3xl md:text-5xl font-black bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">Жылдамдыққа қадам!</div>
        </div>
      ),
    },
  ],
};

export const LESSON_T02_COMPARE: LessonConfig = {
  audioSrc: "/lessons/lesson-t02-compare-audio.mp3",
  title: "БӨЛІМ №7 · САЛЫСТЫРУ",
  durationLabel: "Ұзақтығы: 47с",
  matchSection: /салыстыру/i,
  scenes: [
    {
      duration: 4792,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="px-5 py-2 rounded-full bg-indigo-500/15 border border-indigo-400/40 text-indigo-300 text-xs font-semibold tracking-[0.2em] uppercase">БӨЛІМ №7</span>
          <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent">Шамаларды салыстыру</h1>
        </div>
      ),
    },
    {
      duration: 9475,
      render: () => (
        <div className="flex flex-col items-center gap-4 text-center max-w-xl">
          <span className="px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-[0.2em] uppercase">Ереже</span>
          <p className="text-lg md:text-2xl font-bold">
            <b className="text-amber-300">Бір бірлікке</b> келтір
          </p>
          <p className="text-sm md:text-base text-slate-400">Тек сонда салыстыруға болады</p>
        </div>
      ),
    },
    {
      duration: 17656,
      render: () => (
        <div className="flex flex-col items-center gap-3 w-full max-w-xl font-mono text-center">
          <div className="text-lg md:text-2xl">Қайсы үлкен?</div>
          <div className="text-xl md:text-3xl font-bold">2 м <span className="text-slate-500">?</span> 150 см</div>
          <div className="text-sm md:text-base text-slate-500 opacity-0 animate-fade-up" style={{ animationDelay: "5s" }}>2 м = 200 см</div>
          <div className="text-xl md:text-3xl font-bold opacity-0 animate-fade-up" style={{ animationDelay: "9s" }}>
            200 <span className="text-emerald-400">&gt;</span> 150
          </div>
          <div className="text-lg md:text-2xl font-black text-emerald-400 opacity-0 animate-fade-up" style={{ animationDelay: "13s" }}>2 м үлкен!</div>
        </div>
      ),
    },
    {
      duration: 11211,
      render: () => (
        <div className="flex flex-col items-center gap-3 w-full max-w-xl font-mono text-center">
          <div className="text-base md:text-xl">½ сағат vs 20 мин</div>
          <div className="text-sm md:text-base text-slate-400 opacity-0 animate-fade-up" style={{ animationDelay: "3s" }}>½ сағат = 30 мин</div>
          <div className="text-lg md:text-2xl font-bold opacity-0 animate-fade-up" style={{ animationDelay: "6s" }}>
            30 <span className="text-emerald-400">&gt;</span> 20
          </div>
          <div className="text-lg md:text-2xl font-black text-emerald-400 opacity-0 animate-fade-up" style={{ animationDelay: "8s" }}>½ сағат ұзақ!</div>
        </div>
      ),
    },
    {
      duration: 6000,
      render: () => (
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="text-3xl md:text-5xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Бір бірлік — сенің көмекшің!</div>
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
  "lesson-t02-length": LESSON_T02_LENGTH,
  "lesson-t02-mass": LESSON_T02_MASS,
  "lesson-t02-time": LESSON_T02_TIME,
  "lesson-t02-area": LESSON_T02_AREA,
  "lesson-t02-volume": LESSON_T02_VOLUME,
  "lesson-t02-speed": LESSON_T02_SPEED,
  "lesson-t02-compare": LESSON_T02_COMPARE,
};
