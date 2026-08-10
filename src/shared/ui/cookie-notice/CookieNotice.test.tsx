import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CookieNotice } from "./CookieNotice";

describe("CookieNotice", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      callback(0);
      return 1;
    });
  });

  it("remembers dismissal in localStorage", () => {
    render(<CookieNotice />);

    const notice = screen.getByRole("status");
    const button = screen.getByRole("button", { name: "Понятно" });

    expect(notice).toHaveClass("cookie-notice", "right-4", "bottom-4", "sm:right-6", "sm:bottom-6");
    fireEvent.click(button);

    expect(localStorage.getItem("itmyportfolio-cookie-notice-accepted-v1")).toBe("true");
    expect(button).not.toBeInTheDocument();
  });

  it("stays hidden after it has been accepted", () => {
    localStorage.setItem("itmyportfolio-cookie-notice-accepted-v1", "true");

    render(<CookieNotice />);

    expect(screen.queryByRole("button", { name: "Понятно" })).not.toBeInTheDocument();
  });
});
