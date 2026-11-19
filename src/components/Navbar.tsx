import React, {useState, useEffect} from 'react';
import {X} from 'lucide-react';
import {LotusLogoIcon} from './BrandIcons';
import type {PageRoute} from '../types';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  showCalendarIconOnCta?: boolean;
  brandTone?: 'light' | 'dark';
}

function NavHomeIcon({className = 'w-4 h-4'}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.6L2.4 11.1c-.45.4-.17 1.15.43 1.15H5v8.25c0 .55.45 1 1 1h4.3v-5.75h3.4v5.75H18c.55 0 1-.45 1-1v-8.25h2.17c.6 0 .88-.75.43-1.15L18.5 8.35V4.5c0-.45-.35-.8-.8-.8h-1.9c-.45 0-.8.35-.8.8v1.2L12 2.6z" />
    </svg>
  );
}

function NavLeafIcon({className = 'w-4 h-4'}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.2 3.8C13.5 3.8 7.5 6.8 5.6 13.2c-.8 2.7-.2 5.2.8 6.4 1.2 1 3.7 1.6 6.4.8 6.4-1.9 9.4-7.9 7.4-16.6Z" />
      <path d="M4.2 19.8C7.8 16.2 11.8 12.2 16.2 8.8" />
    </svg>
  );
}

function NavLotusIcon({className = 'w-5 h-4'}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 36 26"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 2.5C14.6 8 13.6 14.5 18 22.5C22.4 14.5 21.4 8 18 2.5Z" />
      <path d="M17 22C10.5 18.5 7.5 12 10 7C13.5 9 15.5 13.5 17 22Z" />
      <path d="M19 22C25.5 18.5 28.5 12 26 7C22.5 9 20.5 13.5 19 22Z" />
      <path d="M15.5 23C8.5 22 3.5 17.5 2.8 12.5C7.5 13 11.5 16.5 15.5 23Z" />
      <path d="M20.5 23C27.5 22 32.5 17.5 33.2 12.5C28.5 13 24.5 16.5 20.5 23Z" />
    </svg>
  );
}

function NavInfoIcon({className = 'w-4 h-4'}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9.2" />
      <line x1="12" y1="11" x2="12" y2="16.5" />
      <circle cx="12" cy="7.6" r="0.6" fill="currentColor" />
    </svg>
  );
}

function NavEnvelopeIcon({className = 'w-4 h-4'}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="M3 6l9 6.5L21 6" />
    </svg>
  );
}

function NavCalendarIcon({className = 'w-4 h-4'}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="4.5" width="18" height="16.5" rx="2.2" />
      <line x1="16" y1="2.5" x2="16" y2="6.5" />
      <line x1="8" y1="2.5" x2="8" y2="6.5" />
      <line x1="3" y1="9.5" x2="21" y2="9.5" />
    </svg>
  );
}

/**
 * Artistic hand-painted brush-stroke SVG background replicating the irregular
 * feathered bristle edges and organic rounded proportions from the reference.
 */
