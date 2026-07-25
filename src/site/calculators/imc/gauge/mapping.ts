import { resolveImcCategory } from "../engine";
import { IMC_CATEGORIES } from "../config";
import type { ImcCategory, ImcCategoryId } from "../types";
import { IMC_GAUGE_BMI_MAX, IMC_GAUGE_BMI_MIN } from "./constants";

/** Amplitude angulaire fixe de chaque secteur (180° / 6). */
export const IMC_GAUGE_SEGMENT_DEGREES = 30;

/** Couleur d'accent pour le résultat (lisible sur fond blanc). */
export const IMC_GAUGE_ACCENT: Record<ImcCategoryId, string> = {
  underweight: "#3d73a3",
  normal: "#4d7d32",
  overweight: "#9a7200",
  obesity1: "#c45f1a",
  obesity2: "#c62828",
  obesity3: "#9b0000",
};
/** Couleurs plates : bande extérieure + bande intérieure (légèrement plus foncée). */
export const IMC_GAUGE_FILLS: Record<
  ImcCategoryId,
  { outer: string; inner: string; text: string }
> = {
  underweight: { outer: "#5b9bd5", inner: "#4a86ba", text: "#ffffff" },
  normal: { outer: "#70ad47", inner: "#5f9639", text: "#ffffff" },
  overweight: { outer: "#ffc000", inner: "#e6ad00", text: "#ffffff" },
  obesity1: { outer: "#ed7d31", inner: "#d66d27", text: "#ffffff" },
  obesity2: { outer: "#e53935", inner: "#c62828", text: "#ffffff" },
  obesity3: { outer: "#c00000", inner: "#9b0000", text: "#ffffff" },
};

/** Géométrie partagée avec le composant SVG (viewBox 500×310). */
export const IMC_GAUGE_GEOMETRY = {
  cx: 250,
  cy: 268,
  innerR: 98,
  outerR: 198,
  /** Séparation entre bande intérieure (intervalle) et extérieure (catégorie). */
  midR: 136,
  /** Marge avant le bord intérieur coloré (aiguille dans la zone blanche). */
  needleGap: 12,
} as const;

export interface ImcGaugeSegment {
  id: ImcCategoryId;
  label: string;
  titleLines: string[];
  rangeLines: string[];
  visualMin: number;
  visualMax: number;
  startAngle: number;
  endAngle: number;
  midAngle: number;
  fillOuter: string;
  fillInner: string;
  textColor: string;
}

export interface NeedleGeometry {
  tipX: number;
  tipY: number;
  leftX: number;
  leftY: number;
  rightX: number;
  rightY: number;
  angle: number;
}

export function clampGaugeBmi(bmi: number): number {
  if (!Number.isFinite(bmi)) return NaN;
  return Math.min(IMC_GAUGE_BMI_MAX, Math.max(IMC_GAUGE_BMI_MIN, bmi));
}

/** Borne visuelle pour l'interpolation de l'aiguille (sans modifier la classification). */
export function getSegmentVisualRange(category: ImcCategory): { visualMin: number; visualMax: number } {
  if (category.id === "underweight") {
    return { visualMin: IMC_GAUGE_BMI_MIN, visualMax: category.max! };
  }
  if (category.max === null) {
    return { visualMin: category.min, visualMax: IMC_GAUGE_BMI_MAX };
  }
  return { visualMin: category.min, visualMax: category.max };
}

/** Libellés MAJUSCULES dans la bande extérieure. */
export function getGaugeZoneTitleLines(category: ImcCategory): string[] {
  switch (category.id) {
    case "underweight":
      return ["MAIGREUR"];
    case "normal":
      return ["NORMAL"];
    case "overweight":
      return ["SURPOIDS"];
    case "obesity1":
      return ["OBÉSITÉ", "MODÉRÉE"];
    case "obesity2":
      return ["OBÉSITÉ", "SÉVÈRE"];
    case "obesity3":
      return ["OBÉSITÉ", "MASSIVE"];
    default:
      return [category.shortLabel.toUpperCase()];
  }
}

