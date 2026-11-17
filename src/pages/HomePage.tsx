import React from 'react';
import {Calendar, Clock, Quote} from 'lucide-react';
import {HeroBanner} from '../components/HeroBanner';
import {
  CrescentMoonIcon,
  ExperienceBadgeIcon,
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
      onClick: () => {
        const exp = experiences.find((e) => e.id === 'exp-sound-healing');
        if (exp) onOpenExperienceDetail(exp);
        else onNavigate('experiences');
      },
    },
    {
      label: 'Guided Meditation',
      icon: <LotusLineIcon className="w-9 h-8 text-[#5D237A]" />,
      onClick: () => {
        const exp = experiences.find((e) => e.id === 'exp-guided-meditation');
        if (exp) onOpenExperienceDetail(exp);
        else onNavigate('experiences');
      },
    },
    {
      label: 'Energy Balance',
      icon: <ZenStonesIcon className="w-8 h-8 text-[#5D237A]" />,
      onClick: () => {
        const exp = experiences.find((e) => e.id === 'exp-chakra-alignment');
        if (exp) onOpenExperienceDetail(exp);
        else onNavigate('experiences');
      },
    },
    {
      label: 'Emotional Release',
      icon: <SproutLeafIcon className="w-8 h-8 text-[#5D237A]" />,
      onClick: () => {
        const exp = experiences.find((e) => e.id === 'exp-sound-bath');
        if (exp) onOpenExperienceDetail(exp);
        else onNavigate('experiences');
      },
    },
    {
      label: 'Self-Awareness',
      icon: <CrescentMoonIcon className="w-8 h-8 text-[#5D237A]" />,
      onClick: () => {
        const exp = experiences.find((e) => e.id === 'exp-self-awareness');
        if (exp) onOpenExperienceDetail(exp);
        else onNavigate('experiences');
      },
    },
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
        className="relative z-20 bg-gradient-to-b from-[#F4ECFB] to-[#FAF7FD] border-b border-[#E7D8F6]"
      >
        <div className="layout-container py-7">
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
            <div className="lg:col-span-5 space-y-5">
              <p className="font-sans-body text-[12px] font-semibold uppercase tracking-[0.24em] text-[#3B1554]">
                THE PRACTICE
              </p>
              <h2 className="font-serif-display text-[34px] sm:text-[44px] font-medium uppercase leading-[1.12] tracking-[0.03em] text-[#321048]">
                WHAT IS
                <span className="block">SOUND HEALING?</span>
              </h2>
              <div className="w-14 h-[2px] bg-[#5D237A]" />
              <p className="font-sans-body text-[15.5px] sm:text-[16.5px] leading-[1.7] text-[#2E1442] pt-1 max-w-[540px]">
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
                  src="/assets/extracted/home_what_is_sound_healing.png"
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
          {/* Section Heading */}
          <div className="text-center max-w-[680px] mx-auto mb-12">
            <p className="font-sans-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#4B1664] mb-2">
              OUR EXPERIENCES
            </p>
            <h2 className="font-serif-display text-[32px] sm:text-[42px] font-medium uppercase tracking-[0.04em] leading-[1.15] text-[#321048]">
              HEALING JOURNEYS
              <span className="block">FOR YOUR INNER SELF</span>
            </h2>
            <div className="w-14 h-[2px] bg-[#5D237A] mx-auto my-4" />
            <p className="font-sans-body text-[15px] sm:text-[16px] text-[#3F2157] leading-relaxed">
              Explore our curated sound healing, meditation and self-awareness
              sessions designed for deep rest, emotional clarity and inner balance.
            </p>
          </div>

          {/* 3 Featured Experience Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8">
            {experiences.slice(0, 3).map((exp) => (
              <article
                key={exp.id}
                className="group rounded-[26px] bg-gradient-to-b from-white via-[#FAF5FE] to-[#F3E9FB] border border-[#DEC9F2] shadow-[0_8px_28px_rgba(75,22,100,0.08)] hover:shadow-[0_14px_36px_rgba(75,22,100,0.15)] transition-all duration-200 overflow-hidden flex flex-col"
              >
                <div className="relative p-3 pb-0">
                  <div className="relative h-52 w-full rounded-[20px] overflow-hidden">
                    <img
                      src={exp.image}
                      alt={exp.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  {/* Overlapping Circular Icon Badge */}
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#FAF6FE] border border-[#D4B8EE] shadow-md flex items-center justify-center text-[#5D237A]">
                    <ExperienceBadgeIcon
                      type={exp.iconType}
                      className="w-6 h-6 text-[#5D237A]"
                    />
                  </div>
                </div>

                <div className="pt-8 pb-6 px-6 text-center flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif-display text-[24px] font-semibold text-[#2E1142] mb-2">
                      {exp.name}
                    </h3>
                    <p className="text-[14px] text-[#432359] leading-relaxed mb-4 max-w-[340px] mx-auto">
                      {exp.shortDescription}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-center gap-3 text-[13px] text-[#3B1554] font-medium py-2.5 border-t border-[#E6D4F6] mb-4">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#6B2D8F]" />
                        {exp.duration}
                      </span>
                      <span className="text-[#C4A5E0]">|</span>
                      <span className="inline-flex items-center gap-1.5">
                        <SproutLeafIcon className="w-4 h-4 text-[#6B2D8F]" />
                        {exp.formatLabel}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenExperienceDetail(exp)}
                      className="inline-flex items-center justify-center px-8 py-2 rounded-full bg-white hover:bg-[#4B1664] text-[#3A1352] hover:text-white border border-[#5D237A] text-[13.5px] font-medium transition-colors cursor-pointer text-center"
                    >
                      <span>Learn More</span>
                    </button>
                  </div>
                </div>
              </article>
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

      {/* 10. RETREAT INTRODUCTION SECTION */}
      <section className="py-16 sm:py-20 bg-[#F4ECFB]/70 border-y border-[#E5D3F6]">
        <div className="layout-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <p className="font-sans-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#5D237A] mb-2">
                NATURE-BASED SANCTUARIES
              </p>
              <h2 className="font-serif-display text-[32px] sm:text-[40px] font-medium uppercase tracking-[0.03em] text-[#321048]">
                IMMERSIVE HEALING RETREATS
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('retreats')}
              className="self-start md:self-auto inline-flex items-center justify-center px-7 py-2.5 rounded-full bg-white border border-[#5D237A] text-[#3A1352] hover:bg-[#4B1664] hover:text-white text-[14px] font-medium transition-colors cursor-pointer text-center"
            >
              <span>Explore All Retreats</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8">
            {retreats.map((retreat) => (
              <article
                key={retreat.id}
                className="rounded-[26px] bg-white border border-[#DEC9F2] shadow-[0_8px_24px_rgba(75,22,100,0.07)] overflow-hidden flex flex-col"
              >
                <div className="relative p-3 pb-0">
                  <div className="relative h-52 rounded-[20px] overflow-hidden">
                    <img
                      src={retreat.image}
                      alt={retreat.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 px-3.5 py-1.5 rounded-full bg-white/95 text-[#3A1352] text-[12px] font-medium flex items-center gap-1.5 shadow-md">
                      <Calendar className="w-3.5 h-3.5 text-[#5D237A]" />
                      <span>{retreat.badgeDuration}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 text-center flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif-display text-[24px] font-semibold text-[#2E1142] mb-2">
                      {retreat.name}
                    </h3>
                    <p className="text-[14px] text-[#432359] leading-relaxed mb-5 max-w-[340px] mx-auto">
                      {retreat.shortDescription}
                    </p>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => onOpenRetreatDetail(retreat)}
                      className="inline-flex items-center justify-center px-8 py-2 rounded-full bg-white hover:bg-[#4B1664] text-[#3A1352] hover:text-white border border-[#5D237A] text-[13.5px] font-medium transition-colors cursor-pointer text-center"
                    >
                      <span>Explore Retreat</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 11. TESTIMONIALS SECTION */}
      <section className="py-16 sm:py-20 bg-[#FAF7FD]">
        <div className="layout-container">
          <div className="text-center max-w-[640px] mx-auto mb-12">
            <p className="font-sans-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#5D237A] mb-2">
              REFLECTIONS
            </p>
            <h2 className="font-serif-display text-[32px] sm:text-[40px] font-medium uppercase tracking-[0.03em] text-[#321048]">
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

      {/* 12. FINAL BOOKING CTA BANNER */}
      <section className="pb-14 pt-4 bg-gradient-to-b from-[#FAF7FD] to-[#EADBF8]">
        <div className="layout-container">
          <div className="relative rounded-[28px] overflow-hidden border border-[#D4B8EE] shadow-[0_12px_36px_rgba(58,19,82,0.16)] bg-[#E7D8F7]">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[220px]">
              <div className="hidden lg:block lg:col-span-4 h-full">
                <img
                  src="/assets/extracted/cta_exp_left.png"
                  alt="Waterfall and lotus blossom"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:col-span-4 py-10 px-6 text-center flex flex-col items-center justify-center bg-gradient-to-r from-[#E9DBF8]/90 via-[#F4ECFC] to-[#E9DBF8]/90">
                <p className="text-[11.5px] font-semibold uppercase tracking-[0.25em] text-[#3B1554] mb-2">
                  READY TO BEGIN?
                </p>
                <h2 className="font-serif-display text-[28px] sm:text-[34px] font-medium uppercase tracking-[0.03em] leading-[1.15] text-[#321048] mb-5">
                  BOOK YOUR
                  <span className="block">HEALING EXPERIENCE</span>
                </h2>
                <button
                  type="button"
                  onClick={() => onNavigate('book')}
                  className="inline-flex items-center justify-center px-9 py-3 rounded-full bg-[#4B1664] hover:bg-[#3A0E50] text-white text-[14.5px] font-medium shadow-[0_6px_18px_rgba(75,22,100,0.38)] transition-all cursor-pointer text-center"
                >
                  <span>Book a Session</span>
                </button>
              </div>
              <div className="hidden lg:block lg:col-span-4 h-full">
                <img
                  src="/assets/extracted/cta_exp_right.png"
                  alt="Glowing lantern and purple blossoms"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover object-right"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
