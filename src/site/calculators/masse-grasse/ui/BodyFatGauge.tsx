"use client";

import Link from "next/link";
import { useId, useMemo } from "react";
import type { BodyFatCategory, BodyFatSex } from "../types";
import {
  BODY_FAT_IDLE_ACCESSIBLE_SUMMARY,
  BODY_FAT_IDLE_INTERPRETATION,
  BODY_FAT_IDLE_METRICS_PRIMARY,
  BODY_FAT_IDLE_METRICS_SECONDARY,
  BODY_FAT_LIMITS_GUIDE,
  BODY_FAT_LIMITS_SUMMARY,
  buildBodyFatAccessibleSummary,
  getBodyFatInterpretationSentence,
} from "../gauge/interpretation";
import {
  bodyFatToNeedleAngleDegrees,
  buildBodyFatGaugeSegments,
  computeNeedleGeometry,
  computeNeedleLength,
  describeArcPath,
  describeDonutSegment,
  getActiveSegmentAccent,
  getGaugeZoneTitleLines,
  BODY_FAT_GAUGE_GEOMETRY,
  getLabelRadii,
} from "../gauge/mapping";
import { formatBodyFatPercent } from "../format";
import { useAnimatedNeedleAngle } from "../../imc/ui/useAnimatedNeedleAngle";
import "../../imc/ui/imc-gauge.css";

const { cx: CX, cy: CY, innerR: INNER_R, outerR: OUTER_R, midR: MID_R } = BODY_FAT_GAUGE_GEOMETRY;
const VIEWBOX = "0 0 500 310";
const NEEDLE_LENGTH = computeNeedleLength();
const BASE_X = 48;
const BASE_WIDTH = 404;
const BASE_HEIGHT = 30;
const LABEL_LINE_OFFSET = 10;
const NEEDLE_IDLE_ANGLE = 180;

export interface BodyFatGaugeResult {
  bodyFatPercent: number;
  category: BodyFatCategory;
  sex: BodyFatSex;
}

export interface BodyFatGaugeProps {
  result: BodyFatGaugeResult | null;
  hideSummaryWhenResult?: boolean;
}

function ZoneLabels({
  segment,
  isActive,
  pathId,
}: {
  segment: ReturnType<typeof buildBodyFatGaugeSegments>[number];
  isActive: boolean;
  pathId: string;
}) {
  const { outerTitleR, innerRangeR } = getLabelRadii();
  const outerPath = describeArcPath(CX, CY, outerTitleR, segment.startAngle, segment.endAngle);
  const innerPath = describeArcPath(CX, CY, innerRangeR, segment.startAngle, segment.endAngle);
  const [titleLine1, titleLine2] =
    segment.titleLines.length > 1
      ? [segment.titleLines[0], segment.titleLines[1]]
      : [segment.titleLines[0], null];
  const outerPathLine2 = titleLine2
    ? describeArcPath(CX, CY, outerTitleR - 12, segment.startAngle, segment.endAngle)
    : null;
  const [rangeLine1, rangeLine2] =
    segment.rangeLines.length > 1
      ? [segment.rangeLines[0], segment.rangeLines[1]]
      : [segment.rangeLines[0], null];
  const innerPathLine2 = rangeLine2
    ? describeArcPath(CX, CY, innerRangeR - LABEL_LINE_OFFSET, segment.startAngle, segment.endAngle)
    : null;

  return (
    <g
      className={isActive ? "imc-gauge__labels imc-gauge__labels--active" : "imc-gauge__labels"}
      aria-hidden="true"
    >
      <defs>
        <path id={`${pathId}-title`} d={outerPath} fill="none" />
        {outerPathLine2 ? <path id={`${pathId}-title2`} d={outerPathLine2} fill="none" /> : null}
        <path id={`${pathId}-range`} d={innerPath} fill="none" />
        {innerPathLine2 ? <path id={`${pathId}-range2`} d={innerPathLine2} fill="none" /> : null}
      </defs>
      <text fill={segment.textColor} className="imc-gauge__zone-title" fontWeight={700}>
        <textPath href={`#${pathId}-title`} startOffset="50%" textAnchor="middle">
          {titleLine1}
        </textPath>
      </text>
      {titleLine2 && outerPathLine2 ? (
        <text
          fill={segment.textColor}
          className="imc-gauge__zone-title imc-gauge__zone-title--sub"
          fontWeight={700}
        >
          <textPath href={`#${pathId}-title2`} startOffset="50%" textAnchor="middle">
            {titleLine2}
          </textPath>
        </text>
      ) : null}
      <text fill={segment.textColor} className="imc-gauge__zone-range" fontWeight={600}>
        <textPath href={`#${pathId}-range`} startOffset="50%" textAnchor="middle">
          {rangeLine1}
        </textPath>
      </text>
      {rangeLine2 && innerPathLine2 ? (
        <text
          fill={segment.textColor}
          className="imc-gauge__zone-range imc-gauge__zone-range--sub"
          fontWeight={600}
        >
          <textPath href={`#${pathId}-range2`} startOffset="50%" textAnchor="middle">
            {rangeLine2}
          </textPath>
        </text>
      ) : null}
    </g>
  );
}

