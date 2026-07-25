import { describe, expect, it } from "vitest";
import { IMC_CATEGORIES } from "./config";
import { calculateImc, resolveImcCategory } from "./engine";
import { formatImcValue } from "./format";
import { imcResultToSections } from "./presentation";
import {
  parseHeightCm,
  parseWeightKg,
  validateHeightCm,
  validateWeightKg,
} from "./validation";

function displayBmi(bmi: number): number {
  return Math.round(bmi * 10) / 10;
}

describe("calculateImc — cas de référence", () => {
  it("50 kg / 160 cm → IMC 19,5 (corpulence normale)", () => {
    const result = calculateImc({ heightCm: 160, weightKg: 50 });
    expect(formatImcValue(result.bmi)).toBe("19,5");
    expect(result.category.id).toBe("normal");
  });

  it("70 kg / 175 cm → IMC 22,9 (corpulence normale)", () => {
    const result = calculateImc({ heightCm: 175, weightKg: 70 });
    expect(formatImcValue(result.bmi)).toBe("22,9");
    expect(result.category.id).toBe("normal");
  });

  it("80 kg / 180 cm → IMC 24,7 (corpulence normale)", () => {
    const result = calculateImc({ heightCm: 180, weightKg: 80 });
    expect(formatImcValue(result.bmi)).toBe("24,7");
    expect(result.category.id).toBe("normal");
  });

  it("100 kg / 170 cm → IMC 34,6 (obésité modérée)", () => {
    const result = calculateImc({ heightCm: 170, weightKg: 100 });
    expect(formatImcValue(result.bmi)).toBe("34,6");
    expect(result.category.id).toBe("obesity1");
  });

  it("calcule l'IMC pour 170 cm et 70 kg", () => {
    const result = calculateImc({ heightCm: 170, weightKg: 70 });
    expect(formatImcValue(result.bmi)).toBe("24,2");
    expect(result.category.id).toBe("normal");
  });

  it("classe un IMC en surpoids", () => {
    const result = calculateImc({ heightCm: 170, weightKg: 80 });
    expect(formatImcValue(result.bmi)).toBe("27,7");
    expect(result.category.id).toBe("overweight");
  });

  it("classe un IMC en insuffisance pondérale", () => {
    const result = calculateImc({ heightCm: 180, weightKg: 55 });
    expect(formatImcValue(result.bmi)).toBe("17,0");
    expect(result.category.id).toBe("underweight");
  });

  it("refuse une taille nulle ou négative", () => {
    expect(() => calculateImc({ heightCm: 0, weightKg: 70 })).toThrow(/invalides/i);
    expect(() => calculateImc({ heightCm: -170, weightKg: 70 })).toThrow(/invalides/i);
  });
});

describe("resolveImcCategory — seuils Assurance Maladie (adulte)", () => {
  it("assigne les seuils limites sans chevauchement", () => {
    expect(resolveImcCategory(18.4).id).toBe("underweight");
    expect(resolveImcCategory(18.5).id).toBe("normal");
    expect(resolveImcCategory(24.9).id).toBe("normal");
    expect(resolveImcCategory(25).id).toBe("overweight");
    expect(resolveImcCategory(29.9).id).toBe("overweight");
    expect(resolveImcCategory(30).id).toBe("obesity1");
    expect(resolveImcCategory(34.9).id).toBe("obesity1");
    expect(resolveImcCategory(35).id).toBe("obesity2");
    expect(resolveImcCategory(39.9).id).toBe("obesity2");
    expect(resolveImcCategory(40).id).toBe("obesity3");
    expect(resolveImcCategory(50).id).toBe("obesity3");
  });

  it("respecte les frontières avec précision complète", () => {
    expect(resolveImcCategory(18.499999).id).toBe("underweight");
    expect(resolveImcCategory(24.999999).id).toBe("normal");
    expect(resolveImcCategory(29.999999).id).toBe("overweight");
    expect(resolveImcCategory(34.999999).id).toBe("obesity1");
    expect(resolveImcCategory(39.999999).id).toBe("obesity2");
  });
});

describe("IMC_CATEGORIES — continuité des seuils", () => {
  it("enchaîne les min/max sans trou ni doublon", () => {
    for (let i = 1; i < IMC_CATEGORIES.length; i += 1) {
      const prev = IMC_CATEGORIES[i - 1];
      const curr = IMC_CATEGORIES[i];
      expect(curr.min).toBe(prev.max);
    }
    expect(IMC_CATEGORIES[0].min).toBe(0);
    expect(IMC_CATEGORIES.at(-1)?.max).toBeNull();
  });

  it("utilise les libellés officiels adultes", () => {
    expect(IMC_CATEGORIES.find((c) => c.id === "normal")?.label).toBe("Corpulence normale");
    expect(IMC_CATEGORIES.find((c) => c.id === "obesity3")?.label).toBe(
      "Obésité massive (classe III)",
    );
  });

  it("utilise des libellés descriptifs sans promesse diagnostique", () => {
    for (const cat of IMC_CATEGORIES) {
      const text = `${cat.label} ${cat.explanation} ${cat.detail}`.toLowerCase();
      expect(text).not.toMatch(/\bdiagnostic\b/);
      expect(text).not.toMatch(/\bgarantie de santé\b/);
    }
  });
});

describe("validation — saisie et parsing", () => {
  it("accepte les virgules décimales françaises", () => {
    expect(validateHeightCm("175,5")).toBeNull();
    expect(validateWeightKg("70,5")).toBeNull();
    expect(parseHeightCm("175,5")).toBe(175.5);
    expect(parseWeightKg("70,5")).toBe(70.5);
  });

  it("accepte les espaces et les points décimaux", () => {
    expect(parseHeightCm(" 170 ")).toBe(170);
    expect(parseWeightKg("70.5")).toBe(70.5);
  });

  it("rejette les valeurs hors limites", () => {
    expect(validateHeightCm("99")).toMatch(/100/);
    expect(validateHeightCm("251")).toMatch(/250/);
    expect(validateWeightKg("24")).toMatch(/25/);
    expect(validateWeightKg("301")).toMatch(/300/);
  });

  it("rejette NaN, Infinity et texte non numérique", () => {
    for (const value of ["abc", "1e309", "Infinity", "--", ""]) {
      expect(validateHeightCm(value)).not.toBeNull();
      expect(validateWeightKg(value)).not.toBeNull();
      expect(parseHeightCm(value)).toBeNull();
      expect(parseWeightKg(value)).toBeNull();
    }
  });

  it("n'accepte pas une saisie vide pour le calcul", () => {
    expect(validateHeightCm("")).toMatch(/Saisissez/);
    expect(validateWeightKg("   ")).toMatch(/Saisissez/);
    expect(parseHeightCm("")).toBeNull();
    expect(parseWeightKg("   ")).toBeNull();
  });
});

describe("imcResultToSections", () => {
  it("délègue l'affichage à la carte IMC (sections vides)", () => {
    const view = imcResultToSections();

    expect(view.sections).toHaveLength(0);
  });
});

describe("arrondi d'affichage", () => {
  it("arrondit à une décimale sans modifier la catégorie", () => {
    const raw = 24.24;
    expect(formatImcValue(raw)).toBe("24,2");
    expect(displayBmi(raw)).toBe(24.2);
    expect(resolveImcCategory(raw).id).toBe("normal");
  });
});
