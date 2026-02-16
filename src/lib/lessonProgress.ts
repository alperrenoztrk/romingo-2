const LESSON_PROGRESS_KEY = "romingo.lessonProgress.v1";
const MIN_STARS_TO_UNLOCK_NEXT_LESSON = 2;

export interface LessonProgressEntry {
  stars: number;
  completedAt: string;
}

export type LessonProgressMap = Record<string, LessonProgressEntry>;

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

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
  const previousLessonStars = progress[previousLessonId]?.stars ?? 0;
  return previousLessonStars >= MIN_STARS_TO_UNLOCK_NEXT_LESSON;
}

export function getCompletedLessonsCountForDate(date = new Date()) {
  const targetDateKey = toDateKey(date);
  const progress = getLessonProgress();

  return Object.values(progress).filter((entry) => {
    if (!entry?.completedAt) {
      return false;
    }

    const completedAt = new Date(entry.completedAt);
    if (Number.isNaN(completedAt.getTime())) {
      return false;
    }

    return toDateKey(completedAt) === targetDateKey;
  }).length;
}
