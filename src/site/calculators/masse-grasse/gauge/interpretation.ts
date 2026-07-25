import type { BodyFatCategoryId } from "../types";

export const BODY_FAT_IDLE_METRICS_PRIMARY = "Votre résultat s'affichera ici";

export const BODY_FAT_IDLE_METRICS_SECONDARY =
  "Renseignez vos informations puis lancez le calcul pour obtenir votre pourcentage de masse grasse.";

export const BODY_FAT_IDLE_INTERPRETATION =
  "Saisissez vos mesures pour obtenir une estimation de votre masse grasse et la catégorie correspondante.";

export const BODY_FAT_IDLE_ACCESSIBLE_SUMMARY =
  "Aucun résultat pour le moment. Renseignez vos informations pour estimer votre masse grasse.";

export const BODY_FAT_LIMITS_SUMMARY =
  "Ces estimations reposent sur des formules statistiques. Elles ne remplacent pas une mesure directe (DEXA, impédancemétrie, plis cutanés) ni un avis médical.";

export const BODY_FAT_LIMITS_GUIDE = {
  href: "/guides/limites-de-l-imc",
  label: "Comprendre les limites de ces indicateurs",
} as const;

const INTERPRETATION_BY_ID: Record<BodyFatCategoryId, string> = {
  essential:
    "Votre taux se situe dans la zone de graisse essentielle, le minimum dont l'organisme a besoin.",
  very_athletic:
    "Votre taux correspond à un profil très sportif, comparable à celui de nombreux athlètes.",
  athletic: "Votre taux est typique d'une personne active et en bonne condition physique.",
  fitness: "Votre taux indique une bonne composition corporelle pour votre sexe.",
  normal: "Votre taux se situe dans la fourchette normale pour votre sexe.",
  elevated: "Votre taux est un peu au-dessus de la fourchette habituelle pour votre sexe.",
  very_elevated:
    "Votre taux se situe nettement au-dessus des repères habituels pour votre sexe.",
};

export function getBodyFatInterpretationSentence(categoryId: BodyFatCategoryId): string {
  return INTERPRETATION_BY_ID[categoryId];
}

export function buildBodyFatAccessibleSummary(
  formattedPercent: string,
  categoryLabel: string,
  categoryId: BodyFatCategoryId,
  sexLabel: string,
): string {
  return `Masse grasse estimée : ${formattedPercent} %. Catégorie : ${categoryLabel}. Profil : ${sexLabel}. ${getBodyFatInterpretationSentence(categoryId)} ${BODY_FAT_LIMITS_SUMMARY}`;
}
