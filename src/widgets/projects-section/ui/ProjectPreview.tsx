import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { Project } from "@/entities/project";
import { ImageWithFallback } from "@/shared/ui";
import styles from "./ProjectPreview.module.css";

export function ProjectPreview({ project }: { project: Project }) {
  const root = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const element = root.current;
    if (!element || !project.preview) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry?.isIntersecting ?? false), {
      threshold: 0.1,
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [project.preview]);
  const playing = visible && !paused && !reduceMotion;
  const src = project.preview
    ? playing
      ? project.preview.animation
      : project.preview.poster
    : project.image;
  return (
    <div ref={root} className={styles.projectPreview}>
      <a
        aria-label={`Открыть проект ${project.title}`}
        className={`immersive-project__media ${project.preview ? styles.desktopPreview : ""}`}
        href={project.site}
        rel="noopener noreferrer"
        target="_blank"
      >
        <ImageWithFallback alt={`Превью проекта ${project.title}`} src={src} />
        <span className="immersive-project__open" aria-hidden="true">
          Открыть ↗
        </span>
      </a>
      {project.preview && !reduceMotion && (
        <button
          className={styles.previewControl}
          type="button"
          aria-label={`${paused ? "Включить" : "Приостановить"} анимацию проекта ${project.title}`}
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? "▶ Включить" : "Ⅱ Пауза"}
        </button>
      )}
    </div>
  );
}
