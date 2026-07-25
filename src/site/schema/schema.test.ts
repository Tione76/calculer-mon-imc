import { describe, expect, it } from "vitest";
import { toSchemaDateTime } from "./types";
import { buildPersonNode } from "./nodes/person";
import { buildArticleNode } from "./nodes/article";
import { buildWebApplicationNode } from "./nodes/webapplication";
import { buildOrganizationNode } from "./nodes/organization";
import {
  buildHomeJsonLd,
  buildCalculatorJsonLd,
  buildGuideJsonLd,
  buildHubJsonLd,
  buildWebPageJsonLd,
  buildAuthorJsonLd,
} from "./pages";
import { getGuideBySlug, guides } from "@/site/guides/registry";
import {
  HOME_COVER,
  GUIDES_HUB_COVER,
  TOOLS_HUB_COVER,
  getCalculatorCover,
} from "@/site/guides/covers";
import { seoConfig } from "@/site/seo.config";

describe("schema datetime and author", () => {
  it("normalise YYYY-MM-DD en ISO 8601 avec heure et fuseau", () => {
    expect(toSchemaDateTime("2026-07-14")).toBe("2026-07-14T09:00:00+02:00");
  });

  it("conserve un datetime déjà complet", () => {
    expect(toSchemaDateTime("2026-07-14T09:00:00+02:00")).toBe(
      "2026-07-14T09:00:00+02:00",
    );
  });

  it("émet Person avec le nom Antoine et l'URL de la page auteur", () => {
    expect(buildPersonNode().name).toBe("Antoine");
    expect(buildPersonNode()["@id"]).toBe("https://calculer-mon-imc.fr/#author");
    expect(buildPersonNode().url).toBe("https://calculer-mon-imc.fr/auteur/antoine");
  });

  it("émet Article avec dates ISO complètes", () => {
    const guide = getGuideBySlug("quest-ce-que-l-imc");
    expect(guide).toBeTruthy();
    const article = buildArticleNode(guide!, `/guides/${guide!.slug}`);
    expect(article.datePublished).toBe("2026-07-20T09:00:00+02:00");
    expect(article.dateModified).toBe("2026-07-21T09:00:00+02:00");
    expect(article.author).toEqual({ "@id": "https://calculer-mon-imc.fr/#author" });
  });
});

describe("Organization", () => {
  it("réutilise le logo pour image (identité de marque)", () => {
    const org = buildOrganizationNode();
    expect(org.logo).toEqual({ "@id": "https://calculer-mon-imc.fr/#logo" });
    expect(org.image).toEqual({ "@id": "https://calculer-mon-imc.fr/#logo" });
  });
});

describe("WebApplication sur calculateurs interactifs", () => {
  it("émet un WebApplication minimal et vérifiable", () => {
    const node = buildWebApplicationNode({
      path: "/",
      name: "Calculateur IMC",
      description: "Description test",
    });

    expect(node).toEqual({
      "@type": "WebApplication",
      "@id": "https://calculer-mon-imc.fr/#webapp",
      name: "Calculateur IMC",
      description: "Description test",
      url: "https://calculer-mon-imc.fr",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      isAccessibleForFree: true,
      publisher: { "@id": "https://calculer-mon-imc.fr/#organization" },
    });
    expect(node).not.toHaveProperty("aggregateRating");
    expect(node).not.toHaveProperty("offers");
    expect(node).not.toHaveProperty("downloadUrl");
  });

  it("relie WebPage.mainEntity au WebApplication sur l'accueil et les calculateurs", () => {
    const home = buildHomeJsonLd({
      name: "Calculateur IMC",
      description: "Description accueil",
      cover: HOME_COVER,
      faq: [{ question: "Q ?", answer: "R." }],
    });
    const homeGraph = home["@graph"] as Record<string, unknown>[];
    const homePage = homeGraph.find((n) => n["@type"] === "WebPage");
    const homeApp = homeGraph.find((n) => n["@type"] === "WebApplication");
    const homeFaq = homeGraph.find((n) => n["@type"] === "FAQPage");

    expect(homeApp).toBeTruthy();
    expect(homePage?.mainEntity).toEqual({ "@id": "https://calculer-mon-imc.fr/#webapp" });
    expect(homePage?.hasPart).toEqual([{ "@id": "https://calculer-mon-imc.fr/#faq" }]);
    expect(homeFaq).toBeTruthy();

    const calc = buildCalculatorJsonLd({
      path: "/calculateurs/poids-ideal",
      name: "Calculez votre poids idéal en quelques secondes",
      description: "Description calculateur",
      cover: getCalculatorCover("poids-ideal"),
      faq: [],
    });
    const calcGraph = calc["@graph"] as Record<string, unknown>[];
    expect(calcGraph.some((n) => n["@type"] === "WebApplication")).toBe(true);
    expect(calcGraph.find((n) => n["@type"] === "WebPage")?.mainEntity).toEqual({
      "@id": "https://calculer-mon-imc.fr/calculateurs/poids-ideal#webapp",
    });

    const breadcrumb = calcGraph.find((n) => n["@type"] === "BreadcrumbList");
    const crumbs = breadcrumb?.itemListElement as Array<{ name: string }>;
    expect(crumbs.map((c) => c.name)).toEqual([
      "Accueil",
      "Calculateurs",
      "Calculez votre poids idéal en quelques secondes",
    ]);
  });

  it("n'ajoute pas WebApplication aux guides ni aux pages éditoriales", () => {
    const guide = getGuideBySlug("quest-ce-que-l-imc");
    expect(guide).toBeTruthy();
    const guideGraph = buildGuideJsonLd(guide!)["@graph"] as Record<string, unknown>[];
    expect(guideGraph.some((n) => n["@type"] === "WebApplication")).toBe(false);

    const legal = buildWebPageJsonLd({
      path: "/mentions-legales",
      name: "Mentions légales",
      description: "d",
      breadcrumbs: [
        { name: "Accueil", path: "/" },
        { name: "Mentions", path: "/mentions-legales" },
      ],
    });
    const legalGraph = legal["@graph"] as Record<string, unknown>[];
    expect(legalGraph.some((n) => n["@type"] === "WebApplication")).toBe(false);
  });
});

