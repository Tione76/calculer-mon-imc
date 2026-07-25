"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import "../ui/calculator-ui.css";
import "../ui/shell/calculator-shell.css";
import "./imc-calculator.css";

import {
  EducationalNotice,
  IconCalc,
  IconCheck,
  IconCopy,
  IconReset,
  IconRuler,
  IconShare,
  IconWeight,
  NumericInputField,
  SecondaryButton,
  StepHeader,
  SubmitButton,
} from "../ui/shell";
import { formatImcValue } from "./format";
import { getImcInterpretationSentence } from "./gauge/interpretation";
import { getActiveSegmentAccent, getGaugeZoneTitleLines } from "./gauge/mapping";
import {
  IMC_CALC_INTRO,
  IMC_CALC_TITLE,
  IMC_GUIDE_LINKS,
  IMC_HEIGHT_LABEL,
  IMC_KEEP_IN_MIND,
  IMC_KEEP_IN_MIND_TITLE,
  IMC_STEP1_HELP,
  IMC_STEP2_HELP,
  IMC_STEP3_HELP,
  IMC_WEIGHT_LABEL,
} from "./presentation";
import { resolveImcCalculatorResult } from "./resolve-imc-calculator-state";
import type { ImcResult } from "./types";
import { ImcGauge } from "./ui/ImcGauge";
import {
  parseHeightCm,
  parseWeightKg,
  validateHeightCm,
  validateWeightKg,
} from "./validation";

function buildImcCopyText(result: ImcResult): string {
  const value = formatImcValue(result.bmi);
  return `IMC : ${value} kg/m²\nCatégorie : ${result.category.label}\n${getImcInterpretationSentence(result.category.id)}`;
}

function ImcResultHero({ result }: { result: ImcResult }) {
  const accent = getActiveSegmentAccent(result.category.id);
  const categoryLines = getGaugeZoneTitleLines(result.category);
  const formattedValue = formatImcValue(result.bmi);

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
        <p className="calc-shell__result-hero-heading">Votre indice de masse corporelle</p>
        <span className="calc-shell__result-hero-badge">
          <span aria-hidden="true">●</span>
          {categoryLines.join(" ")}
        </span>
      </div>
      <p className="calc-shell__result-hero-value" aria-label={`${formattedValue} kilogrammes par mètre carré`}>
        <span className="calc-shell__result-hero-number">{formattedValue}</span>
        <span className="calc-shell__result-hero-unit"> kg/m²</span>
      </p>
      <p className="calc-shell__result-hero-summary">
        {getImcInterpretationSentence(result.category.id)}
      </p>
      <p className="calc-shell__result-hero-note">
        La jauge ci-dessous reprend la même catégorie avec les repères de référence pour l&apos;adulte.
      </p>
    </div>
  );
}

