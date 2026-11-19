import React, {useState} from 'react';
import {Edit3, X} from 'lucide-react';
import {HeroBanner} from '../components/HeroBanner';
import {InfiniteHorizontalCarousel} from '../components/InfiniteHorizontalCarousel';
import {BottomPromoBanner} from '../components/BottomPromoBanner';
import {withBaseUrl} from '../utils/assetUrl';
import {BUTTON_TOKENS} from '../utils/buttonThemes';
import {IS_STATIC_PRESENTATION} from '../data/staticContent';
import {
  InfinityLineIcon,
  LotusLineIcon,
  NatureTreeIcon,
  SoundwaveIcon,
  SproutLeafIcon,
  ZenStonesIcon,
} from '../components/BrandIcons';
import type {PageRoute, WebsiteSettings} from '../types';

interface AboutPageProps {
  onNavigate: (page: PageRoute) => void;
  settings: WebsiteSettings;
}

export function AboutPage({onNavigate, settings}: AboutPageProps) {
  const [showFounderModal, setShowFounderModal] = useState(false);

  const philosophyItems = [
    {
      icon: <LotusLineIcon className="w-9 h-8 text-[#5D237A]" />,
      title: 'Heal Naturally',
      description: 'Support your well-being with gentle, natural practices.',
    },
    {
      icon: <ZenStonesIcon className="w-8 h-8 text-[#5D237A]" />,
      title: 'Be Present',
      description: 'Slow down, listen within and return to the present moment.',
    },
    {
      icon: <SproutLeafIcon className="w-8 h-8 text-[#5D237A]" />,
      title: 'Reconnect',
      description: 'Realign with nature, your inner self and what truly matters.',
    },
    {
      icon: <InfinityLineIcon className="w-9 h-8 text-[#5D237A]" />,
      title: 'Transform',
      description:
        'Release what no longer serves you and create space for lasting change.',
    },
  ];

  const approachItems = [
    {
      icon: <SoundwaveIcon className="w-7 h-7 text-[#5D237A]" />,
      title: 'Sound Healing',
      description: 'Heal through vibration and frequency.',
    },
    {
      icon: <LotusLineIcon className="w-8 h-7 text-[#5D237A]" />,
      title: 'Mindful Practices',
      description: 'Meditation, breathwork and inner work.',
    },
    {
      icon: <NatureTreeIcon className="w-7 h-7 text-[#5D237A]" />,
      title: 'Nature Immersion',
      description: 'Reconnect and reset in natural surroundings.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7FD] text-[#2A123F]">
      {/* HERO SECTION */}
      <HeroBanner
        currentPage="about"
        onNavigate={onNavigate}
        variant="about-team"
        kicker="GET TO KNOW US"
        titleLines={['A Journey Towards', 'Inner Harmony']}
        description="We bring together sound, mindfulness, and meaningful human connection to create spaces for healing, self-discovery, and personal transformation."
        mobileDescription="Bringing together sound, mindfulness, and human connection for healing and inner transformation."
        ctaLabel="Discover Our Story"
        onCtaClick={() => {
          document
            .getElementById('about-our-purpose')
            ?.scrollIntoView({behavior: 'smooth'});
        }}
      />

      {/* OUR PURPOSE / WHY SOUNDWITHIN? */}
      <section id="about-our-purpose" className="py-7 sm:py-10 lg:py-12 bg-[#FAF7FD]">
        <div className="layout-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Organic Blob Image */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-[500px]">
                <img
                  src={withBaseUrl('/assets/extracted/about_why_soundwithin.png')}
                  alt="Woman peacefully looking up into sunlit trees framed by purple blossoms"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Right Purpose Content with Left Hairline Divider */}
            <div className="lg:col-span-6 lg:pl-8 lg:border-l lg:border-[#D5B9EC] space-y-2.5 sm:space-y-3">
              <p className="font-sans-body text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.22em] sm:tracking-[0.26em] text-[#3A1352] whitespace-nowrap">
                OUR PURPOSE
              </p>
              <h2 className="font-serif-display text-[clamp(20px,3.6vw,42px)] font-medium uppercase tracking-[0.025em] sm:tracking-[0.03em] text-[#321048] leading-tight whitespace-nowrap">
                WHY SOUNDWITHIN?
              </h2>
              <p className="font-sans-body text-[14.5px] sm:text-[15.5px] leading-[1.68] text-[#2E1442] max-w-[600px]">
                SoundWithin was born from a deep belief that healing is not just
                about the body, but about realigning the mind, emotions and
                energy with your true self. We create immersive, nature-connected
                experiences that use the power of sound, vibration and inner work
                to bring you back to balance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR PHILOSOPHY WAVY LAVENDER BAND — Continuous Infinite Horizontal Scrolling */}
      <section className="relative py-7 sm:py-9 bg-gradient-to-b from-[#EFE3FA] via-[#F4ECFC] to-[#EFE3FA] border-y border-[#E3CFF5] overflow-hidden">
        <div className="layout-container">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <span className="w-12 sm:w-20 h-[1px] bg-[#B491D1]" />
            <h2 className="font-sans-body text-[11.5px] sm:text-[12.5px] font-semibold uppercase tracking-[0.24em] sm:tracking-[0.28em] text-[#321048] whitespace-nowrap">
              OUR PHILOSOPHY
            </h2>
            <span className="w-12 sm:w-20 h-[1px] bg-[#B491D1]" />
          </div>
        </div>

        <InfiniteHorizontalCarousel
          items={philosophyItems}
          getItemKey={(item, idx) => `${item.title}-${idx}`}
          dividerClassName="h-20 sm:h-24 w-[1px] bg-[#C5A3E0]/75 shrink-0"
          className="py-1"
          renderItem={(item) => (
            <div className="flex flex-col items-center text-center px-6 sm:px-8 lg:px-10 w-[260px] sm:w-[290px] lg:w-[315px] shrink-0">
              <div className="mb-2 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="font-serif-display text-[20px] sm:text-[21px] font-semibold text-[#2E1142] mb-1 whitespace-nowrap">
                {item.title}
              </h3>
              <p className="font-sans-body text-[13px] sm:text-[13.5px] text-[#3F2157] leading-relaxed max-w-[230px]">
                {item.description}
              </p>
            </div>
          )}
        />
      </section>

      {/* MEET THE FOUNDER / THE HEART BEHIND SOUNDWITHIN */}
      <section className="py-7 sm:py-10 lg:py-12 bg-[#FAF7FD]">
        <div className="layout-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Column */}
            <div className="lg:col-span-5 space-y-3">
              <p className="font-sans-body text-[11px] sm:text-[11.5px] font-semibold uppercase tracking-[0.22em] sm:tracking-[0.25em] text-[#3A1352] whitespace-nowrap">
                MEET THE FOUNDER
              </p>
              <h2 className="font-serif-display text-[clamp(14px,2.55vw,36px)] font-medium uppercase tracking-[0.02em] sm:tracking-[0.025em] leading-[1.14] text-[#321048] whitespace-nowrap">
                {settings.founderHeadline || 'THE HEART BEHIND SOUNDWITHIN'}
              </h2>
              <div className="w-14 h-[2px] bg-[#5D237A]" />
              <p className="font-sans-body text-[14.5px] sm:text-[15px] leading-[1.68] text-[#2E1442] pt-0.5 max-w-[540px]">
                {settings.founderBioShort}
              </p>
              <p className="text-[12px] text-[#6B4A8C] italic whitespace-nowrap">
                {settings.founderNoteLabel}
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowFounderModal(true)}
                  className={`inline-flex items-center justify-center px-7 py-2 rounded-full text-[13.5px] font-semibold cursor-pointer text-center whitespace-nowrap ${BUTTON_TOKENS.blushRose}`}
                >
                  <span>My Journey</span>
                </button>
              </div>
            </div>

            {/* Right Column: Singing Bowls Waterfall Blob Image */}
            <div className="lg:col-span-7 flex justify-center lg:justify-end">
              <div className="w-full max-w-[650px]">
                <img
                  src={withBaseUrl('/assets/extracted/about_founder_bowls.png')}
                  alt="Four Himalayan singing bowls, glowing candle, and amethyst crystal before a waterfall"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* OUR APPROACH ROUNDED BAR — Continuous Infinite Horizontal Scrolling */}
          <div className="mt-7 sm:mt-9 rounded-[24px] bg-gradient-to-r from-[#EFE4FA] via-[#F6EFFD] to-[#EFE4FA] border border-[#D8C0EE] py-4.5 px-4 sm:py-6 sm:px-6 shadow-[0_6px_22px_rgba(75,22,100,0.06)] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-center">
              <div className="lg:col-span-3 text-center lg:text-left lg:border-r lg:border-[#C5A3E0] lg:pr-5">
                <h3 className="font-serif-display text-[clamp(19px,2vw,25px)] font-medium uppercase tracking-[0.05em] text-[#321048] leading-tight whitespace-nowrap">
                  OUR APPROACH
                </h3>
              </div>

              <div className="lg:col-span-9 min-w-0 overflow-hidden">
                <InfiniteHorizontalCarousel
                  items={approachItems}
                  getItemKey={(item, idx) => `${item.title}-${idx}`}
                  dividerClassName="h-16 sm:h-20 w-[1px] bg-[#C5A3E0]/75 shrink-0"
                  className="py-0.5"
                  renderItem={(item) => (
                    <div className="flex flex-col items-center text-center px-5 sm:px-7 lg:px-8 w-[235px] sm:w-[260px] lg:w-[275px] shrink-0">
                      <div className="mb-1.5 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <h4 className="font-serif-display text-[19.5px] sm:text-[20.5px] font-semibold text-[#2E1142] mb-0.5 whitespace-nowrap">
                        {item.title}
                      </h4>
                      <p className="text-[13px] text-[#3F2157] leading-snug max-w-[230px]">
                        {item.description}
                      </p>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WALK THE PATH WITH US / BEGIN YOUR HEALING JOURNEY CTA — Matches Home Bottom Banner Proportions */}
      <section className="pt-3.5 pb-3 sm:pt-5 sm:pb-5 bg-gradient-to-b from-[#FAF7FD] to-[#F3E9FB]/75">
        <div className="layout-container">
          <BottomPromoBanner
            imageSrc="/assets/aistudio/Sunlit_Archway_Yoga_Studio_625612a0.png"
            imageAlt="Sunlit yoga archway sanctuary with frosted window, cork blocks, stacked mauve yoga mats, illuminated shelves, and lush plants"
            imageWidth={2172}
            imageHeight={724}
            objectPositionClass="object-[50%_72%]"
            fallbackBgClass="bg-gradient-to-r from-[#F9DFCD] via-[#FAD7CC] to-[#F8D9C0]"
            heading="Walk the Path With Us"
            subheading="Begin Your Healing Journey"
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

      {/* FOUNDER BIOGRAPHY MODAL ("My Journey") */}
      {showFounderModal && (
        <div
          className="fixed inset-0 z-50 bg-[#1B0828]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto scrollbar-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="founder-modal-title"
        >
          <div className="relative w-full max-w-[720px] max-h-[90vh] overflow-y-auto scrollbar-hidden rounded-3xl bg-[#FAF6FE] border border-[#D7BEEF] p-6 sm:p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowFounderModal(false)}
              aria-label="Close founder story"
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-br from-[#F6EEFD] to-[#FCEEF5] border border-[#D7BEEF] text-[#3B1254] flex items-center justify-center hover:from-[#EAD9FA] hover:to-[#F9DFEC] transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5D237A] mb-1">
              Meet the Founder
            </p>
            <h3
              id="founder-modal-title"
              className="font-serif-display text-3xl font-semibold text-[#321048] mb-4"
            >
              {settings.founderHeadline}
            </h3>

            <div className="space-y-3.5 text-[15px] leading-relaxed text-[#3B1D52] mb-6">
              <p>{settings.founderBioShort}</p>
              {settings.founderBioExtended.map((para, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? 'p-3 rounded-xl bg-[#F2E6FA] border border-[#D5B8EE] text-xs font-medium text-[#4B1664]'
                      : ''
                  }
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#E4D1F5]">
              {!IS_STATIC_PRESENTATION ? (
                <button
                  type="button"
                  onClick={() => {
                    setShowFounderModal(false);
                    onNavigate('admin');
                  }}
                  className="inline-flex items-center gap-2 text-xs font-medium text-[#5D237A] hover:underline cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Founder Biography in Admin</span>
                </button>
              ) : (
                <span className="text-xs font-medium text-[#5D237A]">
                  SoundWithin Sanctuary &bull; Western Ghats
                </span>
              )}

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowFounderModal(false)}
                  className={`px-5 py-2 rounded-full text-sm font-medium cursor-pointer text-center whitespace-nowrap ${BUTTON_TOKENS.secondary}`}
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowFounderModal(false);
                    onNavigate('book');
                  }}
                  className={`px-6 py-2 rounded-full text-sm font-medium cursor-pointer text-center whitespace-nowrap ${BUTTON_TOKENS.general}`}
                >
                  Book a Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
