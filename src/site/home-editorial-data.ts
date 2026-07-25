/** Date de dernière révision significative du contenu éditorial accueil. */
export const HOME_EDITORIAL_UPDATED_AT = "2026-07-24";

export function formatEditorialNumber(value: number, decimals = 1): string {
  return value.toLocaleString("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** Exemple pédagogique : 170 cm, 70 kg → IMC 24,2 */
export function exampleImc170_70() {
  return { heightCm: 170, weightKg: 70, bmi: 24.2, category: "Corpulence normale" };
}

/** Exemple pédagogique : 180 cm, 90 kg → IMC 27,8 */
export function exampleImc180_90() {
  return { heightCm: 180, weightKg: 90, bmi: 27.8, category: "Surpoids" };
}

/** Exemple pédagogique : 165 cm, 50 kg → IMC 18,4 */
export function exampleImc165_50() {
  return { heightCm: 165, weightKg: 50, bmi: 18.4, category: "Insuffisance pondérale" };
}

/** Catégories OMS / Assurance Maladie (adultes), affichage pédagogique. */
export const IMC_CATEGORY_ROWS = [
  { range: "Moins de 18,5", label: "Insuffisance pondérale (maigreur)" },
  { range: "18,5 à 24,9", label: "Corpulence normale" },
  { range: "25 à 29,9", label: "Surpoids" },
  { range: "30 à 34,9", label: "Obésité modérée (classe I)" },
  { range: "35 à 39,9", label: "Obésité sévère (classe II)" },
  { range: "40 et plus", label: "Obésité massive (classe III)" },
] as const;
