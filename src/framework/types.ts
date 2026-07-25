export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SiteColors {
  primary: string;
  primaryHover: string;
  primaryLight: string;
  /** Bordures et fonds brand atténués (ex. #BBF7D0). */
  primaryMuted?: string;
  /** État actif des boutons (ex. #166534). */
  primaryActive?: string;
  /** Texte accentué sur fond clair (ex. #166534). */
  accentText?: string;
  /** Composantes RGB pour ombres : "22, 163, 74". */
  brandRgb?: string;
  accent: string;
  background: string;
  surface: string;
  border: string;
  text: string;
  textMuted: string;
  textInverse: string;
  focus: string;
  success: string;
  error: string;
}

export type AdPosition = "under-h1" | "after-result" | "before-footer";

export interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  advertising: boolean;
  timestamp: number;
}

export type ConsentStatus = "pending" | "granted" | "denied" | "custom";
