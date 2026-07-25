import type { ReactNode } from "react";

interface ResultSectionProps {
  ariaLabel: string;
  children: ReactNode;
}

export function ResultSection({ ariaLabel, children }: ResultSectionProps) {
  return (
    <div
      className="calc-ui__results imc-calc__results"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-atomic="true"
    >
      {children}
    </div>
  );
}

interface ResultPlaceholderProps {
  label: string;
  message: string;
}

export function ResultPlaceholder({ label, message }: ResultPlaceholderProps) {
  return (
    <div className="calc-ui__result-card">
      <p className="calc-ui__result-label">{label}</p>
      <p className="calc-ui__result-value">{message}</p>
    </div>
  );
}
