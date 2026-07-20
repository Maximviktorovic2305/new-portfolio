import { motion } from "motion/react";
import { ChevronDown, GitFork, Mail, MessageCircle } from "lucide-react";
import { ParticleField } from "@/shared/ui";
import { colors, useTheme } from "@/shared/config";
import { TypeWriter } from "./TypeWriter";

const heroTechnologies = [
  "React & Next.js",
  "Vue.js & Nuxt.js",
  "Node.js & NestJS",
  "TypeScript & Golang",
  "PostgreSQL & MongoDB",
  "Docker & CI/CD",
] as const;

export function HeroSection() {
  const { isCrayon, isClassic } = useTheme();
  const TF = "var(--t-filter)";
  const BS = "solid";

  /* Classic uses neutral muted tones instead of brand colors */
  const cls = {
    accent: "var(--text-primary)",
    muted: "var(--muted-foreground)",
    border: "var(--border)",
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {!isClassic && !isCrayon && <ParticleField />}

      {!isClassic && (
        <>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 20, 0],
              borderRadius: ["40% 60% 70% 30%", "60% 40% 30% 70%", "40% 60% 70% 30%"],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-[20rem] h-[20rem] bg-brand-pink/[0.06] blur-[5rem]"
          />
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, -30, 0],
              borderRadius: ["60% 40% 30% 70%", "40% 60% 70% 30%", "60% 40% 30% 70%"],
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            className="absolute bottom-1/3 right-1/4 w-[18rem] h-[18rem] bg-brand-teal/[0.06] blur-[5rem]"
          />
        </>
      )}

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
          className={`inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full border ${isClassic ? "border-border" : "border-2 border-brand-teal/30 bg-brand-teal/5"}`}
          style={{ borderStyle: BS, filter: TF }}
        >
          {!isClassic && (
            <motion.span
              animate={{ rotate: [0, 25, -25, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[1.2rem]"
            >
              {isCrayon ? "✦" : "🚀"}
            </motion.span>
          )}
          <span
            className="text-[1rem] tracking-wide"
            style={{
              fontFamily: "var(--t-font-heading)",
              fontWeight: 700,
              color: isClassic ? cls.muted : undefined,
            }}
          >
            {isClassic ? (
              "Fullstack Developer · Remote"
            ) : (
              <span className="text-brand-teal">Fullstack Developer &bull; Remote</span>
            )}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="text-[2.6rem] sm:text-[3.6rem] md:text-[5rem] leading-[1.1] tracking-tight mb-6 text-text-primary"
          style={{ fontFamily: "var(--t-font-heading)", fontWeight: 700 }}
        >
          Привет!{" "}
          {!isClassic && (
            <motion.span
              animate={{ rotate: [0, 20, -15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              className="inline-block origin-bottom-right"
            >
              👋
            </motion.span>
          )}
          <br />Я{" "}
          <span className="relative inline-block">
            {isClassic ? (
              <span className="text-text-primary">Максим</span>
            ) : (
              <span className="relative z-10 bg-gradient-to-r from-brand-lavender via-brand-teal to-brand-sky bg-clip-text text-transparent">
                Максим
              </span>
            )}
            {!isClassic && (
              <motion.svg
                viewBox="0 0 300 20"
                className="absolute -bottom-2 left-0 w-full"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
              >
                <motion.path
                  d={isCrayon ? "M5 9 Q 75 2 150 9 Q 225 16 295 8" : "M5 6 Q 75 0 150 6 Q 225 12 295 6"}
                  stroke={colors.orange}
                  strokeWidth={isCrayon ? "4" : "3"}
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1 }}
                />
              </motion.svg>
            )}
          </span>
        </motion.h1>

        {/* Typing text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-[1.2rem] sm:text-[1.4rem] mb-8"
          style={{
            fontFamily: isCrayon ? "var(--t-font-body)" : "var(--t-font-mono)",
            fontWeight: 600,
            color: isClassic ? "var(--muted-foreground)" : undefined,
          }}
        >
          <TypeWriter texts={heroTechnologies} />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-[1.05rem] sm:text-[1.15rem] text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ fontFamily: "var(--t-font-body)" }}
        >
          Fullstack-разработчик с 5+ годами коммерческого опыта. Строю высоконагруженные веб-приложения от
          архитектуры до деплоя.
          {isClassic
            ? " Открыт к удалённой работе, любой часовой пояс."
            : " Открыт к удалённой работе, любой часовой пояс ✨"}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: isClassic ? 1.03 : 1.05, rotate: isClassic || isCrayon ? 0 : -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 text-[1rem] tracking-wide cursor-pointer no-underline border"
            style={{
              fontFamily: "var(--t-font-heading)",
              fontWeight: 700,
              borderStyle: BS,
              filter: TF,
              borderRadius: isClassic ? "0.375rem" : "1rem",
              cursor: isClassic ? "default" : "pointer",
              boxShadow: isCrayon ? "0 14px 32px rgba(22, 159, 145, 0.2)" : undefined,
              ...(isClassic
                ? {
                    backgroundColor: "var(--text-primary)",
                    color: "var(--background)",
                    borderColor: "var(--text-primary)",
                  }
                : {
                    backgroundColor: "var(--brand-teal)",
                    color: "white",
                    borderColor: "rgba(20,184,166,0.5)",
                    borderWidth: "2px",
                  }),
            }}
          >
            {isClassic ? "Смотреть проекты" : isCrayon ? "Смотреть проекты" : "🚀 Смотреть проекты"}
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: isClassic ? 1.03 : 1.05, rotate: isClassic || isCrayon ? 0 : 2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 text-[1rem] tracking-wide cursor-pointer no-underline border"
            style={{
              fontFamily: "var(--t-font-heading)",
              fontWeight: 700,
              borderStyle: BS,
              filter: TF,
              borderRadius: isClassic ? "0.375rem" : "1rem",
              cursor: isClassic ? "default" : "pointer",
              ...(isClassic
                ? {
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                    backgroundColor: "transparent",
                  }
                : { borderColor: "rgba(20,184,166,0.4)", color: "var(--brand-teal)", borderWidth: "2px" }),
            }}
          >
            {isClassic || isCrayon ? "Связаться" : "💬 Связаться"}
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex items-center justify-center gap-4"
        >
          {[
            {
              icon: GitFork,
              label: "GitHub",
              href: "https://github.com/Maximviktorovic2305",
              color: colors.lavender,
            },
            {
              icon: MessageCircle,
              label: "Telegram",
              href: "https://t.me/maximviktorovic2305",
              color: colors.teal,
            },
            { icon: Mail, label: "Email", href: "mailto:Maximviktorovic@mail.ru", color: colors.pink },
          ].map((social) => (
            <motion.a
              aria-label={social.label}
              key={social.href}
              href={social.href}
              target={social.href.startsWith("https:") ? "_blank" : undefined}
              rel={social.href.startsWith("https:") ? "noopener noreferrer" : undefined}
              whileHover={{
                y: isClassic ? -3 : -5,
                scale: isClassic ? 1.05 : 1.1,
                rotate: isClassic || isCrayon ? 0 : 5,
              }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 flex items-center justify-center transition-all cursor-pointer"
              style={{
                borderStyle: BS,
                borderWidth: isClassic ? "1px" : "2px",
                borderColor: isClassic ? "var(--border)" : `${social.color}40`,
                backgroundColor: isClassic ? "transparent" : isCrayon ? "var(--card)" : `${social.color}10`,
                color: isClassic ? "var(--text-secondary)" : social.color,
                filter: TF,
                borderRadius: isClassic ? "0.375rem" : "1rem",
                cursor: isClassic ? "default" : "pointer",
                boxShadow: isCrayon ? `0 10px 28px ${social.color}16` : undefined,
              }}
            >
              <social.icon size={22} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
          style={{ color: isClassic ? "var(--muted-foreground)" : "var(--brand-orange)" }}
        >
          <span
            className="text-[0.9rem] tracking-wider"
            style={{ fontFamily: "var(--t-font-heading)", fontWeight: 700 }}
          >
            {isClassic ? "Скролл" : "⬇️ Скролл"}
          </span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
