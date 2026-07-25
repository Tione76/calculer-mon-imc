import { describe, expect, it } from "vitest";
import { buildGuideJsonLd } from "@/site/schema";
import { buildFaqPageNode } from "@/site/schema/nodes/faq";
import { buildGuideTocH2 } from "../utils";
import { getPublishedGuideSlugs, getGuideBySlug } from "../registry";
import type { Guide, GuideBlock, GuideInternalLink } from "../types";
import { commentInterpreterSonImcGuide } from "./comment-interpreter-son-imc";

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
      default:
        break;
    }
  }

  return words.split(/\s+/).filter(Boolean).length;
}

describe("comment-interpreter-son-imc — guide de référence interprétation", () => {
  const guide = commentInterpreterSonImcGuide;

  it("est enregistré avec slug stable et charte IMC", () => {
    expect(getGuideBySlug("comment-interpreter-son-imc")).toBeTruthy();
    expect(guide.quickSummary?.variant).toBe("cards");
    expect(guide.quickSummary?.cards).toHaveLength(6);
    expect(guide.introSummary).toBeUndefined();
    expect(guide.introDisclaimer).toBeTruthy();
  });

  it("organise FAQ, conclusion, en résumé, sources et note éditoriale", () => {
    const tocIds = buildGuideTocH2(guide).map((entry) => entry.id);
    expect(tocIds.indexOf("poursuivre")).toBeLessThan(tocIds.indexOf("faq"));
    expect(tocIds.indexOf("faq")).toBeLessThan(tocIds.indexOf("conclusion"));
    expect(tocIds.indexOf("conclusion")).toBeLessThan(tocIds.indexOf("en-resume"));
    expect(tocIds.indexOf("en-resume")).toBeLessThan(tocIds.indexOf("sources"));
    expect(guide.postConclusion?.editorialNote?.paragraphs.join(" ")).toContain(
      "Antoine, auteur de Calculer-mon-IMC.fr",
    );
  });

  it("contient le tableau OMS complet et des encadrés pédagogiques", () => {
    const tables = collectBlocks(guide).filter((block) => block.type === "table");
    expect(tables.length).toBeGreaterThanOrEqual(4);

    const omsTable = tables.find(
      (block) => block.type === "table" && block.caption?.includes("Classification OMS"),
    );
    expect(omsTable).toBeTruthy();
    if (omsTable?.type === "table") {
      expect(omsTable.rows).toHaveLength(6);
    }

    const callouts = collectBlocks(guide).filter((block) => block.type === "callout");
    expect(callouts.length).toBeGreaterThanOrEqual(10);
  });

  it("inclut les exemples IMC dont les seuils critiques", () => {
    const tables = collectBlocks(guide).filter((block) => block.type === "table");
    const examplesTable = tables.find(
      (block) => block.type === "table" && block.caption === "Si votre IMC est…",
    );
    expect(examplesTable?.type === "table" && examplesTable.rows.map((row) => row[0])).toEqual([
      "17,9",
      "18,9",
      "22,0",
      "24,8",
      "24,9",
      "25,1",
      "29,0",
      "31,0",
      "34,8",
      "39,8",
    ]);
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

    expect(hrefs).toContain("/calculateurs/masse-grasse");
    expect(hrefs).toContain("/guides/quest-ce-que-l-imc");
    expect(hrefs).toContain("/guides/comment-calculer-son-imc");
    expect(hrefs).toContain("/guides/limites-de-l-imc");
    expect(hrefs).toContain("/guides/calculer-son-poids-ideal");
    expect(hrefs.filter((href) => href === "/guides/limites-de-l-imc").length).toBeGreaterThanOrEqual(2);
    expect(hrefs.filter((href) => href === "/").length).toBeGreaterThanOrEqual(2);
  });

  it("FAQ synchronisée avec JSON-LD", () => {
    expect(guide.faq).toHaveLength(16);
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

  it("ne contient pas de formulations génériques type « Ce guide présente »", () => {
    const content = JSON.stringify(guide);
    expect(content).not.toMatch(/Ce guide présente/i);
    expect(content).not.toMatch(/Dans cet article/i);
  });
});
