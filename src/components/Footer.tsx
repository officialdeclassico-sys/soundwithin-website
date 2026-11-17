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
    <footer className="relative w-full bg-[#250739] text-white m-0 p-0 border-0">
      <div className="layout-container min-h-[60px] md:h-[78px] py-2 md:py-0 flex items-center justify-between gap-3 sm:gap-6 lg:gap-8">
        {/* Left Section: Lotus Logo + SOUNDWITHIN Wordmark (Hidden on small mobile to keep compact) */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="hidden md:flex items-center gap-3.5 text-white shrink-0 cursor-pointer group focus:outline-none"
          aria-label="SOUNDWITHIN Home"
        >
          <LotusLogoIcon className="w-11 h-7 text-white transition-transform duration-200 group-hover:scale-105" />
          <span className="font-sans-body text-[14px] lg:text-[15px] font-bold uppercase tracking-[0.22em] text-white">
            SOUNDWITHIN
          </span>
        </button>

        {/* First Thin Vertical Divider + Middle Brand Description */}
        <div className="hidden lg:flex items-center gap-7 xl:gap-9 min-w-0">
          <div className="h-10 w-[1px] bg-white/45 shrink-0" aria-hidden="true" />
          <p className="font-serif-display text-[15px] xl:text-[16.5px] leading-[1.28] text-[#F1E8FA] max-w-[465px]">
            A serene nature-connected space for sound healing, mindful
            meditation, self-awareness and holistic healing retreats in the
            Western Ghats.
          </p>
        </div>

        {/* Social Media Section + Right Copyright Section (Compact horizontal arrangement on all screens) */}
        <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-3 sm:gap-6 lg:gap-8 shrink-0">
          {/* FOLLOW US + 4 Rounded-Square Social Media Buttons */}
          <div className="flex flex-col items-center justify-center shrink-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-4 sm:w-6 h-[1px] bg-white/55" aria-hidden="true" />
              <span className="font-serif-display text-[9.5px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-white whitespace-nowrap">
                FOLLOW US
              </span>
              <span className="w-4 sm:w-6 h-[1px] bg-white/55" aria-hidden="true" />
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <button
                type="button"
                onClick={() => handleSocialClick(settings.socialLinks.instagram)}
                aria-label="Instagram"
                className="w-6.5 h-6.5 sm:w-8 sm:h-8 rounded-[7px] sm:rounded-[8px] bg-[#692B8D] hover:bg-[#7F36A9] text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <InstagramIcon className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
              </button>

              <button
                type="button"
                onClick={() => handleSocialClick(settings.socialLinks.youtube)}
                aria-label="YouTube"
                className="w-6.5 h-6.5 sm:w-8 sm:h-8 rounded-[7px] sm:rounded-[8px] bg-[#692B8D] hover:bg-[#7F36A9] text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <YouTubeFilledIcon className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
              </button>

              <button
                type="button"
                onClick={() => handleSocialClick(settings.socialLinks.spotify)}
                aria-label="Facebook"
                className="w-6.5 h-6.5 sm:w-8 sm:h-8 rounded-[7px] sm:rounded-[8px] bg-[#692B8D] hover:bg-[#7F36A9] text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <FacebookFilledIcon className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
              </button>

              <button
                type="button"
                onClick={() => handleSocialClick(settings.socialLinks.community)}
                aria-label="Twitter (X)"
                className="w-6.5 h-6.5 sm:w-8 sm:h-8 rounded-[7px] sm:rounded-[8px] bg-[#692B8D] hover:bg-[#7F36A9] text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <XTwitterIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* Second Thin Vertical Divider */}
          <div className="h-8 sm:h-10 w-[1px] bg-white/45 shrink-0" aria-hidden="true" />

          {/* Right Copyright Text */}
          <p className="font-serif-display text-[12px] sm:text-[14.5px] lg:text-[15.5px] text-[#F1E8FA] whitespace-nowrap">
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
          className="fixed bottom-5 right-5 z-40 w-10 h-10 rounded-full bg-[#4B1664] text-white border border-[#9B63BD] shadow-[0_4px_18px_rgba(38,13,56,0.45)] flex items-center justify-center hover:bg-[#3A0E50] transition-all cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </footer>
  );
}
