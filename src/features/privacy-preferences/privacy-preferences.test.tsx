import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PrivacyPreferences } from ".";
import { openPrivacySettings } from "@/shared/lib/privacy-choice";
describe("Privacy preferences", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      callback(0);
      return 1;
    });
  });
  it("informs about technical cookies without preselecting optional analytics", () => {
    render(<PrivacyPreferences />);
    expect(screen.getByRole("heading", { name: "Мы используем cookie" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    expect(localStorage.getItem("privacy-choice-2026-10-13")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Понятно" }));
    expect(localStorage.getItem("privacy-choice-2026-10-13")).toBe("essential");
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
  });
  it("requires an explicit checkbox and confirmation to allow analytics", () => {
    render(<PrivacyPreferences />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(localStorage.getItem("privacy-choice-2026-10-13")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Понятно" }));
    expect(localStorage.getItem("privacy-choice-2026-10-13")).toBe("analytics");
  });
  it("remains hidden for a stored choice", () => {
    localStorage.setItem("privacy-choice-2026-10-13", "essential");
    render(<PrivacyPreferences />);
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
  });
  it("reopens settings with the current analytics choice", () => {
    localStorage.setItem("privacy-choice-2026-10-13", "analytics");
    render(<PrivacyPreferences />);
    act(() => openPrivacySettings());
    expect(screen.getByRole("checkbox")).toBeChecked();
  });
});
