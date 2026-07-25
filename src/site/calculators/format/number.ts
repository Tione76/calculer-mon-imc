/** Formate un nombre décimal pour affichage FR. */
export function formatDecimalFr(value: number, decimals = 1): string {
  return value.toLocaleString("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
