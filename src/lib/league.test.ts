import { beforeEach, describe, expect, it } from "vitest";
import { addLeagueXp, getLeagueState } from "./league";

describe("league XP", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("never drops user XP below 0", () => {
    addLeagueXp(10);
    addLeagueXp(-999);

    expect(getLeagueState().userXp).toBe(0);
  });
});
