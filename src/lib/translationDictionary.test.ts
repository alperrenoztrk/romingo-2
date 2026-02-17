import { describe, expect, it } from "vitest";
import { translateWithTolerance, translationDictionaryStats } from "./translationDictionary";

describe("translationDictionary", () => {
  it("loads a broad dictionary from lesson exercises", () => {
    expect(translationDictionaryStats.trToRoSize).toBeGreaterThan(420);
    expect(translationDictionaryStats.roToTrSize).toBeGreaterThan(420);
  });

  it("finds exact matches from exercise content", () => {
    expect(translateWithTolerance("Günaydın", "tr-ro")).toBe("Bună dimineața");
    expect(translateWithTolerance("Bună dimineața", "ro-tr")).toBe("Günaydın");
  });

  it("includes a much larger supplemental vocabulary in both directions", () => {
    expect(translateWithTolerance("Öğretmen", "tr-ro")).toBe("Profesor");
    expect(translateWithTolerance("Farmacie", "ro-tr")).toBe("Eczane");
    expect(translateWithTolerance("İyi geceler", "tr-ro")).toBe("Noapte bună");
    expect(translateWithTolerance("Felicitări", "ro-tr")).toBe("Tebrikler");
    expect(translateWithTolerance("Kütüphane", "tr-ro")).toBe("Bibliotecă");
    expect(translateWithTolerance("Mult noroc", "ro-tr")).toBe("İyi şanslar");
    expect(translateWithTolerance("Gidiyoruz", "tr-ro")).toBe("Mergem");
    expect(translateWithTolerance("Vedeți", "ro-tr")).toBe("Görüyorsunuz");
    expect(translateWithTolerance("Geliyoruz", "tr-ro")).toBe("Venim");
    expect(translateWithTolerance("Rămâneți", "ro-tr")).toBe("Kalıyorsunuz");
    expect(translateWithTolerance("Yapıyorsunuz", "tr-ro")).toBe("Faceți");
  });


  it("translates simple sentences word by word when full sentence is missing", () => {
    expect(translateWithTolerance("Öğretmen mutlu", "tr-ro")).toBe("Profesor Fericit");
    expect(translateWithTolerance("İyi şanslar arkadaş", "tr-ro")).toBe("Mult noroc prieten");
    expect(translateWithTolerance("Mult noroc prieten", "ro-tr")).toBe("İyi şanslar arkadaş");
    expect(translateWithTolerance("Mult noroc, prieten!", "ro-tr")).toBe("İyi şanslar, arkadaş!");
    expect(translateWithTolerance("Ben gidiyorum", "tr-ro")).toBe("Eu merg");
    expect(translateWithTolerance("Tu bei apă", "ro-tr")).toBe("Sen içiyorsun su");
    expect(translateWithTolerance("Biz yapıyoruz", "tr-ro")).toBe("Noi facem");
    expect(translateWithTolerance("Voi veniți", "ro-tr")).toBe("Siz geliyorsunuz");
    expect(translateWithTolerance("Acıktım", "tr-ro")).toBe("Mi-e foame");
  });

  it("tolerates small letter mistakes", () => {
    expect(translateWithTolerance("Merhabaa", "tr-ro")).toBe("Bună");
    expect(translateWithTolerance("buna dimineața", "ro-tr")).toBe("Günaydın");
  });

  it("returns a fallback message for unknown entries", () => {
    expect(translateWithTolerance("bilinmeyen ifade", "tr-ro")).toContain("sözlükte henüz yok");
  });
});
