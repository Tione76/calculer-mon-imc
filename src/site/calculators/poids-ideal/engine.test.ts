import { describe, expect, it } from "vitest";
import { cmToInches, inchesOverFiveFeet } from "./conversions";
import { roundIdealWeightKg, formatIdealWeightKg } from "./format";
import {
  calculateIdealWeightMethod,
  compareIdealWeightMethods,
} from "./engine";
import { IDEAL_WEIGHT_METHODS_BY_ID } from "./methods";

describe("conversions poids idéal", () => {
  it("convertit cm en pouces sans arrondi intermédiaire", () => {
    expect(cmToInches(152.4)).toBeCloseTo(60, 10);
    expect(cmToInches(170)).toBeCloseTo(66.929133858, 8);
  });

  it("calcule les pouces au-delà de 5 pieds", () => {
    expect(inchesOverFiveFeet(152.4)).toBeCloseTo(0, 10);
    expect(inchesOverFiveFeet(170)).toBeCloseTo(6.929133858, 8);
    expect(inchesOverFiveFeet(150)).toBeLessThan(0);
  });
});

describe("formule Lorentz", () => {
  it("calcule homme 170 cm", () => {
    const result = calculateIdealWeightMethod("lorentz", "male", 170);
    expect(result.weightKgRaw).toBe(65);
    expect(result.weightKg).toBe(65);
  });

  it("calcule femme 170 cm", () => {
    const result = calculateIdealWeightMethod("lorentz", "female", 170);
    expect(result.weightKgRaw).toBe(62);
    expect(result.weightKg).toBe(62);
  });
});

describe("formules cliniques en pouces", () => {
  it("Devine homme 170 cm", () => {
    const raw = 50 + 2.3 * (170 / 2.54 - 60);
    const result = calculateIdealWeightMethod("devine", "male", 170);
    expect(result.weightKgRaw).toBeCloseTo(raw, 10);
    expect(result.weightKg).toBe(65.9);
  });

  it("Devine femme 160 cm", () => {
    const raw = 45.5 + 2.3 * (160 / 2.54 - 60);
    const result = calculateIdealWeightMethod("devine", "female", 160);
    expect(result.weightKgRaw).toBeCloseTo(raw, 10);
  });

  it("Miller homme 180 cm", () => {
    const raw = 56.2 + 1.41 * (180 / 2.54 - 60);
    expect(calculateIdealWeightMethod("miller", "male", 180).weightKgRaw).toBeCloseTo(raw, 10);
  });

  it("Robinson femme 160 cm", () => {
    const raw = 49 + 1.7 * (160 / 2.54 - 60);
    expect(calculateIdealWeightMethod("robinson", "female", 160).weightKgRaw).toBeCloseTo(raw, 10);
  });

  it("Hamwi homme 200 cm", () => {
    const raw = 48 + 2.7 * (200 / 2.54 - 60);
    expect(calculateIdealWeightMethod("hamwi", "male", 200).weightKgRaw).toBeCloseTo(raw, 10);
  });
});

describe("formule Broca", () => {
  it("applique T − 100 pour homme", () => {
    expect(calculateIdealWeightMethod("broca", "male", 175).weightKgRaw).toBe(75);
  });

  it("applique variante × 0,9 pour femme", () => {
    expect(calculateIdealWeightMethod("broca", "female", 175).weightKgRaw).toBe(67.5);
  });
});

describe("arrondi et affichage", () => {
  it("arrondit uniquement le résultat final à une décimale", () => {
    expect(roundIdealWeightKg(68.437192)).toBe(68.4);
    expect(formatIdealWeightKg(68.437192)).toBe("68,4 kg");
  });
});

describe("comparaison multi-méthodes", () => {
  it("retourne six méthodes dans l'ordre stable", () => {
    const comparison = compareIdealWeightMethods("male", 170);
    expect(comparison.results.map((result) => result.methodId)).toEqual([
      "lorentz",
      "devine",
      "miller",
      "robinson",
      "hamwi",
      "broca",
    ]);
  });

  it("aligne le mode rapide et le mode comparatif", () => {
    const comparison = compareIdealWeightMethods("female", 168);
    for (const row of comparison.results) {
      const single = calculateIdealWeightMethod(row.methodId, "female", 168);
      expect(single.weightKg).toBe(row.weightKg);
      expect(single.weightKgRaw).toBe(row.weightKgRaw);
    }
  });

  it("calcule min, max et dispersion", () => {
    const comparison = compareIdealWeightMethods("male", 175);
    const values = comparison.results.filter((r) => r.status === "ok").map((r) => r.weightKg);
    expect(comparison.summary.minKg).toBe(Math.min(...values));
    expect(comparison.summary.maxKg).toBe(Math.max(...values));
    expect(comparison.summary.spreadKg).toBe(
      roundIdealWeightKg(comparison.summary.maxKg - comparison.summary.minKg),
    );
  });

  it("gère la taille exacte 152,4 cm", () => {
    const devine = calculateIdealWeightMethod("devine", "male", 152.4);
    expect(devine.weightKgRaw).toBe(50);
    expect(devine.status).toBe("ok");
  });

  it("gère une taille décimale", () => {
    const result = calculateIdealWeightMethod("lorentz", "male", 175.5);
    expect(Number.isFinite(result.weightKgRaw)).toBe(true);
  });

  it("signale une estimation peu fiable aux bornes basses", () => {
    const result = calculateIdealWeightMethod("devine", "female", 100);
    expect(result.status).toBe("unreliable");
  });
});

describe("cohérence des métadonnées", () => {
  it("expose une formule par méthode", () => {
    for (const id of ["lorentz", "devine", "miller", "robinson", "hamwi", "broca"] as const) {
      const method = IDEAL_WEIGHT_METHODS_BY_ID[id];
      expect(method.calculate("male", 170)).toBeGreaterThan(0);
      expect(method.formulaLabelMale.length).toBeGreaterThan(5);
    }
  });
});
