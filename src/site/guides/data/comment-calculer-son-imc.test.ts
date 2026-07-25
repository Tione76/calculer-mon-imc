import { describe, expect, it } from "vitest";
import { buildGuideJsonLd } from "@/site/schema";
import { buildFaqPageNode } from "@/site/schema/nodes/faq";
import { buildGuideTocH2 } from "../utils";
import { getPublishedGuideSlugs, getGuideBySlug } from "../registry";
import type { Guide, GuideBlock, GuideInternalLink } from "../types";
import { commentCalculerSonImcGuide } from "./comment-calculer-son-imc";

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

  const stepHrefs = collectBlocks(guide)
    .filter((block) => block.type === "steps")
    .flatMap((block) => (block.type === "steps" ? block.items.map((item) => item.href).filter(Boolean) : []));

  return [...hrefs, ...(stepHrefs as string[])];
}

function approximateWordCount(guide: Guide): number {
  let words = guide.introduction.join(" ");
  words += " " + (guide.introDisclaimer ?? "");
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
        words += " " + [...block.headers, ...block.rows.flat()].join(" ");
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
      default:
        break;
    }
  }

  return words.split(/\s+/).filter(Boolean).length;
}

describe("comment-calculer-son-imc — guide de référence calcul", () => {
  const guide = commentCalculerSonImcGuide;

  it("est enregistré avec slug stable et charte IMC", () => {
    expect(getGuideBySlug("comment-calculer-son-imc")).toBeTruthy();
    expect(guide.quickSummary?.variant).toBe("cards");
    expect(guide.quickSummary?.cards).toHaveLength(6);
    expect(guide.introSummary).toBeUndefined();
    expect(guide.introDisclaimer).toBeTruthy();
  });

  it("organise FAQ, conclusion, sources et note éditoriale comme le guide de référence", () => {
    const tocIds = buildGuideTocH2(guide).map((entry) => entry.id);
    expect(tocIds.indexOf("poursuivre")).toBeLessThan(tocIds.indexOf("faq"));
    expect(tocIds.indexOf("faq")).toBeLessThan(tocIds.indexOf("conclusion"));
    expect(tocIds.indexOf("conclusion")).toBeLessThan(tocIds.indexOf("sources"));
    expect(guide.postConclusion?.editorialNote?.paragraphs.join(" ")).toContain(
      "Antoine, auteur de Calculer-mon-IMC.fr",
    );
  });

  it("contient des tableaux pédagogiques et des encadrés", () => {
    const tables = collectBlocks(guide).filter((block) => block.type === "table");
    expect(tables.length).toBeGreaterThanOrEqual(4);

    const callouts = collectBlocks(guide).filter((block) => block.type === "callout");
    expect(callouts.length).toBeGreaterThanOrEqual(10);
  });

  it("maillage interne vers calculateur et guides publiés", () => {
    const hrefs = collectInternalLinkHrefs(guide);
    const published = new Set(getPublishedGuideSlugs());

    for (const href of hrefs) {
      if (href.startsWith("http")) continue;
      expect(href === "/" || published.has(href.replace("/guides/", ""))).toBe(true);
    }

    expect(hrefs).toContain("/guides/quest-ce-que-l-imc");
    expect(hrefs).toContain("/guides/comment-interpreter-son-imc");
    expect(hrefs).toContain("/guides/limites-de-l-imc");
    expect(hrefs).toContain("/guides/calculer-son-poids-ideal");
    expect(hrefs.filter((href) => href === "/").length).toBeGreaterThanOrEqual(2);
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

  it("atteint une profondeur éditoriale cible sans excès", () => {
    const words = approximateWordCount(guide);
    expect(words).toBeGreaterThan(2500);
    expect(words).toBeLessThan(4500);
  });

  it("n'utilise pas de tiret cadratin", () => {
    expect(JSON.stringify(guide)).not.toContain("—");
  });
});
