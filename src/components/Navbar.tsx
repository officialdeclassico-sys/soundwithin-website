import React, {useState, useEffect} from 'react';
import {Menu, X} from 'lucide-react';
import {LotusLogoIcon} from './BrandIcons';
import type {PageRoute} from '../types';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  showCalendarIconOnCta?: boolean;
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
function BrushStrokeBackground({className = ''}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 260 72"
      preserveAspectRatio="none"
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Outer feathered bristle wisps (subtle painterly texture) */}
      <path
        opacity="0.38"
        fill="currentColor"
        d="M42 5.2 C82 3.2, 178 3.2, 218 5.5 C232 6.5, 244 10.5, 251 15.2 L241 17.5 L255 21.8 L244 25.2 L258 29.8 L247 33.5 L259 38.2 L246 42.1 L256 46.8 L242 50.2 L251 54.5 C242 60.5, 228 65.5, 212 66.8 C168 69.2, 92 69.2, 48 66.8 C31 65.8, 17 61.2, 9 55.2 L21 52.5 L6 48.2 L18 44.5 L2 39.8 L15 36.2 L3 31.5 L17 27.8 L7 23.2 L22 19.5 L12 14.8 C20 9.5, 31 6.2, 42 5.2 Z"
      />
      {/* Mid-layer bristle strokes on left/right tips and top/bottom edges */}
      <path
        opacity="0.68"
        fill="currentColor"
        d="M45 6.8 C88 4.8, 172 4.8, 215 7.0 C228 7.8, 239 11.8, 247 16.5 L236 19.2 L251 23.5 L239 27.0 L254 31.5 L242 35.2 L255 39.5 L241 43.2 L252 47.5 L238 51.0 L246 55.0 C237 60.2, 224 64.2, 209 65.2 C166 67.4, 94 67.4, 51 65.2 C35 64.2, 21 60.0, 13 54.5 L24 51.5 L10 47.2 L22 43.5 L6 39.2 L19 35.5 L7 31.0 L21 27.2 L11 22.8 L25 19.0 L16 14.8 C24 10.2, 34 7.5, 45 6.8 Z"
      />
      {/* Core solid painted brush body with irregular organic bristle tips */}
      <path
        fill="currentColor"
        d="M48 8.2 C92 6.4, 168 6.4, 212 8.4 C224 9.2, 235 12.8, 242 17.5 L233 20.0 L246 24.2 L236 27.8 L250 32.0 L239 35.8 L251 39.8 L238 43.5 L248 47.5 L235 50.8 L242 54.2 C233 59.0, 221 62.6, 206 63.6 C164 65.6, 96 65.6, 54 63.6 C39 62.6, 26 58.8, 18 53.8 L28 51.0 L15 46.8 L25 43.2 L11 39.0 L23 35.2 L12 31.2 L24 27.5 L15 23.2 L28 19.8 L20 15.8 C27 11.5, 37 8.8, 48 8.2 Z"
      />
    </svg>
  );
}

