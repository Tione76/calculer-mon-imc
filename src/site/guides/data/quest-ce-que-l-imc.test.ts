import { describe, expect, it } from "vitest";
import { buildGuideJsonLd } from "@/site/schema";
import { buildFaqPageNode } from "@/site/schema/nodes/faq";
import { buildGuideTocH2 } from "../utils";
import { getPublishedGuideSlugs, getGuideBySlug } from "../registry";
import type { Guide, GuideBlock, GuideInternalLink } from "../types";
import { questCeQueLImcGuide } from "./quest-ce-que-l-imc";

function collectBlocks(guide: Guide): GuideBlock[] {
  const blocks: GuideBlock[] = [];
  for (const section of guide.sections) {
    blocks.push(...(section.blocks ?? []));
    for (const subsection of section.subsections ?? []) {
      blocks.push(...subsection.blocks);
    }
  }
  if (guide.postConclusion?.sources?.blocks) {
    blocks.push(...guide.postConclusion.sources.blocks);
  }
  return blocks;
}

function collectInternalLinkHrefs(guide: Guide): string[] {
  const hrefs = collectBlocks(guide)
    .filter((block): block is GuideInternalLink => block.type === "internal-link")
    .map((block) => block.href);

  const stepHrefs =
    collectBlocks(guide)
      .filter((block) => block.type === "steps")
      .flatMap((block) => (block.type === "steps" ? block.items.map((item) => item.href).filter(Boolean) : [])) ?? [];

  return [...hrefs, ...(stepHrefs as string[])];
}

