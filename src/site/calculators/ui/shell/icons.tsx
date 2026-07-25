export function IconCheck({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M2.5 7.5L5.5 10.5L11.5 3.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconAlert({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M7 4.5V7.5M7 9.5H7.01M6 1.5H8L12.5 11.5H1.5L6 1.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconRuler({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="14" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 8V11M8 7.5V10.5M11 8V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconWeight({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M5 7.5C5 5.567 6.567 4 8.5 4H9.5C11.433 4 13 5.567 13 7.5V8H5V7.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 8H14.5L13.5 14H4.5L3.5 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M7 11H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconCalc({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5.5 6H12.5M5.5 9H8.5M5.5 12H10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconInfo({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.75" />
      <path d="M10 9V14M10 6.5V6.51" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function IconCopy({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="6" y="6" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4 12V4.5A1.5 1.5 0 0 1 5.5 3H12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconShare({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="13.5" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="4.5" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="13.5" cy="13.5" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.2 8.1L11.8 5.4M6.2 9.9L11.8 12.6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconReset({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M3.5 9a5.5 5.5 0 0 1 9.3-3.9M14.5 9a5.5 5.5 0 0 1-9.3 3.9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M12.5 3.5H14.5V5.5M5.5 14.5H3.5V12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
