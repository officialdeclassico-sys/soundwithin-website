import React, {useState, useEffect} from 'react';
import {ArrowUp} from 'lucide-react';
import {LotusLogoIcon} from './BrandIcons';
import type {Experience, PageRoute, WebsiteSettings} from '../types';

interface FooterProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onSelectExperienceForBooking: (experienceId: string) => void;
  experiences: Experience[];
  settings: WebsiteSettings;
}

function InstagramIcon({className = 'w-4 h-4'}: {className?: string}) {
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
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YouTubeFilledIcon({className = 'w-4 h-4'}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M21.8 8.001a2.75 2.75 0 0 0-1.94-1.94C18.14 5.6 12 5.6 12 5.6s-6.14 0-7.86.46a2.75 2.75 0 0 0-1.94 1.94A28.6 28.6 0 0 0 1.75 12c0 1.38.15 2.73.45 3.999a2.75 2.75 0 0 0 1.94 1.94c1.72.46 7.86.46 7.86.46s6.14 0 7.86-.46a2.75 2.75 0 0 0 1.94-1.94c.3-1.269.45-2.619.45-3.999 0-1.38-.15-2.73-.45-3.999zM9.95 15.02V8.98L15.2 12l-5.25 3.02z" />
    </svg>
  );
}

function FacebookFilledIcon({className = 'w-4 h-4'}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M13.5 21v-7.5h2.55l.38-2.95H13.5V8.67c0-.85.24-1.43 1.46-1.43h1.56V4.6c-.27-.04-1.2-.12-2.28-.12-2.26 0-3.8 1.38-3.8 3.91v2.16H8v2.95h2.44V21h3.06z" />
    </svg>
  );
}

