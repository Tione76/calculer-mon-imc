import { describe, expect, it } from "vitest";
import { buildGuideJsonLd } from "@/site/schema";
import { buildFaqPageNode } from "@/site/schema/nodes/faq";
import { buildGuideTocH2 } from "../utils";
import { getPublishedGuideSlugs, getGuideBySlug } from "../registry";
import type { Guide, GuideBlock, GuideInternalLink } from "../types";
import { calculerSonPoidsIdealGuide } from "./calculer-son-poids-ideal";

function collectBlocks(guide: Guide): GuideBlock[] {
  const blocks: GuideBlock[] = [];
  for (const section of guide.sections) {
    blocks.push(...(section.blocks ?? []));
    for (const subsection of section.subsections ?? []) {
      blocks.push(...subsection.blocks);
    }
  }
  if (guide.postConclusion?.summary?.blocks) {
    blocks.push(...guide.postConclusion.summary.blocks);
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

  const stepHrefs = collectBlocks(guide)
    .filter((block) => block.type === "steps")
    .flatMap((block) => (block.type === "steps" ? block.items.map((item) => item.href).filter(Boolean) : []));

  return [...hrefs, ...(stepHrefs as string[])];
}

function approximateWordCount(guide: Guide): number {
  let words = guide.introduction.join(" ");
  words += " " + (guide.introDisclaimer ?? "");
  words += " " + (guide.introSummary?.items.join(" ") ?? "");
  words += " " + (guide.quickSummary?.cards?.map((c) => `${c.label} ${c.value}`).join(" ") ?? "");
  words += " " + guide.faq.map((item) => `${item.question} ${item.answer}`).join(" ");
  words += " " + guide.conclusion.keyPoints.join(" ");
  words += " " + guide.conclusion.closingText;
  words += " " + (guide.postConclusion?.editorialNote?.paragraphs.join(" ") ?? "");

  for (const block of collectBlocks(guide)) {
    switch (block.type) {
      case "paragraph":
        words += " " + block.text;
        break;
      case "list":
        words += " " + block.items.join(" ");
        break;
      case "callout":
        words += " " + block.paragraphs.join(" ");
        break;
      case "table":
        words += " " + [...block.headers, ...block.rows.flat(), ...(block.footnote ? [block.footnote] : [])].join(" ");
        break;
      case "steps":
        words += " " + block.items.map((step) => `${step.title} ${step.description}`).join(" ");
        break;
      case "internal-link":
        words += " " + (block.intro ?? "") + " " + block.label;
        break;
      case "contextual-cta":
        words += " " + block.text + " " + block.label;
        break;
      case "source-list":
        words += " " + block.items.map((item) => `${item.org} ${item.title}`).join(" ");
        break;
      case "definition-list":
        words += " " + block.items.map((item) => `${item.term} ${item.definition}`).join(" ");
        break;
      case "formula":
        words += " " + block.lines.join(" ");
        break;
      default:
        break;
    }
  }

  return words.split(/\s+/).filter(Boolean).length;
}

describe("calculer-son-poids-ideal — guide de référence poids idéal", () => {
  const guide = calculerSonPoidsIdealGuide;

  it("est enregistré avec slug stable et charte IMC", () => {
    expect(getGuideBySlug("calculer-son-poids-ideal")).toBeTruthy();
    expect(guide.quickSummary?.variant).toBe("cards");
    expect(guide.quickSummary?.cards).toHaveLength(6);
    expect(guide.introDisclaimer).toBeTruthy();
    expect(guide.title).toContain("méthodes, formules et limites");
  });

  it("organise FAQ, conclusion, en résumé, sources et note éditoriale", () => {
    const tocIds = buildGuideTocH2(guide).map((entry) => entry.id);
    expect(tocIds.indexOf("poursuivre")).toBeLessThan(tocIds.indexOf("faq"));
    expect(tocIds.indexOf("conclusion")).toBeLessThan(tocIds.indexOf("en-resume"));
    expect(tocIds.indexOf("en-resume")).toBeLessThan(tocIds.indexOf("sources"));
    expect(guide.introSummary?.title).toContain("30 secondes");
    expect(guide.postConclusion?.editorialNote?.paragraphs.join(" ")).toContain(
      "Antoine, auteur de Calculer Mon IMC",
    );
  });

  it("présente les six formules principales et un tableau comparatif", () => {
    const sectionIds = guide.sections.map((section) => section.id);
    expect(sectionIds).toContain("formule-lorentz");
    expect(sectionIds).toContain("formule-devine");
    expect(sectionIds).toContain("formule-miller");
    expect(sectionIds).toContain("formule-robinson");
    expect(sectionIds).toContain("formule-hamwi");
    expect(sectionIds).toContain("formule-broca");
    expect(sectionIds).toContain("tableau-comparatif");

    const tables = collectBlocks(guide).filter((block) => block.type === "table");
    expect(tables.length).toBeGreaterThanOrEqual(1);
    expect(tables.some((block) => block.type === "table" && block.variant === "editorial-comparison")).toBe(true);

    const formulas = collectBlocks(guide).filter((block) => block.type === "formula");
    expect(formulas.length).toBe(6);
  });

  it("priorise les FAQ les plus recherchées", () => {
    expect(guide.faq[0]?.question).toMatch(/Existe-t-il vraiment un poids idéal/i);
    expect(guide.faq[1]?.question).toMatch(/meilleure formule/i);
    expect(guide.faq[2]?.question).toMatch(/Lorentz et Devine/i);
  });

  it("maillage interne vers calculateur et guides publiés", () => {
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

    expect(hrefs).toContain("/calculateurs/poids-ideal");
    expect(hrefs).toContain("/guides/comment-interpreter-son-imc");
    expect(hrefs).toContain("/guides/limites-de-l-imc");
    expect(hrefs.filter((href) => href === "/").length).toBeGreaterThanOrEqual(1);
  });

  it("FAQ synchronisée avec JSON-LD", () => {
    expect(guide.faq).toHaveLength(12);
    const faqNode = buildFaqPageNode(`/guides/${guide.slug}`, guide.faq);
    const mainEntity = (faqNode as { mainEntity: { name: string; acceptedAnswer: { text: string } }[] })
      .mainEntity;
    mainEntity.forEach((entity, index) => {
      expect(entity.name).toBe(guide.faq[index]?.question);
      expect(entity.acceptedAnswer.text).toBe(guide.faq[index]?.answer);
    });

    const graph = buildGuideJsonLd(guide)["@graph"] as Record<string, unknown>[];
    expect(graph.some((node) => node["@type"] === "FAQPage")).toBe(true);
  });

  it("ne discrédite pas les méthodes et reste nuancé", () => {
    const content = JSON.stringify(guide);
    expect(content).not.toMatch(/le poids idéal n'existe pas/i);
    expect(content).not.toMatch(/ne sert à rien/i);
    expect(content).toMatch(/repère/i);
    expect(content).toMatch(/Lorentz/i);
    expect(content).toMatch(/Devine/i);
    expect(guide.conclusion.closingText).toContain("excellent repère");
    expect(guide.conclusion.closingPathway).toMatch(/IMC/i);
  });

  it("atteint une profondeur éditoriale cible sans excès", () => {
    const words = approximateWordCount(guide);
    expect(words).toBeGreaterThan(2500);
    expect(words).toBeLessThan(5500);
  });

  it("n'utilise pas de tiret cadratin", () => {
    expect(JSON.stringify(guide)).not.toContain("—");
  });
});
