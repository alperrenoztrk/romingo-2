import { describe, expect, it } from "vitest";
import { matchesWithOneLetterTolerancePerWord } from "./answerTolerance";

describe("matchesWithOneLetterTolerancePerWord", () => {
  it("accepts exact matches", () => {
    expect(matchesWithOneLetterTolerancePerWord("Bună dimineața", "Bună dimineața")).toBe(true);
  });

  it("accepts one typo per word", () => {
    expect(matchesWithOneLetterTolerancePerWord("Buna dimineata", "Bună dimineața")).toBe(true);
    expect(matchesWithOneLetterTolerancePerWord("Mulţumec", "Mulțumesc")).toBe(true);
  });

  it("rejects more than one typo in any single word", () => {
    expect(matchesWithOneLetterTolerancePerWord("Mltumec", "Mulțumesc")).toBe(false);
  });

  it("rejects different word counts", () => {
    expect(matchesWithOneLetterTolerancePerWord("Bună", "Bună dimineața")).toBe(false);
  });
});
