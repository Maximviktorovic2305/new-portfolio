import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ImageWithFallback } from "./ImageWithFallback";

describe("ImageWithFallback", () => {
  it("uses privacy-conscious defaults", () => {
    render(<ImageWithFallback alt="Проект" src="https://example.com/project.jpg" />);

    const image = screen.getByRole("img", { name: "Проект" });
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).toHaveAttribute("decoding", "async");
    expect(image).toHaveAttribute("referrerpolicy", "no-referrer");
  });

  it("renders a local fallback after an image error", () => {
    const onError = vi.fn();
    render(<ImageWithFallback alt="Проект" onError={onError} src="https://example.com/broken.jpg" />);

    fireEvent.error(screen.getByRole("img", { name: "Проект" }));

    expect(onError).toHaveBeenCalledOnce();
    expect(screen.getByRole("img", { name: "Проект" }).tagName).toBe("DIV");
  });
});
