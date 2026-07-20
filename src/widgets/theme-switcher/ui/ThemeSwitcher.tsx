import { motion, AnimatePresence, useAnimation } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import { X, Palette, Check } from "lucide-react";
import { useTheme, themePresets } from "@/shared/config";

const LS_KEY = "theme-hint-enabled";

function getHintEnabled(): boolean {
  try {
    const v = localStorage.getItem(LS_KEY);
    return v === null ? true : v === "true";
  } catch {
    return true;
  }
}

export function ThemeSwitcher() {
  const { theme, setTheme, isClassic, isCrayon } = useTheme();
  const [open, setOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintEnabled, setHintEnabled] = useState(getHintEnabled);
  const hintControls = useAnimation();
  const btnControls = useAnimation();

  // Persist checkbox
  const toggleHintEnabled = () => {
    const next = !hintEnabled;
    setHintEnabled(next);
    try {
      localStorage.setItem(LS_KEY, String(next));
    } catch {
      // The preference remains in memory when browser storage is unavailable.
    }
    if (!next) setShowHint(false);
  };

  // Show the first hint quickly enough to be noticed.
  useEffect(() => {
    if (!hintEnabled || open) return;

    // First appearance
    const firstTimer = setTimeout(() => {
      if (!open) setShowHint(true);
    }, 700);

    return () => clearTimeout(firstTimer);
  }, [hintEnabled, open]);

  // Keep it visible long enough to be read without rushing.
  useEffect(() => {
    if (!showHint) return;
    const hideTimer = setTimeout(() => setShowHint(false), 8000);
    return () => clearTimeout(hideTimer);
  }, [showHint]);

  // Recurring hint for visitors who missed the first appearance.
  useEffect(() => {
    if (!hintEnabled || open) return;
    const interval = setInterval(() => {
      if (!open) setShowHint(true);
    }, 16000);
    return () => clearInterval(interval);
  }, [hintEnabled, open]);

  // Bouncing hint animation loop
  useEffect(() => {
    if (!showHint || open) return;
    let cancelled = false;

    const bounceLoop = async () => {
      while (!cancelled) {
        await hintControls.start({
          y: [0, -5, 0],
          transition: { duration: 1.4, ease: "easeInOut" },
        });
        await new Promise((r) => setTimeout(r, 900));
        if (cancelled) break;
      }
    };

    void bounceLoop();
    return () => {
      cancelled = true;
    };
  }, [showHint, open, hintControls]);

  // A short, controlled nudge keeps the control discoverable.
  const shake = useCallback(async () => {
    if (open) return;
    await btnControls.start({
      rotate: [0, -5, 5, -3, 3, 0],
      scale: [1, 1.08, 1.08, 1.04, 1.04, 1],
      transition: { duration: 0.55, ease: "easeInOut" },
    });
  }, [btnControls, open]);

  useEffect(() => {
    if (open) return;
    const interval = setInterval(() => void shake(), 8000);
    return () => clearInterval(interval);
  }, [shake, open]);

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-[100] flex flex-col items-end gap-3">
      {/* Theme panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            aria-label="Выбор стиля сайта"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="p-4 bg-card border shadow-lg backdrop-blur-xl min-w-[15rem]"
            id="theme-panel"
            role="dialog"
            style={{
              borderStyle: "var(--t-border-style)",
              borderColor: "var(--border)",
              filter: "var(--t-filter)",
              borderRadius: isClassic ? "0.375rem" : "1rem",
              borderWidth: isClassic ? "1px" : "2px",
            }}
          >
            <div
              className="text-[0.85rem] text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2"
              style={{ fontFamily: "var(--t-font-heading)" }}
            >
              {isClassic ? (
                <>
                  <Palette size={14} /> Стиль сайта
                </>
              ) : (
                "🎨 Стиль сайта"
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              {themePresets.map((preset) => {
                const isActive = theme === preset.id;
                return (
                  <motion.button
                    key={preset.id}
                    type="button"
                    initial={false}
                    onClick={() => setTheme(preset.id)}
                    whileHover={{ scale: isClassic ? 1.01 : 1.03, x: isClassic ? 2 : 4 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-center gap-3 px-3 py-2.5 border transition-all text-left ${
                      isClassic
                        ? isActive
                          ? "border-text-dim bg-card"
                          : "border-transparent hover:border-border hover:bg-muted/30"
                        : isActive
                          ? "border-brand-teal/50 bg-brand-teal/10 border-2 rounded-xl"
                          : "border-transparent hover:border-brand-lavender/20 hover:bg-muted/50 border-2 rounded-xl"
                    }`}
                    style={{
                      borderStyle: "var(--t-border-style)",
                      borderRadius: isClassic ? "0.375rem" : undefined,
                    }}
                  >
                    {isClassic ? null : (
                      <motion.span
                        className="text-[1.4rem]"
                        animate={isActive ? { rotate: [0, 10, -10, 0] } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        {preset.emoji}
                      </motion.span>
                    )}
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-[0.9rem] ${
                          isClassic
                            ? isActive
                              ? "text-text-primary"
                              : "text-text-secondary"
                            : isActive
                              ? "text-brand-teal"
                              : "text-text-primary"
                        }`}
                        style={{ fontFamily: "var(--t-font-heading)", fontWeight: 700 }}
                      >
                        {preset.label}
                      </div>
                      <div
                        className="text-[0.7rem] text-muted-foreground truncate"
                        style={{ fontFamily: "var(--t-font-body)" }}
                      >
                        {preset.description}
                      </div>
                    </div>
                    {isActive &&
                      (isClassic ? (
                        <Check size={14} className="text-text-primary" />
                      ) : (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-brand-teal text-[0.9rem]"
                        >
                          ✓
                        </motion.span>
                      ))}
                  </motion.button>
                );
              })}
            </div>

            {/* ── Checkbox: show hint notifications ── */}
            <label
              className="mt-3 flex cursor-pointer items-center gap-2 border-t border-border pt-3 text-[0.7rem] text-muted-foreground"
              style={{ fontFamily: "var(--t-font-body)" }}
            >
              <input
                checked={hintEnabled}
                className="size-4 accent-brand-teal"
                onChange={toggleHintEnabled}
                type="checkbox"
              />
              Показывать уведомление
            </label>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint tooltip */}
      <AnimatePresence>
        {showHint && !open && hintEnabled && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 30, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="absolute bottom-[5.25rem] right-0 w-[15.5rem] cursor-pointer"
            style={{
              fontFamily: "var(--t-font-heading)",
              fontWeight: 700,
              borderRadius: isClassic ? "0.375rem" : "1.15rem",
              background: isClassic
                ? "var(--text-primary)"
                : "linear-gradient(135deg, #6557c7 0%, #7d68dc 52%, #a25ec8 100%)",
              color: isClassic ? "var(--background)" : "white",
              border: isClassic ? "1px solid var(--border)" : "2px solid rgba(255,255,255,0.82)",
              boxShadow: isClassic
                ? "0 10px 30px rgba(0,0,0,0.28)"
                : "0 18px 45px rgba(92,72,171,0.34), 0 0 0 6px rgba(120,102,213,0.12)",
              animation: isClassic ? undefined : "theme-hint-pulse 1.8s ease-in-out infinite",
            }}
            onClick={() => {
              setShowHint(false);
              setOpen(true);
            }}
            aria-label="Открыть выбор стиля сайта"
          >
            <motion.div animate={hintControls} className="px-4 py-3.5 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/18 ring-1 ring-white/25">
                <Palette size={21} strokeWidth={2.4} />
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block text-[1rem]">Попробуй другой стиль</span>
                <span
                  className="mt-1 block text-[0.75rem] font-semibold"
                  style={{ color: isClassic ? "var(--background)" : "rgba(255,255,255,0.8)" }}
                >
                  Нажми на палитру, чтобы переключить
                </span>
              </span>
            </motion.div>
            <div
              className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 border-b-2 border-r-2 border-white/80"
              style={{
                backgroundColor: isClassic ? "var(--text-primary)" : "#8f62d2",
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Toggle button with sweep glare + periodic shake ── */}
      <motion.button
        type="button"
        animate={btnControls}
        onClick={() => {
          setShowHint(false);
          setOpen((current) => !current);
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        aria-label={open ? "Закрыть выбор стиля" : "Выбрать стиль сайта"}
        aria-controls="theme-panel"
        aria-expanded={open}
        className="relative flex items-center justify-center bg-card backdrop-blur-xl overflow-hidden"
        style={{
          width: isClassic ? 56 : 64,
          height: isClassic ? 56 : 64,
          borderRadius: isClassic ? "0.375rem" : "9999px",
          border: isClassic
            ? "1px solid rgba(229,229,229,0.15)"
            : isCrayon
              ? "3px solid rgba(255,255,255,0.95)"
              : "1px solid rgba(255,255,255,0.12)",
          background: isCrayon ? "linear-gradient(145deg, #7866d5 0%, #9a66cf 55%, #ee5f8b 115%)" : undefined,
          boxShadow: isCrayon
            ? showHint
              ? "0 14px 38px rgba(120,102,213,0.42), 0 0 0 8px rgba(120,102,213,0.15)"
              : "0 12px 32px rgba(120,102,213,0.28), 0 0 0 4px rgba(120,102,213,0.08)"
            : undefined,
        }}
      >
        {isCrayon && showHint && !open && (
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-white/55"
            animate={{ scale: [1, 1.28], opacity: [0.75, 0] }}
            transition={{ duration: 1.35, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        {/* Sweep glare */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: "inherit",
            background:
              "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 47%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.18) 53%, transparent 60%)",
            backgroundSize: "300% 100%",
            animation: "theme-btn-glare 8s linear infinite",
          }}
        />

        {/* Icon */}
        <span className="relative z-10">
          {open ? (
            <X size={20} className="text-muted-foreground" />
          ) : isClassic ? (
            <Palette size={20} className="text-text-secondary" />
          ) : isCrayon ? (
            <Palette size={27} strokeWidth={2.3} className="text-white drop-shadow-sm" />
          ) : (
            <motion.span
              animate={{ scale: [1, 1.1, 1, 1.1, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-[1.5rem] block"
            >
              🎨
            </motion.span>
          )}
        </span>

        <style>{`
          @keyframes theme-btn-glare {
            0%   { background-position: 200% center; }
            100% { background-position: -100% center; }
          }
          @keyframes theme-hint-pulse {
            0%, 100% { box-shadow: 0 18px 45px rgba(92,72,171,0.34), 0 0 0 6px rgba(120,102,213,0.12); }
            50% { box-shadow: 0 20px 52px rgba(92,72,171,0.44), 0 0 0 10px rgba(120,102,213,0.18); }
          }
        `}</style>
      </motion.button>
    </div>
  );
}