export function BodyFatGauge({ result, hideSummaryWhenResult = false }: BodyFatGaugeProps) {
  const uid = useId().replace(/:/g, "");
  const sex = result?.sex ?? "female";
  const segments = useMemo(() => buildBodyFatGaugeSegments(sex), [sex]);
  const hasResult = result !== null;
  const showSummary = !(hideSummaryWhenResult && hasResult);
  const targetAngle = hasResult ? bodyFatToNeedleAngleDegrees(result.bodyFatPercent, result.sex) : NEEDLE_IDLE_ANGLE;
  const animatedAngle = useAnimatedNeedleAngle(hasResult ? targetAngle : NEEDLE_IDLE_ANGLE);
  const needle = computeNeedleGeometry(CX, CY, animatedAngle, NEEDLE_LENGTH);
  const accentColor = hasResult ? getActiveSegmentAccent(result.category.id) : "var(--ds-text-muted)";
  const formattedPercent = hasResult ? formatBodyFatPercent(result.bodyFatPercent) : "";
  const interpretation = hasResult
    ? getBodyFatInterpretationSentence(result.category.id)
    : BODY_FAT_IDLE_INTERPRETATION;
  const accessibleSummary = hasResult
    ? buildBodyFatAccessibleSummary(
        formattedPercent,
        result.category.label,
        result.category.id,
        result.sex === "male" ? "homme" : "femme",
      )
    : BODY_FAT_IDLE_ACCESSIBLE_SUMMARY;
  const categoryLines = hasResult ? getGaugeZoneTitleLines(result.category) : [];
  const sexLabel = sex === "male" ? "homme" : "femme";
  const gaugeAriaLabel = hasResult
    ? `Votre masse grasse est estimée à ${formattedPercent} %. Catégorie : ${result.category.label}.`
    : `Jauge de référence masse grasse (${sexLabel}). Aucun résultat calculé pour le moment.`;

  return (
    <article
      className={`imc-result-card${hasResult ? " imc-result-card--has-result" : ""}${hideSummaryWhenResult && hasResult ? " imc-result-card--gauge-only" : ""}`}
      style={hasResult ? { ["--imc-result-accent" as string]: accentColor } : undefined}
    >
      <p id="bf-gauge-summary" className="imc-result-card__sr-summary">
        {accessibleSummary}
      </p>

      <div className="imc-result-card__gauge">
        <svg
          className="imc-gauge__chart"
          viewBox={VIEWBOX}
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={gaugeAriaLabel}
        >
          <rect
            className="imc-gauge__base-bar"
            x={BASE_X}
            y={CY}
            width={BASE_WIDTH}
            height={BASE_HEIGHT}
            rx={2}
          />
          <text
            x={CX}
            y={CY + BASE_HEIGHT / 2 + 1}
            className="imc-gauge__base-label"
            textAnchor="middle"
            dominantBaseline="middle"
            aria-hidden="true"
          >
            % MG = Pourcentage de Masse Grasse
          </text>

          {segments.map((segment) => {
            const isActive = hasResult && segment.id === result.category.id;
            return (
              <g
                key={segment.id}
                className={isActive ? "imc-gauge__sector imc-gauge__sector--active" : "imc-gauge__sector"}
              >
                <path
                  d={describeDonutSegment(CX, CY, MID_R, OUTER_R, segment.startAngle, segment.endAngle)}
                  fill={segment.fillOuter}
                  stroke="none"
                />
                <path
                  d={describeDonutSegment(CX, CY, INNER_R, MID_R, segment.startAngle, segment.endAngle)}
                  fill={segment.fillInner}
                  stroke="none"
                />
              </g>
            );
          })}

          {segments.map((segment) => (
            <ZoneLabels
              key={`label-${segment.id}`}
              segment={segment}
              isActive={hasResult && segment.id === result.category.id}
              pathId={`${uid}-${segment.id}`}
            />
          ))}

          <g
            className={`imc-gauge__needle-group${hasResult ? " imc-gauge__needle-group--visible" : ""}`}
            aria-hidden="true"
          >
            <polygon
              points={`${needle.tipX},${needle.tipY} ${needle.leftX},${needle.leftY} ${needle.rightX},${needle.rightY}`}
              fill="#374151"
            />
            <circle
              className="imc-gauge__pivot"
              cx={CX}
              cy={CY}
              r={13}
              fill="#374151"
              stroke="#ffffff"
              strokeWidth={2.5}
            />
          </g>
        </svg>
      </div>

      {showSummary ? (
        <div className="imc-result-card__summary">
          <div className="imc-result-card__metrics-slot">
            <div
              className={`imc-result-card__swap-layer imc-result-card__swap-layer--idle${hasResult ? " imc-result-card__swap-layer--hidden" : ""}`}
              aria-hidden={hasResult}
            >
              <p className="imc-result-card__placeholder-primary">{BODY_FAT_IDLE_METRICS_PRIMARY}</p>
              <p className="imc-result-card__placeholder-secondary">{BODY_FAT_IDLE_METRICS_SECONDARY}</p>
            </div>
            <div
              className={`imc-result-card__swap-layer imc-result-card__swap-layer--result${hasResult ? "" : " imc-result-card__swap-layer--hidden"}`}
              aria-hidden={!hasResult}
            >
              {hasResult ? (
                <>
                  <p className="imc-result-card__value-row">
                    <span className="imc-result-card__value">{formattedPercent}</span>
                    <span className="imc-result-card__unit">%</span>
                  </p>
                  <p className="imc-result-card__category">
                    {categoryLines.map((line) => (
                      <span key={line} className="imc-result-card__category-line">
                        {line}
                      </span>
                    ))}
                  </p>
                </>
              ) : null}
            </div>
          </div>

          <div className="imc-result-card__interpretation-slot">
            <p
              className={`imc-result-card__interpretation imc-result-card__swap-layer imc-result-card__swap-layer--idle${hasResult ? " imc-result-card__swap-layer--hidden" : ""}`}
              aria-hidden={hasResult}
            >
              {BODY_FAT_IDLE_INTERPRETATION}
            </p>
            {hasResult ? (
              <p className="imc-result-card__interpretation imc-result-card__swap-layer imc-result-card__swap-layer--result">
                {interpretation}
              </p>
            ) : (
              <p
                className="imc-result-card__interpretation imc-result-card__swap-layer imc-result-card__swap-layer--result imc-result-card__swap-layer--hidden"
                aria-hidden="true"
              >
                {getBodyFatInterpretationSentence("normal")}
              </p>
            )}
          </div>
        </div>
      ) : null}

      <footer className="imc-result-card__footer">
        <p className="imc-result-card__limits">{BODY_FAT_LIMITS_SUMMARY}</p>
        <Link href={BODY_FAT_LIMITS_GUIDE.href} className="imc-result-card__guide-link">
          {BODY_FAT_LIMITS_GUIDE.label}
        </Link>
      </footer>
    </article>
  );
}
