import { fireEvent, render, screen } from "@testing-library/react";
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
    expect(screen.queryByText(/SEVİYE/i)).not.toBeInTheDocument();

    getHoursSpy.mockRestore();
  });

  it("shows last 4 week summary after tapping weekly progress", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.queryByText("Bu hafta")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Haftalık İlerleme/i }));

    expect(screen.getByText("Bu hafta")).toBeInTheDocument();
    expect(screen.getByText("2 hafta önce")).toBeInTheDocument();
    expect(screen.getByText("3 hafta önce")).toBeInTheDocument();
    expect(screen.getByText("4 hafta önce")).toBeInTheDocument();
  });
});
