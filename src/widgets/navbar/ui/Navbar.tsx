import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useTheme } from "@/shared/config";

const navLinks = [
  { label: "Главная", href: "#hero", emoji: "🏠" },
  { label: "Обо мне", href: "#about", emoji: "🧑‍💻" },
  { label: "Навыки", href: "#skills", emoji: "⚡" },
  { label: "Проекты", href: "#projects", emoji: "🚀" },
  { label: "Контакты", href: "#contact", emoji: "💬" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { isCrayon, isClassic } = useTheme();

  const logoEmoji = isCrayon ? "✏️" : "✨";
  const showEmojis = isCrayon;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        aria-label="Основная навигация"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-background/90 backdrop-blur-xl border-b-2" : "bg-transparent"
        }`}
        style={{
          borderBottomStyle: scrolled ? "solid" : "none",
          borderBottomColor: isClassic
            ? "var(--border)"
            : isCrayon
              ? "var(--brand-orange)"
              : "var(--brand-lavender)",
          borderBottomWidth: scrolled ? (isClassic ? "1px" : "var(--t-border-w)") : "0",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.a
            href="#hero"
            className="relative group cursor-pointer flex items-center gap-2"
            whileHover={{ scale: isClassic ? 1.03 : 1.1, rotate: isClassic ? 0 : -3 }}
            whileTap={{ scale: 0.9 }}
            style={{ cursor: isClassic ? "default" : "pointer" }}
          >
            {!isClassic && (
              <motion.span
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-[1.3rem]"
              >
                {logoEmoji}
              </motion.span>
            )}
            <span className="text-[1.5rem]" style={{ fontFamily: "var(--t-font-heading)", fontWeight: 700 }}>
              {isClassic ? (
                <span className="text-text-primary">Max.dev</span>
              ) : (
                <>
                  <span className="text-brand-lavender">Max</span>
                  <span className="text-brand-orange">.</span>
                  <span className="text-brand-sky">dev</span>
                </>
              )}
            </span>
          </motion.a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-[1rem] transition-colors cursor-pointer ${
                  activeSection === link.href.replace("#", "")
                    ? isClassic
                      ? "text-text-primary"
                      : "text-brand-pink"
                    : "text-muted-foreground hover:text-text-primary"
                }`}
                style={{
                  fontFamily: "var(--t-font-heading)",
                  fontWeight: 700,
                  borderRadius: isClassic ? "0.375rem" : "0.75rem",
                  cursor: isClassic ? "default" : "pointer",
                }}
                whileHover={{ scale: isClassic ? 1.04 : 1.1, y: isClassic ? -1 : -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                {activeSection === link.href.replace("#", "") && (
                  <motion.div
                    layoutId="nav-bubble"
                    className="absolute inset-0 border"
                    style={{
                      borderRadius: isClassic ? "0.375rem" : "0.75rem",
                      borderStyle: "solid",
                      borderColor: isClassic ? "var(--border)" : "var(--brand-pink)",
                      borderWidth: isClassic ? "1px" : "2px",
                      backgroundColor: isClassic
                        ? "var(--card)"
                        : "rgba(var(--brand-pink-rgb, 244, 114, 182), 0.05)",
                      opacity: isClassic ? 1 : 0.4,
                      filter: "var(--t-filter)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
                <span className="relative z-10">
                  {showEmojis ? `${link.emoji} ` : ""}
                  {link.label}
                </span>
              </motion.a>
            ))}
          </div>

          <motion.button
            type="button"
            aria-controls="mobile-navigation"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            className="md:hidden p-2 cursor-pointer"
            style={{ color: isClassic ? "var(--text-primary)" : "var(--brand-orange)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.8, rotate: 90 }}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -50, rotate: -5 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
                  onClick={() => setMobileOpen(false)}
                  className="text-left text-[1.6rem] py-3 px-4 text-text-primary hover:text-text-secondary transition-colors cursor-pointer border border-transparent"
                  style={{
                    fontFamily: "var(--t-font-heading)",
                    fontWeight: 700,
                    borderStyle: "solid",
                    borderRadius: isClassic ? "0.375rem" : "1rem",
                  }}
                >
                  {!isClassic && `${link.emoji} `}
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
