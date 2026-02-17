import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import TranslationPage from "./TranslationPage";

describe("TranslationPage", () => {
  beforeEach(() => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => [[["günaydın", "BUNĂ DIMINEAȚA", null, null, 10]]],
    } as Response);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("translates Romanian to Turkish even when Romanian input is uppercase", async () => {
    render(<TranslationPage />);

    fireEvent.click(screen.getByLabelText("Çeviri yönünü değiştir"));
    fireEvent.change(screen.getByPlaceholderText("Romence bir kelime veya kısa cümle yaz..."), {
      target: { value: "BUNĂ DIMINEAȚA" },
    });

    await waitFor(() => {
      expect(screen.getByText("günaydın")).toBeInTheDocument();
    });
  });
});
