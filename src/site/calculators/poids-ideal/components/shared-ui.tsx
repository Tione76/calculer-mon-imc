"use client";

import type { CSSProperties, KeyboardEvent, MutableRefObject, RefObject } from "react";
import type { IdealWeightSex } from "../constants";
import {
  POIDS_IDEAL_HEIGHT_LABEL,
  POIDS_IDEAL_QUICK_KEEP_IN_MIND_TITLE,
  POIDS_IDEAL_SEX_HELP,
  POIDS_IDEAL_SEX_LABEL,
} from "../presentation";

export type CalculatorMode = "quick" | "compare";

export function IconCheck({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconAlert({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 4.5V7.5M7 9.5H7.01M6 1.5H8L12.5 11.5H1.5L6 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconRuler({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="14" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 8V11M8 7.5V10.5M11 8V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconSingleResult({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <path d="M7 14L10 10L13 12L16 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCompare({ className }: { className?: string }) {
  const classes = className ? `compare-icon ${className}` : "compare-icon";

  return (
    <svg
      className={classes}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m21 16-4 4-4-4"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 20V4"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m3 8 4-4 4 4"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 4v16"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconCalc({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 6H12.5M5.5 9H8.5M5.5 12H10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconInfo({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.75" />
      <path d="M10 9V14M10 6.5V6.51" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function IconCopy({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="6" y="6" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 12V4.5A1.5 1.5 0 0 1 5.5 3H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconMale({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="8" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11.5 8.5L16 4M16 4H12.5M16 4V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconFemale({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 12V17M7.5 14.5H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function sexLabel(sex: IdealWeightSex): string {
  return sex === "male" ? "Homme" : "Femme";
}

export function StepHeader({
  step,
  title,
  help,
  titleRef,
}: {
  step: number;
  title: string;
  help: string;
  titleRef?: RefObject<HTMLHeadingElement | null>;
}) {
  return (
    <header className="pi-quick__step-header">
      <div className="pi-quick__step-badge" aria-hidden="true">
        {step}
      </div>
      <div className="pi-quick__step-text">
        <h3
          className="pi-quick__step-title"
          ref={titleRef}
          id={`pi-quick-step-${step}`}
          tabIndex={titleRef ? -1 : undefined}
        >
          {title}
        </h3>
        <p className="pi-quick__step-help">{help}</p>
      </div>
    </header>
  );
}

export function ModeTabs({
  mode,
  quickTabId,
  compareTabId,
  quickPanelId,
  comparePanelId,
  tabRefs,
  onTabKeyDown,
  onModeChange,
}: {
  mode: CalculatorMode;
  quickTabId: string;
  compareTabId: string;
  quickPanelId: string;
  comparePanelId: string;
  tabRefs: MutableRefObject<Array<HTMLButtonElement | null>>;
  onTabKeyDown: (event: KeyboardEvent<HTMLButtonElement>, index: number) => void;
  onModeChange: (mode: CalculatorMode) => void;
}) {
  const quickActive = mode === "quick";
  const compareActive = mode === "compare";

  return (
    <div role="tablist" aria-label="Mode de calcul du poids idéal" className="pi-quick__tabs">
      <button
        ref={(el) => {
          tabRefs.current[0] = el;
        }}
        type="button"
        role="tab"
        id={quickTabId}
        aria-selected={quickActive}
        aria-controls={quickPanelId}
        tabIndex={quickActive ? 0 : -1}
        className={`pi-quick__tab${quickActive ? " pi-quick__tab--active" : ""}`}
        onClick={() => onModeChange("quick")}
        onKeyDown={(event) => onTabKeyDown(event, 0)}
      >
        {quickActive ? (
          <span className="pi-quick__tab-check" aria-hidden="true">
            <IconCheck />
          </span>
        ) : null}
        <IconSingleResult className="pi-quick__tab-icon" />
        <span className="pi-quick__tab-content">
          <span className="pi-quick__tab-title-row">
            <span className="pi-quick__tab-title">Estimation rapide</span>
            {quickActive ? <span className="pi-quick__tab-selected-badge">Sélectionné</span> : null}
          </span>
          <span className="pi-quick__tab-desc">Une méthode, un résultat immédiat.</span>
        </span>
      </button>
      <button
        ref={(el) => {
          tabRefs.current[1] = el;
        }}
        type="button"
        role="tab"
        id={compareTabId}
        aria-selected={compareActive}
        aria-controls={comparePanelId}
        tabIndex={compareActive ? 0 : -1}
        className={`pi-quick__tab${compareActive ? " pi-quick__tab--active" : ""}`}
        onClick={() => onModeChange("compare")}
        onKeyDown={(event) => onTabKeyDown(event, 1)}
      >
        {compareActive ? (
          <span className="pi-quick__tab-check" aria-hidden="true">
            <IconCheck />
          </span>
        ) : null}
        <IconCompare className="pi-quick__tab-icon" />
        <span className="pi-quick__tab-content">
          <span className="pi-quick__tab-title-row">
            <span className="pi-quick__tab-title">Comparer les méthodes</span>
            {compareActive ? <span className="pi-quick__tab-selected-badge">Sélectionné</span> : null}
          </span>
          <span className="pi-quick__tab-desc">Visualisez plusieurs formules dans une même synthèse.</span>
        </span>
      </button>
    </div>
  );
}

export function UserInfoStep({
  sex,
  onSexChange,
  heightCm,
  heightError,
  heightTouched,
  heightValid,
  onHeightChange,
  onHeightBlur,
}: {
  sex: IdealWeightSex;
  onSexChange: (sex: IdealWeightSex) => void;
  heightCm: string;
  heightError: string | null;
  heightTouched: boolean;
  heightValid: boolean;
  onHeightChange: (value: string) => void;
  onHeightBlur: () => void;
}) {
  const heightErrorId = "ideal-weight-height-error";

  return (
    <section className="pi-quick__step" aria-labelledby="pi-quick-step-1">
      <StepHeader
        step={1}
        title="Vos informations"
        help="Renseignez les données nécessaires à la formule."
      />
      <fieldset className="pi-quick__info-grid">
        <legend className="sr-only">Informations pour le calcul</legend>
        <div className="pi-quick__sex-block">
          <span className="pi-quick__field-label" id="pi-quick-sex-label">
            {POIDS_IDEAL_SEX_LABEL}
          </span>
          <p className="pi-quick__sex-help">{POIDS_IDEAL_SEX_HELP}</p>
          <div className="pi-quick__sex-options" role="radiogroup" aria-labelledby="pi-quick-sex-label">
            {(["male", "female"] as const).map((option) => {
              const checked = sex === option;
              return (
                <label
                  key={option}
                  className={`pi-quick__sex-card${checked ? " pi-quick__sex-card--selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="ideal-weight-sex"
                    value={option}
                    checked={checked}
                    onChange={() => onSexChange(option)}
                  />
                  {checked ? (
                    <span className="pi-quick__sex-check" aria-hidden="true">
                      <IconCheck />
                    </span>
                  ) : null}
                  {option === "male" ? (
                    <IconMale className="pi-quick__sex-icon" />
                  ) : (
                    <IconFemale className="pi-quick__sex-icon" />
                  )}
                  <span className="pi-quick__sex-label">{sexLabel(option)}</span>
                  {checked ? <span className="sr-only">, sélectionné</span> : null}
                </label>
              );
            })}
          </div>
        </div>
        <div className="pi-quick__height-block">
          <label htmlFor="ideal-weight-height" className="pi-quick__field-label">
            <IconRuler className="pi-quick__height-label-icon" />
            {POIDS_IDEAL_HEIGHT_LABEL}
          </label>
          <div
            className={`pi-quick__height-wrap${heightTouched && heightError ? " pi-quick__height-wrap--error" : ""}${heightValid ? " pi-quick__height-wrap--valid" : ""}`}
          >
            <input
              id="ideal-weight-height"
              name="idealWeightHeightCm"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="170"
              value={heightCm}
              onChange={(event) => onHeightChange(event.target.value)}
              onBlur={onHeightBlur}
              className="pi-quick__height-input"
              aria-invalid={heightTouched && heightError ? true : undefined}
              aria-describedby={heightTouched && heightError ? heightErrorId : undefined}
            />
            <span className="pi-quick__height-unit" aria-hidden="true">
              cm
            </span>
            {heightValid ? (
              <span className="pi-quick__height-valid" aria-hidden="true">
                <IconCheck />
              </span>
            ) : null}
            {heightTouched && heightError ? (
              <span className="pi-quick__height-error-icon" aria-hidden="true">
                <IconAlert />
              </span>
            ) : null}
          </div>
          {heightTouched && heightError ? (
            <p id={heightErrorId} className="pi-quick__field-error" role="alert">
              {heightError}
            </p>
          ) : null}
        </div>
      </fieldset>
    </section>
  );
}

export function EducationalNotice({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <aside className="pi-quick__keep-in-mind">
      <IconInfo className="pi-quick__keep-in-mind-icon" />
      <div className="pi-quick__keep-in-mind-body">
        <h3 className="pi-quick__keep-in-mind-title">{POIDS_IDEAL_QUICK_KEEP_IN_MIND_TITLE}</h3>
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </aside>
  );
}

export function MethodAccentDot({
  methodId,
  accent,
  className,
}: {
  methodId: string;
  accent: string;
  className?: string;
}) {
  return (
    <span
      className={className ?? "pi-compare__method-dot"}
      style={{ backgroundColor: accent } as CSSProperties}
      aria-hidden="true"
      data-method={methodId}
    />
  );
}
