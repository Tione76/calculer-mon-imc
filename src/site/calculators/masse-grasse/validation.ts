import { validateNumericInRange, parseNumericInRange } from "../validation";
import { BODY_FAT_INPUT_LIMITS } from "./constants";
import type { BodyFatSex } from "./types";
import { getOptionalCompareMeasureFields } from "./method-requirements";

const AGE_MESSAGES = {
  invalid: "Saisissez votre âge en années.",
  outOfRange: (min: number, max: number) => `L'âge doit être compris entre ${min} et ${max} ans.`,
} as const;

const HEIGHT_MESSAGES = {
  invalid: "Saisissez votre taille en centimètres.",
  outOfRange: (min: number, max: number) => `La taille doit être comprise entre ${min} et ${max} cm.`,
} as const;

const WEIGHT_MESSAGES = {
  invalid: "Saisissez votre poids en kilogrammes.",
  outOfRange: (min: number, max: number) => `Le poids doit être compris entre ${min} et ${max} kg.`,
} as const;

const WAIST_MESSAGES = {
  invalid: "Saisissez votre tour de taille en centimètres.",
  outOfRange: (min: number, max: number) =>
    `Le tour de taille doit être compris entre ${min} et ${max} cm.`,
} as const;

const NECK_MESSAGES = {
  invalid: "Saisissez votre tour de cou en centimètres.",
  outOfRange: (min: number, max: number) => `Le tour de cou doit être compris entre ${min} et ${max} cm.`,
} as const;

const HIP_MESSAGES = {
  invalid: "Saisissez votre tour de hanches en centimètres.",
  outOfRange: (min: number, max: number) =>
    `Le tour de hanches doit être compris entre ${min} et ${max} cm.`,
} as const;

export function validateBodyFatAge(value: string): string | null {
  return validateNumericInRange(value, BODY_FAT_INPUT_LIMITS.ageYears, AGE_MESSAGES);
}

export function validateBodyFatHeightCm(value: string): string | null {
  return validateNumericInRange(value, BODY_FAT_INPUT_LIMITS.heightCm, HEIGHT_MESSAGES);
}

export function validateBodyFatWeightKg(value: string): string | null {
  return validateNumericInRange(value, BODY_FAT_INPUT_LIMITS.weightKg, WEIGHT_MESSAGES);
}

export function validateBodyFatWaistCm(value: string): string | null {
  return validateNumericInRange(value, BODY_FAT_INPUT_LIMITS.waistCm, WAIST_MESSAGES);
}

export function validateBodyFatNeckCm(value: string): string | null {
  return validateNumericInRange(value, BODY_FAT_INPUT_LIMITS.neckCm, NECK_MESSAGES);
}

export function validateBodyFatHipCm(value: string): string | null {
  return validateNumericInRange(value, BODY_FAT_INPUT_LIMITS.hipCm, HIP_MESSAGES);
}

export function parseBodyFatAge(value: string): number | null {
  return parseNumericInRange(value, BODY_FAT_INPUT_LIMITS.ageYears, AGE_MESSAGES);
}

export function parseBodyFatHeightCm(value: string): number | null {
  return parseNumericInRange(value, BODY_FAT_INPUT_LIMITS.heightCm, HEIGHT_MESSAGES);
}

export function parseBodyFatWeightKg(value: string): number | null {
  return parseNumericInRange(value, BODY_FAT_INPUT_LIMITS.weightKg, WEIGHT_MESSAGES);
}

export function parseBodyFatWaistCm(value: string): number | null {
  return parseNumericInRange(value, BODY_FAT_INPUT_LIMITS.waistCm, WAIST_MESSAGES);
}

export function parseBodyFatNeckCm(value: string): number | null {
  return parseNumericInRange(value, BODY_FAT_INPUT_LIMITS.neckCm, NECK_MESSAGES);
}

export function parseBodyFatHipCm(value: string): number | null {
  return parseNumericInRange(value, BODY_FAT_INPUT_LIMITS.hipCm, HIP_MESSAGES);
}

export function validateBodyFatFormOnSubmit(
  age: string,
  heightCm: string,
  weightKg: string,
): { ageError: string | null; heightError: string | null; weightError: string | null } {
  return {
    ageError: age.trim() ? validateBodyFatAge(age) : AGE_MESSAGES.invalid,
    heightError: heightCm.trim() ? validateBodyFatHeightCm(heightCm) : HEIGHT_MESSAGES.invalid,
    weightError: weightKg.trim() ? validateBodyFatWeightKg(weightKg) : WEIGHT_MESSAGES.invalid,
  };
}

export function validateCompareBaseOnSubmit(
  age: string,
  heightCm: string,
  weightKg: string,
  waistCm: string,
): {
  ageError: string | null;
  heightError: string | null;
  weightError: string | null;
  waistError: string | null;
} {
  const base = validateBodyFatFormOnSubmit(age, heightCm, weightKg);
  return {
    ...base,
    waistError: waistCm.trim() ? validateBodyFatWaistCm(waistCm) : WAIST_MESSAGES.invalid,
  };
}

export function validateCompareOptionalMeasuresOnSubmit(
  sex: BodyFatSex,
  neckCm: string,
  hipCm: string,
): {
  neckError: string | null;
  hipError: string | null;
} {
  return {
    neckError: neckCm.trim() ? validateBodyFatNeckCm(neckCm) : null,
    hipError: sex === "female" && hipCm.trim() ? validateBodyFatHipCm(hipCm) : null,
  };
}

export function validatePersonalizedFormOnSubmit(
  heightCm: string,
  waistCm: string,
): { heightError: string | null; waistError: string | null } {
  return {
    heightError: heightCm.trim() ? validateBodyFatHeightCm(heightCm) : HEIGHT_MESSAGES.invalid,
    waistError: waistCm.trim() ? validateBodyFatWaistCm(waistCm) : WAIST_MESSAGES.invalid,
  };
}

/** @deprecated Utiliser validateCompareBaseOnSubmit et validateCompareOptionalMeasuresOnSubmit. */
export function validateCompareMeasuresOnSubmit(
  sex: BodyFatSex,
  waistCm: string,
  neckCm: string,
  hipCm: string,
): {
  waistError: string | null;
  neckError: string | null;
  hipError: string | null;
} {
  const fields = getOptionalCompareMeasureFields(sex);
  return {
    waistError: null,
    neckError: fields.includes("neckCm")
      ? neckCm.trim()
        ? validateBodyFatNeckCm(neckCm)
        : NECK_MESSAGES.invalid
      : null,
    hipError: fields.includes("hipCm")
      ? hipCm.trim()
        ? validateBodyFatHipCm(hipCm)
        : HIP_MESSAGES.invalid
      : null,
  };
}

export function isMeasureFieldVisible(
  field: "waistCm" | "neckCm" | "hipCm",
  sex: BodyFatSex,
  baseFieldsValid: boolean,
  waistValid: boolean,
): boolean {
  if (!baseFieldsValid) return false;
  if (field === "waistCm") return true;
  if (field === "neckCm") return waistValid;
  if (field === "hipCm") return sex === "female" && waistValid;
  return false;
}
