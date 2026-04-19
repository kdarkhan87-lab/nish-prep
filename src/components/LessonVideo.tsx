"use client";

import { useEffect, useRef, useState } from "react";
import type { Scene } from "@/data/lessons";

export function LessonVideo({
  audioSrc,
  scenes,
  title = "САБАҚ",
  durationLabel = "Ұзақтығы: 1 минут",
}: {
  audioSrc: string;
  scenes: Scene[];
  title?: string;
  durationLabel?: string;
}) {
  const totalDuration = scenes.reduce((sum, s) => sum + s.duration, 0);

  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [sceneIdx, setSceneIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);

  const tick = () => {
    const elapsed = Date.now() - startTimeRef.current;
    elapsedRef.current = elapsed;
    setProgress(Math.min(elapsed / totalDuration, 1));

    let acc = 0;
    let idx = 0;
    for (let i = 0; i < scenes.length; i++) {
      acc += scenes[i].duration;
      if (elapsed < acc) {
        idx = i;
        break;
      }
      idx = i;
    }
    setSceneIdx(idx);

    if (elapsed < totalDuration) {
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  const start = () => {
    setStarted(true);
    setPaused(false);
    startTimeRef.current = Date.now();
    elapsedRef.current = 0;
    audioRef.current?.play().catch(() => {});
    tick();
  };

  const togglePause = () => {
    if (paused) {
      startTimeRef.current = Date.now() - elapsedRef.current;
      audioRef.current?.play().catch(() => {});
      tick();
      setPaused(false);
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      audioRef.current?.pause();
      setPaused(true);
    }
  };

  const stop = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setStarted(false);
    setPaused(false);
    setSceneIdx(0);
    setProgress(0);
    elapsedRef.current = 0;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const restart = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (audioRef.current) audioRef.current.currentTime = 0;
    start();
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

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
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white shadow-2xl my-6">
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
          scenes.map((scene, i) => (
            <div
              key={i}
              className={`absolute inset-0 flex items-center justify-center p-6 md:p-12 transition-all duration-700 ${
                i === sceneIdx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
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
            <div className="text-xs md:text-sm text-slate-400 tracking-[0.3em] mb-4">{title}</div>
            <div className="px-10 py-5 md:px-16 md:py-6 rounded-full bg-gradient-to-r from-sky-400 to-amber-400 text-slate-900 font-black text-xl md:text-3xl shadow-[0_20px_60px_rgba(99,179,237,0.4)] tracking-[0.1em] group-hover:scale-105 transition-transform">
              ▶ БАСТАУ
            </div>
            <div className="text-xs text-slate-500 mt-4">{durationLabel}</div>
          </button>
        )}

        {started && (
          <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/70 to-transparent flex items-center gap-2 md:gap-3">
            <button
              onClick={togglePause}
              className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur transition"
              title={paused ? "Жалғастыру" : "Пауза"}
            >
              {paused ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
              )}
            </button>
            <button
              onClick={stop}
              className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur transition"
              title="Тоқтату"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z" /></svg>
            </button>
            <button
              onClick={restart}
              className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur transition"
              title="Басынан"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>
            <div className="flex-1 h-1.5 bg-white/15 rounded-full overflow-hidden mx-2">
              <div
                className="h-full bg-gradient-to-r from-sky-400 to-amber-400 transition-[width] duration-100"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <div className="text-xs font-mono text-white/70 tabular-nums">
              {Math.floor(elapsedRef.current / 1000)}s / {Math.floor(totalDuration / 1000)}s
            </div>
          </div>
        )}
      </div>
    </>
  );
}
