import { motion } from "motion/react";
import { skills } from "@/entities/skill";

const groups = ["Frontend", "Backend", "DevOps"] as const;

export function SkillsSection() {
  return (
    <section className="immersive-skills" id="skills">
      <div className="immersive-section-number">03</div>
      <header className="immersive-skills__header">
        <p className="immersive-kicker">Инструменты и технологии</p>
        <h2>Стек для полного цикла разработки.</h2>
      </header>

      <div className="immersive-skills__grid">
        {groups.map((group, groupIndex) => (
          <motion.article
            initial={{ opacity: 0, y: 48 }}
            key={group}
            transition={{ delay: groupIndex * 0.12, duration: 0.7 }}
            viewport={{ once: true, amount: 0.2 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="immersive-skills__group-title">
              <span>0{groupIndex + 1}</span>
              <h3>{group}</h3>
            </div>
            <ul>
              {skills
                .filter((skill) => skill.category === group)
                .map((skill, skillIndex) => (
                  <li key={skill.name}>
                    <a
                      aria-describedby={`skill-tooltip-${groupIndex}-${skillIndex}`}
                      className="immersive-skill-link"
                      href={skill.website}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span>{skill.name}</span>
                      <span aria-hidden="true">↗</span>
                      <span
                        className="immersive-skill-tooltip"
                        id={`skill-tooltip-${groupIndex}-${skillIndex}`}
                        role="tooltip"
                      >
                        <strong>{skill.name}</strong>
                        <span>{skill.description}</span>
                        <em>Открыть официальный сайт ↗</em>
                      </span>
                    </a>
                  </li>
                ))}
            </ul>
          </motion.article>
        ))}
      </div>

      <div className="immersive-marquee" aria-hidden="true">
        <div>
          DESIGN · DEVELOPMENT · ARCHITECTURE · MOTION · DESIGN · DEVELOPMENT · ARCHITECTURE · MOTION ·
        </div>
      </div>
    </section>
  );
}
