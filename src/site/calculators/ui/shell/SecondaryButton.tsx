import type { ReactNode } from "react";

export function SecondaryButton({
  children,
  onClick,
  icon,
  disabled,
  className,
}: {
  children: ReactNode;
  onClick: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={className ?? "calc-shell__secondary-btn"}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {children}
    </button>
  );
}
