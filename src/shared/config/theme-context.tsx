import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type ThemeName = "crayon" | "original" | "classic";

export interface ThemePreset {
  id: ThemeName;
  label: string;
  emoji: string;
  description: string;
  isLight: boolean;
}

export const themePresets: ThemePreset[] = [
  { id: "crayon",   label: "Иллюстрация", emoji: "✨", description: "Мягкий авторский стиль",   isLight: true },
  { id: "original", label: "Космос",   emoji: "🌌", description: "Тёмный с анимациями",     isLight: false },
  { id: "classic",  label: "Классика", emoji: "🖤", description: "Чистый тёмный минимализм", isLight: false },
];

const ALL_THEME_CLASSES = themePresets.map(p => `theme-${p.id}`);

interface ThemeCtx {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  isCrayon: boolean;
  isDark: boolean;
  isClassic: boolean;
}

const ThemeContext = createContext<ThemeCtx>({
  theme: "crayon",
  setTheme: () => {},
  isCrayon: true,
  isDark: false,
  isClassic: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio-theme") as ThemeName | null;
      if (saved && ALL_THEME_CLASSES.includes(`theme-${saved}`)) return saved;
    }
    return "crayon";
  });

  const setTheme = (t: ThemeName) => {
    setThemeState(t);
    localStorage.setItem("portfolio-theme", t);
  };

  useEffect(() => {
    const root = document.documentElement;
    ALL_THEME_CLASSES.forEach(c => root.classList.remove(c));
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  const preset = themePresets.find(p => p.id === theme)!;

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      isCrayon: theme === "crayon",
      isDark: !preset.isLight,
      isClassic: theme === "classic",
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
