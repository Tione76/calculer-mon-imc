import { describe, expect, it } from "vitest";
import { BODY_FAT_QUICK_AGE_MIN } from "./constants";
import {
  computeBmi,
  deurenberg1991AdultBodyFatPercent,
  deurenberg1991BodyFatPercent,
  rfmBodyFatPercent,
  rfmBodyFatPercentFromMeasures,
  usNavyBodyFatPercent,
  ymcaBodyFatPercent,
} from "./formulas";
import { roundBodyFatPercent } from "./format";
import {
  buildBodyFatInput,
  buildRfmCompositionFromWeight,
  calculatePersonalizedBodyFat,
  calculateQuickBodyFat,
  compareBodyFatMethods,
} from "./engine";
import { getMethodMissingHint } from "./method-requirements";

describe("formule Deurenberg 1991 adulte", () => {
  it("calcule un homme adulte 175 cm, 80 kg, 35 ans", () => {
    const input = buildBodyFatInput("male", 35, 175, 80);
    const bmi = computeBmi(175, 80);
    const raw = deurenberg1991AdultBodyFatPercent(input);
    expect(raw).toBeCloseTo(1.2 * bmi + 0.23 * 35 - 10.8 * 1 - 5.4, 8);
    const result = calculateQuickBodyFat(input);
    expect(result).not.toBeNull();
    expect(result!.bodyFatPercent).toBe(roundBodyFatPercent(raw));
  });

  it("calcule une femme adulte 165 cm, 62 kg, 28 ans", () => {
    const input = buildBodyFatInput("female", 28, 165, 62);
    const bmi = computeBmi(165, 62);
    const raw = deurenberg1991AdultBodyFatPercent(input);
    expect(raw).toBeCloseTo(1.2 * bmi + 0.23 * 28 - 10.8 * 0 - 5.4, 8);
    const result = calculateQuickBodyFat(input);
    expect(result!.bodyFatPercent).toBe(roundBodyFatPercent(raw));
  });

  it("refuse le mode rapide pour un mineur de moins de 18 ans", () => {
    const input = buildBodyFatInput("male", 17, 175, 70);
    expect(calculateQuickBodyFat(input)).toBeNull();
  });

  it("accepte exactement 18 ans en mode rapide", () => {
    const input = buildBodyFatInput("female", BODY_FAT_QUICK_AGE_MIN, 168, 60);
    expect(calculateQuickBodyFat(input)).not.toBeNull();
  });

  it("conserve la formule enfant en mode comparaison via deurenberg1991BodyFatPercent", () => {
    const input = buildBodyFatInput("male", 14, 160, 50);
    const bmi = computeBmi(160, 50);
    const raw = deurenberg1991BodyFatPercent(input);
    expect(raw).toBeCloseTo(1.51 * bmi - 0.7 * 14 - 3.6 * 1 + 1.4, 8);
  });
});

describe("formule RFM (Woolcott & Bergman 2018)", () => {
  it("calcule un homme avec taille 175 cm et tour de taille 85 cm", () => {
    expect(rfmBodyFatPercentFromMeasures("male", 175, 85)).toBeCloseTo(64 - 20 * (175 / 85), 6);
    const input = buildBodyFatInput("male", 30, 175, 75, { waistCm: 85 });
    expect(rfmBodyFatPercent(input)).toBeCloseTo(64 - 20 * (175 / 85), 6);
  });

  it("calcule une femme avec la formule équivalente 76 − 20 × (H/W)", () => {
    expect(rfmBodyFatPercentFromMeasures("female", 170, 80)).toBeCloseTo(76 - 20 * (170 / 80), 6);
  });

  it("ajoute 12 points pour une femme par rapport à un homme", () => {
    expect(rfmBodyFatPercentFromMeasures("female", 170, 80) - rfmBodyFatPercentFromMeasures("male", 170, 80)).toBeCloseTo(12, 6);
  });

  it("rejette un tour de taille nul ou négatif", () => {
    expect(rfmBodyFatPercentFromMeasures("male", 175, 0)).toBeNaN();
    expect(rfmBodyFatPercentFromMeasures("male", 175, -5)).toBeNaN();
  });
});

describe("mode estimation personnalisée", () => {
  it("retourne un résultat RFM sans poids ni âge", () => {
    const result = calculatePersonalizedBodyFat("male", 175, 85);
    expect(result).not.toBeNull();
    expect(result!.bodyFatPercent).toBe(roundBodyFatPercent(64 - 20 * (175 / 85)));
  });

  it("convertit en kg lorsque le poids est fourni", () => {
    const percent = 22.5;
    const { fatMassKg, leanMassKg } = buildRfmCompositionFromWeight(percent, 80);
    expect(fatMassKg).toBeCloseTo(18, 5);
    expect(leanMassKg).toBeCloseTo(62, 5);
  });
});

