import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import TranslationPage from "./TranslationPage";

describe("TranslationPage", () => {
  const originalSpeechSynthesis = globalThis.window.speechSynthesis;
  const originalUtterance = globalThis.SpeechSynthesisUtterance;

  beforeEach(() => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ text: ["günaydın"] }),
    } as Response);

    Object.defineProperty(globalThis.window, "speechSynthesis", {
      value: {
        cancel: vi.fn(),
        speak: vi.fn(),
      },
      configurable: true,
    });

    globalThis.SpeechSynthesisUtterance = vi.fn().mockImplementation((text: string) => ({
      text,
      lang: "",
      rate: 1,
      pitch: 1,
    })) as unknown as typeof SpeechSynthesisUtterance;
  });

  afterEach(() => {
    Object.defineProperty(globalThis.window, "speechSynthesis", {
      value: originalSpeechSynthesis,
      configurable: true,
    });
    globalThis.SpeechSynthesisUtterance = originalUtterance;
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

  it("reads translated text aloud when listen button is pressed", async () => {
    render(<TranslationPage />);

    fireEvent.change(screen.getByPlaceholderText("Türkçe bir kelime veya kısa cümle yaz..."), {
      target: { value: "Günaydın" },
    });

    await screen.findByText("günaydın");
    fireEvent.click(screen.getByLabelText("Çeviriyi sesli dinle"));

    expect(window.speechSynthesis.cancel).toHaveBeenCalled();
    expect(window.speechSynthesis.speak).toHaveBeenCalled();
  });
});
