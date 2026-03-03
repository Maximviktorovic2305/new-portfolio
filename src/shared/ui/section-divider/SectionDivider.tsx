import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { colors } from "@/shared/config";

interface Props {
  color?: string;
  className?: string;
}

export function SectionDivider({ color = colors.pink }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="relative py-4 overflow-hidden">
      <svg viewBox="0 0 1200 20" className="w-full h-5" preserveAspectRatio="none">
        <motion.path
          d="M0 10 Q 100 0 200 10 Q 300 20 400 10 Q 500 0 600 10 Q 700 20 800 10 Q 900 0 1000 10 Q 1100 20 1200 10"
          stroke={color}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.3 } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}