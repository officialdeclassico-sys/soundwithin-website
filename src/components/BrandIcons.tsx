import React from 'react';

export function LotusLogoIcon({className = 'w-10 h-7'}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 64 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Center petal */}
      <path
        d="M32 4C26.5 12 25 22 32 34C39 22 37.5 12 32 4Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left inner petal */}
      <path
        d="M30 33C20 28 15 18 19 10C24 13 27.5 20 30 33Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right inner petal */}
      <path
        d="M34 33C44 28 49 18 45 10C40 13 36.5 20 34 33Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left outer petal */}
      <path
        d="M28 34.5C16 33.5 8 26 7 18C14 18.5 21 24 28 34.5Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right outer petal */}
      <path
        d="M36 34.5C48 33.5 56 26 57 18C50 18.5 43 24 36 34.5Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Base curve */}
      <path
        d="M16 37.5C24 39.5 40 39.5 48 37.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WavyOrnament({className = 'w-44 h-4 text-[#5D237A]'}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 220 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="8" cy="9" r="2" fill="currentColor" opacity="0.65" />
      <path
        d="M16 9H48C56 9 60 3 68 3C76 3 82 15 92 15C102 15 104 3 112 3C120 3 126 15 136 15C146 15 148 3 156 3C164 3 168 9 176 9H204"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="212" cy="9" r="2" fill="currentColor" opacity="0.65" />
    </svg>
  );
}

export function SoundwaveIcon({className = 'w-7 h-7'}: {className?: string}) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 16H7M25 16H28M10 11V21M13 7V25M16 4V28M19 8V24M22 12V20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LotusLineIcon({className = 'w-7 h-7'}: {className?: string}) {
  return (
    <svg viewBox="0 0 36 28" fill="none" className={className} aria-hidden="true">
      <path
        d="M18 3C14.5 8.5 13.5 15 18 23C22.5 15 21.5 8.5 18 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 22.5C10.5 19 7.5 12.5 10 7.5C13.5 9.5 15.5 14 17 22.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 22.5C25.5 19 28.5 12.5 26 7.5C22.5 9.5 20.5 14 19 22.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 23.5C8.5 22.5 3.5 18 3 13C7.5 13.5 11.5 17 15.5 23.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.5 23.5C27.5 22.5 32.5 18 33 13C28.5 13.5 24.5 17 20.5 23.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ZenStonesIcon({className = 'w-7 h-7'}: {className?: string}) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <ellipse cx="16" cy="8.5" rx="4.5" ry="2.8" stroke="currentColor" strokeWidth="1.8" />
      <ellipse cx="16" cy="15.5" rx="7.5" ry="3.5" stroke="currentColor" strokeWidth="1.8" />
      <ellipse cx="16" cy="23.5" rx="10.5" ry="4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function SproutLeafIcon({className = 'w-7 h-7'}: {className?: string}) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M16 26V14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M16 21C9 21 5 15.5 5 9C11.5 9 16 13.5 16 21Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 21C23 21 27 15.5 27 9C20.5 9 16 13.5 16 21Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CrescentMoonIcon({className = 'w-7 h-7'}: {className?: string}) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M21.5 6.5C16.2 7.6 13 12.8 14.1 18.1C15.2 23.4 20.4 26.6 25.5 25.5C23.2 27.7 19.9 28.8 16.4 28.2C9.8 27.1 5.3 20.9 6.4 14.3C7.5 7.7 13.7 3.2 20.3 4.3C20.7 4.4 21.1 4.5 21.5 6.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InfinityLineIcon({className = 'w-8 h-7'}: {className?: string}) {
  return (
    <svg viewBox="0 0 36 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M18 12C15.2 8.2 12.2 6.5 9 6.5C5.2 6.5 2.5 9 2.5 12C2.5 15 5.2 17.5 9 17.5C12.2 17.5 15.2 15.8 18 12ZM18 12C20.8 15.8 23.8 17.5 27 17.5C30.8 17.5 33.5 15 33.5 12C33.5 9 30.8 6.5 27 6.5C23.8 6.5 20.8 8.2 18 12Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MandalaIcon({className = 'w-7 h-7'}: {className?: string}) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.6" />
      <ellipse cx="16" cy="16" rx="11" ry="5" stroke="currentColor" strokeWidth="1.5" />
      <ellipse
        cx="16"
        cy="16"
        rx="11"
        ry="5"
        transform="rotate(60 16 16)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <ellipse
        cx="16"
        cy="16"
        rx="11"
        ry="5"
        transform="rotate(120 16 16)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function CrystalPrismIcon({className = 'w-7 h-7'}: {className?: string}) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M16 3L24 10V23L16 29L8 23V10L16 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M16 3V29M8 10L16 14L24 10M8 23L16 14L24 23"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TriskelionIcon({className = 'w-7 h-7'}: {className?: string}) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="11.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12.5" cy="18.2" r="4.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="19.5" cy="18.2" r="4.2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function NatureTreeIcon({className = 'w-7 h-7'}: {className?: string}) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M16 28V16M16 21L12.5 18M16 19L19.5 16.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M16 5C12.5 5 10 7.5 10 10.5C7.5 11 6 13.2 6 15.8C6 18.8 8.5 21 11.5 21H20.5C23.5 21 26 18.8 26 15.8C26 13.2 24.5 11 22 10.5C22 7.5 19.5 5 16 5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MeditatePersonIcon({className = 'w-7 h-7'}: {className?: string}) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="16" cy="7.5" r="2.8" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M16 12C12 12 9.5 15 8 19.5C11 19.5 13 18 16 18C19 18 21 19.5 24 19.5C22.5 15 20 12 16 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 23.5C9.5 21.5 22.5 21.5 25.5 23.5C22.5 25.5 9.5 25.5 6.5 23.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ExperienceBadgeIcon({
  type,
  className = 'w-6 h-6',
}: {
  type: string;
  className?: string;
}) {
  switch (type) {
    case 'soundwave':
      return <SoundwaveIcon className={className} />;
    case 'lotus':
    case 'nature':
      return <LotusLineIcon className={className} />;
    case 'mandala':
      return <MandalaIcon className={className} />;
    case 'crystal':
      return <CrystalPrismIcon className={className} />;
    case 'triskelion':
      return <TriskelionIcon className={className} />;
    default:
      return <LotusLineIcon className={className} />;
  }
}
