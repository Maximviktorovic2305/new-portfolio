import { motion, AnimatePresence, useAnimation } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import { X, Palette, Check } from "lucide-react";
import { useTheme, themePresets } from "@/shared/config";
import type { ThemeName } from "@/shared/config";

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
  const { theme, setTheme, isClassic } = useTheme();
  const [open, setOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintEnabled, setHintEnabled] = useState(getHintEnabled);
  const hintControls = useAnimation();
  const btnControls = useAnimation();

  // Persist checkbox
  const toggleHintEnabled = () => {
    const next = !hintEnabled;
    setHintEnabled(next);
    localStorage.setItem(LS_KEY, String(next));
    if (!next) setShowHint(false);
  };

  // Show hint initially after 1.5s, then every 20s
  useEffect(() => {
    if (!hintEnabled || open) return;

    // First appearance
    const firstTimer = setTimeout(() => {
      if (!open) setShowHint(true);
    }, 1500);

    return () => clearTimeout(firstTimer);
  }, [hintEnabled, open]);

  // Auto-hide hint after 5s, then re-show every 20s
  useEffect(() => {
    if (!showHint) return;
    const hideTimer = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(hideTimer);
  }, [showHint]);

  // Recurring hint every 20s
  useEffect(() => {
    if (!hintEnabled || open) return;
    const interval = setInterval(() => {
      if (!open) setShowHint(true);
    }, 20000);
    return () => clearInterval(interval);
  }, [hintEnabled, open]);

  // Hide hint when panel opens
  useEffect(() => {
    if (open) setShowHint(false);
  }, [open]);

  // Bouncing hint animation loop
  useEffect(() => {
    if (!showHint || open) return;
    let cancelled = false;

    const bounceLoop = async () => {
      while (!cancelled) {
        await hintControls.start({
          y: [0, -14, 0, -8, 0, -4, 0],
          transition: { duration: 0.8, ease: "easeOut" },
        });
        await new Promise((r) => setTimeout(r, 2200));
        if (cancelled) break;
      }
    };

    bounceLoop();
    return () => { cancelled = true; };
  }, [showHint, open, hintControls]);

  // Shake button every 10s when closed
  const shake = useCallback(async () => {
    if (open) return;
    await btnControls.start({
      rotate: [0, -8, 8, -8, 8, -4, 4, 0],
      scale: [1, 1.1, 1.1, 1.1, 1.1, 1.05, 1.05, 1],
      transition: { duration: 0.6, ease: "easeInOut" },
    });
  }, [btnControls, open]);

  useEffect(() => {
    if (open) return;
    const interval = setInterval(shake, 10000);
    return () => clearInterval(interval);
  }, [shake, open]);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
      {/* Theme panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="p-4 bg-card border shadow-lg backdrop-blur-xl min-w-[15rem]"
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
                    initial={false}
                    onClick={() => setTheme(preset.id as ThemeName)}
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
            <div
              className="mt-3 pt-3 flex items-center gap-2"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <button
                type="button"
                role="checkbox"
                aria-checked={hintEnabled}
                onClick={toggleHintEnabled}
                className="flex items-center justify-center shrink-0 transition-colors"
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: isClassic ? "0.2rem" : "0.25rem",
                  border: hintEnabled
                    ? isClassic
                      ? "1.5px solid var(--text-primary)"
                      : "1.5px solid var(--brand-teal)"
                    : "1.5px solid var(--muted-foreground)",
                  backgroundColor: hintEnabled
                    ? isClassic
                      ? "var(--text-primary)"
                      : "var(--brand-teal)"
                    : "transparent",
                }}
              >
                {hintEnabled && (
                  <Check
                    size={11}
                    strokeWidth={3}
                    style={{ color: isClassic ? "var(--background)" : "white" }}
                  />
                )}
              </button>
              <span
                className="text-[0.7rem] text-muted-foreground select-none cursor-pointer"
                onClick={toggleHintEnabled}
                style={{ fontFamily: "var(--t-font-body)" }}
              >
                Показывать уведомление
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint tooltip */}
      <AnimatePresence>
        {showHint && !open && hintEnabled && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="absolute bottom-[4.5rem] right-0 flex items-center gap-2 whitespace-nowrap shadow-lg"
            style={{
              fontFamily: "var(--t-font-heading)",
              fontWeight: 700,
              borderRadius: isClassic ? "0.375rem" : "0.75rem",
              backgroundColor: isClassic ? "var(--text-primary)" : "var(--brand-teal)",
              color: isClassic ? "var(--background)" : "white",
            }}
            onClick={() => setShowHint(false)}
          >
            <motion.div
              animate={hintControls}
              className="px-4 py-2.5 flex items-center gap-2"
            >
              <span className="text-[0.9rem]">
                {isClassic ? "Нажмите для смены стиля \u2193" : "\uD83D\uDC46 Нажми для смены стиля!"}
              </span>
            </motion.div>
            <div
              className="absolute -bottom-2 right-5 w-3 h-3 rotate-45"
              style={{
                backgroundColor: isClassic ? "var(--text-primary)" : "var(--brand-teal)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toggle button with sweep glare + periodic shake ── */}
      <motion.button
        animate={btnControls}
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        className="relative flex items-center justify-center bg-card backdrop-blur-xl overflow-hidden"
        style={{
          width: 56,
          height: 56,
          borderRadius: isClassic ? "0.375rem" : "9999px",
          border: isClassic
            ? "1px solid rgba(229,229,229,0.15)"
            : "1px solid rgba(255,255,255,0.08)",
        }}
      >
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
        `}</style>
      </motion.button>
    </div>
  );
}