/** Intervalles dans la bande intérieure (lignes séparées pour les extrémités). */
export function getGaugeZoneRangeLines(category: ImcCategory): string[] {
  switch (category.id) {
    case "underweight":
      return ["IMC", "< 18,5"];
    case "normal":
      return ["18,5 À 24,9"];
    case "overweight":
      return ["25 À 29,9"];
    case "obesity1":
      return ["30 À 34,9"];
    case "obesity2":
      return ["35 À 39,9"];
    case "obesity3":
      return ["IMC", "≥ 40"];
    default:
      return [category.shortLabel.toUpperCase()];
  }
}

/** Libellé court sous la valeur IMC (terminologie alignée sur la roue). */
export function getGaugeResultCategoryLabel(categoryId: ImcCategoryId): string {
  switch (categoryId) {
    case "underweight":
      return "Maigreur";
    case "normal":
      return "Normal";
    case "overweight":
      return "Surpoids";
    case "obesity1":
      return "Obésité modérée (classe I)";
    case "obesity2":
      return "Obésité sévère (classe II)";
    case "obesity3":
      return "Obésité massive (classe III)";
    default:
      return getCategoryByIdSafe(categoryId).label;
  }
}

function getCategoryByIdSafe(id: ImcCategoryId): ImcCategory {
  return IMC_CATEGORIES.find((c) => c.id === id) ?? IMC_CATEGORIES[0];
}

export function getSegmentIndexForBmi(bmi: number): number {
  const category = resolveImcCategory(bmi);
  return IMC_CATEGORIES.findIndex((entry) => entry.id === category.id);
}

export function getGaugeSegmentForBmi(bmi: number): ImcGaugeSegment {
  const segments = buildImcGaugeSegments();
  const index = getSegmentIndexForBmi(bmi);
  return segments[index] ?? segments[0];
}

/** Six secteurs visuellement égaux (30° chacun), indépendamment de l'amplitude médicale. */
export function buildImcGaugeSegments(): ImcGaugeSegment[] {
  return IMC_CATEGORIES.map((category, index) => {
    const startAngle = 180 - index * IMC_GAUGE_SEGMENT_DEGREES;
    const endAngle = startAngle - IMC_GAUGE_SEGMENT_DEGREES;
    const { visualMin, visualMax } = getSegmentVisualRange(category);
    const colors = IMC_GAUGE_FILLS[category.id];

    return {
      id: category.id,
      label: category.label,
      titleLines: getGaugeZoneTitleLines(category),
      rangeLines: getGaugeZoneRangeLines(category),
      visualMin,
      visualMax,
      startAngle,
      endAngle,
      midAngle: (startAngle + endAngle) / 2,
      fillOuter: colors.outer,
      fillInner: colors.inner,
      textColor: colors.text,
    };
  });
}

/** Progression locale dans le secteur visuel de la catégorie médicale réelle. */
export function getLocalProgressInSegment(bmi: number, segment: ImcGaugeSegment): number {
  const clampedValue = Math.min(segment.visualMax, Math.max(segment.visualMin, bmi));
  const span = segment.visualMax - segment.visualMin;
  if (span <= 0) return 0;
  return (clampedValue - segment.visualMin) / span;
}

/**
 * Angle de l'aiguille : interpolation locale dans le secteur égal de la catégorie.
 * 180° = gauche (MAIGREUR), 0° = droite (OBÉSITÉ MASSIVE).
 */
export function bmiToNeedleAngleDegrees(bmi: number): number {
  if (!Number.isFinite(bmi)) return NaN;
  const segment = getGaugeSegmentForBmi(bmi);
  const localProgress = getLocalProgressInSegment(bmi, segment);
  return segment.startAngle + localProgress * (segment.endAngle - segment.startAngle);
}

export function computeNeedleLength(
  innerRadius = IMC_GAUGE_GEOMETRY.innerR,
  gap = IMC_GAUGE_GEOMETRY.needleGap,
): number {
  return innerRadius - gap;
}

export function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleDegrees: number,
): { x: number; y: number } {
  const radians = (angleDegrees * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(radians),
    y: cy - radius * Math.sin(radians),
  };
}

