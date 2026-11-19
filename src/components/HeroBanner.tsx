import React from 'react';
import {Navbar} from './Navbar';
import {WavyOrnament} from './BrandIcons';
import {withBaseUrl} from '../utils/assetUrl';
import {BUTTON_TOKENS} from '../utils/buttonThemes';
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
    | 'book-peace'
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
  const isBookPeace = variant === 'book-peace';

  if (isHome) {
    return (
      <section className="relative w-full overflow-hidden bg-[#EAD2BA]">
        {/* Exact attached homepage hero banner image — horizontal across desktop, laptop, tablet, and mobile */}
        <img
          src={withBaseUrl(
            '/assets/aistudio/Sunlit_Meditation_Studio_with_Singing_Bowls_3211c8df.png'
          )}
          alt="Serene sunlit meditation and sound healing studio with Tibetan singing bowls, glowing candle lantern,brass gong, and practitioners in mindful stillness"
          width={2172}
          height={724}
          fetchPriority="high"
          decoding="async"
          className="hero-image object-[54%_center] sm:object-center select-none"
        />

        {/* Subtle warm-violet & cream radial contrast veil on the left sunlit wall for crisp readability without obscuring the studio scene */}
        <div
          className="absolute inset-y-0 left-0 w-[54%] bg-gradient-to-r from-[#FAF6FE]/45 via-[#F6EEFC]/22 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Shared Navigation Bar overlaid at top with dedicated vertical clearance on mobile */}
        <div className="absolute top-0 inset-x-0 z-30">
          <Navbar
            currentPage={currentPage}
            onNavigate={onNavigate}
            showCalendarIconOnCta={showCalendarIconOnNavCta}
          />
        </div>

        {/* Left-Hand Hero Content positioned in the open sunlit wall space, strictly below the mobile Navbar (<640px) and clear of the meditators and singing bowl */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="pointer-events-auto absolute left-[5.5%] top-[40px] bottom-[8px] w-[46%] sm:left-[12.5%] sm:top-[16.5%] sm:bottom-[25%] sm:w-[34%] lg:left-[13%] lg:w-[33%] max-w-[475px] flex flex-col justify-center items-start text-left">
            {/* Eyebrow with subtle violet accent line */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-[2px] sm:mb-[0.45vw]">
              <span className="w-[clamp(9px,2vw,16px)] sm:w-[clamp(10px,1.4vw,22px)] h-[1.5px] bg-[#5D237A] shrink-0" />
              <p className="font-sans-body text-[clamp(7.2px,1.95vw,9.5px)] sm:text-[clamp(7.5px,0.75vw,11.5px)] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.2em] lg:tracking-[0.22em] text-[#5D237A] [text-shadow:0_1px_10px_rgba(255,252,248,0.9)]">
                {kicker}
              </p>
            </div>

            {/* Main Editorial Serif Headline in SoundWithin Deep Violet */}
            <h1 className="font-serif-display font-semibold text-[#3A1352] tracking-[0.01em] leading-[1.06] text-[clamp(14.5px,3.95vw,19.5px)] sm:text-[clamp(16px,2.55vw,43px)] [text-shadow:0_1px_12px_rgba(255,252,248,0.92)] mb-[2px] sm:mb-[0.4vw]">
              {titleLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            {/* Delicate Violet Wave Ornament */}
            <div className="my-[1.5px] sm:my-[0.35vw] drop-shadow-[0_1px_6px_rgba(255,252,248,0.85)]">
              <WavyOrnament className="w-[clamp(58px,14vw,95px)] sm:w-[clamp(65px,10.5vw,160px)] h-[clamp(5px,1.2vw,8px)] sm:h-[clamp(5px,0.85vw,13px)] text-[#6B2D8F]" />
            </div>

            {/* Supporting Description (concise on mobile <640px for clean horizontal fit, full on tablet/laptop/desktop) */}
            {mobileDescription ? (
              <>
                <p className="sm:hidden font-sans-body font-medium text-[#2E1142] text-[clamp(8.4px,2.25vw,10.8px)] leading-[1.3] [text-shadow:0_1px_8px_rgba(255,252,248,0.94)]">
                  {mobileDescription}
                </p>
                <p className="hidden sm:block font-sans-body font-medium text-[#2E1142] text-[clamp(8.2px,0.94vw,14.5px)] leading-[1.5] lg:leading-[1.58] max-w-[435px] [text-shadow:0_1px_10px_rgba(255,252,248,0.92)]">
                  {description}
                </p>
              </>
            ) : (
              <p className="font-sans-body font-medium text-[#2E1142] text-[clamp(8.4px,2.25vw,10.8px)] sm:text-[clamp(8.2px,0.94vw,14.5px)] leading-[1.3] sm:leading-[1.52] lg:leading-[1.58] max-w-[435px] [text-shadow:0_1px_10px_rgba(255,252,248,0.92)]">
                {description}
              </p>
            )}

            {/* Primary Violet Pill CTA Button */}
            {ctaLabel && onCtaClick && (
              <div className="mt-[4px] sm:mt-[0.75vw]">
                <button
                  type="button"
                  onClick={onCtaClick}
                  className={`inline-flex items-center justify-center px-[clamp(12px,3.2vw,18px)] py-[clamp(4px,1.05vw,6.5px)] sm:px-[clamp(12px,1.9vw,32px)] sm:py-[clamp(4px,0.65vw,11.5px)] rounded-full font-sans-body text-[clamp(8.2px,2.15vw,10.5px)] sm:text-[clamp(8px,0.92vw,14px)] font-medium tracking-[0.02em] cursor-pointer whitespace-nowrap text-center ${BUTTON_TOKENS.general}`}
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
          <div className="pointer-events-auto absolute left-[6%] top-[40px] bottom-[8px] w-[44%] sm:left-[13.5%] sm:top-[17.5%] sm:bottom-[23.5%] sm:w-[31.5%] max-w-[470px] flex flex-col justify-center items-start text-left">
            {/* Eyebrow */}
            <p className="font-montserrat text-[clamp(7.2px,1.95vw,9.5px)] sm:text-[clamp(7.5px,0.78vw,12px)] font-medium uppercase tracking-[0.12em] sm:tracking-[2px] lg:tracking-[2.8px] text-[#B78A45] mb-[2px] sm:mb-[0.5vw]">
              {kicker}
            </p>

            {/* Main Heading */}
            <h1 className="font-serif-display font-medium text-[#70283F] tracking-[0.01em] leading-[1.06] text-[clamp(14.5px,3.9vw,19px)] sm:text-[clamp(16px,2.45vw,40px)] mb-[3px] sm:mb-[0.65vw]">
              {titleLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            {/* Supporting Description (concise on mobile <640px so horizontal composition stays clean, full text on tablet & desktop) */}
            {mobileDescription ? (
              <>
                <p className="sm:hidden font-montserrat font-normal text-[#49343A] text-[clamp(8.4px,2.25vw,10.8px)] leading-[1.32]">
                  {mobileDescription}
                </p>
                <p className="hidden sm:block font-montserrat font-normal text-[#49343A] text-[clamp(8.5px,0.94vw,14.5px)] leading-[1.52] lg:leading-[1.6] max-w-[445px]">
                  {description}
                </p>
              </>
            ) : (
              <p className="font-montserrat font-normal text-[#49343A] text-[clamp(8.4px,2.25vw,10.8px)] sm:text-[clamp(8.5px,0.94vw,14.5px)] leading-[1.32] sm:leading-[1.52] lg:leading-[1.6] max-w-[445px]">
                {description}
              </p>
            )}

            {/* Optional Small Accent */}
            {accentText && (
              <div className="mt-[4px] sm:mt-[0.75vw] flex items-center gap-1.5 sm:gap-2.5">
                <span className="w-[clamp(10px,2.5vw,18px)] sm:w-[clamp(12px,2vw,30px)] h-[1px] bg-[#B78A45]/75 shrink-0" />
                <p className="font-serif-display italic font-medium text-[#B78A45] text-[clamp(8.2px,2.15vw,10.5px)] sm:text-[clamp(8.5px,1.02vw,15.5px)] tracking-[0.02em]">
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
          <div className="pointer-events-auto absolute left-[5.5%] top-[40px] bottom-[8px] w-[44%] sm:left-[11.5%] sm:top-[17%] sm:bottom-[27%] sm:w-[31%] max-w-[460px] flex flex-col justify-center items-start text-left">
            {/* Eyebrow */}
            <p className="font-montserrat text-[clamp(6.8px,1.8vw,9px)] sm:text-[clamp(7.5px,0.74vw,11.5px)] font-medium uppercase tracking-[0.12em] sm:tracking-[2px] lg:tracking-[2.6px] text-[#E6C07B] [text-shadow:0_1px_8px_rgba(18,7,11,0.75)] mb-[2px] sm:mb-[0.45vw]">
              {kicker}
            </p>

            {/* Main Heading */}
            <h1 className="font-serif-display font-medium text-[#FFFBF4] tracking-[0.01em] leading-[1.06] text-[clamp(14.5px,3.85vw,18.5px)] sm:text-[clamp(16px,2.4vw,39px)] [text-shadow:0_2px_14px_rgba(20,8,12,0.78)] mb-[3px] sm:mb-[0.55vw]">
              {titleLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            {/* Supporting Text */}
            <p className="font-montserrat font-normal text-[#F6EDE2] text-[clamp(8.3px,2.2vw,10.5px)] sm:text-[clamp(8.5px,0.92vw,14px)] leading-[1.3] sm:leading-[1.54] max-w-[430px] [text-shadow:0_1px_10px_rgba(18,7,11,0.75)]">
              {description}
            </p>

            {/* CTA Button */}
            {ctaLabel && onCtaClick && (
              <div className="mt-[4px] sm:mt-[0.85vw]">
                <button
                  type="button"
                  onClick={onCtaClick}
                  className={`inline-flex items-center justify-center px-[clamp(11px,3vw,17px)] py-[clamp(3.5px,0.95vw,6px)] sm:px-[clamp(12px,1.85vw,30px)] sm:py-[clamp(4px,0.62vw,11px)] rounded-full font-montserrat text-[clamp(8px,2.1vw,10px)] sm:text-[clamp(8px,0.88vw,13.5px)] font-medium tracking-[0.03em] cursor-pointer whitespace-nowrap text-center ${BUTTON_TOKENS.rosePlum}`}
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
          <div className="pointer-events-auto absolute left-[5.5%] top-[40px] bottom-[8px] w-[39%] sm:left-[9.5%] sm:top-[18.5%] sm:bottom-[13.5%] sm:w-[26%] max-w-[420px] flex flex-col justify-center items-start text-left">
            {/* Small Eyebrow Text */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-[2px] sm:mb-[0.5vw]">
              <span className="w-[clamp(9px,2vw,16px)] sm:w-[clamp(10px,1.4vw,22px)] h-[1px] bg-[#C69A4A] shrink-0" />
              <p className="font-montserrat text-[clamp(6.8px,1.8vw,9px)] sm:text-[clamp(7.5px,0.75vw,11.5px)] font-semibold uppercase tracking-[0.12em] sm:tracking-[2px] lg:tracking-[2.6px] text-[#C69A4A] [text-shadow:0_1px_2px_rgba(255,248,240,0.65)]">
                {kicker}
              </p>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif-display font-medium text-[#64243B] tracking-[0.01em] leading-[1.06] text-[clamp(13.5px,3.6vw,17.5px)] sm:text-[clamp(14.5px,2.2vw,36px)] mb-[3px] sm:mb-[0.65vw]">
              {titleLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            {/* Supporting Text (compact on mobile <640px to keep horizontal composition clean, full text on tablet & desktop) */}
            {mobileDescription ? (
              <>
                <p className="sm:hidden font-montserrat font-normal text-[#463038] text-[clamp(8.2px,2.15vw,10.2px)] leading-[1.3]">
                  {mobileDescription}
                </p>
                <p className="hidden sm:block font-montserrat font-normal text-[#463038] text-[clamp(8px,0.9vw,14px)] leading-[1.52] lg:leading-[1.6] max-w-[405px]">
                  {description}
                </p>
              </>
            ) : (
              <p className="font-montserrat font-normal text-[#463038] text-[clamp(8.2px,2.15vw,10.2px)] sm:text-[clamp(8px,0.9vw,14px)] leading-[1.3] sm:leading-[1.52] lg:leading-[1.6] max-w-[405px]">
                {description}
              </p>
            )}

            {/* Optional Small CTA */}
            {ctaLabel && onCtaClick && (
              <div className="mt-[4px] sm:mt-[0.85vw]">
                <button
                  type="button"
                  onClick={onCtaClick}
                  className={`inline-flex items-center justify-center px-[clamp(11px,2.9vw,16px)] py-[clamp(3.5px,0.95vw,5.5px)] sm:px-[clamp(12px,1.75vw,28px)] sm:py-[clamp(3.5px,0.58vw,10px)] rounded-full font-montserrat text-[clamp(7.8px,2.05vw,9.8px)] sm:text-[clamp(8px,0.86vw,13px)] font-medium tracking-[0.03em] cursor-pointer whitespace-nowrap text-center ${BUTTON_TOKENS.rosePlum}`}
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
          <div className="pointer-events-auto absolute left-[5.5%] top-[40px] bottom-[8px] w-[42%] sm:left-[8.5%] sm:top-[23%] sm:bottom-[21%] sm:w-[29%] max-w-[440px] flex flex-col justify-center items-start text-left">
            {/* Small Eyebrow Text */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-[2px] sm:mb-[0.5vw]">
              <span className="w-[clamp(9px,2vw,16px)] sm:w-[clamp(10px,1.4vw,22px)] h-[1px] bg-[#B78A45] shrink-0" />
              <p className="font-montserrat text-[clamp(7.2px,1.95vw,9.5px)] sm:text-[clamp(7.5px,0.78vw,12px)] font-semibold uppercase tracking-[0.14em] sm:tracking-[2.2px] lg:tracking-[2.8px] text-[#B78A45]">
                {kicker}
              </p>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif-display font-medium text-[#64243B] tracking-[0.01em] leading-[1.06] text-[clamp(16px,4.3vw,20.5px)] sm:text-[clamp(17px,2.75vw,44px)] mb-[3px] sm:mb-[0.7vw]">
              {titleLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            {/* Supporting Text */}
            <p className="font-montserrat font-normal text-[#49343A] text-[clamp(8.8px,2.35vw,11.2px)] sm:text-[clamp(8.5px,0.95vw,15px)] leading-[1.34] sm:leading-[1.58] max-w-[415px]">
              {description}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (isBookPeace) {
    return (
      <section className="relative w-full overflow-hidden bg-[#F5ECFB]">
        {/* Exact attached Book My Session banner image — horizontal across desktop, laptop, tablet, and mobile with zero color filters or overlays */}
        <img
          src={withBaseUrl(
            '/assets/aistudio/Book_Your_Inner_Peace_Session_b64b23c5.png'
          )}
          alt="Book Your Session — Choose your experience, embrace the journey, and step into inner peace"
          width={2048}
          height={768}
          fetchPriority="high"
          decoding="async"
          className="hero-image object-[40%_center] sm:object-center select-none"
        />

        {/* Shared Navigation Bar overlaid cleanly at top */}
        <div className="absolute top-0 inset-x-0 z-30">
          <Navbar
            currentPage={currentPage}
            onNavigate={onNavigate}
            showCalendarIconOnCta={showCalendarIconOnNavCta}
            brandTone="dark"
          />
        </div>

        {/* Semantic accessible heading & description matching the visual banner content without colliding with the artwork */}
        <div className="sr-only">
          <h1>{titleLines.join(' ')}</h1>
          <p>{description}</p>
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
        <div className="relative h-full w-full lg:w-[66%] min-h-[340px] sm:min-h-[325px] lg:min-h-[365px]">
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
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#FAF7FD] via-[#FAF7FD]/70 to-transparent" />
      </div>

      {/* Shared Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={onNavigate}
        showCalendarIconOnCta={showCalendarIconOnNavCta}
      />

      {/* Hero Content Container */}
      <div className="relative z-20 layout-container flex items-center justify-end pt-5 pb-9 sm:pt-6 sm:pb-10 min-h-[260px] sm:min-h-[250px] lg:min-h-[290px]">
        <div className="w-full lg:w-[50%] xl:w-[46%] text-center flex flex-col items-center px-2 sm:px-5 py-3 sm:py-4 rounded-3xl lg:bg-radial lg:from-[#F8F3FD]/90 lg:via-[#F2E9FB]/75 lg:to-transparent">
          <p className="font-sans-body text-[11px] sm:text-[12.5px] font-semibold uppercase tracking-[0.26em] text-[#3B1554] mb-2">
            {kicker}
          </p>

          <h1 className="font-serif-display font-medium uppercase text-[#3A1352] tracking-[0.04em] leading-[1.12] text-[30px] sm:text-[38px] lg:text-[46px]">
            {titleLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>

          <div className="my-2.5">
            <WavyOrnament className="w-40 sm:w-48 h-3.5 text-[#5D237A]" />
          </div>

          <p className="font-sans-body text-[14px] sm:text-[15px] text-[#2E1142] leading-[1.58] max-w-[460px] font-normal">
            {description}
          </p>

          {ctaLabel && onCtaClick && (
            <div className="mt-5">
              <button
                type="button"
                onClick={onCtaClick}
                className={`inline-flex items-center justify-center px-8 py-3 rounded-full font-sans-body text-[14.5px] font-medium cursor-pointer whitespace-nowrap text-center ${BUTTON_TOKENS.general}`}
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
