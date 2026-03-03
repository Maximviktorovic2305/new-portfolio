import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sparkles } from "lucide-react";

const navLinks = [
  { label: "Главная", href: "#hero" },
  { label: "Обо мне", href: "#about" },
  { label: "Навыки", href: "#skills" },
  { label: "Проекты", href: "#projects" },
  { label: "Контакты", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b-2 border-brand-lavender/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#hero");
            }}
            className="relative group cursor-pointer flex items-center gap-2"
            whileHover={{ scale: 1.1, rotate: -3 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles size={22} className="text-brand-orange" />
            </motion.div>
            <span
              className="text-[1.4rem]"
              style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 800 }}
            >
              <span className="text-brand-lavender">Max</span>
              <span className="text-brand-teal">.</span>
              <span className="text-brand-sky">dev</span>
            </span>
          </motion.a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`relative px-4 py-2 text-[0.9rem] rounded-xl transition-colors cursor-pointer ${
                  activeSection === link.href.replace("#", "")
                    ? "text-white"
                    : "text-muted-foreground hover:text-white"
                }`}
                style={{ fontWeight: 700 }}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                {activeSection === link.href.replace("#", "") && (
                  <motion.div
                    layoutId="nav-bubble"
                    className="absolute inset-0 bg-gradient-to-r from-brand-pink/20 to-brand-lavender/20 rounded-xl border-2 border-brand-pink/30"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
                <span className="relative z-10">
                  {link.label}
                </span>
              </motion.button>
            ))}
          </div>

          <motion.button
            className="md:hidden text-brand-pink p-2 cursor-pointer"
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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -50, rotate: -5 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-[1.6rem] py-3 px-4 text-white/80 hover:text-white transition-colors rounded-2xl hover:bg-card cursor-pointer"
                  style={{ fontWeight: 800 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}