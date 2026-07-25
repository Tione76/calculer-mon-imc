import type { ReactNode } from "react";

export function SubmitButton({
  children,
  disabled,
  onClick,
  icon,
}: {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
  icon?: ReactNode;
}) {
  return (
    <button type="button" className="calc-shell__submit" disabled={disabled} onClick={onClick}>
      {icon ? <span className="calc-shell__submit-icon">{icon}</span> : null}
      {children}
      <span className="calc-shell__submit-arrow" aria-hidden="true">
        →
      </span>
    </button>
  );
}
