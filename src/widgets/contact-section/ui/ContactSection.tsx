import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { SectionDivider } from "@/shared/ui";
import { colors, useTheme } from "@/shared/config";
import { ContactForm } from "@/features/send-message";
import { contactInfo, socials } from "../model/data";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { isCrayon, isClassic } = useTheme();
  const TF = "var(--t-filter)";
  const BS = "var(--t-border-style)" as any;
  const rad = isClassic ? "0.375rem" : undefined;

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <SectionDivider color={isClassic ? "var(--border)" : colors.lime} />
      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, type: "spring" }} className="text-center mb-16">
          {!isClassic && (
            <motion.span initial={{ scale: 0, rotate: -180 }} animate={isInView ? { scale: 1, rotate: 0 } : {}} transition={{ type: "spring", stiffness: 200, delay: 0.2 }} className="inline-block text-[3rem] mb-3">💬</motion.span>
          )}
          <h2 className="text-[2.6rem] sm:text-[3.2rem] mb-4 text-text-primary" style={{ fontFamily: "var(--t-font-heading)", fontWeight: 700 }}>
            {isClassic ? "Давайте общаться" : <>Давайте <span className="text-brand-lime">общаться!</span></>}
          </h2>
          {!isClassic && (
            <svg viewBox="0 0 200 8" className="w-32 h-3 mx-auto">
              <motion.path d={isCrayon ? "M5 4 Q 25 1 50 5 Q 75 8 100 3 Q 125 0 150 5 Q 175 8 195 4" : "M5 4 L195 4"}
                stroke={colors.lime} strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray={isCrayon ? "6 3" : "none"}
                initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 1, delay: 0.3 }} />
            </svg>
          )}
          <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
            className="text-[1.05rem] text-muted-foreground mt-4 max-w-lg mx-auto" style={{ fontFamily: "var(--t-font-body)" }}>
            Ищу удалённую работу с полным рабочим днём, любой часовой пояс.{!isClassic && " 🤝"}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2, type: "spring" }} className="lg:col-span-2 space-y-6">
            <p className="text-[1.05rem] text-muted-foreground leading-relaxed" style={{ fontFamily: "var(--t-font-body)" }}>
              Готов обсудить ваш проект, предложить решение или просто познакомиться.{isClassic ? " Быстрее всего отвечаю в Telegram." : " Быстрее всего отвечаю в Telegram! 🤗"}
            </p>
            <div className="space-y-3">
              {contactInfo.map((item, i) => (
                <motion.a
                  key={item.label} href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
                  whileHover={{ x: isClassic ? 4 : 12, scale: isClassic ? 1.02 : 1.04, rotate: isCrayon ? 1 : 0 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-4 p-4 no-underline group"
                  style={{
                    borderStyle: BS,
                    borderWidth: isClassic ? "1px" : "2px",
                    borderColor: isClassic ? "var(--border)" : `${item.color}20`,
                    backgroundColor: isClassic ? "transparent" : `${item.color}04`,
                    filter: TF,
                    borderRadius: rad || "1rem",
                    cursor: isClassic ? "default" : "pointer",
                  }}
                >
                  <motion.div
                    className="w-12 h-12 flex items-center justify-center"
                    style={{
                      backgroundColor: isClassic ? "var(--card)" : `${item.color}10`,
                      borderRadius: rad || "1rem",
                    }}
                    whileHover={isClassic ? {} : { scale: 1.2, rotate: [0, -15, 15, 0] }}
                  >
                    {isClassic ? (
                      <item.icon size={20} style={{ color: "var(--text-secondary)" }} />
                    ) : (
                      <span className="text-[1.5rem]">{item.emoji}</span>
                    )}
                  </motion.div>
                  <div className="flex-1">
                    <div
                      className="text-[0.75rem] uppercase tracking-[0.15em]"
                      style={{
                        fontFamily: "var(--t-font-body)",
                        color: isClassic ? "var(--muted-foreground)" : item.color,
                      }}
                    >
                      {item.label}
                    </div>
                    <div className="text-[0.95rem] text-text-primary transition-colors" style={{ fontFamily: "var(--t-font-heading)", fontWeight: 700 }}>
                      {item.value}
                    </div>
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-text-secondary">→</span>
                </motion.a>
              ))}
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.8 }} className="flex gap-3">
              {socials.map((social) => (
                <motion.a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: isClassic ? -3 : -8, scale: isClassic ? 1.05 : 1.2, rotate: isClassic ? 0 : 10 }}
                  whileTap={{ scale: 0.85, rotate: isClassic ? 0 : -15 }}
                  className="flex items-center justify-center"
                  style={{
                    borderStyle: BS,
                    borderWidth: isClassic ? "1px" : "2px",
                    borderColor: isClassic ? "var(--border)" : `${social.color}30`,
                    backgroundColor: isClassic ? "transparent" : `${social.color}08`,
                    color: isClassic ? "var(--text-secondary)" : social.color,
                    width: 52, height: 52, filter: TF,
                    borderRadius: rad || "1rem",
                    cursor: isClassic ? "default" : "pointer",
                  }}
                >
                  <social.icon size={22} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.3, type: "spring" }} className="lg:col-span-3">
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
