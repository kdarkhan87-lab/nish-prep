"use client";

import { useEffect, useRef, useState } from "react";

type Scene = {
  duration: number;
  render: () => React.ReactNode;
};

const SCENES: Scene[] = [
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
        <p className="text-slate-400 text-lg md:text-xl mt-2">
          Математика · 5-6 сынып
        </p>
      </div>
    ),
  },
  {
    duration: 8000,
    render: () => (
      <div className="flex flex-col items-center gap-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold">Натурал сан дегеніміз не?</h2>
        <p className="text-slate-400 text-lg md:text-xl">
          Заттарды санауға арналған сандар
        </p>
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
            <span className="text-lg md:text-2xl font-semibold">
              Нөл натурал сан <b>емес</b>
            </span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white/5 border-l-4 border-emerald-500 rounded-lg animate-slide-in" style={{ animationDelay: "4s" }}>
            <span className="text-3xl">✅</span>
            <span className="text-lg md:text-2xl font-semibold">
              Ең кіші натурал сан — <b>1</b>
            </span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white/5 border-l-4 border-amber-500 rounded-lg animate-slide-in" style={{ animationDelay: "8s" }}>
            <span className="text-3xl">♾</span>
            <span className="text-lg md:text-2xl font-semibold">
              Ең үлкені <b>жоқ</b> — шексіз
            </span>
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
            <div
              key={op.label}
              className="p-5 bg-white/5 border border-white/10 rounded-xl opacity-0 animate-fade-up"
              style={{ animationDelay: op.delay }}
            >
              <div className="font-sans text-xs text-slate-400 uppercase tracking-[0.2em] mb-2">
                {op.label}
              </div>
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
        <p className="text-slate-400 text-base md:text-lg mt-2">
          Сондықтан жақсы меңгеру өте маңызды!
        </p>
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
];

const TOTAL_DURATION = SCENES.reduce((sum, s) => sum + s.duration, 0);

export function LessonVideo({ audioSrc }: { audioSrc: string }) {
  const [started, setStarted] = useState(false);
  const [sceneIdx, setSceneIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const start = () => {
    setStarted(true);
    startTimeRef.current = Date.now();
    audioRef.current?.play().catch(() => {});
    tick();
  };

  const tick = () => {
    const elapsed = Date.now() - startTimeRef.current;
    setProgress(Math.min(elapsed / TOTAL_DURATION, 1));

    let acc = 0;
    let idx = 0;
    for (let i = 0; i < SCENES.length; i++) {
      acc += SCENES[i].duration;
      if (elapsed < acc) {
        idx = i;
        break;
      }
      idx = i;
    }
    setSceneIdx(idx);

    if (elapsed < TOTAL_DURATION) {
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const restart = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setStarted(false);
    setSceneIdx(0);
    setProgress(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <>
      <style jsx global>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in {
          opacity: 0;
          animation: slide-in 0.6s ease forwards;
        }
        .animate-fade-up {
          animation: fade-up 0.5s ease forwards;
        }
        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }
      `}</style>
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white shadow-2xl mb-6">
        <audio ref={audioRef} src={audioSrc} preload="auto" />

        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="absolute top-4 right-5 text-[10px] md:text-xs font-bold tracking-[0.3em] text-white/40">
          NISH PREP
        </div>

        {started &&
          SCENES.map((scene, i) => (
            <div
              key={i}
              className={`absolute inset-0 flex items-center justify-center p-6 md:p-12 transition-all duration-700 ${
                i === sceneIdx
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4 pointer-events-none"
              }`}
            >
              {scene.render()}
            </div>
          ))}

        {!started && (
          <button
            onClick={start}
            className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-md cursor-pointer group"
          >
            <div className="text-xs md:text-sm text-slate-400 tracking-[0.3em] mb-4">
              САБАҚ №1 · НАТУРАЛ САНДАР
            </div>
            <div className="px-10 py-5 md:px-16 md:py-6 rounded-full bg-gradient-to-r from-sky-400 to-amber-400 text-slate-900 font-black text-xl md:text-3xl shadow-[0_20px_60px_rgba(99,179,237,0.4)] tracking-[0.1em] group-hover:scale-105 transition-transform">
              ▶ БАСТАУ
            </div>
            <div className="text-xs text-slate-500 mt-4">Ұзақтығы: 1 минут</div>
          </button>
        )}

        <div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-sky-400 to-amber-400 transition-[width] duration-100"
          style={{ width: `${progress * 100}%` }}
        />

        {started && progress >= 1 && (
          <button
            onClick={restart}
            className="absolute bottom-3 right-3 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-md text-xs backdrop-blur"
          >
            ↻ Қайтадан
          </button>
        )}
      </div>
    </>
  );
}
