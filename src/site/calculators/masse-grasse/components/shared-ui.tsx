"use client";

import type { KeyboardEvent, MutableRefObject, RefObject } from "react";
import { useState } from "react";
import type { BodyFatSex } from "../types";
import {
  IconAlert,
  IconCheck,
  IconCompare,
  IconInfo,
  IconRuler,
} from "../../poids-ideal/components/shared-ui";
import {
  MASSE_GRASSE_AGE_LABEL,
  MASSE_GRASSE_COMPARE_MEASURES_TITLE,
  MASSE_GRASSE_HEIGHT_LABEL,
  MASSE_GRASSE_PERSONALIZED_TAB_DESC,
  MASSE_GRASSE_QUICK_KEEP_IN_MIND_TITLE,
  MASSE_GRASSE_QUICK_TAB_DESC,
  MASSE_GRASSE_COMPARE_TAB_DESC,
  MASSE_GRASSE_SEX_HELP,
  MASSE_GRASSE_SEX_LABEL,
  MASSE_GRASSE_WAIST_HELP,
  MASSE_GRASSE_WAIST_LABEL,
  MASSE_GRASSE_WAIST_MEASURE_DETAILS,
  MASSE_GRASSE_WAIST_MEASURE_TITLE,
  MASSE_GRASSE_WEIGHT_LABEL,
} from "../presentation";
import {
  MASSE_GRASSE_COMPARE_STEP1_HELP,
  MASSE_GRASSE_COMPARE_STEP2_HELP,
  MASSE_GRASSE_PERSONALIZED_STEP1_HELP,
  MASSE_GRASSE_QUICK_STEP1_HELP,
} from "../method-science-copy";
import { MEASURE_FIELD_META, getOptionalCompareMeasureFields } from "../method-requirements";
import { CircumferenceMeasureField } from "./circumference-measure-field";

export type CalculatorMode = "quick" | "personalized" | "compare";

export {
  IconAlert,
  IconCalc,
  IconCheck,
  IconCompare,
  IconCopy,
  IconInfo,
  IconRuler,
  MethodAccentDot,
} from "../../poids-ideal/components/shared-ui";

