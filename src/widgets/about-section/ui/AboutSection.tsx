import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { SectionDivider } from "@/shared/ui";
import { colors } from "@/shared/config";
import { stats, highlights, hobbies } from "../model/data";
import avatarImg from "figma:asset/6293143439d16f15fc3aaacb14f69fad1ed0a5b3.png";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <SectionDivider color={colors.teal} />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, type: "spring" }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 300, delay: 0.05 }}
            className="inline-block text-[2.5rem] mb-3"
          >
            {"\u{1F9D1}\u200D\u{1F4BB}"}
          </motion.span>
          <h2
            className="text-[2.5rem] sm:text-[3rem] mb-4"
            style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 800 }}
          >
            <span className="text-white">Кто </span>
            <span className="text-brand-teal">я</span>
            <span className="text-white"> такой?</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="w-24 h-1.5 bg-gradient-to-r from-brand-teal to-brand-lavender mx-auto rounded-full origin-left"
          />
        </motion.div>

        <div className="grid lg:grid-cols-[auto_1fr] gap-10 items-start">
          {/* Photo — compact */}
          <motion.div
            initial={{ opacity: 0, x: -60, rotate: -5 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ duration: 0.4, type: "spring" }}
            className="relative w-56 sm:w-64 mx-auto lg:mx-0 shrink-0"
          >
            <div className="relative rounded-3xl overflow-hidden group border-3 border-brand-lavender/20 shadow-[0_0.5rem_2.5rem_rgba(167,139,250,0.1)]">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.15 }}>
                <img
                  src={avatarImg}
                  alt="Максим"
                  className="w-full aspect-[4/5] object-cover object-top"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
            </div>
          </motion.div>

          {/* Text + hobbies */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[1.1rem] text-text-secondary leading-relaxed mb-4"
              style={{ fontWeight: 500 }}
            >
              Привет! Я <span className="text-white" style={{ fontWeight: 800 }}>Максим</span> — fullstack-разработчик
              с 4+ годами коммерческого опыта. Работаю на полном стеке: от интерактивных
              интерфейсов на React/Vue до высоконагруженного бэкенда на Node.js и Golang {"\u{1F4AA}"}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="text-[1.1rem] text-text-secondary leading-relaxed mb-4"
              style={{ fontWeight: 500 }}
            >
              Реализовал 40+ проектов
              — от финтех-платформ до маркетплейсов
              и админ-панелей. Люблю чистую архитектуру и оптимизацию {"\u{1F525}"}
            </motion.p>

            {/* Hobbies mini badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.25 }}
              className="flex flex-wrap gap-2"
            >
              {hobbies.map((h) => (
                <motion.span
                  key={h.label}
                  whileHover={{
                    scale: 1.12,
                    y: -3,
                    transition: { type: "spring", stiffness: 400, damping: 14 },
                  }}
                  whileTap={{ scale: 0.92 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.75rem] cursor-default border group"
                  style={{
                    fontWeight: 700,
                    color: h.color,
                    borderColor: `${h.color}25`,
                    backgroundColor: `${h.color}08`,
                    transition: "border-color 0.2s, background-color 0.2s, box-shadow 0.2s",
                  }}
                  onHoverStart={(e) => {
                    const badge = (e.target as HTMLElement).closest("span") as HTMLElement;
                    if (badge) {
                      badge.style.borderColor = `${h.color}50`;
                      badge.style.backgroundColor = `${h.color}18`;
                      badge.style.boxShadow = `0 4px 16px ${h.color}25`;
                    }
                  }}
                  onHoverEnd={(e) => {
                    const badge = (e.target as HTMLElement).closest("span") as HTMLElement;
                    if (badge) {
                      badge.style.borderColor = `${h.color}25`;
                      badge.style.backgroundColor = `${h.color}08`;
                      badge.style.boxShadow = "none";
                    }
                  }}
                >
                  <motion.span
                    className="inline-flex"
                    whileHover={{ rotate: [0, -15, 15, 0], transition: { duration: 0.35 } }}
                  >
                    <h.icon size={13} />
                  </motion.span>
                  {h.label}
                </motion.span>
              ))}
            </motion.div>

            {/* Available for remote work */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 mt-4 p-3 bg-card/90 backdrop-blur-lg rounded-xl border-2 border-brand-lime/25"
            >
              <motion.div
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-[1rem]"
              >
                {"\u{1F7E2}"}
              </motion.div>
              <span className="text-[0.75rem] text-brand-lime" style={{ fontWeight: 700 }}>
                Открыт к удалённой работе!
              </span>
            </motion.div>
          </div>
        </div>

        {/* Highlights + Stats — full width below */}
        <div className="mt-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.25 + i * 0.05, type: "spring" }}
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 400, damping: 15 },
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="p-4 rounded-2xl border-2 cursor-default group relative overflow-hidden"
                  style={{
                    borderColor: `${item.color}25`,
                    backgroundColor: `${item.color}08`,
                    boxShadow: `0 4px 20px ${item.color}10`,
                    transition: "border-color 0.25s, background-color 0.25s, box-shadow 0.25s",
                  }}
                  onHoverStart={(e) => {
                    const el = (e.target as HTMLElement).closest("[data-slot]") as HTMLElement;
                    if (el) {
                      el.style.borderColor = `${item.color}50`;
                      el.style.backgroundColor = `${item.color}15`;
                      el.style.boxShadow = `0 12px 35px ${item.color}25, inset 0 1px 0 ${item.color}15`;
                    }
                  }}
                  onHoverEnd={(e) => {
                    const el = (e.target as HTMLElement).closest("[data-slot]") as HTMLElement;
                    if (el) {
                      el.style.borderColor = `${item.color}25`;
                      el.style.backgroundColor = `${item.color}08`;
                      el.style.boxShadow = `0 4px 20px ${item.color}10`;
                    }
                  }}
                  data-slot="highlight-card"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 30% 20%, ${item.color}12 0%, transparent 70%)` }}
                  />
                  <motion.div
                    className="relative mb-2"
                    whileHover={{ rotate: [0, -12, 12, -6, 0], scale: 1.3, transition: { duration: 0.5 } }}
                  >
                    <item.icon size={22} style={{ color: item.color }} />
                  </motion.div>
                  <div className="relative text-[0.95rem] text-white mb-1 group-hover:text-white transition-colors" style={{ fontWeight: 800 }}>
                    {item.title}
                  </div>
                  <div className="relative text-[0.75rem] text-muted-foreground group-hover:text-text-secondary transition-colors duration-200" style={{ fontWeight: 500 }}>
                    {item.desc}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="grid grid-cols-4 gap-3"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.45 + i * 0.05, type: "spring", stiffness: 300 }}
                  whileHover={{
                    scale: 1.15,
                    y: -6,
                    transition: { type: "spring", stiffness: 400, damping: 12 },
                  }}
                  whileTap={{ scale: 0.9, rotate: -8 }}
                  className="text-center p-3 rounded-2xl border-2 cursor-default group relative overflow-hidden"
                  style={{
                    borderColor: `${stat.color}25`,
                    backgroundColor: `${stat.color}08`,
                    transition: "border-color 0.25s, background-color 0.25s, box-shadow 0.25s",
                  }}
                  onHoverStart={(e) => {
                    const el = (e.target as HTMLElement).closest("[data-slot]") as HTMLElement;
                    if (el) {
                      el.style.borderColor = `${stat.color}45`;
                      el.style.backgroundColor = `${stat.color}15`;
                      el.style.boxShadow = `0 10px 30px ${stat.color}25`;
                    }
                  }}
                  onHoverEnd={(e) => {
                    const el = (e.target as HTMLElement).closest("[data-slot]") as HTMLElement;
                    if (el) {
                      el.style.borderColor = `${stat.color}25`;
                      el.style.backgroundColor = `${stat.color}08`;
                      el.style.boxShadow = "none";
                    }
                  }}
                  data-slot="stat-card"
                >
                  <motion.div
                    className="text-[1rem] mb-1"
                    whileHover={{ scale: 1.4, rotate: [0, 15, -15, 0], transition: { duration: 0.4 } }}
                  >
                    {stat.emoji}
                  </motion.div>
                  <div
                    className="text-[1.3rem] sm:text-[1.5rem]"
                    style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 800, color: stat.color }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-[0.6rem] text-muted-foreground uppercase tracking-wider"
                    style={{ fontWeight: 700 }}
                  >
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