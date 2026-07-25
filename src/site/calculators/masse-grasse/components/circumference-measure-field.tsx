"use client";

import type { ReactNode } from "react";
import type { BodyFatMeasureField } from "../method-requirements";
import { IconAlert, IconCheck } from "./shared-ui";
import { MeasureHelpButton } from "./measure-help-button";

function MeasureInput({
  id,
  name,
  unit,
  placeholder,
  value,
  error,
  touched,
  valid,
  errorId,
  onChange,
  onBlur,
  wrapClassName = "",
}: {
  id: string;
  name: string;
  unit: string;
  placeholder: string;
  value: string;
  error: string | null;
  touched: boolean;
  valid: boolean;
  errorId: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  wrapClassName?: string;
}) {
  return (
    <div
      className={`pi-quick__height-wrap${wrapClassName ? ` ${wrapClassName}` : ""}${touched && error ? " pi-quick__height-wrap--error" : ""}${valid ? " pi-quick__height-wrap--valid" : ""}`}
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
  );
}

export function CircumferenceMeasureField({
  layout = "inline",
  fieldKey,
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
  helpText,
  children,
}: {
  layout?: "stacked" | "inline";
  fieldKey: BodyFatMeasureField;
  id: string;
  name: string;
  label: string;
  labelIcon: ReactNode;
  unit: string;
  placeholder: string;
  value: string;
  error: string | null;
  touched: boolean;
  valid: boolean;
  errorId: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  helpText?: string;
  children?: ReactNode;
}) {
  if (layout === "stacked") {
    return (
      <div className="pi-quick__height-block mg-circumference-field mg-circumference-field--stacked">
        <label htmlFor={id} className="pi-quick__field-label mg-circumference-field__label-stacked">
          {labelIcon}
          <span className="mg-circumference-field__label-text">{label}</span>
          <MeasureHelpButton fieldKey={fieldKey} />
        </label>
        <MeasureInput
          id={id}
          name={name}
          unit={unit}
          placeholder={placeholder}
          value={value}
          error={error}
          touched={touched}
          valid={valid}
          errorId={errorId}
          onChange={onChange}
          onBlur={onBlur}
        />
        {touched && error ? (
          <p id={errorId} className="pi-quick__field-error" role="alert">
            {error}
          </p>
        ) : null}
        {helpText ? <p className="mg-quick__measure-help">{helpText}</p> : null}
        {children}
      </div>
    );
  }

  return (
    <div className="mg-circumference-field mg-circumference-field--inline">
      <div className="mg-circumference-field__row">
        <div className="mg-circumference-field__label-col">
          <label htmlFor={id} className="pi-quick__field-label mg-circumference-field__label">
            {labelIcon}
            <span className="mg-circumference-field__label-text">{label}</span>
            <MeasureHelpButton fieldKey={fieldKey} />
          </label>
        </div>
        <div className="mg-circumference-field__control-col">
          <MeasureInput
            id={id}
            name={name}
            unit={unit}
            placeholder={placeholder}
            value={value}
            error={error}
            touched={touched}
            valid={valid}
            errorId={errorId}
            onChange={onChange}
            onBlur={onBlur}
            wrapClassName="mg-circumference-field__input-wrap"
          />
          {touched && error ? (
            <p id={errorId} className="pi-quick__field-error" role="alert">
              {error}
            </p>
          ) : null}
        </div>
      </div>
      {helpText ? <p className="mg-quick__measure-help">{helpText}</p> : null}
      {children}
    </div>
  );
}
