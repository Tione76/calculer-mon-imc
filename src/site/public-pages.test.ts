import { describe, expect, it } from "vitest";
import { getAllPublicPages, getSitemapEntries, isPathIndexable } from "./public-pages";

describe("public-pages — MVP IMC", () => {
  it("indexe l'accueil, les guides IMC et exclut les calculateurs retirés du sitemap", () => {
    const sitemapPaths = getSitemapEntries().map((entry) => entry.path);

    expect(sitemapPaths).toContain("/");
    expect(sitemapPaths).toContain("/guides/quest-ce-que-l-imc");
    expect(sitemapPaths).not.toContain("/calculateurs/augmentation-salaire");
    expect(sitemapPaths).not.toContain("/calculateurs/salaire-heures-supplementaires");
    expect(sitemapPaths).not.toContain("/calculateurs/indemnite-licenciement");
  });

  it("marque les routes historiques (410) comme non indexables", () => {
    expect(isPathIndexable("/calculateurs/augmentation-salaire")).toBe(false);
    expect(isPathIndexable("/calculateurs/salaire-heures-supplementaires")).toBe(false);
    expect(isPathIndexable("/calculateurs/indemnite-licenciement")).toBe(false);
  });

  it("publie les calculateurs publics dans le registre", () => {
    const toolPages = getAllPublicPages().filter(
      (page) => page.category === "tools" && page.indexable,
    );
    const calculatorPaths = toolPages.map((page) => page.path);

    expect(calculatorPaths).toContain("/");
    expect(calculatorPaths).toContain("/calculateurs/poids-ideal");
    expect(calculatorPaths).toContain("/calculateurs/masse-grasse");
    expect(calculatorPaths).toHaveLength(4);
    expect(calculatorPaths).toContain("/nos-outils");
  });
});
