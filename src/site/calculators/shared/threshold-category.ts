/** Catégorie basée sur un seuil minimum (ex. catégories OMS de l'IMC). */
export interface ThresholdCategory {
  min: number;
  max: number | null;
}

/** Retourne la catégorie dont le seuil min est le plus élevé sans dépasser la valeur. */
export function resolveThresholdCategory<T extends ThresholdCategory>(
  value: number,
  categories: T[],
): T {
  for (let i = categories.length - 1; i >= 0; i -= 1) {
    const category = categories[i];
    if (value >= category.min) return category;
  }
  return categories[0];
}
