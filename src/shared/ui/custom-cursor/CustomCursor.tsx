import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { colors, useTheme } from "@/shared/config";

const crayonColors = [colors.pink, colors.teal, colors.orange, colors.lavender, colors.lime, colors.sky];

/** Crayon/pencil cursor with trailing crayon dots */
export function CustomCursor() {
  const { isClassic } = useTheme();
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 300, damping: 25 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 25 });
  const [colorIdx, setColorIdx] = useState(0);
  const [trails, setTrails] = useState<{ x: number; y: number; id: number; color: string }[]>([]);
  const trailId = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isClassic || shouldReduceMotion) return;
    let lastTrailTime = 0;
    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      const now = Date.now();
      if (now - lastTrailTime > 60) {
        lastTrailTime = now;
        const id = trailId.get() + 1;
        trailId.set(id);
        const color = crayonColors[id % crayonColors.length] ?? colors.lavender;
        setTrails((prev) => [...prev.slice(-8), { x: e.clientX, y: e.clientY, id, color }]);
      }
    };
    const handleClick = () => {
      setColorIdx((prev) => (prev + 1) % crayonColors.length);
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("click", handleClick);
    };
  }, [cursorX, cursorY, trailId, isClassic, shouldReduceMotion]);

  if (isClassic || shouldReduceMotion) return null;
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  const color = crayonColors[colorIdx] ?? colors.lavender;

  return (
    <>
      {/* Trailing dots */}
      {trails.map((t) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0.4, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] hidden md:block"
          style={{
            x: t.x - 3,
            y: t.y - 3,
            width: 6,
            height: 6,
            backgroundColor: t.color,
          }}
          onAnimationComplete={() => {
            setTrails((prev) => prev.filter((tr) => tr.id !== t.id));
          }}
        />
      ))}
      {/* Main ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          border: `3px dashed ${color}`,
          opacity: 0.6,
        }}
      />
      {/* Center dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: color,
        }}
      />
    </>
  );
}
