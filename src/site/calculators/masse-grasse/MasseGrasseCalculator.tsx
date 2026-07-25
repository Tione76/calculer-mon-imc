"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type { BodyFatMethodId, BodyFatSex } from "./types";
import { BODY_FAT_QUICK_AGE_MIN } from "./constants";
import {
  buildBodyFatCopyText,
  buildBodyFatInput,
  buildPersonalizedBodyFatCopyText,
  buildQuickBodyFatCopyText,
  calculatePersonalizedBodyFat,
  calculateQuickBodyFat,
  compareBodyFatMethods,
} from "./engine";
import {
  MASSE_GRASSE_CALCULATOR_LINKS,
  MASSE_GRASSE_CARD_TITLE,
  MASSE_GRASSE_COMPARE_KEEP_IN_MIND,
  MASSE_GRASSE_PERSONALIZED_KEEP_IN_MIND,
  MASSE_GRASSE_QUICK_KEEP_IN_MIND,
} from "./presentation";
import { MASSE_GRASSE_COMPARE_STEP3_HELP } from "./method-science-copy";
import {
  parseBodyFatAge,
  parseBodyFatHeightCm,
  parseBodyFatHipCm,
  parseBodyFatNeckCm,
  parseBodyFatWaistCm,
  parseBodyFatWeightKg,
  validateBodyFatAge,
  validateBodyFatFormOnSubmit,
  validateBodyFatHeightCm,
  validateBodyFatHipCm,
  validateBodyFatNeckCm,
  validateBodyFatWaistCm,
  validateBodyFatWeightKg,
  validateCompareBaseOnSubmit,
  validateCompareOptionalMeasuresOnSubmit,
  validatePersonalizedFormOnSubmit,
} from "./validation";
import { CompareModePanel } from "./components/compare-mode-panel";
import { ModePanelHeader } from "./components/mode-panel-header";
import { PersonalizedModePanel } from "./components/personalized-mode-panel";
import { QuickModePanel } from "./components/quick-mode-panel";
import {
  CompareOptionalMeasuresStep,
  EducationalNotice,
  IconCompare,
  ModeTabs,
  StepHeader,
  UserInfoStep,
  type CalculatorMode,
} from "./components/shared-ui";
import "../ui/calculator-ui.css";
import "../ui/shell/calculator-shell.css";
import "../poids-ideal/poids-ideal-calculator.css";
import "./masse-grasse-calculator.css";

const TAB_MODES: CalculatorMode[] = ["quick", "personalized", "compare"];

