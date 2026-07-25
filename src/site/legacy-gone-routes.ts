/**
 * Slugs et chemins historiques retirés du site public.
 * Conservés uniquement pour les réponses HTTP 410 et les tests garde-fou.
 * Aucune métadonnée SEO ni contenu éditorial ici.
 */

/** Calculateurs retirés : routes App Router → 410 Gone. */
export const LEGACY_GONE_CALCULATOR_PATHS = [
  "/calculateurs/augmentation-salaire",
  "/calculateurs/salaire-heures-supplementaires",
  "/calculateurs/indemnite-licenciement",
] as const;

/** Anciens guides / calculateurs : ne doivent jamais réapparaître dans les liens publics. */
export const FORBIDDEN_PUBLIC_HREF_PATTERNS = [
  ...LEGACY_GONE_CALCULATOR_PATHS,
  "/calculateurs/prelevement-a-la-source",
  "/guides/comment-calculer-son-salaire-net",
  "/guides/comment-est-calcule-le-salaire-net",
  "/guides/comment-lire-une-fiche-de-paie",
  "/guides/cotisations-salariales-pourquoi-brut-plus-eleve-que-net",
  "/guides/prelevement-a-la-source-quest-ce-que-cest-et-comment-ca-fonctionne",
] as const;
