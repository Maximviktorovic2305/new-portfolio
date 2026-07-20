import { MotionConfig } from "motion/react";
import { HomePage } from "@/pages/home";
import { ThemeProvider } from "@/shared/config";

export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <HomePage />
      </MotionConfig>
    </ThemeProvider>
  );
}
