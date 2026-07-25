import { describe, expect, it } from "vitest";
import { FAQ_INTERNAL_LINKS } from "./faq-page-links";
import {
  FAQ_PAGE_H1,
  FAQ_PAGE_INTRO_PARAGRAPHS,
  FAQ_PAGE_META,
  FAQ_PAGE_OUTRO_SEGMENTS,
  FAQ_PAGE_SOURCES,
  faqPageCategories,
  getFaqPageSchemaItems,
  getFaqPageTocEntries,
} from "./faq-page-data";

function answerToPlainText(
  segments: Array<string | { href: string; link: string }>,
): string {
  return segments
    .map((seg) => (typeof seg === "string" ? seg : seg.link))
    .join("");
}

describe("FAQ page content", () => {
  const allItems = faqPageCategories.flatMap((category) => category.items);
  const allSegments = [
    ...FAQ_PAGE_INTRO_PARAGRAPHS.flat(),
    ...allItems.flatMap((item) => item.answer),
    ...FAQ_PAGE_OUTRO_SEGMENTS,
  ];
  const linkedHrefs = new Set(
    allSegments
      .filter((seg): seg is { href: string; link: string } => typeof seg !== "string")
      .map((seg) => seg.href),
  );
  const allQuestions = allItems.map((item) => item.question);

  it("expose les métadonnées SEO, le H1 et l'intro IMC", () => {
    expect(FAQ_PAGE_H1).toBe("Questions fréquentes sur l'IMC");
    expect(FAQ_PAGE_META.title).toContain("FAQ IMC");
    expect(FAQ_PAGE_META.description).toContain("IMC");
    expect(FAQ_PAGE_INTRO_PARAGRAPHS).toHaveLength(2);
    const introPlain = FAQ_PAGE_INTRO_PARAGRAPHS.map(answerToPlainText).join(" ");
    expect(introPlain).toContain("principales questions");
    expect(introPlain).not.toContain("les plus recherchées");
    expect(introPlain.length).toBeGreaterThan(200);
  });

  it("contient 6 catégories et 39 questions sans la question de fréquence", () => {
    expect(faqPageCategories).toHaveLength(6);
    expect(allItems).toHaveLength(39);
    expect(allQuestions).not.toContain("À quelle fréquence faut-il recalculer son IMC ?");

    expect(faqPageCategories.map((c) => c.id)).toEqual([
      "calcul-imc",
      "interpretation-imc",
      "limites-imc",
      "poids-ideal",
      "masse-grasse",
      "calculateurs-site",
    ]);
    expect(faqPageCategories[0].items).toHaveLength(6);
  });

  it("expose un sommaire avec des ancres stables dont les sources", () => {
    const toc = getFaqPageTocEntries();
    expect(toc).toHaveLength(7);
    expect(toc.map((entry) => entry.id)).toEqual([
      ...faqPageCategories.map((c) => c.id),
      FAQ_PAGE_SOURCES.id,
    ]);
    for (const entry of toc) {
      expect(entry.id).toMatch(/^[a-z0-9-]+$/);
      expect(entry.title.length).toBeGreaterThan(0);
    }
  });

  it("synchronise le JSON-LD FAQPage avec le contenu visible", () => {
    const schemaItems = getFaqPageSchemaItems();
    expect(schemaItems).toHaveLength(allItems.length);
    expect(schemaItems).toHaveLength(39);

    schemaItems.forEach((schemaItem, index) => {
      const visible = allItems[index];
      expect(schemaItem.question).toBe(visible.question);
      expect(schemaItem.answer).toBe(answerToPlainText(visible.answer));
      expect(schemaItem.answer.length).toBeGreaterThan(40);
    });
  });

  it("maille les calculateurs et les guides attendus", () => {
    const expectedHrefs = [
      FAQ_INTERNAL_LINKS.calcImc.href,
      FAQ_INTERNAL_LINKS.calcPoidsIdeal.href,
      FAQ_INTERNAL_LINKS.calcMasseGrasse.href,
      FAQ_INTERNAL_LINKS.toolsHub.href,
      FAQ_INTERNAL_LINKS.guidesHubShort.href,
      FAQ_INTERNAL_LINKS.guideQuestCeQueImc.href,
      FAQ_INTERNAL_LINKS.guideCalculerImc.href,
      FAQ_INTERNAL_LINKS.guideInterpreterImc.href,
      FAQ_INTERNAL_LINKS.guideLimitesImc.href,
      FAQ_INTERNAL_LINKS.guidePoidsIdeal.href,
    ];
    for (const href of expectedHrefs) {
      expect(linkedHrefs.has(href)).toBe(true);
    }
  });

  it("limite à un lien maximum par réponse", () => {
    for (const item of allItems) {
      const linkCount = item.answer.filter((seg) => typeof seg !== "string").length;
      expect(linkCount).toBeLessThanOrEqual(1);
    }
  });

  it("expose une section sources institutionnelles déjà utilisées sur le site", () => {
    expect(FAQ_PAGE_SOURCES.title).toBe("Sources et références");
    expect(FAQ_PAGE_SOURCES.items.length).toBeGreaterThanOrEqual(3);
    const hrefs = FAQ_PAGE_SOURCES.items.map((item) => item.href);
    expect(hrefs).toContain(
      "https://www.who.int/fr/news-room/fact-sheets/detail/obesity-and-overweight",
    );
    expect(hrefs).toContain(
      "https://www.ameli.fr/assure/sante/themes/obesite-adulte/imc-surpoids-obesite-adulte",
    );
  });

  it("n'utilise pas le tiret cadratin", () => {
    const plain = [
      FAQ_PAGE_H1,
      FAQ_PAGE_META.title,
      FAQ_PAGE_META.description,
      ...FAQ_PAGE_INTRO_PARAGRAPHS.map(answerToPlainText),
      ...allItems.map((item) => `${item.question} ${answerToPlainText(item.answer)}`),
      FAQ_PAGE_SOURCES.intro,
      FAQ_PAGE_SOURCES.methodsNote,
      ...FAQ_PAGE_SOURCES.items.map((item) => `${item.label} ${item.linkText}`),
      answerToPlainText(FAQ_PAGE_OUTRO_SEGMENTS),
    ].join("\n");

    expect(plain).not.toContain("\u2014");
  });
});
