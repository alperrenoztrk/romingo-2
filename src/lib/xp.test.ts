import { describe, expect, it } from "vitest";
import { getXpProgress } from "./xp";

describe("getXpProgress", () => {
  it("calculates level and in-level xp from total xp", () => {
    expect(getXpProgress(1450)).toEqual({
      level: 2,
      currentXp: 450,
      xpToNextLevel: 1000,
    });
  });

  it("returns level 1 for invalid values", () => {
    expect(getXpProgress(-12)).toEqual({
      level: 1,
      currentXp: 0,
      xpToNextLevel: 1000,
    });
  });
});