describe("hubs Schema.org", () => {
  it("place ItemList en mainEntity et FAQ en hasPart", () => {
    const graph = buildHubJsonLd({
      path: seoConfig.guidesHub.path,
      name: seoConfig.guidesHub.h1,
      description: seoConfig.guidesHub.description,
      hubLabel: seoConfig.guidesHub.h1,
      cover: GUIDES_HUB_COVER,
      faq: [{ question: "Q ?", answer: "R." }],
      listName: "Liste des guides",
      items: guides.map((guide) => ({
        name: guide.title,
        path: `/guides/${guide.slug}`,
      })),
    })["@graph"] as Record<string, unknown>[];

    const page = graph.find((n) => n["@type"] === "WebPage");
    const itemList = graph.find((n) => n["@type"] === "ItemList");
    const faq = graph.find((n) => n["@type"] === "FAQPage");

    expect(itemList).toBeTruthy();
    expect(faq).toBeTruthy();
    expect(page?.mainEntity).toEqual({
      "@id": "https://calculer-mon-imc.fr/guides#itemlist",
    });
    expect(page?.hasPart).toEqual([{ "@id": "https://calculer-mon-imc.fr/guides#faq" }]);
    expect(itemList?.numberOfItems).toBe(guides.length);
    expect(graph.some((n) => n["@type"] === "WebApplication")).toBe(false);
  });

  it("utilise le libellé Calculateurs pour le hub outils", () => {
    const graph = buildHubJsonLd({
      path: seoConfig.toolsHub.path,
      name: "Nos calculateurs santé",
      description: seoConfig.toolsHub.description,
      hubLabel: seoConfig.toolsHub.h1,
      cover: TOOLS_HUB_COVER,
      faq: [],
      listName: "Calculateurs",
      items: [{ name: "Calculateur IMC", path: "/" }],
    })["@graph"] as Record<string, unknown>[];

    const breadcrumb = graph.find((n) => n["@type"] === "BreadcrumbList");
    const crumbs = breadcrumb?.itemListElement as Array<{ name: string }>;
    expect(crumbs.map((c) => c.name)).toEqual(["Accueil", "Calculateurs"]);
  });
});

describe("page auteur Schema.org", () => {
  it("réutilise le même @id Person sans doublon", () => {
    const graph = buildAuthorJsonLd()["@graph"] as Record<string, unknown>[];
    const persons = graph.filter((n) => n["@type"] === "Person");
    expect(persons).toHaveLength(1);
    expect(persons[0]["@id"]).toBe("https://calculer-mon-imc.fr/#author");
    expect(persons[0].url).toBe("https://calculer-mon-imc.fr/auteur/antoine");
    expect(graph.find((n) => n["@type"] === "WebPage")?.mainEntity).toEqual({
      "@id": "https://calculer-mon-imc.fr/#author",
    });
  });
});
