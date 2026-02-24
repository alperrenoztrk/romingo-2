import { beforeEach, describe, expect, it } from "vitest";
import { addLeagueXp, getLeagueState } from "./league";
import { setActiveProfileScope } from "./profileScope";

describe("league XP", () => {
  beforeEach(() => {
    localStorage.clear();
    setActiveProfileScope("guest");
  });

  it("never drops user XP below 0", () => {
    addLeagueXp(10);
    addLeagueXp(-999);

    expect(getLeagueState().userXp).toBe(0);
  });

  it("sanitizes stored negative opponent XP to 0", () => {
    localStorage.setItem(
      "romingo.leagueState.v1.guest",
      JSON.stringify({
        weekKey: getLeagueState().weekKey,
        leagueIndex: 0,
        userXp: 25,
        opponents: [
          { id: "opponent-1", name: "Test", avatar: "👤", xp: -120 },
          { id: "opponent-2", name: "Test 2", avatar: "👤", xp: 80.9 },
        ],
      }),
    );

    const state = getLeagueState();
    expect(state.opponents[0]?.xp).toBe(0);
    expect(state.opponents[1]?.xp).toBe(80);
  });

  it("uses separate league XP per profile scope", () => {
    setActiveProfileScope("user-1");
    addLeagueXp(50);

    setActiveProfileScope("user-2");
    expect(getLeagueState().userXp).toBe(0);

    setActiveProfileScope("user-1");
    expect(getLeagueState().userXp).toBe(50);
  });
});
