import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TranslationPage from "./TranslationPage";

describe("TranslationPage", () => {
  it("translates Romanian to Turkish even when Romanian input is uppercase", () => {
    render(<TranslationPage />);

    fireEvent.click(screen.getByLabelText("Çeviri yönünü değiştir"));
    fireEvent.change(screen.getByPlaceholderText("Romence bir kelime veya kısa cümle yaz..."), {
      target: { value: "BUNĂ DIMINEAȚA" },
    });

    expect(screen.getByText("günaydın")).toBeInTheDocument();
  });
});