function BrushStrokeBackground({
  className = '',
  gradientId,
  gradientStops,
}: {
  className?: string;
  gradientId?: string;
  gradientStops?: [string, string, string];
}) {
  const fillValue = gradientId ? `url(#${gradientId})` : 'currentColor';
  return (
    <svg
      viewBox="0 0 260 72"
      preserveAspectRatio="none"
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {gradientId && gradientStops && (
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradientStops[0]} />
            <stop offset="52%" stopColor={gradientStops[1]} />
            <stop offset="100%" stopColor={gradientStops[2]} />
          </linearGradient>
        </defs>
      )}
      {/* Outer feathered bristle wisps (subtle painterly texture) */}
      <path
        opacity="0.38"
        fill={fillValue}
        d="M42 5.2 C82 3.2, 178 3.2, 218 5.5 C232 6.5, 244 10.5, 251 15.2 L241 17.5 L255 21.8 L244 25.2 L258 29.8 L247 33.5 L259 38.2 L246 42.1 L256 46.8 L242 50.2 L251 54.5 C242 60.5, 228 65.5, 212 66.8 C168 69.2, 92 69.2, 48 66.8 C31 65.8, 17 61.2, 9 55.2 L21 52.5 L6 48.2 L18 44.5 L2 39.8 L15 36.2 L3 31.5 L17 27.8 L7 23.2 L22 19.5 L12 14.8 C20 9.5, 31 6.2, 42 5.2 Z"
      />
      {/* Mid-layer bristle strokes on left/right tips and top/bottom edges */}
      <path
        opacity="0.68"
        fill={fillValue}
        d="M45 6.8 C88 4.8, 172 4.8, 215 7.0 C228 7.8, 239 11.8, 247 16.5 L236 19.2 L251 23.5 L239 27.0 L254 31.5 L242 35.2 L255 39.5 L241 43.2 L252 47.5 L238 51.0 L246 55.0 C237 60.2, 224 64.2, 209 65.2 C166 67.4, 94 67.4, 51 65.2 C35 64.2, 21 60.0, 13 54.5 L24 51.5 L10 47.2 L22 43.5 L6 39.2 L19 35.5 L7 31.0 L21 27.2 L11 22.8 L25 19.0 L16 14.8 C24 10.2, 34 7.5, 45 6.8 Z"
      />
      {/* Core solid painted brush body with irregular organic bristle tips */}
      <path
        fill={fillValue}
        d="M48 8.2 C92 6.4, 168 6.4, 212 8.4 C224 9.2, 235 12.8, 242 17.5 L233 20.0 L246 24.2 L236 27.8 L250 32.0 L239 35.8 L251 39.8 L238 43.5 L248 47.5 L235 50.8 L242 54.2 C233 59.0, 221 62.6, 206 63.6 C164 65.6, 96 65.6, 54 63.6 C39 62.6, 26 58.8, 18 53.8 L28 51.0 L15 46.8 L25 43.2 L11 39.0 L23 35.2 L12 31.2 L24 27.5 L15 23.2 L28 19.8 L20 15.8 C27 11.5, 37 8.8, 48 8.2 Z"
      />
    </svg>
  );
}

function MobileMenuMountainIcon({className = 'w-5 h-5'}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 24 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2 17.5L8.8 7.5L13.6 14.2" />
      <path d="M11.3 11L15.4 5.2L22 17.5" />
      <line x1="1.5" y1="17.5" x2="22.5" y2="17.5" />
      <circle cx="12.2" cy="5.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MobileMenuUserIcon({className = 'w-5 h-5'}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="7.2" r="3.9" />
      <path d="M4.2 19.2C4.2 15.6 7.6 13.1 12 13.1C16.4 13.1 19.8 15.6 19.8 19.2V20.5H4.2V19.2Z" />
      <path
        d="M5.5 18.2C7.4 17.1 9.6 16.6 12 16.6C14.4 16.6 16.6 17.1 18.5 18.2"
        stroke="#F9E9F7"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MobileMenuEnvelopeIcon({className = 'w-5 h-5'}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2.5" y="5" width="19" height="14" rx="2.4" />
      <path d="M3.2 6.2L12 12.8L20.8 6.2" />
      <path d="M3.4 18L8.8 13.2" />
      <path d="M20.6 18L15.2 13.2" />
    </svg>
  );
}

function MobileMenuCalendarIcon({className = 'w-5 h-5'}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="4.5" width="18" height="16.5" rx="2.4" />
      <line x1="8" y1="2.5" x2="8" y2="6.2" />
      <line x1="16" y1="2.5" x2="16" y2="6.2" />
      <line x1="3" y1="9.2" x2="21" y2="9.2" />
      <circle cx="8" cy="13" r="0.95" fill="currentColor" stroke="none" />
      <circle cx="12" cy="13" r="0.95" fill="currentColor" stroke="none" />
      <circle cx="16" cy="13" r="0.95" fill="currentColor" stroke="none" />
      <circle cx="8" cy="16.8" r="0.95" fill="currentColor" stroke="none" />
      <circle cx="12" cy="16.8" r="0.95" fill="currentColor" stroke="none" />
      <circle cx="16" cy="16.8" r="0.95" fill="currentColor" stroke="none" />
    </svg>
  );
}

