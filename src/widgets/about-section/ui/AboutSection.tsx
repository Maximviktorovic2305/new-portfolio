import { AnimatePresence, motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { SectionDivider } from "@/shared/ui";
import { colors, useTheme } from "@/shared/config";
import { stats, highlights, hobbies } from "../model/data";
import avatarImg from "@/assets/6293143439d16f15fc3aaacb14f69fad1ed0a5b3.png";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredHighlight, setHoveredHighlight] = useState<number | null>(null);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
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
              initial={{ scale: 0, rotate: -90 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ type: "spring", stiffness: 300, delay: 0.05 }}
              className="inline-block text-[2.4rem] mb-3"
            >
              {isCrayon ? "✦" : "🧑‍💻"}
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
                  strokeDasharray="none"
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
            initial={{ opacity: 0, x: -60, rotate: isClassic || isCrayon ? 0 : -8 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: isCrayon ? -1 : 0 } : {}}
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
                boxShadow: isCrayon ? `0 22px 54px ${colors.lavender}20` : undefined,
              }}
            >
              <motion.div whileHover={{ scale: isClassic ? 1.02 : 1.04, rotate: 0 }} transition={{ duration: 0.15 }}>
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
                  whileHover={{ scale: isClassic ? 1.04 : isCrayon ? 1.05 : 1.12, y: isClassic ? -2 : -4, rotate: 0 }}
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
                initial={{ opacity: 0, y: 30, scale: 0.9, rotate: isCrayon ? [-2, 1.4, -1, 1.8][i % 4] : 0 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1, rotate: isCrayon ? [-1.15, 0.75, -0.55, 1][i % 4] : 0 } : {}}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.05, type: "spring" }}
                whileHover={{ rotate: 0, y: isCrayon ? -4 : 0, scale: isClassic ? 1.02 : isCrayon ? 1.035 : 1.05 }}
                whileTap={{ scale: 0.97 }}
                onMouseEnter={() => setHoveredHighlight(i)}
                onMouseLeave={() => setHoveredHighlight(null)}
                className="relative overflow-hidden rounded-3xl border-2 p-6 cursor-default"
                style={{
                  borderStyle: BS,
                  borderWidth: isClassic ? "1px" : "2px",
                  borderColor: isClassic ? "var(--border)" : hoveredHighlight === i ? `${item.color}50` : `${item.color}15`,
                  backgroundColor: isClassic ? "transparent" : hoveredHighlight === i ? `${item.color}10` : `${item.color}05`,
                  filter: TF,
                  borderRadius: rad || "1.5rem",
                  boxShadow: isClassic
                    ? "none"
                    : isCrayon
                      ? hoveredHighlight === i
                        ? `0 18px 42px ${item.color}1f`
                        : `0 12px 32px ${item.color}0f`
                      : hoveredHighlight === i
                        ? `0 8px 35px ${item.color}20`
                        : "none",
                  transition: "border-color 0.3s, background-color 0.3s, box-shadow 0.3s",
                }}
              >
                <div className="relative z-10 flex h-full flex-col items-center text-center gap-3">
                  <motion.div
                    animate={hoveredHighlight === i ? { y: [0, -3, 0], scale: [1, 1.1, 1] } : { y: 0, scale: 1 }}
                    transition={hoveredHighlight === i ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
                    className="flex h-10 items-center justify-center"
                  >
                  <item.icon
                    size={28}
                    style={{ color: isClassic ? "var(--text-secondary)" : item.color }}
                  />
                  </motion.div>
                  <div className="text-[1.05rem] text-text-primary" style={{ fontFamily: "var(--t-font-heading)", fontWeight: 700 }}>
                    {item.title}
                  </div>
                  <div className="text-[0.8rem] text-text-secondary leading-relaxed" style={{ fontFamily: "var(--t-font-body)" }}>
                    {item.desc}
                  </div>
                </div>

                <AnimatePresence>
                  {hoveredHighlight === i && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute bottom-0 left-0 right-0 h-[0.1875rem] origin-center rounded-full"
                      style={{ background: `linear-gradient(90deg, transparent, ${item.color}, ${colors.orange}, ${item.color}, transparent)` }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.3, delay: 0.4 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9, rotate: isCrayon ? [1.6, -1.4, 1, -1.8][i % 4] : 0 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1, rotate: isCrayon ? [0.8, -0.7, 0.5, -0.9][i % 4] : 0 } : {}}
                transition={{ duration: 0.4, delay: 0.45 + i * 0.05, type: "spring" }}
                whileHover={{ rotate: 0, y: isCrayon ? -4 : 0, scale: isClassic ? 1.02 : isCrayon ? 1.035 : 1.05 }}
                whileTap={{ scale: 0.97, rotate: 0 }}
                onMouseEnter={() => setHoveredStat(i)}
                onMouseLeave={() => setHoveredStat(null)}
                className="relative overflow-hidden rounded-3xl border-2 p-5 text-center cursor-default"
                style={{
                  borderStyle: BS,
                  borderWidth: isClassic ? "1px" : "2px",
                  borderColor: isClassic ? "var(--border)" : hoveredStat === i ? `${stat.color}50` : `${stat.color}15`,
                  backgroundColor: isClassic ? "transparent" : hoveredStat === i ? `${stat.color}10` : `${stat.color}05`,
                  filter: TF,
                  borderRadius: rad || "1.5rem",
                  boxShadow: isClassic
                    ? "none"
                    : isCrayon
                      ? hoveredStat === i
                        ? `0 18px 42px ${stat.color}1f`
                        : `0 12px 32px ${stat.color}0f`
                      : hoveredStat === i
                        ? `0 8px 35px ${stat.color}20`
                        : "none",
                  transition: "border-color 0.3s, background-color 0.3s, box-shadow 0.3s",
                }}
              >
                {!isClassic && (
                  <motion.div
                    animate={hoveredStat === i ? { y: [0, -3, 0], scale: [1, 1.12, 1] } : { y: 0, scale: 1 }}
                    transition={hoveredStat === i ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
                    className="relative z-10 text-[1.5rem] mb-2"
                  >
                    {stat.emoji}
                  </motion.div>
                )}
                <div
                  className="relative z-10 text-[1.5rem] sm:text-[1.8rem]"
                  style={{
                    fontFamily: "var(--t-font-heading)", fontWeight: 700,
                    color: isClassic ? "var(--text-primary)" : stat.color,
                  }}
                >
                  {stat.value}
                </div>
                <div className="relative z-10 text-[0.7rem] text-text-secondary uppercase tracking-wider" style={{ fontFamily: "var(--t-font-body)" }}>
                  {stat.label}
                </div>

                <AnimatePresence>
                  {hoveredStat === i && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute bottom-0 left-0 right-0 h-[0.1875rem] origin-center rounded-full"
                      style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, ${colors.orange}, ${stat.color}, transparent)` }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
