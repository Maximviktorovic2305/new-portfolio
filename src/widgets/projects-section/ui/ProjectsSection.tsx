import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ExternalLink, GitFork, ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { SectionDivider } from "@/shared/ui";
import { colors, useTheme } from "@/shared/config";
import { projects, projectColors } from "@/entities/project";

/* ── Classic minimal project card ── */
function ClassicProjectCard({ project, index, isInView }: { project: typeof projects[0]; index: number; isInView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group border border-border rounded-md overflow-hidden"
      style={{
        transition: "border-color 0.3s, box-shadow 0.3s",
        borderColor: hovered ? "var(--text-dim)" : undefined,
        boxShadow: hovered ? "0 4px 24px rgba(0,0,0,0.12)" : "none",
      }}
    >
      {/* Image — compact */}
      <div className="relative h-44 overflow-hidden">
        <motion.div
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full"
        >
          <ImageWithFallback src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </motion.div>

        {/* Hover overlay — subtle dark */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center gap-3"
        >
          {project.site && (
            <motion.a
              href={project.site} target="_blank" rel="noopener noreferrer"
              initial={{ y: 12, opacity: 0 }}
              animate={hovered ? { y: 0, opacity: 1 } : { y: 12, opacity: 0 }}
              transition={{ delay: 0.05 }}
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 rounded-md border border-border bg-card flex items-center justify-center text-text-primary"
            >
              <ExternalLink size={18} />
            </motion.a>
          )}
          {project.github && (
            <motion.a
              href={project.github} target="_blank" rel="noopener noreferrer"
              initial={{ y: 12, opacity: 0 }}
              animate={hovered ? { y: 0, opacity: 1 } : { y: 12, opacity: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 rounded-md border border-border bg-card flex items-center justify-center text-text-primary"
            >
              <GitFork size={18} />
            </motion.a>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[1.05rem] text-text-primary" style={{ fontFamily: "var(--t-font-heading)", fontWeight: 700 }}>
            {project.title}
          </h3>
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -4 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight size={16} className="text-text-secondary" />
          </motion.div>
        </div>

        <p className="text-[0.85rem] text-muted-foreground mb-3 leading-relaxed" style={{ fontFamily: "var(--t-font-body)" }}>
          {project.desc}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-[0.72rem] px-2.5 py-1 rounded-sm border border-border text-text-secondary uppercase tracking-wider"
            style={{ fontFamily: "var(--t-font-body)", fontWeight: 600 }}
          >
            {project.category}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[0.7rem] text-text-dim border border-border/50 rounded-sm"
              style={{ fontFamily: "var(--t-font-mono)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Section ── */
export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const { isCrayon, isClassic } = useTheme();
  const TF = "var(--t-filter)";
  const BS = "var(--t-border-style)" as any;

  const visibleProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <SectionDivider color={isClassic ? "var(--border)" : colors.orange} />
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, type: "spring" }} className="text-center mb-16">
          {!isClassic && (
            <motion.span initial={{ scale: 0, rotate: -180 }} animate={isInView ? { scale: 1, rotate: 0 } : {}} transition={{ type: "spring", stiffness: 200, delay: 0.2 }} className="inline-block text-[3rem] mb-3">🚀</motion.span>
          )}
          <h2 className="text-[2.6rem] sm:text-[3.2rem] mb-4 text-text-primary" style={{ fontFamily: "var(--t-font-heading)", fontWeight: 700 }}>
            {isClassic ? "Мои проекты" : <>Мои <span className="text-brand-orange">проекты</span></>}
          </h2>
          {!isClassic && (
            <svg viewBox="0 0 200 8" className="w-32 h-3 mx-auto">
              <motion.path d={isCrayon ? "M5 4 Q 25 1 50 5 Q 75 8 100 3 Q 125 0 150 5 Q 175 8 195 4" : "M5 4 L195 4"}
                stroke={colors.orange} strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray={isCrayon ? "6 3" : "none"}
                initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}} transition={{ duration: 1, delay: 0.3 }} />
            </svg>
          )}
        </motion.div>

        {/* ── Classic grid ── */}
        {isClassic && (
          <>
            <div className="grid md:grid-cols-2 gap-5">
              {visibleProjects.map((project, i) => (
                <ClassicProjectCard key={project.id} project={project} index={i} isInView={isInView} />
              ))}
            </div>

            {projects.length > 4 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }} className="text-center mt-10">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAll(!showAll)}
                  className="px-8 py-3 rounded-md border border-border text-text-primary text-[0.9rem] uppercase tracking-wider cursor-pointer transition-colors hover:bg-card"
                  style={{ fontFamily: "var(--t-font-heading)", fontWeight: 700 }}
                >
                  {showAll ? "Свернуть" : `Показать все (${projects.length})`}
                </motion.button>
              </motion.div>
            )}
          </>
        )}

        {/* ── Default grid (crayon & original) ── */}
        {!isClassic && (
          <>
            <div className="grid lg:grid-cols-2 gap-6">
              {visibleProjects.map((project, i) => {
                const color = projectColors[i % projectColors.length];
                const rot = isCrayon ? (i % 2 === 0 ? -1.5 : 1.5) : 0;
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50, rotate: isCrayon ? (i % 2 === 0 ? -4 : 4) : 0 }}
                    animate={isInView ? { opacity: 1, y: 0, rotate: rot } : {}}
                    transition={{ duration: 0.7, delay: i * 0.15, type: "spring" }}
                    onMouseEnter={() => setHoveredId(project.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    whileHover={{ rotate: 0, scale: 1.02 }}
                    className="group relative rounded-3xl overflow-hidden border-2 cursor-pointer"
                    style={{ borderStyle: BS, borderColor: `${color}30`, backgroundColor: `${color}04`, filter: TF }}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <motion.div animate={hoveredId === project.id ? { scale: 1.1 } : { scale: 1 }} transition={{ duration: 0.5 }} className="w-full h-full">
                        <ImageWithFallback src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      </motion.div>
                      <motion.div initial={{ opacity: 0 }} animate={hoveredId === project.id ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: `${color}dd` }}>
                        <div className="flex gap-4">
                          {project.site && (
                            <motion.a href={project.site} target="_blank" rel="noopener noreferrer"
                              initial={{ y: 20, opacity: 0 }} animate={hoveredId === project.id ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                              transition={{ delay: 0.1 }} whileHover={{ scale: 1.2, rotate: 10 }}
                              className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-background">
                              <ExternalLink size={20} />
                            </motion.a>
                          )}
                          {project.github && (
                            <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
                              initial={{ y: 20, opacity: 0 }} animate={hoveredId === project.id ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                              transition={{ delay: 0.2 }} whileHover={{ scale: 1.2, rotate: -10 }}
                              className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-white">
                              <GitFork size={20} />
                            </motion.a>
                          )}
                        </div>
                      </motion.div>
                      <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
                        className="absolute top-4 left-4 text-[1.8rem] bg-background/60 backdrop-blur w-12 h-12 rounded-2xl flex items-center justify-center border-2"
                        style={{ borderStyle: BS, borderColor: `${color}30` }}>
                        {project.emoji}
                      </motion.div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[1.2rem] text-text-primary" style={{ fontFamily: "var(--t-font-heading)", fontWeight: 700 }}>{project.title}</h3>
                        <motion.div animate={hoveredId === project.id ? { x: 0, y: 0, opacity: 1 } : { x: -5, y: 5, opacity: 0 }} transition={{ duration: 0.3 }}>
                          <ArrowUpRight size={20} style={{ color }} />
                        </motion.div>
                      </div>
                      <p className="text-[0.9rem] text-muted-foreground mb-3 leading-relaxed" style={{ fontFamily: "var(--t-font-body)" }}>{project.desc}</p>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.78rem] mb-4 border-2"
                        style={{
                          fontFamily: "var(--t-font-body)", borderStyle: BS,
                          color: project.category === "Fullstack" ? colors.lime : colors.teal,
                          borderColor: project.category === "Fullstack" ? `${colors.lime}30` : `${colors.teal}30`,
                          backgroundColor: project.category === "Fullstack" ? `${colors.lime}08` : `${colors.teal}08`,
                        }}>
                        {project.category === "Fullstack" ? "⚡ " : "🎨 "}{project.category}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 rounded-full text-[0.73rem] border-2"
                            style={{ fontFamily: "var(--t-font-mono)", borderStyle: BS, color, borderColor: `${color}25`, backgroundColor: `${color}08` }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {projects.length > 4 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }} className="text-center mt-10">
                <motion.button whileHover={{ scale: 1.08, rotate: isCrayon ? -2 : 0 }} whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAll(!showAll)}
                  className="px-8 py-3.5 rounded-2xl border-2 border-brand-teal/30 bg-brand-teal/5 text-brand-teal text-[1rem] uppercase tracking-wide cursor-pointer transition-colors hover:bg-brand-teal/10"
                  style={{ fontFamily: "var(--t-font-heading)", fontWeight: 700, borderStyle: BS, filter: TF }}>
                  {showAll ? "Свернуть ↑" : `Показать все (${projects.length}) ↓`}
                </motion.button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
