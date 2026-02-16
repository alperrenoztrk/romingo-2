import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import { PROFILE_SETTINGS_KEY } from "@/lib/account";

describe("ProfilePage", () => {
  it("renders profile data from localStorage", () => {
    localStorage.setItem(
      PROFILE_SETTINGS_KEY,
      JSON.stringify({ fullName: "Tester User", username: "@tester", avatar: "🐦" }),
    );

    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Tester User")).toBeInTheDocument();
    expect(screen.getByText("🐦")).toBeInTheDocument();
  });
});
