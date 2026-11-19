import React, {useEffect, useRef, useState} from 'react';
import {HeroBanner} from '../components/HeroBanner';
import {ExperienceCard} from '../components/ExperienceCard';
import {BottomPromoBanner} from '../components/BottomPromoBanner';
import {
  InfinityLineIcon,
  LotusLineIcon,
  SproutLeafIcon,
  ZenStonesIcon,
} from '../components/BrandIcons';
import type {Experience, PageRoute} from '../types';

interface ExperiencesPageProps {
  onNavigate: (page: PageRoute) => void;
  experiences: Experience[];
  onOpenExperienceDetail: (exp: Experience) => void;
}

export function ExperiencesPage({
  onNavigate,
  experiences,
  onOpenExperienceDetail,
}: ExperiencesPageProps) {
  const benefitsCarouselRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const scrollPosRef = useRef(0);
  const resumeTimerRef = useRef<number | null>(null);
  const [isManualScrolling, setIsManualScrolling] = useState(false);

  const benefitPillars = [
    {
      icon: <LotusLineIcon className="w-9 h-8 text-[#5D237A]" />,
      mobileIcon: <LotusLineIcon className="w-[25px] h-[23px] text-[#5D237A]" />,
      label: 'Reduce Stress & Anxiety',
    },
    {
      icon: <ZenStonesIcon className="w-8 h-8 text-[#5D237A]" />,
      mobileIcon: <ZenStonesIcon className="w-[23px] h-[23px] text-[#5D237A]" />,
      label: 'Improve Mental Clarity',
    },
    {
      icon: <SproutLeafIcon className="w-8 h-8 text-[#5D237A]" />,
      mobileIcon: <SproutLeafIcon className="w-[23px] h-[23px] text-[#5D237A]" />,
      label: 'Release Emotional Blocks',
    },
    {
      icon: <InfinityLineIcon className="w-9 h-8 text-[#5D237A]" />,
      mobileIcon: <InfinityLineIcon className="w-[25px] h-[23px] text-[#5D237A]" />,
      label: 'Deepen Self-Awareness',
    },
  ];

  // Triple sequence matching the Home page horizontal carousel for seamless continuous scrolling and manual swipe in both directions
  const infiniteBenefitPillars = [
    ...benefitPillars,
    ...benefitPillars,
    ...benefitPillars,
  ];

  useEffect(() => {
    const el = benefitsCarouselRef.current;
    if (!el) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrameId: number;
    let lastTimestamp = 0;
    const speedPxPerSec = 28; // Matches Home page horizontal scrolling speed

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
          // Keep virtual position synced while user swipes or scrolls manually
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
    setIsManualScrolling(true);
  };

  const handleCarouselResume = () => {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = window.setTimeout(() => {
      if (benefitsCarouselRef.current) {
        scrollPosRef.current = benefitsCarouselRef.current.scrollLeft;
      }
      setIsManualScrolling(false);
      isPausedRef.current = false;
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#FAF7FD] text-[#2A123F]">
      {/* HERO SECTION */}
      <HeroBanner
        currentPage="experiences"
        onNavigate={onNavigate}
        variant="experiences-studio"
        kicker="SOUNDWITHIN · OUR OFFERINGS"
        titleLines={['Explore Our Experiences']}
        description="Discover thoughtfully guided experiences in sound healing, yoga, meditation and self-awareness, created to help you reconnect with yourself and find inner balance."
        mobileDescription="Thoughtfully guided experiences in sound healing, yoga and meditation to help you reconnect and find inner balance."
        accentText="A Journey Towards Inner Harmony"
      />

      {/* EXPLORE OUR EXPERIENCES SECTION */}
      <section className="relative pt-6 pb-5 sm:pt-8 sm:pb-9 lg:pt-9 lg:pb-10 overflow-hidden bg-gradient-to-b from-[#EFE4FA] via-[#FAF7FD] to-[#FAF7FD]">
        {/* Soft Lavender Mountain Wave Background */}
        <div
          className="absolute top-0 inset-x-0 h-20 sm:h-24 pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path
              d="M0 55L200 18L440 60L720 22L1020 58L1260 14L1440 45V120H0V55Z"
              fill="#E5D3F6"
              fillOpacity="0.65"
            />
            <path
              d="M0 82L280 42L560 80L880 38L1160 76L1440 48V120H0V82Z"
              fill="#F6EFFC"
            />
          </svg>
        </div>

        <div className="relative z-10 layout-container">
          {/* Header with flanked hairlines — Single line heading and subheading across all devices */}
          <div className="text-center w-full max-w-full mx-auto mb-5 sm:mb-7">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-1.5">
              <span className="w-12 sm:w-20 h-[1px] bg-[#B491D1]" />
              <span className="font-sans-body text-[10.5px] sm:text-[12px] font-semibold uppercase tracking-[0.24em] sm:tracking-[0.28em] text-[#3A1352] whitespace-nowrap">
                EXPLORE
              </span>
              <span className="w-12 sm:w-20 h-[1px] bg-[#B491D1]" />
            </div>
            <h2 className="font-serif-display text-[clamp(20px,4vw,44px)] font-medium uppercase tracking-[0.03em] sm:tracking-[0.04em] text-[#321048] leading-[1.15] mb-1 sm:mb-2 whitespace-nowrap">
              OUR EXPERIENCES
            </h2>
            <p className="font-sans-body text-[clamp(5.8px,1.82vw,16px)] tracking-[-0.01em] sm:tracking-normal text-[#3B1D52] leading-relaxed mx-auto whitespace-nowrap">
              A curated range of sound healing and self-awareness sessions for relaxation, clarity and inner balance.
            </p>
          </div>

          {/* 6 EXPERIENCE CARDS (3x2 Grid) — Shared ExperienceCard Component */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                index={index}
                onLearnMore={onOpenExperienceDetail}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4 WELLNESS BENEFITS PILLARS — Exact Home Page Carousel Icon Scale, Typography & Spacing */}
      <section
        aria-label="Wellness Benefits"
        className="relative z-20 bg-gradient-to-b from-[#F4ECFB] to-[#FAF7FD] border-y border-[#E7D8F6] overflow-hidden"
      >
        <div
          ref={benefitsCarouselRef}
          onTouchStart={handleCarouselPause}
          onTouchEnd={handleCarouselResume}
          onTouchCancel={handleCarouselResume}
          onMouseEnter={handleCarouselPause}
          onMouseLeave={handleCarouselResume}
          onWheel={() => {
            handleCarouselPause();
            handleCarouselResume();
          }}
          className={`w-full overflow-x-auto scrollbar-hidden py-2 sm:py-4 select-none touch-pan-x ${
            isManualScrolling ? 'snap-x snap-proximity scroll-smooth' : ''
          }`}
        >
          <div className="flex items-center w-max">
            {infiniteBenefitPillars.map((pillar, idx) => (
              <div
                key={`${pillar.label}-${idx}`}
                className="flex items-center shrink-0 snap-center"
              >
                <div className="group flex flex-col items-center justify-center px-4 sm:px-7 lg:px-10 py-0.5 text-center shrink-0">
                  <div className="mb-1 sm:mb-1.5 flex items-center justify-center">
                    <span className="sm:hidden">{pillar.mobileIcon}</span>
                    <span className="hidden sm:inline-flex">{pillar.icon}</span>
                  </div>
                  <span className="font-serif-display text-[13px] sm:text-[16.5px] lg:text-[18px] leading-tight font-semibold text-[#3A1352] whitespace-nowrap">
                    {pillar.label}
                  </span>
                </div>
                <span
                  className="h-5 sm:h-7 w-[1px] bg-[#C5A3E0]/60 shrink-0"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM ROUNDED BANNER CTA — Uses Exact Attached Pastel Sanctuary Artwork Matching Home Banner Dimensions */}
      <section className="pt-3.5 pb-3 sm:pt-5 sm:pb-5 bg-gradient-to-b from-[#FAF7FD] to-[#F3E9FB]/75">
        <div className="layout-container">
          <BottomPromoBanner
            imageSrc="/assets/aistudio/Sunlit_Zen_Meditation_Retreat_60d1cfef.png"
            imageAlt="Sunlit zen meditation sanctuary with circular moon window, warm candle lantern, rolled yoga mat, Buddha statue, blossoms, and woven pendant lights"
            imageWidth={2048}
            imageHeight={768}
            objectPositionClass="object-[50%_70%]"
            fallbackBgClass="bg-gradient-to-r from-[#F6DFD2] via-[#F9DDD9] to-[#F4D9C7]"
            heading="Ready to Begin?"
            subheading="Explore Your Healing Experience"
            ctaLabel="Book a Session"
            onAction={() => onNavigate('book')}
          />

          {/* Subtle Muted Gold & Light Burgundy Horizontal Divider separating CTA from Footer */}
          <div
            className="mt-3 sm:mt-4 flex items-center justify-center gap-2.5 px-4"
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
