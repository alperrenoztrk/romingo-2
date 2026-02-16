import { lessonCatalog } from "@/data/lessonCatalog";
import { getLessonProgress } from "@/lib/lessonProgress";
import { getCurrentWeekProgress, getWeeklyProgressMap } from "@/lib/weeklyProgress";

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getBestStreak(dateKeys: string[]) {
  if (dateKeys.length === 0) {
    return 0;
  }

  const sortedDays = [...new Set(dateKeys)].sort();
  let best = 1;
  let current = 1;

  for (let i = 1; i < sortedDays.length; i += 1) {
    const previous = new Date(`${sortedDays[i - 1]}T00:00:00`);
    const currentDate = new Date(`${sortedDays[i]}T00:00:00`);
    const diff = Math.round((currentDate.getTime() - previous.getTime()) / (1000 * 60 * 60 * 24));

    if (diff === 1) {
      current += 1;
      best = Math.max(best, current);
    } else {
      current = 1;
    }
  }

  return best;
}

export function getProfileProgressStory() {
  const lessonProgress = getLessonProgress();
  const completedLessons = Object.keys(lessonProgress).length;
  const starsEarned = Object.values(lessonProgress).reduce((sum, lesson) => sum + Math.max(0, lesson.stars ?? 0), 0);
  const completionDateKeys = Object.values(lessonProgress)
    .map((lesson) => {
      const date = new Date(lesson.completedAt);
      return Number.isNaN(date.getTime()) ? null : toDateKey(date);
    })
    .filter((value): value is string => Boolean(value));

  const units = Array.from(new Set(lessonCatalog.map((lesson) => lesson.level))).map((level) => {
    const unitLessons = lessonCatalog.filter((lesson) => lesson.level === level);
    const unitCompletedCount = unitLessons.filter((lesson) => lessonProgress[lesson.id]).length;

    return {
      level,
      total: unitLessons.length,
      completed: unitCompletedCount,
      done: unitCompletedCount === unitLessons.length,
    };
  });

  const completedUnits = units.filter((unit) => unit.done).length;
  const bestStreak = getBestStreak(completionDateKeys);
  const thisWeekXp = getCurrentWeekProgress().reduce((sum, day) => sum + day.progress, 0);

  const xpSeries = Array.from({ length: 7 }).map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const key = toDateKey(date);
    return {
      dateKey: key,
      xp: getWeeklyProgressMap()[key] ?? 0,
    };
  });

  return {
    completedLessons,
    starsEarned,
    completedUnits,
    bestStreak,
    thisWeekXp,
    xpSeries,
  };
}