function XTwitterIcon({className = 'w-4 h-4'}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer({onNavigate, settings}: FooterProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 420);
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const handleSocialClick = (url?: string) => {
    if (url && url.trim()) {
      window.location.href = url.trim();
    } else {
      onNavigate('contact');
    }
  };

  return (
    <footer className="relative w-full sw-footer-pastel-gradient text-[#2F1041] m-0 p-0">
      <div className="layout-container py-2.5 sm:py-3 xl:py-0 xl:h-[68px] flex flex-col xl:flex-row items-center justify-between gap-2 sm:gap-2.5 xl:gap-4 2xl:gap-6">
        {/* Left & Middle Group: Brand Logo + 2-Line Description */}
        <div className="w-full xl:w-auto flex flex-col sm:flex-row items-center justify-center xl:justify-start gap-1.5 sm:gap-3.5 lg:gap-4 2xl:gap-6 min-w-0">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 sm:gap-2.5 xl:gap-3 text-[#3A1352] shrink-0 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5D237A]/60 rounded-lg px-1 py-0.5"
            aria-label="SOUNDWITHIN Home"
          >
            <LotusLogoIcon className="w-7 h-4.5 sm:w-9 sm:h-6 2xl:w-10 2xl:h-6.5 text-[#4B1664] transition-transform duration-200 group-hover:scale-105" />
            <span className="font-sans-body text-[12px] sm:text-[13.5px] 2xl:text-[15px] font-bold uppercase tracking-[0.2em] xl:tracking-[0.22em] text-[#3A1352]">
              SOUNDWITHIN
            </span>
          </button>

          <div
            className="hidden sm:block h-8 xl:h-10 w-[1px] bg-[#6B2D8F]/28 shrink-0"
            aria-hidden="true"
          />

          <p className="font-serif-display text-[clamp(10px,2.7vw,12px)] sm:text-[12.5px] md:text-[13.5px] xl:text-[13.5px] 2xl:text-[15px] leading-[1.26] font-medium text-[#34124A] text-center sm:text-left text-balance w-full max-w-[440px] sm:w-[410px] md:w-[485px] xl:w-[465px] 2xl:w-[535px] shrink-0">
            A serene nature-connected space for sound healing, mindful
            meditation, self-awareness and holistic healing retreats in the
            Western Ghats.
          </p>
        </div>

        {/* Social Media Section + Right Copyright Section (Compact horizontal arrangement on all screens) */}
        <div className="w-full xl:w-auto flex items-center justify-between sm:justify-center xl:justify-end gap-2.5 sm:gap-5 xl:gap-4 2xl:gap-6 shrink-0">
          {/* FOLLOW US + 4 Rounded-Square Social Media Buttons */}
          <div className="flex flex-col items-center justify-center shrink-0">
            <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
              <span className="w-3.5 sm:w-5 h-[1px] bg-[#6B2D8F]/35" aria-hidden="true" />
              <span className="font-serif-display text-[9px] sm:text-[10.5px] font-bold uppercase tracking-[0.22em] text-[#3A1352] whitespace-nowrap">
                FOLLOW US
              </span>
              <span className="w-3.5 sm:w-5 h-[1px] bg-[#6B2D8F]/35" aria-hidden="true" />
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 2xl:gap-2.5">
              <button
                type="button"
                onClick={() => handleSocialClick(settings.socialLinks.instagram)}
                aria-label="Instagram"
                className="w-6 h-6 sm:w-7 sm:h-7 2xl:w-8 2xl:h-8 rounded-[7px] sm:rounded-[8px] bg-white/65 hover:bg-gradient-to-br hover:from-[#F4E6FC] hover:to-[#FCE3EE] border border-[#9E75C4]/45 text-[#3A1352] hover:text-[#4B1664] shadow-[0_2px_8px_rgba(75,22,100,0.08)] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5D237A]/60"
              >
                <InstagramIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleSocialClick(settings.socialLinks.youtube)}
                aria-label="YouTube"
                className="w-6 h-6 sm:w-7 sm:h-7 2xl:w-8 2xl:h-8 rounded-[7px] sm:rounded-[8px] bg-white/65 hover:bg-gradient-to-br hover:from-[#F4E6FC] hover:to-[#FCE3EE] border border-[#9E75C4]/45 text-[#3A1352] hover:text-[#4B1664] shadow-[0_2px_8px_rgba(75,22,100,0.08)] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5D237A]/60"
              >
                <YouTubeFilledIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleSocialClick(settings.socialLinks.spotify)}
                aria-label="Facebook"
                className="w-6 h-6 sm:w-7 sm:h-7 2xl:w-8 2xl:h-8 rounded-[7px] sm:rounded-[8px] bg-white/65 hover:bg-gradient-to-br hover:from-[#F4E6FC] hover:to-[#FCE3EE] border border-[#9E75C4]/45 text-[#3A1352] hover:text-[#4B1664] shadow-[0_2px_8px_rgba(75,22,100,0.08)] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5D237A]/60"
              >
                <FacebookFilledIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleSocialClick(settings.socialLinks.community)}
                aria-label="Twitter (X)"
                className="w-6 h-6 sm:w-7 sm:h-7 2xl:w-8 2xl:h-8 rounded-[7px] sm:rounded-[8px] bg-white/65 hover:bg-gradient-to-br hover:from-[#F4E6FC] hover:to-[#FCE3EE] border border-[#9E75C4]/45 text-[#3A1352] hover:text-[#4B1664] shadow-[0_2px_8px_rgba(75,22,100,0.08)] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5D237A]/60"
              >
                <XTwitterIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
          </div>

          {/* Second Thin Vertical Divider */}
          <div className="h-8 xl:h-10 w-[1px] bg-[#6B2D8F]/28 shrink-0" aria-hidden="true" />

          {/* Right Copyright Text */}
          <p className="font-serif-display text-[11px] sm:text-[13.5px] 2xl:text-[15px] font-medium text-[#34124A] whitespace-nowrap">
            &copy; 2025 SoundWithin. All Rights Reserved.
          </p>
        </div>
      </div>

      {/* Floating Back-to-Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-5 right-5 z-40 w-10 h-10 rounded-full sw-btn-pill sw-btn-general flex items-center justify-center cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </footer>
  );
}
