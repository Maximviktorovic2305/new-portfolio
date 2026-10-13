import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PrivacyPreferences } from ".";
import { openPrivacySettings } from "@/shared/lib/privacy-choice";
import { YandexMetrika } from "@/shared/ui";
describe("Privacy preferences", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      callback(0);
      return 1;
    });
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    delete window.ym;
    document.querySelectorAll('script[id^="yandex-metrika-"]').forEach((script) => script.remove());
  });
  it("allows declining analytics despite the initially checked suggestion", () => {
    render(<PrivacyPreferences />);
    expect(screen.getByRole("heading", { name: "Мы используем cookie" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(localStorage.getItem("privacy-choice-2026-10-13")).toBeNull();
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Понятно" }));
    expect(localStorage.getItem("privacy-choice-2026-10-13")).toBe("essential");
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
  });
  it("requires explicit analytics confirmation despite the initially checked suggestion", () => {
    vi.stubEnv("VITE_YANDEX_METRIKA_ID", "103000003");
    render(
      <>
        <PrivacyPreferences />
        <YandexMetrika />
      </>,
    );
    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(document.querySelector('script[id^="yandex-metrika-"]')).not.toBeInTheDocument();
    expect(window.ym).toBeUndefined();
    expect(localStorage.getItem("privacy-choice-2026-10-13")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Включить аналитику" }));
    expect(localStorage.getItem("privacy-choice-2026-10-13")).toBe("analytics");
    expect(document.querySelector("#yandex-metrika-103000003")).toBeInTheDocument();
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
  it("preserves a previous refusal when reopening settings", () => {
    localStorage.setItem("privacy-choice-2026-10-13", "essential");
    render(<PrivacyPreferences />);
    act(() => openPrivacySettings());
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    expect(screen.getByRole("button", { name: "Понятно" })).toBeInTheDocument();
  });
});
