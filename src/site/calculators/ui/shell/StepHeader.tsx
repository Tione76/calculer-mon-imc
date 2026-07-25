import type { RefObject } from "react";

export function StepHeader({
  step,
  title,
  help,
  titleRef,
  idPrefix = "calc-shell",
}: {
  step: number;
  title: string;
  help: string;
  titleRef?: RefObject<HTMLHeadingElement | null>;
  idPrefix?: string;
}) {
  return (
    <header className="calc-shell__step-header">
      <div className="calc-shell__step-badge" aria-hidden="true">
        {step}
      </div>
      <div className="calc-shell__step-text">
        <h3
          className="calc-shell__step-title"
          ref={titleRef}
          id={`${idPrefix}-step-${step}`}
          tabIndex={titleRef ? -1 : undefined}
        >
          {title}
        </h3>
        <p className="calc-shell__step-help">{help}</p>
      </div>
    </header>
  );
}
