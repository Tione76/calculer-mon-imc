import { resolveThresholdCategory } from "../shared/threshold-category";
import { IMC_CATEGORIES } from "./config";
import type { ImcCategory, ImcInput, ImcResult } from "./types";

/** IMC = poids (kg) / taille (m)² */
export function calculateImc(input: ImcInput): ImcResult {
  const { heightCm, weightKg } = input;
  if (
    !Number.isFinite(heightCm) ||
    !Number.isFinite(weightKg) ||
    heightCm <= 0 ||
    weightKg <= 0
  ) {
    throw new Error("Entrées IMC invalides");
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const category = resolveImcCategory(bmi);

  return {
    bmi,
    category,
    heightCm,
    weightKg,
  };
}

export function resolveImcCategory(bmi: number): ImcCategory {
  return resolveThresholdCategory(bmi, IMC_CATEGORIES);
}