function StaggeredHamburgerIcon({
  className = 'w-6 h-5',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 28 22"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="swHamburgerBarGrad"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#3B0860" />
          <stop offset="50%" stopColor="#56148A" />
          <stop offset="100%" stopColor="#430A6D" />
        </linearGradient>
      </defs>
      {/* Top Bar: Full width */}
      <rect
        x="3"
        y="3"
        width="22"
        height="3.2"
        rx="1.6"
        fill="url(#swHamburgerBarGrad)"
      />
      {/* Middle Bar: Indented on left, aligned on right */}
      <rect
        x="6.2"
        y="9.4"
        width="18.8"
        height="3.2"
        rx="1.6"
        fill="url(#swHamburgerBarGrad)"
      />
      {/* Bottom Bar: Aligned on left, shorter on right */}
      <rect
        x="3.3"
        y="15.8"
        width="16.8"
        height="3.2"
        rx="1.6"
        fill="url(#swHamburgerBarGrad)"
      />
    </svg>
  );
}

const DESKTOP_NAV_ITEMS: {
  label: string;
  page: PageRoute;
  renderIcon: (className: string) => React.ReactNode;
}[] = [
  {
    label: 'Home',
    page: 'home',
    renderIcon: (cls) => <NavHomeIcon className={cls} />,
  },
  {
    label: 'Experiences',
    page: 'experiences',
    renderIcon: (cls) => <NavLeafIcon className={cls} />,
  },
  {
    label: 'Retreats',
    page: 'retreats',
    renderIcon: (cls) => <NavLotusIcon className={cls} />,
  },
  {
    label: 'About',
    page: 'about',
    renderIcon: (cls) => <NavInfoIcon className={cls} />,
  },
  {
    label: 'Contact',
    page: 'contact',
    renderIcon: (cls) => <NavEnvelopeIcon className={cls} />,
  },
];

const MOBILE_MENU_ITEMS: {
  label: string;
  page: PageRoute;
  renderIcon: (className: string) => React.ReactNode;
}[] = [
  {
    label: 'Home',
    page: 'home',
    renderIcon: (cls) => <NavHomeIcon className={cls} />,
  },
  {
    label: 'Experiences',
    page: 'experiences',
    renderIcon: (cls) => <NavLotusIcon className={cls} />,
  },
  {
    label: 'Retreats',
    page: 'retreats',
    renderIcon: (cls) => <MobileMenuMountainIcon className={cls} />,
  },
  {
    label: 'About Us',
    page: 'about',
    renderIcon: (cls) => <MobileMenuUserIcon className={cls} />,
  },
  {
    label: 'Contact Us',
    page: 'contact',
    renderIcon: (cls) => <MobileMenuEnvelopeIcon className={cls} />,
  },
  {
    label: 'Book a Session',
    page: 'book',
    renderIcon: (cls) => <MobileMenuCalendarIcon className={cls} />,
  },
];

