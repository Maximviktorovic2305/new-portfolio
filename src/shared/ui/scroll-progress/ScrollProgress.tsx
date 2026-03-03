import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 origin-left z-[60] rounded-r-full"
    >
      <div
        className="w-full h-full rounded-r-full bg-brand-teal/50"
      />
    </motion.div>
  );
}