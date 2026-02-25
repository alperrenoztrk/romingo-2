import { afterEach, describe, expect, it, vi } from "vitest";
import { translateWithGoogle } from "./googleTranslate";
import { BLOCKED_TRANSLATION_MESSAGE } from "./profanityFilter";

describe("translateWithGoogle", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns Google Translate output for sentence translations", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => [[["Bună dimineața", "Günaydın", null, null, 10]]],
    } as Response);

    await expect(translateWithGoogle("Günaydın", "tr-ro")).resolves.toBe("Bună dimineața");
  });

  it("falls back to local dictionary when Google request fails", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network"));

    await expect(translateWithGoogle("Günaydın", "tr-ro")).resolves.toBe("Bună dimineața");
  });

  it("blocks profanity and sexual content in input", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    await expect(translateWithGoogle("Bu kelime çok sapık", "tr-ro")).resolves.toBe(
      BLOCKED_TRANSLATION_MESSAGE,
    );

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("blocks profanity and sexual content in translated output", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => [[["sex", "aşk", null, null, 10]]],
    } as Response);

    await expect(translateWithGoogle("aşk", "tr-ro")).resolves.toBe(BLOCKED_TRANSLATION_MESSAGE);
  });
});
