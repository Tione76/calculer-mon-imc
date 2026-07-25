import type { BodyFatSex } from "./types";

/** Mode estimation rapide Deurenberg : adultes uniquement (18 ans et plus). */
export const BODY_FAT_QUICK_AGE_MIN = 18;

/** Deurenberg (1991) : formule enfant jusqu'à 15 ans (mode comparaison uniquement). */
export const BODY_FAT_CHILD_AGE_MAX = 15;

/** RFM, YMCA et U.S. Navy : populations adultes (NHANES / protocoles militaires). */
export const BODY_FAT_ADULT_ONLY_AGE_MIN = 18;

export const BODY_FAT_INPUT_LIMITS = {
  ageYears: { min: 7, max: 83 },
  heightCm: { min: 100, max: 250 },
  weightKg: { min: 25, max: 300 },
  waistCm: { min: 40, max: 200 },
  neckCm: { min: 20, max: 60 },
  hipCm: { min: 50, max: 200 },
} as const;

export const BODY_FAT_SANITY_PERCENT = {
  min: 2,
  max: 65,
} as const;

/** Deurenberg (1991) : homme = 1, femme = 0. */
export function deurenbergSexToNumeric(sex: BodyFatSex): number {
  return sex === "male" ? 1 : 0;
}

/** Woolcott & Bergman (2018) RFM : homme = 0, femme = 1. */
export function rfmSexToNumeric(sex: BodyFatSex): number {
  return sex === "female" ? 1 : 0;
}
