import { describe, expect, it, vi } from "vitest";
import { BLOCKED_TRANSLATION_MESSAGE } from "./profanityFilter";
import { translateWithGoogle } from "./googleTranslate";

describe("translateWithGoogle", () => {
  it("returns translated text from google response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => [["Bună dimineața", "Günaydın", null, null]],
    } as Response);

    await expect(translateWithGoogle("Günaydın", "tr-ro")).resolves.toBe("Bună dimineața");
  });

  it("falls back to local dictionary when request fails", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Network"));

    await expect(translateWithGoogle("Günaydın", "tr-ro")).resolves.toBe("Bună dimineața");
  });

  it("blocks profanity in source input", async () => {
    await expect(translateWithGoogle("Bu kelime çok sapık", "tr-ro")).resolves.toBe(
      BLOCKED_TRANSLATION_MESSAGE,
    );
  });
});
