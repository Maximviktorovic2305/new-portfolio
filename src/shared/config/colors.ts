/**
 * Brand color palette — single source of truth for JS-based dynamic styles.
 * These are the BRAND accent colors, shared across all themes.
 * Surface/text colors come from CSS custom properties (theme.css).
 */
export const colors = {
  /* ── brand accents (same across themes) ── */
  pink: "#e8366d",
  teal: "#14b8a6",
  tealHover: "#0d9488",
  orange: "#f59e0b",
  lavender: "#a78bfa",
  lime: "#84cc16",
  sky: "#6dd5ed",
  red: "#e53e3e",
  yellow: "#eab308",
} as const;

export type BrandColor = (typeof colors)[keyof typeof colors];
