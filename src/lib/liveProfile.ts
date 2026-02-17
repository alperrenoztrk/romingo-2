import { getEconomySnapshot, learningEconomyUpdatedEvent } from "./learningEconomy";

const TOTAL_XP_KEY = "romingo.profile.totalXp.v1";
const PROFILE_UPDATED_EVENT = "romingo:profile-updated";
const DEFAULT_TOTAL_XP = 1450;

function emitProfileUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(PROFILE_UPDATED_EVENT));
  }
}

function isStorageReady() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getTotalXp() {
  if (!isStorageReady()) {
    return DEFAULT_TOTAL_XP;
  }

  const raw = window.localStorage.getItem(TOTAL_XP_KEY);
  if (!raw) {
    return DEFAULT_TOTAL_XP;
  }

  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : DEFAULT_TOTAL_XP;
}

export function addXpToProfile(amount: number) {
  if (!isStorageReady() || amount <= 0) {
    return getTotalXp();
  }

  const nextTotalXp = getTotalXp() + Math.floor(amount);
  window.localStorage.setItem(TOTAL_XP_KEY, String(nextTotalXp));
  emitProfileUpdated();
  return nextTotalXp;
}

export function getLiveProfileStats() {
  const economy = getEconomySnapshot();

  return {
    streak: economy.streakCount,
    hearts: economy.hearts,
    xp: getTotalXp(),
  };
}

export const profileUpdatedEvent = PROFILE_UPDATED_EVENT;
export const liveProfileEvents = [learningEconomyUpdatedEvent, PROFILE_UPDATED_EVENT] as const;
