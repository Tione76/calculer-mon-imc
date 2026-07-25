import { parseNumericInRange, validateNumericInRange } from "../validation";
import { IMC_INPUT_LIMITS } from "./config";

const HEIGHT_MESSAGES = {
  invalid: "Saisissez votre taille en centimètres.",
  outOfRange: (min: number, max: number) =>
    `La taille doit être comprise entre ${min} et ${max} cm.`,
} as const;

const WEIGHT_MESSAGES = {
  invalid: "Saisissez votre poids en kilogrammes.",
  outOfRange: (min: number, max: number) =>
    `Le poids doit être compris entre ${min} et ${max} kg.`,
} as const;

export function validateHeightCm(value: string): string | null {
  return validateNumericInRange(value, IMC_INPUT_LIMITS.heightCm, HEIGHT_MESSAGES);
}

export function validateWeightKg(value: string): string | null {
  return validateNumericInRange(value, IMC_INPUT_LIMITS.weightKg, WEIGHT_MESSAGES);
}

export function parseHeightCm(value: string): number | null {
  return parseNumericInRange(value, IMC_INPUT_LIMITS.heightCm, HEIGHT_MESSAGES);
}

export function parseWeightKg(value: string): number | null {
  return parseNumericInRange(value, IMC_INPUT_LIMITS.weightKg, WEIGHT_MESSAGES);
}
