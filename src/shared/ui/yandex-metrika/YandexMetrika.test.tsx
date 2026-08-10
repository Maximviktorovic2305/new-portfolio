import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { YandexMetrika } from "./YandexMetrika";

describe("YandexMetrika", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    delete window.ym;
    document.querySelectorAll('script[id^="yandex-metrika-"]').forEach((script) => script.remove());
  });

  it("does not load a script for an invalid counter ID", () => {
    vi.stubEnv("VITE_YANDEX_METRIKA_ID", "javascript:alert(1)");

    render(<YandexMetrika />);

    expect(document.querySelector('script[id^="yandex-metrika-"]')).not.toBeInTheDocument();
  });

  it("loads the fixed Yandex endpoint for a numeric counter ID", () => {
    vi.stubEnv("VITE_YANDEX_METRIKA_ID", "103000001");

    render(<YandexMetrika />);

    const script = document.querySelector<HTMLScriptElement>("#yandex-metrika-103000001");
    expect(script?.src).toBe("https://mc.yandex.ru/metrika/tag.js?id=103000001");
    expect(script?.async).toBe(true);
    expect(window.ym?.a).toContainEqual([
      103000001,
      "init",
      expect.objectContaining({
        clickmap: true,
        ecommerce: "dataLayer",
        ssr: true,
        trackLinks: true,
        webvisor: true,
      }),
    ]);
  });
});
