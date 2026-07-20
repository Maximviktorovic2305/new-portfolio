import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { colors, useTheme } from "@/shared/config";

const typeColors = [colors.pink, colors.teal, colors.orange, colors.lavender, colors.lime, colors.sky];

interface Props {
  texts: readonly string[];
}

export function TypeWriter({ texts }: Props) {
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const { isCrayon } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const current = texts[textIdx] ?? texts[0] ?? "";

  useEffect(() => {
    if (shouldReduceMotion || !current) return;
    const delay = !deleting && charIdx === current.length ? 2_000 : deleting ? 40 : 80;
    const timer = window.setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setCharIdx((index) => index + 1);
      } else if (!deleting && charIdx === current.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setCharIdx((index) => index - 1);
      } else {
        setDeleting(false);
        setTextIdx((index) => (index + 1) % texts.length);
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [charIdx, current, deleting, shouldReduceMotion, texts.length]);

  if (!current) return null;
  if (shouldReduceMotion) return <span style={{ color: typeColors[0] }}>{current}</span>;

  return (
    <span style={{ color: typeColors[textIdx % typeColors.length] ?? colors.lavender }}>
      {current.substring(0, charIdx)}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse" }}
        style={{ color: colors.orange }}
      >
        {isCrayon ? "▍" : "|"}
      </motion.span>
    </span>
  );
}
