import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";
import { PROFILE_SETTINGS_KEY } from "@/lib/account";

describe("HomePage", () => {
  it("adds the username to the time-based greeting", () => {
    localStorage.setItem(
      PROFILE_SETTINGS_KEY,
      JSON.stringify({ fullName: "Tester User", username: "@tester", avatar: "🦩" }),
    );

    const getHoursSpy = vi.spyOn(Date.prototype, "getHours").mockReturnValue(20);

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.getByText("İyi akşamlar tester!")).toBeInTheDocument();

    getHoursSpy.mockRestore();
  });
  it("shows level based on total xp progress", () => {
    localStorage.setItem("romingo.weeklyProgressByDate", JSON.stringify({ "2026-02-15": 1450 }));

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.getByText("SEVİYE 2")).toBeInTheDocument();
    expect(screen.getByText("450/1000 XP")).toBeInTheDocument();
  });

});
