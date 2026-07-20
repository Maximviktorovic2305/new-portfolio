import { describe, expect, it } from "vitest";
import { CONTACT_LIMITS, validateContactForm } from "./validation";

describe("validateContactForm", () => {
  it("normalizes a valid message", () => {
    expect(
      validateContactForm({
        name: "  Максим  ",
        email: "  MAX@example.com  ",
        message: "  Добрый день!  ",
      }),
    ).toEqual({
      success: true,
      data: { name: "Максим", email: "max@example.com", message: "Добрый день!" },
    });
  });

  it("rejects empty and malformed input", () => {
    expect(validateContactForm({ name: "", email: "a@example.com", message: "текст" }).success).toBe(false);
    expect(validateContactForm({ name: "Максим", email: "invalid", message: "текст" }).success).toBe(false);
  });

  it("enforces the public field limits", () => {
    const result = validateContactForm({
      name: "Максим",
      email: "max@example.com",
      message: "x".repeat(CONTACT_LIMITS.message + 1),
    });

    expect(result.success).toBe(false);
  });
});
