/**
 * Configuration du site : modifiez ce fichier pour chaque nouveau site.
 */
import { guidesNavigation } from "./guides/navigation";

function readOptionalEnv(key: string): string | undefined {
  const value = process.env[key]?.trim();
  return value || undefined;
}

/** GA4 : NEXT_PUBLIC_GA_MEASUREMENT_ID (fallback legacy NEXT_PUBLIC_GA_ID). */
const googleAnalyticsId =
  readOptionalEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID") ?? readOptionalEnv("NEXT_PUBLIC_GA_ID");
/** Clarity : NEXT_PUBLIC_CLARITY_PROJECT_ID (fallback legacy NEXT_PUBLIC_CLARITY_ID). Production uniquement. */
const microsoftClarityId =
  process.env.NODE_ENV === "production"
    ? (readOptionalEnv("NEXT_PUBLIC_CLARITY_PROJECT_ID") ??
      readOptionalEnv("NEXT_PUBLIC_CLARITY_ID"))
    : undefined;
/** Désactivé en attente du domaine calculer-mon-imc.fr (réactiver à l'étape Search Console). */
const googleSearchConsoleId = undefined;
const googleAdsenseClientId = readOptionalEnv("NEXT_PUBLIC_ADSENSE_ID");
const adSlotAfterResult = readOptionalEnv("NEXT_PUBLIC_AD_SLOT_AFTER_RESULT");
const adSlotBeforeFooter = readOptionalEnv("NEXT_PUBLIC_AD_SLOT_BEFORE_FOOTER");
const adSlotUnderH1 = readOptionalEnv("NEXT_PUBLIC_AD_SLOT_UNDER_H1");

export const siteConfig = {
  name: "Calculer Mon IMC",
  domain: "calculer-mon-imc.fr",
  url: "https://calculer-mon-imc.fr",
  author: "Antoine",
  language: "fr",
  locale: "fr-FR",

  colors: {
    primary: "#16A34A",
    primaryHover: "#15803D",
    primaryLight: "#F0FDF4",
    primaryMuted: "#BBF7D0",
    primaryActive: "#166534",
    accentText: "#166534",
    brandRgb: "22, 163, 74",
    accent: "#e1000f",
    background: "#ffffff",
    surface: "#f7f9fb",
    border: "#e4e8ed",
    text: "#161616",
    textMuted: "#6b7280",
    textInverse: "#ffffff",
    focus: "#16A34A",
    success: "#18753c",
    error: "#ce0500",
  },

  logo: {
    src: "/logo.png",
    alt: "Calculer Mon IMC",
    width: 800,
    height: 800,
  },
  favicon: "/icon.png",
  appleTouchIcon: "/apple-icon.png",
  /** Image OG par défaut (temporaire, en attendant la couverture IMC). */
  ogImage: "/logo-icon.png?v=5",

  footerBrandName: "CALCULER-MON-IMC.FR",
  footerDescription:
    "Outils et guides gratuits pour estimer votre IMC, comprendre le poids et utiliser des calculateurs santé pédagogiques.",

  home: {
    h1: "Calculez votre IMC",
    intro: [
      "Estimez votre indice de masse corporelle et explorez nos guides sur le poids et la santé.",
    ] as [string, string?],
  },

  explanations: [] as { title: string; content: string }[],

  blogPosts: [] as {
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    href: string;
  }[],

  tools: [] as {
    title: string;
    description: string;
    href: string;
    icon: string;
  }[],

  recommendedSites: {
    title: "Autres outils",
    description: "",
    links: [] as { title: string; description: string; href: string; external?: boolean }[],
  },

  contact: {
    email: "contact@calculer-mon-imc.fr",
    companyName: "[Raison sociale]",
    address: "[Adresse complète]",
    intro:
      "Une question, une erreur à signaler ou une suggestion ? Contactez-nous via le formulaire ou directement par e-mail.",
    trustNote:
      "Vos informations sont utilisées uniquement pour répondre à votre demande. Aucune utilisation commerciale.",
    infoItems: ["Réponse sous 48 h", "Gratuit", "Aucune donnée revendue"],
    subjects: [
      "Signaler une erreur",
      "Suggestion d'amélioration",
      "Autre demande",
    ],
    faqLinks: [
      { label: "Consulter la FAQ complète", href: "/faq" },
      { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
      { label: "Gestion des cookies", href: "/gestion-des-cookies" },
    ],
  },

  legal: {
    privacy: {
      lastUpdated: "2026-07-01",
      sections: [],
    },
    cookies: {
      lastUpdated: "2026-07-01",
      sections: [],
    },
    mentions: {
      lastUpdated: "2026-07-01",
      sections: [],
    },
  },

  /** Menu Guides : voir src/site/guides/navigation.ts */
  guidesNavigation,

  navigation: {
    header: [
      { label: "FAQ", href: "/faq" },
    ],
    footer: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Confidentialité", href: "/politique-de-confidentialite" },
      { label: "Cookies", href: "/gestion-des-cookies" },
      { label: "Plan du site", href: "/plan-du-site" },
      { label: "Contact", href: "/contact" },
    ],
  },

  analytics: {
    googleAnalyticsId,
    microsoftClarityId,
    googleSearchConsoleId,
    googleAdsenseClientId,
  },

  ads: {
    slots: {
      "under-h1": {
        enabled: Boolean(googleAdsenseClientId && adSlotUnderH1),
        adSlot: adSlotUnderH1 ?? "",
        format: "horizontal" as const,
      },
      "after-result": {
        enabled: Boolean(googleAdsenseClientId && adSlotAfterResult),
        adSlot: adSlotAfterResult ?? "",
        format: "auto" as const,
      },
      "before-footer": {
        enabled: Boolean(googleAdsenseClientId && adSlotBeforeFooter),
        adSlot: adSlotBeforeFooter ?? "",
        format: "horizontal" as const,
      },
    },
  },
};
