"use client";

import type { CSSProperties, RefObject } from "react";
import type { BodyFatResult } from "../types";
import { formatBodyFatPercent, formatMassKg } from "../format";
import { getBodyFatInterpretationSentence } from "../gauge/interpretation";
import { getActiveSegmentAccent } from "../gauge/mapping";
import { BodyFatGauge } from "../ui/BodyFatGauge";
import { MASSE_GRASSE_QUICK_UNDERAGE_MESSAGE } from "../presentation";
import {
  MASSE_GRASSE_QUICK_RESULT_HELP,
  MASSE_GRASSE_QUICK_STEP2_HELP,
} from "../method-science-copy";
import {
  IconCalc,
  IconCheck,
  IconCompare,
  IconCopy,
  StepHeader,
} from "./shared-ui";
import {
  IconReset,
  IconShare,
  SecondaryButton,
} from "../../ui/shell";

function CompositionCards({ result }: { result: BodyFatResult }) {
  const cards = [
    { label: "Pourcentage de masse grasse", value: formatBodyFatPercent(result.bodyFatPercent), unit: "%" },
    { label: "Masse grasse", value: formatMassKg(result.fatMassKg), unit: "kg" },
    { label: "Masse maigre", value: formatMassKg(result.leanMassKg), unit: "kg" },
  ];

  return (
    <div className="mg-composition" aria-label="Détail de la composition corporelle">
      {cards.map((card) => (
        <div key={card.label} className="mg-composition__card">
          <p className="mg-composition__label">{card.label}</p>
          <p className="mg-composition__value" aria-label={`${card.value} ${card.unit}`}>
            <span className="mg-composition__number">{card.value}</span>
            <span className="mg-composition__unit"> {card.unit}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

function BodyFatResultHero({ result }: { result: BodyFatResult }) {
  const accent = getActiveSegmentAccent(result.category.id);
  const formattedPercent = formatBodyFatPercent(result.bodyFatPercent);

  return (
    <div
      className="calc-shell__result-hero"
      style={
        {
          "--calc-result-accent": accent,
          "--calc-result-accent-dark": accent,
          "--calc-result-light": `color-mix(in srgb, ${accent} 14%, white)`,
        } as CSSProperties
      }
    >
      <div className="calc-shell__result-hero-top">
        <p className="calc-shell__result-hero-heading">Votre pourcentage de masse grasse</p>
        <span className="calc-shell__result-hero-badge">
          <span aria-hidden="true">●</span>
          {result.category.shortLabel}
        </span>
      </div>
      <p className="calc-shell__result-hero-value" aria-label={`${formattedPercent} pour cent`}>
        <span className="calc-shell__result-hero-number">{formattedPercent}</span>
        <span className="calc-shell__result-hero-unit"> %</span>
      </p>
      <p className="calc-shell__result-hero-summary">{result.category.label}</p>
      <p className="calc-shell__result-hero-note">
        {getBodyFatInterpretationSentence(result.category.id)}
      </p>
    </div>
  );
}

function QuickUnderageNotice({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  return (
    <section
      ref={sectionRef}
      className="pi-quick__step pi-calc__estimation-result-step"
      aria-labelledby="mg-quick-underage"
    >
      <StepHeader
        step={3}
        title="Votre estimation"
        help="Ce mode ne s'applique pas à votre tranche d'âge."
      />
      <div className="mg-quick__underage-notice" role="alert">
        <p id="mg-quick-underage">{MASSE_GRASSE_QUICK_UNDERAGE_MESSAGE}</p>
      </div>
    </section>
  );
}

function QuickResultSection({
  result,
  onCompare,
  sectionRef,
  copyCopied,
  shareFeedback,
  onCopy,
  onShare,
  onReset,
}: {
  result: BodyFatResult;
  onCompare: () => void;
  sectionRef: RefObject<HTMLElement | null>;
  copyCopied: boolean;
  shareFeedback: string | null;
  onCopy: () => void;
  onShare: () => void;
  onReset: () => void;
}) {
  return (
    <section
      ref={sectionRef}
      className="pi-quick__step pi-calc__estimation-result-step"
      aria-labelledby="mg-quick-step-3"
    >
      <StepHeader step={3} title="Votre estimation" help={MASSE_GRASSE_QUICK_RESULT_HELP} />
      <div className="mg-quick__results-inner">
        <BodyFatResultHero result={result} />
        <CompositionCards result={result} />
        <div className="calc-shell__gauge-slot">
          <BodyFatGauge
            result={{
              bodyFatPercent: result.bodyFatPercent,
              category: result.category,
              sex: result.sex,
            }}
            hideSummaryWhenResult
          />
        </div>
        <p className="mg-quick__gauge-caption">{getBodyFatInterpretationSentence(result.category.id)}</p>
        <div className="calc-shell__actions">
          <SecondaryButton
            onClick={onCopy}
            icon={
              copyCopied ? (
                <IconCheck className="calc-shell__secondary-btn-icon" />
              ) : (
                <IconCopy className="calc-shell__secondary-btn-icon" />
              )
            }
          >
            {copyCopied ? "Résultat copié" : "Copier le résultat"}
          </SecondaryButton>
          <SecondaryButton
            onClick={onShare}
            icon={<IconShare className="calc-shell__secondary-btn-icon" />}
          >
            {shareFeedback ?? "Partager"}
          </SecondaryButton>
          <SecondaryButton
            onClick={onReset}
            icon={<IconReset className="calc-shell__secondary-btn-icon" />}
          >
            Réinitialiser
          </SecondaryButton>
        </div>
      </div>
      <button type="button" className="pi-quick__compare-btn" onClick={onCompare}>
        <IconCompare className="pi-quick__compare-btn-icon" />
        Comparer avec les autres méthodes
      </button>
    </section>
  );
}

export function QuickModePanel({
  submitDisabled,
  onSubmit,
  submittedQuick,
  quickResult,
  quickUnderage,
  onCompareWithOthers,
  estimationResultRef,
  copyCopied,
  shareFeedback,
  onCopy,
  onShare,
  onReset,
}: {
  submitDisabled: boolean;
  onSubmit: () => void;
  submittedQuick: boolean;
  quickResult: BodyFatResult | null;
  quickUnderage: boolean;
  onCompareWithOthers: () => void;
  estimationResultRef: RefObject<HTMLElement | null>;
  copyCopied: boolean;
  shareFeedback: string | null;
  onCopy: () => void;
  onShare: () => void;
  onReset: () => void;
}) {
  return (
    <>
      <section className="pi-quick__step" aria-labelledby="mg-quick-step-2">
        <StepHeader
          step={2}
          title="Calculer mon estimation"
          help={MASSE_GRASSE_QUICK_STEP2_HELP}
        />
        <button type="button" className="pi-quick__submit" disabled={submitDisabled} onClick={onSubmit}>
          <IconCalc className="pi-quick__submit-icon" />
          Calculer mon estimation
          <span className="pi-quick__submit-arrow" aria-hidden="true">
            →
          </span>
        </button>
      </section>

      {submittedQuick ? (
        <div className="pi-quick__results" aria-live="polite" aria-atomic="true">
          {quickUnderage ? (
            <QuickUnderageNotice sectionRef={estimationResultRef} />
          ) : quickResult ? (
            <QuickResultSection
              result={quickResult}
              onCompare={onCompareWithOthers}
              sectionRef={estimationResultRef}
              copyCopied={copyCopied}
              shareFeedback={shareFeedback}
              onCopy={onCopy}
              onShare={onShare}
              onReset={onReset}
            />
          ) : null}
        </div>
      ) : null}
    </>
  );
}
