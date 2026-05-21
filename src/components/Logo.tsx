export function Logo({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect x="4" y="4" width="32" height="32" rx="10" fill="oklch(0.65 0.18 230)" />
      <path
        d="M12 28V12l8 10 8-10v16"
        fill="none"
        stroke="oklch(0.13 0.01 260)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
