import React from 'react';
import {Calendar, Clock} from 'lucide-react';
import {HeroBanner} from '../components/HeroBanner';
import {withBaseUrl} from '../utils/assetUrl';
import {
  ExperienceBadgeIcon,
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
  const benefitPillars = [
    {
      icon: <LotusLineIcon className="w-9 h-8 text-[#5D237A]" />,
      line1: 'Reduce Stress',
      line2: '& Anxiety',
    },
    {
      icon: <ZenStonesIcon className="w-8 h-8 text-[#5D237A]" />,
      line1: 'Improve',
      line2: 'Mental Clarity',
    },
    {
      icon: <SproutLeafIcon className="w-8 h-8 text-[#5D237A]" />,
      line1: 'Release',
      line2: 'Emotional Blocks',
    },
    {
      icon: <InfinityLineIcon className="w-9 h-8 text-[#5D237A]" />,
      line1: 'Deepen',
      line2: 'Self-Awareness',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7FD] text-[#2A123F]">
      {/* HERO SECTION */}
      <HeroBanner
        currentPage="experiences"
        onNavigate={onNavigate}
        variant="pink-lantern"
        kicker="OUR EXPERIENCES"
        titleLines={['HEALING', 'EXPERIENCES']}
        description="Immersive sound journeys, meditative practices and wellness experiences to help you relax, realign and reconnect with your true self."
      />

      {/* EXPLORE OUR EXPERIENCES SECTION */}
      <section className="relative pt-10 pb-14 overflow-hidden bg-gradient-to-b from-[#EFE4FA] via-[#FAF7FD] to-[#FAF7FD]">
        {/* Soft Lavender Mountain Wave Background */}
        <div
          className="absolute top-0 inset-x-0 h-32 pointer-events-none select-none overflow-hidden"
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
          {/* Header with flanked hairlines */}
          <div className="text-center max-w-[660px] mx-auto mb-12">
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="w-16 sm:w-24 h-[1px] bg-[#B491D1]" />
              <span className="font-sans-body text-[12px] font-semibold uppercase tracking-[0.28em] text-[#3A1352]">
                EXPLORE
              </span>
              <span className="w-16 sm:w-24 h-[1px] bg-[#B491D1]" />
            </div>
            <h2 className="font-serif-display text-[34px] sm:text-[44px] font-medium uppercase tracking-[0.04em] text-[#321048] mb-2.5">
              OUR EXPERIENCES
            </h2>
            <p className="font-sans-body text-[15px] sm:text-[16px] text-[#3B1D52] leading-relaxed max-w-[540px] mx-auto">
              A curated range of sound healing and self-awareness sessions for
              relaxation, clarity and inner balance.
            </p>
          </div>

          {/* 6 EXPERIENCE CARDS (3x2 Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
            {experiences.map((exp) => {
              const useCalendarIcon =
                exp.id === 'exp-nature-retreat' || exp.id === 'exp-self-awareness';
              const useClockForFormat = exp.id === 'exp-self-awareness';

              return (
                <article
                  key={exp.id}
                  className="group rounded-[26px] bg-gradient-to-b from-white via-[#FAF5FE] to-[#F2E7FA] border border-[#DEC9F2] shadow-[0_8px_28px_rgba(75,22,100,0.08)] hover:shadow-[0_14px_38px_rgba(75,22,100,0.16)] transition-all duration-200 overflow-hidden flex flex-col"
                >
                  {/* Card Image + Overlapping Center Icon Circle */}
                  <div className="relative p-3 pb-0">
                    <div className="relative h-52 sm:h-56 w-full rounded-[20px] overflow-hidden">
                      <img
                        src={exp.image}
                        alt={exp.name}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#FAF6FE] border border-[#D4B8EE] shadow-[0_4px_12px_rgba(75,22,100,0.14)] flex items-center justify-center text-[#5D237A]">
                      <ExperienceBadgeIcon
                        type={exp.iconType}
                        className="w-6 h-6 text-[#5D237A]"
                      />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="pt-8 pb-6 px-6 text-center flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif-display text-[23px] sm:text-[25px] font-semibold text-[#2E1142] mb-2">
                        {exp.name}
                      </h3>
                      <p className="font-sans-body text-[13.5px] sm:text-[14px] text-[#3F2157] leading-[1.6] mb-5 max-w-[330px] mx-auto">
                        {exp.shortDescription}
                      </p>
                    </div>

                    <div>
                      {/* Duration & Format Row */}
                      <div className="flex items-center justify-center gap-3 text-[12.5px] sm:text-[13px] font-medium text-[#2E1142] mb-4">
                        <span className="inline-flex items-center gap-1.5">
                          {useCalendarIcon ? (
                            <Calendar className="w-3.5 h-3.5 text-[#5D237A]" />
                          ) : (
                            <Clock className="w-3.5 h-3.5 text-[#5D237A]" />
                          )}
                          <span>{exp.duration}</span>
                        </span>
                        <span className="text-[#BEA0DC]">|</span>
                        <span className="inline-flex items-center gap-1.5">
                          {useClockForFormat ? (
                            <Clock className="w-3.5 h-3.5 text-[#5D237A]" />
                          ) : (
                            <SproutLeafIcon className="w-4 h-4 text-[#5D237A]" />
                          )}
                          <span>{exp.formatLabel}</span>
                        </span>
                      </div>

                      {/* Learn More Pill Button — No decorative arrow */}
                      <button
                        type="button"
                        onClick={() => onOpenExperienceDetail(exp)}
                        className="inline-flex items-center justify-center px-8 py-2 rounded-full bg-white hover:bg-[#4B1664] text-[#3A1352] hover:text-white border border-[#5D237A] text-[13.5px] font-medium transition-all duration-150 cursor-pointer shadow-xs text-center"
                      >
                        <span>Learn More</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4 WELLNESS BENEFITS PILLARS */}
      <section className="py-10 bg-gradient-to-b from-[#FAF7FD] to-[#F3E9FB]">
        <div className="layout-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8">
            {benefitPillars.map((pillar, idx) => (
              <div
                key={pillar.line1}
                className={`flex flex-col items-center text-center px-4 ${
                  idx < benefitPillars.length - 1
                    ? 'lg:border-r lg:border-[#C5A3E0]/80'
                    : ''
                }`}
              >
                <div className="mb-3">{pillar.icon}</div>
                <p className="font-sans-body text-[14.5px] sm:text-[15.5px] font-semibold text-[#3A1352] leading-snug">
                  {pillar.line1}
                  <span className="block">{pillar.line2}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM ROUNDED BANNER CTA */}
      <section className="pb-16 pt-6 bg-[#F3E9FB]/60">
        <div className="layout-container">
          <div className="relative rounded-[28px] overflow-hidden border border-[#D4B8EE] shadow-[0_12px_36px_rgba(58,19,82,0.16)] bg-[#E7D8F7]">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[215px]">
              <div className="hidden lg:block lg:col-span-4 h-full">
                <img
                  src={withBaseUrl('/assets/extracted/cta_exp_left.png')}
                  alt="Cascading waterfall with floating pink lotus"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:col-span-4 py-10 px-6 text-center flex flex-col items-center justify-center bg-gradient-to-r from-[#E9DBF8]/95 via-[#F4ECFC] to-[#E9DBF8]/95">
                <p className="font-sans-body text-[11.5px] font-semibold uppercase tracking-[0.26em] text-[#3B1554] mb-2">
                  READY TO BEGIN?
                </p>
                <h2 className="font-serif-display text-[28px] sm:text-[34px] font-medium uppercase tracking-[0.03em] leading-[1.15] text-[#321048] mb-5">
                  BOOK YOUR
                  <span className="block">HEALING EXPERIENCE</span>
                </h2>
                <button
                  type="button"
                  onClick={() => onNavigate('book')}
                  className="inline-flex items-center justify-center px-9 py-3 rounded-full bg-gradient-to-r from-[#4B1664] to-[#5E207D] hover:from-[#3A0E50] hover:to-[#4B1664] text-white text-[14.5px] font-medium shadow-[0_6px_18px_rgba(75,22,100,0.4)] transition-all cursor-pointer text-center"
                >
                  <span>Book a Session</span>
                </button>
              </div>

              <div className="hidden lg:block lg:col-span-4 h-full">
                <img
                  src={withBaseUrl('/assets/extracted/cta_exp_right.png')}
                  alt="Ornate glowing lantern surrounded by purple blossoms"
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
