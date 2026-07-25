/** Guides IMC partageant la charte éditoriale et visuelle de référence. */
export const IMC_REFERENCE_GUIDE_SLUGS = new Set([
  "quest-ce-que-l-imc",
  "comment-calculer-son-imc",
  "comment-interpreter-son-imc",
  "limites-de-l-imc",
  "calculer-son-poids-ideal",
]);

export function isImcReferenceGuide(slug: string): boolean {
  return IMC_REFERENCE_GUIDE_SLUGS.has(slug);
}
