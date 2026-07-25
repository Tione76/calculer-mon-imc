import { describe, expect, it } from "vitest";
import { calculateImc } from "./engine";
import {
  IMC_IDLE_ACCESSIBLE_SUMMARY,
  IMC_IDLE_INTERPRETATION,
  IMC_IDLE_METRICS_PRIMARY,
  IMC_IDLE_METRICS_SECONDARY,
} from "./gauge/interpretation";
import { resolveImcCalculatorResult } from "./resolve-imc-calculator-state";
import { validateHeightCm } from "./validation";

describe("resolveImcCalculatorResult — état initial et retour neutre", () => {
  it("reste neutre sans saisie", () => {
    expect(resolveImcCalculatorResult("", "", null, null)).toBeNull();
  });

  it("reste neutre si seule la taille est renseignée", () => {
    expect(resolveImcCalculatorResult("170", "", null, null)).toBeNull();
  });

  it("reste neutre si seul le poids est renseigné", () => {
    expect(resolveImcCalculatorResult("", "70", null, null)).toBeNull();
  });

  it("reste neutre si une valeur est invalide", () => {
    const heightError = validateHeightCm("99");
    expect(resolveImcCalculatorResult("99", "70", heightError, null)).toBeNull();
  });

  it("retourne un résultat lorsque les deux valeurs sont valides", () => {
    const result = resolveImcCalculatorResult("170", "70", null, null);
    expect(result).not.toBeNull();
    expect(result?.category.id).toBe("normal");
  });

  it("redevient neutre si une valeur devient invalide après calcul", () => {
    const valid = resolveImcCalculatorResult("170", "70", null, null);
    expect(valid).not.toBeNull();

    const heightError = validateHeightCm("99");
    expect(resolveImcCalculatorResult("99", "70", heightError, null)).toBeNull();
  });

  it("redevient neutre après réinitialisation", () => {
    const valid = resolveImcCalculatorResult("170", "70", null, null);
    expect(valid).toEqual(calculateImc({ heightCm: 170, weightKg: 70 }));
    expect(resolveImcCalculatorResult("", "", null, null)).toBeNull();
  });
});

describe("messages de l'état initial IMC", () => {
  it("expose les textes d'attente sobres", () => {
    expect(IMC_IDLE_METRICS_PRIMARY).toBe("Votre résultat s'affichera ici");
    expect(IMC_IDLE_METRICS_SECONDARY).toMatch(/Renseignez votre taille et votre poids/);
    expect(IMC_IDLE_INTERPRETATION).toMatch(/Saisissez vos mesures/);
    expect(IMC_IDLE_ACCESSIBLE_SUMMARY).toMatch(/Aucun résultat pour le moment/);
  });
});
