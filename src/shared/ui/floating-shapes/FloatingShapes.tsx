import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";
import { colors, useTheme } from "@/shared/config";

const doodles = [
  { symbol: "✦", x: "7%", y: "15%", size: 54, delay: 0, color: "#7866d5", radius: "42% 58% 55% 45%" },
  { symbol: "●", x: "90%", y: "24%", size: 38, delay: 1.2, color: "#ee5f8b", radius: "50%" },
  { symbol: "◆", x: "82%", y: "70%", size: 46, delay: 2, color: "#4898cf", radius: "36% 64% 42% 58%" },
  { symbol: "✿", x: "10%", y: "76%", size: 50, delay: 0.8, color: "#169f91", radius: "58% 42% 62% 38%" },
  { symbol: "★", x: "65%", y: "9%", size: 42, delay: 2.5, color: "#f39142", radius: "48% 52% 40% 60%" },
];

// depth: 0 = far, 1 = mid, 2 = near
const blobShapes = [
  { color: colors.pink, size: 200, x: "5%", y: "15%", delay: 0, depth: 2 },
  { color: colors.teal, size: 150, x: "85%", y: "25%", delay: 1, depth: 1 },
  { color: colors.orange, size: 120, x: "75%", y: "65%", delay: 2, depth: 0 },
  { color: colors.lavender, size: 180, x: "10%", y: "70%", delay: 0.5, depth: 2 },
  { color: colors.lime, size: 100, x: "50%", y: "45%", delay: 1.5, depth: 0 },
  { color: colors.pink, size: 80, x: "30%", y: "85%", delay: 3, depth: 1 },
  { color: colors.teal, size: 160, x: "60%", y: "10%", delay: 2.5, depth: 1 },
];

const depthConfig = [
  { parallax: 0.02, opacity: 0.06, blur: 3, sizeScale: 0.6 },    // far — barely moves
  { parallax: 0.06, opacity: 0.1, blur: 1.5, sizeScale: 0.85 },  // mid
  { parallax: 0.12, opacity: 0.14, blur: 0.5, sizeScale: 1 },    // near — moves a lot
];

/**
 * Outer div = parallax shift (style.x/y driven by mouse motion values)
 * Inner div = looping float animation (animate x/y keyframes)
 * Two separate elements so Motion doesn't conflict animate vs style.
 */
function ParallaxBlob({
  shape,
  index,
  mouseX,
  mouseY,
}: {
  shape: (typeof blobShapes)[number];
  index: number;
  mouseX: ReturnType<typeof useSpring>;
  mouseY: ReturnType<typeof useSpring>;
}) {
  const cfg = depthConfig[shape.depth];

  const dirX = index % 2 === 0 ? 1 : -1;
  const dirY = index % 3 === 0 ? -1 : 1;

  const px = useTransform(mouseX, (v) => v * cfg.parallax * dirX);
  const py = useTransform(mouseY, (v) => v * cfg.parallax * dirY);

  const realSize = shape.size * cfg.sizeScale;

  return (
    /* Parallax wrapper — only moves with mouse */
    <motion.div
      className="absolute"
      style={{
        left: shape.x,
        top: shape.y,
        x: px,
        y: py,
        width: realSize,
        height: realSize,
      }}
    >
      {/* Floating animation — loops independently */}
      <motion.div
        animate={{
          y: [0, -30, 0, 20, 0],
          x: [0, 15, -10, 5, 0],
          scale: [1, 1.1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 12 + index * 2,
          repeat: Infinity,
          delay: shape.delay,
          ease: "easeInOut",
        }}
        className="w-full h-full rounded-full"
        style={{
          background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.18), ${shape.color} 60%, transparent)`,
          opacity: cfg.opacity,
          filter: `blur(${cfg.blur}px)`,
          boxShadow: `0 0 ${realSize * 0.6}px ${shape.color}44`,
        }}
      />
    </motion.div>
  );
}

export function FloatingShapes() {
  const { isCrayon, isClassic } = useTheme();

  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const mouseX = useSpring(rawMouseX, { stiffness: 40, damping: 15 });
  const mouseY = useSpring(rawMouseY, { stiffness: 40, damping: 15 });

  useEffect(() => {
    if (isClassic) return;
    const onMove = (e: MouseEvent) => {
      rawMouseX.set(e.clientX - window.innerWidth / 2);
      rawMouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isClassic, rawMouseX, rawMouseY]);

  if (isClassic) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {isCrayon
        ? doodles.map((d, i) => (
            <motion.div
              key={`doodle-${i}`}
              animate={{
                y: [0, -10, 0, 7, 0],
                rotate: [0, 5, -3, 0],
                scale: [1, 1.04, 0.98, 1],
              }}
              transition={{
                duration: 12 + i * 1.5,
                repeat: Infinity,
                delay: d.delay,
                ease: "easeInOut",
              }}
              className="absolute hidden sm:flex items-center justify-center select-none"
              style={{
                left: d.x,
                top: d.y,
                width: d.size,
                height: d.size,
                fontSize: d.size * 0.38,
                color: d.color,
                opacity: 0.62,
                borderRadius: d.radius,
                border: `1px solid ${d.color}30`,
                background: `linear-gradient(145deg, #ffffffcc, ${d.color}12)`,
                boxShadow: `0 12px 34px ${d.color}16`,
                backdropFilter: "blur(8px)",
              }}
            >
              {d.symbol}
            </motion.div>
          ))
        : blobShapes.map((shape, i) => (
            <ParallaxBlob
              key={`blob-${i}`}
              shape={shape}
              index={i}
              mouseX={mouseX}
              mouseY={mouseY}
            />
          ))}
    </div>
  );
}
