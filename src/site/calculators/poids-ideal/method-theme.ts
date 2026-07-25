import type { IdealWeightMethodId } from "./constants";

export interface MethodTheme {
  accent: string;
  accentDark: string;
  light: string;
  label: string;
}

/** Couleurs d'accent par méthode (identité visuelle secondaire, fonds restant clairs). */
export const METHOD_THEMES: Record<IdealWeightMethodId, MethodTheme> = {
  lorentz: {
    accent: "#2563eb",
    accentDark: "#1d4ed8",
    light: "#eff6ff",
    label: "Bleu",
  },
  devine: {
    accent: "#7c3aed",
    accentDark: "#6d28d9",
    light: "#f5f3ff",
    label: "Violet",
  },
  miller: {
    accent: "#0d9488",
    accentDark: "#0f766e",
    light: "#f0fdfa",
    label: "Turquoise",
  },
  robinson: {
    accent: "#f97316",
    accentDark: "#ea580c",
    light: "#fff7ed",
    label: "Corail doux",
  },
  hamwi: {
    accent: "#b45309",
    accentDark: "#92400e",
    light: "#fef9ec",
    label: "Ocre doré",
  },
  broca: {
    accent: "#475569",
    accentDark: "#334155",
    light: "#f8fafc",
    label: "Ardoise",
  },
};

export function getMethodTheme(methodId: IdealWeightMethodId): MethodTheme {
  return METHOD_THEMES[methodId];
}
