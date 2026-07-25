import {
  BODY_FAT_ADULT_ONLY_AGE_MIN,
  BODY_FAT_CHILD_AGE_MAX,
  deurenbergSexToNumeric,
  rfmSexToNumeric,
} from "./constants";
import type { BodyFatInput, BodyFatMethodId, BodyFatSex } from "./types";

const LB_PER_KG = 1 / 0.45359237;
const CM_PER_INCH = 2.54;

/** IMC interne (non affiché) : poids (kg) / taille (m)² */
export function computeBmi(heightCm: number, weightKg: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

/**
 * Deurenberg et al. (1991), formule adulte uniquement.
 * Sexe : homme = 1, femme = 0.
 */
export function deurenberg1991AdultBodyFatPercent(input: BodyFatInput): number {
  const bmi = computeBmi(input.heightCm, input.weightKg);
  const sex = deurenbergSexToNumeric(input.sex);
  return 1.2 * bmi + 0.23 * input.ageYears - 10.8 * sex - 5.4;
}

/**
 * Deurenberg et al. (1991), British Journal of Nutrition, 65(2):105-114.
 * Sexe : homme = 1, femme = 0.
 */
export function deurenberg1991BodyFatPercent(input: BodyFatInput): number {
  const bmi = computeBmi(input.heightCm, input.weightKg);
  const sex = deurenbergSexToNumeric(input.sex);

  if (input.ageYears <= BODY_FAT_CHILD_AGE_MAX) {
    return 1.51 * bmi - 0.7 * input.ageYears - 3.6 * sex + 1.4;
  }

  return deurenberg1991AdultBodyFatPercent(input);
}

/**
 * Woolcott & Bergman (2018), Scientific Reports, 8:10980.
 * RFM = 64 − (20 × taille/tour de taille) + (12 × sexe), même unité pour taille et tour.
 * Sexe : homme = 0, femme = 1.
 */
export function rfmBodyFatPercentFromMeasures(
  sex: BodyFatSex,
  heightCm: number,
  waistCm: number,
): number {
  if (waistCm <= 0) return NaN;
  const sexNumeric = rfmSexToNumeric(sex);
  return 64 - 20 * (heightCm / waistCm) + 12 * sexNumeric;
}

export function rfmBodyFatPercent(input: BodyFatInput): number {
  const waistCm = input.waistCm;
  if (waistCm === undefined || waistCm <= 0) return NaN;
  return rfmBodyFatPercentFromMeasures(input.sex, input.heightCm, waistCm);
}

/**
 * Formule YMCA (poids en lb, tour de taille en pouces au nombril).
 * Références : YMCA Fitness Testing and Assessment Manual ; Golding et al.
 * Homme : ((4,15 × T − 0,082 × P − 98,42) / P) × 100
 * Femme : ((4,15 × T − 0,082 × P − 76,76) / P) × 100
 */
export function ymcaBodyFatPercent(input: BodyFatInput): number {
  const waistCm = input.waistCm;
  if (waistCm === undefined || waistCm <= 0) return NaN;

  const weightLb = input.weightKg * LB_PER_KG;
  const waistIn = waistCm / CM_PER_INCH;
  const intercept = input.sex === "male" ? 98.42 : 76.76;

  return ((4.15 * waistIn - 0.082 * weightLb - intercept) / weightLb) * 100;
}

/**
 * Hodgdon & Beckett (1984), Naval Health Research Center Reports 84-11 et 84-29.
 * Mesures en centimètres ; densité puis %MG = 495/densité − 450.
 * Homme : abdomen au nombril ; femme : taille (point le plus étroit), hanches (point le plus large).
 */
export function usNavyBodyFatPercent(input: BodyFatInput): number {
  const waistCm = input.waistCm;
  const neckCm = input.neckCm;
  if (waistCm === undefined || neckCm === undefined) return NaN;

  let density: number;

  if (input.sex === "male") {
    const abdomenMinusNeck = waistCm - neckCm;
    if (abdomenMinusNeck <= 0) return NaN;
    density =
      1.0324 -
      0.19077 * Math.log10(abdomenMinusNeck) +
      0.15456 * Math.log10(input.heightCm);
  } else {
    const hipCm = input.hipCm;
    if (hipCm === undefined) return NaN;
    const waistHipNeck = waistCm + hipCm - neckCm;
    if (waistHipNeck <= 0) return NaN;
    density =
      1.29579 -
      0.35004 * Math.log10(waistHipNeck) +
      0.221 * Math.log10(input.heightCm);
  }

  if (density <= 0) return NaN;

  return 495 / density - 450;
}

export function computeComposition(
  bodyFatPercent: number,
  weightKg: number,
): { bodyFatPercent: number; fatMassKg: number; leanMassKg: number } {
  const fatMassKg = (weightKg * bodyFatPercent) / 100;
  const leanMassKg = weightKg - fatMassKg;
  return { bodyFatPercent, fatMassKg, leanMassKg };
}

export function isAdultOnlyMethod(methodId: BodyFatMethodId): boolean {
  return methodId !== "deurenberg-1991";
}

export function methodSupportsAge(methodId: BodyFatMethodId, ageYears: number): boolean {
  if (methodId === "deurenberg-1991") return true;
  return ageYears >= BODY_FAT_ADULT_ONLY_AGE_MIN;
}

export function adultOnlyMessage(): string {
  return "Cette méthode est validée pour les adultes (18 ans et plus).";
}

export function missingFieldMessage(fieldLabel: string): string {
  return `Renseignez ${fieldLabel} pour utiliser cette méthode.`;
}

export function invalidCircumferenceMessage(): string {
  return "Vérifiez vos mesures : certaines valeurs ne permettent pas le calcul.";
}

export function sexLabel(sex: BodyFatSex): string {
  return sex === "male" ? "homme" : "femme";
}
