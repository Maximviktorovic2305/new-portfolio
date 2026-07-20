import { motion } from "motion/react";
import { useTheme } from "@/shared/config";

const footerTexts: Record<string, string> = {
  crayon: "Нарисовано с ❤️ цветными карандашами 🖍️",
  original: "Сделано с ❤️ Максимом",
  classic: "Maxim — Fullstack Developer",
};

export function Footer() {
  const { theme, isCrayon, isClassic } = useTheme();
  const logoEmoji = isCrayon ? "✏️" : "✨";

  return (
    <footer
      className="relative py-12 border-t"
      style={{
        borderTopStyle: "solid",
        borderTopWidth: isClassic ? "1px" : "2px",
        borderTopColor: isClassic ? "var(--border)" : "rgba(var(--brand-orange-rgb, 251, 146, 60), 0.2)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.a
            href="#hero"
            whileHover={{ scale: isClassic ? 1.03 : 1.1, rotate: isClassic ? 0 : -5 }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer flex items-center gap-2"
            style={{ cursor: isClassic ? "default" : "pointer" }}
          >
            {!isClassic && (
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-[1.3rem]"
              >
                {logoEmoji}
              </motion.span>
            )}
            <span style={{ fontFamily: "var(--t-font-heading)", fontWeight: 700 }}>
              {isClassic ? (
                <span className="text-text-primary text-[1.3rem]">Max.dev</span>
              ) : (
                <>
                  <span className="text-brand-lavender text-[1.3rem]">Max</span>
                  <span className="text-brand-orange text-[1.3rem]">.</span>
                  <span className="text-brand-sky text-[1.3rem]">dev</span>
                </>
              )}
            </span>
          </motion.a>

          <div
            className="text-[0.95rem] text-muted-foreground flex items-center gap-1"
            style={{ fontFamily: "var(--t-font-body)" }}
          >
            {footerTexts[theme] ?? footerTexts.classic}
          </div>

          <div
            className="text-[0.9rem] text-text-dim"
            style={{ fontFamily: "var(--t-font-heading)", fontWeight: 700 }}
          >
            &copy; 2026{!isClassic && " ✨"}
          </div>
        </div>
      </div>
    </footer>
  );
}