export default function ImcCalculator() {
  const resultSectionRef = useRef<HTMLElement>(null);
  const shouldScrollToResult = useRef(false);

  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [heightError, setHeightError] = useState<string | null>(null);
  const [weightError, setWeightError] = useState<string | null>(null);
  const [heightTouched, setHeightTouched] = useState(false);
  const [weightTouched, setWeightTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copyCopied, setCopyCopied] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  const parsedHeight = useMemo(() => parseHeightCm(heightCm), [heightCm]);
  const parsedWeight = useMemo(() => parseWeightKg(weightKg), [weightKg]);

  const heightValid = Boolean(heightCm.trim()) && parsedHeight !== null && !heightError;
  const weightValid = Boolean(weightKg.trim()) && parsedWeight !== null && !weightError;

  const imcResult = useMemo(
    () =>
      submitted
        ? resolveImcCalculatorResult(heightCm, weightKg, heightError, weightError)
        : null,
    [submitted, heightCm, weightKg, heightError, weightError],
  );

  const gaugeResult = useMemo(() => {
    if (!imcResult) return null;
    return {
      bmi: imcResult.bmi,
      category: imcResult.category,
      formattedValue: formatImcValue(imcResult.bmi),
    };
  }, [imcResult]);

  const handleHeightChange = (value: string) => {
    setHeightCm(value);
    if (heightTouched) {
      setHeightError(value.trim() ? validateHeightCm(value) : "Saisissez votre taille en centimètres.");
    }
  };

  const handleWeightChange = (value: string) => {
    setWeightKg(value);
    if (weightTouched) {
      setWeightError(value.trim() ? validateWeightKg(value) : "Saisissez votre poids en kilogrammes.");
    }
  };

  const handleHeightBlur = () => {
    setHeightTouched(true);
    setHeightError(
      heightCm.trim() ? validateHeightCm(heightCm) : "Saisissez votre taille en centimètres.",
    );
  };

  const handleWeightBlur = () => {
    setWeightTouched(true);
    setWeightError(
      weightKg.trim() ? validateWeightKg(weightKg) : "Saisissez votre poids en kilogrammes.",
    );
  };

  const validateForm = useCallback((): boolean => {
    const nextHeightError = heightCm.trim()
      ? validateHeightCm(heightCm)
      : "Saisissez votre taille en centimètres.";
    const nextWeightError = weightKg.trim()
      ? validateWeightKg(weightKg)
      : "Saisissez votre poids en kilogrammes.";
    setHeightTouched(true);
    setWeightTouched(true);
    setHeightError(nextHeightError);
    setWeightError(nextWeightError);
    return !nextHeightError && !nextWeightError;
  }, [heightCm, weightKg]);

  const scrollToResult = useCallback(() => {
    const section = resultSectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    section.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  useEffect(() => {
    if (!shouldScrollToResult.current || !submitted || !imcResult) return;
    shouldScrollToResult.current = false;

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(scrollToResult);
    });
  }, [submitted, imcResult, scrollToResult]);

  const handleSubmit = () => {
    if (!validateForm()) return;
    shouldScrollToResult.current = true;
    setSubmitted(true);
  };

  const handleReset = () => {
    setHeightCm("");
    setWeightKg("");
    setHeightError(null);
    setWeightError(null);
    setHeightTouched(false);
    setWeightTouched(false);
    setSubmitted(false);
    setCopyCopied(false);
    setShareFeedback(null);
  };

  const handleCopy = async () => {
    if (!imcResult) return;
    try {
      await navigator.clipboard.writeText(buildImcCopyText(imcResult));
      setCopyCopied(true);
      window.setTimeout(() => setCopyCopied(false), 2000);
    } catch {
      setCopyCopied(false);
    }
  };

  const handleShare = async () => {
    if (!imcResult) return;
    const text = buildImcCopyText(imcResult);
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Mon résultat IMC",
          text,
          url: window.location.href,
        });
        return;
      }
      await navigator.clipboard.writeText(`${text}\n${window.location.href}`);
      setShareFeedback("Lien copié");
      window.setTimeout(() => setShareFeedback(null), 2000);
    } catch {
      setShareFeedback(null);
    }
  };

  const submitDisabled =
    !heightCm.trim() ||
    !weightKg.trim() ||
    (heightTouched && Boolean(heightError)) ||
    (weightTouched && Boolean(weightError));

  return (
    <div className="imc-calc calc-root">
      <h2 className="sr-only">Calculateur IMC</h2>

      <div className="calc-shell">
        <div className="calc-shell__card">
          <header className="calc-shell__header">
            <h2 className="calc-shell__title">{IMC_CALC_TITLE}</h2>
            <p className="calc-shell__intro">{IMC_CALC_INTRO}</p>
          </header>

          <div className="calc-shell__panel">
            <section className="calc-shell__step" aria-labelledby="calc-shell-step-1">
              <StepHeader step={1} title="Vos informations" help={IMC_STEP1_HELP} />
              <fieldset className="calc-shell__info-grid calc-shell__info-grid--two-fields">
                <legend className="sr-only">Informations pour le calcul de l&apos;IMC</legend>
                <NumericInputField
                  id="heightCm"
                  name="heightCm"
                  label={IMC_HEIGHT_LABEL}
                  labelIcon={<IconRuler />}
                  unit="cm"
                  placeholder="170"
                  value={heightCm}
                  error={heightError}
                  touched={heightTouched}
                  valid={heightValid}
                  onChange={handleHeightChange}
                  onBlur={handleHeightBlur}
                />
                <NumericInputField
                  id="weightKg"
                  name="weightKg"
                  label={IMC_WEIGHT_LABEL}
                  labelIcon={<IconWeight />}
                  unit="kg"
                  placeholder="70"
                  value={weightKg}
                  error={weightError}
                  touched={weightTouched}
                  valid={weightValid}
                  onChange={handleWeightChange}
                  onBlur={handleWeightBlur}
                />
              </fieldset>
            </section>

            <section className="calc-shell__step" aria-labelledby="calc-shell-step-2">
              <StepHeader step={2} title="Calculer mon IMC" help={IMC_STEP2_HELP} />
              <SubmitButton disabled={submitDisabled} onClick={handleSubmit} icon={<IconCalc />}>
                Calculer mon IMC
              </SubmitButton>
            </section>

            {submitted ? (
              <section
                ref={resultSectionRef}
                className="calc-shell__step imc-calc__result-step"
                aria-labelledby="calc-shell-step-3"
              >
                <StepHeader step={3} title="Votre résultat" help={IMC_STEP3_HELP} />
                <div
                  className="calc-shell__results"
                  aria-live="polite"
                  aria-atomic="true"
                  aria-label="Résultat IMC"
                >
                  {imcResult ? (
                    <>
                      <ImcResultHero result={imcResult} />
                      <div className="calc-shell__gauge-slot">
                        <ImcGauge result={gaugeResult} hideSummaryWhenResult />
                      </div>
                      <div className="calc-shell__actions">
                        <SecondaryButton
                          onClick={handleCopy}
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
                          onClick={handleShare}
                          icon={<IconShare className="calc-shell__secondary-btn-icon" />}
                        >
                          {shareFeedback ?? "Partager"}
                        </SecondaryButton>
                        <SecondaryButton
                          onClick={handleReset}
                          icon={<IconReset className="calc-shell__secondary-btn-icon" />}
                        >
                          Réinitialiser
                        </SecondaryButton>
                      </div>
                    </>
                  ) : (
                    <aside className="calc-shell__keep-in-mind">
                      <p>
                        Vérifiez vos mesures : une taille ou un poids invalide empêche l&apos;affichage
                        du résultat.
                      </p>
                    </aside>
                  )}
                </div>
              </section>
            ) : null}
          </div>

          <EducationalNotice title={IMC_KEEP_IN_MIND_TITLE} paragraphs={IMC_KEEP_IN_MIND} />
        </div>
      </div>

      <ul className="calc-shell__guides imc-calc__guides">
        {IMC_GUIDE_LINKS.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