export default function MasseGrasseCalculator() {
  const baseId = useId();
  const quickTabId = `${baseId}-tab-quick`;
  const personalizedTabId = `${baseId}-tab-personalized`;
  const compareTabId = `${baseId}-tab-compare`;
  const quickPanelId = `${baseId}-panel-quick`;
  const personalizedPanelId = `${baseId}-panel-personalized`;
  const comparePanelId = `${baseId}-panel-compare`;

  const [mode, setMode] = useState<CalculatorMode>("quick");
  const [sex, setSex] = useState<BodyFatSex>("female");
  const [ageYears, setAgeYears] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [waistCm, setWaistCm] = useState("");
  const [neckCm, setNeckCm] = useState("");
  const [hipCm, setHipCm] = useState("");
  const [optionalWeightKg, setOptionalWeightKg] = useState("");
  const [ageError, setAgeError] = useState<string | null>(null);
  const [heightError, setHeightError] = useState<string | null>(null);
  const [weightError, setWeightError] = useState<string | null>(null);
  const [waistError, setWaistError] = useState<string | null>(null);
  const [neckError, setNeckError] = useState<string | null>(null);
  const [hipError, setHipError] = useState<string | null>(null);
  const [optionalWeightError, setOptionalWeightError] = useState<string | null>(null);
  const [ageTouched, setAgeTouched] = useState(false);
  const [heightTouched, setHeightTouched] = useState(false);
  const [weightTouched, setWeightTouched] = useState(false);
  const [waistTouched, setWaistTouched] = useState(false);
  const [neckTouched, setNeckTouched] = useState(false);
  const [hipTouched, setHipTouched] = useState(false);
  const [optionalWeightTouched, setOptionalWeightTouched] = useState(false);
  const [submittedQuick, setSubmittedQuick] = useState(false);
  const [submittedPersonalized, setSubmittedPersonalized] = useState(false);
  const [submittedCompare, setSubmittedCompare] = useState(false);
  const [expandedMethod, setExpandedMethod] = useState<BodyFatMethodId | null>(null);
  const [copyCopied, setCopyCopied] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const quickResultRef = useRef<HTMLElement>(null);
  const personalizedResultRef = useRef<HTMLElement>(null);
  const comparisonResultsStartRef = useRef<HTMLElement>(null);
  const shouldScrollToQuickResult = useRef(false);
  const shouldScrollToPersonalizedResult = useRef(false);
  const shouldScrollToComparison = useRef(false);

  const parsedAge = useMemo(() => parseBodyFatAge(ageYears), [ageYears]);
  const parsedHeight = useMemo(() => parseBodyFatHeightCm(heightCm), [heightCm]);
  const parsedWeight = useMemo(() => parseBodyFatWeightKg(weightKg), [weightKg]);
  const parsedWaist = useMemo(() => parseBodyFatWaistCm(waistCm), [waistCm]);
  const parsedNeck = useMemo(() => parseBodyFatNeckCm(neckCm), [neckCm]);
  const parsedHip = useMemo(() => parseBodyFatHipCm(hipCm), [hipCm]);
  const parsedOptionalWeight = useMemo(() => parseBodyFatWeightKg(optionalWeightKg), [optionalWeightKg]);

  const quickBaseValid = parsedAge !== null && parsedHeight !== null && parsedWeight !== null;
  const personalizedBaseValid = parsedHeight !== null && parsedWaist !== null;
  const compareBaseValid =
    parsedAge !== null && parsedHeight !== null && parsedWeight !== null && parsedWaist !== null;

  const ageValid = Boolean(ageYears.trim()) && parsedAge !== null && !ageError;
  const heightValid = Boolean(heightCm.trim()) && parsedHeight !== null && !heightError;
  const weightValid = Boolean(weightKg.trim()) && parsedWeight !== null && !weightError;
  const waistValid = Boolean(waistCm.trim()) && parsedWaist !== null && !waistError;
  const neckValid = Boolean(neckCm.trim()) && parsedNeck !== null && !neckError;
  const hipValid = Boolean(hipCm.trim()) && parsedHip !== null && !hipError;
  const optionalWeightValid =
    Boolean(optionalWeightKg.trim()) && parsedOptionalWeight !== null && !optionalWeightError;

  const quickInput = useMemo(() => {
    if (!quickBaseValid) return null;
    return buildBodyFatInput(sex, parsedAge!, parsedHeight!, parsedWeight!);
  }, [quickBaseValid, sex, parsedAge, parsedHeight, parsedWeight]);

  const compareInput = useMemo(() => {
    if (!compareBaseValid) return null;
    const measures: { waistCm?: number; neckCm?: number; hipCm?: number } = { waistCm: parsedWaist! };
    if (parsedNeck !== null) measures.neckCm = parsedNeck;
    if (parsedHip !== null) measures.hipCm = parsedHip;
    return buildBodyFatInput(sex, parsedAge!, parsedHeight!, parsedWeight!, measures);
  }, [
    compareBaseValid,
    sex,
    parsedAge,
    parsedHeight,
    parsedWeight,
    parsedWaist,
    parsedNeck,
    parsedHip,
  ]);

  const quickUnderage = submittedQuick && parsedAge !== null && parsedAge < BODY_FAT_QUICK_AGE_MIN;

  const quickResult = useMemo(() => {
    if (!submittedQuick || !quickInput || quickUnderage) return null;
    return calculateQuickBodyFat(quickInput);
  }, [submittedQuick, quickInput, quickUnderage]);

  const personalizedResult = useMemo(() => {
    if (!submittedPersonalized || !personalizedBaseValid) return null;
    return calculatePersonalizedBodyFat(sex, parsedHeight!, parsedWaist!);
  }, [submittedPersonalized, personalizedBaseValid, sex, parsedHeight, parsedWaist]);

  const compareResult = useMemo(() => {
    if (!submittedCompare || !compareInput) return null;
    return compareBodyFatMethods(compareInput);
  }, [submittedCompare, compareInput]);

  const scrollToSection = useCallback((sectionRef: { current: HTMLElement | null }) => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    section.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  useEffect(() => {
    if (!shouldScrollToQuickResult.current || !submittedQuick) return;
    if (!quickUnderage && !quickResult) return;
    shouldScrollToQuickResult.current = false;

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => scrollToSection(quickResultRef));
    });
  }, [submittedQuick, quickUnderage, quickResult, scrollToSection]);

  useEffect(() => {
    if (!shouldScrollToPersonalizedResult.current || !submittedPersonalized || !personalizedResult) return;
    shouldScrollToPersonalizedResult.current = false;

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => scrollToSection(personalizedResultRef));
    });
  }, [submittedPersonalized, personalizedResult, scrollToSection]);

  useEffect(() => {
    if (
      mode !== "compare" ||
      !shouldScrollToComparison.current ||
      !submittedCompare ||
      !compareResult
    ) {
      return;
    }

    shouldScrollToComparison.current = false;

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => scrollToSection(comparisonResultsStartRef));
    });
  }, [mode, submittedCompare, compareResult, scrollToSection]);

  const clearSubmittedResults = useCallback(() => {
    setSubmittedQuick(false);
    setSubmittedPersonalized(false);
    setSubmittedCompare(false);
    setCopyCopied(false);
    setShareFeedback(null);
  }, []);

  const handleSexChange = (nextSex: BodyFatSex) => {
    setSex(nextSex);
    clearSubmittedResults();
    if (nextSex === "male") {
      setHipCm("");
      setHipError(null);
      setHipTouched(false);
    }
  };

  const handleAgeChange = (value: string) => {
    setAgeYears(value);
    clearSubmittedResults();
    if (ageTouched) {
      setAgeError(value.trim() ? validateBodyFatAge(value) : "Indiquez votre âge.");
    }
  };

  const handleHeightChange = (value: string) => {
    setHeightCm(value);
    clearSubmittedResults();
    if (heightTouched) {
      setHeightError(value.trim() ? validateBodyFatHeightCm(value) : "Indiquez votre taille.");
    }
  };

  const handleWeightChange = (value: string) => {
    setWeightKg(value);
    clearSubmittedResults();
    if (weightTouched) {
      setWeightError(value.trim() ? validateBodyFatWeightKg(value) : "Indiquez votre poids.");
    }
  };

  const handleWaistChange = (value: string) => {
    setWaistCm(value);
    clearSubmittedResults();
    if (waistTouched) {
      setWaistError(value.trim() ? validateBodyFatWaistCm(value) : "Indiquez votre tour de taille.");
    }
  };

  const handleNeckChange = (value: string) => {
    setNeckCm(value);
    clearSubmittedResults();
    if (neckTouched) {
      setNeckError(value.trim() ? validateBodyFatNeckCm(value) : null);
    }
  };

  const handleHipChange = (value: string) => {
    setHipCm(value);
    clearSubmittedResults();
    if (hipTouched) {
      setHipError(value.trim() ? validateBodyFatHipCm(value) : null);
    }
  };

  const handleOptionalWeightChange = (value: string) => {
    setOptionalWeightKg(value);
    if (optionalWeightTouched) {
      setOptionalWeightError(value.trim() ? validateBodyFatWeightKg(value) : null);
    }
  };

  const handleAgeBlur = () => {
    setAgeTouched(true);
    setAgeError(ageYears.trim() ? validateBodyFatAge(ageYears) : "Indiquez votre âge.");
  };

  const handleHeightBlur = () => {
    setHeightTouched(true);
    setHeightError(heightCm.trim() ? validateBodyFatHeightCm(heightCm) : "Indiquez votre taille.");
  };

  const handleWeightBlur = () => {
    setWeightTouched(true);
    setWeightError(weightKg.trim() ? validateBodyFatWeightKg(weightKg) : "Indiquez votre poids.");
  };

  const handleWaistBlur = () => {
    setWaistTouched(true);
    setWaistError(waistCm.trim() ? validateBodyFatWaistCm(waistCm) : "Indiquez votre tour de taille.");
  };

  const handleNeckBlur = () => {
    setNeckTouched(true);
    setNeckError(neckCm.trim() ? validateBodyFatNeckCm(neckCm) : null);
  };

  const handleHipBlur = () => {
    setHipTouched(true);
    setHipError(hipCm.trim() ? validateBodyFatHipCm(hipCm) : null);
  };

  const handleOptionalWeightBlur = () => {
    setOptionalWeightTouched(true);
    setOptionalWeightError(
      optionalWeightKg.trim() ? validateBodyFatWeightKg(optionalWeightKg) : null,
    );
  };

  const validateQuickForm = useCallback((): boolean => {
    const validation = validateBodyFatFormOnSubmit(ageYears, heightCm, weightKg);
    setAgeTouched(true);
    setHeightTouched(true);
    setWeightTouched(true);
    setAgeError(validation.ageError);
    setHeightError(validation.heightError);
    setWeightError(validation.weightError);
    return !validation.ageError && !validation.heightError && !validation.weightError;
  }, [ageYears, heightCm, weightKg]);

  const validatePersonalizedForm = useCallback((): boolean => {
    const validation = validatePersonalizedFormOnSubmit(heightCm, waistCm);
    setHeightTouched(true);
    setWaistTouched(true);
    setHeightError(validation.heightError);
    setWaistError(validation.waistError);
    return !validation.heightError && !validation.waistError;
  }, [heightCm, waistCm]);

  const validateCompareForm = useCallback((): boolean => {
    const base = validateCompareBaseOnSubmit(ageYears, heightCm, weightKg, waistCm);
    setAgeTouched(true);
    setHeightTouched(true);
    setWeightTouched(true);
    setWaistTouched(true);
    setAgeError(base.ageError);
    setHeightError(base.heightError);
    setWeightError(base.weightError);
    setWaistError(base.waistError);

    if (base.ageError || base.heightError || base.weightError || base.waistError) return false;

    const optional = validateCompareOptionalMeasuresOnSubmit(sex, neckCm, hipCm);
    if (neckCm.trim()) {
      setNeckTouched(true);
      setNeckError(optional.neckError);
      if (optional.neckError) return false;
    }
    if (sex === "female" && hipCm.trim()) {
      setHipTouched(true);
      setHipError(optional.hipError);
      if (optional.hipError) return false;
    }

    return true;
  }, [ageYears, heightCm, weightKg, waistCm, sex, neckCm, hipCm]);

  const handleSubmit = () => {
    if (mode === "quick") {
      if (!validateQuickForm()) return;
      shouldScrollToQuickResult.current = true;
      setSubmittedQuick(true);
      setSubmittedPersonalized(false);
      setSubmittedCompare(false);
      return;
    }

    if (mode === "personalized") {
      if (!validatePersonalizedForm()) return;
      shouldScrollToPersonalizedResult.current = true;
      setSubmittedPersonalized(true);
      setSubmittedQuick(false);
      setSubmittedCompare(false);
      return;
    }

    if (!validateCompareForm()) return;
    shouldScrollToComparison.current = true;
    setSubmittedCompare(true);
    setSubmittedQuick(false);
    setSubmittedPersonalized(false);
  };

  const changeMode = useCallback(
    (nextMode: CalculatorMode) => {
      setMode(nextMode);
      setSubmittedQuick(false);
      setSubmittedPersonalized(false);
      setSubmittedCompare(false);
      setCopyCopied(false);
      setShareFeedback(null);
    },
    [],
  );

  const handleCompareFromQuickResult = () => {
    if (!quickBaseValid) return;
    setMode("compare");
    shouldScrollToComparison.current = false;
  };

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const nextIndex =
        event.key === "ArrowRight"
          ? (index + 1) % TAB_MODES.length
          : (index - 1 + TAB_MODES.length) % TAB_MODES.length;
      changeMode(TAB_MODES[nextIndex]!);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  const handleCopyQuick = async () => {
    if (!quickResult) return;
    try {
      await navigator.clipboard.writeText(buildQuickBodyFatCopyText(quickResult));
      setCopyCopied(true);
      window.setTimeout(() => setCopyCopied(false), 2000);
    } catch {
      setCopyCopied(false);
    }
  };

  const handleCopyPersonalized = async () => {
    if (!personalizedResult) return;
    try {
      await navigator.clipboard.writeText(
        buildPersonalizedBodyFatCopyText(
          personalizedResult,
          optionalWeightValid ? parsedOptionalWeight ?? undefined : undefined,
        ),
      );
      setCopyCopied(true);
      window.setTimeout(() => setCopyCopied(false), 2000);
    } catch {
      setCopyCopied(false);
    }
  };

  const handleShareQuick = async () => {
    if (!quickResult) return;
    const text = buildQuickBodyFatCopyText(quickResult);
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Mon estimation de masse grasse",
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

  const handleSharePersonalized = async () => {
    if (!personalizedResult) return;
    const text = buildPersonalizedBodyFatCopyText(
      personalizedResult,
      optionalWeightValid ? parsedOptionalWeight ?? undefined : undefined,
    );
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Mon estimation de masse grasse (RFM)",
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

  const handleReset = () => {
    setAgeYears("");
    setHeightCm("");
    setWeightKg("");
    setWaistCm("");
    setNeckCm("");
    setHipCm("");
    setOptionalWeightKg("");
    setAgeError(null);
    setHeightError(null);
    setWeightError(null);
    setWaistError(null);
    setNeckError(null);
    setHipError(null);
    setOptionalWeightError(null);
    setAgeTouched(false);
    setHeightTouched(false);
    setWeightTouched(false);
    setWaistTouched(false);
    setNeckTouched(false);
    setHipTouched(false);
    setOptionalWeightTouched(false);
    setSubmittedQuick(false);
    setSubmittedPersonalized(false);
    setSubmittedCompare(false);
    setCopyCopied(false);
    setShareFeedback(null);
  };

  const handleCopyCompare = async () => {
    if (!compareResult) return;
    try {
      await navigator.clipboard.writeText(buildBodyFatCopyText(compareResult));
      setCopyCopied(true);
      window.setTimeout(() => setCopyCopied(false), 2000);
    } catch {
      setCopyCopied(false);
    }
  };

  const quickSubmitDisabled =
    !ageYears.trim() ||
    !heightCm.trim() ||
    !weightKg.trim() ||
    (ageTouched && Boolean(ageError)) ||
    (heightTouched && Boolean(heightError)) ||
    (weightTouched && Boolean(weightError));

  const personalizedSubmitDisabled =
    !heightCm.trim() ||
    !waistCm.trim() ||
    (heightTouched && Boolean(heightError)) ||
    (waistTouched && Boolean(waistError));

  const compareSubmitDisabled =
    !ageYears.trim() ||
    !heightCm.trim() ||
    !weightKg.trim() ||
    !waistCm.trim() ||
    (ageTouched && Boolean(ageError)) ||
    (heightTouched && Boolean(heightError)) ||
    (weightTouched && Boolean(weightError)) ||
    (waistTouched && Boolean(waistError)) ||
    (neckTouched && Boolean(neckError)) ||
    (hipTouched && Boolean(hipError));

  const panelId =
    mode === "quick" ? quickPanelId : mode === "personalized" ? personalizedPanelId : comparePanelId;
  const tabId =
    mode === "quick" ? quickTabId : mode === "personalized" ? personalizedTabId : compareTabId;

  const keepInMind =
    mode === "quick"
      ? MASSE_GRASSE_QUICK_KEEP_IN_MIND
      : mode === "personalized"
        ? MASSE_GRASSE_PERSONALIZED_KEEP_IN_MIND
        : MASSE_GRASSE_COMPARE_KEEP_IN_MIND;

  const userInfoVariant = mode === "personalized" ? "personalized" : mode === "compare" ? "compare" : "quick";

  return (
    <div className="pi-calc calc-root mg-calc">
      <h2 className="sr-only">{MASSE_GRASSE_CARD_TITLE}</h2>

      <div className="pi-quick">
        <div className="pi-quick__card">
          <ModePanelHeader mode={mode} />

          <ModeTabs
            mode={mode}
            quickTabId={quickTabId}
            personalizedTabId={personalizedTabId}
            compareTabId={compareTabId}
            quickPanelId={quickPanelId}
            personalizedPanelId={personalizedPanelId}
            comparePanelId={comparePanelId}
            tabRefs={tabRefs}
            onTabKeyDown={handleTabKeyDown}
            onModeChange={changeMode}
          />

          <div role="tabpanel" id={panelId} aria-labelledby={tabId} className="pi-quick__panel">
            <UserInfoStep
              variant={userInfoVariant}
              sex={sex}
              onSexChange={handleSexChange}
              ageYears={ageYears}
              ageError={ageError}
              ageTouched={ageTouched}
              ageValid={ageValid}
              onAgeChange={handleAgeChange}
              onAgeBlur={handleAgeBlur}
              heightCm={heightCm}
              heightError={heightError}
              heightTouched={heightTouched}
              heightValid={heightValid}
              onHeightChange={handleHeightChange}
              onHeightBlur={handleHeightBlur}
              weightKg={weightKg}
              weightError={weightError}
              weightTouched={weightTouched}
              weightValid={weightValid}
              onWeightChange={handleWeightChange}
              onWeightBlur={handleWeightBlur}
              waistCm={waistCm}
              waistError={waistError}
              waistTouched={waistTouched}
              waistValid={waistValid}
              onWaistChange={handleWaistChange}
              onWaistBlur={handleWaistBlur}
            />

            {mode === "quick" ? (
              <QuickModePanel
                submitDisabled={quickSubmitDisabled}
                onSubmit={handleSubmit}
                submittedQuick={submittedQuick}
                quickResult={quickResult}
                quickUnderage={quickUnderage}
                onCompareWithOthers={handleCompareFromQuickResult}
                estimationResultRef={quickResultRef}
                copyCopied={copyCopied}
                shareFeedback={shareFeedback}
                onCopy={handleCopyQuick}
                onShare={handleShareQuick}
                onReset={handleReset}
              />
            ) : null}

            {mode === "personalized" ? (
              <PersonalizedModePanel
                submitDisabled={personalizedSubmitDisabled}
                onSubmit={handleSubmit}
                submittedPersonalized={submittedPersonalized}
                personalizedResult={personalizedResult}
                estimationResultRef={personalizedResultRef}
                copyCopied={copyCopied}
                shareFeedback={shareFeedback}
                onCopy={handleCopyPersonalized}
                onShare={handleSharePersonalized}
                onReset={handleReset}
                optionalWeightKg={optionalWeightKg}
                optionalWeightError={optionalWeightError}
                optionalWeightTouched={optionalWeightTouched}
                optionalWeightValid={optionalWeightValid}
                onOptionalWeightChange={handleOptionalWeightChange}
                onOptionalWeightBlur={handleOptionalWeightBlur}
              />
            ) : null}

            {mode === "compare" ? (
              <>
                <CompareOptionalMeasuresStep
                  sex={sex}
                  compareBaseValid={compareBaseValid}
                  neckValid={neckValid}
                  hipValid={hipValid}
                  neckCm={neckCm}
                  neckError={neckError}
                  neckTouched={neckTouched}
                  onNeckChange={handleNeckChange}
                  onNeckBlur={handleNeckBlur}
                  hipCm={hipCm}
                  hipError={hipError}
                  hipTouched={hipTouched}
                  onHipChange={handleHipChange}
                  onHipBlur={handleHipBlur}
                />

                <section className="pi-quick__step" aria-labelledby="mg-compare-step-3">
                  <StepHeader
                    step={3}
                    title="Comparer les méthodes"
                    help={MASSE_GRASSE_COMPARE_STEP3_HELP}
                  />
                  <button
                    type="button"
                    className="pi-quick__submit"
                    disabled={compareSubmitDisabled}
                    onClick={handleSubmit}
                  >
                    <IconCompare className="pi-quick__submit-icon" />
                    Comparer les méthodes
                    <span className="pi-quick__submit-arrow" aria-hidden="true">
                      →
                    </span>
                  </button>
                </section>

                {submittedCompare && compareResult ? (
                  <CompareModePanel
                    comparison={compareResult}
                    expandedMethod={expandedMethod}
                    setExpandedMethod={setExpandedMethod}
                    comparisonResultsStartRef={comparisonResultsStartRef}
                    copyCopied={copyCopied}
                    onCopy={handleCopyCompare}
                  />
                ) : null}
              </>
            ) : null}
          </div>

          <EducationalNotice paragraphs={keepInMind} />
        </div>
      </div>

      <ul className="pi-calc__guides">
        {MASSE_GRASSE_CALCULATOR_LINKS.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
