import { BODY_FAT_CATEGORIES_BY_SEX } from "../categories";
import type { BodyFatCategory, BodyFatCategoryId, BodyFatSex } from "../types";
import {
  BODY_FAT_GAUGE_PERCENT_MAX_FEMALE,
  BODY_FAT_GAUGE_PERCENT_MAX_MALE,
  BODY_FAT_GAUGE_PERCENT_MIN,
  BODY_FAT_GAUGE_SEGMENT_DEGREES,
} from "./constants";
import {
  IMC_GAUGE_GEOMETRY,
  computeNeedleGeometry,
  computeNeedleLength,
  describeArcPath,
  describeDonutSegment,
  polarToCartesian,
} from "../../imc/gauge/mapping";
import { resolveBodyFatCategory } from "../categories";

export {
  IMC_GAUGE_GEOMETRY as BODY_FAT_GAUGE_GEOMETRY,
  computeNeedleGeometry,
  computeNeedleLength,
  describeArcPath,
  describeDonutSegment,
  polarToCartesian,
};

export const BODY_FAT_GAUGE_ACCENT: Record<BodyFatCategoryId, string> = {
  essential: "#3d73a3",
  very_athletic: "#0891b2",
  athletic: "#0d9488",
  fitness: "#4d7d32",
  normal: "#70ad47",
  elevated: "#c45f1a",
  very_elevated: "#c62828",
};

export const BODY_FAT_GAUGE_FILLS: Record<
  BodyFatCategoryId,
  { outer: string; inner: string; text: string }
> = {
  essential: { outer: "#5b9bd5", inner: "#4a86ba", text: "#ffffff" },
  very_athletic: { outer: "#06b6d4", inner: "#0891b2", text: "#ffffff" },
  athletic: { outer: "#14b8a6", inner: "#0d9488", text: "#ffffff" },
  fitness: { outer: "#84cc16", inner: "#65a30d", text: "#ffffff" },
  normal: { outer: "#70ad47", inner: "#5f9639", text: "#ffffff" },
  elevated: { outer: "#ed7d31", inner: "#d66d27", text: "#ffffff" },
  very_elevated: { outer: "#e53935", inner: "#c62828", text: "#ffffff" },
};

export interface BodyFatGaugeSegment {
  id: BodyFatCategoryId;
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

function gaugeMaxForSex(sex: BodyFatSex): number {
  return sex === "male" ? BODY_FAT_GAUGE_PERCENT_MAX_MALE : BODY_FAT_GAUGE_PERCENT_MAX_FEMALE;
}

function getSegmentVisualRange(category: BodyFatCategory, sex: BodyFatSex): {
  visualMin: number;
  visualMax: number;
} {
  if (category.id === "essential") {
    return { visualMin: BODY_FAT_GAUGE_PERCENT_MIN, visualMax: category.max! };
  }
  if (category.max === null) {
    return { visualMin: category.min, visualMax: gaugeMaxForSex(sex) };
  }
  return { visualMin: category.min, visualMax: category.max };
}

export function getGaugeZoneTitleLines(category: BodyFatCategory): string[] {
  return category.gaugeTitleLines;
}

export function getGaugeZoneRangeLines(category: BodyFatCategory): string[] {
  if (category.max === null) {
    return [`≥ ${category.min} %`];
  }
  const upper = Math.round((category.max - 0.1) * 10) / 10;
  return [`${category.min} À ${upper} %`];
}

export function buildBodyFatGaugeSegments(sex: BodyFatSex): BodyFatGaugeSegment[] {
  return BODY_FAT_CATEGORIES_BY_SEX[sex].map((category, index) => {
    const startAngle = 180 - index * BODY_FAT_GAUGE_SEGMENT_DEGREES;
    const endAngle = startAngle - BODY_FAT_GAUGE_SEGMENT_DEGREES;
    const { visualMin, visualMax } = getSegmentVisualRange(category, sex);
    const colors = BODY_FAT_GAUGE_FILLS[category.id];

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

export function getGaugeSegmentForPercent(
  bodyFatPercent: number,
  sex: BodyFatSex,
): BodyFatGaugeSegment {
  const category = resolveBodyFatCategory(bodyFatPercent, sex);
  return buildBodyFatGaugeSegments(sex).find((segment) => segment.id === category.id)!;
}

function getLocalProgressInSegment(bodyFatPercent: number, segment: BodyFatGaugeSegment): number {
  const clamped = Math.min(segment.visualMax, Math.max(segment.visualMin, bodyFatPercent));
  const span = segment.visualMax - segment.visualMin;
  if (span <= 0) return 0;
  return (clamped - segment.visualMin) / span;
}

export function bodyFatToNeedleAngleDegrees(bodyFatPercent: number, sex: BodyFatSex): number {
  if (!Number.isFinite(bodyFatPercent)) return NaN;
  const segment = getGaugeSegmentForPercent(bodyFatPercent, sex);
  const localProgress = getLocalProgressInSegment(bodyFatPercent, segment);
  return segment.startAngle + localProgress * (segment.endAngle - segment.startAngle);
}

export function getActiveSegmentAccent(categoryId: BodyFatCategoryId): string {
  return BODY_FAT_GAUGE_ACCENT[categoryId];
}

export function getLabelRadii(): { outerTitleR: number; innerRangeR: number } {
  const { innerR, outerR, midR } = IMC_GAUGE_GEOMETRY;
  return {
    outerTitleR: (midR + outerR) / 2,
    innerRangeR: (innerR + midR) / 2,
  };
}

export function clampGaugePercent(bodyFatPercent: number, sex: BodyFatSex): number {
  return Math.min(gaugeMaxForSex(sex), Math.max(BODY_FAT_GAUGE_PERCENT_MIN, bodyFatPercent));
}
