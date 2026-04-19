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
      duration: 13020,
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
      duration: 12500,
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
      duration: 19860,
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
      duration: 22020,
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
      duration: 11870,
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
      duration: 9090,
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
  | "lesson-t02-compare"
  | "lesson-t03-intro"
  | "lesson-t04-intro"
  | "lesson-t05-intro"
  | "lesson-t06-intro"
  | "lesson-t07-intro"
  | "lesson-t08-intro"
  | "lesson-t09-intro"
  | "lesson-t10-intro"
  | "lesson-t11-intro"
  | "lesson-t12-intro"
  | "lesson-t13-intro"
  | "lesson-t14-intro"
  | "lesson-t15-intro"
  // Topic 3 sections
  | "lesson-t03-divisibility"
  | "lesson-t03-prime"
  | "lesson-t03-factor"
  | "lesson-t03-gcd-lcm"
  // Topic 4 sections
  | "lesson-t04-what"
  | "lesson-t04-types"
  | "lesson-t04-reduce"
  | "lesson-t04-addsubtract"
  | "lesson-t04-multdiv"
  // Topic 5 sections
  | "lesson-t05-what"
  | "lesson-t05-digits"
  | "lesson-t05-addsubtract"
  | "lesson-t05-multdiv"
  | "lesson-t05-convert"
  // Topic 6 sections
  | "lesson-t06-what"
  | "lesson-t06-find"
  | "lesson-t06-inverse"
  | "lesson-t06-change"
  // Topic 7 sections
  | "lesson-t07-ratio"
  | "lesson-t07-what"
  | "lesson-t07-unknown"
  | "lesson-t07-types"
  // Topic 8 sections
  | "lesson-t08-set"
  | "lesson-t08-compare"
  | "lesson-t08-addsubtract"
  | "lesson-t08-multdiv"
  // Topic 9 sections
  | "lesson-t09-what"
  | "lesson-t09-simple"
  | "lesson-t09-complex"
  | "lesson-t09-word"
  // Topic 10 sections
  | "lesson-t10-numeric"
  | "lesson-t10-similar"
  | "lesson-t10-brackets"
  | "lesson-t10-formulas"
  // Topic 11 sections
  | "lesson-t11-perimeter"
  | "lesson-t11-area"
  | "lesson-t11-angles"
  // Topic 12 sections
  | "lesson-t12-plane"
  | "lesson-t12-quadrants"
  | "lesson-t12-distance"
  // Topic 13 sections
  | "lesson-t13-axis"
  | "lesson-t13-other"
  | "lesson-t13-shapes"
  // Topic 14 sections
  | "lesson-t14-motion"
  | "lesson-t14-work"
  | "lesson-t14-algorithm"
  // Topic 15 sections
  | "lesson-t15-what"
  | "lesson-t15-ops"
  | "lesson-t15-venn";

export const LESSON_02_RAZRYAD: LessonConfig = {
  audioSrc: "/lessons/lesson-02-audio.mp3",
  title: "БӨЛІМ №2 · РАЗРЯДТАР",
  durationLabel: "Ұзақтығы: 1 минут",
  matchSection: /разряд/i,
  scenes: [
    {
      duration: 10500,
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
      duration: 11490,
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
      duration: 20079,
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
      duration: 21110,
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
      duration: 16070,
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
      duration: 10700,
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
      duration: 14800,
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
      duration: 20320,
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
      duration: 10310,
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
      duration: 17030,
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
      duration: 15330,
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
      duration: 22620,
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
      duration: 9860,
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
      duration: 11610,
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
      duration: 15400,
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
      duration: 15110,
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
      duration: 12930,
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
      duration: 15400,
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
      duration: 18780,
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
      duration: 12500,
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
      duration: 11580,
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
      duration: 17780,
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
      duration: 14510,
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
      duration: 13500,
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
      duration: 13500,
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
      duration: 8680,
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
      duration: 12230,
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
      duration: 15210,
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
      duration: 15210,
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
      duration: 11900,
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
      duration: 12810,
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
      duration: 10430,
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
      duration: 8100,
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
      duration: 12500,
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
      duration: 15880,
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
      duration: 20250,
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
      duration: 15950,
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
      duration: 13910,
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
      duration: 9420,
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
      duration: 8940,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="px-5 py-2 rounded-full bg-sky-500/15 border border-sky-400/40 text-sky-300 text-xs font-semibold tracking-[0.2em] uppercase">БӨЛІМ №1</span>
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white to-sky-400 bg-clip-text text-transparent">Ұзындық</h1>
          <p className="text-slate-400 text-base md:text-xl">Күнделікті қолданатын өлшем</p>
        </div>
      ),
    },
    {
      duration: 20990,
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
      duration: 15640,
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
      duration: 11780,
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
      duration: 8610,
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
      duration: 8900,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="px-5 py-2 rounded-full bg-purple-500/15 border border-purple-400/40 text-purple-300 text-xs font-semibold tracking-[0.2em] uppercase">БӨЛІМ №3</span>
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">Уақыт</h1>
        </div>
      ),
    },
    {
      duration: 17390,
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
      duration: 13700,
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
      duration: 11130,
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
      duration: 7480,
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
      duration: 8510,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="px-5 py-2 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-xs font-semibold tracking-[0.2em] uppercase">БӨЛІМ №4</span>
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">Аудан</h1>
          <p className="text-slate-400 text-base md:text-xl">Беттің мөлшері</p>
        </div>
      ),
    },
    {
      duration: 11540,
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
      duration: 14970,
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
      duration: 21280,
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
      duration: 13960,
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
      duration: 7500,
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
      duration: 9350,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="px-5 py-2 rounded-full bg-pink-500/15 border border-pink-400/40 text-pink-300 text-xs font-semibold tracking-[0.2em] uppercase">БӨЛІМ №5</span>
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white to-pink-400 bg-clip-text text-transparent">Көлем</h1>
        </div>
      ),
    },
    {
      duration: 10290,
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
      duration: 15260,
      render: () => (
        <div className="flex flex-col items-center gap-3 w-full max-w-xl font-mono text-center">
          <div className="text-base md:text-xl text-slate-400">1 м = 100 см</div>
          <div className="text-xl md:text-3xl font-bold">1 м³ = 100×100×100</div>
          <div className="text-2xl md:text-4xl font-black text-emerald-400 opacity-0 animate-fade-up" style={{ animationDelay: "2s" }}>= 1 000 000 см³</div>
        </div>
      ),
    },
    {
      duration: 17010,
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
      duration: 7290,
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
      duration: 9690,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="px-5 py-2 rounded-full bg-rose-500/15 border border-rose-400/40 text-rose-300 text-xs font-semibold tracking-[0.2em] uppercase">БӨЛІМ №6</span>
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white to-rose-400 bg-clip-text text-transparent">Жылдамдық</h1>
        </div>
      ),
    },
    {
      duration: 10190,
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
      duration: 10770,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center font-mono">
          <div className="text-2xl md:text-4xl font-bold">км/сағ</div>
          <div className="text-slate-500">·</div>
          <div className="text-2xl md:text-4xl font-bold">м/с</div>
        </div>
      ),
    },
    {
      duration: 15300,
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
      duration: 7290,
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
      duration: 8220,
      render: () => (
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="px-5 py-2 rounded-full bg-indigo-500/15 border border-indigo-400/40 text-indigo-300 text-xs font-semibold tracking-[0.2em] uppercase">БӨЛІМ №7</span>
          <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent">Шамаларды салыстыру</h1>
        </div>
      ),
    },
    {
      duration: 13000,
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
      duration: 21180,
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
      duration: 16960,
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
      duration: 7890,
      render: () => (
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="text-3xl md:text-5xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Бір бірлік — сенің көмекшің!</div>
        </div>
      ),
    },
  ],
};

// ───────── Generic intro template ─────────
// Для однотипных интро видео тем 3–15. Каждое 5-6 сцен:
// 1. Badge + Title, 2. Определение/описание, 3. Ключевые концепции (список),
// 4. (опц) Дополнение, 5. Призыв/финал.

type IntroInput = {
  key: LessonKey;
  topicNum: string;
  audioSrc: string;
  title: string;
  subtitle: string;
  scenes: {
    duration: number;
    node: React.ReactNode;
  }[];
};

function makeIntro(input: IntroInput): LessonConfig {
  return {
    audioSrc: input.audioSrc,
    title: `ТАҚЫРЫП ${input.topicNum} · ${input.title.toUpperCase()}`,
    durationLabel: `Ұзақтығы: ${Math.round(input.scenes.reduce((s, x) => s + x.duration, 0) / 1000)}с`,
    scenes: input.scenes.map((s) => ({
      duration: s.duration,
      render: () => s.node,
    })),
  };
}

// Section video: same structure but with matchSection regex.
type SectionInput = {
  audioSrc: string;
  shortTitle: string;           // e.g. "БӨЛУ БЕЛГІЛЕРІ"
  matchSection: RegExp;
  scenes: { duration: number; node: React.ReactNode }[];
};

function makeSection(input: SectionInput): LessonConfig {
  return {
    audioSrc: input.audioSrc,
    title: `БӨЛІМ · ${input.shortTitle.toUpperCase()}`,
    durationLabel: `Ұзақтығы: ${Math.round(input.scenes.reduce((s, x) => s + x.duration, 0) / 1000)}с`,
    matchSection: input.matchSection,
    scenes: input.scenes.map((s) => ({
      duration: s.duration,
      render: () => s.node,
    })),
  };
}

// Static Tailwind class mapping per color theme — JIT needs explicit class names
type ColorKey = "amber" | "pink" | "cyan" | "yellow" | "emerald" | "red" | "blue" | "purple" | "indigo" | "teal" | "fuchsia" | "violet";

