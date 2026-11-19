import React from 'react';
import {Navbar} from './Navbar';
import {WavyOrnament} from './BrandIcons';
import {withBaseUrl} from '../utils/assetUrl';
import type {PageRoute} from '../types';

interface HeroBannerProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  variant?:
    | 'home'
    | 'experiences-studio'
    | 'retreats-riverside'
    | 'about-team'
    | 'contact-corner'
    | 'pink-lantern'
    | 'brass-lantern';
  kicker: string;
  titleLines: string[];
  description: string;
  mobileDescription?: string;
  accentText?: string;
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
  mobileDescription,
  accentText,
  ctaLabel,
  onCtaClick,
  showCalendarIconOnNavCta = false,
}: HeroBannerProps) {
  const isHome = variant === 'home';
  const isExperiencesStudio = variant === 'experiences-studio';
  const isRetreatsRiverside = variant === 'retreats-riverside';
  const isAboutTeam = variant === 'about-team';
  const isContactCorner = variant === 'contact-corner';

  if (isHome) {
    return (
      <section className="relative w-full overflow-hidden">
        {/* Complete horizontal hero image with slightly increased mobile height and responsive focal positioning */}
        <img
          src={withBaseUrl('/assets/aistudio/Meditation_by_the_Waterfall_Lake_459bc306.png')}
          alt="Woman meditating beside Tibetan singing bowls and glowing lantern overlooking a serene waterfall lake"
          width={2172}
          height={724}
          fetchPriority="high"
          decoding="async"
          className="hero-image object-[46%_center] sm:object-center select-none"
        />

        {/* Shared Navigation Bar overlaid at top with dedicated vertical clearance on mobile */}
        <div className="absolute top-0 inset-x-0 z-30">
          <Navbar
            currentPage={currentPage}
            onNavigate={onNavigate}
            showCalendarIconOnCta={showCalendarIconOnNavCta}
          />
        </div>

        {/* Right-Side Hero Content Overlay placed strictly below the mobile Navbar (<640px) while preserving exact sm+ layout */}
        <div className="absolute inset-x-0 top-[45px] bottom-[6px] sm:inset-0 z-20 pointer-events-none flex items-center justify-end">
          <div className="layout-container h-full flex items-center justify-end pt-0 sm:pt-[4vw] pb-0 sm:pb-[1vw]">
            <div className="pointer-events-auto w-[50%] sm:w-[47%] lg:w-[46%] text-center flex flex-col items-center justify-center px-1 sm:px-4">
              {/* Small Introductory Text */}
              <p className="font-sans-body text-[clamp(5.8px,0.86vw,12.5px)] font-semibold uppercase tracking-[0.18em] sm:tracking-[0.26em] text-[#3B1554] [text-shadow:0_0_14px_rgba(255,255,255,0.98),0_1px_3px_rgba(255,255,255,1)] mb-[2px] sm:mb-[0.45vw]">
                {kicker}
              </p>

              {/* Main Serif Display Headline */}
              <h1 className="font-serif-display font-medium uppercase text-[#3A1352] tracking-[0.04em] leading-[1.06] text-[clamp(11.5px,3.15vw,52px)] [text-shadow:0_0_18px_rgba(255,255,255,0.98),0_1px_4px_rgba(255,255,255,1)]">
                {titleLines.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h1>

              {/* Existing Decorative Wave Divider */}
              <div className="my-[2px] sm:my-[0.55vw] drop-shadow-[0_0_8px_rgba(255,255,255,0.95)]">
                <WavyOrnament className="w-[clamp(54px,13vw,208px)] h-[clamp(5px,1.05vw,16px)] text-[#5D237A]" />
              </div>

              {/* Existing Supporting Paragraph */}
              <p className="font-sans-body text-[clamp(6.5px,1.04vw,16px)] text-[#2E1142] leading-[1.35] sm:leading-[1.58] max-w-[clamp(160px,31vw,460px)] font-medium [text-shadow:0_0_14px_rgba(255,255,255,0.98),0_1px_3px_rgba(255,255,255,1)]">
                {description}
              </p>

              {/* "Book Your Session" CTA Button */}
              {ctaLabel && onCtaClick && (
                <div className="mt-[4px] sm:mt-[0.9vw]">
                  <button
                    type="button"
                    onClick={onCtaClick}
                    className="inline-flex items-center justify-center px-[clamp(11px,2.2vw,36px)] py-[clamp(3.5px,0.78vw,14px)] rounded-full bg-gradient-to-r from-[#4B1664] via-[#5E207D] to-[#4B1664] hover:from-[#3B1050] hover:to-[#4B1664] text-white font-sans-body text-[clamp(7px,1vw,15px)] font-medium border border-[#8E53AE] shadow-[0_6px_22px_rgba(75,22,100,0.45)] transition-all duration-200 cursor-pointer whitespace-nowrap text-center"
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

  if (isExperiencesStudio) {
    return (
      <section className="relative w-full overflow-hidden bg-[#F4DDC8]">
        {/* Complete 2172x724 horizontal banner across desktop, laptop, tablet, and mobile */}
        <img
          src={withBaseUrl('/assets/aistudio/Serene_Yoga_Studio_Guidance_Session_d3c1618c.png')}
          alt="Yoga instructor gently guiding students during a serene sound healing and yoga session in a sunlit studio"
          width={2172}
          height={724}
          fetchPriority="high"
          decoding="async"
          className="hero-image object-[52%_center] sm:object-center select-none"
        />

        {/* Shared Navigation Bar overlaid at top */}
        <div className="absolute top-0 inset-x-0 z-30">
          <Navbar
            currentPage={currentPage}
            onNavigate={onNavigate}
            showCalendarIconOnCta={showCalendarIconOnNavCta}
          />
        </div>

        {/* Left-Hand Content placed strictly below mobile navbar (<640px) and within the open sunlit wall space across all breakpoints */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="pointer-events-auto absolute left-[8%] top-[46px] bottom-[8px] w-[38%] sm:left-[13.5%] sm:top-[17.5%] sm:bottom-[23.5%] sm:w-[31.5%] max-w-[470px] flex flex-col justify-center items-start text-left">
            {/* Eyebrow */}
            <p className="font-montserrat text-[clamp(5.2px,0.78vw,12px)] font-medium uppercase tracking-[0.14em] sm:tracking-[2px] lg:tracking-[2.8px] text-[#B78A45] mb-[2px] sm:mb-[0.5vw]">
              {kicker}
            </p>

            {/* Main Heading */}
            <h1 className="font-serif-display font-medium text-[#70283F] tracking-[0.01em] leading-[1.08] text-[clamp(11.5px,2.45vw,40px)] mb-[3px] sm:mb-[0.65vw]">
              {titleLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            {/* Supporting Description (concise on mobile <640px so horizontal composition stays clean, full text on tablet & desktop) */}
            {mobileDescription ? (
              <>
                <p className="sm:hidden font-montserrat font-normal text-[#49343A] text-[clamp(6.4px,0.92vw,14.5px)] leading-[1.35]">
                  {mobileDescription}
                </p>
                <p className="hidden sm:block font-montserrat font-normal text-[#49343A] text-[clamp(8.5px,0.94vw,14.5px)] leading-[1.52] lg:leading-[1.6] max-w-[445px]">
                  {description}
                </p>
              </>
            ) : (
              <p className="font-montserrat font-normal text-[#49343A] text-[clamp(6.4px,0.94vw,14.5px)] leading-[1.35] sm:leading-[1.52] lg:leading-[1.6] max-w-[445px]">
                {description}
              </p>
            )}

            {/* Optional Small Accent */}
            {accentText && (
              <div className="mt-[3px] sm:mt-[0.75vw] flex items-center gap-1.5 sm:gap-2.5">
                <span className="w-[clamp(10px,2vw,30px)] h-[1px] bg-[#B78A45]/75 shrink-0" />
                <p className="font-serif-display italic font-medium text-[#B78A45] text-[clamp(6.5px,1.02vw,15.5px)] tracking-[0.02em]">
                  {accentText}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (isRetreatsRiverside) {
    return (
      <section className="relative w-full overflow-hidden bg-[#2C1E18]">
        {/* Complete 2172x724 horizontal retreat banner across desktop, laptop, tablet, and mobile */}
        <img
          src={withBaseUrl('/assets/aistudio/Golden_Riverside_Meditation_Retreat__1__3a0be666.png')}
          alt="Outdoor riverside sound healing and meditation retreat beside a serene waterfall in the golden morning sun"
          width={2172}
          height={724}
          fetchPriority="high"
          decoding="async"
          className="hero-image object-[52%_center] sm:object-center select-none"
        />

        {/* Subtle warm-dark left gradient veil only over the open sunbeam mist area for crisp text readability */}
        <div
          className="absolute inset-y-0 left-0 w-[52%] bg-gradient-to-r from-[#1D0F13]/52 via-[#27151A]/28 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Shared Navigation Bar overlaid at top */}
        <div className="absolute top-0 inset-x-0 z-30">
          <Navbar
            currentPage={currentPage}
            onNavigate={onNavigate}
            showCalendarIconOnCta={showCalendarIconOnNavCta}
          />
        </div>

        {/* Left-Hand Content placed strictly below the mobile navbar (<640px) and within the open golden-mist area across all breakpoints */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="pointer-events-auto absolute left-[7.5%] top-[46px] bottom-[8px] w-[38%] sm:left-[11.5%] sm:top-[17%] sm:bottom-[27%] sm:w-[31%] max-w-[460px] flex flex-col justify-center items-start text-left">
            {/* Eyebrow */}
            <p className="font-montserrat text-[clamp(5px,0.74vw,11.5px)] font-medium uppercase tracking-[0.14em] sm:tracking-[2px] lg:tracking-[2.6px] text-[#E6C07B] [text-shadow:0_1px_8px_rgba(18,7,11,0.68)] mb-[2px] sm:mb-[0.45vw]">
              {kicker}
            </p>

            {/* Main Heading */}
            <h1 className="font-serif-display font-medium text-[#FFFBF4] tracking-[0.01em] leading-[1.08] text-[clamp(11.5px,2.4vw,39px)] [text-shadow:0_2px_14px_rgba(20,8,12,0.72)] mb-[3px] sm:mb-[0.55vw]">
              {titleLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            {/* Supporting Text */}
            <p className="font-montserrat font-normal text-[#F6EDE2] text-[clamp(6.2px,0.92vw,14px)] leading-[1.34] sm:leading-[1.54] max-w-[430px] [text-shadow:0_1px_10px_rgba(18,7,11,0.68)]">
              {description}
            </p>

            {/* CTA Button */}
            {ctaLabel && onCtaClick && (
              <div className="mt-[4px] sm:mt-[0.85vw]">
                <button
                  type="button"
                  onClick={onCtaClick}
                  className="inline-flex items-center justify-center px-[clamp(10px,1.85vw,30px)] py-[clamp(3px,0.62vw,11px)] rounded-full bg-gradient-to-r from-[#611F35] via-[#70283F] to-[#581B2F] hover:from-[#7A2B45] hover:to-[#611F35] text-[#FFFBF4] font-montserrat text-[clamp(6.2px,0.88vw,13.5px)] font-medium tracking-[0.03em] border border-[#B78A45]/85 shadow-[0_6px_20px_rgba(28,9,16,0.48)] transition-all duration-200 cursor-pointer whitespace-nowrap text-center"
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

  if (isAboutTeam) {
    return (
      <section className="relative w-full overflow-hidden bg-[#E5C9B0]">
        {/* Complete 2172x724 horizontal team photograph across desktop, laptop, tablet, and mobile */}
        <img
          src={withBaseUrl('/assets/aistudio/SoundWithin_Team_in_Harmony_1a347842.png')}
          alt="The SoundWithin team seated together in harmony beside Tibetan singing bowls, amethyst crystal, and brass gong"
          width={2172}
          height={724}
          fetchPriority="high"
          decoding="async"
          className="hero-image object-[56%_center] sm:object-center select-none"
        />

        {/* Shared Navigation Bar overlaid at top */}
        <div className="absolute top-0 inset-x-0 z-30">
          <Navbar
            currentPage={currentPage}
            onNavigate={onNavigate}
            showCalendarIconOnCta={showCalendarIconOnNavCta}
          />
        </div>

        {/* Left-Hand Content placed strictly below the mobile navbar (<640px) and within the empty left third so all five team members, plant, and singing bowls remain 100% unobstructed */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="pointer-events-auto absolute left-[6.5%] top-[46px] bottom-[8px] w-[33.5%] sm:left-[9.5%] sm:top-[18.5%] sm:bottom-[13.5%] sm:w-[26%] max-w-[420px] flex flex-col justify-center items-start text-left">
            {/* Small Eyebrow Text */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-[2px] sm:mb-[0.5vw]">
              <span className="w-[clamp(8px,1.4vw,22px)] h-[1px] bg-[#C69A4A] shrink-0" />
              <p className="font-montserrat text-[clamp(5px,0.75vw,11.5px)] font-semibold uppercase tracking-[0.15em] sm:tracking-[2px] lg:tracking-[2.6px] text-[#C69A4A] [text-shadow:0_1px_2px_rgba(255,248,240,0.65)]">
                {kicker}
              </p>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif-display font-medium text-[#64243B] tracking-[0.01em] leading-[1.08] text-[clamp(11px,2.2vw,36px)] mb-[3px] sm:mb-[0.65vw]">
              {titleLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            {/* Supporting Text (compact on mobile <640px to keep horizontal composition clean, full text on tablet & desktop) */}
            {mobileDescription ? (
              <>
                <p className="sm:hidden font-montserrat font-normal text-[#463038] text-[clamp(6.2px,0.88vw,13.5px)] leading-[1.34]">
                  {mobileDescription}
                </p>
                <p className="hidden sm:block font-montserrat font-normal text-[#463038] text-[clamp(8px,0.9vw,14px)] leading-[1.52] lg:leading-[1.6] max-w-[405px]">
                  {description}
                </p>
              </>
            ) : (
              <p className="font-montserrat font-normal text-[#463038] text-[clamp(6.2px,0.9vw,14px)] leading-[1.34] sm:leading-[1.52] lg:leading-[1.6] max-w-[405px]">
                {description}
              </p>
            )}

            {/* Optional Small CTA */}
            {ctaLabel && onCtaClick && (
              <div className="mt-[4px] sm:mt-[0.85vw]">
                <button
                  type="button"
                  onClick={onCtaClick}
                  className="inline-flex items-center justify-center px-[clamp(10px,1.75vw,28px)] py-[clamp(2.8px,0.58vw,10px)] rounded-full bg-[#64243B] hover:bg-[#521B2F] text-[#FFFBF5] font-montserrat text-[clamp(6px,0.86vw,13px)] font-medium tracking-[0.03em] border border-[#C69A4A]/85 shadow-[0_5px_16px_rgba(100,36,59,0.28)] transition-all duration-200 cursor-pointer whitespace-nowrap text-center"
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

  if (isContactCorner) {
    return (
      <section className="relative w-full overflow-hidden bg-[#F1D5BD]">
        {/* Complete 2172x724 horizontal contact banner across desktop, laptop, tablet, and mobile */}
        <img
          src={withBaseUrl('/assets/aistudio/Cozy_Lotus_Contact_Corner_e4ead764.png')}
          alt="Warm sunlit wooden desk with vintage telephone, notebook and pen, steaming lotus ceramic cup, pink lotus blossom, and glowing brass lantern"
          width={2172}
          height={724}
          fetchPriority="high"
          decoding="async"
          className="hero-image object-[55%_center] sm:object-center select-none"
        />

        {/* Shared Navigation Bar overlaid at top */}
        <div className="absolute top-0 inset-x-0 z-30">
          <Navbar
            currentPage={currentPage}
            onNavigate={onNavigate}
            showCalendarIconOnCta={showCalendarIconOnNavCta}
          />
        </div>

        {/* Left-Hand Content placed strictly below the mobile navbar (<640px) and in the empty sunlit wall space so the table, lotus, cup, notebook, telephone, and lantern remain 100% clear */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="pointer-events-auto absolute left-[6.5%] top-[48px] bottom-[10px] w-[35%] sm:left-[8.5%] sm:top-[23%] sm:bottom-[21%] sm:w-[29%] max-w-[440px] flex flex-col justify-center items-start text-left">
            {/* Small Eyebrow Text */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-[2px] sm:mb-[0.5vw]">
              <span className="w-[clamp(8px,1.4vw,22px)] h-[1px] bg-[#B78A45] shrink-0" />
              <p className="font-montserrat text-[clamp(5.2px,0.78vw,12px)] font-semibold uppercase tracking-[0.16em] sm:tracking-[2.2px] lg:tracking-[2.8px] text-[#B78A45]">
                {kicker}
              </p>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif-display font-medium text-[#64243B] tracking-[0.01em] leading-[1.08] text-[clamp(13px,2.75vw,44px)] mb-[3px] sm:mb-[0.7vw]">
              {titleLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            {/* Supporting Text */}
            <p className="font-montserrat font-normal text-[#49343A] text-[clamp(6.4px,0.95vw,15px)] leading-[1.36] sm:leading-[1.58] max-w-[415px]">
              {description}
            </p>
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
        <div className="relative h-full w-full lg:w-[66%] min-h-[415px] sm:min-h-[380px] lg:min-h-[450px]">
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
      <div className="relative z-20 layout-container flex items-center justify-end pt-9 pb-16 sm:pt-10 sm:pb-16 min-h-[335px] sm:min-h-[300px] lg:min-h-[370px]">
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
