import { motion } from "motion/react";
import { colors } from "@/shared/config";

const shapes = [
  { color: colors.pink, size: 200, x: "5%", y: "15%", delay: 0 },
  { color: colors.teal, size: 150, x: "85%", y: "25%", delay: 1 },
  { color: colors.orange, size: 120, x: "75%", y: "65%", delay: 2 },
  { color: colors.lavender, size: 180, x: "10%", y: "70%", delay: 0.5 },
  { color: colors.lime, size: 100, x: "50%", y: "45%", delay: 1.5 },
  { color: colors.pink, size: 80, x: "30%", y: "85%", delay: 3 },
  { color: colors.teal, size: 160, x: "60%", y: "10%", delay: 2.5 },
];

export function FloatingShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, -10, 5, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            delay: shape.delay,
            ease: "easeInOut",
          }}
          className="absolute rounded-full"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            background: shape.color,
            opacity: 0.04,
            filter: "blur(60px)",
          }}
        />
      ))}
    </div>
  );
}