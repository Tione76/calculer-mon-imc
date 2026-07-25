import { CM_PER_INCH, FIVE_FEET_INCHES } from "./constants";

/** Convertit une taille en centimètres en pouces (sans arrondi intermédiaire). */
export function cmToInches(heightCm: number): number {
  return heightCm / CM_PER_INCH;
}

/**
 * Nombre de pouces au-delà de 5 pieds (60 pouces).
 * Formules Devine, Miller, Robinson et Hamwi : base + coeff × (pouces − 60).
 */
export function inchesOverFiveFeet(heightCm: number): number {
  return cmToInches(heightCm) - FIVE_FEET_INCHES;
}