const COLOR_THEMES: Record<ColorKey, {
  badge: string;
  gradientTo: string;
  bulletBg: string;
  bulletBorder: string;
  bulletNum: string;
  statBox: string;
  ctaGrad: string;
}> = {
  amber:    { badge: "bg-amber-500/15 border-amber-400/40 text-amber-300",     gradientTo: "to-amber-400",     bulletBg: "bg-amber-500/10 border-amber-500",     bulletBorder: "", bulletNum: "text-amber-300",     statBox: "from-amber-800 to-amber-600",     ctaGrad: "from-amber-400 to-orange-400" },
  pink:     { badge: "bg-pink-500/15 border-pink-400/40 text-pink-300",        gradientTo: "to-pink-400",      bulletBg: "bg-pink-500/10 border-pink-500",       bulletBorder: "", bulletNum: "text-pink-300",      statBox: "from-pink-800 to-pink-600",       ctaGrad: "from-pink-400 to-rose-400" },
  cyan:     { badge: "bg-cyan-500/15 border-cyan-400/40 text-cyan-300",        gradientTo: "to-cyan-400",      bulletBg: "bg-cyan-500/10 border-cyan-500",       bulletBorder: "", bulletNum: "text-cyan-300",      statBox: "from-cyan-800 to-cyan-600",       ctaGrad: "from-cyan-400 to-sky-400" },
  yellow:   { badge: "bg-yellow-500/15 border-yellow-400/40 text-yellow-300",  gradientTo: "to-yellow-400",    bulletBg: "bg-yellow-500/10 border-yellow-500",   bulletBorder: "", bulletNum: "text-yellow-300",    statBox: "from-yellow-700 to-yellow-500",   ctaGrad: "from-yellow-400 to-amber-400" },
  emerald:  { badge: "bg-emerald-500/15 border-emerald-400/40 text-emerald-300", gradientTo: "to-emerald-400", bulletBg: "bg-emerald-500/10 border-emerald-500", bulletBorder: "", bulletNum: "text-emerald-300",   statBox: "from-emerald-800 to-emerald-600", ctaGrad: "from-emerald-400 to-teal-400" },
  red:      { badge: "bg-red-500/15 border-red-400/40 text-red-300",           gradientTo: "to-red-400",       bulletBg: "bg-red-500/10 border-red-500",         bulletBorder: "", bulletNum: "text-red-300",       statBox: "from-red-800 to-red-600",         ctaGrad: "from-red-400 to-orange-400" },
  blue:     { badge: "bg-blue-500/15 border-blue-400/40 text-blue-300",        gradientTo: "to-blue-400",      bulletBg: "bg-blue-500/10 border-blue-500",       bulletBorder: "", bulletNum: "text-blue-300",      statBox: "from-blue-800 to-blue-600",       ctaGrad: "from-blue-400 to-sky-400" },
  purple:   { badge: "bg-purple-500/15 border-purple-400/40 text-purple-300",  gradientTo: "to-purple-400",    bulletBg: "bg-purple-500/10 border-purple-500",   bulletBorder: "", bulletNum: "text-purple-300",    statBox: "from-purple-800 to-purple-600",   ctaGrad: "from-purple-400 to-pink-400" },
  indigo:   { badge: "bg-indigo-500/15 border-indigo-400/40 text-indigo-300",  gradientTo: "to-indigo-400",    bulletBg: "bg-indigo-500/10 border-indigo-500",   bulletBorder: "", bulletNum: "text-indigo-300",    statBox: "from-indigo-800 to-indigo-600",   ctaGrad: "from-indigo-400 to-purple-400" },
  teal:     { badge: "bg-teal-500/15 border-teal-400/40 text-teal-300",        gradientTo: "to-teal-400",      bulletBg: "bg-teal-500/10 border-teal-500",       bulletBorder: "", bulletNum: "text-teal-300",      statBox: "from-teal-800 to-teal-600",       ctaGrad: "from-teal-400 to-cyan-400" },
  fuchsia:  { badge: "bg-fuchsia-500/15 border-fuchsia-400/40 text-fuchsia-300", gradientTo: "to-fuchsia-400", bulletBg: "bg-fuchsia-500/10 border-fuchsia-500", bulletBorder: "", bulletNum: "text-fuchsia-300",   statBox: "from-fuchsia-800 to-fuchsia-600", ctaGrad: "from-fuchsia-400 to-pink-400" },
  violet:   { badge: "bg-violet-500/15 border-violet-400/40 text-violet-300",  gradientTo: "to-violet-400",    bulletBg: "bg-violet-500/10 border-violet-500",   bulletBorder: "", bulletNum: "text-violet-300",    statBox: "from-violet-800 to-violet-600",   ctaGrad: "from-violet-400 to-purple-400" },
};

const BadgeTitle = ({ topicNum, title, subtitle, color }: { topicNum: string; title: string; subtitle: string; color: ColorKey }) => {
  const t = COLOR_THEMES[color];
  return (
    <div className="flex flex-col items-center gap-3 text-center px-4">
      <span className={`px-5 py-2 rounded-full border text-xs font-semibold tracking-[0.2em] uppercase ${t.badge}`}>
        ТАҚЫРЫП {topicNum}
      </span>
      <h1 className={`text-3xl md:text-5xl font-black leading-tight bg-gradient-to-r from-white ${t.gradientTo} bg-clip-text text-transparent`}>{title}</h1>
      <p className="text-slate-400 text-base md:text-xl mt-1">{subtitle}</p>
    </div>
  );
};

const BigText = ({ text, sub }: { text: string; sub?: string }) => (
  <div className="flex flex-col items-center gap-3 text-center px-6 max-w-3xl">
    <p className="text-lg md:text-3xl font-bold text-slate-100 leading-tight">{text}</p>
    {sub && <p className="text-sm md:text-lg text-slate-400">{sub}</p>}
  </div>
);

