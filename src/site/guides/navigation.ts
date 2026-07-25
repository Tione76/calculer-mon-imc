/**
 * Navigation des guides : source unique pour le menu principal.
 */
export interface GuideNavItem {
  /** Identifiant URL : correspond au slug du guide */
  slug: string;
  /** Intitulé affiché dans le menu */
  shortTitle: string;
  /** Titre complet du guide (accessibilité, attribut title) */
  title: string;
}

export const guidesNavigation: GuideNavItem[] = [
  {
    slug: "quest-ce-que-l-imc",
    shortTitle: "Qu'est-ce que l'IMC ?",
    title: "Qu'est-ce que l'IMC ?",
  },
  {
    slug: "comment-calculer-son-imc",
    shortTitle: "Calculer son IMC",
    title: "Comment calculer son IMC ?",
  },
  {
    slug: "comment-interpreter-son-imc",
    shortTitle: "Interpréter son IMC",
    title: "Comment interpréter son IMC ?",
  },
  {
    slug: "limites-de-l-imc",
    shortTitle: "Les limites de l'IMC",
    title: "Les limites de l'IMC",
  },
  {
    slug: "calculer-son-poids-ideal",
    shortTitle: "Poids idéal",
    title: "Calculer son poids idéal : méthodes, formules et limites",
  },
];
