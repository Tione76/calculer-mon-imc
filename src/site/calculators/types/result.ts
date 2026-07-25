/** Lien interne vers un guide depuis un calculateur. */
export interface CalculatorGuideLink {
  href: string;
  label: string;
}

/** Badge optionnel sous la valeur principale (ex. catégorie OMS). */
export interface CalculatorResultBadge {
  label: string;
}

/**
 * Section de résultat flexible : valeur principale, textes, disclaimer ou guides.
 * Les calculateurs composent librement leurs sections sans structure rigide imposée.
 */
export type CalculatorResultSection =
  | {
      kind: "primary";
      label: string;
      value: string;
      badge?: CalculatorResultBadge;
    }
  | {
      kind: "text";
      paragraphs: string[];
    }
  | {
      kind: "disclaimer";
      text: string;
    }
  | {
      kind: "guides";
      title: string;
      links: CalculatorGuideLink[];
    };

/** Modèle commun de résultat affichable (optionnel pour les moteurs métier). */
export interface CalculatorResult {
  sections: CalculatorResultSection[];
}