const BulletList = ({ title, items, color }: { title: string; items: string[]; color: ColorKey }) => {
  const t = COLOR_THEMES[color];
  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-2xl px-4">
      {title && <h2 className="text-lg md:text-2xl font-bold">{title}</h2>}
      <div className="flex flex-col gap-2 w-full">
        {items.map((it, i) => (
          <div key={i} className={`flex items-start gap-3 p-3 border-l-4 rounded-lg text-left text-sm md:text-lg ${t.bulletBg}`}>
            <span className={`font-bold flex-shrink-0 ${t.bulletNum}`}>{i + 1}.</span>
            <span className="text-slate-100">{it}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatBox = ({ num, label, sub, color }: { num: string; label: string; sub?: string; color: ColorKey }) => {
  const t = COLOR_THEMES[color];
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className={`px-10 py-6 rounded-2xl bg-gradient-to-br shadow-[0_20px_60px_rgba(0,0,0,0.3)] ${t.statBox}`}>
        <div className="text-5xl md:text-7xl font-black text-white leading-none">{num}</div>
        <div className="text-sm md:text-base text-white/80 mt-2">{label}</div>
      </div>
      {sub && <p className="text-sm text-slate-400">{sub}</p>}
    </div>
  );
};

const CTA = ({ text, color }: { text: string; color: ColorKey }) => {
  const t = COLOR_THEMES[color];
  return (
    <div className="flex flex-col items-center gap-3 text-center px-6">
      <div className={`text-3xl md:text-5xl font-black bg-gradient-to-r bg-clip-text text-transparent leading-tight ${t.ctaGrad}`}>
        {text}
      </div>
    </div>
  );
};

// ───────── TOPIC INTROS 3–15 ─────────

export const LESSON_T03_INTRO: LessonConfig = makeIntro({
  key: "lesson-t03-intro",
  topicNum: "№3",
  audioSrc: "/lessons/lesson-t03-intro-audio.mp3",
  title: "Бөлу белгілері, ЕҮОБ, ЕКОЕ",
  subtitle: "Бөлшектер мен теңдеулердің кілті",
  scenes: [
    { duration: 8750, node: <BadgeTitle topicNum="№3" title="Бөлу белгілері, ЕҮОБ, ЕКОЕ" subtitle="Санның жаратылысы туралы" color="amber" /> },
    { duration: 15930, node: <BigText text="Бөлу белгісі — бір санның екіншіге қалдықсыз бөлінетінін тез анықтаудың жолы." sub="2, 3, 5, 9, 10-ға бөлу — әрқайсысының өз ережесі бар" /> },
    { duration: 19100, node: <BulletList title="Үш маңызды ұғым" items={["Бөлу белгілері — тез есептеу", "Жай және құрама сандар — санның жаратылысы", "ЕҮОБ пен ЕКОЕ — бөлшектерге қажет"]} color="amber" /> },
    { duration: 8220, node: <StatBox num="3–4" label="сұрақ НИШ тестінен" color="amber" /> },
    { duration: 6420, node: <CTA text="Бастадық!" color="amber" /> },
  ],
});

export const LESSON_T04_INTRO: LessonConfig = makeIntro({
  key: "lesson-t04-intro",
  topicNum: "№4",
  audioSrc: "/lessons/lesson-t04-intro-audio.mp3",
  title: "Бөлшектер",
  subtitle: "Бүтіннің бір бөлігі",
  scenes: [
    { duration: 10700, node: <BadgeTitle topicNum="№4" title="Бөлшектер" subtitle="Математиканың маңызды түсінігі" color="pink" /> },
    { duration: 11610, node: <BigText text="Бөлшек — бүтіннің бір бөлігін көрсететін сан." sub="Тортты төртке бөлсек, бір бөлігі — ширек" /> },
    { duration: 14320, node: <BulletList title="Бөлшекте екі бөлік" items={["Алым (жоғарыда) — қанша бөлік алдық", "Бөлім (төменде) — бүтін неше бөлікке бөлінген"]} color="pink" /> },
    { duration: 14970, node: <BulletList title="Үйренесің" items={["Төрт амал: қосу, азайту, көбейту, бөлу", "Қысқарту және ортақ бөлімге келтіру"]} color="pink" /> },
    { duration: 8730, node: <StatBox num="3–5" label="сұрақ НИШ-те" color="pink" /> },
    { duration: 5580, node: <CTA text="Бастайық!" color="pink" /> },
  ],
});

export const LESSON_T05_INTRO: LessonConfig = makeIntro({
  key: "lesson-t05-intro",
  topicNum: "№5",
  audioSrc: "/lessons/lesson-t05-intro-audio.mp3",
  title: "Ондық бөлшектер",
  subtitle: "Үтір арқылы жазылатын бөлшек",
  scenes: [
    { duration: 7190, node: <BadgeTitle topicNum="№5" title="Ондық бөлшектер" subtitle="Үтірмен жазылатын сандар" color="cyan" /> },
    { duration: 11970, node: <BigText text="0,5 = жарты" sub="Ондық бөлшек — әдеттегі бөлшектің басқа жазылуы" /> },
    { duration: 12590, node: <BulletList title="Разрядтар" items={["Оныншы бөлік", "Жүзінші бөлік", "Мыңыншы бөлік..."]} color="cyan" /> },
    { duration: 11920, node: <BulletList title="Үйренесің" items={["Жазу, оқу, төрт амал", "Әдеттегі бөлшекке ауыстыру"]} color="cyan" /> },
    { duration: 8970, node: <CTA text="Дайын болсақ — бастадық!" color="cyan" /> },
  ],
});

export const LESSON_T06_INTRO: LessonConfig = makeIntro({
  key: "lesson-t06-intro",
  topicNum: "№6",
  audioSrc: "/lessons/lesson-t06-intro-audio.mp3",
  title: "Пайыз",
  subtitle: "Күнделікті өмірде жиі",
  scenes: [
    { duration: 9540, node: <BadgeTitle topicNum="№6" title="Пайыз" subtitle="Жүзден алынған бөлік" color="yellow" /> },
    { duration: 11680, node: <BigText text="50% = жарты" sub="Пайыз — жүзден алынған бөлік" /> },
    { duration: 14920, node: <BulletList title="Үш түрі" items={["Санның пайызын табу", "Пайыздан санды табу", "Қанша пайыз екенін табу"]} color="yellow" /> },
    { duration: 13380, node: <BigText text="200 × 20 ÷ 100 = 40" sub="Санды жүзге бөл, пайызға көбейт" /> },
    { duration: 8610, node: <StatBox num="2–3" label="сұрақ НИШ-те" color="yellow" /> },
  ],
});

export const LESSON_T07_INTRO: LessonConfig = makeIntro({
  key: "lesson-t07-intro",
  topicNum: "№7",
  audioSrc: "/lessons/lesson-t07-intro-audio.mp3",
  title: "Пропорция",
  subtitle: "Екі қатынастың теңдігі",
  scenes: [
    { duration: 7020, node: <BadgeTitle topicNum="№7" title="Пропорция" subtitle="Қатынастар теңдігі" color="emerald" /> },
    { duration: 12640, node: <BigText text="3 алма = 20 тг" sub="6 алма = 40 тг" /> },
    { duration: 12400, node: <BigText text="a · d = b · c" sub="Шеткілердің көбейтіндісі ортақтардың көбейтіндісіне тең" /> },
    { duration: 11390, node: <BigText text="Қиылысқа көбейт, қалғанына бөл" sub="Белгісіз мүшені осылай табамыз" /> },
    { duration: 8320, node: <StatBox num="3–4" label="сұрақ НИШ-те" color="emerald" /> },
  ],
});

export const LESSON_T08_INTRO: LessonConfig = makeIntro({
  key: "lesson-t08-intro",
  topicNum: "№8",
  audioSrc: "/lessons/lesson-t08-intro-audio.mp3",
  title: "Бүтін сандар (теріс)",
  subtitle: "Нөлден кіші сандар",
  scenes: [
    { duration: 9470, node: <BadgeTitle topicNum="№8" title="Бүтін сандар" subtitle="Теріс сандарды үйренейік" color="red" /> },
    { duration: 14340, node: <BigText text="−3, −10, 0, 5, 17" sub="Термометр, шот, биіктік — бәрінде теріс сандар бар" /> },
    { duration: 12690, node: <BigText text="Бүтін сандар = оң + теріс + 0" sub="Олармен төрт амал жасауға болады" /> },
    { duration: 15570, node: <BulletList title="Ең маңызды ережелер" items={["(−) + (−) = теріс", "(−) × (+) = теріс", "(−) × (−) = оң!"]} color="red" /> },
    { duration: 8270, node: <StatBox num="3–5" label="сұрақ НИШ-те" color="red" /> },
  ],
});

export const LESSON_T09_INTRO: LessonConfig = makeIntro({
  key: "lesson-t09-intro",
  topicNum: "№9",
  audioSrc: "/lessons/lesson-t09-intro-audio.mp3",
  title: "Теңдеулер",
  subtitle: "Алгебраның бастауы",
  scenes: [
    { duration: 9140, node: <BadgeTitle topicNum="№9" title="Теңдеулер" subtitle="Белгісізді табу өнері" color="blue" /> },
    { duration: 14510, node: <BigText text="x + 5 = 10" sub="Теңдеу — ішінде белгісізі бар теңдік" /> },
    { duration: 15660, node: <BigText text="x = 10 − 5 = 5" sub="Белгісізді бір жағына, қалғанын екінші жағына" /> },
    { duration: 15470, node: <BulletList title="Үйренесің" items={["Қарапайым теңдеулер", "Теңдеулер жүйесі", "Мәтінді есептен теңдеу құру"]} color="blue" /> },
    { duration: 7310, node: <StatBox num="3–5" label="сұрақ НИШ-те" color="blue" /> },
  ],
});

export const LESSON_T10_INTRO: LessonConfig = makeIntro({
  key: "lesson-t10-intro",
  topicNum: "№10",
  audioSrc: "/lessons/lesson-t10-intro-audio.mp3",
  title: "Өрнектер және формулалар",
  subtitle: "Символдардың әлемі",
  scenes: [
    { duration: 8080, node: <BadgeTitle topicNum="№10" title="Өрнектер" subtitle="Әріптер мен сандар" color="purple" /> },
    { duration: 12520, node: <BigText text="x + 3 · y" sub="Өрнек — сандар, әріптер, амал белгілерінен құралған жазба" /> },
    { duration: 11420, node: <BigText text="Әріптер — белгісіздер" sub="Орнына сан қойып мәнін табамыз" /> },
    { duration: 12500, node: <BigText text="S = a · b" sub="Формула — әмбебап ереже өрнек түрінде" /> },
    { duration: 9780, node: <BulletList title="Үйренесің" items={["Өрнектерді жеңілдету", "Формулалармен есептеу"]} color="purple" /> },
    { duration: 6520, node: <StatBox num="2–3" label="сұрақ НИШ-те" color="purple" /> },
  ],
});

export const LESSON_T11_INTRO: LessonConfig = makeIntro({
  key: "lesson-t11-intro",
  topicNum: "№11",
  audioSrc: "/lessons/lesson-t11-intro-audio.mp3",
  title: "Геометрия",
  subtitle: "Фигуралар туралы ғылым",
  scenes: [
    { duration: 9900, node: <BadgeTitle topicNum="№11" title="Геометрия" subtitle="Фигуралар мен өлшемдер" color="indigo" /> },
    { duration: 12760, node: <BigText text="Нүкте · Түзу · Бұрыш" sub="Үшбұрыш · Шаршы · Шеңбер" /> },
    { duration: 14440, node: <BulletList title="Қасиеттері" items={["Тіктөртбұрыш: қарама-қарсы қабырғалар тең", "Шаршы: барлық қабырғалары тең"]} color="indigo" /> },
    { duration: 12380, node: <BulletList title="Үйренесің" items={["Периметр мен ауданды есептеу", "Бұрыштарды өлшеу", "Фигураларды салыстыру"]} color="indigo" /> },
    { duration: 7720, node: <StatBox num="4–5" label="сұрақ НИШ-те" color="indigo" /> },
  ],
});

export const LESSON_T12_INTRO: LessonConfig = makeIntro({
  key: "lesson-t12-intro",
  topicNum: "№12",
  audioSrc: "/lessons/lesson-t12-intro-audio.mp3",
  title: "Координаталық жазықтық",
  subtitle: "Нүктелер мен координаттар",
  scenes: [
    { duration: 7770, node: <BadgeTitle topicNum="№12" title="Координаталық жазықтық" subtitle="x және y осьтері" color="teal" /> },
    { duration: 13580, node: <BigText text="x — горизонталь" sub="y — вертикаль. Қиылысу нүктесі — (0; 0)" /> },
    { duration: 14510, node: <BigText text="A (3; 2)" sub="Нүктенің екі координатасы бар" /> },
    { duration: 10840, node: <BulletList title="Қолданамыз" items={["Фигураларды орналастыру", "Қашықтықты есептеу"]} color="teal" /> },
    { duration: 6520, node: <StatBox num="2–3" label="сұрақ НИШ-те" color="teal" /> },
  ],
});

export const LESSON_T13_INTRO: LessonConfig = makeIntro({
  key: "lesson-t13-intro",
  topicNum: "№13",
  audioSrc: "/lessons/lesson-t13-intro-audio.mp3",
  title: "Симметрия",
  subtitle: "Фигуралардың ұқсастығы",
  scenes: [
    { duration: 9500, node: <BadgeTitle topicNum="№13" title="Симметрия" subtitle="Фигураларды түрлендіру" color="fuchsia" /> },
    { duration: 11800, node: <BigText text="🦋 Көбелектің қанаттары" sub="Симметрия — өз-өзіне ұқсас болу" /> },
    { duration: 14490, node: <BulletList title="Үш түрі" items={["Осьтік — сызыққа қатысты", "Нүктелік — нүктеге қатысты", "Айналма — бұрышқа қатысты"]} color="fuchsia" /> },
    { duration: 10310, node: <BulletList title="Үйренесің" items={["Фигураларды түрлендіру", "Симметрия осьтерін табу"]} color="fuchsia" /> },
    { duration: 6520, node: <StatBox num="2–3" label="сұрақ НИШ-те" color="fuchsia" /> },
  ],
});

export const LESSON_T14_INTRO: LessonConfig = makeIntro({
  key: "lesson-t14-intro",
  topicNum: "№14",
  audioSrc: "/lessons/lesson-t14-intro-audio.mp3",
  title: "Мәтінді есептер",
  subtitle: "Ең қиын бөлімдердің бірі",
  scenes: [
    { duration: 10100, node: <BadgeTitle topicNum="№14" title="Мәтінді есептер" subtitle="Сөзбен берілген есептер" color="amber" /> },
    { duration: 12039, node: <BigText text="Сан емес, сөзбен жазылған есеп." sub="Сондықтан көңіл-қойып оқу маңызды" /> },
    { duration: 15090, node: <BulletList title="Шешу реті" items={["Шартты оқы", "Белгісізді тап", "Теңдеу/сурет құр", "Шешіп жауап бер"]} color="amber" /> },
    { duration: 10460, node: <BulletList title="Түрлері" items={["Қозғалыс", "Жұмыс", "Пайыз", "Қоспа мен ерітінді"]} color="amber" /> },
    { duration: 9900, node: <StatBox num="5–6" label="сұрақ НИШ-те" sub="Жиі ең қиын бөлім" color="amber" /> },
  ],
});

export const LESSON_T15_INTRO: LessonConfig = makeIntro({
  key: "lesson-t15-intro",
  topicNum: "№15",
  audioSrc: "/lessons/lesson-t15-intro-audio.mp3",
  title: "Жиындар",
  subtitle: "Соңғы тақырып",
  scenes: [
    { duration: 8250, node: <BadgeTitle topicNum="№15" title="Жиындар" subtitle="Соңғы тақырып" color="violet" /> },
    { duration: 11900, node: <BigText text="Сыныптағы оқушылар жиыны" sub="Жиын — бір қасиетпен біріктірілген нысандар" /> },
    { duration: 12350, node: <BigText text="Элементтер — жиынның мүшелері" sub="Оларды салыстыруға, қосуға, қиылыстыруға болады" /> },
    { duration: 15090, node: <BulletList title="Амалдар" items={["∪ Бірігу — екі жиынды бір жинау", "∩ Қиылысу — ортақ элементтер", "− Айырма — тек біреуіндегілер"]} color="violet" /> },
    { duration: 11750, node: <CTA text="Барлығын үйрендің — сәттілік!" color="violet" /> },
  ],
});

// ───────── TOPIC 3 section videos ─────────

export const LESSON_T03_DIVISIBILITY: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t03-divisibility-audio.mp3",
  shortTitle: "Бөлу белгілері",
  matchSection: /бөлу белгі/i,
  scenes: [
    { duration: 8320, node: <BadgeTitle topicNum="№3·1" title="Бөлу белгілері" subtitle="Қағазсыз бөлуді тексеру" color="amber" /> },
    { duration: 10500, node: <BigText text="÷2" sub="Соңы: 0, 2, 4, 6, 8" /> },
    { duration: 8390, node: <BigText text="÷3" sub="Цифрлар қосындысы 3-ке бөлінсе" /> },
    { duration: 10940, node: <BigText text="÷5  ·  ÷10" sub="5: соңы 0 немесе 5 · 10: соңы 0" /> },
    { duration: 8780, node: <BigText text="÷9" sub="Цифрлар қосындысы 9-ға бөлінсе" /> },
    { duration: 13360, node: <BigText text="234 → 2+3+4 = 9" sub="Демек ÷3 және ÷9!" /> },
    { duration: 7310, node: <CTA text="Тест — тез шешіледі!" color="amber" /> },
  ],
});

export const LESSON_T03_PRIME: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t03-prime-audio.mp3",
  shortTitle: "Жай және құрама",
  matchSection: /жай.*құрама/i,
  scenes: [
    { duration: 12950, node: <BigText text="Жай сан = тек 1 мен өзіне ÷" sub="2, 3, 5, 7, 11, 13, 17..." /> },
    { duration: 13700, node: <BigText text="Құрама сан = басқа бөлгіштері бар" sub="4 = 2×2   ·   6 = 2×3" /> },
    { duration: 7460, node: <BigText text="1 — жай да, құрама да емес!" /> },
    { duration: 9950, node: <BigText text="2 — жалғыз жұп жай сан" sub="Қалғандары тақ" /> },
    { duration: 7910, node: <CTA text="Жай сандар — криптография!" color="amber" /> },
  ],
});

