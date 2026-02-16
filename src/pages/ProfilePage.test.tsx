import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import { PROFILE_SETTINGS_KEY } from "@/lib/account";
import { saveLessonCompletion } from "@/lib/lessonProgress";
import { addTodayProgress } from "@/lib/weeklyProgress";

describe("ProfilePage", () => {
  it("renders saved profile name and avatar", () => {
    localStorage.setItem(
      PROFILE_SETTINGS_KEY,
      JSON.stringify({ fullName: "Ayşe Test", username: "@ayse", avatar: "🐼" }),
    );

    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Ayşe Test" })).toBeInTheDocument();
    expect(screen.getByText("🐼")).toBeInTheDocument();
  });

  it("shows tiered achievements and allows claim flow", () => {
    saveLessonCompletion("1", 3);
    saveLessonCompletion("2", 3);
    saveLessonCompletion("3", 3);
    addTodayProgress(350);

    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Kademeli Başarımlar")).toBeInTheDocument();
    const claimButtons = screen.getAllByRole("button", { name: "Claim" });
    expect(claimButtons.length).toBeGreaterThan(0);

    fireEvent.click(claimButtons[0]);
    expect(screen.getByText("Claimed")).toBeInTheDocument();
  });
});
