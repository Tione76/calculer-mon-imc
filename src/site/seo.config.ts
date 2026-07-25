/**
 * SEO du site : titres, descriptions, pages supplémentaires.
 */
export const seoConfig = {
  titleTemplate: "%s | Calculer Mon IMC",
  defaultDescription:
    "Calculez votre IMC et explorez des guides pédagogiques sur le poids, la santé et les calculateurs bien-être sur Calculer Mon IMC.",
  twitterHandle: undefined as string | undefined,

  home: {
    title: "Calculateur IMC → estimation gratuite et guides pédagogiques",
    h1: "Calculateur IMC",
    description:
      "Estimez votre indice de masse corporelle (IMC) et consultez nos guides pour mieux comprendre le poids et les outils santé disponibles sur le site.",
  },

  calculators: {
    "poids-ideal": {
      path: "/calculateurs/poids-ideal",
      title: "Calculer son poids idéal → comparateur de formules gratuit",
      h1: "Calculer son poids idéal",
      subtitle:
        "Comparez plusieurs méthodes reconnues pour obtenir une estimation de référence adaptée à votre taille.",
      description:
        "Calculateur de poids idéal gratuit : comparez les principales formules (Lorentz, Devine, Miller, Robinson, Hamwi, Broca) et visualisez une fourchette d'estimation.",
      indexable: true,
      navTitle: "Calculateur poids idéal",
    },
    "masse-grasse": {
      path: "/calculateurs/masse-grasse",
      title: "Calculateur masse grasse → estimation gratuite par formules reconnues",
      h1: "Calculer son pourcentage de masse grasse",
      subtitle:
        "Estimez votre pourcentage de masse grasse grâce à des formules scientifiques reconnues.",
      description:
        "Calculateur de masse grasse gratuit : estimation Deurenberg, comparatif Gallagher et jauge adaptée à votre sexe. Masse grasse, masse maigre et catégories expliquées.",
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
    title: "Guides IMC et santé",
    h1: "Guides",
    description:
      "Guides pour comprendre l'IMC, le poids idéal et les principaux repères liés à la composition corporelle, sans promesse médicale.",
    subtitle:
      "Des explications claires pour mieux lire vos résultats et utiliser les calculateurs santé.",
  },

  toolsHub: {
    path: "/nos-outils",
    title: "Calculateurs santé gratuits : IMC, poids idéal et masse grasse",
    h1: "Calculateurs",
    description:
      "Utilisez gratuitement nos calculateurs d'IMC, de poids idéal et de masse grasse. Des outils simples, rapides, sans inscription et accompagnés de guides explicatifs.",
    subtitle: "Des outils gratuits pour estimer votre IMC, votre poids idéal et votre masse grasse.",
  },

  legal: {
    contact: {
      title: "Contact",
      description:
        "Contactez calculer-mon-imc.fr pour signaler une erreur, proposer une amélioration ou poser une question.",
    },
    privacy: {
      title: "Politique de confidentialité",
      description:
        "Découvrez comment CALCULER-MON-IMC.FR traite vos données personnelles : contact, cookies, Google Analytics et vos droits RGPD.",
      metaDescription:
        "Découvrez comment calculer-mon-imc.fr collecte, utilise et protège vos données personnelles conformément au RGPD.",
    },
    cookies: {
      title: "Gestion des cookies",
      description:
        "Découvrez les cookies utilisés sur CALCULER-MON-IMC.FR, gérez vos préférences et comprenez le fonctionnement du bandeau de consentement.",
      metaDescription:
        "Gérez vos préférences en matière de cookies et découvrez leur utilisation sur calculer-mon-imc.fr.",
    },
    mentions: {
      title: "Mentions légales",
      description: "Informations légales sur l'éditeur et l'hébergeur.",
      metaDescription:
        "Consultez les mentions légales de calculer-mon-imc.fr : éditeur, hébergement, propriété intellectuelle et informations légales du site.",
    },
    faq: {
      title: "FAQ IMC : calcul, interprétation, poids idéal et masse grasse",
      description:
        "Retrouvez les réponses aux questions fréquentes sur le calcul de l'IMC, son interprétation, ses limites, le poids idéal, la masse grasse et nos calculateurs gratuits.",
    },
    sitemap: {
      title: "Plan du site",
      description: "Liste de toutes les pages du site.",
      metaDescription:
        "Retrouvez l'ensemble des pages disponibles sur calculer-mon-imc.fr.",
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
