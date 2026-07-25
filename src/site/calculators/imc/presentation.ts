import type { CalculatorResult } from "../types";

export const IMC_DISCLAIMER =
  "L'IMC est un indicateur statistique simple. Il ne tient pas compte notamment de la masse musculaire, de l'âge, du sexe ou de la morphologie.";

export const IMC_CALC_TITLE = "Renseignez vos informations";

export const IMC_STEP1_HELP = "Indiquez votre taille et votre poids en centimètres et en kilogrammes.";

export const IMC_STEP2_HELP = "Lancez le calcul lorsque vos mesures sont complètes et valides.";

export const IMC_STEP3_HELP = "Consultez votre valeur d'IMC, la catégorie associée et la jauge de référence.";

export const IMC_HEIGHT_LABEL = "Indiquez votre taille";

export const IMC_WEIGHT_LABEL = "Indiquez votre poids";

export const IMC_KEEP_IN_MIND_TITLE = "À retenir";

export const IMC_KEEP_IN_MIND = [
  IMC_DISCLAIMER,
  "Pour interpréter votre résultat dans son contexte, croisez-le avec votre évolution dans le temps et, en cas de doute, l'avis d'un professionnel de santé.",
] as const;

export const IMC_GUIDE_LINKS = [
  { href: "/guides/quest-ce-que-l-imc", label: "Qu'est-ce que l'IMC ?" },
  { href: "/guides/comment-interpreter-son-imc", label: "Comment interpréter son IMC ?" },
  { href: "/guides/limites-de-l-imc", label: "Les limites de l'IMC" },
] as const;

/** La carte IMC regroupe jauge, résultat et rappel des limites. */
export function imcResultToSections(): CalculatorResult {
  return { sections: [] };
}
