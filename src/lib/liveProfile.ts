import { getWeeklyProgressMap } from "./weeklyProgress";

const PROFILE_XP_KEY = "romingo.profileXp.v1";
const PROFILE_HEARTS_KEY = "romingo.profileHearts.v1";
const PROFILE_HEARTS_MAX = 5;
const PROFILE_BASE_XP = 1450;

export const PROFILE_STATS_UPDATED_EVENT = "romingo:profile-stats-updated";

export interface LiveProfileStats {
  streak: number;
  xp: number;
  hearts: number;
}

function isLocalStorageAvailable() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getNumberFromStorage(key: string, fallback: number) {
  if (!isLocalStorageAvailable()) {
    return fallback;
  }

  const raw = window.localStorage.getItem(key);
  if (!raw) {
    return fallback;
  }

  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function saveNumberToStorage(key: string, value: number) {
  if (!isLocalStorageAvailable()) {
    return;
  }

  window.localStorage.setItem(key, String(value));
}

function notifyProfileStatsUpdated() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(PROFILE_STATS_UPDATED_EVENT));
}

export function getProfileXp() {
  return Math.max(0, Math.floor(getNumberFromStorage(PROFILE_XP_KEY, PROFILE_BASE_XP)));
}

export function addProfileXp(amount: number) {
  if (amount <= 0) {
    return;
  }

  const nextXp = getProfileXp() + Math.floor(amount);
  saveNumberToStorage(PROFILE_XP_KEY, nextXp);
  notifyProfileStatsUpdated();
}

export function getProfileHearts() {
  const hearts = Math.floor(getNumberFromStorage(PROFILE_HEARTS_KEY, PROFILE_HEARTS_MAX));
  return Math.max(0, Math.min(PROFILE_HEARTS_MAX, hearts));
}

export function setProfileHearts(hearts: number) {
  const clamped = Math.max(0, Math.min(PROFILE_HEARTS_MAX, Math.floor(hearts)));
  saveNumberToStorage(PROFILE_HEARTS_KEY, clamped);
  notifyProfileStatsUpdated();
}

export function spendProfileHeart(amount = 1) {
  if (amount <= 0) {
    return;
  }

  setProfileHearts(getProfileHearts() - amount);
}

function getProfileStreak() {
  const progressMap = getWeeklyProgressMap();
  const activeDayKeys = Object.entries(progressMap)
    .filter(([, xp]) => xp > 0)
    .map(([dateKey]) => dateKey)
    .sort();

  if (activeDayKeys.length === 0) {
    return 0;
  }

  const today = new Date();
  const todayKey = toDateKey(today);
  const latestKey = activeDayKeys[activeDayKeys.length - 1];
  const latestDate = new Date(`${latestKey}T00:00:00`);
  const diffInDays = Math.round((new Date(`${todayKey}T00:00:00`).getTime() - latestDate.getTime()) / 86400000);

  if (diffInDays > 1) {
    return 0;
  }

  let streak = 1;
  for (let index = activeDayKeys.length - 1; index > 0; index -= 1) {
    const current = new Date(`${activeDayKeys[index]}T00:00:00`);
    const previous = new Date(`${activeDayKeys[index - 1]}T00:00:00`);
    const dayDiff = Math.round((current.getTime() - previous.getTime()) / 86400000);

    if (dayDiff === 1) {
      streak += 1;
    } else {
      break;
    }
  }

  return streak;
}

export function getLiveProfileStats(): LiveProfileStats {
  return {
    streak: getProfileStreak(),
    xp: getProfileXp(),
    hearts: getProfileHearts(),
  };
}
