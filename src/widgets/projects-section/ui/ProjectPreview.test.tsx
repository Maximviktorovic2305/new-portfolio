import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Project } from "@/entities/project";
import { ProjectPreview } from "./ProjectPreview";

const motion = vi.hoisted(() => ({ reduced: false }));
vi.mock("motion/react", () => ({ useReducedMotion: () => motion.reduced }));
const project: Project = {
  id: 12,
  title: "Python Lab",
  desc: "Preview",
  image: "https://itmyportfolio.site/python-learning.png",
  preview: { animation: "/previews/python-learning.gif", poster: "/previews/python-learning.webp" },
  tags: [],
  emoji: "🐍",
  category: "Fullstack",
  site: "https://python-learning.tech",
};
let notify: IntersectionObserverCallback;
function intersect(visible: boolean) {
  act(() => notify([{ isIntersecting: visible } as IntersectionObserverEntry], {} as IntersectionObserver));
}
function animation(container: HTMLElement) {
  return container.querySelector<HTMLImageElement>('img[src$=".gif"]');
}
describe("Project preview recovery", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    motion.reduced = false;
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(callback: IntersectionObserverCallback) {
          notify = callback;
        }
        observe = vi.fn();
        disconnect = vi.fn();
      },
    );
  });
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("keeps the poster visible while an animation loads", () => {
    const { container } = render(<ProjectPreview project={project} />);
    intersect(true);
    expect(screen.getByAltText("Превью проекта Python Lab")).toHaveAttribute("src", project.preview!.poster);
    expect(animation(container)).toHaveAttribute("loading", "eager");
    expect(animation(container)).toHaveAttribute("aria-hidden", "true");
  });
  it("preserves the poster on failure and retries after an explicit request", () => {
    const { container } = render(<ProjectPreview project={project} />);
    intersect(true);
    fireEvent.error(animation(container)!);
    act(() => {
      vi.advanceTimersByTime(750);
    });
    fireEvent.error(animation(container)!);
    expect(screen.getByAltText("Превью проекта Python Lab")).toHaveAttribute("src", project.preview!.poster);
    expect(animation(container)).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Повторить анимацию проекта Python Lab" }));
    expect(animation(container)).not.toBeNull();
    fireEvent.load(animation(container)!);
    expect(
      screen.getByRole("button", { name: "Приостановить анимацию проекта Python Lab" }),
    ).toBeInTheDocument();
  });
  it("recovers a failed animation when the card returns into view", () => {
    const { container } = render(<ProjectPreview project={project} />);
    intersect(true);
    fireEvent.error(animation(container)!);
    act(() => {
      vi.advanceTimersByTime(750);
    });
    fireEvent.error(animation(container)!);
    intersect(false);
    intersect(true);
    expect(animation(container)).not.toBeNull();
    expect(screen.queryByText("Изображение недоступно")).not.toBeInTheDocument();
  });
  it("ignores errors from an image removed during a fast scroll", () => {
    const { container } = render(<ProjectPreview project={project} />);
    intersect(true);
    const previous = animation(container)!;
    intersect(false);
    intersect(true);
    fireEvent.error(previous);
    expect(animation(container)).not.toBeNull();
    expect(
      screen.queryByRole("button", { name: "Повторить анимацию проекта Python Lab" }),
    ).not.toBeInTheDocument();
  });
  it("automatically retries a transient failure once without hiding the poster", () => {
    const { container } = render(<ProjectPreview project={project} />);
    intersect(true);
    const first = animation(container)!;
    fireEvent.error(first);
    expect(screen.getByAltText("Превью проекта Python Lab")).toHaveAttribute("src", project.preview!.poster);
    act(() => {
      vi.advanceTimersByTime(750);
    });
    expect(animation(container)).not.toBe(first);
    fireEvent.load(animation(container)!);
    expect(
      screen.queryByRole("button", { name: "Повторить анимацию проекта Python Lab" }),
    ).not.toBeInTheDocument();
  });
  it("cancels a pending retry when the card leaves the viewport", () => {
    const { container } = render(<ProjectPreview project={project} />);
    intersect(true);
    fireEvent.error(animation(container)!);
    expect(vi.getTimerCount()).toBe(1);
    intersect(false);
    expect(vi.getTimerCount()).toBe(0);
    act(() => {
      vi.advanceTimersByTime(750);
    });
    expect(animation(container)).toBeNull();
  });
  it("preserves a deliberate pause through scrolling", () => {
    const { container } = render(<ProjectPreview project={project} />);
    intersect(true);
    fireEvent.click(screen.getByRole("button", { name: "Приостановить анимацию проекта Python Lab" }));
    intersect(false);
    intersect(true);
    expect(animation(container)).toBeNull();
    expect(screen.getByRole("button", { name: "Включить анимацию проекта Python Lab" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
  it("loads only a poster when reduced motion is requested", () => {
    motion.reduced = true;
    const { container } = render(<ProjectPreview project={project} />);
    intersect(true);
    expect(animation(container)).toBeNull();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
