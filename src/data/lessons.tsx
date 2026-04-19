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
