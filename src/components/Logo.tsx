export function Logo({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <defs>
        <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.85 0.2 210)" />
          <stop offset="100%" stopColor="oklch(0.65 0.25 285)" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="14" fill="none" stroke="url(#rg)" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="6" fill="url(#rg)" />
      <circle cx="20" cy="20" r="18" fill="none" stroke="url(#rg)" strokeOpacity="0.3" strokeWidth="0.5" />
    </svg>
  );
}
