import type { BodyFatCategory, BodyFatCategoryId, BodyFatSex } from "./types";

/**
 * Seuils inspirés de Gallagher et al. (2000, AJCN 72:3:694-701) et des repères ACE,
 * répartis en 7 catégories lisibles pour le grand public.
 */
export const BODY_FAT_CATEGORIES_BY_SEX: Record<BodyFatSex, BodyFatCategory[]> = {
  male: [
    {
      id: "essential",
      label: "Graisse essentielle",
      shortLabel: "Graisse essentielle",
      gaugeTitleLines: ["GRAISSE", "ESSENTIELLE"],
      min: 0,
      max: 6,
      explanation: "Votre taux se situe dans la zone minimale dont l'organisme a besoin pour fonctionner.",
    },
    {
      id: "very_athletic",
      label: "Très athlétique",
      shortLabel: "Très athlétique",
      gaugeTitleLines: ["TRÈS", "ATHLÉTIQUE"],
      min: 6,
      max: 10,
      explanation: "Votre taux correspond à un profil très sportif, souvent observé chez les athlètes de haut niveau.",
    },
    {
      id: "athletic",
      label: "Athlétique",
      shortLabel: "Athlétique",
      gaugeTitleLines: ["ATHLÉTIQUE"],
      min: 10,
      max: 14,
      explanation: "Votre taux est typique d'une personne active avec une bonne condition physique.",
    },
    {
      id: "fitness",
      label: "Bonne composition",
      shortLabel: "Bonne composition",
      gaugeTitleLines: ["BONNE", "COMPOSITION"],
      min: 14,
      max: 18,
      explanation: "Votre taux se situe dans une fourchette généralement associée à une bonne forme physique.",
    },
    {
      id: "normal",
      label: "Masse grasse normale",
      shortLabel: "Masse grasse normale",
      gaugeTitleLines: ["MASSE GRASSE", "NORMALE"],
      min: 18,
      max: 25,
      explanation: "Votre taux se situe dans la fourchette habituelle pour un homme adulte.",
    },
    {
      id: "elevated",
      label: "Masse grasse élevée",
      shortLabel: "Masse grasse élevée",
      gaugeTitleLines: ["MASSE GRASSE", "ÉLEVÉE"],
      min: 25,
      max: 30,
      explanation: "Votre taux est un peu au-dessus des valeurs généralement observées pour votre sexe.",
    },
    {
      id: "very_elevated",
      label: "Masse grasse très élevée",
      shortLabel: "Masse grasse très élevée",
      gaugeTitleLines: ["MASSE GRASSE", "TRÈS ÉLEVÉE"],
      min: 30,
      max: null,
      explanation: "Votre taux se situe nettement au-dessus des repères populationnels pour un homme adulte.",
    },
  ],
  female: [
    {
      id: "essential",
      label: "Graisse essentielle",
      shortLabel: "Graisse essentielle",
      gaugeTitleLines: ["GRAISSE", "ESSENTIELLE"],
      min: 0,
      max: 14,
      explanation: "Votre taux se situe dans la zone minimale dont l'organisme a besoin pour fonctionner.",
    },
    {
      id: "very_athletic",
      label: "Très athlétique",
      shortLabel: "Très athlétique",
      gaugeTitleLines: ["TRÈS", "ATHLÉTIQUE"],
      min: 14,
      max: 18,
      explanation: "Votre taux correspond à un profil très sportif, souvent observé chez les athlètes de haut niveau.",
    },
    {
      id: "athletic",
      label: "Athlétique",
      shortLabel: "Athlétique",
      gaugeTitleLines: ["ATHLÉTIQUE"],
      min: 18,
      max: 21,
      explanation: "Votre taux est typique d'une personne active avec une bonne condition physique.",
    },
    {
      id: "fitness",
      label: "Bonne composition",
      shortLabel: "Bonne composition",
      gaugeTitleLines: ["BONNE", "COMPOSITION"],
      min: 21,
      max: 25,
      explanation: "Votre taux se situe dans une fourchette généralement associée à une bonne forme physique.",
    },
    {
      id: "normal",
      label: "Masse grasse normale",
      shortLabel: "Masse grasse normale",
      gaugeTitleLines: ["MASSE GRASSE", "NORMALE"],
      min: 25,
      max: 32,
      explanation: "Votre taux se situe dans la fourchette habituelle pour une femme adulte.",
    },
    {
      id: "elevated",
      label: "Masse grasse élevée",
      shortLabel: "Masse grasse élevée",
      gaugeTitleLines: ["MASSE GRASSE", "ÉLEVÉE"],
      min: 32,
      max: 38,
      explanation: "Votre taux est un peu au-dessus des valeurs généralement observées pour votre sexe.",
    },
    {
      id: "very_elevated",
      label: "Masse grasse très élevée",
      shortLabel: "Masse grasse très élevée",
      gaugeTitleLines: ["MASSE GRASSE", "TRÈS ÉLEVÉE"],
      min: 38,
      max: null,
      explanation: "Votre taux se situe nettement au-dessus des repères populationnels pour une femme adulte.",
    },
  ],
};

export function resolveBodyFatCategory(
  bodyFatPercent: number,
  sex: BodyFatSex,
): BodyFatCategory {
  const categories = BODY_FAT_CATEGORIES_BY_SEX[sex];
  for (const category of categories) {
    if (category.max === null) {
      if (bodyFatPercent >= category.min) return category;
      continue;
    }
    if (bodyFatPercent >= category.min && bodyFatPercent < category.max) {
      return category;
    }
  }
  return categories[categories.length - 1]!;
}

export function getCategoryById(sex: BodyFatSex, id: BodyFatCategoryId): BodyFatCategory {
  const found = BODY_FAT_CATEGORIES_BY_SEX[sex].find((category) => category.id === id);
  if (!found) throw new Error(`Catégorie masse grasse inconnue : ${id}`);
  return found;
}
