import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { colors, useTheme } from "@/shared/config";

const typeColors = [colors.pink, colors.teal, colors.orange, colors.lavender, colors.lime, colors.sky];

interface Props {
  texts: string[];
}

export function TypeWriter({ texts }: Props) {
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const { isCrayon } = useTheme();

  useEffect(() => {
    const current = texts[textIdx];
    const timeout = deleting ? 40 : 80;
    const timer = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setCharIdx(charIdx + 1);
      } else if (!deleting && charIdx === current.length) {
        setTimeout(() => setDeleting(true), 2000);
      } else if (deleting && charIdx > 0) {
        setCharIdx(charIdx - 1);
      } else {
        setDeleting(false);
        setTextIdx((textIdx + 1) % texts.length);
      }
    }, timeout);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, textIdx, texts]);

  return (
    <span style={{ color: typeColors[textIdx % typeColors.length] }}>
      {texts[textIdx].substring(0, charIdx)}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse" }}
        style={{ color: colors.orange }}
      >
        {isCrayon ? "✏️" : "|"}
      </motion.span>
    </span>
  );
}