export const LESSON_T03_FACTOR: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t03-factor-audio.mp3",
  shortTitle: "Жай көбейткіштерге жіктеу",
  matchSection: /жіктеу/i,
  scenes: [
    { duration: 9950, node: <BigText text="Санды жай сандардың көбейтіндісі ретінде жазу" /> },
    { duration: 11700, node: <BigText text="12 = 2 × 2 × 3" sub="= 2² × 3" /> },
    { duration: 12740, node: <BulletList title="Әдіс" items={["Кішкене жай санға бөл", "Қайта бөл", "Жай сан шыққанша"]} color="amber" /> },
    { duration: 20850, node: <BigText text="60 → 30 → 15 → 5" sub="60 = 2² × 3 × 5" /> },
    { duration: 7620, node: <CTA text="ЕҮОБ/ЕКОЕ-ге кілт" color="amber" /> },
  ],
});

export const LESSON_T03_GCD_LCM: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t03-gcd-lcm-audio.mp3",
  shortTitle: "ЕҮОБ пен ЕКОЕ",
  matchSection: /еүоб/i,
  scenes: [
    { duration: 10380, node: <BigText text="ЕҮОБ — Ең Үлкен Ортақ Бөлгіш" sub="Екі санды да бөлетін ең үлкен" /> },
    { duration: 10890, node: <BigText text="ЕКОЕ — Ең Кіші Ортақ Еселік" sub="Екеуіне де бөлінетін ең кіші" /> },
    { duration: 15760, node: <BigText text="12 мен 18" sub="Ортақ бөлгіштер: 1, 2, 3, 6 → ЕҮОБ = 6" /> },
    { duration: 14510, node: <BigText text="Еселіктер: 36, 72, 108..." sub="Ең кішісі → ЕКОЕ = 36" /> },
    { duration: 8700, node: <CTA text="Бөлшектерде қажет!" color="amber" /> },
  ],
});

// ───────── TOPIC 4 section videos ─────────

export const LESSON_T04_WHAT: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t04-what-audio.mp3",
  shortTitle: "Бөлшек дегеніміз не",
  matchSection: /бөлшек дегеніміз/i,
  scenes: [
    { duration: 7650, node: <BadgeTitle topicNum="№4·1" title="Бөлшек деген не?" subtitle="Бүтіннің бір бөлігі" color="pink" /> },
    { duration: 17270, node: <BulletList title="Екі бөлік" items={["Алым (үстіңгі) — қанша бөлік алдық", "Бөлім (астыңғы) — бүтін неше бөлікке бөлінген"]} color="pink" /> },
    { duration: 9930, node: <BigText text="3/4" sub="4 бөліктен 3-еуін алдық" /> },
    { duration: 7910, node: <CTA text="Жарты, ширек — бәрі бөлшек!" color="pink" /> },
  ],
});

export const LESSON_T04_TYPES: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t04-types-audio.mp3",
  shortTitle: "Дұрыс, бұрыс, аралас",
  matchSection: /дұрыс.*бұрыс/i,
  scenes: [
    { duration: 6300, node: <BadgeTitle topicNum="№4·2" title="3 түрі" subtitle="Бөлшектің түрлері" color="pink" /> },
    { duration: 9470, node: <BigText text="Дұрыс: 3/4" sub="Алым < бөлім" /> },
    { duration: 10360, node: <BigText text="Бұрыс: 7/4" sub="Алым ≥ бөлім" /> },
    { duration: 10720, node: <BigText text="Аралас: 1 ¾" sub="Бүтін + дұрыс бөлшек" /> },
    { duration: 11660, node: <BigText text="7/4 = 1 ¾" sub="Бұрыс → аралас" /> },
  ],
});

export const LESSON_T04_REDUCE: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t04-reduce-audio.mp3",
  shortTitle: "Қысқарту",
  matchSection: /қысқарту/i,
  scenes: [
    { duration: 8990, node: <BadgeTitle topicNum="№4·3" title="Қысқарту" subtitle="Алым мен бөлімді бірдейге ÷" color="pink" /> },
    { duration: 7910, node: <BigText text="Мәні өзгермейді — сан ғана қарапайым" /> },
    { duration: 10070, node: <BigText text="6/8 ÷2 → 3/4" /> },
    { duration: 10860, node: <BigText text="15/20 ÷5 → 3/4" /> },
    { duration: 10290, node: <BigText text="ЕҮОБ-қа бөлсең — ең қарапайым нұсқа" /> },
  ],
});

