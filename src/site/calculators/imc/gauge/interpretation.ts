import type { ImcCategory, ImcCategoryId } from "../types";

/** Mention discrète sur le périmètre adulte (alternative accessible complète). */
export const IMC_ADULT_SCOPE_NOTE =
  "Cette interprétation repose sur les repères utilisés par l'Assurance Maladie pour l'adulte. Elle ne convient pas aux enfants, aux adolescents, aux femmes enceintes, aux sportifs très musclés, à certaines personnes âgées, ni à toute situation nécessitant une évaluation personnalisée.";

/** Rappel court sur les limites de l'indicateur (bloc bas de carte). */
export const IMC_LIMITS_SUMMARY =
  "L'IMC est un indicateur statistique simple. Il ne tient pas compte notamment de la masse musculaire, de l'âge, du sexe ou de la morphologie.";

export const IMC_LIMITS_GUIDE = {
  href: "/guides/limites-de-l-imc",
  label: "Découvrez les limites de l'IMC",
} as const;

/** Messages de la carte avant calcul (même emplacements que le résultat). */
export const IMC_IDLE_METRICS_PRIMARY = "Votre résultat s'affichera ici";

export const IMC_IDLE_METRICS_SECONDARY =
  "Renseignez votre taille et votre poids pour calculer votre IMC.";

export const IMC_IDLE_INTERPRETATION =
  "Saisissez vos mesures pour obtenir votre valeur d'IMC et la catégorie correspondante.";

export const IMC_IDLE_ACCESSIBLE_SUMMARY =
  "Aucun résultat pour le moment. Renseignez votre taille et votre poids.";
const INTERPRETATION_BY_ID: Record<ImcCategoryId, string> = {
  underweight:
    "Votre IMC se situe sous le seuil de 18,5 utilisé comme repère général chez l'adulte.",
  normal:
    "Votre IMC se situe dans la fourchette de corpulence normale, comprise entre 18,5 et 24,9 chez l'adulte.",
  overweight:
    "Votre IMC se situe dans la catégorie surpoids, entre 25 et 29,9.",
  obesity1:
    "Votre IMC se situe dans la catégorie obésité modérée (classe I), entre 30 et 34,9.",
  obesity2:
    "Votre IMC se situe dans la catégorie obésité sévère (classe II), entre 35 et 39,9.",
  obesity3:
    "Votre IMC se situe dans la catégorie obésité massive (classe III), à partir de 40.",
};

/** Fourchette textuelle pour l'alternative accessible. */
export function formatImcCategoryRange(category: ImcCategory): string {
  if (category.max === null) {
    return `${category.min} et plus`;
  }
  if (category.min <= 0) {
    return `inférieur à ${category.max}`;
  }
  const upper = Math.round((category.max - 0.1) * 10) / 10;
  return `${category.min} à ${upper}`;
}

export function getImcInterpretationSentence(categoryId: ImcCategoryId): string {
  return INTERPRETATION_BY_ID[categoryId];
}

/** Résumé textuel complet (alternative à la jauge décorative). */
export function buildImcAccessibleSummary(
  formattedBmi: string,
  category: ImcCategory,
): string {
  return `IMC ${formattedBmi} kg/m². Catégorie : ${category.label}. Fourchette de référence : ${formatImcCategoryRange(category)}. ${getImcInterpretationSentence(category.id)} ${IMC_ADULT_SCOPE_NOTE}`;
}