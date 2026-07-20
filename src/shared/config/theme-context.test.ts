import { describe, expect, it } from "vitest";
import { isThemeName } from "./theme-context";

describe("isThemeName", () => {
  it.each(["crayon", "original", "classic"])("accepts %s", (theme) => {
    expect(isThemeName(theme)).toBe(true);
  });

  it.each(["", "dark", null, 1, {}])("rejects unsupported value %j", (theme) => {
    expect(isThemeName(theme)).toBe(false);
  });
});
