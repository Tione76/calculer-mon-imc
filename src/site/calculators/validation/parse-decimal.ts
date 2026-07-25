/** Parse une saisie décimale FR (virgule, espaces) en number fini. */
export function parseDecimalInput(value: string): number | null {
  const normalized = value.trim().replace(/\s/g, "").replace(",", ".");
  if (!normalized) return null;
  const parsed = Number(normalized);
  if (!Number.isFinite(parsed)) return null;
  return parsed;
}
