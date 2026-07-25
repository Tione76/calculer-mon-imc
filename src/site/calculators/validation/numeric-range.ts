import type { NumericFieldMessages, NumericFieldRange } from "../types/fields";
import { parseDecimalInput } from "./parse-decimal";

export function validateNumericInRange(
  value: string,
  range: NumericFieldRange,
  messages: NumericFieldMessages,
): string | null {
  const parsed = parseDecimalInput(value);
  if (parsed === null) return messages.invalid;
  if (parsed < range.min || parsed > range.max) {
    return messages.outOfRange(range.min, range.max);
  }
  return null;
}

export function parseNumericInRange(
  value: string,
  range: NumericFieldRange,
  messages: NumericFieldMessages,
): number | null {
  if (validateNumericInRange(value, range, messages)) return null;
  return parseDecimalInput(value);
}
