import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { Project } from "@/entities/project";
import { ImageWithFallback } from "@/shared/ui";
import styles from "./ProjectPreview.module.css";

function AnimatedPreviewImage({ src, onError }: { src: string; onError: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const retry = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (retry.current !== null) clearTimeout(retry.current);
    },
    [],
  );
  return (
    <img
      key={attempt}
      alt=""
      aria-hidden="true"
      className={`${styles.animationImage} ${loaded ? styles.animationImageReady : ""}`}
      decoding="async"
      loading="eager"
      onLoad={() => setLoaded(true)}
      onError={(event) => {
        if (!event.currentTarget.isConnected) return;
        setLoaded(false);
        if (attempt === 0) {
          retry.current ??= setTimeout(() => {
            retry.current = null;
            setAttempt(1);
          }, 750);
        } else onError();
      }}
      referrerPolicy="no-referrer"
      src={src}
    />
  );
}

export function ProjectPreview({ project }: { project: Project }) {
  const root = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [animationFailed, setAnimationFailed] = useState(false);
  useEffect(() => {
    const element = root.current;
    if (!element || !project.preview) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry?.isIntersecting ?? false;
        setVisible(inView);
        if (inView) setAnimationFailed(false);
      },
      { threshold: 0.1 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [project.preview]);
  const playing = visible && !paused && !reduceMotion && !animationFailed;
  const src = project.preview?.poster ?? project.image;
  const action = animationFailed ? "Повторить" : paused ? "Включить" : "Приостановить";
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
        {project.preview && playing && (
          <AnimatedPreviewImage
            key={project.preview.animation}
            src={project.preview.animation}
            onError={() => setAnimationFailed(true)}
          />
        )}
        <span className="immersive-project__open" aria-hidden="true">
          Открыть ↗
        </span>
      </a>
      {project.preview && !reduceMotion && (
        <button
          className={styles.previewControl}
          type="button"
          aria-label={`${action} анимацию проекта ${project.title}`}
          aria-pressed={animationFailed ? undefined : paused}
          onClick={() => {
            if (animationFailed) {
              setAnimationFailed(false);
              setPaused(false);
            } else setPaused((value) => !value);
          }}
        >
          {animationFailed ? "↻ Повторить" : paused ? "▶ Включить" : "Ⅱ Пауза"}
        </button>
      )}
    </div>
  );
}
