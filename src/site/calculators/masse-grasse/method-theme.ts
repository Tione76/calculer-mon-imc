import type { BodyFatMethodId } from "./types";

export interface MethodTheme {
  accent: string;
  accentDark: string;
  light: string;
  label: string;
}

export const METHOD_THEMES: Record<BodyFatMethodId, MethodTheme> = {
  "deurenberg-1991": {
    accent: "#2563eb",
    accentDark: "#1d4ed8",
    light: "#eff6ff",
    label: "Bleu",
  },
  rfm: {
    accent: "#7c3aed",
    accentDark: "#6d28d9",
    light: "#f5f3ff",
    label: "Violet",
  },
  ymca: {
    accent: "#0d9488",
    accentDark: "#0f766e",
    light: "#f0fdfa",
    label: "Turquoise",
  },
  "us-navy": {
    accent: "#f97316",
    accentDark: "#ea580c",
    light: "#fff7ed",
    label: "Corail",
  },
};

export function getMethodTheme(methodId: BodyFatMethodId): MethodTheme {
  return METHOD_THEMES[methodId];
}