export const LESSON_T04_ADDSUBTRACT: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t04-addsubtract-audio.mp3",
  shortTitle: "Қосу және азайту",
  matchSection: /бөлшектерді қосу/i,
  scenes: [
    { duration: 10310, node: <BigText text="Бөлімдер = → алымдарды қосамыз" /> },
    { duration: 8490, node: <BigText text="1/5 + 2/5 = 3/5" /> },
    { duration: 8630, node: <BigText text="Бөлімдер ≠ → ортақ бөлімге" /> },
    { duration: 15180, node: <BigText text="1/2 + 1/3" sub="Ортақ = 6 → 3/6 + 2/6 = 5/6" /> },
    { duration: 9210, node: <BigText text="1/2 = 3/6   ·   1/3 = 2/6" /> },
    { duration: 8150, node: <CTA text="Азайту — дәл солай" color="pink" /> },
  ],
});

export const LESSON_T04_MULTDIV: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t04-multdiv-audio.mp3",
  shortTitle: "Көбейту, бөлу, салыстыру",
  matchSection: /бөлшектерді көбейту/i,
  scenes: [
    { duration: 10600, node: <BigText text="× : алым×алым, бөлім×бөлім" /> },
    { duration: 9020, node: <BigText text="2/3 × 4/5 = 8/15" /> },
    { duration: 9880, node: <BigText text="÷ : екіншіні төңкер" sub="Көбейтуге айналады" /> },
    { duration: 12830, node: <BigText text="2/3 ÷ 4/5 = 2/3 × 5/4 = 5/6" /> },
    { duration: 19360, node: <BigText text="Айқас көбейту" sub="2/3 vs 3/5 → 10 vs 9 → 2/3 үлкен" /> },
  ],
});

// ───────── TOPIC 5 section videos ─────────

export const LESSON_T05_WHAT: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t05-what-audio.mp3",
  shortTitle: "Ондық бөлшек",
  matchSection: /ондық бөлшек дегеніміз/i,
  scenes: [
    { duration: 7740, node: <BadgeTitle topicNum="№5·1" title="Ондық бөлшек" subtitle="Үтір арқылы" color="cyan" /> },
    { duration: 10890, node: <BigText text="0,5 = ½" sub="0,25 = ¼" /> },
    { duration: 11870, node: <BulletList title="Үтір бөледі" items={["Сол жақ — бүтін", "Оң жақ — ондық бөлік"]} color="cyan" /> },
    { duration: 7220, node: <CTA text="Есептерді жеңілдетеді" color="cyan" /> },
  ],
});

export const LESSON_T05_DIGITS: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t05-digits-audio.mp3",
  shortTitle: "Разрядтар",
  matchSection: /^#*\s*разрядтар/i,
  scenes: [
    { duration: 6950, node: <BadgeTitle topicNum="№5·2" title="Разрядтар" subtitle="Оныншы, жүзінші, мыңыншы" color="cyan" /> },
    { duration: 11580, node: <BigText text="3,475" sub="4 – оныншы · 7 – жүзінші · 5 – мыңыншы" /> },
    { duration: 9660, node: <BigText text="Салыстыр: бүтін → оныншы → жүзінші..." /> },
    { duration: 13840, node: <BigText text="0,5 = 0,50 = 0,500" sub="Нөл қосуға болады" /> },
  ],
});

export const LESSON_T05_ADDSUBTRACT: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t05-addsubtract-audio.mp3",
  shortTitle: "Қосу/азайту",
  matchSection: /қосу және азайту/i,
  scenes: [
    { duration: 9620, node: <BigText text="Үтірді үтірге сәйкес қой" sub="Тік бағанмен жаз" /> },
    { duration: 6110, node: <BigText text="2,35 + 1,4 = ?" /> },
    { duration: 13380, node: <BigText text="1,4 → 1,40" sub="Нөл қосуға болады" /> },
    { duration: 13480, node: <BigText text="2,35 + 1,40 = 3,75" /> },
    { duration: 7480, node: <CTA text="Азайту — сол сияқты" color="cyan" /> },
  ],
});

export const LESSON_T05_MULTDIV: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t05-multdiv-audio.mp3",
  shortTitle: "Көбейту",
  matchSection: /^#*\s*көбейту\s*$/i,
  scenes: [
    { duration: 7410, node: <BigText text="× екі қадам" /> },
    { duration: 6810, node: <BigText text="1) Үтірсіз көбейт" /> },
    { duration: 10910, node: <BigText text="2) Үтірлерді санап, жауапта бөл" /> },
    { duration: 19050, node: <BigText text="0,5 × 0,3" sub="5×3=15 · 1+1=2 үтірден кейін · = 0,15" /> },
    { duration: 7550, node: <CTA text="÷ — бөлгіштің үтірін жылжыт" color="cyan" /> },
  ],
});

export const LESSON_T05_CONVERT: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t05-convert-audio.mp3",
  shortTitle: "Айналдырулар",
  matchSection: /айналдыру/i,
  scenes: [
    { duration: 8180, node: <BadgeTitle topicNum="№5·5" title="Айналдырулар" subtitle="Ондық ↔ жай ↔ %" color="cyan" /> },
    { duration: 9810, node: <BigText text="Бөлім: 10, 100, 1000" sub="Үтірден кейінгі цифр санына қарай" /> },
    { duration: 11820, node: <BigText text="0,7 = 7/10   ·   0,25 = 1/4" /> },
    { duration: 13430, node: <BigText text="Жай → ондық: алымды ÷ бөлімге" sub="3/4 = 3÷4 = 0,75" /> },
    { duration: 14850, node: <BigText text="0,5 = 50%   ·   1 = 100%   ·   0,01 = 1%" /> },
  ],
});

// ───────── TOPIC 6 section videos ─────────

export const LESSON_T06_WHAT: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t06-what-audio.mp3",
  shortTitle: "Пайыз деген не",
  matchSection: /пайыз дегеніміз/i,
  scenes: [
    { duration: 9420, node: <BadgeTitle topicNum="№6·1" title="Пайыз деген не?" subtitle="Жүзден алынған бөлік" color="yellow" /> },
    { duration: 9830, node: <BigText text="Пайыз = Жай бөлшек = Ондық" sub="Бір нәрсенің үш жазылуы" /> },
    { duration: 8580, node: <BigText text="50% = ½ = 0,5" /> },
    { duration: 7820, node: <BigText text="10% = 1/10 = 0,1" /> },
    { duration: 9450, node: <CTA text="Өмірде жиі: баға, салық, банк" color="yellow" /> },
  ],
});

export const LESSON_T06_FIND: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t06-find-audio.mp3",
  shortTitle: "Санның пайызын табу",
  matchSection: /санның пайызын табу/i,
  scenes: [
    { duration: 7600, node: <BadgeTitle topicNum="№6·2" title="Санның %-ын табу" subtitle="Ең жиі есеп" color="yellow" /> },
    { duration: 8460, node: <BigText text="Санды ÷ 100, × пайызға" /> },
    { duration: 13530, node: <BigText text="200-дің 10%-ы" sub="200 ÷ 100 = 2   ·   2 × 10 = 20" /> },
    { duration: 7360, node: <BigText text="= 20" /> },
    { duration: 14540, node: <CTA text="Ойша есептеуге болады!" color="yellow" /> },
  ],
});

export const LESSON_T06_INVERSE: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t06-inverse-audio.mp3",
  shortTitle: "Кері есеп",
  matchSection: /пайызбен табу|кері есеп|неше пайызы/i,
  scenes: [
    { duration: 7100, node: <BadgeTitle topicNum="№6·3" title="Кері есеп" subtitle="Пайыздан санды табу" color="yellow" /> },
    { duration: 8850, node: <BigText text="20%-ы = 40 → сан қанша?" /> },
    { duration: 8970, node: <BigText text="Шама ÷ пайыз × 100" /> },
    { duration: 9980, node: <BigText text="40 ÷ 20 × 100 = 200" /> },
    { duration: 16770, node: <BigText text="50 бөлу 200 × 100 = 25%" sub="Бір сан екіншісінің %-ы" /> },
  ],
});

export const LESSON_T06_CHANGE: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t06-change-audio.mp3",
  shortTitle: "Пайыз бойынша өзгеріс",
  matchSection: /пайыз бойынша өзгеріс/i,
  scenes: [
    { duration: 8680, node: <BadgeTitle topicNum="№6·4" title="Жеңілдік/Қымбаттау" subtitle="Баға өзгеруі" color="yellow" /> },
    { duration: 9810, node: <BigText text="1000 тг → 20% жеңілдік" /> },
    { duration: 14060, node: <BigText text="Жеңілдік: 1000×20÷100 = 200" sub="Жаңа баға: 1000 − 200 = 800 тг" /> },
    { duration: 7120, node: <BigText text="Қымбаттау — сол сияқты, тек +" /> },
    { duration: 10790, node: <CTA text="Айырма ÷ бастапқы × 100 = %" color="yellow" /> },
  ],
});

// ───────── TOPIC 7 section videos ─────────

export const LESSON_T07_RATIO: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t07-ratio-audio.mp3",
  shortTitle: "Қатынас",
  matchSection: /^#*\s*қатынас\s*$/i,
  scenes: [
    { duration: 7700, node: <BadgeTitle topicNum="№7·1" title="Қатынас" subtitle="Екі санды салыстыру" color="emerald" /> },
    { duration: 11970, node: <BigText text="3 : 5  немесе  3/5" sub="Үштің беске қатынасы" /> },
    { duration: 7550, node: <BigText text="Бөлшек ретінде қарастыр" /> },
    { duration: 8059, node: <BigText text="Қысқартуға болады" /> },
    { duration: 8270, node: <BigText text="6 : 8  =  3 : 4" /> },
  ],
});

