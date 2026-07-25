import { describe, expect, it } from "vitest";
import { resolveImcCategory } from "../engine";
import {
  bmiToNeedleAngleDegrees,
  buildImcGaugeSegments,
  clampGaugeBmi,
  computeNeedleGeometry,
  computeNeedleLength,
  getGaugeSegmentForBmi,
  getLocalProgressInSegment,
  getSegmentVisualRange,
  IMC_GAUGE_GEOMETRY,
  IMC_GAUGE_SEGMENT_DEGREES,
  needleAngleMatchesCategory,
  needleStaysInsideWhiteZone,
  needleSvgRotation,
  needleTipIsLeftOfCenter,
  needleTipIsRightOfCenter,
} from "./mapping";
import { IMC_CATEGORIES } from "../config";

function expectAngleNear(actual: number, expected: number, precision = 1) {
  expect(actual).toBeCloseTo(expected, precision);
}

describe("mapping jauge IMC — secteurs égaux", () => {
  it("attribue exactement 30° à chaque secteur", () => {
    const segments = buildImcGaugeSegments();
    expect(segments).toHaveLength(6);
    for (const segment of segments) {
      expect(segment.startAngle - segment.endAngle).toBeCloseTo(IMC_GAUGE_SEGMENT_DEGREES, 5);
    }
  });

  it("couvre l'arc de 180° sans trou entre les secteurs", () => {
    const segments = buildImcGaugeSegments();
    expect(segments[0].startAngle).toBe(180);
    expect(segments.at(-1)?.endAngle).toBe(0);
    for (let i = 1; i < segments.length; i += 1) {
      expect(segments[i].startAngle).toBeCloseTo(segments[i - 1].endAngle, 5);
    }
  });

  it("conserve les bornes visuelles pour l'interpolation de l'aiguille", () => {
    const segments = buildImcGaugeSegments();
    expect(segments[0]).toMatchObject({
      id: "underweight",
      visualMin: 10,
      visualMax: 18.5,
      startAngle: 180,
      endAngle: 150,
    });
    expect(segments[1]).toMatchObject({
      id: "normal",
      visualMin: 18.5,
      visualMax: 25,
      startAngle: 150,
      endAngle: 120,
    });
    expect(segments[5]).toMatchObject({
      id: "obesity3",
      visualMin: 40,
      visualMax: 50,
      startAngle: 30,
      endAngle: 0,
    });
  });

  it("expose les libellés MAIGREUR, NORMAL et intervalles revus", () => {
    const segments = buildImcGaugeSegments();
    expect(segments.find((s) => s.id === "underweight")?.titleLines).toEqual(["MAIGREUR"]);
    expect(segments.find((s) => s.id === "normal")?.titleLines).toEqual(["NORMAL"]);
    expect(segments.find((s) => s.id === "underweight")?.rangeLines).toEqual(["IMC", "< 18,5"]);
    expect(segments.find((s) => s.id === "normal")?.rangeLines).toEqual(["18,5 À 24,9"]);
    expect(segments.find((s) => s.id === "obesity3")?.rangeLines).toEqual(["IMC", "≥ 40"]);
  });

  it("dérive les bornes visuelles depuis IMC_CATEGORIES", () => {
    for (const category of IMC_CATEGORIES) {
      const range = getSegmentVisualRange(category);
      if (category.id === "underweight") {
        expect(range).toEqual({ visualMin: 10, visualMax: 18.5 });
      } else if (category.max === null) {
        expect(range).toEqual({ visualMin: category.min, visualMax: 50 });
      } else {
        expect(range).toEqual({ visualMin: category.min, visualMax: category.max });
      }
    }
  });
});

