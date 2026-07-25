import { siteConfig as config } from "@/site/site.config";
import { absoluteAsset, pruneEmpty, type JsonLdNode } from "../types";
import { schemaIds } from "../ids";

function resolveSchemaLogo() {
  if (config.logo) {
    return config.logo;
  }

  const faviconSrc = config.favicon.split("?")[0] ?? config.favicon;
  return {
    src: faviconSrc,
    alt: config.name,
    width: 512,
    height: 512,
  };
}

/** Logo de l'organisation (ImageObject dédié). */
export function buildLogoImageNode(): JsonLdNode {
  const logo = resolveSchemaLogo();

  return pruneEmpty({
    "@type": "ImageObject",
    "@id": schemaIds.logo(),
    url: absoluteAsset(logo.src),
    contentUrl: absoluteAsset(logo.src),
    width: logo.width,
    height: logo.height,
    caption: logo.alt,
  });
}

/**
 * Organisation éditrice du site.
 * Une seule instance dans le graphe, réutilisée via @id (publisher, etc.).
 * image = logo (identité de marque), pas une cover éditoriale.
 */
export function buildOrganizationNode(): JsonLdNode {
  return pruneEmpty({
    "@type": "Organization",
    "@id": schemaIds.organization(),
    name: config.name,
    url: config.url,
    email: config.contact.email,
    description: config.footerDescription,
    logo: { "@id": schemaIds.logo() },
    image: { "@id": schemaIds.logo() },
  });
}
