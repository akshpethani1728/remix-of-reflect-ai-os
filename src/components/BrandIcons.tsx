type IconProps = { className?: string };

export function GoogleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.2c-2 1.5-4.6 2.4-7.3 2.4-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.3-4 5.6l6.3 5.2C41.3 36.4 44 30.7 44 24c0-1.3-.1-2.3-.4-3.5z"/>
    </svg>
  );
}

export function GoogleMapsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#1A73E8" d="M24 4C16 4 9.5 10.4 9.5 18.3c0 11 14.5 25.7 14.5 25.7s14.5-14.7 14.5-25.7C38.5 10.4 32 4 24 4z"/>
      <circle cx="24" cy="18" r="6" fill="#fff"/>
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path fill="#25D366" d="M16 0C7.2 0 0 7.2 0 16c0 2.8.7 5.5 2.1 7.9L0 32l8.4-2.2C10.7 31.2 13.3 32 16 32c8.8 0 16-7.2 16-16S24.8 0 16 0z"/>
      <path fill="#fff" d="M23.5 19.6c-.4-.2-2.3-1.1-2.6-1.2-.3-.1-.6-.2-.8.2-.2.4-.9 1.2-1.1 1.4-.2.2-.4.2-.8 0-.4-.2-1.6-.6-3.1-1.9-1.1-1-1.9-2.2-2.2-2.6-.2-.4 0-.6.2-.8.2-.2.4-.4.6-.6.2-.2.2-.4.4-.6.1-.2.1-.5 0-.7-.1-.2-.8-2-1.2-2.7-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9 0 1.7 1.2 3.4 1.4 3.6.2.2 2.4 3.6 5.8 5 .8.3 1.4.5 1.9.7.8.2 1.5.2 2.1.1.6-.1 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.3-.7-.5z"/>
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <defs>
        <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
          <stop offset="0" stopColor="#fdf497"/>
          <stop offset=".05" stopColor="#fdf497"/>
          <stop offset=".45" stopColor="#fd5949"/>
          <stop offset=".6" stopColor="#d6249f"/>
          <stop offset=".9" stopColor="#285AEB"/>
        </radialGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#ig-grad)"/>
      <rect x="7" y="7" width="18" height="18" rx="5" fill="none" stroke="#fff" strokeWidth="2"/>
      <circle cx="16" cy="16" r="4.2" fill="none" stroke="#fff" strokeWidth="2"/>
      <circle cx="21.2" cy="10.8" r="1.2" fill="#fff"/>
    </svg>
  );
}

export function GBPIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <rect width="48" height="48" rx="10" fill="#fff"/>
      <g transform="translate(8,8) scale(0.667)">
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
        <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.2c-2 1.5-4.6 2.4-7.3 2.4-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.3-4 5.6l6.3 5.2C41.3 36.4 44 30.7 44 24c0-1.3-.1-2.3-.4-3.5z"/>
      </g>
      <circle cx="36" cy="36" r="8" fill="#34A853" stroke="#fff" strokeWidth="2"/>
      <path d="M32.5 36l2.5 2.5 4.5-4.5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
