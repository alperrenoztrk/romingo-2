const HEART_STATE_KEY = "romingo.learningEconomy.hearts.v1";
const STREAK_STATE_KEY = "romingo.learningEconomy.streak.v1";
const ECONOMY_UPDATED_EVENT = "romingo:learning-economy-updated";

export const MAX_HEARTS = 10;
const HEART_REGEN_INTERVAL_MINUTES = 30;

interface HeartState {
  hearts: number;
  lastUpdatedAt: number;
}

interface StreakState {
  streakCount: number;
  lastActiveDate: string;
  shieldCount: number;
}

function emitEconomyUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(ECONOMY_UPDATED_EVENT));
  }
}

function getDefaultHeartState(): HeartState {
  return {
    hearts: MAX_HEARTS,
    lastUpdatedAt: Date.now(),
  };
}

function getDefaultStreakState(): StreakState {
  return {
    streakCount: 12,
    lastActiveDate: new Date(Date.now()).toISOString().slice(0, 10),
    shieldCount: 0,
  };
}

function readHeartState(): HeartState {
  if (typeof window === "undefined") {
    return getDefaultHeartState();
  }

  try {
    const raw = localStorage.getItem(HEART_STATE_KEY);
    if (!raw) return getDefaultHeartState();

    const parsed = JSON.parse(raw) as Partial<HeartState>;
    if (typeof parsed.hearts !== "number" || typeof parsed.lastUpdatedAt !== "number") {
      return getDefaultHeartState();
    }

    return {
      hearts: Math.max(0, Math.floor(parsed.hearts)),
      lastUpdatedAt: parsed.lastUpdatedAt,
    };
  } catch {
    return getDefaultHeartState();
  }
}

function saveHeartState(state: HeartState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(HEART_STATE_KEY, JSON.stringify(state));
  emitEconomyUpdated();
}

function readStreakState(): StreakState {
  if (typeof window === "undefined") {
    return getDefaultStreakState();
  }

  try {
    const raw = localStorage.getItem(STREAK_STATE_KEY);
    if (!raw) return getDefaultStreakState();

    const parsed = JSON.parse(raw) as Partial<StreakState>;
    if (
      typeof parsed.streakCount !== "number" ||
      typeof parsed.lastActiveDate !== "string" ||
      typeof parsed.shieldCount !== "number"
    ) {
      return getDefaultStreakState();
    }

    return {
      streakCount: Math.max(1, Math.floor(parsed.streakCount)),
      lastActiveDate: parsed.lastActiveDate,
      shieldCount: Math.max(0, Math.floor(parsed.shieldCount)),
    };
  } catch {
    return getDefaultStreakState();
  }
}

function saveStreakState(state: StreakState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STREAK_STATE_KEY, JSON.stringify(state));
  emitEconomyUpdated();
}

function diffDays(fromIsoDate: string, toIsoDate: string) {
  const from = new Date(`${fromIsoDate}T00:00:00.000Z`);
  const to = new Date(`${toIsoDate}T00:00:00.000Z`);
  return Math.floor((to.getTime() - from.getTime()) / (24 * 60 * 60 * 1000));
}

function getTodayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

export function syncHearts() {
  const current = readHeartState();
  if (current.hearts >= MAX_HEARTS) {
    return current;
  }

  const elapsedMs = Date.now() - current.lastUpdatedAt;
  const intervalMs = HEART_REGEN_INTERVAL_MINUTES * 60 * 1000;
  const regenerated = Math.floor(elapsedMs / intervalMs);

  if (regenerated <= 0) {
    return current;
  }

  // Regen only up to MAX_HEARTS; hearts above MAX stay untouched
  const nextHearts = Math.min(MAX_HEARTS, current.hearts + regenerated);
  const remainderMs = elapsedMs % intervalMs;
  const nextState: HeartState = {
    hearts: nextHearts,
    lastUpdatedAt: Date.now() - remainderMs,
  };

  saveHeartState(nextState);
  return nextState;
}

export function consumeHeart() {
  const current = syncHearts();
  const wasAtOrAboveMax = current.hearts >= MAX_HEARTS;
  const nextHearts = Math.max(0, current.hearts - 1);
  const nextState: HeartState = {
    hearts: nextHearts,
    lastUpdatedAt: wasAtOrAboveMax && nextHearts < MAX_HEARTS ? Date.now() : current.lastUpdatedAt,
  };

  saveHeartState(nextState);
  return nextState;
}

export function refillHeartsToMax() {
  const nextState: HeartState = {
    hearts: MAX_HEARTS,
    lastUpdatedAt: Date.now(),
  };

  saveHeartState(nextState);
  return nextState;
}

export function getHeartStatus() {
  const state = syncHearts();

  if (state.hearts >= MAX_HEARTS) {
    return {
      hearts: state.hearts,
      maxHearts: MAX_HEARTS,
      minutesToNextHeart: 0,
    };
  }

  const intervalMs = HEART_REGEN_INTERVAL_MINUTES * 60 * 1000;
  const elapsed = Date.now() - state.lastUpdatedAt;
  const minutesToNextHeart = Math.max(1, Math.ceil((intervalMs - (elapsed % intervalMs)) / (60 * 1000)));

  return {
    hearts: state.hearts,
    maxHearts: MAX_HEARTS,
    minutesToNextHeart,
  };
}

export function addStreakShield(quantity = 1) {
  const current = readStreakState();
  const nextState = {
    ...current,
    shieldCount: current.shieldCount + Math.max(1, quantity),
  };
  saveStreakState(nextState);
  return nextState;
}

export function syncStreak(todayIsoDate = getTodayIsoDate()) {
  const current = readStreakState();
  const gap = diffDays(current.lastActiveDate, todayIsoDate);

  if (gap <= 0) {
    return current;
  }

  if (gap === 1) {
    const next = {
      ...current,
      lastActiveDate: todayIsoDate,
      streakCount: current.streakCount + 1,
    };
    saveStreakState(next);
    return next;
  }

  if (current.shieldCount > 0) {
    const next = {
      ...current,
      lastActiveDate: todayIsoDate,
      shieldCount: current.shieldCount - 1,
      streakCount: current.streakCount + 1,
    };
    saveStreakState(next);
    return next;
  }

  const reset = {
    ...current,
    lastActiveDate: todayIsoDate,
    streakCount: 1,
  };
  saveStreakState(reset);
  return reset;
}

export function markLessonActivity() {
  return syncStreak();
}

export function getEconomySnapshot() {
  const heart = getHeartStatus();
  const streak = syncStreak();

  return {
    hearts: heart.hearts,
    maxHearts: heart.maxHearts,
    minutesToNextHeart: heart.minutesToNextHeart,
    streakCount: streak.streakCount,
    shieldCount: streak.shieldCount,
  };
}

export const learningEconomyUpdatedEvent = ECONOMY_UPDATED_EVENT;
