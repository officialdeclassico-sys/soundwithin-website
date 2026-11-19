import React, {useEffect, useRef, useState} from 'react';
import {
  BedDouble,
  Trees,
  Users,
  Utensils,
} from 'lucide-react';
import {HeroBanner} from '../components/HeroBanner';
import {InfiniteHorizontalCarousel} from '../components/InfiniteHorizontalCarousel';
import {RetreatCard} from '../components/RetreatCard';
import {UpcomingRetreatCarousel} from '../components/UpcomingRetreatCarousel';
import {withBaseUrl} from '../utils/assetUrl';
import {BUTTON_TOKENS} from '../utils/buttonThemes';
import {
  InfinityLineIcon,
  LotusLineIcon,
  SproutLeafIcon,
  ZenStonesIcon,
} from '../components/BrandIcons';
import type {PageRoute, Retreat, UpcomingRetreatBatch} from '../types';

interface RetreatsPageProps {
  onNavigate: (page: PageRoute) => void;
  retreats: Retreat[];
  upcomingRetreats: UpcomingRetreatBatch[];
  onOpenRetreatDetail: (retreat: Retreat) => void;
}

export function RetreatsPage({
  onNavigate,
  retreats,
  upcomingRetreats,
  onOpenRetreatDetail,
}: RetreatsPageProps) {
  const benefitsCarouselRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const scrollPosRef = useRef(0);
  const resumeTimerRef = useRef<number | null>(null);
  const [isManualScrolling, setIsManualScrolling] = useState(false);

  const retreatBenefits = [
    {
      icon: <LotusLineIcon className="w-9 h-8 text-[#5D237A]" />,
      mobileIcon: <LotusLineIcon className="w-[25px] h-[23px] text-[#5D237A]" />,
      label: 'Deep Healing',
    },
    {
      icon: <ZenStonesIcon className="w-8 h-8 text-[#5D237A]" />,
      mobileIcon: <ZenStonesIcon className="w-[23px] h-[23px] text-[#5D237A]" />,
      label: 'Inner Clarity',
    },
    {
      icon: <SproutLeafIcon className="w-8 h-8 text-[#5D237A]" />,
      mobileIcon: <SproutLeafIcon className="w-[23px] h-[23px] text-[#5D237A]" />,
      label: 'Emotional Release',
    },
    {
      icon: <InfinityLineIcon className="w-9 h-8 text-[#5D237A]" />,
      mobileIcon: <InfinityLineIcon className="w-[25px] h-[23px] text-[#5D237A]" />,
      label: 'Lasting Transformation',
    },
  ];

  // Repeat base set twice per loop segment (3 segments total) so wide desktop viewports stay seamlessly filled while looping infinitely
  const baseBenefitSet = [...retreatBenefits, ...retreatBenefits];
  const infiniteRetreatBenefits = [
    ...baseBenefitSet,
    ...baseBenefitSet,
    ...baseBenefitSet,
  ];

  useEffect(() => {
    const el = benefitsCarouselRef.current;
    if (!el) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrameId: number;
    let lastTimestamp = 0;
    const speedPxPerSec = 28; // Matches Experiences & Home page horizontal scrolling speed

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

  const inclusions = [
    {
      icon: <BedDouble className="w-5 h-5 text-[#5D237A]" strokeWidth={1.7} />,
      line1: 'Comfortable',
      line2: 'Stay',
    },
    {
      icon: <Utensils className="w-5 h-5 text-[#5D237A]" strokeWidth={1.7} />,
      line1: 'Nourishing',
      line2: 'Meals',
    },
    {
      icon: <LotusLineIcon className="w-6 h-5 text-[#5D237A]" />,
      line1: 'Daily Healing',
      line2: 'Sessions',
    },
    {
      icon: <Trees className="w-5 h-5 text-[#5D237A]" strokeWidth={1.7} />,
      line1: 'Nature',
      line2: 'Immersion',
    },
    {
      icon: <Users className="w-5 h-5 text-[#5D237A]" strokeWidth={1.7} />,
      line1: 'Guided',
      line2: 'Practices',
    },
    {
      icon: <SproutLeafIcon className="w-5 h-5 text-[#5D237A]" />,
      line1: 'A Supportive',
      line2: 'Healing Space',
    },
  ];

  const handleBatchClick = (batch: UpcomingRetreatBatch) => {
    const found = retreats.find((r) => r.id === batch.retreatId) || retreats[0];
    if (found) onOpenRetreatDetail(found);
  };

  return (
    <div className="min-h-screen bg-[#FAF7FD] text-[#2A123F]">
      {/* HERO SECTION */}
      <HeroBanner
        currentPage="retreats"
        onNavigate={onNavigate}
        variant="retreats-riverside"
        kicker="STEP AWAY. RECONNECT. TRANSFORM."
        titleLines={['Find Your Space to Renew']}
        description="Immersive retreats designed to bring you closer to yourself through sound, mindfulness and nature."
        ctaLabel="Explore Our Retreats"
        onCtaClick={() => {
          document
            .getElementById('retreats-collection')
            ?.scrollIntoView({behavior: 'smooth'});
        }}
      />

      {/* 4 RETREAT BENEFITS STRIP — Continuous Infinite Horizontal Carousel Matching Experiences Page */}
      <section
        aria-label="Retreat Benefits"
        className="relative z-20 bg-gradient-to-b from-[#F4ECFB] to-[#FAF7FD] border-b border-[#E7D8F6] overflow-hidden"
      >
        <div
          ref={benefitsCarouselRef}
          onTouchStart={handleCarouselPause}
          onTouchEnd={handleCarouselResume}
          onTouchCancel={handleCarouselResume}
          onWheel={() => {
            handleCarouselPause();
            handleCarouselResume();
          }}
          className={`w-full overflow-x-auto scrollbar-hidden py-2 sm:py-4 select-none touch-pan-x ${
            isManualScrolling ? 'snap-x snap-proximity scroll-smooth' : ''
          }`}
        >
          <div className="flex items-center w-max">
            {infiniteRetreatBenefits.map((item, idx) => (
              <div
                key={`${item.label}-${idx}`}
                className="flex items-center shrink-0 snap-center"
              >
                <div className="group flex flex-col items-center justify-center px-4 sm:px-7 lg:px-10 py-0.5 text-center shrink-0">
                  <div className="mb-1 sm:mb-1.5 flex items-center justify-center">
                    <span className="sm:hidden">{item.mobileIcon}</span>
                    <span className="hidden sm:inline-flex">{item.icon}</span>
                  </div>
                  <span className="font-serif-display text-[13px] sm:text-[16.5px] lg:text-[18px] leading-tight font-semibold text-[#3A1352] whitespace-nowrap">
                    {item.label}
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

      {/* OUR RETREATS / CHOOSE YOUR HEALING JOURNEY */}
      <section id="retreats-collection" className="py-7 sm:py-10 lg:py-12 bg-[#FAF7FD]">
        <div className="layout-container">
          {/* Section Title — Single line heading and subheading across all devices */}
          <div className="text-center w-full max-w-full mx-auto mb-5 sm:mb-7">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-1.5">
              <span className="w-12 sm:w-20 h-[1px] bg-[#B491D1]" />
              <span className="font-sans-body text-[10.5px] sm:text-[12px] font-semibold uppercase tracking-[0.24em] sm:tracking-[0.28em] text-[#3A1352] whitespace-nowrap">
                OUR RETREATS
              </span>
              <span className="w-12 sm:w-20 h-[1px] bg-[#B491D1]" />
            </div>
            <h2 className="font-serif-display text-[clamp(14.5px,3.8vw,42px)] font-medium uppercase tracking-[0.02em] sm:tracking-[0.03em] text-[#321048] leading-[1.15] mb-1 sm:mb-1.5 whitespace-nowrap">
              CHOOSE YOUR HEALING JOURNEY
            </h2>
            <p className="font-sans-body text-[clamp(5.8px,1.82vw,16px)] tracking-[-0.01em] sm:tracking-normal text-[#3F2157] leading-relaxed mx-auto whitespace-nowrap">
              Curated retreat experiences in serene natural locations, designed for rest, healing and self-discovery.
            </p>
          </div>

          {/* 3 RETREAT PACKAGE CARDS — Shared RetreatCard Component */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {retreats.map((retreat, index) => (
              <RetreatCard
                key={retreat.id}
                retreat={retreat}
                index={index}
                onExplore={onOpenRetreatDetail}
              />
            ))}
          </div>

          {/* WHAT'S INCLUDED SECTION */}
          <div className="mt-8 sm:mt-10 pt-1">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">
              {/* Left Rounded Singing Bowl Image — Visible on Desktop, hidden on Mobile */}
              <div className="hidden lg:flex lg:col-span-4 justify-start">
                <div className="w-full max-w-[360px] h-36 sm:h-40 rounded-full overflow-hidden border-2 border-[#DEC9F2] shadow-[0_8px_24px_rgba(75,22,100,0.12)]">
                  <img
                    src={withBaseUrl('/assets/extracted/retreat_included_bowl.png')}
                    alt="Tibetan singing bowl with incense smoke and amethyst crystal on mossy stone"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right 6 Inclusions — Continuous Infinite Horizontal Loop Matching Experiences Page */}
              <div className="lg:col-span-8 lg:pl-7 lg:border-l lg:border-[#D5B9EC] overflow-hidden">
                <h3 className="font-serif-display text-[clamp(18px,2.5vw,24px)] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[#3A1352] mb-4 text-center lg:text-left whitespace-nowrap">
                  WHAT&rsquo;S INCLUDED?
                </h3>

                <InfiniteHorizontalCarousel
                  items={inclusions}
                  getItemKey={(inc, idx) => `${inc.line1}-${idx}`}
                  speedPxPerSec={28}
                  showDivider={false}
                  className="py-1"
                  renderItem={(inc) => (
                    <div className="flex flex-col items-center text-center px-3.5 sm:px-5 lg:px-5.5 shrink-0">
                      <div className="w-12 h-12 rounded-full bg-[#EFE2FA] border border-[#D8BEEC] flex items-center justify-center mb-2 shadow-xs">
                        {inc.icon}
                      </div>
                      <p className="text-[12px] sm:text-[12.5px] font-medium text-[#2E1142] leading-tight whitespace-nowrap">
                        {inc.line1}
                        <span className="block">{inc.line2}</span>
                      </p>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>

          {/* UPCOMING RETREATS CARDS-ONLY INFINITE HORIZONTAL CAROUSEL */}
          <UpcomingRetreatCarousel
            batches={upcomingRetreats}
            onSelectBatch={handleBatchClick}
          />
        </div>
      </section>

      {/* BOTTOM SCENIC STREAM BANNER & FINAL CTA */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7FD] via-[#EFE3FA] to-[#E6D4F6]">
        {/* Full-Width Forest Stream & Meditation Cushions Image */}
        <div className="relative w-full h-[185px] sm:h-[245px] overflow-hidden">
          <img
            src={withBaseUrl('/assets/extracted/retreat_stream_banner.png')}
            alt="Meditation cushions, glowing lantern, candle, and singing bowl beside a forest stream"
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover object-center"
          />
          {/* Wavy White/Lavender Bottom Cutout */}
          <svg
            viewBox="0 0 1440 90"
            fill="none"
            preserveAspectRatio="none"
            className="absolute -bottom-1 inset-x-0 w-full h-11 sm:h-16"
            aria-hidden="true"
          >
            <path
              d="M0 40C240 95 480 0 720 35C960 70 1200 10 1440 45V90H0V40Z"
              fill="#F3EAFB"
            />
          </svg>
        </div>

        {/* Ready For a Deeper Reset CTA — Single line heading and subheading across all devices */}
        <div className="relative z-10 layout-container pt-3 pb-7 sm:pt-4 sm:pb-10 text-center">
          <p className="font-sans-body text-[10.5px] sm:text-[11.5px] font-semibold uppercase tracking-[0.22em] sm:tracking-[0.26em] text-[#3B1554] mb-1.5 whitespace-nowrap">
            READY FOR A DEEPER RESET?
          </p>
          <h2 className="font-serif-display text-[clamp(17px,3.8vw,44px)] font-medium uppercase tracking-[0.03em] sm:tracking-[0.04em] text-[#321048] mb-1.5 whitespace-nowrap">
            JOIN A HEALING RETREAT
          </h2>
          <p className="font-sans-body text-[clamp(7.2px,2.2vw,16px)] tracking-[-0.01em] sm:tracking-normal text-[#3F2157] mb-4 mx-auto whitespace-nowrap">
            Step away from the noise and give yourself the space to heal, reflect and realign.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('book')}
            className={`inline-flex items-center justify-center px-8 py-2.5 sm:px-9 sm:py-3 rounded-full text-[14px] sm:text-[14.5px] font-medium cursor-pointer text-center whitespace-nowrap ${BUTTON_TOKENS.general}`}
          >
            <span>Book Your Retreat</span>
          </button>
        </div>
      </section>
    </div>
  );
}
