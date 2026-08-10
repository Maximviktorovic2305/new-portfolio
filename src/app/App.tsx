import { MotionConfig } from "motion/react";
import { HomePage } from "@/pages/home";
import { ThemeProvider } from "@/shared/config";
import { CookieNotice, YandexMetrika } from "@/shared/ui";

export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <HomePage />
        <CookieNotice />
        <YandexMetrika />
      </MotionConfig>
    </ThemeProvider>
  );
}
