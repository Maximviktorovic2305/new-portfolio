import { motion, useReducedMotion } from "motion/react";
import { projects } from "@/entities/project";
import { ImageWithFallback } from "@/shared/ui";

export function ProjectsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="immersive-projects" id="projects">
      <header className="immersive-projects__header">
        <div className="immersive-section-number">04</div>
        <p className="immersive-kicker">Избранные работы · 2020—2026</p>
        <h2>Проекты</h2>
        <p>Коммерческие продукты, собственные сервисы и цифровые платформы.</p>
      </header>

      <div className="immersive-projects__list">
        {projects.map((project, index) => (
          <motion.article
            className="immersive-project"
            initial={reduceMotion ? undefined : { opacity: 0, y: 80 }}
            key={project.id}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          >
            <a
              aria-label={`Открыть проект ${project.title}`}
              className="immersive-project__media"
              href={project.site}
              rel="noopener noreferrer"
              target="_blank"
            >
              <ImageWithFallback alt={`Превью проекта ${project.title}`} src={project.image} />
              <span className="immersive-project__open" aria-hidden="true">
                Открыть ↗
              </span>
            </a>

            <div className="immersive-project__meta">
              <p className="immersive-project__number">{String(index + 1).padStart(2, "0")}</p>
              <div>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
              </div>
              <div className="immersive-project__aside">
                <p>{project.category}</p>
                <ul aria-label="Технологии проекта">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                {project.github && (
                  <a href={project.github} rel="noopener noreferrer" target="_blank">
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
