import { siteConfig } from "@/site/site.config";

/**
 * Auteur éditorial du site.
 * Source unique pour l'affichage, la page auteur et le nœud Schema.org Person.
 */
export const SITE_AUTHOR = {
  name: siteConfig.author,
  slug: "antoine",
  path: "/auteur/antoine",
  metaTitle: "Page Auteur - Antoine | Calculer mon IMC",
  metaDescription:
    "Découvrez le parcours d'Antoine, auteur des contenus du site, ainsi que son approche pour créer des guides et des calculateurs fiables autour du poids, de la santé et de l'IMC.",
  pageSubtitle:
    "Créateur de Calculer Mon IMC, des contenus pédagogiques sur l'IMC et la santé.",
  role: "Créateur de Calculer Mon IMC",
  cardIntro:
    "Des contenus pédagogiques pour mieux comprendre l'IMC et les repères de poids.",
  sections: [
    {
      id: "a-propos",
      title: "À propos",
      icon: "user" as const,
      paragraphs: [
        "Antoine est le créateur de Calculer Mon IMC.",
        "Passionné par la pédagogie santé et les indicateurs accessibles au grand public, il s'intéresse à la manière de rendre compréhensibles des sujets souvent perçus comme techniques.",
      ],
    },
    {
      id: "ce-que-je-publie",
      title: "Ce que je publie",
      icon: "book" as const,
      paragraphs: [
        "À travers Calculer Mon IMC, il publie des contenus consacrés à l'IMC, au poids, aux calculateurs santé et à leur interprétation, sans promesse médicale.",
      ],
    },
    {
      id: "mon-objectif",
      title: "Mon objectif",
      icon: "target" as const,
      paragraphs: [
        "L'objectif du site est de proposer des explications claires, des outils simples à utiliser et des informations régulièrement mises à jour afin d'aider chacun à mieux lire ses repères de poids.",
      ],
    },
  ],
  methodologyTitle: "Méthodologie",
  methodology:
    "Les contenus publiés sur Calculer Mon IMC sont rédigés à partir de références reconnues (OMS, recommandations publiques), puis relus pour rester pédagogiques et prudents sur le plan médical.",
  sourcesIntro:
    "Les articles s'appuient, lorsque cela est pertinent, sur des sources officielles ou institutionnelles. Sources régulièrement consultées :",
  sources: [
    "Organisation mondiale de la Santé (OMS)",
    "Santé publique France",
    "recommandations et guides publics sur le poids",
  ],
  ctaText:
    "Vous souhaitez estimer votre IMC ou lire nos guides ?",
  ctaLabel: "Découvrir les calculateurs",
} as const;

export type SiteAuthor = typeof SITE_AUTHOR;
export type AuthorSectionIcon = (typeof SITE_AUTHOR.sections)[number]["icon"];
