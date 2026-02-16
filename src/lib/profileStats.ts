export const PROFILE_STATS_KEY = "romingo.profileStats.v1";
const PROFILE_STATS_UPDATED_EVENT = "romingo:profile-stats-updated";

const MAX_HEARTS = 5;
const DEFAULT_PROFILE_STATS = {
  streak: 12,
  xp: 1450,
  hearts: 5,
  lastLessonDate: "",
};

export interface ProfileStats {
  streak: number;
  xp: number;
  hearts: number;
  lastLessonDate: string;
}

function isLocalStorageAvailable() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function clampNumber(value: unknown, fallback: number, min = 0) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallback;
  }

  return Math.max(min, Math.floor(value));
}

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getPreviousDateKey(baseDate: Date) {
  const previousDate = new Date(baseDate);
  previousDate.setDate(previousDate.getDate() - 1);
  return toDateKey(previousDate);
}

export function getProfileStats(): ProfileStats {
  if (!isLocalStorageAvailable()) {
    return DEFAULT_PROFILE_STATS;
  }

  const raw = window.localStorage.getItem(PROFILE_STATS_KEY);
  if (!raw) {
    return DEFAULT_PROFILE_STATS;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<ProfileStats>;
    return {
      streak: clampNumber(parsed.streak, DEFAULT_PROFILE_STATS.streak),
      xp: clampNumber(parsed.xp, DEFAULT_PROFILE_STATS.xp),
      hearts: Math.min(clampNumber(parsed.hearts, DEFAULT_PROFILE_STATS.hearts), MAX_HEARTS),
      lastLessonDate: typeof parsed.lastLessonDate === "string" ? parsed.lastLessonDate : "",
    };
  } catch {
    return DEFAULT_PROFILE_STATS;
  }
}

function saveProfileStats(stats: ProfileStats) {
  if (!isLocalStorageAvailable()) {
    return;
  }

  window.localStorage.setItem(PROFILE_STATS_KEY, JSON.stringify(stats));
  window.dispatchEvent(new Event(PROFILE_STATS_UPDATED_EVENT));
}

export function updateProfileStats(updater: (current: ProfileStats) => ProfileStats) {
  const nextStats = updater(getProfileStats());
  saveProfileStats(nextStats);
}

export function applyLessonCompletion({ xpEarned, heartsRemaining }: { xpEarned: number; heartsRemaining: number }) {
  updateProfileStats((current) => {
    const todayKey = toDateKey(new Date());
    const yesterdayKey = getPreviousDateKey(new Date());
    const isNewActiveDay = current.lastLessonDate !== todayKey;

    let nextStreak = current.streak;
    if (isNewActiveDay) {
      if (current.lastLessonDate === yesterdayKey) {
        nextStreak += 1;
      } else {
        nextStreak = 1;
      }
    }

    return {
      ...current,
      xp: current.xp + Math.max(0, xpEarned),
      hearts: Math.min(MAX_HEARTS, Math.max(0, Math.floor(heartsRemaining))),
      streak: nextStreak,
      lastLessonDate: todayKey,
    };
  });
}

export function subscribeProfileStats(listener: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener("storage", listener);
  window.addEventListener(PROFILE_STATS_UPDATED_EVENT, listener);

  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(PROFILE_STATS_UPDATED_EVENT, listener);
  };
}
