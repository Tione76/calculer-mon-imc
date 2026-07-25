import { formatDecimalFr } from "../format";

export function formatImcValue(bmi: number): string {
  return formatDecimalFr(bmi, 1);
}
