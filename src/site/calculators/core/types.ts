/** Identifiant stable d'un calculateur (registre navigation, SEO, covers). */
export type CalculatorId = string;

/** Métadonnées minimales communes à tous les calculateurs santé. */
export interface CalculatorModuleMeta {
  id: CalculatorId;
  /** Chemin public (ex. `/` ou `/calculateurs/poids-ideal`). */
  path: string;
}
