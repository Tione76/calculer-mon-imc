import { createLegacyCalculatorGoneResponse } from "@/site/legacy-calculator-gone";

export function GET() {
  return createLegacyCalculatorGoneResponse();
}

export function HEAD() {
  return createLegacyCalculatorGoneResponse();
}
