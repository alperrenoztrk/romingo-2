import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import { PROFILE_SETTINGS_KEY } from "@/lib/account";

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
});