const NAV_ITEMS: {
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

export function Navbar({currentPage, onNavigate}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleSelect = (page: PageRoute) => {
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  const isBookActive = currentPage === 'book';

  return (
    <header className="relative z-30 w-full">
      <div className="layout-container pt-1.5 pb-1 sm:pt-3 sm:pb-2 lg:pt-4 lg:pb-3 flex items-center justify-between gap-2 sm:gap-3 lg:gap-5">
        {/* Zone 1: Brand Wordmark with Lotus Symbol */}
        <button
          type="button"
          onClick={() => handleSelect('home')}
          className="group flex flex-col items-center text-white drop-shadow-[0_2px_8px_rgba(32,10,48,0.85)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-lg px-1 py-0.5 whitespace-nowrap shrink-0 cursor-pointer"
          aria-label="SOUNDWITHIN Home"
        >
          <LotusLogoIcon className="w-5 h-3.5 sm:w-7 sm:h-5 lg:w-9 lg:h-6 text-white transition-transform duration-200 group-hover:scale-105" />
          <span className="font-sans-body text-[8.5px] sm:text-[11px] lg:text-[13.5px] font-medium tracking-[0.22em] text-white mt-0.5">
            SOUNDWITHIN
          </span>
        </button>

        {/* Zone 2 & 3: Independent Painted Brush-Stroke Navigation Buttons */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center justify-end gap-1 lg:gap-2.5 xl:gap-3.5"
        >
          {NAV_ITEMS.map((item) => {
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
                  className={`transition-colors duration-250 ease-out ${
                    isActive
                      ? 'text-[#52126E]'
                      : 'text-[#FAF7FD] group-hover:text-[#52126E]'
                  }`}
                />
                <span
                  className={`relative z-10 flex items-center justify-center transition-colors duration-250 ease-out ${
                    isActive
                      ? 'text-white'
                      : 'text-[#3B0D54] group-hover:text-white'
                  }`}
                >
                  {item.renderIcon('w-3 h-3 lg:w-4 lg:h-4 xl:w-[17px] xl:h-[17px] shrink-0')}
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

          {/* Book a Session – Visually Distinct Painted Brush-Stroke CTA Button */}
          <button
            type="button"
            aria-current={isBookActive ? 'page' : undefined}
            onClick={() => handleSelect('book')}
            className={`group relative inline-flex items-center justify-center gap-1 lg:gap-2 px-3.5 lg:px-6 xl:px-7 py-1.5 lg:py-2 xl:py-2.5 cursor-pointer select-none whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/90 rounded-full transition-all duration-250 ease-out ${
              isBookActive
                ? 'drop-shadow-[0_0_14px_rgba(232,202,255,0.75)] scale-[1.02]'
                : 'drop-shadow-[0_4px_12px_rgba(32,8,48,0.45)] hover:drop-shadow-[0_0_14px_rgba(225,190,255,0.65)]'
            }`}
          >
            <BrushStrokeBackground
              className={`transition-colors duration-250 ease-out ${
                isBookActive
                  ? 'text-[#661988]'
                  : 'text-[#52126E] group-hover:text-[#661988]'
              }`}
            />
            <span className="relative z-10 flex items-center justify-center text-white transition-colors duration-250 ease-out">
              <NavCalendarIcon className="w-3 h-3 lg:w-4 lg:h-4 xl:w-[17px] xl:h-[17px] shrink-0" />
            </span>
            <span className="relative z-10 font-sans-body text-[10.5px] lg:text-[13px] xl:text-[14.5px] font-bold tracking-[0.01em] text-white transition-colors duration-250 ease-out">
              Book a Session
            </span>
          </button>
        </nav>

        {/* Mobile Controls (Painted Brush-Stroke CTA + Menu Toggle, No White Container) */}
        <div className="flex md:hidden items-center gap-1.5 sm:gap-2.5 shrink-0">
          <button
            type="button"
            aria-current={isBookActive ? 'page' : undefined}
            onClick={() => handleSelect('book')}
            className="group relative inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-5 py-1 sm:py-1.5 cursor-pointer select-none whitespace-nowrap shrink-0 focus:outline-none drop-shadow-[0_3px_10px_rgba(32,8,48,0.45)]"
          >
            <BrushStrokeBackground
              className={`transition-colors duration-250 ease-out ${
                isBookActive
                  ? 'text-[#661988]'
                  : 'text-[#52126E] group-hover:text-[#661988]'
              }`}
            />
            <span className="relative z-10 flex items-center justify-center text-white">
              <NavCalendarIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            </span>
            <span className="relative z-10 font-sans-body text-[9.5px] sm:text-[11.5px] font-bold tracking-[0.01em] text-white">
              Book a Session
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={
              mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            aria-expanded={mobileMenuOpen}
            className="group relative inline-flex items-center justify-center px-3 sm:px-3.5 py-1 sm:py-1.5 cursor-pointer select-none shrink-0 focus:outline-none drop-shadow-[0_3px_8px_rgba(28,8,44,0.35)]"
          >
            <BrushStrokeBackground
              className={`transition-colors duration-250 ease-out ${
                mobileMenuOpen
                  ? 'text-[#52126E]'
                  : 'text-[#FAF7FD] group-hover:text-[#52126E]'
              }`}
            />
            <span
              className={`relative z-10 flex items-center justify-center transition-colors duration-250 ease-out ${
                mobileMenuOpen
                  ? 'text-white'
                  : 'text-[#3B0D54] group-hover:text-white'
              }`}
            >
              {mobileMenuOpen ? (
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              ) : (
                <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Overlay – Independent Painted Buttons without any shared white container */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-[#180526]/75 backdrop-blur-sm flex flex-col justify-start px-5 pt-5 pb-8 overflow-y-auto scrollbar-hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-full max-w-[360px] mx-auto flex flex-col items-center gap-3.5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between mb-2 px-1">
              <button
                type="button"
                onClick={() => handleSelect('home')}
                className="flex items-center gap-2 text-white drop-shadow-[0_2px_6px_rgba(20,5,32,0.8)] cursor-pointer"
              >
                <LotusLogoIcon className="w-7 h-5 text-white" />
                <span className="font-sans-body text-xs font-semibold tracking-[0.22em] text-white">
                  SOUNDWITHIN
                </span>
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close mobile menu"
                className="group relative inline-flex items-center justify-center px-3.5 py-1.5 cursor-pointer"
              >
                <BrushStrokeBackground className="text-[#FAF7FD] group-hover:text-[#52126E] transition-colors duration-250 ease-out" />
                <span className="relative z-10 text-[#3B0D54] group-hover:text-white transition-colors duration-250 ease-out">
                  <X className="w-4 h-4" />
                </span>
              </button>
            </div>

            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  type="button"
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => handleSelect(item.page)}
                  className="group relative w-[240px] inline-flex items-center justify-center gap-2.5 px-7 py-3 cursor-pointer select-none whitespace-nowrap drop-shadow-[0_4px_14px_rgba(18,4,28,0.45)]"
                >
                  <BrushStrokeBackground
                    className={`transition-colors duration-250 ease-out ${
                      isActive
                        ? 'text-[#52126E]'
                        : 'text-[#FAF7FD] group-hover:text-[#52126E]'
                    }`}
                  />
                  <span
                    className={`relative z-10 flex items-center justify-center transition-colors duration-250 ease-out ${
                      isActive
                        ? 'text-white'
                        : 'text-[#3B0D54] group-hover:text-white'
                    }`}
                  >
                    {item.renderIcon('w-4 h-4 shrink-0')}
                  </span>
                  <span
                    className={`relative z-10 font-sans-body text-[15px] font-bold tracking-[0.01em] transition-colors duration-250 ease-out ${
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

            <button
              type="button"
              aria-current={isBookActive ? 'page' : undefined}
              onClick={() => handleSelect('book')}
              className="group relative w-[256px] inline-flex items-center justify-center gap-2.5 px-8 py-3.5 mt-1 cursor-pointer select-none whitespace-nowrap drop-shadow-[0_4px_16px_rgba(18,4,28,0.55)]"
            >
              <BrushStrokeBackground
                className={`transition-colors duration-250 ease-out ${
                  isBookActive
                    ? 'text-[#661988]'
                    : 'text-[#52126E] group-hover:text-[#661988]'
                }`}
              />
              <span className="relative z-10 flex items-center justify-center text-white">
                <NavCalendarIcon className="w-4 h-4 shrink-0" />
              </span>
              <span className="relative z-10 font-sans-body text-[15px] font-bold tracking-[0.01em] text-white">
                Book a Session
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
