export type ImcCategoryId =
  | "underweight"
  | "normal"
  | "overweight"
  | "obesity1"
  | "obesity2"
  | "obesity3";

export interface ImcCategory {
  id: ImcCategoryId;
  label: string;
  shortLabel: string;
  min: number;
  max: number | null;
  explanation: string;
  detail: string;
}

export interface ImcInput {
  heightCm: number;
  weightKg: number;
}

export interface ImcResult {
  bmi: number;
  category: ImcCategory;
  heightCm: number;
  weightKg: number;
}
