import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PrivacyPreferences } from ".";
describe("Privacy preferences", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      callback(0);
      return 1;
    });
  });
  it("records refusal without enabling analytics", () => {
    render(<PrivacyPreferences />);
    fireEvent.click(screen.getByRole("button", { name: "Только необходимые" }));
    expect(localStorage.getItem("privacy-choice-2026-10-13")).toBe("essential");
    expect(screen.queryByRole("button", { name: "Разрешить аналитику" })).not.toBeInTheDocument();
  });
  it("remains hidden for a stored choice", () => {
    localStorage.setItem("privacy-choice-2026-10-13", "essential");
    render(<PrivacyPreferences />);
    expect(screen.queryByRole("button", { name: "Разрешить аналитику" })).not.toBeInTheDocument();
  });
});
