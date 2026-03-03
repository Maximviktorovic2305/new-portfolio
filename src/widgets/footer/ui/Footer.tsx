import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative py-12 border-t-2 border-brand-lavender/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer flex items-center gap-2"
          >
            <Sparkles size={18} className="text-brand-orange" />
            <span style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 800 }}>
              <span className="text-brand-lavender">Max</span>
              <span className="text-brand-teal">.</span>
              <span className="text-brand-sky">dev</span>
            </span>
          </motion.a>

          <div className="text-[0.85rem] text-muted-foreground flex items-center gap-2" style={{ fontWeight: 600 }}>
            Сделано с{" "}
            <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              {"\u2764\uFE0F"}
            </motion.span>{" "}
            Максимом
          </div>

          <div className="text-[0.8rem] text-text-dim" style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
            &copy; 2026 {"\u2728"}
          </div>
        </div>
      </div>
    </footer>
  );
}