"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type { IdealWeightMethodId, IdealWeightSex } from "./constants";
import {
  buildCopyText,
  calculateIdealWeightMethod,
  compareIdealWeightMethods,
} from "./engine";
import {
  POIDS_IDEAL_CALCULATOR_LINKS,
  POIDS_IDEAL_COMPARE_INTRO,
  POIDS_IDEAL_COMPARE_KEEP_IN_MIND,
  POIDS_IDEAL_COMPARE_TITLE,
  POIDS_IDEAL_QUICK_INTRO,
  POIDS_IDEAL_QUICK_KEEP_IN_MIND,
  POIDS_IDEAL_QUICK_TITLE,
} from "./presentation";
import {
  parseIdealWeightHeightCm,
  validateIdealWeightHeightCm,
  validateIdealWeightHeightOnSubmit,
} from "./validation";
import { CompareModePanel } from "./components/compare-mode-panel";
import { QuickModePanel } from "./components/quick-mode-panel";
import {
  EducationalNotice,
  IconCompare,
  ModeTabs,
  UserInfoStep,
  type CalculatorMode,
} from "./components/shared-ui";
import "../ui/calculator-ui.css";
import "./poids-ideal-calculator.css";

const TAB_MODES: CalculatorMode[] = ["quick", "compare"];

