import type { ReactNode } from "react";
import { IconAlert, IconCheck } from "./icons";

export function NumericInputField({
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
  onChange,
  onBlur,
}: {
  id: string;
  name: string;
  label: string;
  labelIcon?: ReactNode;
  unit: string;
  placeholder: string;
  value: string;
  error: string | null;
  touched: boolean;
  valid: boolean;
  onChange: (value: string) => void;
  onBlur: () => void;
}) {
  const errorId = `${id}-error`;
  const showError = touched && Boolean(error);

  return (
    <div className="calc-shell__field-block">
      <label htmlFor={id} className="calc-shell__field-label">
        {labelIcon ? <span className="calc-shell__field-label-icon">{labelIcon}</span> : null}
        {label}
      </label>
      <div
        className={`calc-shell__field-wrap${showError ? " calc-shell__field-wrap--error" : ""}${valid ? " calc-shell__field-wrap--valid" : ""}`}
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
          className="calc-shell__field-input"
          aria-invalid={showError ? true : undefined}
          aria-describedby={showError ? errorId : undefined}
        />
        <span className="calc-shell__field-unit" aria-hidden="true">
          {unit}
        </span>
        {valid ? (
          <span className="calc-shell__field-valid" aria-hidden="true">
            <IconCheck />
          </span>
        ) : null}
        {showError ? (
          <span className="calc-shell__field-error-icon" aria-hidden="true">
            <IconAlert />
          </span>
        ) : null}
      </div>
      {showError ? (
        <p id={errorId} className="calc-shell__field-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
