const WEEKLY_PROGRESS_KEY = "romingo.weeklyProgressByDate";

export type WeeklyProgressMap = Record<string, number>;

const getISODateKey = (date: Date) => date.toISOString().slice(0, 10);

export function getWeeklyProgressMap(): WeeklyProgressMap {
  const raw = localStorage.getItem(WEEKLY_PROGRESS_KEY);
  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw) as WeeklyProgressMap;
    return Object.fromEntries(
      Object.entries(parsed).filter(([, value]) => Number.isFinite(value) && value >= 0),
    );
  } catch {
    return {};
  }
}

export function addTodayProgress(amount: number) {
  if (amount <= 0) return;

  const progressMap = getWeeklyProgressMap();
  const todayKey = getISODateKey(new Date());
  const current = progressMap[todayKey] ?? 0;
  progressMap[todayKey] = current + amount;

  localStorage.setItem(WEEKLY_PROGRESS_KEY, JSON.stringify(progressMap));
}

export function getCurrentWeekProgress(): { day: string; dateKey: string; progress: number }[] {
  const progressMap = getWeeklyProgressMap();
  const today = new Date();
  const monday = new Date(today);
  const mondayOffset = (today.getDay() + 6) % 7;
  monday.setDate(today.getDate() - mondayOffset);

  return ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((day, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    const dateKey = getISODateKey(date);

    return {
      day,
      dateKey,
      progress: progressMap[dateKey] ?? 0,
    };
  });
}

export function getRecentWeeksProgress(weekCount = 4): { weekLabel: string; totalProgress: number }[] {
  const progressMap = getWeeklyProgressMap();
  const today = new Date();
  const currentWeekMonday = new Date(today);
  const mondayOffset = (today.getDay() + 6) % 7;
  currentWeekMonday.setDate(today.getDate() - mondayOffset);

  return Array.from({ length: weekCount }, (_, weekOffset) => {
    const weekStart = new Date(currentWeekMonday);
    weekStart.setDate(currentWeekMonday.getDate() - weekOffset * 7);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const totalProgress = Array.from({ length: 7 }, (_, dayOffset) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + dayOffset);
      const dateKey = getISODateKey(date);
      return progressMap[dateKey] ?? 0;
    }).reduce((total, value) => total + value, 0);

    const weekLabel = `${weekStart.getDate()}-${weekEnd.getDate()} ${weekStart.toLocaleDateString("tr-TR", {
      month: "short",
    })}`;

    return { weekLabel, totalProgress };
  });
}
