/** Bornes numériques pour un champ de saisie. */
export interface NumericFieldRange {
  min: number;
  max: number;
}

/** Messages de validation d'un champ numérique. */
export interface NumericFieldMessages {
  invalid: string;
  outOfRange: (min: number, max: number) => string;
}

/** Définition déclarative d'un champ (utile pour futurs formulaires multi-champs). */
export interface CalculatorFieldDefinition {
  id: string;
  label: string;
  unit?: string;
  placeholder?: string;
  inputMode?: "decimal" | "numeric" | "text";
  range?: NumericFieldRange;
  messages?: NumericFieldMessages;
}
