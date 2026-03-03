import { motion } from "motion/react";
import { ChevronDown, Github, Mail, MessageCircle, Rocket } from "lucide-react";
import { ParticleField } from "@/shared/ui";
import { colors } from "@/shared/config";
import { TypeWriter } from "./TypeWriter";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParticleField />

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 30, 0],
          borderRadius: ["40% 60% 70% 30%", "60% 40% 30% 70%", "40% 60% 70% 30%"],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-[25rem] h-[25rem] bg-brand-pink/[0.06] blur-[6.25rem]"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -40, 0],
          borderRadius: ["60% 40% 30% 70%", "40% 60% 70% 30%", "60% 40% 30% 70%"],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        className="absolute bottom-1/3 right-1/4 w-[21.875rem] h-[21.875rem] bg-brand-teal/[0.06] blur-[6.25rem]"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, delay: 4 }}
        className="absolute top-1/3 right-1/3 w-[18.75rem] h-[18.75rem] bg-brand-orange/[0.04] blur-[6.25rem] rounded-full"
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full border-2 border-brand-teal/30 bg-brand-teal/10"
        >
          <motion.div
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Rocket size={16} className="text-brand-teal" />
          </motion.div>
          <span
            className="text-[0.85rem] text-brand-teal tracking-wide"
            style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 700 }}
          >
            Fullstack Developer &bull; Remote
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="text-[2.4rem] sm:text-[3.4rem] md:text-[4.5rem] leading-[1.1] tracking-tight mb-6"
          style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 800 }}
        >
          <span className="text-white">Привет! </span>
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            className="inline-block origin-bottom-right"
          >
            {"👋"}
          </motion.span>
          <br />
          <span className="text-white">Я </span>
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-brand-lavender via-brand-teal to-brand-sky bg-clip-text text-transparent">
              Максим
            </span>
            <motion.svg
              viewBox="0 0 300 12"
              className="absolute -bottom-2 left-0 w-full"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
            >
              <motion.path
                d="M5 6 Q 75 0 150 6 Q 225 12 295 6"
                stroke={colors.lavender}
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
              />
            </motion.svg>
          </span>
        </motion.h1>

        {/* Typing text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-[1.1rem] sm:text-[1.4rem] mb-8"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}
        >
          <TypeWriter
            texts={[
              "React & Next.js",
              "Vue.js & Nuxt.js",
              "Node.js & NestJS",
              "TypeScript & Golang",
              "PostgreSQL & MongoDB",
              "Docker & CI/CD",
            ]}
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-[1rem] sm:text-[1.1rem] text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ fontWeight: 500 }}
        >
          Fullstack-разработчик с 4+ годами коммерческого опыта. Строю
          высоконагруженные веб-приложения от архитектуры до деплоя.
          Открыт к удалённой работе, любой часовой пояс ✨
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
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ scale: 1.08, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-brand-teal text-white rounded-2xl text-[0.95rem] tracking-wide cursor-pointer no-underline shadow-[0_0.375rem_1.5625rem_rgba(20,184,166,0.3)] hover:bg-brand-teal-hover transition-colors"
            style={{ fontWeight: 800 }}
          >
            🚀 Смотреть проекты
          </motion.a>
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ scale: 1.08, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-brand-teal/40 text-brand-teal rounded-2xl text-[0.95rem] tracking-wide hover:bg-brand-teal/10 transition-colors cursor-pointer no-underline"
            style={{ fontWeight: 800 }}
          >
            💬 Связаться
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
            { icon: Github, href: "https://github.com/Maximviktorovic2305", color: colors.lavender },
            { icon: MessageCircle, href: "https://t.me/maximviktorovic2305", color: colors.teal },
            { icon: Mail, href: "mailto:Maximviktorovic@mail.ru", color: colors.pink },
          ].map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -6, scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all cursor-pointer"
              style={{
                borderColor: `${social.color}33`,
                backgroundColor: `${social.color}10`,
                color: social.color,
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
          className="flex flex-col items-center gap-2 text-brand-lavender"
        >
          <span className="text-[0.75rem] tracking-wider" style={{ fontWeight: 700 }}>
            ⬇️ Скролл
          </span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}