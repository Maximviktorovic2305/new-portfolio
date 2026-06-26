import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { SectionDivider } from "@/shared/ui";
import { colors, useTheme } from "@/shared/config";
import { stats, highlights, hobbies } from "../model/data";
import avatarImg from "@/assets/6293143439d16f15fc3aaacb14f69fad1ed0a5b3.png";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { isCrayon, isClassic } = useTheme();
  const TF = "var(--t-filter)";
  const BS = "var(--t-border-style)" as any;
  const rad = isClassic ? "0.375rem" : undefined;

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <SectionDivider color={isClassic ? "var(--border)" : colors.teal} />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, type: "spring" }}
          className="text-center mb-16"
        >
          {!isClassic && (
            <motion.span
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ type: "spring", stiffness: 300, delay: 0.05 }}
              className="inline-block text-[3rem] mb-3"
            >
              🧑‍💻
            </motion.span>
          )}
          <h2
            className="text-[2.6rem] sm:text-[3.2rem] mb-4 text-text-primary"
            style={{ fontFamily: "var(--t-font-heading)", fontWeight: 700 }}
          >
            Кто {isClassic ? "" : <span className="text-brand-teal">я</span>}{isClassic && "я"} такой?
          </h2>
          {!isClassic && (
            <motion.div initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}} transition={{ duration: 0.4, delay: 0.1 }}>
              <svg viewBox="0 0 200 8" className="w-32 h-3 mx-auto">
                <motion.path
                  d={isCrayon ? "M5 4 Q 25 1 50 5 Q 75 8 100 3 Q 125 0 150 5 Q 175 8 195 4" : "M5 4 L195 4"}
                  stroke={colors.teal}
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={isCrayon ? "6 3" : "none"}
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </svg>
            </motion.div>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-[auto_1fr] gap-10 items-start">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -60, rotate: isClassic ? 0 : -8 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: isCrayon ? -2 : 0 } : {}}
            transition={{ duration: 0.4, type: "spring" }}
            className="relative w-56 sm:w-64 mx-auto lg:mx-0 shrink-0"
          >
            <div
              className="relative overflow-hidden group"
              style={{
                borderStyle: BS,
                borderWidth: isClassic ? "1px" : "2px",
                borderColor: isClassic ? "var(--border)" : `${colors.lavender}40`,
                filter: TF,
                borderRadius: rad || "1.5rem",
              }}
            >
              <motion.div whileHover={{ scale: isClassic ? 1.02 : 1.05, rotate: isCrayon ? 2 : 0 }} transition={{ duration: 0.15 }}>
                <img src={avatarImg} alt="Максим" className="w-full aspect-[4/5] object-cover object-top" />
              </motion.div>
              {!isClassic && (
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              )}
            </div>
            {isCrayon && (
              <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -top-3 -right-3 text-[2rem] select-none">
                📌
              </motion.div>
            )}
          </motion.div>

          {/* Text + hobbies */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[1.15rem] text-text-secondary leading-relaxed mb-4"
              style={{ fontFamily: "var(--t-font-body)" }}
            >
              Привет! Я <span className="text-text-primary" style={{ fontFamily: "var(--t-font-heading)", fontWeight: 700 }}>Максим</span> — fullstack-разработчик
              с 5+ годами коммерческого опыта. Работаю на полном стеке: от интерактивных
              интерфейсов на React/Vue до высоконагруженного бэкенда на Node.js и Golang{!isClassic && " 💪"}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="text-[1.15rem] text-text-secondary leading-relaxed mb-4"
              style={{ fontFamily: "var(--t-font-body)" }}
            >
              Реализовал 40+ проектов — от финтех-платформ до маркетплейсов и админ-панелей.{isClassic ? " Люблю чистую архитектуру и оптимизацию." : " Люблю чистую архитектуру и оптимизацию 🔥"}
            </motion.p>

            {/* Hobbies */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.3, delay: 0.25 }} className="flex flex-wrap gap-2">
              {hobbies.map((h) => (
                <motion.span
                  key={h.label}
                  whileHover={{ scale: isClassic ? 1.04 : 1.12, y: isClassic ? -2 : -5, rotate: isCrayon ? 5 : 0 }}
                  whileTap={{ scale: 0.92 }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-[0.85rem] cursor-default"
                >
                  <h.icon size={14} /> {h.label}
                </motion.span>
              ))}
            </motion.div>

            {/* Remote badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 mt-4 p-3"
              style={{
                borderStyle: BS,
                borderWidth: isClassic ? "1px" : "2px",
                borderColor: isClassic ? "var(--border)" : `${colors.lime}30`,
                backgroundColor: isClassic ? "transparent" : `${colors.lime}05`,
                filter: TF,
                borderRadius: rad || "0.75rem",
              }}
            >
              {!isClassic && (
                <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-[1.2rem]">
                  🟢
                </motion.div>
              )}
              <span
                className="text-[0.9rem]"
                style={{
                  fontFamily: "var(--t-font-heading)", fontWeight: 700,
                  color: isClassic ? "var(--text-secondary)" : "var(--brand-lime)",
                }}
              >
                Открыт к удалённой работе{!isClassic && "!"}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Highlights + Stats */}
        <div className="mt-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20, scale: 0.9, rotate: isCrayon ? (i % 2 === 0 ? -3 : 3) : 0 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1, rotate: isCrayon ? (i % 2 === 0 ? -1 : 1) : 0 } : {}}
                transition={{ duration: 0.3, delay: 0.25 + i * 0.05, type: "spring" }}
                whileHover={{ y: isClassic ? -4 : -10, scale: isClassic ? 1.02 : 1.05, rotate: 0 }}
                whileTap={{ scale: 0.97 }}
                className="p-5 cursor-default group relative overflow-hidden"
                style={{
                  borderStyle: BS,
                  borderWidth: isClassic ? "1px" : "2px",
                  borderColor: isClassic ? "var(--border)" : `${item.color}30`,
                  backgroundColor: isClassic ? "transparent" : `${item.color}06`,
                  filter: TF,
                  borderRadius: rad || "1rem",
                }}
              >
                <motion.div
                  className="relative mb-2"
                  whileHover={isClassic ? {} : { rotate: [0, -15, 15, 0], scale: 1.3, transition: { duration: 0.5 } }}
                >
                  <item.icon size={24} style={{ color: isClassic ? "var(--text-secondary)" : item.color }} />
                </motion.div>
                <div className="text-[1rem] text-text-primary mb-1" style={{ fontFamily: "var(--t-font-heading)", fontWeight: 700 }}>
                  {item.title}
                </div>
                <div className="text-[0.8rem] text-text-secondary" style={{ fontFamily: "var(--t-font-body)" }}>
                  {item.desc}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.3, delay: 0.4 }} className="grid grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0, rotate: isClassic ? 0 : -20 }}
                animate={isInView ? { opacity: 1, scale: 1, rotate: isCrayon ? (i % 2 === 0 ? 2 : -2) : 0 } : {}}
                transition={{ delay: 0.45 + i * 0.05, type: "spring", stiffness: 300 }}
                whileHover={{ scale: isClassic ? 1.04 : 1.15, y: isClassic ? -3 : -8, rotate: 0 }}
                whileTap={{ scale: 0.9, rotate: isClassic ? 0 : -10 }}
                className="text-center p-4 cursor-default"
                style={{
                  borderStyle: BS,
                  borderWidth: isClassic ? "1px" : "2px",
                  borderColor: isClassic ? "var(--border)" : `${stat.color}30`,
                  backgroundColor: isClassic ? "transparent" : `${stat.color}06`,
                  filter: TF,
                  borderRadius: rad || "1rem",
                }}
              >
                {!isClassic && (
                  <motion.div className="text-[1.3rem] mb-1" whileHover={{ scale: 1.4, rotate: [0, 20, -20, 0], transition: { duration: 0.4 } }}>
                    {stat.emoji}
                  </motion.div>
                )}
                <div
                  className="text-[1.5rem] sm:text-[1.8rem]"
                  style={{
                    fontFamily: "var(--t-font-heading)", fontWeight: 700,
                    color: isClassic ? "var(--text-primary)" : stat.color,
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-[0.7rem] text-text-secondary uppercase tracking-wider" style={{ fontFamily: "var(--t-font-body)" }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
