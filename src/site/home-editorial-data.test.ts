import { describe, expect, it } from "vitest";
import { calculateImc } from "@/site/imc-calculator";
import {
  exampleImc165_50,
  exampleImc170_70,
  exampleImc180_90,
} from "./home-editorial-data";

describe("home-editorial-data", () => {
  it("aligne les exemples pédagogiques sur le moteur IMC", () => {
    const ex1 = exampleImc170_70();
    const r1 = calculateImc({ heightCm: ex1.heightCm, weightKg: ex1.weightKg });
    expect(Math.round(r1.bmi * 10) / 10).toBe(ex1.bmi);
    expect(r1.category.id).toBe("normal");
    expect(ex1.category).toBe("Corpulence normale");

    const ex2 = exampleImc180_90();
    const r2 = calculateImc({ heightCm: ex2.heightCm, weightKg: ex2.weightKg });
    expect(Math.round(r2.bmi * 10) / 10).toBe(ex2.bmi);
    expect(r2.category.id).toBe("overweight");
    expect(ex2.category).toBe("Surpoids");

    const ex3 = exampleImc165_50();
    const r3 = calculateImc({ heightCm: ex3.heightCm, weightKg: ex3.weightKg });
    expect(Math.round(r3.bmi * 10) / 10).toBe(ex3.bmi);
    expect(r3.category.id).toBe("underweight");
    expect(ex3.category).toBe("Insuffisance pondérale");
  });
});