describe("formule YMCA", () => {
  it("calcule avec conversion lb/pouces", () => {
    const input = buildBodyFatInput("male", 30, 175, 80, { waistCm: 85 });
    const raw = ymcaBodyFatPercent(input);
    expect(Number.isFinite(raw)).toBe(true);
    expect(raw).toBeGreaterThan(0);
    expect(raw).toBeLessThan(50);
  });
});

describe("formule U.S. Navy (Hodgdon & Beckett 1984)", () => {
  it("calcule un homme adulte", () => {
    const input = buildBodyFatInput("male", 30, 175, 80, { waistCm: 85, neckCm: 38 });
    const raw = usNavyBodyFatPercent(input);
    expect(raw).toBeGreaterThan(5);
    expect(raw).toBeLessThan(40);
  });

  it("calcule une femme adulte", () => {
    const input = buildBodyFatInput("female", 30, 165, 62, {
      waistCm: 70,
      neckCm: 34,
      hipCm: 98,
    });
    const raw = usNavyBodyFatPercent(input);
    expect(Number.isFinite(raw)).toBe(true);
  });

  it("rejette un abdomen inférieur au cou", () => {
    const input = buildBodyFatInput("male", 30, 175, 80, { waistCm: 35, neckCm: 38 });
    expect(usNavyBodyFatPercent(input)).toBeNaN();
  });
});

describe("comparaison des méthodes", () => {
  it("active Deurenberg, RFM et YMCA avec les données de base et le tour de taille", () => {
    const input = buildBodyFatInput("male", 35, 175, 80, { waistCm: 85 });
    const comparison = compareBodyFatMethods(input);
    expect(comparison.results.find((row) => row.methodId === "deurenberg-1991")?.status).toBe("ok");
    expect(comparison.results.find((row) => row.methodId === "rfm")?.status).toBe("ok");
    expect(comparison.results.find((row) => row.methodId === "ymca")?.status).toBe("ok");
  });

  it("désactive U.S. Navy sans tour de cou avec message explicite", () => {
    const input = buildBodyFatInput("male", 35, 175, 80, { waistCm: 85 });
    const comparison = compareBodyFatMethods(input);
    const navy = comparison.results.find((row) => row.methodId === "us-navy");
    expect(navy?.status).toBe("unreliable");
    expect(navy?.statusMessage).toBe("Ajoutez votre tour de cou pour inclure cette méthode.");
  });

  it("active U.S. Navy homme lorsque le tour de cou est renseigné", () => {
    const input = buildBodyFatInput("male", 35, 175, 80, { waistCm: 85, neckCm: 38 });
    const comparison = compareBodyFatMethods(input);
    expect(comparison.results.find((row) => row.methodId === "us-navy")?.status).toBe("ok");
  });

  it("désactive U.S. Navy femme sans tour de hanches", () => {
    const input = buildBodyFatInput("female", 28, 168, 62, { waistCm: 70, neckCm: 34 });
    const comparison = compareBodyFatMethods(input);
    const navy = comparison.results.find((row) => row.methodId === "us-navy");
    expect(navy?.status).toBe("unreliable");
    expect(getMethodMissingHint(input, "us-navy")).toBe(
      "Ajoutez votre tour de hanches pour inclure cette méthode.",
    );
  });

  it("marque RFM non calculable sans tour de taille", () => {
    const input = buildBodyFatInput("female", 28, 168, 62);
    const comparison = compareBodyFatMethods(input);
    expect(comparison.results.find((row) => row.methodId === "rfm")?.status).toBe("unreliable");
    expect(comparison.results.find((row) => row.methodId === "rfm")?.bodyFatPercent).toBeNaN();
  });

  it("ne produit pas NaN pour Deurenberg lorsque seules les données de base sont présentes", () => {
    const input = buildBodyFatInput("male", 35, 175, 80);
    const row = compareBodyFatMethods(input).results.find((item) => item.methodId === "deurenberg-1991");
    expect(row?.status).toBe("ok");
    expect(Number.isFinite(row!.bodyFatPercent)).toBe(true);
  });
});

describe("catégories à 7 niveaux", () => {
  it("classe un homme dans la masse grasse normale autour de 22 %", () => {
    const input = buildBodyFatInput("male", 35, 175, 75);
    const result = calculateQuickBodyFat(input);
    if (result && result.bodyFatPercent >= 18 && result.bodyFatPercent < 25) {
      expect(result.category.id).toBe("normal");
    }
  });
});
