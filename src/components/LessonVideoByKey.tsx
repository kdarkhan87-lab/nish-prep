"use client";

import { LessonVideo } from "@/components/LessonVideo";
import { LESSONS_BY_KEY, type LessonKey } from "@/data/lessons";

export function LessonVideoByKey({ lessonKey }: { lessonKey: LessonKey }) {
  const lesson = LESSONS_BY_KEY[lessonKey];
  if (!lesson) return null;
  return (
    <LessonVideo
      audioSrc={lesson.audioSrc}
      scenes={lesson.scenes}
      title={lesson.title}
      durationLabel={lesson.durationLabel}
    />
  );
}