export const LESSON_T07_WHAT: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t07-what-audio.mp3",
  shortTitle: "Пропорция",
  matchSection: /пропорция дегеніміз/i,
  scenes: [
    { duration: 7700, node: <BadgeTitle topicNum="№7·2" title="Пропорция" subtitle="Екі қатынастың теңдігі" color="emerald" /> },
    { duration: 7820, node: <BigText text="2/3 = 4/6" /> },
    { duration: 9520, node: <BigText text='"Екінің үшке қатынасы төрттің алтыға қатынасына тең"' /> },
    { duration: 9140, node: <BigText text="4 мүше: 2 шеткі + 2 ортаңғы" /> },
    { duration: 11850, node: <BigText text="a · d = b · c" sub="Негізгі қасиет" /> },
    { duration: 10860, node: <BigText text="2 × 6 = 3 × 4" sub="12 = 12 ✓" /> },
  ],
});

export const LESSON_T07_UNKNOWN: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t07-unknown-audio.mp3",
  shortTitle: "Белгісізді табу",
  matchSection: /белгісізді табу/i,
  scenes: [
    { duration: 8730, node: <BadgeTitle topicNum="№7·3" title="Белгісізді табу" subtitle="Қиылысқа көбейту" color="emerald" /> },
    { duration: 8180, node: <BigText text="x/5 = 6/15" /> },
    { duration: 14970, node: <BigText text="x · 15 = 5 · 6 = 30" sub="x = 30 ÷ 15 = 2" /> },
    { duration: 8059, node: <BigText text="x = 2" /> },
    { duration: 7910, node: <CTA text="Қиылысқа × → қалғанына ÷" color="emerald" /> },
  ],
});

export const LESSON_T07_TYPES: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t07-types-audio.mp3",
  shortTitle: "Тура, кері, масштаб",
  matchSection: /тура пропорция/i,
  scenes: [
    { duration: 7020, node: <BadgeTitle topicNum="№7·4" title="Түрлері" subtitle="Тура, кері, масштаб" color="emerald" /> },
    { duration: 12140, node: <BigText text="Тура: х↑ → у↑" sub="Мысалы, құс салмағы — құны" /> },
    { duration: 15040, node: <BigText text="Кері: х↑ → у↓" sub="Жылдам жүрсең — аз уақыт" /> },
    { duration: 8700, node: <BigText text="Масштаб = карта : нағыз" /> },
    { duration: 10790, node: <BigText text="1 : 100 000" sub="1 см → 1 км" /> },
  ],
});

// ───────── TOPIC 8 section videos ─────────

export const LESSON_T08_SET: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t08-set-audio.mp3",
  shortTitle: "Бүтін сандар, модуль",
  matchSection: /бүтін сандар жиыны/i,
  scenes: [
    { duration: 8700, node: <BadgeTitle topicNum="№8·1" title="Бүтін сандар" subtitle="Оң + Теріс + 0" color="red" /> },
    { duration: 10960, node: <BigText text="..., −3, −2, −1, 0, 1, 2, 3, ..." /> },
    { duration: 9740, node: <BigText text="|a| = Модуль" sub="Нөлден алыстық, әрқашан оң" /> },
    { duration: 11420, node: <BigText text="|−7| = 7   ·   |7| = 7" sub="Белгісінсіз мәні" /> },
    { duration: 7430, node: <CTA text="Санның абсолют мәні" color="red" /> },
  ],
});

export const LESSON_T08_COMPARE: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t08-compare-audio.mp3",
  shortTitle: "Салыстыру",
  matchSection: /сандарды салыстыру/i,
  scenes: [
    { duration: 6570, node: <BadgeTitle topicNum="№8·2" title="Салыстыру" subtitle="Теріс сандармен" color="red" /> },
    { duration: 7600, node: <BigText text="+ > −  әрқашан" /> },
    { duration: 8150, node: <BigText text="Теріс: кіші модуль = үлкен сан" /> },
    { duration: 10910, node: <BigText text="−2 > −5" sub="Модулі 2-нің кішірек" /> },
    { duration: 8270, node: <CTA text="Сан түзуі: оң жақ = үлкен" color="red" /> },
  ],
});

export const LESSON_T08_ADDSUBTRACT: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t08-addsubtract-audio.mp3",
  shortTitle: "Қосу, азайту",
  matchSection: /^#*\s*қосу\s*$/i,
  scenes: [
    { duration: 7430, node: <BadgeTitle topicNum="№8·3" title="Қосу / Азайту" subtitle="Белгі ережесі" color="red" /> },
    { duration: 10070, node: <BigText text="Белгілер = → модульдерді +, белгі қал" /> },
    { duration: 8250, node: <BigText text="−3 + (−2) = −5" /> },
    { duration: 10890, node: <BigText text="Белгілер ≠ → модульдерді −" sub="Үлкеннің белгісін ал" /> },
    { duration: 10620, node: <BigText text="−7 + 5 = −2" /> },
    { duration: 7720, node: <CTA text="Азайту = қарама-қарсы қосу" color="red" /> },
  ],
});

export const LESSON_T08_MULTDIV: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t08-multdiv-audio.mp3",
  shortTitle: "Көбейту, бөлу",
  matchSection: /көбейту және бөлу/i,
  scenes: [
    { duration: 7380, node: <BadgeTitle topicNum="№8·4" title="× ÷ Белгі ережесі" subtitle="Ең маңызды ереже" color="red" /> },
    { duration: 10600, node: <BulletList title="Ереже" items={["Белгілер = → нәтиже +", "Белгілер ≠ → нәтиже −"]} color="red" /> },
    { duration: 9400, node: <BigText text="(−3) × (−4) = +12" sub="Теріс × теріс = оң!" /> },
    { duration: 9140, node: <BigText text="(−6) × 2 = −12" /> },
    { duration: 9690, node: <BigText text="× 0 = 0   ·   ÷ 0 — болмайды!" /> },
  ],
});

// ───────── TOPIC 9 section videos ─────────

export const LESSON_T09_WHAT: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t09-what-audio.mp3",
  shortTitle: "Теңдеу деген не",
  matchSection: /теңдеу дегеніміз/i,
  scenes: [
    { duration: 6950, node: <BadgeTitle topicNum="№9·1" title="Теңдеу" subtitle="Белгісізі бар теңдік" color="blue" /> },
    { duration: 7290, node: <BigText text="x + 5 = 10" /> },
    { duration: 9400, node: <BigText text="Түбір — теңдікті шын ететін мән" /> },
    { duration: 10580, node: <BigText text="x = 5" sub="5 + 5 = 10 ✓" /> },
    { duration: 7020, node: <CTA text="Теңдеуді шешу = түбір табу" color="blue" /> },
  ],
});

export const LESSON_T09_SIMPLE: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t09-simple-audio.mp3",
  shortTitle: "Қарапайым теңдеулер",
  matchSection: /қарапайым теңдеулер/i,
  scenes: [
    { duration: 7120, node: <BadgeTitle topicNum="№9·2" title="Қарапайым теңдеу" subtitle="Бір амал" color="blue" /> },
    { duration: 11660, node: <BigText text="x + 3 = 8" sub="x = 8 − 3 = 5" /> },
    { duration: 11320, node: <BigText text="x − 4 = 7" sub="x = 7 + 4 = 11" /> },
    { duration: 11610, node: <BigText text="x · 3 = 15" sub="x = 15 ÷ 3 = 5" /> },
    { duration: 11560, node: <BigText text="x ÷ 2 = 6" sub="x = 6 · 2 = 12" /> },
  ],
});

export const LESSON_T09_COMPLEX: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t09-complex-audio.mp3",
  shortTitle: "Күрделі теңдеулер",
  matchSection: /күрделі теңдеулер/i,
  scenes: [
    { duration: 7430, node: <BadgeTitle topicNum="№9·3" title="Күрделі теңдеу" subtitle="Екі амал" color="blue" /> },
    { duration: 7740, node: <BigText text="2x + 3 = 11" /> },
    { duration: 12109, node: <BigText text="2x = 11 − 3 = 8" sub="Саннан — қарама-қарсы" /> },
    { duration: 7550, node: <BigText text="x = 8 ÷ 2 = 4" /> },
    { duration: 8180, node: <CTA text="Екі жақта x → бірігеді" color="blue" /> },
  ],
});

export const LESSON_T09_WORD: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t09-word-audio.mp3",
  shortTitle: "Мәтіннен теңдеу",
  matchSection: /мәтінді есептен теңдеу/i,
  scenes: [
    { duration: 8010, node: <BadgeTitle topicNum="№9·4" title="Мәтіннен теңдеу" subtitle="Сөзден формулаға" color="blue" /> },
    { duration: 12620, node: <BigText text="2 кітап = 1000 тг" sub="Қымбаты − арзаны = 300" /> },
    { duration: 12280, node: <BigText text="Арзан = x   ·   Қымбат = x + 300" /> },
    { duration: 13910, node: <BigText text="x + x + 300 = 1000" sub="2x = 700 → x = 350" /> },
    { duration: 8490, node: <BigText text="Арзан — 350, қымбат — 650" /> },
  ],
});

// ───────── TOPIC 10 sections ─────────

