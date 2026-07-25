import type { FaqItem } from "@/framework/types";
import type { GuideCoverImage } from "./covers";

/** Types d'encadrés éditoriaux du modèle officiel */
export type GuideCalloutVariant =
  | "retain"
  | "tip"
  | "example"
  | "warning"
  | "advice"
  | "error"
  | "hint"
  | "vigilance"
  | "legal"
  | "verify";

export interface GuideContextualCta {
  type: "contextual-cta";
  text: string;
  label: string;
  href: string;
}

export interface GuideChecklist {
  type: "checklist";
  title?: string;
  items: string[];
}

export interface GuideMistakesList {
  type: "mistakes";
  title?: string;
  items: string[];
}

export interface GuideStepItem {
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
}

export interface GuideSteps {
  type: "steps";
  items: GuideStepItem[];
}

/** Emplacement naturel pour le maillage interne */
export type GuideLinkVariant = "calculator" | "guide" | "simulator";

export interface GuideCallout {
  type: "callout";
  variant: GuideCalloutVariant;
  /** Paragraphes courts : un item = un paragraphe */
  paragraphs: string[];
}

export interface GuideParagraph {
  type: "paragraph";
  text: string;
}

export interface GuideList {
  type: "list";
  ordered?: boolean;
  items: string[];
}

export interface GuideDefinitionList {
  type: "definition-list";
  items: { term: string; definition: string }[];
}

export interface GuideTimeline {
  type: "timeline";
  items: { period: string; text: string }[];
}

export type GuideTableVariant = "default" | "imc-categories" | "imc-permits" | "editorial-comparison";

export interface GuideTable {
  type: "table";
  variant?: GuideTableVariant;
  caption?: string;
  footnote?: string;
  headers: string[];
  rows: string[][];
}

export interface GuideSourceListItem {
  org: string;
  title: string;
  year: string;
  href: string;
}

export interface GuideSourceList {
  type: "source-list";
  items: GuideSourceListItem[];
}

/** Identifiant d'illustration vectorielle (réservé aux futurs guides) */
export type GuideIllustrationId = string;

export interface GuideIllustration {
  type: "illustration";
  id: GuideIllustrationId;
  caption?: string;
}

/** Emplacement réservé pour une illustration : modèle éditorial uniquement */
export interface GuideImagePlaceholder {
  type: "image-placeholder";
  description: string;
  caption?: string;
}

export interface GuideInternalLink {
  type: "internal-link";
  variant: GuideLinkVariant;
  label: string;
  href: string;
  /** Phrase d'introduction optionnelle avant le lien */
  intro?: string;
}

export interface GuideProfessionFaq {
  type: "profession-faq";
  items: { label: string; answer: string }[];
}

export interface GuideQuickSummaryItem {
  rate: string;
  description?: string;
  /** Titre du niveau (schéma pipeline) */
  title?: string;
  kind?: "level" | "connector";
}

export interface GuideQuickSummaryCard {
  icon: string;
  label: string;
  value: string;
}

export interface GuideQuickSummary {
  title: string;
  items: GuideQuickSummaryItem[];
  /** pipeline · reading-order · formula · cards (fiche synthétique) */
  variant?: "pipeline" | "reading-order" | "formula" | "cards";
  cards?: GuideQuickSummaryCard[];
  /** Synthèse optionnelle affichée sous le schéma */
  synthesis?: string[];
}

export interface GuideFormula {
  type: "formula";
  lines: string[];
}

export type GuideBlock =
  | GuideParagraph
  | GuideList
  | GuideDefinitionList
  | GuideTimeline
  | GuideCallout
  | GuideTable
  | GuideFormula
  | GuideSourceList
  | GuideChecklist
  | GuideMistakesList
  | GuideSteps
  | GuideIllustration
  | GuideImagePlaceholder
  | GuideInternalLink
  | GuideProfessionFaq
  | GuideContextualCta;

export interface GuideEditorialNote {
  title: string;
  paragraphs: string[];
}

export interface GuidePostConclusion {
  /** Synthèse finale affichée entre la conclusion et les sources */
  summary?: GuideSection;
  sources?: GuideSection;
  editorialNote?: GuideEditorialNote;
}

