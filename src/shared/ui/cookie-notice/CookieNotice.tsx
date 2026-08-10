import { motion } from "motion/react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "itmyportfolio-cookie-notice-accepted-v1";

function wasAccepted(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsVisible(!wasAccepted()));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const accept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Keep the notice dismissible even when browser storage is unavailable.
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <motion.aside
      animate={{ opacity: 1, y: 0, scale: 1 }}
      aria-live="polite"
      className="fixed right-4 bottom-28 z-[110] w-[calc(100%-2rem)] max-w-sm overflow-hidden rounded-2xl border-2 border-brand-lavender/25 bg-card/95 p-4 text-card-foreground shadow-xl backdrop-blur-xl sm:right-6 sm:bottom-30"
      exit={{ opacity: 0, y: 18, scale: 0.97 }}
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      role="status"
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      <div className="absolute -top-8 -right-8 size-24 rounded-full bg-brand-lavender/10 blur-2xl" />
      <div className="relative">
        <div className="mb-1 font-semibold" style={{ fontFamily: "var(--t-font-heading)" }}>
          Файлы cookie
        </div>
        <p className="m-0 text-sm leading-5 text-text-secondary">
          Мы используем cookie, чтобы сохранять настройки и улучшать работу сайта.
        </p>
        <button
          className="mt-3 ml-auto block rounded-lg bg-brand-teal px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-teal-hover focus-visible:outline-brand-teal"
          onClick={accept}
          type="button"
        >
          Понятно
        </button>
      </div>
    </motion.aside>
  );
}