export const LESSON_T10_NUMERIC: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t10-numeric-audio.mp3",
  shortTitle: "Сандық/әріпті өрнек",
  matchSection: /сандық өрнек/i,
  scenes: [
    { duration: 9210, node: <BadgeTitle topicNum="№10·1" title="Өрнек түрлері" subtitle="Сандық пен әріпті" color="purple" /> },
    { duration: 10260, node: <BigText text="Сандық: 2 + 3 · 4" /> },
    { duration: 9930, node: <BigText text="Әріпті: 2x + 3" sub="Әріп = айнымалы" /> },
    { duration: 9380, node: <BigText text="Айнымалы орнына сан қой → мәнін тап" /> },
    { duration: 12810, node: <BigText text="a = −2 → a² = 4" sub="Теріс × теріс = оң" /> },
  ],
});

export const LESSON_T10_SIMILAR: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t10-similar-audio.mp3",
  shortTitle: "Ұқсас қосылғыштар",
  matchSection: /ұқсас қосылғыш/i,
  scenes: [
    { duration: 8510, node: <BadgeTitle topicNum="№10·2" title="Ұқсас біріктіру" subtitle="Бірдей әріпті бөлік" color="purple" /> },
    { duration: 8180, node: <BigText text="3x  ·  5x — ұқсас" /> },
    { duration: 15020, node: <BigText text="3x + 5x = 8x" sub="Коэффициенттерді +" /> },
    { duration: 12140, node: <BigText text="2x + 3y — ұқсас емес!" /> },
    { duration: 8680, node: <CTA text="Жеңілдетудің 1-қадамы" color="purple" /> },
  ],
});

export const LESSON_T10_BRACKETS: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t10-brackets-audio.mp3",
  shortTitle: "Жақшаны ашу",
  matchSection: /жақшаны ашу/i,
  scenes: [
    { duration: 8100, node: <BadgeTitle topicNum="№10·3" title="Жақшаны ашу" subtitle="Әр мүшеге көбейту" color="purple" /> },
    { duration: 8390, node: <BigText text="3 · (x + 2) = 3x + 6" /> },
    { duration: 10480, node: <BigText text="Әр мүшеге көбейтеміз" /> },
    { duration: 9280, node: <BigText text="Алдында − болса → белгілерді ауыстыр" /> },
    { duration: 10430, node: <BigText text="−(x − 3) = −x + 3" /> },
  ],
});

export const LESSON_T10_FORMULAS: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t10-formulas-audio.mp3",
  shortTitle: "Формулалар",
  matchSection: /^#*\s*формулалар/i,
  scenes: [
    { duration: 8100, node: <BadgeTitle topicNum="№10·4" title="Формулалар" subtitle="Әмбебап ережелер" color="purple" /> },
    { duration: 9810, node: <BigText text="P = 2(a + b)   ·   S = a · b" sub="Тіктөртбұрыш" /> },
    { duration: 8730, node: <BigText text="P = 4a   ·   S = a²" sub="Шаршы" /> },
    { duration: 8130, node: <BigText text="S = a · h ÷ 2" sub="Үшбұрыш" /> },
    { duration: 9060, node: <CTA text="Шапшаңдықтың кілті!" color="purple" /> },
  ],
});

// ───────── TOPIC 11 sections ─────────

export const LESSON_T11_PERIMETER: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t11-perimeter-audio.mp3",
  shortTitle: "Периметр",
  matchSection: /^#*\s*периметр/i,
  scenes: [
    { duration: 8270, node: <BadgeTitle topicNum="№11·1" title="Периметр" subtitle="Қабырғалардың ұзындығы" color="indigo" /> },
    { duration: 8920, node: <BigText text="Шаршы: P = 4a" /> },
    { duration: 8580, node: <BigText text="Тіктөртбұрыш: P = 2(a + b)" /> },
    { duration: 9620, node: <BigText text="Үшбұрыш: P = a + b + c" /> },
    { duration: 8150, node: <CTA text="см немесе м" color="indigo" /> },
  ],
});

export const LESSON_T11_AREA: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t11-area-audio.mp3",
  shortTitle: "Аудан",
  matchSection: /^#*\s*аудан\s*$/i,
  scenes: [
    { duration: 7460, node: <BadgeTitle topicNum="№11·2" title="Аудан" subtitle="Бет мөлшері" color="indigo" /> },
    { duration: 6930, node: <BigText text="Шаршы: S = a²" /> },
    { duration: 7170, node: <BigText text="Тіктөртбұрыш: S = a · b" /> },
    { duration: 11080, node: <BigText text="Үшбұрыш: S = a · h ÷ 2" sub="h — биіктік" /> },
    { duration: 8900, node: <CTA text="см² немесе м²" color="indigo" /> },
  ],
});

export const LESSON_T11_ANGLES: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t11-angles-audio.mp3",
  shortTitle: "Бұрыштар",
  matchSection: /^#*\s*бұрыштар/i,
  scenes: [
    { duration: 7740, node: <BadgeTitle topicNum="№11·3" title="Бұрыштар" subtitle="Градуспен өлшеу" color="indigo" /> },
    { duration: 6660, node: <BigText text="Градус (°)" /> },
    { duration: 7620, node: <BigText text="Сүйір: < 90°" /> },
    { duration: 7170, node: <BigText text="Тік: = 90°" /> },
    { duration: 8680, node: <BigText text="Доғал: 90° < x < 180°" /> },
    { duration: 7500, node: <BigText text="Жайылған: 180°" /> },
  ],
});

// ───────── TOPIC 12 sections ─────────

export const LESSON_T12_PLANE: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t12-plane-audio.mp3",
  shortTitle: "Жазықтық",
  matchSection: /координаталық жазықтық дегеніміз|нүктені белгілеу/i,
  scenes: [
    { duration: 7820, node: <BadgeTitle topicNum="№12·1" title="Координата жазықтығы" subtitle="x пен y осьтері" color="teal" /> },
    { duration: 9860, node: <BigText text="x — горизонталь   ·   y — вертикаль" /> },
    { duration: 9620, node: <BigText text="(0; 0) — координаттар басы" /> },
    { duration: 8390, node: <BigText text="Әр нүктеде 2 координата" /> },
    { duration: 11850, node: <BigText text="A (3; 5)" sub="x = 3, y = 5" /> },
  ],
});

export const LESSON_T12_QUADRANTS: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t12-quadrants-audio.mp3",
  shortTitle: "Ширектер",
  matchSection: /ширек|квадрант/i,
  scenes: [
    { duration: 6860, node: <BadgeTitle topicNum="№12·2" title="4 ширек" subtitle="Жазықтық бөлінеді" color="teal" /> },
    { duration: 7700, node: <BigText text="I: x > 0, y > 0" /> },
    { duration: 7430, node: <BigText text="II: x < 0, y > 0" /> },
    { duration: 7530, node: <BigText text="III: x < 0, y < 0" /> },
    { duration: 7620, node: <BigText text="IV: x > 0, y < 0" /> },
    { duration: 8630, node: <CTA text="Таңбаға қарап тап" color="teal" /> },
  ],
});

export const LESSON_T12_DISTANCE: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t12-distance-audio.mp3",
  shortTitle: "Қашықтық",
  matchSection: /арасындағы қашықтық/i,
  scenes: [
    { duration: 7100, node: <BadgeTitle topicNum="№12·3" title="Қашықтық" subtitle="Нүктелер арасы" color="teal" /> },
    { duration: 9780, node: <BigText text="y бірдей → |x₁ − x₂|" /> },
    { duration: 9660, node: <BigText text="x бірдей → |y₁ − y₂|" /> },
    { duration: 8250, node: <BigText text="Жалпы → Пифагор" /> },
    { duration: 9450, node: <CTA text="Кіші класта — горизонталь/вертикаль" color="teal" /> },
  ],
});

// ───────── TOPIC 13 sections ─────────

export const LESSON_T13_AXIS: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t13-axis-audio.mp3",
  shortTitle: "Ось симметриясы",
  matchSection: /ось симметрия/i,
  scenes: [
    { duration: 9620, node: <BadgeTitle topicNum="№13·1" title="Ось симметриясы" subtitle="Сызыққа қатысты" color="fuchsia" /> },
    { duration: 7910, node: <BigText text="Симметрия осі — бөлуші сызық" /> },
    { duration: 9160, node: <BigText text="🦋 Көбелек — классикалық мысал" /> },
    { duration: 9330, node: <BigText text="Шаршы: 4 ось   ·   Тіктөртбұрыш: 2 ось" /> },
    { duration: 8870, node: <BigText text="Шеңбер: ∞ ось" sub="Кез келген диаметр" /> },
  ],
});

export const LESSON_T13_OTHER: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t13-other-audio.mp3",
  shortTitle: "Центрлік, көшіру, бұру",
  matchSection: /центрлік симметрия|параллель көшіру/i,
  scenes: [
    { duration: 8750, node: <BadgeTitle topicNum="№13·2" title="Басқа түрлендірулер" subtitle="Центр, көшіру, бұру" color="fuchsia" /> },
    { duration: 8850, node: <BigText text="Центрлік — нүктеге қатысты" /> },
    { duration: 7940, node: <BigText text="Параллель көшіру — жылжыту" /> },
    { duration: 8970, node: <BigText text="Бұру — нүкте айналасында айналдыру" /> },
    { duration: 8080, node: <CTA text="Өлшем өзгермейді" color="fuchsia" /> },
  ],
});

export const LESSON_T13_SHAPES: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t13-shapes-audio.mp3",
  shortTitle: "Куб, параллелепипед",
  matchSection: /^#*\s*куб|параллелепипед/i,
  scenes: [
    { duration: 7820, node: <BadgeTitle topicNum="№13·3" title="3D фигуралар" subtitle="Куб мен параллелепипед" color="fuchsia" /> },
    { duration: 10600, node: <BigText text="Куб: 6 шаршы беті" sub="V = a³   ·   S = 6a²" /> },
    { duration: 8440, node: <BigText text="Тікбұрышты параллелепипед" sub="Қыры әртүрлі болуы мүмкін" /> },
    { duration: 7000, node: <BigText text="V = a · b · c" /> },
    { duration: 8440, node: <BigText text="Жайылма: 6 шаршы крест" /> },
  ],
});

