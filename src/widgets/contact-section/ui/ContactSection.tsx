import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { SectionDivider } from "@/shared/ui";
import { colors } from "@/shared/config";
import { ContactForm } from "@/features/send-message";
import { contactInfo, socials } from "../model/data";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <SectionDivider color={colors.lime} />

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-block text-[2.5rem] mb-3"
          >
            {"\u{1F4AC}"}
          </motion.span>
          <h2
            className="text-[2.5rem] sm:text-[3rem] mb-4"
            style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 800 }}
          >
            <span className="text-white">Давайте </span>
            <span className="text-brand-lime">общаться!</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-1.5 bg-gradient-to-r from-brand-lime to-brand-teal mx-auto rounded-full origin-left"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-[1rem] text-muted-foreground mt-4 max-w-lg mx-auto"
            style={{ fontWeight: 500 }}
          >
            Ищу удалённую работу с полным рабочим днём, любой часовой пояс.
            Зарплатные ожидания от 100 000 {"₽"} {"🤝"}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            className="lg:col-span-2 space-y-6"
          >
            <p className="text-[1rem] text-muted-foreground leading-relaxed" style={{ fontWeight: 500 }}>
              Готов обсудить ваш проект, предложить решение или просто познакомиться.
              Быстрее всего отвечаю в Telegram! {"\u{1F917}"}
            </p>

            <div className="space-y-3">
              {contactInfo.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
                  whileHover={{
                    x: 12,
                    scale: 1.04,
                    transition: { type: "spring", stiffness: 400, damping: 15 },
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer no-underline group"
                  style={{
                    borderColor: `${item.color}15`,
                    backgroundColor: `${item.color}06`,
                    transition: "border-color 0.25s, background-color 0.25s, box-shadow 0.25s",
                  }}
                  onHoverStart={(e) => {
                    const card = (e.target as HTMLElement).closest("a") as HTMLElement;
                    if (card) {
                      card.style.borderColor = `${item.color}40`;
                      card.style.backgroundColor = `${item.color}12`;
                      card.style.boxShadow = `0 8px 30px ${item.color}20, inset 0 0 0 1px ${item.color}10`;
                    }
                  }}
                  onHoverEnd={(e) => {
                    const card = (e.target as HTMLElement).closest("a") as HTMLElement;
                    if (card) {
                      card.style.borderColor = `${item.color}15`;
                      card.style.backgroundColor = `${item.color}06`;
                      card.style.boxShadow = "none";
                    }
                  }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-[1.3rem] relative overflow-hidden"
                    style={{ backgroundColor: `${item.color}15` }}
                    whileHover={{
                      scale: 1.2,
                      rotate: [0, -10, 10, 0],
                      transition: { rotate: { duration: 0.4 }, scale: { duration: 0.2 } },
                    }}
                  >
                    {item.emoji}
                  </motion.div>
                  <div className="flex-1">
                    <div
                      className="text-[0.7rem] uppercase tracking-[0.15em]"
                      style={{ fontWeight: 700, color: item.color }}
                    >
                      {item.label}
                    </div>
                    <div className="text-[0.9rem] text-text-secondary group-hover:text-white transition-colors duration-200" style={{ fontWeight: 600 }}>
                      {item.value}
                    </div>
                  </div>
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: item.color }}
                    initial={false}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="flex gap-3"
            >
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    y: -8,
                    scale: 1.2,
                    boxShadow: `0 12px 28px ${social.color}30`,
                    transition: { type: "spring", stiffness: 400, damping: 12 },
                  }}
                  whileTap={{ scale: 0.85, rotate: -15 }}
                  className="rounded-2xl border-2 flex items-center justify-center cursor-pointer"
                  style={{
                    borderColor: `${social.color}25`,
                    backgroundColor: `${social.color}10`,
                    color: social.color,
                    width: 52,
                    height: 52,
                    transition: "border-color 0.2s, background-color 0.2s",
                  }}
                  onHoverStart={(e) => {
                    const el = (e.target as HTMLElement).closest("a") as HTMLElement;
                    if (el) {
                      el.style.borderColor = `${social.color}50`;
                      el.style.backgroundColor = `${social.color}20`;
                    }
                  }}
                  onHoverEnd={(e) => {
                    const el = (e.target as HTMLElement).closest("a") as HTMLElement;
                    if (el) {
                      el.style.borderColor = `${social.color}25`;
                      el.style.backgroundColor = `${social.color}10`;
                    }
                  }}
                >
                  <social.icon size={22} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
            className="lg:col-span-3"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}