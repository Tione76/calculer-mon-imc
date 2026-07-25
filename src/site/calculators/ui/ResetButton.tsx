interface ResetButtonProps {
  label?: string;
  onClick: () => void;
}

export function ResetButton({ label = "Réinitialiser", onClick }: ResetButtonProps) {
  return (
    <div className="calc-col-actions imc-calc__actions">
      <button type="button" className="calc-ui__reset imc-calc__reset" onClick={onClick}>
        {label}
      </button>
    </div>
  );
}
