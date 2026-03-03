import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useCallback, useEffect } from "react";
import { SectionDivider } from "@/shared/ui";
import { colors } from "@/shared/config";
import { skills, categories, categoryColors } from "@/entities/skill";
import type { Skill } from "@/entities/skill";

/* --- Smoke puff component --- */
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
    if (!active) {
      setPuffs([]);
      return;
    }
    spawnPuffs();
    const interval = setInterval(spawnPuffs, 800);
    return () => clearInterval(interval);
  }, [active, spawnPuffs]);

  useEffect(() => {
    if (puffs.length > 30) {
      setPuffs((p) => p.slice(-16));
    }
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
              width: puff.size,
              height: puff.size,
              background: `radial-gradient(circle, ${color}30 0%, ${color}08 60%, transparent 100%)`,
              filter: "blur(6px)",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </AnimatePresence>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
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

/* --- Tooltip popup --- */
function SkillPopup({ skill, color }: { skill: Skill; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.9 }}
      transition={{ duration: 0.25, type: "spring", stiffness: 400, damping: 20 }}
      className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-3 w-64 p-4 rounded-2xl border-2 backdrop-blur-xl pointer-events-none"
      style={{
        backgroundColor: `${colors.card}ee`,
        borderColor: `${color}35`,
        boxShadow: `0 12px 40px ${color}20, 0 0 0 1px ${color}10`,
      }}
    >
      <div
        className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 rotate-45 border-r-2 border-b-2"
        style={{ backgroundColor: `${colors.card}ee`, borderColor: `${color}35` }}
      />
      <div className="flex items-center gap-2.5 mb-2.5">
        <span className="text-[1.4rem]">{skill.emoji}</span>
        <span className="text-[1rem] text-white" style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 800 }}>
          {skill.name}
        </span>
      </div>
      <p className="text-[0.8rem] text-text-secondary leading-relaxed" style={{ fontWeight: 500 }}>
        {skill.description}
      </p>
      <div className="flex items-center gap-1.5 mt-2.5">
        <span
          className="text-[0.65rem] px-2 py-0.5 rounded-full uppercase tracking-wider"
          style={{ fontWeight: 700, color: color, backgroundColor: `${color}15`, border: `1px solid ${color}25` }}
        >
          {skill.category}
        </span>
      </div>
    </motion.div>
  );
}

/* --- Skill Card --- */
function SkillCard({ skill, color, index, isInView }: { skill: Skill; color: string; index: number; isInView: boolean }) {
  const [hovered, setHovered] = useState(false);

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
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, delay: 0.05 * (index % 6), type: "spring" }}
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && <SkillPopup skill={skill} color={color} />}
      </AnimatePresence>

      <motion.div
        variants={shakeVariants}
        animate={hovered ? "shaking" : "idle"}
        whileHover={{ scale: 1.05 }}
        className="relative p-6 rounded-3xl border-2 cursor-pointer overflow-hidden"
        style={{
          borderColor: hovered ? `${color}50` : `${color}15`,
          backgroundColor: hovered ? `${color}10` : `${color}05`,
          boxShadow: hovered ? `0 8px 35px ${color}20, inset 0 -20px 40px ${color}06` : "none",
          transition: "border-color 0.3s, background-color 0.3s, box-shadow 0.3s",
        }}
      >
        <SmokeAnimation color={color} active={hovered} />

        <div className="relative z-10 flex flex-col items-center text-center gap-3">
          <motion.div
            animate={hovered ? { scale: [1, 1.2, 1.1, 1.25, 1.15], rotate: [0, -8, 8, -5, 5, 0] } : { scale: 1, rotate: 0 }}
            transition={hovered ? { duration: 0.8, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
            className="text-[2.2rem] select-none"
          >
            {skill.emoji}
          </motion.div>
          <span className="text-white text-[1rem]" style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 800 }}>
            {skill.name}
          </span>
          <span
            className="text-[0.7rem] px-3 py-1 rounded-full uppercase tracking-wider"
            style={{ fontWeight: 700, color: color, backgroundColor: `${color}12`, border: `1.5px solid ${color}20` }}
          >
            {skill.category}
          </span>
        </div>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute bottom-0 left-0 right-0 h-[0.1875rem] origin-center rounded-full"
              style={{ background: `linear-gradient(90deg, transparent, ${color}, ${colors.orange}, ${color}, transparent)`, boxShadow: `0 0 8px ${color}50` }}
            />
          )}
        </AnimatePresence>

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
                {"\u{1F4A5}"}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: [0, 1.3, 1], rotate: [0, -20] }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="absolute bottom-2 left-3 text-[0.7rem] pointer-events-none select-none"
              >
                {"\u{1F4A8}"}
              </motion.span>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* --- Main Section --- */
export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("Все");

  const filteredSkills =
    activeCategory === "Все" ? skills : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      <SectionDivider color={colors.pink} />
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
            {"\u26A1"}
          </motion.span>
          <h2
            className="text-[2.5rem] sm:text-[3rem] mb-4"
            style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 800 }}
          >
            <span className="text-white">Стек </span>
            <span className="text-brand-pink">технологий</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-1.5 bg-gradient-to-r from-brand-pink to-brand-orange mx-auto rounded-full origin-left"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-12 flex-wrap"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.9 }}
              className="px-5 py-2.5 rounded-2xl text-[0.9rem] cursor-pointer border-2 transition-all flex items-center gap-2"
              style={{
                fontWeight: 700,
                borderColor: activeCategory === cat.label ? `${cat.color}60` : `${cat.color}15`,
                backgroundColor: activeCategory === cat.label ? `${cat.color}20` : "transparent",
                color: activeCategory === cat.label ? cat.color : colors.textMuted,
                boxShadow: activeCategory === cat.label ? `0 4px 20px ${cat.color}20` : "none",
              }}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredSkills.map((skill, i) => {
            const color = categoryColors[skill.category] || colors.lavender;
            return <SkillCard key={skill.name} skill={skill} color={color} index={i} isInView={isInView} />;
          })}
        </div>
      </div>
    </section>
  );
}