export default function PoidsIdealCalculator() {
  const baseId = useId();
  const quickTabId = `${baseId}-tab-quick`;
  const compareTabId = `${baseId}-tab-compare`;
  const quickPanelId = `${baseId}-panel-quick`;
  const comparePanelId = `${baseId}-panel-compare`;

  const [mode, setMode] = useState<CalculatorMode>("quick");
  const [sex, setSex] = useState<IdealWeightSex>("female");
  const [heightCm, setHeightCm] = useState("");
  const [heightError, setHeightError] = useState<string | null>(null);
  const [heightTouched, setHeightTouched] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<IdealWeightMethodId>("lorentz");
  const [methodError, setMethodError] = useState<string | null>(null);
  const [submittedQuick, setSubmittedQuick] = useState(false);
  const [submittedCompare, setSubmittedCompare] = useState(false);
  const [expandedMethod, setExpandedMethod] = useState<IdealWeightMethodId | null>(null);
  const [copyCopied, setCopyCopied] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const estimationResultRef = useRef<HTMLElement>(null);
  const comparisonResultsStartRef = useRef<HTMLElement>(null);
  const shouldScrollToEstimation = useRef(false);
  const shouldScrollToComparison = useRef(false);

  const parsedHeight = useMemo(() => parseIdealWeightHeightCm(heightCm), [heightCm]);
  const inputsValid = parsedHeight !== null;
  const heightValid = Boolean(heightCm.trim()) && parsedHeight !== null && !heightError;

  const quickResult = useMemo(() => {
    if (!submittedQuick || !inputsValid || !selectedMethod) return null;
    return calculateIdealWeightMethod(selectedMethod, sex, parsedHeight!);
  }, [submittedQuick, inputsValid, selectedMethod, sex, parsedHeight]);

  const compareResult = useMemo(() => {
    if (!submittedCompare || !inputsValid) return null;
    return compareIdealWeightMethods(sex, parsedHeight!);
  }, [submittedCompare, inputsValid, sex, parsedHeight]);

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
    if (!shouldScrollToEstimation.current || !submittedQuick || !quickResult) return;
    shouldScrollToEstimation.current = false;

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => scrollToSection(estimationResultRef));
    });
  }, [submittedQuick, quickResult, scrollToSection]);

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

  const handleHeightChange = (value: string) => {
    setHeightCm(value);
    if (heightTouched) {
      setHeightError(value.trim() ? validateIdealWeightHeightCm(value) : "Indiquez votre taille.");
    }
  };

  const handleHeightBlur = () => {
    setHeightTouched(true);
    setHeightError(
      heightCm.trim() ? validateIdealWeightHeightCm(heightCm) : "Indiquez votre taille.",
    );
  };

  const validateForm = useCallback((): boolean => {
    const heightValidation = validateIdealWeightHeightOnSubmit(heightCm);
    setHeightTouched(true);
    setHeightError(heightValidation);
    if (mode === "quick" && !selectedMethod) {
      setMethodError("Sélectionnez une méthode.");
      return false;
    }
    setMethodError(null);
    return !heightValidation;
  }, [heightCm, mode, selectedMethod]);

  const handleSubmit = () => {
    if (!validateForm()) return;
    if (mode === "quick") {
      shouldScrollToEstimation.current = true;
      setSubmittedQuick(true);
    } else {
      shouldScrollToComparison.current = true;
      setSubmittedCompare(true);
    }
  };

  const changeMode = useCallback((nextMode: CalculatorMode) => {
    setMode(nextMode);
    if (nextMode === "compare" && inputsValid) {
      setSubmittedCompare(true);
    }
  }, [inputsValid]);

  const handleCompareFromQuickResult = () => {
    if (!inputsValid) return;
    setMode("compare");
    setSubmittedCompare(true);
    shouldScrollToComparison.current = true;
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

  const handleCopy = async () => {
    if (!compareResult) return;
    try {
      await navigator.clipboard.writeText(buildCopyText(compareResult));
      setCopyCopied(true);
      window.setTimeout(() => setCopyCopied(false), 2000);
    } catch {
      setCopyCopied(false);
    }
  };

  const submitDisabled =
    !heightCm.trim() || (heightTouched && Boolean(heightError)) || (mode === "quick" && !selectedMethod);

  const panelId = mode === "quick" ? quickPanelId : comparePanelId;
  const tabId = mode === "quick" ? quickTabId : compareTabId;
  const cardTitle = mode === "quick" ? POIDS_IDEAL_QUICK_TITLE : POIDS_IDEAL_COMPARE_TITLE;
  const cardIntro = mode === "quick" ? POIDS_IDEAL_QUICK_INTRO : POIDS_IDEAL_COMPARE_INTRO;
  const keepInMind = mode === "quick" ? POIDS_IDEAL_QUICK_KEEP_IN_MIND : POIDS_IDEAL_COMPARE_KEEP_IN_MIND;

  return (
    <div className="pi-calc calc-root">
      <h2 className="sr-only">Calculer son poids idéal</h2>

      <div className="pi-quick">
        <div className="pi-quick__card">
          <header className="pi-quick__header">
            <h2 className="pi-quick__title">{cardTitle}</h2>
            <p className="pi-quick__intro">{cardIntro}</p>
          </header>

          <ModeTabs
            mode={mode}
            quickTabId={quickTabId}
            compareTabId={compareTabId}
            quickPanelId={quickPanelId}
            comparePanelId={comparePanelId}
            tabRefs={tabRefs}
            onTabKeyDown={handleTabKeyDown}
            onModeChange={(nextMode) => changeMode(nextMode)}
          />

          <div role="tabpanel" id={panelId} aria-labelledby={tabId} className="pi-quick__panel">
            <UserInfoStep
              sex={sex}
              onSexChange={setSex}
              heightCm={heightCm}
              heightError={heightError}
              heightTouched={heightTouched}
              heightValid={heightValid}
              onHeightChange={handleHeightChange}
              onHeightBlur={handleHeightBlur}
            />

            {mode === "quick" ? (
              <QuickModePanel
                sex={sex}
                selectedMethod={selectedMethod}
                onMethodChange={(methodId) => {
                  setSelectedMethod(methodId);
                  setMethodError(null);
                }}
                methodError={methodError}
                submitDisabled={submitDisabled}
                onSubmit={handleSubmit}
                submittedQuick={submittedQuick}
                quickResult={quickResult}
                parsedHeight={parsedHeight}
                estimationResultRef={estimationResultRef}
                onCompareWithOthers={handleCompareFromQuickResult}
              />
            ) : (
              <>
                <button
                  type="button"
                  className="pi-quick__submit"
                  disabled={submitDisabled}
                  onClick={handleSubmit}
                >
                  <IconCompare className="pi-quick__submit-icon" />
                  Comparer les méthodes
                  <span className="pi-quick__submit-arrow" aria-hidden="true">
                    →
                  </span>
                </button>

                {submittedCompare && compareResult ? (
                  <CompareModePanel
                    comparison={compareResult}
                    expandedMethod={expandedMethod}
                    setExpandedMethod={setExpandedMethod}
                    comparisonResultsStartRef={comparisonResultsStartRef}
                    copyCopied={copyCopied}
                    onCopy={handleCopy}
                  />
                ) : null}
              </>
            )}
          </div>

          <EducationalNotice paragraphs={keepInMind} />
        </div>
      </div>

      <ul className="pi-calc__guides">
        {POIDS_IDEAL_CALCULATOR_LINKS.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
