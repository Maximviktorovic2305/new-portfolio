import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { colors, useTheme } from "@/shared/config";

interface Props {
  color?: string;
}

export function SectionDivider({ color = colors.pink }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { isClassic } = useTheme();

  if (isClassic) {
    return (
      <div ref={ref} className="relative py-3 overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="h-px origin-left"
          style={{ backgroundColor: color, opacity: 0.15 }}
        />
      </div>
    );
  }

  return (
    <div ref={ref} className="relative py-5 overflow-hidden">
      <svg viewBox="0 0 1200 30" className="w-full h-7" preserveAspectRatio="none">
        <motion.path
          d="M0 15 Q 50 5 100 18 Q 150 28 200 12 Q 250 2 300 16 Q 350 26 400 10 Q 450 4 500 20 Q 550 28 600 14 Q 650 4 700 18 Q 750 26 800 10 Q 850 2 900 22 Q 950 28 1000 12 Q 1050 4 1100 20 Q 1150 28 1200 15"
          stroke={color}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.35 } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
          style={{ filter: "var(--t-filter)" }}
        />
      </svg>
    </div>
  );
}