describe("quest-ce-que-l-imc — guide de référence", () => {
  const guide = questCeQueLImcGuide;
  const registered = getGuideBySlug("quest-ce-que-l-imc");

  it("est enregistré dans le registry avec un slug stable", () => {
    expect(registered).toBeTruthy();
    expect(guide.slug).toBe("quest-ce-que-l-imc");
    expect(getPublishedGuideSlugs()).toContain("quest-ce-que-l-imc");
  });

  it("expose title, seoTitle, description, auteur (via schema) et dates", () => {
    expect(guide.title).toBe("Qu'est-ce que l'IMC et à quoi sert-il ?");
    expect(guide.seoTitle).toBe("Qu'est-ce que l'IMC ? Définition, calcul et utilité");
    expect(guide.description).toContain("indice de masse corporelle");
    expect(guide.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(guide.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);

    const jsonLd = buildGuideJsonLd(guide);
    const graph = jsonLd["@graph"] as Record<string, unknown>[];
    const article = graph.find((node) => node["@type"] === "Article");
    expect(article).toBeTruthy();
    expect(article?.author).toEqual({ "@id": "https://calculer-mon-imc.fr/#author" });
  });

  it("n'utilise pas de tiret cadratin dans le contenu visible", () => {
    expect(JSON.stringify(guide)).not.toContain("—");
  });

  it("n'affiche plus la note éditoriale en introSummary", () => {
    expect(guide.introSummary).toBeUndefined();
    expect(guide.introDisclaimer).toContain("vocation pédagogique");
  });

  it("organise les sections principales puis FAQ, conclusion et sources", () => {
    const sectionIds = guide.sections.map((section) => section.id);
    expect(sectionIds.at(-2)).toBe("idees-recues");
    expect(sectionIds.at(-1)).toBe("poursuivre");
    expect(sectionIds).not.toContain("sources");

    const tocIds = buildGuideTocH2(guide).map((entry) => entry.id);
    expect(tocIds.indexOf("idees-recues")).toBeLessThan(tocIds.indexOf("poursuivre"));
    expect(tocIds.indexOf("poursuivre")).toBeLessThan(tocIds.indexOf("faq"));
    expect(tocIds.indexOf("faq")).toBeLessThan(tocIds.indexOf("conclusion"));
    expect(tocIds.indexOf("conclusion")).toBeLessThan(tocIds.indexOf("sources"));
    expect(tocIds).not.toContain("note-editoriale");
  });

  it("contient une fiche synthétique en cartes et des listes structurées", () => {
    expect(guide.quickSummary?.variant).toBe("cards");
    expect(guide.quickSummary?.cards).toHaveLength(5);

    const definition = guide.sections.find((section) => section.id === "definition");
    expect(definition?.blocks?.some((block) => block.type === "definition-list")).toBe(true);

    const origine = guide.sections.find((section) => section.id === "origine");
    expect(origine?.blocks?.some((block) => block.type === "timeline")).toBe(true);
  });

  it("maillage interne : liens essentiels vers calculateur et guides publiés", () => {
    const hrefs = collectInternalLinkHrefs(guide);
    const published = new Set(getPublishedGuideSlugs());
    const allowedCalculators = new Set([
      "/",
      "/calculateurs/poids-ideal",
      "/calculateurs/masse-grasse",
    ]);

    for (const href of hrefs) {
      if (href.startsWith("http")) continue;
      expect(
        allowedCalculators.has(href) || published.has(href.replace("/guides/", "")),
      ).toBe(true);
    }

    expect(hrefs).toContain("/calculateurs/masse-grasse");
    expect(hrefs.filter((href) => href === "/").length).toBeGreaterThanOrEqual(1);
    expect(guide.conclusion.closingCta?.href).toBe("/");
    expect(hrefs.filter((href) => href === "/guides/comment-calculer-son-imc").length).toBeGreaterThanOrEqual(2);
    expect(
      hrefs.filter((href) => href === "/guides/comment-interpreter-son-imc").length,
    ).toBeGreaterThanOrEqual(2);
    expect(hrefs.filter((href) => href === "/guides/limites-de-l-imc").length).toBeGreaterThanOrEqual(2);
    expect(hrefs.filter((href) => href === "/guides/calculer-son-poids-ideal").length).toBeGreaterThanOrEqual(2);
  });

  it("FAQ visible synchronisée avec le JSON-LD FAQPage", () => {
    expect(guide.faq).toHaveLength(12);

    const faqNode = buildFaqPageNode(`/guides/${guide.slug}`, guide.faq);
    expect(faqNode).toBeTruthy();

    const mainEntity = (faqNode as { mainEntity: { name: string; acceptedAnswer: { text: string } }[] })
      .mainEntity;

    mainEntity.forEach((entity, index) => {
      expect(entity.name).toBe(guide.faq[index]?.question);
      expect(entity.acceptedAnswer.text).toBe(guide.faq[index]?.answer);
    });
  });

  it("contient un tableau des catégories adultes cohérent avec le calculateur", () => {
    const interpretation = guide.sections.find((section) => section.id === "interpretation");
    const table = interpretation?.blocks?.find((block) => block.type === "table");
    expect(table && table.type === "table").toBe(true);
    if (!table || table.type !== "table") return;

    expect(table.variant).toBe("imc-categories");
    expect(table.headers).toEqual(["Catégorie", "IMC chez l'adulte", "Lecture du repère"]);
    expect(table.rows[1]?.[0]).toBe("Corpulence normale");
    expect(table.rows[1]?.[1]).toBe("18,5 à 24,9");
    expect(table.rows[5]?.[1]).toBe("≥ 40");
  });

  it("cite des sources institutionnelles ou scientifiques vérifiables", () => {
    const sources = guide.postConclusion?.sources?.blocks?.find((block) => block.type === "source-list");
    expect(sources && sources.type === "source-list").toBe(true);
    if (!sources || sources.type !== "source-list") return;

    const hrefs = sources.items.map((item) => item.href);
    expect(hrefs).toContain("https://www.who.int/fr/news-room/fact-sheets/detail/obesity-and-overweight");
    expect(hrefs).toContain(
      "https://www.ameli.fr/assure/sante/themes/obesite-adulte/imc-surpoids-obesite-adulte",
    );
    expect(hrefs).toContain(
      "https://has-sante.fr/jcms/c_964938/fr/surpoids-et-obesite-de-l-adulte-prise-en-charge-medicale-de-premier-recours",
    );
    expect(hrefs).toContain("https://doi.org/10.1016/0021-9681(72)90027-6");
  });

  it("place la note éditoriale finale après les sources", () => {
    expect(guide.postConclusion?.editorialNote?.title).toBe("Note éditoriale");
    expect(guide.postConclusion?.editorialNote?.paragraphs.join(" ")).toContain(
      "Antoine, auteur de Calculer-mon-IMC.fr",
    );
    expect(guide.postConclusion?.editorialNote?.paragraphs.join(" ")).toContain("ni médecin ni nutritionniste");
  });

  it("conclut avec un CTA et des liens secondaires vers interprétation et limites", () => {
    expect(guide.conclusion.closingCta?.href).toBe("/");
    expect(guide.conclusion.secondaryLinks?.map((link) => link.href)).toEqual([
      "/guides/comment-interpreter-son-imc",
      "/guides/limites-de-l-imc",
    ]);
  });
});
