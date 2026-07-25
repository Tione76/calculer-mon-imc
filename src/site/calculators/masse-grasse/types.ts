export type BodyFatSex = "male" | "female";

export type BodyFatCategoryId =
  | "essential"
  | "very_athletic"
  | "athletic"
  | "fitness"
  | "normal"
  | "elevated"
  | "very_elevated";

export type BodyFatMethodId = "deurenberg-1991" | "rfm" | "ymca" | "us-navy";

export interface BodyFatCategory {
  id: BodyFatCategoryId;
  label: string;
  shortLabel: string;
  /** Lignes affichées sur la jauge (1 ou 2 lignes). */
  gaugeTitleLines: string[];
  min: number;
  max: number | null;
  explanation: string;
}

export interface BodyFatInput {
  sex: BodyFatSex;
  ageYears: number;
  heightCm: number;
  weightKg: number;
  waistCm?: number;
  neckCm?: number;
  hipCm?: number;
}

export interface BodyFatComposition {
  bodyFatPercent: number;
  fatMassKg: number;
  leanMassKg: number;
}

export interface BodyFatRfmResult {
  sex: BodyFatSex;
  heightCm: number;
  waistCm: number;
  bodyFatPercent: number;
  category: BodyFatCategory;
}

export interface BodyFatResult extends BodyFatComposition {
  bmi: number;
  category: BodyFatCategory;
  sex: BodyFatSex;
  ageYears: number;
  heightCm: number;
  weightKg: number;
}