function IconWeight({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="3" y="8" width="12" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 8V5.5A3 3 0 0 1 12 5.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconCalendar({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="2.5" y="4" width="13" height="11.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 2.5V5M12 2.5V5M2.5 7.5H15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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

function IconLightning({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M11.5 2L5 11.5H10L8.5 18L15 8.5H10L11.5 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconTapeMeasure({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="8" width="14" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 8V6.5M9 8V6.5M12 8V6.5M15 8V6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function sexLabel(sex: BodyFatSex): string {
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
          id={`mg-quick-step-${step}`}
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
  personalizedTabId,
  compareTabId,
  quickPanelId,
  personalizedPanelId,
  comparePanelId,
  tabRefs,
  onTabKeyDown,
  onModeChange,
}: {
  mode: CalculatorMode;
  quickTabId: string;
  personalizedTabId: string;
  compareTabId: string;
  quickPanelId: string;
  personalizedPanelId: string;
  comparePanelId: string;
  tabRefs: MutableRefObject<Array<HTMLButtonElement | null>>;
  onTabKeyDown: (event: KeyboardEvent<HTMLButtonElement>, index: number) => void;
  onModeChange: (mode: CalculatorMode) => void;
}) {
  const tabs: Array<{
    id: CalculatorMode;
    tabId: string;
    panelId: string;
    title: string;
    desc: string;
    icon: React.ReactNode;
    index: number;
  }> = [
    {
      id: "quick",
      tabId: quickTabId,
      panelId: quickPanelId,
      title: "Estimation rapide",
      desc: MASSE_GRASSE_QUICK_TAB_DESC,
      icon: <IconLightning className="pi-quick__tab-icon" />,
      index: 0,
    },
    {
      id: "personalized",
      tabId: personalizedTabId,
      panelId: personalizedPanelId,
      title: "Estimation personnalisée",
      desc: MASSE_GRASSE_PERSONALIZED_TAB_DESC,
      icon: <IconTapeMeasure className="pi-quick__tab-icon" />,
      index: 1,
    },
    {
      id: "compare",
      tabId: compareTabId,
      panelId: comparePanelId,
      title: "Comparer les méthodes",
      desc: MASSE_GRASSE_COMPARE_TAB_DESC,
      icon: <IconCompare className="pi-quick__tab-icon" />,
      index: 2,
    },
  ];

  return (
    <div role="tablist" aria-label="Mode de calcul de la masse grasse" className="pi-quick__tabs mg-quick__tabs--three">
      {tabs.map((tab) => {
        const active = mode === tab.id;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[tab.index] = el;
            }}
            type="button"
            role="tab"
            id={tab.tabId}
            aria-selected={active}
            aria-controls={tab.panelId}
            tabIndex={active ? 0 : -1}
            className={`pi-quick__tab${active ? " pi-quick__tab--active" : ""}`}
            onClick={() => onModeChange(tab.id)}
            onKeyDown={(event) => onTabKeyDown(event, tab.index)}
          >
            {active ? (
              <span className="pi-quick__tab-check" aria-hidden="true">
                <IconCheck />
              </span>
            ) : null}
            {tab.icon}
            <span className="pi-quick__tab-content">
              <span className="pi-quick__tab-title-row">
                <span className="pi-quick__tab-title">{tab.title}</span>
                {active ? <span className="pi-quick__tab-selected-badge">Sélectionné</span> : null}
              </span>
              <span className="pi-quick__tab-desc">{tab.desc}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function NumericField({
  id,
  name,
  label,
  labelIcon,
  unit,
  placeholder,
  value,
  error,
  touched,
  valid,
  errorId,
  onChange,
  onBlur,
}: {
  id: string;
  name: string;
  label: string;
  labelIcon: React.ReactNode;
  unit: string;
  placeholder: string;
  value: string;
  error: string | null;
  touched: boolean;
  valid: boolean;
  errorId: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}) {
  return (
    <div className="pi-quick__height-block">
      <label htmlFor={id} className="pi-quick__field-label">
        {labelIcon}
        {label}
      </label>
      <div
        className={`pi-quick__height-wrap${touched && error ? " pi-quick__height-wrap--error" : ""}${valid ? " pi-quick__height-wrap--valid" : ""}`}
      >
        <input
          id={id}
          name={name}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          className="pi-quick__height-input"
          aria-invalid={touched && error ? true : undefined}
          aria-describedby={touched && error ? errorId : undefined}
        />
        <span className="pi-quick__height-unit" aria-hidden="true">
          {unit}
        </span>
        {valid ? (
          <span className="pi-quick__height-valid" aria-hidden="true">
            <IconCheck />
          </span>
        ) : null}
        {touched && error ? (
          <span className="pi-quick__height-error-icon" aria-hidden="true">
            <IconAlert />
          </span>
        ) : null}
      </div>
      {touched && error ? (
        <p id={errorId} className="pi-quick__field-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function UserInfoStep({
  variant,
  sex,
  onSexChange,
  ageYears,
  ageError,
  ageTouched,
  ageValid,
  onAgeChange,
  onAgeBlur,
  heightCm,
  heightError,
  heightTouched,
  heightValid,
  onHeightChange,
  onHeightBlur,
  weightKg,
  weightError,
  weightTouched,
  weightValid,
  onWeightChange,
  onWeightBlur,
  waistCm,
  waistError,
  waistTouched,
  waistValid,
  onWaistChange,
  onWaistBlur,
}: {
  variant: "quick" | "personalized" | "compare";
  sex: BodyFatSex;
  onSexChange: (sex: BodyFatSex) => void;
  ageYears: string;
  ageError: string | null;
  ageTouched: boolean;
  ageValid: boolean;
  onAgeChange: (value: string) => void;
  onAgeBlur: () => void;
  heightCm: string;
  heightError: string | null;
  heightTouched: boolean;
  heightValid: boolean;
  onHeightChange: (value: string) => void;
  onHeightBlur: () => void;
  weightKg: string;
  weightError: string | null;
  weightTouched: boolean;
  weightValid: boolean;
  onWeightChange: (value: string) => void;
  onWeightBlur: () => void;
  waistCm: string;
  waistError: string | null;
  waistTouched: boolean;
  waistValid: boolean;
  onWaistChange: (value: string) => void;
  onWaistBlur: () => void;
}) {
  const [waistMeasureOpen, setWaistMeasureOpen] = useState(false);
  const stepTitle = variant === "personalized" ? "Vos mensurations" : "Vos informations";
  const stepHelp =
    variant === "personalized"
      ? MASSE_GRASSE_PERSONALIZED_STEP1_HELP
      : variant === "compare"
        ? MASSE_GRASSE_COMPARE_STEP1_HELP
        : MASSE_GRASSE_QUICK_STEP1_HELP;

  return (
    <section className="pi-quick__step" aria-labelledby="mg-quick-step-1">
      <StepHeader step={1} title={stepTitle} help={stepHelp} />
      <fieldset className="pi-quick__info-grid mg-quick__info-grid">
        <legend className="sr-only">Informations pour le calcul</legend>
        <div className="pi-quick__sex-block">
          <span className="pi-quick__field-label" id="mg-quick-sex-label">
            {MASSE_GRASSE_SEX_LABEL}
          </span>
          <p className="pi-quick__sex-help">{MASSE_GRASSE_SEX_HELP}</p>
          <div className="pi-quick__sex-options" role="radiogroup" aria-labelledby="mg-quick-sex-label">
            {(["male", "female"] as const).map((option) => {
              const checked = sex === option;
              return (
                <label
                  key={option}
                  className={`pi-quick__sex-card${checked ? " pi-quick__sex-card--selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="body-fat-sex"
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
        <div className="mg-quick__metrics">
          {variant !== "personalized" ? (
            <NumericField
              id="body-fat-age"
              name="bodyFatAgeYears"
              label={MASSE_GRASSE_AGE_LABEL}
              labelIcon={<IconCalendar className="pi-quick__height-label-icon" />}
              unit="ans"
              placeholder="35"
              value={ageYears}
              error={ageError}
              touched={ageTouched}
              valid={ageValid}
              errorId="body-fat-age-error"
              onChange={onAgeChange}
              onBlur={onAgeBlur}
            />
          ) : null}
          <NumericField
            id="body-fat-height"
            name="bodyFatHeightCm"
            label={MASSE_GRASSE_HEIGHT_LABEL}
            labelIcon={<IconRuler className="pi-quick__height-label-icon" />}
            unit="cm"
            placeholder="170"
            value={heightCm}
            error={heightError}
            touched={heightTouched}
            valid={heightValid}
            errorId="body-fat-height-error"
            onChange={onHeightChange}
            onBlur={onHeightBlur}
          />
          {variant === "quick" || variant === "compare" ? (
            <NumericField
              id="body-fat-weight"
              name="bodyFatWeightKg"
              label={MASSE_GRASSE_WEIGHT_LABEL}
              labelIcon={<IconWeight className="pi-quick__height-label-icon" />}
              unit="kg"
              placeholder="70"
              value={weightKg}
              error={weightError}
              touched={weightTouched}
              valid={weightValid}
              errorId="body-fat-weight-error"
              onChange={onWeightChange}
              onBlur={onWeightBlur}
            />
          ) : null}
          {variant === "personalized" || variant === "compare" ? (
            <div className="mg-quick__waist-block">
              <CircumferenceMeasureField
                layout="stacked"
                fieldKey="waistCm"
                id="body-fat-waist"
                name="bodyFatWaistCm"
                label={MASSE_GRASSE_WAIST_LABEL}
                labelIcon={<IconRuler className="pi-quick__height-label-icon" />}
                unit="cm"
                placeholder={MEASURE_FIELD_META.waistCm.placeholder}
                value={waistCm}
                error={waistError}
                touched={waistTouched}
                valid={waistValid}
                errorId="body-fat-waist-error"
                onChange={onWaistChange}
                onBlur={onWaistBlur}
                helpText={variant === "personalized" ? MASSE_GRASSE_WAIST_HELP : undefined}
              >
                {variant === "personalized" ? (
                  <>
                    <button
                      type="button"
                      className="mg-quick__measure-toggle"
                      aria-expanded={waistMeasureOpen}
                      aria-controls="mg-waist-measure-details"
                      onClick={() => setWaistMeasureOpen((open) => !open)}
                    >
                      {MASSE_GRASSE_WAIST_MEASURE_TITLE}
                    </button>
                    {waistMeasureOpen ? (
                      <p id="mg-waist-measure-details" className="mg-quick__measure-details">
                        {MASSE_GRASSE_WAIST_MEASURE_DETAILS}
                      </p>
                    ) : null}
                  </>
                ) : null}
              </CircumferenceMeasureField>
            </div>
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
        <h3 className="pi-quick__keep-in-mind-title">{MASSE_GRASSE_QUICK_KEEP_IN_MIND_TITLE}</h3>
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </aside>
  );
}

export function CompareOptionalMeasuresStep({
  sex,
  compareBaseValid,
  neckValid,
  hipValid,
  neckCm,
  neckError,
  neckTouched,
  onNeckChange,
  onNeckBlur,
  hipCm,
  hipError,
  hipTouched,
  onHipChange,
  onHipBlur,
}: {
  sex: BodyFatSex;
  compareBaseValid: boolean;
  neckValid: boolean;
  hipValid: boolean;
  neckCm: string;
  neckError: string | null;
  neckTouched: boolean;
  onNeckChange: (value: string) => void;
  onNeckBlur: () => void;
  hipCm: string;
  hipError: string | null;
  hipTouched: boolean;
  onHipChange: (value: string) => void;
  onHipBlur: () => void;
}) {
  if (!compareBaseValid) return null;

  const fields = getOptionalCompareMeasureFields(sex);

  return (
    <section className="pi-quick__step mg-quick__measures-step" aria-labelledby="mg-quick-measures-title">
      <StepHeader
        step={2}
        title={MASSE_GRASSE_COMPARE_MEASURES_TITLE}
        help={MASSE_GRASSE_COMPARE_STEP2_HELP}
      />
      <div className="mg-quick__measures">
        {fields.map((fieldKey) => {
          const meta = MEASURE_FIELD_META[fieldKey];
          const isNeck = fieldKey === "neckCm";
          const values = isNeck
            ? {
                value: neckCm,
                error: neckError,
                touched: neckTouched,
                onChange: onNeckChange,
                onBlur: onNeckBlur,
                valid: Boolean(neckCm.trim()) && neckValid,
              }
            : {
                value: hipCm,
                error: hipError,
                touched: hipTouched,
                onChange: onHipChange,
                onBlur: onHipBlur,
                valid: Boolean(hipCm.trim()) && hipValid,
              };

          return (
            <div key={fieldKey} className="mg-quick__measure-field">
              <CircumferenceMeasureField
                layout="inline"
                fieldKey={fieldKey}
                id={`body-fat-${fieldKey}`}
                name={`bodyFat${fieldKey}`}
                label={meta.label}
                labelIcon={<IconRuler className="pi-quick__height-label-icon" />}
                unit={meta.unit}
                placeholder={meta.placeholder}
                value={values.value}
                error={values.error}
                touched={values.touched}
                valid={values.valid}
                errorId={`body-fat-${fieldKey}-error`}
                onChange={values.onChange}
                onBlur={values.onBlur}
                helpText={meta.help}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

/** @deprecated Utiliser CompareOptionalMeasuresStep. */
export function CompareMeasuresStep(
  props: Parameters<typeof CompareOptionalMeasuresStep>[0] & {
    baseFieldsValid: boolean;
    waistValid: boolean;
    waistCm: string;
    waistError: string | null;
    waistTouched: boolean;
    onWaistChange: (value: string) => void;
    onWaistBlur: () => void;
  },
) {
  const { baseFieldsValid, ...rest } = props;
  return <CompareOptionalMeasuresStep {...rest} compareBaseValid={baseFieldsValid} />;
}
