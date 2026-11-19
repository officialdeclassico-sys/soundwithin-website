import React, {useRef, useEffect} from 'react';
import {Quote} from 'lucide-react';
import {HeroBanner} from '../components/HeroBanner';
import {ExperienceCard} from '../components/ExperienceCard';
import {RetreatCard} from '../components/RetreatCard';
import {withBaseUrl} from '../utils/assetUrl';
import {
  CrescentMoonIcon,
  LotusLineIcon,
  SoundwaveIcon,
  SproutLeafIcon,
  WavyOrnament,
  ZenStonesIcon,
} from '../components/BrandIcons';
import type {Experience, PageRoute, Retreat, Testimonial} from '../types';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
  experiences: Experience[];
  retreats: Retreat[];
  testimonials: Testimonial[];
  onOpenExperienceDetail: (exp: Experience) => void;
  onOpenRetreatDetail: (retreat: Retreat) => void;
}

export function HomePage({
  onNavigate,
  experiences,
  retreats,
  testimonials,
  onOpenExperienceDetail,
  onOpenRetreatDetail,
}: HomePageProps) {
  const wellnessHighlights = [
    {
      label: 'Sound Healing',
      icon: <SoundwaveIcon className="w-8 h-8 text-[#5D237A]" />,
      mobileIcon: <SoundwaveIcon className="w-[23px] h-[23px] text-[#5D237A]" />,
      onClick: () => {
        const exp = experiences.find((e) => e.id === 'exp-sound-healing');
        if (exp) onOpenExperienceDetail(exp);
        else onNavigate('experiences');
      },
    },
    {
      label: 'Guided Meditation',
      icon: <LotusLineIcon className="w-9 h-8 text-[#5D237A]" />,
      mobileIcon: <LotusLineIcon className="w-[25px] h-[23px] text-[#5D237A]" />,
      onClick: () => {
        const exp = experiences.find((e) => e.id === 'exp-guided-meditation');
        if (exp) onOpenExperienceDetail(exp);
        else onNavigate('experiences');
      },
    },
    {
      label: 'Energy Balance',
      icon: <ZenStonesIcon className="w-8 h-8 text-[#5D237A]" />,
      mobileIcon: <ZenStonesIcon className="w-[23px] h-[23px] text-[#5D237A]" />,
      onClick: () => {
        const exp = experiences.find((e) => e.id === 'exp-chakra-alignment');
        if (exp) onOpenExperienceDetail(exp);
        else onNavigate('experiences');
      },
    },
    {
      label: 'Emotional Release',
      icon: <SproutLeafIcon className="w-8 h-8 text-[#5D237A]" />,
      mobileIcon: <SproutLeafIcon className="w-[23px] h-[23px] text-[#5D237A]" />,
      onClick: () => {
        const exp = experiences.find((e) => e.id === 'exp-sound-bath');
        if (exp) onOpenExperienceDetail(exp);
        else onNavigate('experiences');
      },
    },
    {
      label: 'Self-Awareness',
      icon: <CrescentMoonIcon className="w-8 h-8 text-[#5D237A]" />,
      mobileIcon: <CrescentMoonIcon className="w-[23px] h-[23px] text-[#5D237A]" />,
      onClick: () => {
        const exp = experiences.find((e) => e.id === 'exp-self-awareness');
        if (exp) onOpenExperienceDetail(exp);
        else onNavigate('experiences');
      },
    },
  ];

  // Mobile-only infinite horizontal carousel state & refs
  const mobileCarouselRef = useRef<HTMLDivElement | null>(null);
  const isPausedRef = useRef<boolean>(false);
  const resumeTimerRef = useRef<number | null>(null);
  const scrollPosRef = useRef<number>(0);

  useEffect(() => {
    const el = mobileCarouselRef.current;
    if (!el) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrameId: number;
    let lastTimestamp = 0;
    const speedPxPerSec = 28; // Calm, slow, continuous movement

    // Initialize in the middle sequence so manual swipe in either direction is seamless
    const initPosition = () => {
      const singleSetWidth = el.scrollWidth / 3;
      if (singleSetWidth > 0 && el.scrollLeft === 0) {
        el.scrollLeft = singleSetWidth;
        scrollPosRef.current = singleSetWidth;
      }
    };

    initPosition();

    const step = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaSec = Math.min((timestamp - lastTimestamp) / 1000, 0.1);
      lastTimestamp = timestamp;

      const singleSetWidth = el.scrollWidth / 3;
      if (singleSetWidth > 0) {
        if (!isPausedRef.current && !mediaQuery.matches) {
          scrollPosRef.current += speedPxPerSec * deltaSec;
          if (scrollPosRef.current >= singleSetWidth * 2) {
            scrollPosRef.current -= singleSetWidth;
          } else if (scrollPosRef.current <= 0) {
            scrollPosRef.current += singleSetWidth;
          }
          el.scrollLeft = scrollPosRef.current;
        } else {
          // Keep virtual position synced while user swipes manually
          if (el.scrollLeft >= singleSetWidth * 2.5) {
            el.scrollLeft -= singleSetWidth;
          } else if (el.scrollLeft <= singleSetWidth * 0.2) {
            el.scrollLeft += singleSetWidth;
          }
          scrollPosRef.current = el.scrollLeft;
        }
      }

      animationFrameId = window.requestAnimationFrame(step);
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      if (resumeTimerRef.current) {
        window.clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  const handleCarouselPause = () => {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
    isPausedRef.current = true;
  };

  const handleCarouselResume = () => {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = window.setTimeout(() => {
      if (mobileCarouselRef.current) {
        scrollPosRef.current = mobileCarouselRef.current.scrollLeft;
      }
      isPausedRef.current = false;
    }, 650);
  };

  // Triple sequence for seamless infinite loop on mobile without gaps or jumps
  const mobileInfiniteCategories = [
    ...wellnessHighlights,
    ...wellnessHighlights,
    ...wellnessHighlights,
  ];

  return (
    <div className="min-h-screen bg-[#FAF7FD] text-[#2A123F]">
      {/* 1–5. HERO SECTION */}
      <HeroBanner
        currentPage="home"
        onNavigate={onNavigate}
        variant="home"
        kicker="SOUND HEALING · SELF-AWARENESS · INNER BALANCE"
        titleLines={['RETURN', 'TO YOUR', 'INNER FREQUENCY']}
        description="Immersive sound journeys to calm the mind, release what no longer serves you, and reconnect with your true self."
        ctaLabel="Book Your Session"
        onCtaClick={() => onNavigate('book')}
      />

      {/* 6. FIVE WELLNESS HIGHLIGHTS BAR */}
      <section
        aria-label="Wellness Highlights"
        className="relative z-20 bg-gradient-to-b from-[#F4ECFB] to-[#FAF7FD] border-b border-[#E7D8F6] overflow-hidden"
      >
        {/* Mobile-Only Single-Row Infinite Horizontal Carousel (< 640px) */}
        <div
          ref={mobileCarouselRef}
          onTouchStart={handleCarouselPause}
          onTouchEnd={handleCarouselResume}
          onTouchCancel={handleCarouselResume}
          onMouseEnter={handleCarouselPause}
          onMouseLeave={handleCarouselResume}
          className="sm:hidden w-full overflow-x-auto scrollbar-hidden py-2 select-none touch-pan-x"
        >
          <div className="flex items-center w-max">
            {mobileInfiniteCategories.map((item, idx) => (
              <div
                key={`${item.label}-${idx}`}
                className="flex items-center shrink-0"
              >
                <button
                  type="button"
                  onClick={item.onClick}
                  className="group flex flex-col items-center justify-center px-4 py-0.5 text-center transition-transform duration-150 active:scale-95 cursor-pointer shrink-0"
                >
                  <div className="mb-1 flex items-center justify-center">
                    {item.mobileIcon}
                  </div>
                  <span className="font-serif-display text-[13px] leading-tight font-semibold text-[#3A1352] whitespace-nowrap">
                    {item.label}
                  </span>
                </button>
                <span
                  className="h-5 w-[1px] bg-[#C5A3E0]/60 shrink-0"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop, Laptop & Tablet Grid (>= 640px) — Preserved Unchanged */}
        <div className="hidden sm:block layout-container py-7">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-6">
            {wellnessHighlights.map((item, index) => (
              <button
                key={item.label}
                type="button"
                onClick={item.onClick}
                className={`group flex flex-col items-center justify-center px-4 py-1 text-center transition-transform duration-150 hover:-translate-y-0.5 cursor-pointer ${
                  index < wellnessHighlights.length - 1
                    ? 'lg:border-r lg:border-[#C5A3E0]/75'
                    : ''
                }`}
              >
                <div className="mb-2.5 transition-transform duration-200 group-hover:scale-110">
                  {item.icon}
                </div>
                <span className="font-serif-display text-[17px] sm:text-[18.5px] font-semibold text-[#3A1352] group-hover:text-[#5D237A]">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHAT IS SOUND HEALING? SECTION */}
      <section className="relative py-14 sm:py-20 overflow-hidden bg-[#FAF7FD]">
        <div className="layout-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Text Column */}
            <div className="lg:col-span-5 space-y-4">
              <p className="font-sans-body text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.22em] sm:tracking-[0.24em] text-[#3B1554] whitespace-nowrap">
                THE PRACTICE
              </p>
              <h2 className="font-serif-display text-[clamp(18px,2.9vw,40px)] font-medium uppercase leading-[1.15] tracking-[0.02em] sm:tracking-[0.03em] text-[#321048] whitespace-nowrap">
                WHAT IS SOUND HEALING?
              </h2>
              <div className="w-14 h-[2px] bg-[#5D237A]" />
              <p className="font-sans-body text-[15px] sm:text-[16px] leading-[1.7] text-[#2E1442] pt-1 max-w-[540px]">
                A natural and powerful therapy that uses sound vibrations to calm
                the nervous system, release stored stress and bring your mind,
                body and emotions back into balance.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('experiences')}
                  className="inline-flex items-center justify-center px-8 py-2.5 rounded-full bg-white hover:bg-[#F3E8FC] text-[#3A1352] font-sans-body text-[14.5px] font-medium border border-[#5D237A] shadow-sm transition-all cursor-pointer text-center"
                >
                  <span>Learn More</span>
                </button>
              </div>
            </div>

            {/* Right Organic Singing Bowl Image Column */}
            <div className="lg:col-span-7 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[740px]">
                <img
                  src={withBaseUrl('/assets/extracted/home_what_is_sound_healing.png')}
                  alt="Himalayan lotus singing bowl with rising incense, purple blossoms, amethyst crystals, and waterfall"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain drop-shadow-[0_12px_32px_rgba(75,22,100,0.12)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8 & 9. OUR EXPERIENCES INTRODUCTION + EXPERIENCE HIGHLIGHTS */}
      <section className="relative pt-14 pb-20 overflow-hidden bg-gradient-to-b from-[#EDE0F9] via-[#F7F1FC] to-[#FAF7FD]">
        {/* Decorative Layered Purple Hills SVG Top Transition */}
        <div
          className="absolute top-0 inset-x-0 h-28 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path
              d="M0 40L180 12L360 48L580 8L780 42L1020 10L1240 44L1440 16V120H0V40Z"
              fill="#DFCCF4"
              fillOpacity="0.65"
            />
            <path
              d="M0 70L240 32L480 68L740 28L980 66L1220 30L1440 62V120H0V70Z"
              fill="#EDE0F9"
            />
          </svg>
        </div>

        <div className="relative z-10 layout-container pt-8">
          {/* Section Heading — Single line heading and subheading across all devices */}
          <div className="text-center w-full max-w-full mx-auto mb-9 sm:mb-12">
            <p className="font-sans-body text-[10.5px] sm:text-[12px] font-semibold uppercase tracking-[0.22em] sm:tracking-[0.25em] text-[#4B1664] mb-1.5 sm:mb-2 whitespace-nowrap">
              OUR EXPERIENCES
            </p>
            <h2 className="font-serif-display text-[clamp(11.5px,3.1vw,40px)] font-medium uppercase tracking-[0.02em] sm:tracking-[0.04em] leading-[1.15] text-[#321048] whitespace-nowrap">
              HEALING JOURNEYS FOR YOUR INNER SELF
            </h2>
            <div className="w-12 sm:w-14 h-[2px] bg-[#5D237A] mx-auto my-2.5 sm:my-3.5" />
            <p className="font-sans-body text-[clamp(4.5px,1.42vw,15.5px)] tracking-[-0.015em] sm:tracking-normal text-[#3F2157] leading-relaxed mx-auto whitespace-nowrap">
              Explore our curated sound healing, meditation and self-awareness sessions designed for deep rest, emotional clarity and inner balance.
            </p>
          </div>

          {/* 3 Featured Experience Highlights — Synchronised via Shared ExperienceCard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8">
            {experiences.slice(0, 3).map((exp, index) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                index={index}
                onLearnMore={onOpenExperienceDetail}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => onNavigate('experiences')}
              className="inline-flex items-center justify-center px-9 py-3 rounded-full bg-[#4B1664] hover:bg-[#3A0E50] text-white text-[14.5px] font-medium shadow-[0_6px_20px_rgba(75,22,100,0.3)] transition-all cursor-pointer text-center"
            >
              <span>View All 6 Healing Experiences</span>
            </button>
          </div>
        </div>
      </section>

      {/* 10. RETREAT INTRODUCTION SECTION — Synchronised via Shared RetreatCard */}
      <section className="py-16 sm:py-20 bg-[#F4ECFB]/70 border-y border-[#E5D3F6]">
        <div className="layout-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-5">
            <div className="min-w-0">
              <p className="font-sans-body text-[10.5px] sm:text-[12px] font-semibold uppercase tracking-[0.22em] sm:tracking-[0.25em] text-[#5D237A] mb-1.5 sm:mb-2 whitespace-nowrap">
                NATURE-BASED SANCTUARIES
              </p>
              <h2 className="font-serif-display text-[clamp(15.5px,3.4vw,40px)] font-medium uppercase tracking-[0.02em] sm:tracking-[0.03em] text-[#321048] whitespace-nowrap">
                IMMERSIVE HEALING RETREATS
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('retreats')}
              className="self-start md:self-auto inline-flex items-center justify-center px-7 py-2.5 rounded-full bg-white border border-[#5D237A] text-[#3A1352] hover:bg-[#4B1664] hover:text-white text-[14px] font-medium transition-colors cursor-pointer text-center whitespace-nowrap"
            >
              <span>Explore All Retreats</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8">
            {retreats.map((retreat, index) => (
              <RetreatCard
                key={retreat.id}
                retreat={retreat}
                index={index}
                onExplore={onOpenRetreatDetail}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 11. TESTIMONIALS SECTION */}
      <section className="py-16 sm:py-20 bg-[#FAF7FD]">
        <div className="layout-container">
          <div className="text-center w-full max-w-full mx-auto mb-10 sm:mb-12">
            <p className="font-sans-body text-[10.5px] sm:text-[12px] font-semibold uppercase tracking-[0.22em] sm:tracking-[0.25em] text-[#5D237A] mb-1.5 sm:mb-2 whitespace-nowrap">
              REFLECTIONS
            </p>
            <h2 className="font-serif-display text-[clamp(16px,3.5vw,40px)] font-medium uppercase tracking-[0.025em] sm:tracking-[0.03em] text-[#321048] whitespace-nowrap">
              STORIES OF INNER BALANCE
            </h2>
            <div className="my-3 flex justify-center">
              <WavyOrnament className="w-40 h-4 text-[#5D237A]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-7 rounded-[24px] bg-gradient-to-b from-white to-[#F5ECFC] border border-[#DFC9F2] shadow-[0_6px_22px_rgba(75,22,100,0.06)] flex flex-col justify-between"
              >
                <div>
                  <Quote className="w-7 h-7 text-[#9C6BC2] mb-4 opacity-70" />
                  <p className="text-[14.5px] leading-[1.7] text-[#381B4E] italic mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E6D4F6]">
                  <p className="font-serif-display text-[19px] font-semibold text-[#2E1142]">
                    {t.name}
                  </p>
                  <p className="text-[12.5px] text-[#64427D]">
                    {t.role} &middot; {t.location}
                  </p>
                  <p className="text-[12px] font-medium text-[#5D237A] mt-1">
                    {t.experienceName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FINAL BOOKING CTA BANNER — Matches Experience Card Styling, Compact Burgundy Button & Subtle Divider */}
      <section className="pt-4 pb-4 sm:pb-8 bg-gradient-to-b from-[#FAF7FD] to-[#EADBF8]/80">
        <div className="layout-container">
          <div className="relative rounded-[24px] overflow-hidden border border-[#DFC4EC] shadow-[0_10px_30px_rgba(62,20,88,0.09)] bg-gradient-to-b from-[#FDEEF5] via-[#F4E8FB] to-[#E8D5F7]">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center lg:min-h-[195px]">
              <div className="hidden lg:block lg:col-span-3 h-full">
                <img
                  src={withBaseUrl('/assets/extracted/cta_exp_left.png')}
                  alt="Waterfall and lotus blossom"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative z-10 lg:col-span-6 py-6 px-4 sm:py-7 sm:px-6 lg:py-8 text-center flex flex-col items-center justify-center lg:bg-gradient-to-r lg:from-[#F5E9FB]/95 lg:via-[#FDF8FC] lg:to-[#F5E9FB]/95">
                <p className="font-sans-body text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] sm:tracking-[0.25em] text-[#70283F]/85 mb-1.5">
                  READY TO BEGIN?
                </p>
                <h2 className="font-serif-display text-[clamp(14.5px,4.2vw,24px)] sm:text-[26px] lg:text-[27px] xl:text-[30px] font-bold uppercase tracking-[0.02em] leading-[1.15] text-[#2F1041] whitespace-nowrap mb-3.5 sm:mb-4">
                  BOOK YOUR HEALING EXPERIENCE
                </h2>
                <button
                  type="button"
                  onClick={() => onNavigate('book')}
                  className="inline-flex items-center justify-center px-5 py-1.5 sm:px-6 sm:py-2 rounded-full bg-[#681E38] hover:bg-[#52152C] active:bg-[#461125] text-white font-sans-body text-[11.5px] sm:text-[13px] font-semibold tracking-[0.015em] shadow-[0_3px_10px_rgba(104,30,56,0.22)] transition-colors duration-200 cursor-pointer text-center"
                >
                  <span>Book a Session</span>
                </button>
              </div>
              <div className="hidden lg:block lg:col-span-3 h-full">
                <img
                  src={withBaseUrl('/assets/extracted/cta_exp_right.png')}
                  alt="Glowing lantern and purple blossoms"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover object-right"
                />
              </div>
            </div>
          </div>

          {/* Subtle Muted Gold & Light Burgundy Horizontal Divider separating CTA from Footer */}
          <div
            className="mt-4 sm:mt-6 flex items-center justify-center gap-2.5 px-4"
            aria-hidden="true"
          >
            <span className="h-[1px] flex-1 max-w-[130px] sm:max-w-[220px] bg-gradient-to-r from-transparent via-[#C69A4A]/55 to-[#70283F]/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#B78A45]/75" />
            <span className="h-[1px] flex-1 max-w-[130px] sm:max-w-[220px] bg-gradient-to-l from-transparent via-[#C69A4A]/55 to-[#70283F]/40" />
          </div>
        </div>
      </section>
    </div>
  );
}
