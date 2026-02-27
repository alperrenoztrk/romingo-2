import { afterEach, describe, expect, it, vi } from "vitest";
import { translateWithYandex } from "./yandexTranslate";
import { BLOCKED_TRANSLATION_MESSAGE } from "./profanityFilter";

describe("translateWithYandex", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns Yandex Translate output for sentence translations", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ text: ["Bună dimineața"] }),
    } as Response);

    await expect(translateWithYandex("Günaydın", "tr-ro")).resolves.toBe("Bună dimineața");
  });

  it("falls back to local dictionary when Yandex request fails", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network"));

    await expect(translateWithYandex("Günaydın", "tr-ro")).resolves.toBe("Bună dimineața");
  });

  it("blocks profanity and sexual content in input", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    await expect(translateWithYandex("Bu kelime çok sapık", "tr-ro")).resolves.toBe(
      BLOCKED_TRANSLATION_MESSAGE,
    );

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("blocks profanity and sexual content in translated output", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ text: ["sex"] }),
    } as Response);

    await expect(translateWithYandex("aşk", "tr-ro")).resolves.toBe(BLOCKED_TRANSLATION_MESSAGE);
  });
});
