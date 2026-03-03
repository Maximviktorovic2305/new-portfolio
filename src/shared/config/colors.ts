/**
 * Brand color palette — single source of truth.
 * CSS custom properties in theme.css mirror these values.
 * Use Tailwind utility classes (e.g. `text-brand-pink`) for static styling.
 * Import this module when colors are needed in JS expressions (dynamic opacity, etc.).
 */
export const colors = {
  /** Deep indigo background */
  bg: "#0f0e1a",
  /** Card / elevated surface */
  card: "#1a1730",

  /* ── brand accents ── */
  pink: "#e8366d",
  teal: "#14b8a6",
  tealHover: "#0d9488",
  orange: "#f59e0b",
  lavender: "#a78bfa",
  lime: "#84cc16",
  sky: "#6dd5ed",

  /* ── text palette ── */
  textPrimary: "#e8e0f0",
  textSecondary: "#c4b8e0",
  textMuted: "#9b8fbf",
  textDim: "#5a4f7a",
} as const;

export type BrandColor = (typeof colors)[keyof typeof colors];
