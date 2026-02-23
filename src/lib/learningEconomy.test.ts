import { beforeEach, describe, expect, it } from "vitest";
import { getEconomySnapshot } from "./learningEconomy";

const STREAK_STATE_KEY = "romingo.learningEconomy.streak.v1";

function isoDateWithOffset(daysOffset: number) {
  const date = new Date(Date.now() + daysOffset * 24 * 60 * 60 * 1000);
  return date.toISOString().slice(0, 10);
}

describe("learning economy live snapshot", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("syncs streak forward when opening the app on a new day", () => {
    localStorage.setItem(
      STREAK_STATE_KEY,
      JSON.stringify({
        streakCount: 8,
        lastActiveDate: isoDateWithOffset(-1),
        shieldCount: 0,
      }),
    );

    const snapshot = getEconomySnapshot();

    expect(snapshot.streakCount).toBe(9);

    const saved = JSON.parse(localStorage.getItem(STREAK_STATE_KEY) ?? "{}");
    expect(saved.streakCount).toBe(9);
    expect(saved.lastActiveDate).toBe(isoDateWithOffset(0));
  });

  it("starts streak from zero when there is no saved streak state", () => {
    const snapshot = getEconomySnapshot();

    expect(snapshot.streakCount).toBe(0);
  });

  it("resets streak when multiple days are missed and no shield exists", () => {
    localStorage.setItem(
      STREAK_STATE_KEY,
      JSON.stringify({
        streakCount: 14,
        lastActiveDate: isoDateWithOffset(-3),
        shieldCount: 0,
      }),
    );

    const snapshot = getEconomySnapshot();

    expect(snapshot.streakCount).toBe(1);

    const saved = JSON.parse(localStorage.getItem(STREAK_STATE_KEY) ?? "{}");
    expect(saved.streakCount).toBe(1);
    expect(saved.lastActiveDate).toBe(isoDateWithOffset(0));
  });
});
