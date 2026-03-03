import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { SectionDivider } from "@/shared/ui";
import { colors } from "@/shared/config";
import { projects, projectColors } from "@/entities/project";

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <SectionDivider color={colors.orange} />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
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
            {"\u{1F680}"}
          </motion.span>
          <h2
            className="text-[2.5rem] sm:text-[3rem] mb-4"
            style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 800 }}
          >
            <span className="text-white">Мои </span>
            <span className="text-brand-orange">проекты</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-1.5 bg-gradient-to-r from-brand-orange to-brand-pink mx-auto rounded-full origin-left"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {visibleProjects.map((project, i) => {
            const color = projectColors[i % projectColors.length];
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50, rotate: i % 2 === 0 ? -2 : 2 }}
                animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15, type: "spring" }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative rounded-3xl overflow-hidden border-2 cursor-pointer"
                style={{ borderColor: `${color}20`, backgroundColor: `${color}05` }}
              >
                <motion.div
                  whileHover={{ scale: 1.02, rotate: -0.5 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <motion.div
                      animate={hoveredId === project.id ? { scale: 1.1 } : { scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full"
                    >
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={hoveredId === project.id ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ backgroundColor: `${color}dd` }}
                    >
                      <div className="flex gap-4">
                        {project.site && (
                          <motion.a
                            href={project.site}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ y: 20, opacity: 0 }}
                            animate={hoveredId === project.id ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                            transition={{ delay: 0.1 }}
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-background"
                          >
                            <ExternalLink size={20} />
                          </motion.a>
                        )}
                        {project.github && (
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ y: 20, opacity: 0 }}
                            animate={hoveredId === project.id ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                            transition={{ delay: 0.2 }}
                            whileHover={{ scale: 1.2, rotate: -10 }}
                            className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-white"
                          >
                            <Github size={20} />
                          </motion.a>
                        )}
                      </div>
                    </motion.div>

                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute top-4 left-4 text-[1.8rem] bg-background/60 backdrop-blur w-12 h-12 rounded-2xl flex items-center justify-center"
                    >
                      {project.emoji}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-[1.15rem] text-white" style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 800 }}>
                        {project.title}
                      </h3>
                      <motion.div
                        animate={hoveredId === project.id ? { x: 0, y: 0, opacity: 1 } : { x: -5, y: 5, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowUpRight size={20} style={{ color }} />
                      </motion.div>
                    </div>

                    <p className="text-[0.85rem] text-muted-foreground mb-3 leading-relaxed" style={{ fontWeight: 500 }}>
                      {project.desc}
                    </p>

                    {/* Category badge */}
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.7rem] mb-4"
                      style={{
                        fontWeight: 700,
                        color: project.category === "Fullstack" ? colors.lime : colors.teal,
                        backgroundColor: project.category === "Fullstack" ? `${colors.lime}10` : `${colors.teal}10`,
                        border: `1.5px solid ${project.category === "Fullstack" ? `${colors.lime}25` : `${colors.teal}25`}`,
                      }}
                    >
                      {project.category === "Fullstack" ? "\u26A1" : "\u{1F3A8}"} {project.category}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-[0.7rem]"
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontWeight: 600,
                            color: color,
                            backgroundColor: `${color}12`,
                            border: `1.5px solid ${color}25`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={hoveredId === project.id ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 h-1 origin-left rounded-full"
                  style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Show more / less button */}
        {projects.length > 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="text-center mt-10"
          >
            <motion.button
              whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3.5 rounded-2xl border-2 border-brand-teal/30 bg-brand-teal/10 text-brand-teal text-[0.9rem] uppercase tracking-wide cursor-pointer transition-colors hover:bg-brand-teal/20"
              style={{ fontWeight: 700 }}
            >
              {showAll ? "Свернуть \u2191" : `Показать все (${projects.length}) \u2193`}
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}