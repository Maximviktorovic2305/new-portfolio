import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type ThemeName = "crayon" | "original" | "classic";

export interface ThemePreset {
  id: ThemeName;
  label: string;
  emoji: string;
  description: string;
  isLight: boolean;
}

export const themePresets = [
  {
    id: "crayon",
    label: "Иллюстрация",
    emoji: "✨",
    description: "Мягкий авторский стиль",
    isLight: true,
  },
  {
    id: "original",
    label: "Космос",
    emoji: "🌌",
    description: "Тёмный с анимациями",
    isLight: false,
  },
  {
    id: "classic",
    label: "Классика",
    emoji: "🖤",
    description: "Чистый тёмный минимализм",
    isLight: false,
  },
] as const satisfies readonly ThemePreset[];

const THEME_STORAGE_KEY = "portfolio-theme";
const themeNames = new Set<ThemeName>(themePresets.map(({ id }) => id));
const allThemeClasses = themePresets.map(({ id }) => `theme-${id}`);

export function isThemeName(value: unknown): value is ThemeName {
  return typeof value === "string" && themeNames.has(value as ThemeName);
}

function readStoredTheme(): ThemeName {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeName(value) ? value : "crayon";
  } catch {
    return "crayon";
  }
}

interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  isCrayon: boolean;
  isDark: boolean;
  isClassic: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(readStoredTheme);
  const setTheme = useCallback((nextTheme: ThemeName) => setThemeState(nextTheme), []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(...allThemeClasses);
    root.classList.add(`theme-${theme}`);
    root.style.colorScheme = theme === "crayon" ? "light" : "dark";

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Storage can be unavailable in privacy modes; the in-memory theme still works.
    }
  }, [theme]);

  const value = useMemo<ThemeContextValue>(() => {
    const preset = themePresets.find(({ id }) => id === theme);
    return {
      theme,
      setTheme,
      isCrayon: theme === "crayon",
      isDark: !preset?.isLight,
      isClassic: theme === "classic",
    };
  }, [setTheme, theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
