const LESSON_PROGRESS_KEY = "romingo.lessonProgress.v1";

export interface LessonProgressEntry {
  stars: number;
  completedAt: string;
}

export type LessonProgressMap = Record<string, LessonProgressEntry>;

function isLocalStorageAvailable() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getLessonProgress(): LessonProgressMap {
  if (!isLocalStorageAvailable()) {
    return {};
  }

  const raw = window.localStorage.getItem(LESSON_PROGRESS_KEY);
  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw) as LessonProgressMap;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function saveLessonCompletion(lessonId: string, stars: number) {
  if (!isLocalStorageAvailable()) {
    return;
  }

  const progress = getLessonProgress();
  const previousStars = progress[lessonId]?.stars ?? 0;

  progress[lessonId] = {
    stars: Math.max(previousStars, stars),
    completedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(LESSON_PROGRESS_KEY, JSON.stringify(progress));
}

export function isLessonUnlocked(lessonId: string, orderedLessonIds: string[], progress: LessonProgressMap) {
  const lessonIndex = orderedLessonIds.indexOf(lessonId);
  if (lessonIndex === 0) {
    return true;
  }

  if (lessonIndex < 0) {
    return false;
  }

  const previousLessonId = orderedLessonIds[lessonIndex - 1];
  return Boolean(progress[previousLessonId]);
}
