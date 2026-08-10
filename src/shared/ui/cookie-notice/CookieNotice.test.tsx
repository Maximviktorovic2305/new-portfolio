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

    const button = screen.getByRole("button", { name: "Понятно" });
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