export function describeArcPath(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
): string {
  const start = polarToCartesian(cx, cy, radius, startAngle);
  const end = polarToCartesian(cx, cy, radius, endAngle);
  const sweep = startAngle - endAngle;
  const largeArc = sweep > 180 ? 1 : 0;
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

export function describeDonutSegment(
  cx: number,
  cy: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
): string {
  const outerStart = polarToCartesian(cx, cy, outerRadius, startAngle);
  const outerEnd = polarToCartesian(cx, cy, outerRadius, endAngle);
  const innerEnd = polarToCartesian(cx, cy, innerRadius, endAngle);
  const innerStart = polarToCartesian(cx, cy, innerRadius, startAngle);
  const sweep = startAngle - endAngle;
  const largeArc = sweep > 180 ? 1 : 0;

  return [
    `M ${outerStart.x.toFixed(2)} ${outerStart.y.toFixed(2)}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEnd.x.toFixed(2)} ${outerEnd.y.toFixed(2)}`,
    `L ${innerEnd.x.toFixed(2)} ${innerEnd.y.toFixed(2)}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerStart.x.toFixed(2)} ${innerStart.y.toFixed(2)}`,
    "Z",
  ].join(" ");
}

/** Aiguille triangulaire isocèle partant du pivot (forme de référence). */
export function computeNeedleGeometry(
  cx: number,
  cy: number,
  angleDegrees: number,
  length: number,
): NeedleGeometry {
  const radians = (angleDegrees * Math.PI) / 180;
  const tipX = cx + length * Math.cos(radians);
  const tipY = cy - length * Math.sin(radians);

  const perp = radians + Math.PI / 2;
  const halfBase = 9;
  const leftX = cx + halfBase * Math.cos(perp);
  const leftY = cy - halfBase * Math.sin(perp);
  const rightX = cx - halfBase * Math.cos(perp);
  const rightY = cy + halfBase * Math.sin(perp);

  return {
    tipX,
    tipY,
    leftX,
    leftY,
    rightX,
    rightY,
    angle: angleDegrees,
  };
}

export function needleSvgRotation(angleDegrees: number): number {
  return 90 - angleDegrees;
}

export function needleAngleMatchesCategory(bmi: number, categoryId: ImcCategoryId): boolean {
  const angle = bmiToNeedleAngleDegrees(bmi);
  const segment = buildImcGaugeSegments().find((entry) => entry.id === categoryId);
  if (!segment || !Number.isFinite(angle)) return false;
  const minAngle = Math.min(segment.startAngle, segment.endAngle);
  const maxAngle = Math.max(segment.startAngle, segment.endAngle);
  return angle >= minAngle - 1e-9 && angle <= maxAngle + 1e-9;
}

export function needleTipIsLeftOfCenter(
  bmi: number,
  cx = IMC_GAUGE_GEOMETRY.cx,
): boolean {
  const needle = computeNeedleGeometry(
    cx,
    IMC_GAUGE_GEOMETRY.cy,
    bmiToNeedleAngleDegrees(bmi),
    computeNeedleLength(),
  );
  return needle.tipX < cx - 1;
}

export function needleTipIsRightOfCenter(
  bmi: number,
  cx = IMC_GAUGE_GEOMETRY.cx,
): boolean {
  const needle = computeNeedleGeometry(
    cx,
    IMC_GAUGE_GEOMETRY.cy,
    bmiToNeedleAngleDegrees(bmi),
    computeNeedleLength(),
  );
  return needle.tipX > cx + 1;
}

export function needleStaysInsideWhiteZone(
  innerRadius = IMC_GAUGE_GEOMETRY.innerR,
  gap = IMC_GAUGE_GEOMETRY.needleGap,
): boolean {
  return computeNeedleLength(innerRadius, gap) < innerRadius;
}

export function getActiveSegmentAccent(categoryId: ImcCategoryId): string {
  return IMC_GAUGE_ACCENT[categoryId];
}

export function getActiveSegmentFill(categoryId: ImcCategoryId): string {
  return IMC_GAUGE_FILLS[categoryId].outer;
}

export function getLabelRadii(): { outerTitleR: number; innerRangeR: number } {
  const { innerR, outerR, midR } = IMC_GAUGE_GEOMETRY;
  return {
    outerTitleR: (midR + outerR) / 2,
    innerRangeR: (innerR + midR) / 2,
  };
}
