import type { ReactNode } from "react";

interface ResultCardProps {
  variant?: "default" | "primary";
  label?: string;
  value?: string;
  badge?: string;
  children?: ReactNode;
}

export function ResultCard({ variant = "default", label, value, badge, children }: ResultCardProps) {
  return (
    <div
      className={[
        "calc-ui__result-card",
        variant === "primary" ? "calc-ui__result-card--primary" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label ? <p className="calc-ui__result-label">{label}</p> : null}
      {value ? <p className="calc-ui__result-value">{value}</p> : null}
      {badge ? <span className="calc-ui__result-badge">{badge}</span> : null}
      {children}
    </div>
  );
}

interface ResultTextProps {
  paragraphs: string[];
}

export function ResultText({ paragraphs }: ResultTextProps) {
  return (
    <ResultCard>
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="calc-ui__result-text">
          {paragraph}
        </p>
      ))}
    </ResultCard>
  );
}
