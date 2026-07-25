/**
 * Mapping couverture : route / identifiant → fichier covers/
 */
import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import {
  CALCULATOR_COVERS,
  FAQ_COVER,
  GUIDE_COVERS,
  GUIDES_HUB_COVER,
  HOME_COVER,
  TOOLS_HUB_COVER,
  formatCoverCredit,
  getCalculatorCover,
  getGuideCover,
  toAbsoluteAssetUrl,
} from "./covers";

function publicExists(src: string): boolean {
  const relative = src.replace(/^\//, "");
  return fs.existsSync(path.join(process.cwd(), "public", relative));
}

describe("covers registry", () => {
  it("maps each calculator to a dedicated webp under /images/covers/", () => {
    for (const [id, cover] of Object.entries(CALCULATOR_COVERS)) {
      expect(cover.src.startsWith("/images/covers/"), id).toBe(true);
      expect(cover.src.endsWith(".webp"), id).toBe(true);
      expect(cover.alt.length).toBeGreaterThan(5);
      expect(cover.credit?.photographer.length).toBeGreaterThan(1);
      expect(["Pexels", "Unsplash"]).toContain(cover.credit?.source);
    }
    expect(getCalculatorCover("imc").src).toContain("calculateur-IMC.webp");
    expect(getCalculatorCover("poids-ideal").src).toContain("Calculer-poids-idéal.webp");
    expect(getCalculatorCover("masse-grasse").src).toContain("Calculer-masse-grasse.webp");
    expect(publicExists(getCalculatorCover("imc").src)).toBe(true);
    expect(publicExists(getCalculatorCover("poids-ideal").src)).toBe(true);
    expect(publicExists(getCalculatorCover("masse-grasse").src)).toBe(true);
    expect(formatCoverCredit(getCalculatorCover("masse-grasse").credit!)).toBe(
      "Photo de Daniel Dan via Pexels",
    );
  });

  it("maps each guide slug IMC MVP to its dedicated webp", () => {
    expect(Object.keys(GUIDE_COVERS)).toEqual(
      expect.arrayContaining([
        "quest-ce-que-l-imc",
        "comment-calculer-son-imc",
        "comment-interpreter-son-imc",
        "limites-de-l-imc",
        "calculer-son-poids-ideal",
      ]),
    );
    expect(getGuideCover("quest-ce-que-l-imc")?.src).toContain("IMC-Définition-calcul.webp");
    expect(getGuideCover("comment-calculer-son-imc")?.src).toContain("calculer-son-imc.webp");
    expect(getGuideCover("comment-interpreter-son-imc")?.src).toContain("interpréter-son-IMC.webp");
    expect(getGuideCover("limites-de-l-imc")?.src).toContain("limites-IMC.webp");
    expect(getGuideCover("calculer-son-poids-ideal")?.src).toContain("mon-poids-idéal.webp");
    expect(getGuideCover("quest-ce-que-l-imc")?.hideCredit).toBeUndefined();
    expect(publicExists(getGuideCover("quest-ce-que-l-imc")!.src)).toBe(true);
  });

  it("exposes hub and FAQ covers with dedicated webps", () => {
    expect(HOME_COVER.src).toContain("calculateur-IMC.webp");
    expect(HOME_COVER.alt).toMatch(/IMC|pèse-personne|mètre/i);
    expect(HOME_COVER.hideCredit).toBeUndefined();
    expect(GUIDES_HUB_COVER.src).toContain("Guides-IMC-poids.webp");
    expect(TOOLS_HUB_COVER.src).toContain("Outils-santé.webp");
    expect(FAQ_COVER.src).toContain("Questions-IMC-poids.webp");
    expect(publicExists(HOME_COVER.src)).toBe(true);
    expect(publicExists(GUIDES_HUB_COVER.src)).toBe(true);
    expect(publicExists(TOOLS_HUB_COVER.src)).toBe(true);
    expect(publicExists(FAQ_COVER.src)).toBe(true);
    expect(formatCoverCredit({ photographer: "Kindel Media", source: "Pexels" })).toBe(
      "Photo de Kindel Media via Pexels",
    );
  });

  it("encodes accents in absolute asset URLs", () => {
    const url = toAbsoluteAssetUrl(
      "https://calculer-mon-imc.fr",
      "/images/covers/calculateurs/Calculer-poids-idéal.webp",
    );
    expect(url).toContain("Calculer-poids-id%C3%A9al.webp");
    expect(url).not.toContain("localhost");
  });

  it("preserves cache-busting query strings on absolute asset URLs", () => {
    expect(toAbsoluteAssetUrl("https://calculer-mon-imc.fr", "/logo.png?v=2")).toBe(
      "https://calculer-mon-imc.fr/logo.png?v=2",
    );
  });
});
