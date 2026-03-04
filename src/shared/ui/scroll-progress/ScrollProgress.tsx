import { motion, useScroll, useSpring } from "motion/react";
import { useTheme } from "@/shared/config";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const { isClassic } = useTheme();

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[0.3rem] origin-left z-[60] rounded-r-full"
    >
      <div
        className="w-full h-full rounded-r-full"
        style={{
          background: isClassic
            ? "var(--brand-teal)"
            : "linear-gradient(90deg, var(--brand-pink), var(--brand-orange), var(--brand-teal), var(--brand-sky), var(--brand-lavender))",
          filter: "var(--t-filter)",
        }}
      />
    </motion.div>
  );
}
