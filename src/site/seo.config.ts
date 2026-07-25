/**
 * SEO du site : titres, descriptions, pages supplémentaires.
 */
export const seoConfig = {
  titleTemplate: "%s | Calculer Mon IMC",
  defaultDescription:
    "Des calculateurs simples pour connaître son IMC, son poids idéal et sa masse grasse, accompagnés de guides fiables sur le poids et la santé.",
  twitterHandle: undefined as string | undefined,

  home: {
    title: "Calculer mon IMC - Guides et calculateurs sur le poids et la santé",
    h1: "Calculez votre IMC en quelques secondes",
    description:
      "Des calculateurs simples pour connaître son IMC, son poids idéal et sa masse grasse, accompagnés de guides fiables sur le poids et la santé.",
  },

  calculators: {
    "poids-ideal": {
      path: "/calculateurs/poids-ideal",
      title: "Calculez votre poids idéal - Estimation gratuite & rapide",
      h1: "Calculez votre poids idéal en quelques secondes",
      subtitle:
        "Calculateur de poids idéal gratuit basé sur les principales méthodes de référence.",
      description:
        "Calculateur de poids idéal pour homme et femme. Obtenez une estimation rapide de votre poids idéal selon plusieurs méthodes scientifiques de référence.",
      indexable: true,
      navTitle: "Calculateur poids idéal",
    },
    "masse-grasse": {
      path: "/calculateurs/masse-grasse",
      title: "Calculez votre masse grasse - Estimation gratuite & rapide",
      h1: "Estimez votre pourcentage de masse grasse",
      subtitle:
        "Calculateur de masse grasse gratuit pour estimer votre pourcentage de graisse corporelle en quelques secondes.",
      description:
        "Calculez votre pourcentage de masse grasse avec notre calculateur gratuit. Estimez votre taux de graisse corporelle et obtenez votre IMG en quelques secondes.",
      indexable: true,
      navTitle: "Calculateur masse grasse",
    },
  } as Record<
    string,
    {
      path: string;
      title: string;
      description: string;
      h1: string;
      subtitle?: string;
      indexable?: boolean;
      navTitle?: string;
    }
  >,

  guidesHub: {
    path: "/guides",
    title: "Guides santé gratuits - Poids, IMC et bien-être",
    h1: "Nos guides santé",
    description:
      "Retrouvez tous nos conseils santé sur le poids, l'IMC et le bien-être. Des articles simples et fiables pour les hommes et les femmes souhaitant mieux comprendre leur santé.",
    subtitle:
      "Des explications claires pour mieux lire vos résultats et utiliser les calculateurs santé.",
  },

  toolsHub: {
    path: "/nos-outils",
    title: "Calculateurs santé gratuits - IMC, poids, masse grasse",
    h1: "Calculateurs",
    description:
      "Découvrez nos outils santé gratuits pour calculer votre IMC, votre poids idéal et votre masse grasse. Des calculateurs simples pour les hommes et les femmes afin de suivre vos indicateurs de santé.",
    subtitle: "Des outils gratuits pour estimer votre IMC, votre poids idéal et votre masse grasse.",
  },

  legal: {
    contact: {
      title: "Contact",
      seoTitle: "Contact | Calculer mon IMC",
      description:
        "Une question, une erreur à signaler ou une suggestion ? Contactez-nous via le formulaire ou directement par e-mail.",
    },
    privacy: {
      title: "Politique de confidentialité",
      seoTitle: "Politique de confidentialité | Calculer mon IMC",
      description:
        "Découvrez comment CALCULER-MON-IMC.FR traite vos données personnelles : contact, cookies, Google Analytics et vos droits RGPD.",
      metaDescription:
        "Consultez notre politique de confidentialité pour comprendre comment vos données personnelles sont collectées, utilisées, protégées et conservées.",
    },
    cookies: {
      title: "Gestion des cookies",
      seoTitle: "Gestion des cookies | Calculer mon IMC",
      description:
        "Découvrez les cookies utilisés sur CALCULER-MON-IMC.FR, gérez vos préférences et comprenez le fonctionnement du bandeau de consentement.",
      metaDescription:
        "Gérez vos préférences en matière de cookies et choisissez les technologies que vous acceptez pour améliorer votre expérience sur le site.",
    },
    mentions: {
      title: "Mentions légales",
      seoTitle: "Mentions légales | Calculer mon IMC",
      description: "Informations légales sur l'éditeur et l'hébergeur.",
      metaDescription:
        "Consultez les mentions légales du site, les informations relatives à son éditeur, à son hébergement et aux conditions d'utilisation.",
    },
    faq: {
      title: "Questions fréquentes sur le poids, l'IMC et le poids idéal",
      description:
        "Vous vous posez des questions sur le poids, l'IMC ou le poids idéal ? Retrouvez des réponses claires et fiables aux interrogations les plus courantes.",
    },
    sitemap: {
      title: "Plan du site",
      seoTitle: "Plan du site | Calculer mon IMC",
      description: "Liste de toutes les pages du site.",
      metaDescription:
        "Consultez le plan du site pour accéder rapidement à l'ensemble de nos calculateurs, guides et principales pages.",
    },
    notFound: { title: "Page introuvable", description: "La page demandée n'existe pas ou a été déplacée." },
    error: { title: "Erreur serveur", description: "Une erreur est survenue. Veuillez réessayer plus tard." },
  },

  /** Pages complémentaires optionnelles (max ~5). Le framework génère routes + sitemap automatiquement. */
  extraPages: [] as {
    slug: string;
    title: string;
    description: string;
    sections: { title: string; content: string }[];
  }[],
};
