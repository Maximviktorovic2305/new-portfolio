import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navigation = [
  { label: "Обо мне", href: "#about" },
  { label: "Навыки", href: "#skills" },
  { label: "Проекты", href: "#projects" },
  { label: "Контакты", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const update = () => setIsScrolled(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <header
      className={`immersive-nav${isScrolled ? " immersive-nav--scrolled" : ""}${
        isOpen ? " immersive-nav--menu-open" : ""
      }`}
    >
      <a className="immersive-mark" href="#hero" aria-label="В начало страницы">
        <span className="immersive-mark__monogram" aria-hidden="true">
          MV
        </span>
        <span>
          MAXIM
          <br />
          VIKTOROVICH
        </span>
      </a>

      <nav className="immersive-nav__desktop" aria-label="Основная навигация">
        {navigation.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <button
        aria-controls="immersive-menu"
        aria-expanded={isOpen}
        className="immersive-menu-button"
        onClick={() => setIsOpen((value) => !value)}
        type="button"
      >
        <span>{isOpen ? "Закрыть" : "Меню"}</span>
        <i aria-hidden="true" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            animate={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
            aria-label="Мобильная навигация"
            className="immersive-menu"
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            id="immersive-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            {navigation.map((item, index) => (
              <motion.a
                animate={{ opacity: 1, y: 0 }}
                href={item.href}
                initial={{ opacity: 0, y: 24 }}
                key={item.href}
                onClick={() => setIsOpen(false)}
                transition={{ delay: 0.1 + index * 0.06 }}
              >
                <span>0{index + 1}</span>
                {item.label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