export interface GuideSubsection {
  /** Identifiant URL pour le sommaire et les ancres (kebab-case) */
  id: string;
  title: string;
  blocks: GuideBlock[];
}

export interface GuideSection {
  /** Identifiant URL pour le sommaire et les ancres (kebab-case) */
  id: string;
  title: string;
  blocks?: GuideBlock[];
  subsections?: GuideSubsection[];
}

export interface GuideConclusion {
  title?: string;
  /** Points clés « À retenir » */
  keyPoints: string[];
  /** Phrase de clôture courte invitant à l'action */
  closingText: string;
  /** Paragraphe de transition vers le cocon éditorial, affiché avant les CTA */
  closingPathway?: string;
  /** CTA optionnel en fin de conclusion */
  closingCta?: {
    label: string;
    href: string;
  };
  /** Liens secondaires textuels à proximité du CTA */
  secondaryLinks?: { label: string; href: string }[];
}

/** Liens affichés dans la sidebar : maillage interne */
export interface GuideSidebarLinks {
  calculator: {
    title: string;
    description: string;
    href: string;
  };
  relatedGuides?: {
    label?: string;
    title: string;
    href: string;
  }[];
  relatedSimulator?: {
    title: string;
    description: string;
    href: string;
  };
  /** Bloc « À découvrir » : maillage vers contenus complémentaires */
  discover?: {
    title: string;
    href: string;
  }[];
}

/**
 * Modèle officiel d'un guide de référence.
 * Chaque guide futur doit respecter cette structure sans en modifier l'ossature.
 */
export interface Guide {
  slug: string;
  title: string;
  /** Title balise <title> : optionnel, sinon title + suffixe site */
  seoTitle?: string;
  description: string;
  /** Sous-titre affiché dans le header compact : reformulation de la promesse éditoriale */
  subtitle: string;
  /** Date calendaire (YYYY-MM-DD) : affichage page ; Schema.org la normalise en datetime ISO */
  updatedAt: string;
  /** Date calendaire de première publication (YYYY-MM-DD) ; Schema.org → datetime ISO */
  publishedAt: string;
  /** Image Open Graph / couverture : renseignée via attachGuideCover() */
  coverImage?: GuideCoverImage;
  /** 2 à 3 phrases : réponse immédiate à la question principale, sans H2 */
  introduction: string[];
  /** Phrase discrète affichée en fin d'introduction (après l'image si présente) */
  introDisclaimer?: string;
  /** Synthèse courte affichée entre l'introduction et le sommaire (optionnel) */
  introSummary?: { title: string; items: string[] };
  /** Bloc visuel synthétique affiché juste après l'introduction (optionnel) */
  quickSummary?: GuideQuickSummary;
  sections: GuideSection[];
  faq: FaqItem[];
  /** Titre H2 de la section FAQ : adapté au sujet du guide */
  faqTitle?: string;
  /** Paragraphe de transition affiché entre le titre FAQ et la liste de questions */
  faqIntro?: string;
  conclusion: GuideConclusion;
  /** Sources et note éditoriale affichées après la conclusion (hors sommaire pour la note) */
  postConclusion?: GuidePostConclusion;
  sidebar: GuideSidebarLinks;
  /** true uniquement pour le modèle de référence /modele : exclu du sitemap */
  isTemplate?: boolean;
}

export interface GuideTocEntry {
  id: string;
  title: string;
  level: 2 | 3;
}

export type GuideCalloutLabel =
  | "À retenir"
  | "Bon à savoir"
  | "Exemple"
  | "Attention"
  | "Conseil pratique"
  | "Erreur fréquente"
  | "Astuce"
  | "Point de vigilance"
  | "Référence fiscale"
  | "À vérifier";

export const GUIDE_CALLOUT_LABELS: Record<GuideCalloutVariant, GuideCalloutLabel> = {
  retain: "À retenir",
  tip: "Bon à savoir",
  example: "Exemple",
  warning: "Attention",
  advice: "Conseil pratique",
  error: "Erreur fréquente",
  hint: "Astuce",
  vigilance: "Point de vigilance",
  legal: "Référence fiscale",
  verify: "À vérifier",
};
