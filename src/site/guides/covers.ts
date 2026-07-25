/**
 * Registre central des illustrations du site (source unique de vérité).
 * Chemins, alt SEO et crédits photographes : ne jamais les dupliquer dans les pages.
 */

import type { Guide } from "./types";

export const COVER_IMAGE_TYPE = "image/webp";

/** Dimensions Open Graph historiques (référence) */
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_TYPE = COVER_IMAGE_TYPE;

export type CoverCreditSource = "Pexels" | "Unsplash";

export type CoverCredit = {
  photographer: string;
  source: CoverCreditSource;
};

export interface GuideCoverImage {
  /** Chemin public vers l'image de couverture */
  src: string;
  /** Texte alt SEO / accessibilité (sujet de la page, jamais le crédit) */
  alt: string;
  width: number;
  height: number;
  credit?: CoverCredit;
  /** Masque la bande crédit (logo ou visuel interne). */
  hideCredit?: boolean;
}

const COVERS_ROOT = "/images/covers";

function cover(
  relativePath: string,
  alt: string,
  credit: CoverCredit,
  width: number,
  height: number,
): GuideCoverImage {
  return {
    src: `${COVERS_ROOT}/${relativePath}`,
    alt,
    width,
    height,
    credit,
  };
}

/** Libellé affiché dans la bande crédit (overlay). */
export function formatCoverCredit(credit: CoverCredit): string {
  return `Photo de ${credit.photographer} via ${credit.source}`;
}

/** Image de couverture : page d'accueil / calculateur IMC */
export const HOME_COVER: GuideCoverImage = cover(
  "calculateurs/calculateur-IMC.webp",
  "Pèse-personne rose et mètre ruban jaune vus de dessus, pour le calcul de l'IMC",
  { photographer: "SHVETS production", source: "Pexels" },
  1200,
  801,
);

/** Hub /guides */
export const GUIDES_HUB_COVER: GuideCoverImage = cover(
  "hubs/Guides-IMC-poids.webp",
  "Pile de livres tenus à deux mains, illustration des guides santé",
  { photographer: "Kindel Media", source: "Pexels" },
  1200,
  676,
);

/** Hub /nos-outils */
export const TOOLS_HUB_COVER: GuideCoverImage = cover(
  "hubs/Outils-santé.webp",
  "Pèse-personne numérique en verre et mètre ruban bleu, outils de suivi santé",
  { photographer: "Pixabay", source: "Pexels" },
  1200,
  798,
);

/** Page /faq */
export const FAQ_COVER: GuideCoverImage = cover(
  "guides/Questions-IMC-poids.webp",
  "Carnet ouvert, stylo doré et bulles avec points d'interrogation sur fond brun",
  { photographer: "Leeloo The First", source: "Pexels" },
  1200,
  801,
);

/** Couvertures par identifiant de calculateur */
export const CALCULATOR_COVERS: Record<string, GuideCoverImage> = {
  imc: HOME_COVER,
  "poids-ideal": cover(
    "calculateurs/Calculer-poids-idéal.webp",
    "Groupe de jeunes adultes aux morphologies diverses, illustrant le poids idéal",
    { photographer: "Ron Lach", source: "Pexels" },
    1200,
    800,
  ),
  "masse-grasse": cover(
    "calculateurs/Calculer-masse-grasse.webp",
    "Mesure de la masse grasse à l'aide d'un compas de plis cutanés sur l'abdomen",
    { photographer: "Daniel Dan", source: "Pexels" },
    1200,
    800,
  ),
};

/** Couvertures par slug de guide */
export const GUIDE_COVERS: Record<string, GuideCoverImage> = {
  "quest-ce-que-l-imc": cover(
    "guides/IMC-Définition-calcul.webp",
    "Pieds nus sur un pèse-personne rose, illustration de l'indice de masse corporelle",
    { photographer: "SHVETS production", source: "Pexels" },
    1200,
    801,
  ),
  "comment-calculer-son-imc": cover(
    "guides/calculer-son-imc.webp",
    "Mètre ruban bleu et jaune enroulé sur un fond jaune, pour mesurer et calculer l'IMC",
    { photographer: "Ann H", source: "Pexels" },
    1200,
    800,
  ),
  "comment-interpreter-son-imc": cover(
    "guides/interpréter-son-IMC.webp",
    "Professionnel de santé en blouse consultant un smartphone pour lire un résultat",
    { photographer: "Ivan S", source: "Pexels" },
    1200,
    800,
  ),
  "limites-de-l-imc": cover(
    "guides/limites-IMC.webp",
    "Groupe de femmes pratiquant le fitness en studio, au-delà du seul chiffre d'IMC",
    { photographer: "Gustavo Fring", source: "Pexels" },
    1200,
    800,
  ),
  "calculer-son-poids-ideal": cover(
    "guides/mon-poids-idéal.webp",
    "Personne mesurant son tour de taille avec un mètre ruban rose",
    { photographer: "kaboompics", source: "Pexels" },
    1200,
    800,
  ),
};

export function getCalculatorCover(id: string): GuideCoverImage {
  return CALCULATOR_COVERS[id] ?? HOME_COVER;
}

export function getGuideCover(slug: string): GuideCoverImage | undefined {
  return GUIDE_COVERS[slug];
}

export function getGuideCoverByHref(href: string): GuideCoverImage | undefined {
  const match = href.match(/^\/guides\/([^/]+)\/?$/);
  if (!match) return undefined;
  return getGuideCover(match[1]);
}

export function resolveGuideCover(
  guide: Pick<Guide, "slug" | "coverImage">,
): GuideCoverImage | undefined {
  return guide.coverImage ?? getGuideCover(guide.slug);
}

/** Attache la couverture au guide (source unique pour tout le site) */
export function attachGuideCover<T extends Guide>(guide: T): T {
  const coverImage = getGuideCover(guide.slug);
  return coverImage ? { ...guide, coverImage } : guide;
}

/** URL absolue production-safe (encodage accents / espaces, jamais localhost) */
export function toAbsoluteAssetUrl(siteUrl: string, assetPath: string): string {
  if (/^https?:\/\//i.test(assetPath)) return assetPath;
  const raw = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  const queryIndex = raw.indexOf("?");
  const hashIndex = raw.indexOf("#");
  const cutAt =
    queryIndex >= 0 && hashIndex >= 0
      ? Math.min(queryIndex, hashIndex)
      : queryIndex >= 0
        ? queryIndex
        : hashIndex >= 0
          ? hashIndex
          : -1;
  const pathname = cutAt >= 0 ? raw.slice(0, cutAt) : raw;
  const suffix = cutAt >= 0 ? raw.slice(cutAt) : "";
  const encodedPath = pathname
    .split("/")
    .map((segment) => (segment === "" ? "" : encodeURIComponent(segment)))
    .join("/");
  return `${siteUrl.replace(/\/$/, "")}${encodedPath}${suffix}`;
}

export function coverToOgInput(cover: GuideCoverImage) {
  return {
    url: cover.src,
    width: cover.width,
    height: cover.height,
    alt: cover.alt,
    type: COVER_IMAGE_TYPE,
  };
}