export function Navbar({
  currentPage,
  onNavigate,
  brandTone = 'light',
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      const handlePopState = () => {
        setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('popstate', handlePopState);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('popstate', handlePopState);
      };
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleOpenMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  const handleCloseMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleSelect = (page: PageRoute) => {
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  const isBookActive = currentPage === 'book';

  return (
    <header className="relative z-30 w-full">
      <div className="layout-container pt-1 pb-1 sm:pt-2 sm:pb-1.5 lg:pt-2.5 lg:pb-2 flex items-center justify-between gap-2 sm:gap-3 lg:gap-4">
        {/* Zone 1: Brand Wordmark with Lotus Symbol */}
        <button
          type="button"
          onClick={() => handleSelect('home')}
          className={`group flex flex-col items-center focus:outline-none focus-visible:ring-2 rounded-lg px-1 py-0.5 whitespace-nowrap shrink-0 cursor-pointer ${
            brandTone === 'dark'
              ? 'text-[#3B0D54] drop-shadow-[0_1px_6px_rgba(255,255,255,0.85)] focus-visible:ring-[#5D237A]/70'
              : 'text-white drop-shadow-[0_2px_8px_rgba(32,10,48,0.85)] focus-visible:ring-white/80'
          }`}
          aria-label="SOUNDWITHIN Home"
        >
          <LotusLogoIcon
            className={`w-5 h-3.5 sm:w-7 sm:h-5 lg:w-9 lg:h-6 transition-transform duration-200 group-hover:scale-105 ${
              brandTone === 'dark' ? 'text-[#3B0D54]' : 'text-white'
            }`}
          />
          <span
            className={`font-sans-body text-[8.5px] sm:text-[11px] lg:text-[13.5px] font-medium tracking-[0.22em] mt-0.5 ${
              brandTone === 'dark' ? 'text-[#3B0D54]' : 'text-white'
            }`}
          >
            SOUNDWITHIN
          </span>
        </button>

        {/* Zone 2 & 3: Desktop & Tablet Navigation Buttons (Preserved) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center justify-end gap-1 lg:gap-2.5 xl:gap-3.5"
        >
          {DESKTOP_NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => handleSelect(item.page)}
                className="group relative inline-flex items-center justify-center gap-1 lg:gap-2 px-3 lg:px-5 xl:px-6 py-1.5 lg:py-2 xl:py-2.5 cursor-pointer select-none whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/90 rounded-full drop-shadow-[0_3px_10px_rgba(28,8,44,0.32)]"
              >
                <BrushStrokeBackground
                  gradientId={isActive ? `swNavActiveGrad-${item.page}` : undefined}
                  gradientStops={isActive ? ['#6A2991', '#50156D', '#3B0D54'] : undefined}
                  className={`transition-colors duration-250 ease-out ${
                    isActive
                      ? ''
                      : 'text-[#FAF7FD] group-hover:text-[#581978]'
                  }`}
                />
                <span
                  className={`relative z-10 flex items-center justify-center transition-colors duration-250 ease-out ${
                    isActive
                      ? 'text-white'
                      : 'text-[#3B0D54] group-hover:text-white'
                  }`}
                >
                  {item.renderIcon(
                    'w-3 h-3 lg:w-4 lg:h-4 xl:w-[17px] xl:h-[17px] shrink-0'
                  )}
                </span>
                <span
                  className={`relative z-10 font-sans-body text-[10.5px] lg:text-[13px] xl:text-[14.5px] font-bold tracking-[0.01em] transition-colors duration-250 ease-out ${
                    isActive
                      ? 'text-white'
                      : 'text-[#3B0D54] group-hover:text-white'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* Book a Session – Desktop & Tablet Painted Brush-Stroke Gradient CTA Button */}
          <button
            type="button"
            aria-current={isBookActive ? 'page' : undefined}
            onClick={() => handleSelect('book')}
            className={`group relative inline-flex items-center justify-center gap-1 lg:gap-2 px-3.5 lg:px-6 xl:px-7 py-1.5 lg:py-2 xl:py-2.5 cursor-pointer select-none whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/90 rounded-full transition-all duration-250 ease-out ${
              isBookActive
                ? 'drop-shadow-[0_0_14px_rgba(232,202,255,0.75)] scale-[1.02]'
                : 'drop-shadow-[0_4px_12px_rgba(32,8,48,0.45)] hover:drop-shadow-[0_0_14px_rgba(225,190,255,0.65)] hover:-translate-y-0.5'
            }`}
          >
            <BrushStrokeBackground
              gradientId="swNavBookCtaGrad"
              gradientStops={
                isBookActive
                  ? ['#7D2FA4', '#5F1A7E', '#471061']
                  : ['#6A248D', '#52146E', '#3D0D55']
              }
              className="transition-transform duration-250 ease-out"
            />
            <span className="relative z-10 flex items-center justify-center text-white transition-colors duration-250 ease-out">
              <NavCalendarIcon className="w-3 h-3 lg:w-4 lg:h-4 xl:w-[17px] xl:h-[17px] shrink-0" />
            </span>
            <span className="relative z-10 font-sans-body text-[10.5px] lg:text-[13px] xl:text-[14.5px] font-bold tracking-[0.01em] text-white transition-colors duration-250 ease-out">
              Book a Session
            </span>
          </button>
        </nav>

        {/* Mobile Header Control: Staggered 3-Bar Hamburger Icon (Separate mobile Book a Session button removed) */}
        <div className="flex md:hidden items-center shrink-0">
          <button
            type="button"
            onClick={handleOpenMobileMenu}
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            className="group relative inline-flex items-center justify-center px-3 py-1.5 rounded-xl bg-gradient-to-br from-[#FAF5FE]/95 via-[#F6ECFC]/95 to-[#FDECF3]/95 hover:from-white hover:to-[#F9E4EE] border border-white/85 shadow-[0_3px_10px_rgba(28,8,44,0.28)] cursor-pointer select-none shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5D237A]/70 transition-all duration-150 active:scale-95"
          >
            <StaggeredHamburgerIcon className="w-6 h-5" />
          </button>
        </div>
      </div>

      {/* Full-Screen Mobile Navigation Overlay (100% Width x 100dvh Height, Slides In Smoothly From the Right) */}
      <div
        style={{
          background:
            'linear-gradient(168deg, #DCC6F8 0%, #EAD6FA 24%, #F6E5F9 50%, #FDEBF4 76%, #F2DCF8 100%)',
        }}
        className={`md:hidden fixed inset-0 z-50 w-screen h-screen min-h-[100dvh] h-[100dvh] flex flex-col justify-between px-6 sm:px-8 pt-[max(24px,env(safe-area-inset-top))] pb-[max(24px,env(safe-area-inset-bottom))] overflow-y-auto scrollbar-hidden select-none transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
          mobileMenuOpen
            ? 'translate-x-0 pointer-events-auto'
            : 'translate-x-full pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!mobileMenuOpen}
        aria-label="Full-Screen Mobile Navigation Menu"
      >
        {/* Soft Radial Glow in Middle-Right of Full-Screen Menu */}
        <div
          className="absolute top-[26%] right-[-8%] w-64 h-64 rounded-full bg-white/40 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Subtle Decorative Botanical Leaf Stem in Bottom-Right Corner */}
        <svg
          viewBox="0 0 110 155"
          fill="none"
          className="absolute bottom-0 right-0 w-[125px] h-[175px] text-[#C592EC] opacity-55 pointer-events-none select-none"
          aria-hidden="true"
        >
          {/* Soft background secondary foliage */}
          <path
            d="M72 152C76 125 86 98 102 72"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.45"
          />
          <path
            d="M90 92C82 84 82 73 90 69C96 74 96 85 90 92Z"
            fill="currentColor"
            opacity="0.4"
          />
          <path
            d="M82 114C73 106 73 95 81 91C87 96 87 107 82 114Z"
            fill="currentColor"
            opacity="0.4"
          />

          {/* Primary foreground botanical stem */}
          <path
            d="M38 152C44 114 60 72 88 26"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Top terminal leaf */}
          <path
            d="M88 26C84 14 91 5 98 9C101 17 95 25 88 26Z"
            fill="currentColor"
          />
          {/* Pair 1 (upper) */}
          <path
            d="M75 47C64 38 64 24 73 20C80 26 81 38 75 47Z"
            fill="currentColor"
          />
          <path
            d="M77 50C89 44 99 48 100 56C92 61 82 57 77 50Z"
            fill="currentColor"
          />
          {/* Pair 2 (middle) */}
          <path
            d="M62 74C50 64 50 49 59 45C67 51 67 64 62 74Z"
            fill="currentColor"
          />
          <path
            d="M64 77C77 71 88 75 88 84C80 89 69 85 64 77Z"
            fill="currentColor"
          />
          {/* Pair 3 (lower) */}
          <path
            d="M50 103C38 93 37 78 46 74C54 80 54 93 50 103Z"
            fill="currentColor"
          />
          <path
            d="M52 106C65 100 76 104 76 113C68 118 57 114 52 106Z"
            fill="currentColor"
          />
          {/* Pair 4 (base) */}
          <path
            d="M42 130C30 121 29 107 37 103C45 109 45 121 42 130Z"
            fill="currentColor"
          />
        </svg>

        {/* Top Section: Header Row (Lotus Logo on Left + Close X in Top-Right) & 6 Navigation Items */}
        <div className="relative z-10 w-full">
          {/* Top Header Row */}
          <div className="flex items-start justify-between pl-1 pr-1 mb-7">
            <button
              type="button"
              onClick={() => handleSelect('home')}
              className="flex flex-col items-center text-left focus:outline-none cursor-pointer group"
              aria-label="SOUNDWITHIN Home"
            >
              <LotusLogoIcon className="w-14 h-9 text-[#521775] transition-transform duration-200 group-hover:scale-105" />
              <span className="font-serif-display text-[18px] font-medium uppercase tracking-[0.07em] text-[#4A146A] mt-1 leading-none">
                SOUNDWITHIN
              </span>
            </button>

            <button
              type="button"
              onClick={handleCloseMobileMenu}
              aria-label="Close navigation menu"
              className="p-2 -mr-1 text-[#4A1268] hover:text-[#2E0A42] rounded-full transition-colors cursor-pointer focus:outline-none"
            >
              <X className="w-7 h-7" strokeWidth={2} />
            </button>
          </div>

          {/* Six Navigation Menu Items */}
          <nav
            aria-label="Mobile Navigation"
            className="flex flex-col gap-2"
          >
            {MOBILE_MENU_ITEMS.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  type="button"
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => handleSelect(item.page)}
                  className={`w-full flex items-center gap-4 px-5 py-3 rounded-full text-left transition-all duration-200 cursor-pointer focus:outline-none ${
                    isActive
                      ? 'bg-gradient-to-r from-[#F6EEFD]/95 via-[#FAF4FE]/90 to-[#F5ECFC]/85 border border-white/90 shadow-[0_4px_14px_rgba(74,18,104,0.07)]'
                      : 'border border-transparent hover:bg-white/35'
                  }`}
                >
                  <span className="w-6 h-6 flex items-center justify-center text-[#4B136A] shrink-0">
                    {item.renderIcon('w-[22px] h-[22px]')}
                  </span>
                  <span className="font-serif-display text-[21px] font-medium tracking-[0.01em] text-[#43125F] leading-tight">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Center-Dot Divider Line & Four Social Icons */}
        <div className="relative z-10 w-full pt-4 pb-1">
          <div
            className="mb-5 flex items-center justify-center px-4"
            aria-hidden="true"
          >
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D2B2EB] to-transparent" />
            <span className="absolute w-1.5 h-1.5 rounded-full bg-[#C8A1E6]" />
          </div>

          <div className="flex items-center justify-center gap-4">
            {/* Instagram */}
            <a
              href="#/contact"
              onClick={(e) => {
                e.preventDefault();
                handleSelect('contact');
              }}
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-[#8E63B3]/50 bg-white/30 hover:bg-white/55 text-[#4B136A] flex items-center justify-center transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="#/contact"
              onClick={(e) => {
                e.preventDefault();
                handleSelect('contact');
              }}
              aria-label="YouTube"
              className="w-9 h-9 rounded-full border border-[#8E63B3]/50 bg-white/30 hover:bg-white/55 text-[#4B136A] flex items-center justify-center transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M21.6 7.2c-.2-.9-.9-1.6-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8c.2.9.9 1.6 1.8 1.8 1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3-5.2 3z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="#/contact"
              onClick={(e) => {
                e.preventDefault();
                handleSelect('contact');
              }}
              aria-label="Facebook"
              className="w-9 h-9 rounded-full border border-[#8E63B3]/50 bg-white/30 hover:bg-white/55 text-[#4B136A] flex items-center justify-center transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.4H7.5v3.2h2.7V21h3.3z" />
              </svg>
            </a>

            {/* X / Twitter */}
            <a
              href="#/contact"
              onClick={(e) => {
                e.preventDefault();
                handleSelect('contact');
              }}
              aria-label="X"
              className="w-9 h-9 rounded-full border border-[#8E63B3]/50 bg-white/30 hover:bg-white/55 text-[#4B136A] flex items-center justify-center transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3.5 h-3.5"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
