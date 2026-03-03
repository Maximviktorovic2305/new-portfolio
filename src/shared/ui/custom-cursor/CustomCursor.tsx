import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { colors } from "@/shared/config";

const cursorColors = [colors.pink, colors.teal, colors.orange, colors.lavender, colors.lime];

export function CustomCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 200, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 200, damping: 20 });
  const [colorIdx, setColorIdx] = useState(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const handleClick = () => {
      setColorIdx((prev) => (prev + 1) % cursorColors.length);
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("click", handleClick);
    };
  }, [cursorX, cursorY]);

  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  const color = cursorColors[colorIdx];

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          border: `2px solid ${color}`,
          boxShadow: `0 0 15px ${color}40`,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: color,
          boxShadow: `0 0 8px ${color}`,
        }}
      />
    </>
  );
}