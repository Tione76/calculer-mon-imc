import { describe, expect, it } from "vitest";
import { calculateImc, resolveImcCategory } from "../engine";
import { formatImcValue } from "../format";
import {
  buildImcAccessibleSummary,
  getImcInterpretationSentence,
} from "./interpretation";

describe("interprétation jauge IMC", () => {
  it("fournit une phrase personnalisée par catégorie", () => {
    expect(getImcInterpretationSentence("underweight")).toMatch(/18,5/);
    expect(getImcInterpretationSentence("normal")).toMatch(/corpulence normale/i);
    expect(getImcInterpretationSentence("overweight")).toMatch(/surpoids/i);
    expect(getImcInterpretationSentence("obesity3")).toMatch(/obésité massive/i);
  });

  it("résume le résultat pour l'alternative textuelle", () => {
    const result = calculateImc({ heightCm: 170, weightKg: 50 });
    const summary = buildImcAccessibleSummary(formatImcValue(result.bmi), result.category);
    expect(summary).toContain("17,3");
    expect(summary).toContain("Insuffisance pondérale");
    expect(summary).toMatch(/Fourchette/);
  });
});

describe("cas de référence homepage — jauge IMC", () => {
  const cases = [
    { heightCm: 170, weightKg: 50, display: "17,3", category: "underweight" },
    { heightCm: 170, weightKg: 60, display: "20,8", category: "normal" },
    { heightCm: 170, weightKg: 80, display: "27,7", category: "overweight" },
    { heightCm: 170, weightKg: 95, display: "32,9", category: "obesity1" },
    { heightCm: 170, weightKg: 105, display: "36,3", category: "obesity2" },
    { heightCm: 170, weightKg: 120, display: "41,5", category: "obesity3" },
  ] as const;

  it.each(cases)(
    "$weightKg kg / $heightCm cm → $display ($category)",
    ({ heightCm, weightKg, display, category }) => {
      const result = calculateImc({ heightCm, weightKg });
      expect(formatImcValue(result.bmi)).toBe(display);
      expect(result.category.id).toBe(category);
    },
  );
});

describe("frontières IMC avec précision complète", () => {
  it("assigne la catégorie avant arrondi d'affichage", () => {
    expect(resolveImcCategory(18.499999).id).toBe("underweight");
    expect(resolveImcCategory(18.5).id).toBe("normal");
    expect(resolveImcCategory(24.999999).id).toBe("normal");
    expect(resolveImcCategory(25).id).toBe("overweight");
    expect(resolveImcCategory(29.999999).id).toBe("overweight");
    expect(resolveImcCategory(30).id).toBe("obesity1");
    expect(resolveImcCategory(34.999999).id).toBe("obesity1");
    expect(resolveImcCategory(35).id).toBe("obesity2");
    expect(resolveImcCategory(39.999999).id).toBe("obesity2");
    expect(resolveImcCategory(40).id).toBe("obesity3");
  });

  it("peut afficher 18,5 tout en restant en insuffisance pondérale si la valeur brute est sous le seuil", () => {
    const borderWeight = 18.499999 * 1.7 * 1.7;
    const result = calculateImc({ heightCm: 170, weightKg: borderWeight });
    expect(result.category.id).toBe("underweight");
    expect(formatImcValue(result.bmi)).toBe("18,5");
  });
});
