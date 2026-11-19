import React from 'react';
import {Navbar} from './Navbar';
import {WavyOrnament} from './BrandIcons';
import {withBaseUrl} from '../utils/assetUrl';
import type {PageRoute} from '../types';

interface HeroBannerProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  variant?: 'home' | 'pink-lantern' | 'brass-lantern';
  kicker: string;
  titleLines: string[];
  description: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  showCalendarIconOnNavCta?: boolean;
}

export function HeroBanner({
  currentPage,
  onNavigate,
  variant = 'brass-lantern',
  kicker,
  titleLines,
  description,
  ctaLabel,
  onCtaClick,
  showCalendarIconOnNavCta = false,
}: HeroBannerProps) {
  const isHome = variant === 'home';

  if (isHome) {
    return (
      <section className="relative w-full overflow-hidden">
        {/* Complete uncropped horizontal hero image driving natural aspect-ratio height across all devices */}
        <img
          src={withBaseUrl('/assets/aistudio/Meditation_by_the_Waterfall_Lake_459bc306.png')}
          alt="Woman meditating beside Tibetan singing bowls and glowing lantern overlooking a serene waterfall lake"
          width={2172}
          height={724}
          fetchPriority="high"
          decoding="async"
          className="hero-image select-none"
        />

        {/* Shared Navigation Bar overlaid at top without altering image or adding colour blocks */}
        <div className="absolute top-0 inset-x-0 z-30">
          <Navbar
            currentPage={currentPage}
            onNavigate={onNavigate}
            showCalendarIconOnCta={showCalendarIconOnNavCta}
          />
        </div>

        {/* Right-Side Hero Content Overlay preserving horizontal composition on Desktop, Laptop, Tablet & Mobile */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-end">
          <div className="layout-container h-full flex items-center justify-end pt-[4.5vw] sm:pt-[4vw] pb-[1vw]">
            <div className="pointer-events-auto w-[48%] sm:w-[47%] lg:w-[46%] text-center flex flex-col items-center justify-center px-1 sm:px-4">
              {/* Small Introductory Text */}
              <p className="font-sans-body text-[clamp(5.5px,0.86vw,12.5px)] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.26em] text-[#3B1554] [text-shadow:0_0_14px_rgba(255,255,255,0.98),0_1px_3px_rgba(255,255,255,1)] mb-[0.45vw]">
                {kicker}
              </p>

              {/* Main Serif Display Headline */}
              <h1 className="font-serif-display font-medium uppercase text-[#3A1352] tracking-[0.04em] leading-[1.06] text-[clamp(10.5px,3.15vw,52px)] [text-shadow:0_0_18px_rgba(255,255,255,0.98),0_1px_4px_rgba(255,255,255,1)]">
                {titleLines.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h1>

              {/* Existing Decorative Wave Divider */}
              <div className="my-[0.55vw] drop-shadow-[0_0_8px_rgba(255,255,255,0.95)]">
                <WavyOrnament className="w-[clamp(52px,13vw,208px)] h-[clamp(5px,1.05vw,16px)] text-[#5D237A]" />
              </div>

              {/* Existing Supporting Paragraph */}
              <p className="font-sans-body text-[clamp(6px,1.04vw,16px)] text-[#2E1142] leading-[1.38] sm:leading-[1.58] max-w-[clamp(150px,31vw,460px)] font-medium [text-shadow:0_0_14px_rgba(255,255,255,0.98),0_1px_3px_rgba(255,255,255,1)]">
                {description}
              </p>

              {/* "Book Your Session" CTA Button */}
              {ctaLabel && onCtaClick && (
                <div className="mt-[0.9vw]">
                  <button
                    type="button"
                    onClick={onCtaClick}
                    className="inline-flex items-center justify-center px-[clamp(10px,2.2vw,36px)] py-[clamp(3px,0.78vw,14px)] rounded-full bg-gradient-to-r from-[#4B1664] via-[#5E207D] to-[#4B1664] hover:from-[#3B1050] hover:to-[#4B1664] text-white font-sans-body text-[clamp(6.5px,1vw,15px)] font-medium border border-[#8E53AE] shadow-[0_6px_22px_rgba(75,22,100,0.45)] transition-all duration-200 cursor-pointer whitespace-nowrap text-center"
                  >
                    <span>{ctaLabel}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const leftSceneSrc =
    variant === 'pink-lantern'
      ? withBaseUrl('/assets/extracted/hero_subpage_pink_left.png')
      : withBaseUrl('/assets/extracted/hero_subpage_lantern_left.png');

  return (
    <section className="relative w-full overflow-hidden bg-[#EAE0F6]">
      {/* Base ambient waterfall & forest backdrop for inner pages */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="relative h-full w-full lg:w-[66%] min-h-[380px] lg:min-h-[450px]">
          <img
            src={leftSceneSrc}
            alt="Serene Indian waterfall surrounded by purple blossoms and Tibetan singing bowls"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-left-bottom"
          />
          <div className="hidden lg:block absolute inset-y-0 right-0 w-48 bg-gradient-to-r from-transparent via-[#EAE0F6]/85 to-[#EFE7FA]" />
          <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#2A103C]/35 via-[#EFE7FA]/75 to-[#F7F2FC]" />
        </div>

        <div className="hidden lg:block absolute inset-y-0 right-0 w-[46%] bg-gradient-to-l from-[#E8DCF6] via-[#F3ECFB] to-transparent" />
        <div className="absolute top-0 left-0 w-80 h-28 bg-gradient-to-br from-[#230B33]/65 via-[#230B33]/25 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#FAF7FD] via-[#FAF7FD]/70 to-transparent" />
      </div>

      {/* Shared Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={onNavigate}
        showCalendarIconOnCta={showCalendarIconOnNavCta}
      />

      {/* Hero Content Container */}
      <div className="relative z-20 layout-container flex items-center justify-end pt-6 pb-14 sm:pt-10 sm:pb-16 min-h-[300px] lg:min-h-[370px]">
        <div className="w-full lg:w-[50%] xl:w-[46%] text-center flex flex-col items-center px-2 sm:px-6 py-6 rounded-3xl lg:bg-radial lg:from-[#F8F3FD]/90 lg:via-[#F2E9FB]/75 lg:to-transparent">
          <p className="font-sans-body text-[11px] sm:text-[12.5px] font-semibold uppercase tracking-[0.26em] text-[#3B1554] mb-3">
            {kicker}
          </p>

          <h1 className="font-serif-display font-medium uppercase text-[#3A1352] tracking-[0.04em] leading-[1.12] text-[32px] sm:text-[42px] lg:text-[50px]">
            {titleLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>

          <div className="my-4">
            <WavyOrnament className="w-44 sm:w-52 h-4 text-[#5D237A]" />
          </div>

          <p className="font-sans-body text-[14.5px] sm:text-[16px] text-[#2E1142] leading-[1.65] max-w-[480px] font-normal">
            {description}
          </p>

          {ctaLabel && onCtaClick && (
            <div className="mt-7">
              <button
                type="button"
                onClick={onCtaClick}
                className="inline-flex items-center justify-center px-9 py-3.5 rounded-full bg-gradient-to-r from-[#4B1664] via-[#5E207D] to-[#4B1664] hover:from-[#3B1050] hover:to-[#4B1664] text-white font-sans-body text-[15px] font-medium border border-[#8E53AE] shadow-[0_6px_22px_rgba(75,22,100,0.42)] transition-all duration-200 cursor-pointer whitespace-nowrap text-center"
              >
                <span>{ctaLabel}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