describe("mapping jauge IMC — interpolation locale de l'aiguille", () => {
  it("clamp visuel aux extrémités 10 et 50", () => {
    expect(clampGaugeBmi(5)).toBe(10);
    expect(clampGaugeBmi(55)).toBe(50);
    expectAngleNear(bmiToNeedleAngleDegrees(5), 180);
    expectAngleNear(bmiToNeedleAngleDegrees(55), 0);
    expect(needleAngleMatchesCategory(5, "underweight")).toBe(true);
    expect(needleAngleMatchesCategory(55, "obesity3")).toBe(true);
  });

  describe("Maigreur (10 → 18,5)", () => {
    it.each([
      { bmi: 10, angle: 180 },
      { bmi: 14, angle: 165.88 },
      { bmi: 18.4, angle: 150.35 },
    ])("IMC $bmi → $angle°", ({ bmi, angle }) => {
      expect(resolveImcCategory(bmi).id).toBe("underweight");
      expectAngleNear(bmiToNeedleAngleDegrees(bmi), angle, 1);
      expect(needleAngleMatchesCategory(bmi, "underweight")).toBe(true);
    });
  });

  describe("Normal (18,5 → 25)", () => {
    it.each([
      { bmi: 18.5, angle: 150 },
      { bmi: 21.75, angle: 135 },
      { bmi: 24.9, angle: 120.46 },
    ])("IMC $bmi → $angle°", ({ bmi, angle }) => {
      expect(resolveImcCategory(bmi).id).toBe("normal");
      expectAngleNear(bmiToNeedleAngleDegrees(bmi), angle, 1);
      expect(needleAngleMatchesCategory(bmi, "normal")).toBe(true);
    });
  });

  describe("Surpoids (25 → 30)", () => {
    it.each([
      { bmi: 25, angle: 120 },
      { bmi: 27.5, angle: 105 },
      { bmi: 29.9, angle: 90.6 },
    ])("IMC $bmi → $angle°", ({ bmi, angle }) => {
      expect(resolveImcCategory(bmi).id).toBe("overweight");
      expectAngleNear(bmiToNeedleAngleDegrees(bmi), angle, 1);
      expect(needleAngleMatchesCategory(bmi, "overweight")).toBe(true);
    });
  });

  describe("Obésité modérée (30 → 35)", () => {
    it.each([
      { bmi: 30, angle: 90 },
      { bmi: 32.5, angle: 75 },
      { bmi: 34.9, angle: 60.6 },
    ])("IMC $bmi → $angle°", ({ bmi, angle }) => {
      expect(resolveImcCategory(bmi).id).toBe("obesity1");
      expectAngleNear(bmiToNeedleAngleDegrees(bmi), angle, 1);
      expect(needleAngleMatchesCategory(bmi, "obesity1")).toBe(true);
    });
  });

  describe("Obésité sévère (35 → 40)", () => {
    it.each([
      { bmi: 35, angle: 60 },
      { bmi: 37.5, angle: 45 },
      { bmi: 39.9, angle: 30.6 },
    ])("IMC $bmi → $angle°", ({ bmi, angle }) => {
      expect(resolveImcCategory(bmi).id).toBe("obesity2");
      expectAngleNear(bmiToNeedleAngleDegrees(bmi), angle, 1);
      expect(needleAngleMatchesCategory(bmi, "obesity2")).toBe(true);
    });
  });

  describe("Obésité massive (40 → 50)", () => {
    it.each([
      { bmi: 40, angle: 30 },
      { bmi: 45, angle: 15 },
      { bmi: 50, angle: 0 },
    ])("IMC $bmi → $angle°", ({ bmi, angle }) => {
      expect(resolveImcCategory(bmi).id).toBe("obesity3");
      expectAngleNear(bmiToNeedleAngleDegrees(bmi), angle, 1);
      expect(needleAngleMatchesCategory(bmi, "obesity3")).toBe(true);
    });
  });

  it("place 17,3 dans MAIGREUR et 34,6 près de la fin d'OBÉSITÉ MODÉRÉE", () => {
    expect(resolveImcCategory(17.3).id).toBe("underweight");
    expect(needleTipIsLeftOfCenter(17.3)).toBe(true);
    expectAngleNear(bmiToNeedleAngleDegrees(17.3), 154.24, 1);

    const segment = getGaugeSegmentForBmi(34.6);
    expect(segment.id).toBe("obesity1");
    expect(getLocalProgressInSegment(34.6, segment)).toBeCloseTo(0.92, 2);
    expectAngleNear(bmiToNeedleAngleDegrees(34.6), 62.4, 1);
    expect(needleAngleMatchesCategory(34.6, "obesity1")).toBe(true);
  });

  it("produit un passage net entre deux secteurs adjacents aux seuils", () => {
    expectAngleNear(bmiToNeedleAngleDegrees(18.4), 150.35, 1);
    expectAngleNear(bmiToNeedleAngleDegrees(18.5), 150, 1);
    expectAngleNear(bmiToNeedleAngleDegrees(24.9), 120.46, 1);
    expectAngleNear(bmiToNeedleAngleDegrees(25), 120, 1);
    expectAngleNear(bmiToNeedleAngleDegrees(39.9), 30.6, 1);
    expectAngleNear(bmiToNeedleAngleDegrees(40), 30, 1);
  });

  it("oriente l'aiguille à gauche pour un IMC faible et à droite pour un IMC élevé", () => {
    expect(needleTipIsLeftOfCenter(17.3)).toBe(true);
    expect(needleTipIsRightOfCenter(45)).toBe(true);
    expect(needleTipIsRightOfCenter(37)).toBe(true);
  });

  it("garde l'aiguille dans la zone blanche", () => {
    expect(needleStaysInsideWhiteZone()).toBe(true);
    expect(computeNeedleLength()).toBe(IMC_GAUGE_GEOMETRY.innerR - IMC_GAUGE_GEOMETRY.needleGap);
    const needle = computeNeedleGeometry(
      IMC_GAUGE_GEOMETRY.cx,
      IMC_GAUGE_GEOMETRY.cy,
      bmiToNeedleAngleDegrees(17.3),
      computeNeedleLength(),
    );
    const dist = Math.hypot(needle.tipX - IMC_GAUGE_GEOMETRY.cx, needle.tipY - IMC_GAUGE_GEOMETRY.cy);
    expect(dist).toBeLessThan(IMC_GAUGE_GEOMETRY.innerR);
  });

  it("calcule la rotation SVG (90 - angle)", () => {
    expect(needleSvgRotation(90)).toBe(0);
    expect(needleSvgRotation(180)).toBe(-90);
    expect(needleSvgRotation(0)).toBe(90);
  });

  it("ne produit jamais NaN pour des entrées valides", () => {
    for (const bmi of [10, 18.5, 25, 30, 35, 40, 50, 999]) {
      expect(Number.isFinite(bmiToNeedleAngleDegrees(bmi))).toBe(true);
    }
  });
});

describe("cohérence moteur ↔ jauge — cas visuels", () => {
  const visualCases = [
    { heightCm: 170, weightKg: 50, category: "underweight" },
    { heightCm: 170, weightKg: 70, category: "normal" },
    { heightCm: 170, weightKg: 80, category: "overweight" },
    { heightCm: 170, weightKg: 100, category: "obesity1" },
    { heightCm: 170, weightKg: 120, category: "obesity3" },
    { heightCm: 170, weightKg: 145, category: "obesity3" },
  ] as const;

  it.each(visualCases)(
    "$weightKg kg / $heightCm cm → zone $category",
    ({ heightCm, weightKg, category }) => {
      const bmi = weightKg / (heightCm / 100) ** 2;
      expect(resolveImcCategory(bmi).id).toBe(category);
      expect(needleAngleMatchesCategory(bmi, category)).toBe(true);
    },
  );
});
