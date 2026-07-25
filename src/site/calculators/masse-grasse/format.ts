import { formatDecimalFr } from "../format/number";

export function roundBodyFatPercent(value: number): number {
  return Math.round(value * 10) / 10;
}

export function formatBodyFatPercent(value: number): string {
  return formatDecimalFr(roundBodyFatPercent(value), 1);
}

export function formatMassKg(value: number): string {
  return formatDecimalFr(Math.round(value * 10) / 10, 1);
}
