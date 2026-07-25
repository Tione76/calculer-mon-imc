import { formatDecimalFr } from "../format/number";

/** Arrondi final uniquement : une décimale, valeur interne conservée avant affichage. */
export function roundIdealWeightKg(value: number): number {
  return Math.round(value * 10) / 10;
}

export function formatIdealWeightKg(value: number): string {
  return `${formatDecimalFr(roundIdealWeightKg(value), 1)} kg`;
}
