import { describe, expect, it } from "vitest";
import { translateWithTolerance, translationDictionaryStats } from "./translationDictionary";

describe("translationDictionary", () => {
  it("loads a broad dictionary from lesson exercises", () => {
    expect(translationDictionaryStats.trToRoSize).toBeGreaterThan(80);
    expect(translationDictionaryStats.roToTrSize).toBeGreaterThan(80);
  });

  it("finds exact matches from exercise content", () => {
    expect(translateWithTolerance("Günaydın", "tr-ro")).toBe("Bună dimineața");
    expect(translateWithTolerance("Bună dimineața", "ro-tr")).toBe("Günaydın");
  });

  it("tolerates small letter mistakes", () => {
    expect(translateWithTolerance("Merhabaa", "tr-ro")).toBe("Bună");
    expect(translateWithTolerance("buna dimineața", "ro-tr")).toBe("Günaydın");
  });

  it("returns a fallback message for unknown entries", () => {
    expect(translateWithTolerance("bilinmeyen ifade", "tr-ro")).toContain("sözlükte henüz yok");
  });
});
