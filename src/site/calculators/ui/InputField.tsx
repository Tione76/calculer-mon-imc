interface InputFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  error?: string | null;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export function InputField({
  id,
  name,
  label,
  value,
  placeholder,
  error,
  onChange,
  onBlur,
}: InputFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className="calc-ui__field imc-calc__field">
      <label htmlFor={id} className="calc-field-label">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className="calc-input"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
      />
      {error ? (
        <p id={errorId} className="calc-field-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
