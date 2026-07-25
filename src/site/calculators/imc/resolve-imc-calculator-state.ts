import type { ImcResult } from "./types";
import { calculateImc } from "./engine";
import { parseHeightCm, parseWeightKg } from "./validation";

/** Détermine si un résultat IMC valide peut être affiché (les deux champs valides). */
export function resolveImcCalculatorResult(
  heightCm: string,
  weightKg: string,
  heightError: string | null,
  weightError: string | null,
): ImcResult | null {
  if (!heightCm.trim() || !weightKg.trim()) return null;
  if (heightError || weightError) return null;

  const parsedHeight = parseHeightCm(heightCm);
  const parsedWeight = parseWeightKg(weightKg);
  if (parsedHeight === null || parsedWeight === null) return null;

  return calculateImc({ heightCm: parsedHeight, weightKg: parsedWeight });
}
