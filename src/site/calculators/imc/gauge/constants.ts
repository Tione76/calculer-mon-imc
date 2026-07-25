/**
 * Plage visuelle de la jauge semi-circulaire IMC.
 * Les seuils médicaux (IMC_CATEGORIES) ne sont pas modifiés : seule la projection
 * graphique est bornée entre ces valeurs.
 */
export const IMC_GAUGE_BMI_MIN = 10;
export const IMC_GAUGE_BMI_MAX = 50;

/** Bornes visibles principales sous la demi-roue. */
export const IMC_GAUGE_THRESHOLD_LABELS = [10, 18.5, 25, 30, 35, 40] as const;
