import { describe, expect, it } from "vitest";
import { parseDecimalInput } from "./parse-decimal";
import { parseNumericInRange, validateNumericInRange } from "./numeric-range";

describe("parseDecimalInput", () => {
  it("parse les décimales FR et ignore les espaces", () => {
    expect(parseDecimalInput(" 175,5 ")).toBe(175.5);
    expect(parseDecimalInput("70.5")).toBe(70.5);
  });

  it("rejette les valeurs non finies", () => {
    expect(parseDecimalInput("abc")).toBeNull();
    expect(parseDecimalInput("1e309")).toBeNull();
    expect(parseDecimalInput("")).toBeNull();
  });
});

describe("validateNumericInRange", () => {
  const range = { min: 10, max: 20 };
  const messages = {
    invalid: "Nombre invalide",
    outOfRange: (min: number, max: number) => `Entre ${min} et ${max}`,
  };

  it("valide une valeur dans les bornes", () => {
    expect(validateNumericInRange("15", range, messages)).toBeNull();
    expect(parseNumericInRange("15,5", range, messages)).toBe(15.5);
  });

  it("rejette une valeur hors bornes", () => {
    expect(validateNumericInRange("9", range, messages)).toBe("Entre 10 et 20");
  });
});
