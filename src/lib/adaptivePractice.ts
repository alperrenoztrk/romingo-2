import type { ExerciseType } from "@/data/lessons";

const ADAPTIVE_PRACTICE_KEY = "romingo.adaptivePractice.v1";

interface PracticeStats {
  byType: Partial<Record<ExerciseType, number>>;
  byLesson: Record<string, number>;
}

const TRACKED_TYPES: ExerciseType[] = [
  "multiple_choice",
  "fill_blank",
  "translation",
  "matching",
  "listening",
  "listen_and_repeat",
  "sentence_builder",
];

function readStats(): PracticeStats {
  if (typeof window === "undefined") {
    return { byType: {}, byLesson: {} };
  }

  try {
    const raw = localStorage.getItem(ADAPTIVE_PRACTICE_KEY);
    if (!raw) return { byType: {}, byLesson: {} };
    const parsed = JSON.parse(raw) as PracticeStats;
    return {
      byType: parsed.byType ?? {},
      byLesson: parsed.byLesson ?? {},
    };
  } catch {
    return { byType: {}, byLesson: {} };
  }
}

function saveStats(stats: PracticeStats) {
  if (typeof window === "undefined") return;

  localStorage.setItem(ADAPTIVE_PRACTICE_KEY, JSON.stringify(stats));
}

export function recordAdaptiveAnswer(params: { lessonId: string; type: ExerciseType; correct: boolean }) {
  const stats = readStats();
  const impact = params.correct ? -1 : 2;

  const typeValue = (stats.byType[params.type] ?? 0) + impact;
  stats.byType[params.type] = Math.max(0, typeValue);

  const lessonValue = (stats.byLesson[params.lessonId] ?? 0) + impact;
  stats.byLesson[params.lessonId] = Math.max(0, lessonValue);

  saveStats(stats);
}

export function getAdaptivePracticePlan() {
  const stats = readStats();

  const weakTypes = TRACKED_TYPES
    .map((type) => ({ type, score: stats.byType[type] ?? 0 }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  const weakLessons = Object.entries(stats.byLesson)
    .map(([lessonId, score]) => ({ lessonId, score }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  return {
    weakTypes,
    weakLessons,
  };
}

export function getExerciseTypeLabel(type: ExerciseType) {
  if (type === "multiple_choice") return "Çoktan Seçmeli";
  if (type === "fill_blank") return "Boşluk Doldurma";
  if (type === "translation") return "Çeviri";
  if (type === "matching") return "Eşleştirme";
  if (type === "listening") return "Dinleme";
  if (type === "listen_and_repeat") return "Dinleyip Sesli Okuma";
  return "Cümle Kurma";
}
