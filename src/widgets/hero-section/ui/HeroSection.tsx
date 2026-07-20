import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useCallback, useRef, type PointerEvent as ReactPointerEvent } from "react";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const imageX = useSpring(pointerX, { damping: 22, mass: 0.7, stiffness: 85 });
  const imageY = useSpring(pointerY, { damping: 22, mass: 0.7, stiffness: 85 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.15]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -95]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  const moveSceneAtPointer = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (reduceMotion) return;

      const bounds = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / Math.max(bounds.width, 1) - 0.5;
      const y = (event.clientY - bounds.top) / Math.max(bounds.height, 1) - 0.5;
      pointerX.set(x * -22);
      pointerY.set(y * -16);
    },
    [pointerX, pointerY, reduceMotion],
  );

  const resetScenePosition = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  return (
    <section
      className="immersive-hero"
      id="hero"
      onPointerLeave={resetScenePosition}
      onPointerMove={moveSceneAtPointer}
      ref={sectionRef}
    >
      <motion.div
        className="relief-scene"
        style={reduceMotion ? undefined : { scale: sceneScale, y: sceneY }}
      >
        <motion.img
          alt=""
          aria-hidden="true"
          animate={reduceMotion ? undefined : { scale: [1.015, 1.035, 1.015] }}
          className="relief-scene__image"
          decoding="async"
          fetchPriority="high"
          src="/images/relief-hero.png"
          style={reduceMotion ? undefined : { x: imageX, y: imageY }}
          transition={{ duration: 16, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.div
          aria-hidden="true"
          className="relief-scene__light"
          style={reduceMotion ? undefined : { x: imageX, y: imageY }}
        />
        <div className="relief-scene__grain" aria-hidden="true" />
      </motion.div>

      <motion.div
        className="immersive-hero__content"
        style={reduceMotion ? undefined : { opacity: contentOpacity, y: contentY }}
      >
        <p className="immersive-hero__eyebrow">FULLSTACK DEVELOPER · RUSSIA</p>
        <h1>
          <span>Цифровые продукты</span>
          <span>с характером</span>
        </h1>
        <p className="immersive-hero__intro">
          Проектирую и создаю выразительные веб-сервисы — от интерфейса до инфраструктуры.
        </p>
      </motion.div>

      <a className="immersive-hero__works" href="#projects">
        Смотреть проекты <span aria-hidden="true">↘</span>
      </a>
      <a className="immersive-hero__scroll" href="#about">
        <span>Прокрутите вниз</span>
        <i aria-hidden="true" />
      </a>
    </section>
  );
}
