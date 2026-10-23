import type { Metadata } from "next";
import { MOCK_EXAM_DURATION_SEC, MOCK_EXAM_SIZE } from "@/lib/mock-exam";

export const metadata: Metadata = {
  title: "Пробный емтихан НИШ/БИЛ",
  description: `Нақты емтихан форматы: ${MOCK_EXAM_SIZE} сұрақ, ${MOCK_EXAM_DURATION_SEC / 60} минут, барлық тақырыптан микс. Нәтиже бойынша әлсіз тақырыптар мен келесі қадам.`,
};

export default function MockExamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
