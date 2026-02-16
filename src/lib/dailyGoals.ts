import { getCurrentWeekProgress } from "./weeklyProgress";

const DAILY_GOAL_TARGETS_KEY = "romingo.dailyGoalTargets.v1";
const DAILY_GOAL_SLOTS_KEY = "romingo.dailyGoalSlots.v1";
const CORRECT_ANSWERS_BY_DATE_KEY = "romingo.correctAnswersByDate.v1";

export type DailyGoalMetricKey = "lessons" | "xp" | "correctAnswers";

export interface DailyGoalTargets {
  lessons: number;
  xp: number;
  correctAnswers: number;
}

export type DailyGoalSlots = [DailyGoalMetricKey, DailyGoalMetricKey, DailyGoalMetricKey];

const DEFAULT_DAILY_GOAL_TARGETS: DailyGoalTargets = {
  lessons: 1,
  xp: 120,
  correctAnswers: 10,
};

const DEFAULT_DAILY_GOAL_SLOTS: DailyGoalSlots = ["lessons", "xp", "correctAnswers"];

type CorrectAnswersByDate = Record<string, number>;

function isLocalStorageAvailable() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function sanitizeTarget(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) && value >= 1 ? Math.floor(value) : fallback;
}

function isMetricKey(value: unknown): value is DailyGoalMetricKey {
  return value === "lessons" || value === "xp" || value === "correctAnswers";
}

export function getDailyGoalSlots(): DailyGoalSlots {
  if (!isLocalStorageAvailable()) {
    return DEFAULT_DAILY_GOAL_SLOTS;
  }

  const raw = window.localStorage.getItem(DAILY_GOAL_SLOTS_KEY);
  if (!raw) {
    return DEFAULT_DAILY_GOAL_SLOTS;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length !== 3 || !parsed.every((item) => isMetricKey(item))) {
      return DEFAULT_DAILY_GOAL_SLOTS;
    }

    return parsed as DailyGoalSlots;
  } catch {
    return DEFAULT_DAILY_GOAL_SLOTS;
  }
}

export function saveDailyGoalSlots(slots: DailyGoalSlots) {
  if (!isLocalStorageAvailable()) {
    return;
  }

  window.localStorage.setItem(DAILY_GOAL_SLOTS_KEY, JSON.stringify(slots));
  window.dispatchEvent(new Event("romingo:daily-goals-updated"));
}

export function getDailyGoalTargets(): DailyGoalTargets {
  if (!isLocalStorageAvailable()) {
    return DEFAULT_DAILY_GOAL_TARGETS;
  }

  const raw = window.localStorage.getItem(DAILY_GOAL_TARGETS_KEY);
  if (!raw) {
    return DEFAULT_DAILY_GOAL_TARGETS;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<DailyGoalTargets>;
    return {
      lessons: sanitizeTarget(parsed.lessons, DEFAULT_DAILY_GOAL_TARGETS.lessons),
      xp: sanitizeTarget(parsed.xp, DEFAULT_DAILY_GOAL_TARGETS.xp),
      correctAnswers: sanitizeTarget(parsed.correctAnswers, DEFAULT_DAILY_GOAL_TARGETS.correctAnswers),
    };
  } catch {
    return DEFAULT_DAILY_GOAL_TARGETS;
  }
}

export function saveDailyGoalTargets(targets: DailyGoalTargets) {
  if (!isLocalStorageAvailable()) {
    return;
  }

  window.localStorage.setItem(DAILY_GOAL_TARGETS_KEY, JSON.stringify(targets));
  window.dispatchEvent(new Event("romingo:daily-goals-updated"));
}

function getCorrectAnswersByDate(): CorrectAnswersByDate {
  if (!isLocalStorageAvailable()) {
    return {};
  }

  const raw = window.localStorage.getItem(CORRECT_ANSWERS_BY_DATE_KEY);
  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw) as CorrectAnswersByDate;
    return Object.fromEntries(
      Object.entries(parsed).filter(([, value]) => typeof value === "number" && Number.isFinite(value) && value >= 0),
    );
  } catch {
    return {};
  }
}

export function getTodayCorrectAnswers() {
  const byDate = getCorrectAnswersByDate();
  return byDate[toDateKey(new Date())] ?? 0;
}

export function addTodayCorrectAnswer(amount = 1) {
  if (!isLocalStorageAvailable() || amount <= 0) {
    return;
  }

  const byDate = getCorrectAnswersByDate();
  const todayKey = toDateKey(new Date());
  byDate[todayKey] = (byDate[todayKey] ?? 0) + amount;
  window.localStorage.setItem(CORRECT_ANSWERS_BY_DATE_KEY, JSON.stringify(byDate));
  window.dispatchEvent(new Event("romingo:daily-goals-updated"));
}

export function getTodayXpProgress() {
  const todayKey = toDateKey(new Date());
  const today = getCurrentWeekProgress().find((day) => day.dateKey === todayKey);
  return today?.progress ?? 0;
}
