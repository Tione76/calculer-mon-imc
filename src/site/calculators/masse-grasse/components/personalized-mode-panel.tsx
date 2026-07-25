"use client";

import type { CSSProperties, RefObject } from "react";
import type { BodyFatRfmResult } from "../types";
import { formatBodyFatPercent, formatMassKg } from "../format";
import { buildRfmCompositionFromWeight } from "../engine";
import { getBodyFatInterpretationSentence } from "../gauge/interpretation";
import { getActiveSegmentAccent } from "../gauge/mapping";
import { BodyFatGauge } from "../ui/BodyFatGauge";
import {
  MASSE_GRASSE_OPTIONAL_WEIGHT_HELP,
  MASSE_GRASSE_OPTIONAL_WEIGHT_LABEL,
} from "../presentation";
import {
  MASSE_GRASSE_PERSONALIZED_RESULT_HELP,
  MASSE_GRASSE_PERSONALIZED_STEP2_HELP,
} from "../method-science-copy";
import {
  IconAlert,
  IconCalc,
  IconCheck,
  IconCopy,
  StepHeader,
} from "./shared-ui";
import {
  IconReset,
  IconShare,
  SecondaryButton,
} from "../../ui/shell";

function IconWeight({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="3" y="8" width="12" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 8V5.5A3 3 0 0 1 12 5.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BodyFatResultHero({ result }: { result: BodyFatRfmResult }) {
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

function OptionalWeightSection({
  optionalWeightKg,
  optionalWeightError,
  optionalWeightTouched,
  optionalWeightValid,
  onOptionalWeightChange,
  onOptionalWeightBlur,
  result,
}: {
  optionalWeightKg: string;
  optionalWeightError: string | null;
  optionalWeightTouched: boolean;
  optionalWeightValid: boolean;
  onOptionalWeightChange: (value: string) => void;
  onOptionalWeightBlur: () => void;
  result: BodyFatRfmResult;
}) {
  const parsedWeight = optionalWeightValid ? Number.parseFloat(optionalWeightKg.replace(",", ".")) : null;
  const composition =
    parsedWeight !== null && Number.isFinite(parsedWeight)
      ? buildRfmCompositionFromWeight(result.bodyFatPercent, parsedWeight)
      : null;

  return (
    <div className="mg-quick__optional-weight">
      <label htmlFor="body-fat-optional-weight" className="pi-quick__field-label">
        <IconWeight className="pi-quick__height-label-icon" />
        {MASSE_GRASSE_OPTIONAL_WEIGHT_LABEL}
      </label>
      <p className="mg-quick__optional-weight-help">{MASSE_GRASSE_OPTIONAL_WEIGHT_HELP}</p>
      <div
        className={`pi-quick__height-wrap${optionalWeightTouched && optionalWeightError ? " pi-quick__height-wrap--error" : ""}${optionalWeightValid ? " pi-quick__height-wrap--valid" : ""}`}
      >
        <input
          id="body-fat-optional-weight"
          name="bodyFatOptionalWeightKg"
          type="text"
          inputMode="decimal"
          autoComplete="off"
          placeholder="70"
          value={optionalWeightKg}
          onChange={(event) => onOptionalWeightChange(event.target.value)}
          onBlur={onOptionalWeightBlur}
          className="pi-quick__height-input"
          aria-invalid={optionalWeightTouched && optionalWeightError ? true : undefined}
          aria-describedby={optionalWeightTouched && optionalWeightError ? "body-fat-optional-weight-error" : undefined}
        />
        <span className="pi-quick__height-unit" aria-hidden="true">
          kg
        </span>
        {optionalWeightValid ? (
          <span className="pi-quick__height-valid" aria-hidden="true">
            <IconCheck />
          </span>
        ) : null}
        {optionalWeightTouched && optionalWeightError ? (
          <span className="pi-quick__height-error-icon" aria-hidden="true">
            <IconAlert />
          </span>
        ) : null}
      </div>
      {optionalWeightTouched && optionalWeightError ? (
        <p id="body-fat-optional-weight-error" className="pi-quick__field-error" role="alert">
          {optionalWeightError}
        </p>
      ) : null}
      {composition ? (
        <div className="mg-composition mg-composition--optional" aria-label="Conversion en kilogrammes">
          <div className="mg-composition__card">
            <p className="mg-composition__label">Masse grasse estimée</p>
            <p className="mg-composition__value">
              <span className="mg-composition__number">{formatMassKg(composition.fatMassKg)}</span>
              <span className="mg-composition__unit"> kg</span>
            </p>
          </div>
          <div className="mg-composition__card">
            <p className="mg-composition__label">Masse maigre estimée</p>
            <p className="mg-composition__value">
              <span className="mg-composition__number">{formatMassKg(composition.leanMassKg)}</span>
              <span className="mg-composition__unit"> kg</span>
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function PersonalizedResultSection({
  result,
  sectionRef,
  copyCopied,
  shareFeedback,
  onCopy,
  onShare,
  onReset,
  optionalWeightKg,
  optionalWeightError,
  optionalWeightTouched,
  optionalWeightValid,
  onOptionalWeightChange,
  onOptionalWeightBlur,
}: {
  result: BodyFatRfmResult;
  sectionRef: RefObject<HTMLElement | null>;
  copyCopied: boolean;
  shareFeedback: string | null;
  onCopy: () => void;
  onShare: () => void;
  onReset: () => void;
  optionalWeightKg: string;
  optionalWeightError: string | null;
  optionalWeightTouched: boolean;
  optionalWeightValid: boolean;
  onOptionalWeightChange: (value: string) => void;
  onOptionalWeightBlur: () => void;
}) {
  return (
    <section
      ref={sectionRef}
      className="pi-quick__step pi-calc__estimation-result-step"
      aria-labelledby="mg-personalized-step-3"
    >
      <StepHeader
        step={3}
        title="Votre estimation"
        help={MASSE_GRASSE_PERSONALIZED_RESULT_HELP}
      />
      <div className="mg-quick__results-inner">
        <BodyFatResultHero result={result} />
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
        <OptionalWeightSection
          optionalWeightKg={optionalWeightKg}
          optionalWeightError={optionalWeightError}
          optionalWeightTouched={optionalWeightTouched}
          optionalWeightValid={optionalWeightValid}
          onOptionalWeightChange={onOptionalWeightChange}
          onOptionalWeightBlur={onOptionalWeightBlur}
          result={result}
        />
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
    </section>
  );
}

export function PersonalizedModePanel({
  submitDisabled,
  onSubmit,
  submittedPersonalized,
  personalizedResult,
  estimationResultRef,
  copyCopied,
  shareFeedback,
  onCopy,
  onShare,
  onReset,
  optionalWeightKg,
  optionalWeightError,
  optionalWeightTouched,
  optionalWeightValid,
  onOptionalWeightChange,
  onOptionalWeightBlur,
}: {
  submitDisabled: boolean;
  onSubmit: () => void;
  submittedPersonalized: boolean;
  personalizedResult: BodyFatRfmResult | null;
  estimationResultRef: RefObject<HTMLElement | null>;
  copyCopied: boolean;
  shareFeedback: string | null;
  onCopy: () => void;
  onShare: () => void;
  onReset: () => void;
  optionalWeightKg: string;
  optionalWeightError: string | null;
  optionalWeightTouched: boolean;
  optionalWeightValid: boolean;
  onOptionalWeightChange: (value: string) => void;
  onOptionalWeightBlur: () => void;
}) {
  return (
    <>
      <section className="pi-quick__step" aria-labelledby="mg-personalized-step-2">
        <StepHeader
          step={2}
          title="Calculer mon estimation personnalisée"
          help={MASSE_GRASSE_PERSONALIZED_STEP2_HELP}
        />
        <button type="button" className="pi-quick__submit" disabled={submitDisabled} onClick={onSubmit}>
          <IconCalc className="pi-quick__submit-icon" />
          Calculer mon estimation personnalisée
          <span className="pi-quick__submit-arrow" aria-hidden="true">
            →
          </span>
        </button>
      </section>

      {submittedPersonalized && personalizedResult ? (
        <div className="pi-quick__results" aria-live="polite" aria-atomic="true">
          <PersonalizedResultSection
            result={personalizedResult}
            sectionRef={estimationResultRef}
            copyCopied={copyCopied}
            shareFeedback={shareFeedback}
            onCopy={onCopy}
            onShare={onShare}
            onReset={onReset}
            optionalWeightKg={optionalWeightKg}
            optionalWeightError={optionalWeightError}
            optionalWeightTouched={optionalWeightTouched}
            optionalWeightValid={optionalWeightValid}
            onOptionalWeightChange={onOptionalWeightChange}
            onOptionalWeightBlur={onOptionalWeightBlur}
          />
        </div>
      ) : null}
    </>
  );
}
