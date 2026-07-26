import { siteConfig } from "@/site/site.config";

export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  subject: 150,
  message: 5000,
} as const;

export const CONTACT_SUCCESS_MESSAGE =
  "Votre message a bien été envoyé. Nous vous répondrons dans les meilleurs délais.";

export const CONTACT_UNAVAILABLE_MESSAGE =
  "Le formulaire de contact est temporairement indisponible. Veuillez réessayer plus tard.";

export const CONTACT_ERROR_MESSAGE =
  "Une erreur est survenue pendant l'envoi. Veuillez réessayer plus tard.";

export const ALLOWED_CONTACT_SUBJECTS = [
  "Signaler une erreur",
  "Suggestion d'amélioration",
  "Autre demande",
] as const;

export type AllowedContactSubject = (typeof ALLOWED_CONTACT_SUBJECTS)[number];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  /** Honeypot : doit rester vide */
  website?: string;
}

export interface ValidatedContactPayload {
  name: string;
  email: string;
  subject: AllowedContactSubject;
  message: string;
}

export type ContactValidationResult =
  | { ok: true; data: ValidatedContactPayload }
  | { ok: false; error: string };

function readEnv(key: string, fallback?: string): string {
  const raw = process.env[key] ?? fallback ?? "";
  return raw.trim().replace(/^["']|["']$/g, "");
}

/** Extrait l'adresse d'un champ "Nom <email@domaine.fr>" ou renvoie la valeur telle quelle */
export function extractEmailAddress(value: string): string {
  const trimmed = value.trim();
  const match = trimmed.match(/<([^>]+)>/);
  return (match ? match[1] : trimmed).trim();
}

export function parseRecipientList(value: string): string[] {
  return value
    .split(",")
    .map((entry) => extractEmailAddress(entry))
    .filter((entry) => EMAIL_PATTERN.test(entry));
}

export function normalizeFromAddress(value: string): string {
  const trimmed = value.trim().replace(/^["']|["']$/g, "");
  if (/<[^>]+>/.test(trimmed)) return trimmed;
  if (EMAIL_PATTERN.test(trimmed)) {
    return `${siteConfig.name} <${trimmed}>`;
  }
  return trimmed;
}

export function getContactRecipient(): string[] {
  const raw =
    readEnv("CONTACT_EMAIL") ||
    readEnv("CONTACT_TO_EMAIL") ||
    siteConfig.contact.email;
  return parseRecipientList(raw);
}

export function getContactFromAddress(): string {
  const configured = readEnv("CONTACT_FROM_EMAIL");
  if (configured) return normalizeFromAddress(configured);
  return `${siteConfig.name} <${siteConfig.contact.email}>`;
}

export function getResendApiKey(): string {
  return readEnv("RESEND_API_KEY");
}

/** Vrai uniquement si Resend est configuré et que destinataire / expéditeur sont résolus. */
export function isContactDeliveryConfigured(): boolean {
  if (!getResendApiKey()) return false;
  if (getContactRecipient().length === 0) return false;
  if (!getContactFromAddress()) return false;
  return true;
}

export function isHoneypotFilled(payload: ContactPayload): boolean {
  return Boolean(payload.website?.trim());
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function validateContactPayload(body: ContactPayload): ContactValidationResult {
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const subject = body.subject?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name) return { ok: false, error: "Le nom est obligatoire." };
  if (name.length > CONTACT_LIMITS.name) {
    return { ok: false, error: `Le nom ne doit pas dépasser ${CONTACT_LIMITS.name} caractères.` };
  }

  if (!email) return { ok: false, error: "L'adresse e-mail est obligatoire." };
  if (email.length > CONTACT_LIMITS.email) {
    return { ok: false, error: `L'adresse e-mail ne doit pas dépasser ${CONTACT_LIMITS.email} caractères.` };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "L'adresse e-mail n'est pas valide." };
  }

  if (!subject) return { ok: false, error: "Veuillez choisir un sujet valide." };
  if (subject.length > CONTACT_LIMITS.subject) {
    return { ok: false, error: `Le sujet ne doit pas dépasser ${CONTACT_LIMITS.subject} caractères.` };
  }
  if (!ALLOWED_CONTACT_SUBJECTS.includes(subject as AllowedContactSubject)) {
    return { ok: false, error: "Veuillez choisir un sujet valide." };
  }

  if (!message) return { ok: false, error: "Le message est obligatoire." };
  if (message.length > CONTACT_LIMITS.message) {
    return {
      ok: false,
      error: `Le message ne doit pas dépasser ${CONTACT_LIMITS.message} caractères.`,
    };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      subject: subject as AllowedContactSubject,
      message,
    },
  };
}

export function buildContactEmailContent(data: ValidatedContactPayload) {
  const subject = `[Nouveau contact ${siteConfig.name}] ${data.subject}`;

  const text = [
    "Nom :",
    data.name,
    "",
    "Email :",
    data.email,
    "",
    "Sujet :",
    data.subject,
    "",
    "Message :",
    data.message,
  ].join("\n");

  const html = [
    `<p><strong>Nom :</strong><br>${escapeHtml(data.name)}</p>`,
    `<p><strong>Email :</strong><br>${escapeHtml(data.email)}</p>`,
    `<p><strong>Sujet :</strong><br>${escapeHtml(data.subject)}</p>`,
    `<p><strong>Message :</strong></p>`,
    `<p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>`,
  ].join("");

  return { subject, text, html };
}

/** Origins de confiance pour POST /api/contact. */
export function isTrustedContactOrigin(request: Request, siteUrl: string): boolean {
  const trustedHosts = collectTrustedContactHosts(request, siteUrl);
  const originHeader = request.headers.get("origin");

  if (originHeader) {
    try {
      return trustedHosts.has(new URL(originHeader).host.toLowerCase());
    } catch {
      return false;
    }
  }

  // Sans Origin : accepter uniquement si Host correspond à un hôte de confiance
  // (requête same-origin ou outil local avec Host valide).
  const hostHeader = request.headers.get("host")?.toLowerCase();
  if (!hostHeader) {
    return false;
  }

  return trustedHosts.has(hostHeader);
}

function collectTrustedContactHosts(request: Request, siteUrl: string): Set<string> {
  const trustedHosts = new Set<string>();

  try {
    trustedHosts.add(new URL(request.url).host.toLowerCase());
  } catch {
    // ignore
  }

  try {
    const configuredHost = new URL(siteUrl).host.toLowerCase();
    trustedHosts.add(configuredHost);
    if (configuredHost.startsWith("www.")) {
      trustedHosts.add(configuredHost.slice(4));
    } else {
      trustedHosts.add(`www.${configuredHost}`);
    }
  } catch {
    // ignore
  }

  for (const envKey of ["VERCEL_URL", "VERCEL_BRANCH_URL", "VERCEL_PROJECT_PRODUCTION_URL"] as const) {
    const raw = process.env[envKey]?.trim();
    if (!raw) continue;
    try {
      const host = new URL(raw.includes("://") ? raw : `https://${raw}`).host.toLowerCase();
      trustedHosts.add(host);
    } catch {
      // ignore
    }
  }

  if (process.env.NODE_ENV === "development") {
    trustedHosts.add("localhost");
    trustedHosts.add("127.0.0.1");
    trustedHosts.add("[::1]");
  }

  return trustedHosts;
}
