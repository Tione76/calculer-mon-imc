import { parseDecimalInput } from "../validation/parse-decimal";
import { HEIGHT_MAX_CM, HEIGHT_MIN_CM } from "./constants";

export function validateIdealWeightHeightCm(value: string): string | null {
  const parsed = parseDecimalInput(value);
  if (parsed === null) {
    return "Vérifiez la valeur saisie.";
  }
  if (parsed < HEIGHT_MIN_CM || parsed > HEIGHT_MAX_CM) {
    return `Saisissez une taille comprise entre ${HEIGHT_MIN_CM} et ${HEIGHT_MAX_CM} cm.`;
  }
  return null;
}

export function parseIdealWeightHeightCm(value: string): number | null {
  if (validateIdealWeightHeightCm(value)) return null;
  return parseDecimalInput(value);
}

export function validateIdealWeightHeightOnSubmit(value: string): string | null {
  if (!value.trim()) {
    return "Indiquez votre taille.";
  }
  return validateIdealWeightHeightCm(value);
}
