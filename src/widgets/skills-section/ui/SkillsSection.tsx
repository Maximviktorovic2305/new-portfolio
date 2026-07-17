import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useCallback, useEffect } from "react";
import { SectionDivider } from "@/shared/ui";
import { colors, useTheme } from "@/shared/config";
import { skills, categories, categoryColors } from "@/entities/skill";
import type { Skill } from "@/entities/skill";

/* ═══════════════════════════════════════════
   SMOKE / EXPLOSION — only for "original"
   ═══════════════════════════════════════════ */
interface SmokePuff {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
}

function SmokeAnimation({ color, active }: { color: string; active: boolean }) {
  const [puffs, setPuffs] = useState<SmokePuff[]>([]);
  const idCounter = useRef(0);

  const spawnPuffs = useCallback(() => {
    const newPuffs: SmokePuff[] = Array.from({ length: 4 }, () => ({
      id: idCounter.current++,
      x: 15 + Math.random() * 70,
      y: 60 + Math.random() * 30,
      size: 18 + Math.random() * 28,
      delay: Math.random() * 0.3,
      duration: 1.2 + Math.random() * 0.8,
      drift: -20 + Math.random() * 40,
    }));
    setPuffs((prev) => [...prev, ...newPuffs]);
  }, []);

  useEffect(() => {
    if (!active) { setPuffs([]); return; }
    spawnPuffs();
    const interval = setInterval(spawnPuffs, 800);
    return () => clearInterval(interval);
  }, [active, spawnPuffs]);

  useEffect(() => {
    if (puffs.length > 30) setPuffs((p) => p.slice(-16));
  }, [puffs.length]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
      <AnimatePresence>
        {puffs.map((puff) => (
          <motion.div
            key={puff.id}
            initial={{ opacity: 0.6, scale: 0.3, x: `${puff.x}%`, y: `${puff.y}%` }}
            animate={{ opacity: 0, scale: 1.8, x: `${puff.x + puff.drift}%`, y: "-10%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: puff.duration, delay: puff.delay, ease: "easeOut" }}
            className="absolute rounded-full"
            style={{
              width: puff.size, height: puff.size,
              background: `radial-gradient(circle, ${color}30 0%, ${color}08 60%, transparent 100%)`,
              filter: "blur(6px)", transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </AnimatePresence>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }} exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-[10%] right-[10%] h-[45%] origin-bottom"
            style={{ background: `radial-gradient(ellipse at bottom, ${color}18 0%, ${color}08 40%, transparent 80%)` }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`spark-${i}`}
                initial={{ opacity: 1, scale: 1, x: `${30 + Math.random() * 40}%`, y: "85%" }}
                animate={{ opacity: 0, scale: 0, x: `${10 + Math.random() * 80}%`, y: `${10 + Math.random() * 40}%` }}
                transition={{ duration: 0.6 + Math.random() * 0.6, delay: i * 0.15, repeat: Infinity, repeatDelay: 0.5, ease: "easeOut" }}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: i % 2 === 0 ? colors.orange : color, boxShadow: `0 0 6px ${color}` }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════
   TOOLTIP — for crayon & original
   ═══════════════════════════════════════════ */
function SkillPopup({ skill, color }: { skill: Skill; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.9 }}
      transition={{ duration: 0.25, type: "spring", stiffness: 400, damping: 20 }}
      className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-3 w-64 p-4 rounded-2xl border-2 pointer-events-none bg-card/95 backdrop-blur-sm"
      style={{ borderStyle: "var(--t-border-style)" as any, borderColor: `${color}40`, filter: "var(--t-filter)" }}
    >
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 rotate-45 border-r-2 border-b-2 bg-card" style={{ borderStyle: "var(--t-border-style)" as any, borderColor: `${color}40` }} />
      <div className="flex items-center gap-2.5 mb-2.5">
        <span className="text-[1.5rem]">{skill.emoji}</span>
        <span className="text-[1.1rem] text-text-primary" style={{ fontFamily: "var(--t-font-heading)", fontWeight: 700 }}>{skill.name}</span>
      </div>
      <p className="text-[0.85rem] text-text-secondary leading-relaxed" style={{ fontFamily: "var(--t-font-body)" }}>{skill.description}</p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   CLASSIC SKILL CARD — minimal, narrow, no icons
   ═══════════════════════════════════════════ */
function ClassicSkillCard({ skill, color, index, isInView }: { skill: Skill; color: string; index: number; isInView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.3, delay: 0.02 * index, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative cursor-default"
    >
      {/* Tooltip on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 left-0 bottom-full mb-2 px-3 py-2 rounded-md bg-card border border-border pointer-events-none max-w-[14rem]"
          >
            <p className="text-[0.78rem] text-text-secondary leading-snug" style={{ fontFamily: "var(--t-font-body)" }}>
              {skill.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{
          x: hovered ? 6 : 0,
          backgroundColor: hovered ? `${color}0d` : "transparent",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative flex items-center gap-3 px-4 py-2.5 rounded-md border border-transparent overflow-hidden"
        style={{
          borderColor: hovered ? `${color}30` : "var(--border)",
        }}
      >
        {/* Left accent bar */}
        <motion.div
          animate={{
            scaleY: hovered ? 1 : 0,
            opacity: hovered ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 top-[20%] bottom-[20%] w-[2px] origin-center rounded-full"
          style={{ backgroundColor: color }}
        />

        {/* Name */}
        <span
          className="text-[0.88rem]"
          style={{
            fontFamily: "var(--t-font-body)",
            fontWeight: 500,
            color: hovered ? color : "var(--text-primary)",
            transition: "color 0.2s",
          }}
        >
          {skill.name}
        </span>

        {/* Category dot */}
        <span
          className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
          style={{
            backgroundColor: color,
            opacity: hovered ? 1 : 0.35,
            transition: "opacity 0.2s",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   DEFAULT SKILL CARD — crayon & original
   ═══════════════════════════════════════════ */
function DefaultSkillCard({ skill, color, index, isInView }: { skill: Skill; color: string; index: number; isInView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const { isCrayon, theme } = useTheme();
  const isOriginal = theme === "original";
  const cardRotation = isCrayon ? [-1.15, 0.75, -0.55, 1, -0.8, 0.45][index % 6] : 0;

  const shakeVariants = {
    idle: { rotate: 0, x: 0, y: 0 },
    shaking: {
      rotate: [0, -1.5, 1.5, -2, 2, -1, 1, 0],
      x: [0, -1, 1, -2, 2, -1, 1, 0],
      y: [0, 0.5, -0.5, 1, -1, 0.5, -0.5, 0],
      transition: { duration: 0.5, repeat: Infinity, repeatType: "loop" as const, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9, rotate: cardRotation * 1.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1, rotate: cardRotation } : {}}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, delay: 0.05 * (index % 6), type: "spring" }}
      whileHover={isCrayon ? { rotate: 0, y: -4 } : undefined}
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>{hovered && <SkillPopup skill={skill} color={color} />}</AnimatePresence>

      <motion.div
        variants={isOriginal ? shakeVariants : undefined}
        animate={isOriginal ? (hovered ? "shaking" : "idle") : undefined}
        whileHover={{ scale: isCrayon ? 1.035 : 1.05, rotate: 0 }}
        whileTap={{ scale: 0.97, rotate: 0 }}
        className="relative p-6 rounded-3xl border-2 cursor-pointer overflow-hidden"
        style={{
          borderStyle: "var(--t-border-style)" as any,
          borderColor: hovered ? `${color}50` : `${color}15`,
          backgroundColor: hovered ? `${color}10` : `${color}05`,
          boxShadow: isCrayon
            ? hovered
              ? `0 18px 42px ${color}1f`
              : `0 12px 32px ${color}0f`
            : hovered && isOriginal
              ? `0 8px 35px ${color}20, inset 0 -20px 40px ${color}06`
              : "none",
          filter: "var(--t-filter)",
          transition: "border-color 0.3s, background-color 0.3s, box-shadow 0.3s",
        }}
      >
        {isOriginal && <SmokeAnimation color={color} active={hovered} />}

        <div className="relative z-10 flex flex-col items-center text-center gap-3">
          <motion.div
            animate={
              hovered
                ? { scale: [1, 1.2, 1.1, 1.25, 1.15], rotate: [0, -8, 8, -5, 5, 0] }
                : { scale: 1, rotate: 0 }
            }
            transition={hovered ? { duration: 0.8, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
            className="text-[2.2rem] select-none"
          >
            {skill.emoji}
          </motion.div>
          <span className="text-text-primary text-[1.05rem]" style={{ fontFamily: "var(--t-font-heading)", fontWeight: 700 }}>
            {skill.name}
          </span>
          <span
            className="text-[0.7rem] px-3 py-1 rounded-full uppercase tracking-wider border"
            style={{ fontFamily: "var(--t-font-body)", fontWeight: 700, color, backgroundColor: `${color}12`, borderColor: `${color}20` }}
          >
            {skill.category}
          </span>
        </div>

        {/* Underline on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }} transition={{ duration: 0.4 }}
              className="absolute bottom-0 left-0 right-0 h-[0.1875rem] origin-center rounded-full"
              style={{
                background: `linear-gradient(90deg, transparent, ${color}, ${colors.orange}, ${color}, transparent)`,
                boxShadow: !isCrayon ? `0 0 8px ${color}50` : "none",
              }}
            />
          )}
        </AnimatePresence>

        {/* Explosion emojis only for original */}
        {isOriginal && (
          <AnimatePresence>
            {hovered && (
              <>
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: [0, 1.4, 1], rotate: [0, 30] }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="absolute top-2 right-3 text-[0.9rem] pointer-events-none select-none"
                >
                  💥
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: [0, 1.3, 1], rotate: [0, -20] }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="absolute bottom-2 left-3 text-[0.7rem] pointer-events-none select-none"
                >
                  💨
                </motion.span>
              </>
            )}
          </AnimatePresence>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MAIN SECTION
   ═══════════════════════════════════════════ */
export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("Все");
  const { isCrayon, isClassic } = useTheme();

  const filteredSkills = activeCategory === "Все" ? skills : skills.filter((s) => s.category === activeCategory);

  /* Group skills by category for classic layout */
  const groupedSkills = isClassic
    ? (activeCategory === "Все"
        ? categories.filter(c => c.label !== "Все").map(cat => ({
            label: cat.label,
            color: cat.color,
            items: skills.filter(s => s.category === cat.label),
          }))
        : [{ label: activeCategory, color: categoryColors[activeCategory] || colors.lavender, items: filteredSkills }]
      )
    : [];

  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      <SectionDivider color={isClassic ? "var(--border)" : colors.pink} />
      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, type: "spring" }} className="text-center mb-16">
          {!isClassic && (
            <motion.span initial={{ scale: 0, rotate: -90 }} animate={isInView ? { scale: 1, rotate: 0 } : {}} transition={{ type: "spring", stiffness: 200, delay: 0.2 }} className="inline-block text-[2.4rem] mb-3">{isCrayon ? "✦" : "⚡"}</motion.span>
          )}
          <h2 className="text-[2.6rem] sm:text-[3.2rem] mb-4 text-text-primary" style={{ fontFamily: "var(--t-font-heading)", fontWeight: 700 }}>
            {isClassic ? "Стек технологий" : <>Стек <span className="text-brand-pink">технологий</span></>}
          </h2>
          {!isClassic && (
            <svg viewBox="0 0 200 8" className="w-32 h-3 mx-auto">
              <motion.path
                d={isCrayon ? "M5 4 Q 25 1 50 5 Q 75 8 100 3 Q 125 0 150 5 Q 175 8 195 4" : "M5 4 L195 4"}
                stroke={colors.pink} strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="none"
                initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 1, delay: 0.3 }}
              />
            </svg>
          )}
        </motion.div>

        {/* Category filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }} className="flex items-center justify-center gap-3 mb-12 flex-wrap">
          {categories.map((cat) => (
            <motion.button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              whileHover={{ scale: isClassic ? 1.04 : isCrayon ? 1.04 : 1.1, rotate: 0 }}
              whileTap={{ scale: 0.9 }}
              className="px-5 py-2.5 text-[0.95rem] cursor-pointer border transition-all flex items-center gap-2"
              style={{
                fontFamily: "var(--t-font-body)", fontWeight: 700,
                borderStyle: "var(--t-border-style)" as any,
                borderRadius: isClassic ? "0.375rem" : "1rem",
                borderWidth: isClassic ? "1px" : "2px",
                cursor: isClassic ? "default" : "pointer",
                borderColor: isClassic
                  ? (activeCategory === cat.label ? "var(--text-dim)" : "var(--border)")
                  : (activeCategory === cat.label ? `${cat.color}60` : `${cat.color}15`),
                backgroundColor: isClassic
                  ? (activeCategory === cat.label ? "var(--card)" : "transparent")
                  : (activeCategory === cat.label ? `${cat.color}15` : "transparent"),
                color: isClassic
                  ? (activeCategory === cat.label ? "var(--text-primary)" : "var(--muted-foreground)")
                  : (activeCategory === cat.label ? cat.color : "var(--muted-foreground)"),
                filter: "var(--t-filter)",
              }}
            >
              {!isClassic && <span>{cat.emoji}</span>}{cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* ── Classic layout: grouped columns ── */}
        {isClassic && (
          <div className={`grid gap-8 ${activeCategory === "Все" ? "sm:grid-cols-2 lg:grid-cols-3" : "max-w-md mx-auto"}`}>
            {groupedSkills.map((group, gi) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * gi }}
              >
                {/* Group header */}
                <div className="flex items-center gap-2 mb-3 pb-2 border-b" style={{ borderColor: "var(--border)" }}>
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "var(--text-dim)" }}
                  />
                  <span
                    className="text-[0.75rem] uppercase tracking-[0.15em] text-text-secondary"
                    style={{ fontFamily: "var(--t-font-body)", fontWeight: 700 }}
                  >
                    {group.label}
                  </span>
                  <span className="text-[0.7rem] text-text-dim ml-auto" style={{ fontFamily: "var(--t-font-mono)" }}>
                    {group.items.length}
                  </span>
                </div>

                {/* Skill items */}
                <div className="flex flex-col gap-0.5">
                  {group.items.map((skill, si) => (
                    <ClassicSkillCard
                      key={skill.name}
                      skill={skill}
                      color="var(--text-secondary)"
                      index={gi * 10 + si}
                      isInView={isInView}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── Default grid layout: crayon & original ── */}
        {!isClassic && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredSkills.map((skill, i) => {
              const color = categoryColors[skill.category] || colors.lavender;
              return <DefaultSkillCard key={skill.name} skill={skill} color={color} index={i} isInView={isInView} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
}
