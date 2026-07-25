/** Contenu éditorial visible du hub /nos-outils (hors métadonnées SEO). */

import type { FaqItem } from "@/framework/types";

export const TOOLS_HUB_PAGE_H1 = "Nos calculateurs santé";

export const TOOLS_HUB_PAGE_SUBTITLE =
  "Découvrez nos calculateurs santé gratuits pour estimer votre IMC, votre poids idéal et votre masse grasse. Simples, rapides et accessibles sans inscription.";

export const TOOLS_HUB_TOOLS_SECTION_TITLE =
  "Choisissez le calculateur adapté à votre besoin";

export const TOOLS_HUB_TOOLS_SECTION_INTRO =
  "Commencez par le calculateur IMC pour obtenir un premier repère, puis explorez le poids idéal ou la masse grasse pour comparer d'autres méthodes d'estimation.";

export const TOOL_HUB_TEASERS: Record<string, string> = {
  imc: "Calculez votre IMC à partir de la taille et du poids, obtenez la catégorie correspondante et un premier repère statistique immédiat.",
  "poids-ideal":
    "Comparez Lorentz, Devine, Miller, Robinson, Hamwi et Broca pour obtenir plusieurs estimations et visualiser une fourchette, plutôt qu'un chiffre absolu.",
  "masse-grasse":
    "Estimez votre pourcentage de masse grasse avec plusieurs méthodes (Deurenberg, RFM, YMCA, U.S. Navy) et visualisez masse grasse et masse maigre.",
};

export function getToolHubTeaser(id: string): string | undefined {
  return TOOL_HUB_TEASERS[id];
}

/** Libellés CTA des cartes (flèche ajoutée dans le composant). */
export const TOOL_HUB_CTAS: Record<string, string> = {
  imc: "Calculer votre IMC",
  "poids-ideal": "Calculer son poids idéal",
  "masse-grasse": "Calculer sa masse grasse",
};

export function getToolHubCta(id: string): string {
  return TOOL_HUB_CTAS[id] ?? "Ouvrir le calculateur";
}

export const TOOL_HUB_REASSURANCE = [
  "Gratuit",
  "Sans inscription",
  "Calcul instantané",
] as const;

export const TOOL_HUB_FAQ: FaqItem[] = [
  {
    question: "Les calculateurs sont-ils gratuits ?",
    answer:
      "Oui. Le calculateur IMC, le calculateur de poids idéal et le calculateur de masse grasse sont accessibles gratuitement, sans création de compte.",
  },
  {
    question: "Les résultats remplacent-ils un avis médical ?",
    answer:
      "Non. Ces estimations sont pédagogiques et statistiques. Elles ne constituent ni un diagnostic ni un conseil médical. Pour toute question de santé, consultez un professionnel qualifié.",
  },
  {
    question: "Mes données sont-elles enregistrées ?",
    answer:
      "Les calculateurs fonctionnent localement dans votre navigateur : taille, poids et autres valeurs saisies servent uniquement à produire l'estimation affichée.",
  },
  {
    question: "Quel calculateur utiliser en premier ?",
    answer:
      "Commencez par le calculateur IMC pour un repère général. Le poids idéal compare ensuite plusieurs formules, et la masse grasse complète la lecture de la composition corporelle. Pour comprendre les résultats, consultez nos guides.",
  },
];

export const TOOL_PICKER = [] as const;
export const TOOL_HUB_BENEFITS = [] as const;
export const TOOL_MATCH_ROWS = [] as const;
export const TOOL_HUB_GUIDE_LINKS = [] as const;
export const TOOL_HUB_ERRORS = [] as const;
export const TOOL_HUB_CALCULATIONS = [] as const;
