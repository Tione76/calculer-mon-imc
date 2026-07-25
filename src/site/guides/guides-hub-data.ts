import type { FaqItem } from "@/framework/types";

/** Contenu visible du hub /guides (hors title / meta SEO). */

export const GUIDES_HUB_PAGE_SUBTITLE =
  "Comprendre l'IMC, le poids idéal et les principaux repères liés à la composition corporelle grâce à des guides clairs, illustrés et accessibles.";

export const GUIDES_HUB_LIST_TITLE = "Choisissez le guide adapté à votre question";

/** Résumés courts des cartes (homogènes) ; ne remplacent pas la meta description SEO des guides. */
export const GUIDE_HUB_TEASERS: Record<string, string> = {
  "quest-ce-que-l-imc":
    "Définition, origine et rôle de l'indice de masse corporelle : comprendre à quoi sert cet indicateur et comment il fonctionne.",
  "comment-calculer-son-imc":
    "Formule, unités, conversions et exemples concrets : apprendre à calculer son IMC pas à pas, sans erreur de saisie.",
  "comment-interpreter-son-imc":
    "Catégories, seuils et précautions de lecture : interpréter un résultat d'IMC avec recul, sans le prendre au pied de la lettre.",
  "limites-de-l-imc":
    "Pourquoi l'indicateur peut être imprécis, chez quels profils, et pourquoi il ne mesure pas directement la masse grasse.",
  "calculer-son-poids-ideal":
    "Plusieurs formules comparées, leurs différences et leurs limites : lire le poids idéal comme une fourchette, pas comme un objectif unique.",
};

export function getGuideHubTeaser(slug: string): string | undefined {
  return GUIDE_HUB_TEASERS[slug];
}

export const GUIDES_HUB_FAQ: FaqItem[] = [
  {
    question: "Quels sujets abordent les guides ?",
    answer:
      "Ils couvrent l'IMC (définition, calcul, interprétation, limites) et le poids idéal. Certains contenus aident aussi à mieux distinguer ces notions de la composition corporelle. Chaque article peut être lu indépendamment.",
  },
  {
    question: "Les guides sont-ils gratuits ?",
    answer:
      "Oui. Tous les guides de calculer-mon-imc.fr sont accessibles gratuitement, sans création de compte.",
  },
  {
    question: "Les explications sont-elles adaptées aux débutants ?",
    answer:
      "Oui. Les textes privilégient un langage simple, des exemples concrets et une progression étape par étape, pour accompagner aussi bien le calculateur IMC que les autres outils du site.",
  },
  {
    question: "Les guides remplacent-ils un avis médical ?",
    answer:
      "Non. Ces contenus sont informatifs et pédagogiques. Ils ne constituent ni un diagnostic ni un conseil médical personnalisé.",
  },
];
