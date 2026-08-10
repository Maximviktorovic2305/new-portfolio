import { useEffect } from "react";

type YandexMetrikaFunction = ((...args: unknown[]) => void) & {
  a?: unknown[][];
  l?: number;
};

declare global {
  interface Window {
    ym?: YandexMetrikaFunction;
  }
}

const initializedCounters = new Set<number>();

function readCounterId(): number | null {
  const counterId = Number(import.meta.env.VITE_YANDEX_METRIKA_ID);
  return Number.isSafeInteger(counterId) && counterId > 0 ? counterId : null;
}

function createQueue(): YandexMetrikaFunction {
  const queue: YandexMetrikaFunction = (...args: unknown[]) => {
    queue.a ??= [];
    queue.a.push(args);
  };
  queue.l = Date.now();
  return queue;
}

export function YandexMetrika() {
  useEffect(() => {
    const counterId = readCounterId();
    if (counterId === null || initializedCounters.has(counterId)) return;

    initializedCounters.add(counterId);
    window.ym ??= createQueue();

    const scriptId = `yandex-metrika-${counterId}`;
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.async = true;
      script.id = scriptId;
      script.src = `https://mc.yandex.ru/metrika/tag.js?id=${counterId}`;
      document.head.append(script);
    }

    window.ym(counterId, "init", {
      accurateTrackBounce: true,
      clickmap: true,
      ecommerce: "dataLayer",
      referrer: document.referrer,
      ssr: true,
      trackLinks: true,
      url: window.location.href,
      webvisor: true,
    });
  }, []);

  return null;
}
