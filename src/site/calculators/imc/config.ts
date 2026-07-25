import type { ImcCategory, ImcCategoryId } from "./types";

/**
 * Catégories IMC pour adultes (18 ans et plus).
 *
 * Formule : IMC = poids (kg) / taille (m)²
 *
 * Seuils alignés sur les repères publiés par l'Assurance Maladie pour
 * l'interprétation de l'IMC chez l'adulte (consulté le 2026-07-20).
 * @see https://www.ameli.fr/assure/sante/themes/obesite-adulte/imc-surpoids-obesite-adulte
 */
export const IMC_CATEGORIES: ImcCategory[] = [
  {
    id: "underweight",
    label: "Insuffisance pondérale",
    shortLabel: "Insuffisance",
    min: 0,
    max: 18.5,
    explanation:
      "Votre IMC se situe sous le seuil de 18,5 utilisé comme repère général chez l'adulte.",
    detail:
      "Cette catégorie est un repère statistique. Elle ne décrit pas à elle seule votre état nutritionnel ni vos besoins individuels.",
  },
  {
    id: "normal",
    label: "Corpulence normale",
    shortLabel: "Normal",
    min: 18.5,
    max: 25,
    explanation:
      "Votre IMC se situe dans la fourchette de corpulence normale, comprise entre 18,5 et 24,9 chez l'adulte.",
    detail:
      "Une corpulence normale selon l'IMC n'est pas une garantie de santé optimale. D'autres indicateurs, comme la répartition des graisses ou le tour de taille, peuvent compléter l'analyse.",
  },
  {
    id: "overweight",
    label: "Surpoids",
    shortLabel: "Surpoids",
    min: 25,
    max: 30,
    explanation: "Votre IMC se situe dans la catégorie surpoids, entre 25 et 29,9.",
    detail:
      "Le surpoids est un indicateur statistique. Il ne signifie pas automatiquement un problème de santé, surtout si la masse musculaire est élevée.",
  },
  {
    id: "obesity1",
    label: "Obésité modérée (classe I)",
    shortLabel: "Obésité modérée",
    min: 30,
    max: 35,
    explanation:
      "Votre IMC se situe dans la catégorie obésité modérée (classe I), entre 30 et 34,9.",
    detail:
      "Cette catégorie sert de repère populationnel. Seul un professionnel de santé peut interpréter ce résultat dans votre contexte personnel.",
  },
  {
    id: "obesity2",
    label: "Obésité sévère (classe II)",
    shortLabel: "Obésité sévère",
    min: 35,
    max: 40,
    explanation:
      "Votre IMC se situe dans la catégorie obésité sévère (classe II), entre 35 et 39,9.",
    detail:
      "L'IMC ne distingue pas masse grasse et masse musculaire. Une évaluation complète passe par d'autres examens si nécessaire.",
  },
  {
    id: "obesity3",
    label: "Obésité massive (classe III)",
    shortLabel: "Obésité massive",
    min: 40,
    max: null,
    explanation:
      "Votre IMC se situe dans la catégorie obésité massive (classe III), à partir de 40.",
    detail:
      "Ce résultat est indicatif. Pour toute question de santé, consultez un professionnel qualifié.",
  },
];

export const IMC_INPUT_LIMITS = {
  heightCm: { min: 100, max: 250 },
  weightKg: { min: 25, max: 300 },
} as const;

export const IMC_DEFAULTS = {
  heightCm: 170,
  weightKg: 70,
} as const;

export function getCategoryById(id: ImcCategoryId): ImcCategory {
  const found = IMC_CATEGORIES.find((c) => c.id === id);
  if (!found) throw new Error(`Catégorie IMC inconnue : ${id}`);
  return found;
}