// ───────── TOPIC 14 sections ─────────

export const LESSON_T14_MOTION: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t14-motion-audio.mp3",
  shortTitle: "Қозғалыс есептері",
  matchSection: /қозғалысқа байланысты/i,
  scenes: [
    { duration: 7770, node: <BadgeTitle topicNum="№14·1" title="Қозғалыс есептері" subtitle="Ең көп кездесетін" color="amber" /> },
    { duration: 8250, node: <BigText text="s = v · t" sub="жол = жылдамдық × уақыт" /> },
    { duration: 11510, node: <BigText text="Қарсы: V = v₁ + v₂" sub="Жалпы жылдамдық — сумма" /> },
    { duration: 10790, node: <BigText text="Қуу: V = v₁ − v₂" sub="Жалпы жылдамдық — айырма" /> },
    { duration: 11660, node: <BigText text="Ағыспен → +   ·   Қарсы → −" /> },
  ],
});

export const LESSON_T14_WORK: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t14-work-audio.mp3",
  shortTitle: "Жұмыс, баға, жас",
  matchSection: /жұмысқа байланысты/i,
  scenes: [
    { duration: 8900, node: <BadgeTitle topicNum="№14·2" title="Басқа түрлер" subtitle="Жұмыс, баға, жас" color="amber" /> },
    { duration: 9500, node: <BigText text="Жұмыс = өнімділік × уақыт" /> },
    { duration: 9300, node: <BigText text="1 жұмысшы a сағатта → 1/a өнімділік" /> },
    { duration: 9500, node: <BigText text="Құн = сан × баға" /> },
    { duration: 8900, node: <BigText text="Жас: қазіргі = x → теңдеу" /> },
  ],
});

export const LESSON_T14_ALGORITHM: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t14-algorithm-audio.mp3",
  shortTitle: "Шешу алгоритмі",
  matchSection: /шешу алгоритмі/i,
  scenes: [
    { duration: 7410, node: <BadgeTitle topicNum="№14·3" title="5 қадамдық алгоритм" subtitle="Кез келген есеп" color="amber" /> },
    { duration: 7020, node: <BigText text="1. Шартты бірнеше рет оқы" /> },
    { duration: 8780, node: <BigText text="2. Белгісізді анықтап, x деп бел" /> },
    { duration: 8010, node: <BigText text="3. Теңдеу немесе сурет құр" /> },
    { duration: 6500, node: <BigText text="4. Теңдеуді шеш" /> },
    { duration: 7770, node: <BigText text="5. Жауапты тексер және сөзбен жаз" /> },
  ],
});

// ───────── TOPIC 15 sections ─────────

export const LESSON_T15_WHAT: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t15-what-audio.mp3",
  shortTitle: "Жиын деген не",
  matchSection: /жиын дегеніміз/i,
  scenes: [
    { duration: 8630, node: <BadgeTitle topicNum="№15·1" title="Жиын деген не?" subtitle="Бір қасиетпен біріктірілген" color="violet" /> },
    { duration: 10380, node: <BigText text="Жиын = A, B, C..." sub="Бас әріппен" /> },
    { duration: 11820, node: <BigText text="Элементтер { ... } ішінде" /> },
    { duration: 10620, node: <BigText text="∅ — бос жиын" sub="Ешбір элементі жоқ" /> },
    { duration: 9900, node: <BigText text="⊂ — ішкі жиын" /> },
  ],
});

export const LESSON_T15_OPS: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t15-ops-audio.mp3",
  shortTitle: "Жиындар амалдары",
  matchSection: /жиындар амалдары/i,
  scenes: [
    { duration: 7000, node: <BadgeTitle topicNum="№15·2" title="3 амал" subtitle="∪ ∩ −" color="violet" /> },
    { duration: 13430, node: <BigText text="∪ Бірігу" sub="Екі жиынды бір жинау" /> },
    { duration: 9280, node: <BigText text="∩ Қиылысу" sub="Тек ортақ элементтер" /> },
    { duration: 11180, node: <BigText text="A − B" sub="Тек A-да, B-да жоқ" /> },
  ],
});

export const LESSON_T15_VENN: LessonConfig = makeSection({
  audioSrc: "/lessons/lesson-t15-venn-audio.mp3",
  shortTitle: "Венн диаграммасы",
  matchSection: /венн диаграмма/i,
  scenes: [
    { duration: 8660, node: <BadgeTitle topicNum="№15·3" title="Венн диаграммасы" subtitle="Жиындарды суретпен" color="violet" /> },
    { duration: 10020, node: <BigText text="Әр жиын = дөңгелек" /> },
    { duration: 8420, node: <BigText text="Көзбен шешу — оңай" /> },
    { duration: 11010, node: <BigText text="|A ∪ B| = |A| + |B| − |A ∩ B|" /> },
    { duration: 9660, node: <CTA text="Кіші класта жиі" color="violet" /> },
  ],
});

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
  "lesson-t03-intro": LESSON_T03_INTRO,
  "lesson-t04-intro": LESSON_T04_INTRO,
  "lesson-t05-intro": LESSON_T05_INTRO,
  "lesson-t06-intro": LESSON_T06_INTRO,
  "lesson-t07-intro": LESSON_T07_INTRO,
  "lesson-t08-intro": LESSON_T08_INTRO,
  "lesson-t09-intro": LESSON_T09_INTRO,
  "lesson-t10-intro": LESSON_T10_INTRO,
  "lesson-t11-intro": LESSON_T11_INTRO,
  "lesson-t12-intro": LESSON_T12_INTRO,
  "lesson-t13-intro": LESSON_T13_INTRO,
  "lesson-t14-intro": LESSON_T14_INTRO,
  "lesson-t15-intro": LESSON_T15_INTRO,
  // Topic 3 sections
  "lesson-t03-divisibility": LESSON_T03_DIVISIBILITY,
  "lesson-t03-prime": LESSON_T03_PRIME,
  "lesson-t03-factor": LESSON_T03_FACTOR,
  "lesson-t03-gcd-lcm": LESSON_T03_GCD_LCM,
  // Topic 4 sections
  "lesson-t04-what": LESSON_T04_WHAT,
  "lesson-t04-types": LESSON_T04_TYPES,
  "lesson-t04-reduce": LESSON_T04_REDUCE,
  "lesson-t04-addsubtract": LESSON_T04_ADDSUBTRACT,
  "lesson-t04-multdiv": LESSON_T04_MULTDIV,
  // Topic 5 sections
  "lesson-t05-what": LESSON_T05_WHAT,
  "lesson-t05-digits": LESSON_T05_DIGITS,
  "lesson-t05-addsubtract": LESSON_T05_ADDSUBTRACT,
  "lesson-t05-multdiv": LESSON_T05_MULTDIV,
  "lesson-t05-convert": LESSON_T05_CONVERT,
  // Topic 6 sections
  "lesson-t06-what": LESSON_T06_WHAT,
  "lesson-t06-find": LESSON_T06_FIND,
  "lesson-t06-inverse": LESSON_T06_INVERSE,
  "lesson-t06-change": LESSON_T06_CHANGE,
  // Topic 7 sections
  "lesson-t07-ratio": LESSON_T07_RATIO,
  "lesson-t07-what": LESSON_T07_WHAT,
  "lesson-t07-unknown": LESSON_T07_UNKNOWN,
  "lesson-t07-types": LESSON_T07_TYPES,
  // Topic 8 sections
  "lesson-t08-set": LESSON_T08_SET,
  "lesson-t08-compare": LESSON_T08_COMPARE,
  "lesson-t08-addsubtract": LESSON_T08_ADDSUBTRACT,
  "lesson-t08-multdiv": LESSON_T08_MULTDIV,
  // Topic 9 sections
  "lesson-t09-what": LESSON_T09_WHAT,
  "lesson-t09-simple": LESSON_T09_SIMPLE,
  "lesson-t09-complex": LESSON_T09_COMPLEX,
  "lesson-t09-word": LESSON_T09_WORD,
  // Topic 10
  "lesson-t10-numeric": LESSON_T10_NUMERIC,
  "lesson-t10-similar": LESSON_T10_SIMILAR,
  "lesson-t10-brackets": LESSON_T10_BRACKETS,
  "lesson-t10-formulas": LESSON_T10_FORMULAS,
  // Topic 11
  "lesson-t11-perimeter": LESSON_T11_PERIMETER,
  "lesson-t11-area": LESSON_T11_AREA,
  "lesson-t11-angles": LESSON_T11_ANGLES,
  // Topic 12
  "lesson-t12-plane": LESSON_T12_PLANE,
  "lesson-t12-quadrants": LESSON_T12_QUADRANTS,
  "lesson-t12-distance": LESSON_T12_DISTANCE,
  // Topic 13
  "lesson-t13-axis": LESSON_T13_AXIS,
  "lesson-t13-other": LESSON_T13_OTHER,
  "lesson-t13-shapes": LESSON_T13_SHAPES,
  // Topic 14
  "lesson-t14-motion": LESSON_T14_MOTION,
  "lesson-t14-work": LESSON_T14_WORK,
  "lesson-t14-algorithm": LESSON_T14_ALGORITHM,
  // Topic 15
  "lesson-t15-what": LESSON_T15_WHAT,
  "lesson-t15-ops": LESSON_T15_OPS,
  "lesson-t15-venn": LESSON_T15_VENN,
};
