import { afterEach, describe, expect, it, vi } from "vitest";
import { translateWithGoogle } from "./googleTranslate";

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
});
