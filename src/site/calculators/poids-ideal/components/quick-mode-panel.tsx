"use client";

import type { CSSProperties, RefObject } from "react";
import type { IdealWeightMethodId, IdealWeightSex } from "../constants";
import type { IdealWeightMethodResult } from "../engine";
import { formatDecimalFr } from "../../format/number";
import { roundIdealWeightKg } from "../format";
import { IDEAL_WEIGHT_METHODS } from "../methods";
import { getMethodTheme } from "../method-theme";
import { POIDS_IDEAL_LORENTZ_DEFAULT_NOTE } from "../presentation";
import {
  IconAlert,
  IconCalc,
  IconCheck,
  IconCompare,
  StepHeader,
} from "./shared-ui";

function sexArticle(sex: IdealWeightSex): string {
  return sex === "male" ? "un homme" : "une femme";
}

function QuickResultSection({
  result,
  sex,
  heightCm,
  onCompare,
  sectionRef,
}: {
  result: IdealWeightMethodResult;
  sex: IdealWeightSex;
  heightCm: number;
  onCompare: () => void;
  sectionRef: RefObject<HTMLElement | null>;
}) {
  if (result.status !== "ok") {
    return (
      <section
        ref={sectionRef}
        className="pi-quick__step pi-calc__estimation-result-step"
        aria-labelledby="pi-quick-step-3"
      >
        <StepHeader step={3} title="Votre estimation" help="Consultez le résultat de la méthode choisie." />
        <div className="pi-quick__result-card pi-quick__result-card--error">
          <p className="pi-quick__result-message">{result.statusMessage}</p>
        </div>
      </section>
    );
  }

  const theme = getMethodTheme(result.methodId);
  const weightValue = formatDecimalFr(roundIdealWeightKg(result.weightKgRaw), 1);

  return (
    <section
      ref={sectionRef}
      className="pi-quick__step pi-calc__estimation-result-step"
      aria-labelledby="pi-quick-step-3"
    >
      <StepHeader step={3} title="Votre estimation" help="Consultez le résultat de la méthode choisie." />
      <div
        className="pi-quick__result-card"
        style={
          {
            "--pi-method-accent": theme.accent,
            "--pi-method-accent-dark": theme.accentDark,
            "--pi-method-light": theme.light,
          } as CSSProperties
        }
      >
        <div className="pi-quick__result-top">
          <p className="pi-quick__result-heading">Estimation selon la formule de {result.method.name}</p>
          <span className="pi-quick__result-method-badge">Méthode {result.method.name}</span>
        </div>
        <p className="pi-quick__result-value" aria-label={`${weightValue} kilogrammes`}>
          <span className="pi-quick__result-number">{weightValue}</span>
          <span className="pi-quick__result-unit"> kg</span>
        </p>
        <p className="pi-quick__result-context">
          Pour {sexArticle(sex)} mesurant {heightCm} cm.
        </p>
        <p className="pi-quick__result-summary">
          La méthode {result.method.name} donne ici une estimation de référence de{" "}
          <strong>{weightValue} kg</strong>.
        </p>
        <p className="pi-quick__result-summary-note">
          D&apos;autres méthodes peuvent donner un résultat légèrement différent. Ces écarts sont normaux.
        </p>
        <p className="pi-quick__result-disclaimer">
          Cette valeur est une estimation théorique. Elle ne constitue ni un objectif obligatoire ni une
          recommandation médicale.
        </p>
        <div className="pi-quick__formula-block">
          <div className="pi-quick__formula-head">
            <IconCalc className="pi-quick__formula-icon" />
            <span className="pi-quick__formula-label">Formule utilisée</span>
          </div>
          <code className="pi-quick__formula-code">{result.formulaLabel}</code>
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
  sex,
  selectedMethod,
  onMethodChange,
  methodError,
  submitDisabled,
  onSubmit,
  submittedQuick,
  quickResult,
  parsedHeight,
  onCompareWithOthers,
  estimationResultRef,
}: {
  sex: IdealWeightSex;
  selectedMethod: IdealWeightMethodId;
  onMethodChange: (id: IdealWeightMethodId) => void;
  methodError: string | null;
  submitDisabled: boolean;
  onSubmit: () => void;
  submittedQuick: boolean;
  quickResult: IdealWeightMethodResult | null;
  parsedHeight: number | null;
  onCompareWithOthers: () => void;
  estimationResultRef: RefObject<HTMLElement | null>;
}) {
  return (
    <>
      <section className="pi-quick__step" aria-labelledby="pi-quick-step-2">
        <StepHeader
          step={2}
          title="Choisissez une méthode"
          help="Chaque formule donne une estimation légèrement différente."
        />
        <fieldset className="pi-quick__methods-fieldset">
          <legend className="sr-only">Méthode d&apos;estimation</legend>
          <div className="pi-quick__methods">
            {IDEAL_WEIGHT_METHODS.map((method) => {
              const theme = getMethodTheme(method.id);
              const checked = selectedMethod === method.id;
              return (
                <label
                  key={method.id}
                  className={`pi-quick__method-card pi-quick__method-card--${method.id}${checked ? " pi-quick__method-card--selected" : ""}`}
                  style={
                    {
                      "--pi-method-accent": theme.accent,
                      "--pi-method-light": theme.light,
                    } as CSSProperties
                  }
                >
                  <input
                    type="radio"
                    name="ideal-weight-method"
                    value={method.id}
                    checked={checked}
                    onChange={() => onMethodChange(method.id)}
                  />
                  {checked ? (
                    <span className="pi-quick__method-check" aria-hidden="true">
                      <IconCheck />
                    </span>
                  ) : null}
                  <span className="pi-quick__method-dot" style={{ backgroundColor: theme.accent }} aria-hidden="true" />
                  <span className="pi-quick__method-name">{method.name}</span>
                  {checked ? <span className="pi-quick__method-selected-badge">Sélectionnée</span> : null}
                  <span className="pi-quick__method-desc">{method.shortDescription}</span>
                  <span className="pi-quick__method-strength">
                    <IconCheck className="pi-quick__method-strength-icon" />
                    <span>
                      <strong>Point fort</strong>
                      {method.strength}.
                    </span>
                  </span>
                  <span className="pi-quick__method-limit">
                    <IconAlert className="pi-quick__method-limit-icon" />
                    <span>
                      <strong>Limite</strong>
                      {method.limitation}.
                    </span>
                  </span>
                  {checked ? <span className="sr-only">, sélectionnée</span> : null}
                </label>
              );
            })}
          </div>
          {selectedMethod === "lorentz" ? (
            <p className="pi-quick__method-note">{POIDS_IDEAL_LORENTZ_DEFAULT_NOTE}</p>
          ) : null}
          {methodError ? (
            <p className="pi-quick__field-error" role="alert">
              {methodError}
            </p>
          ) : null}
        </fieldset>
      </section>

      <button type="button" className="pi-quick__submit" disabled={submitDisabled} onClick={onSubmit}>
        <IconCalc className="pi-quick__submit-icon" />
        Calculer mon estimation
        <span className="pi-quick__submit-arrow" aria-hidden="true">
          →
        </span>
      </button>

      {submittedQuick && quickResult ? (
        <div className="pi-quick__results" aria-live="polite" aria-atomic="true">
          <QuickResultSection
            result={quickResult}
            sex={sex}
            heightCm={parsedHeight ?? 0}
            onCompare={onCompareWithOthers}
            sectionRef={estimationResultRef}
          />
        </div>
      ) : null}
    </>
  );
}
