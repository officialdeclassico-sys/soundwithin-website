import React, {useState} from 'react';
import {Edit3, X} from 'lucide-react';
import {HeroBanner} from '../components/HeroBanner';
import {withBaseUrl} from '../utils/assetUrl';
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
        variant="brass-lantern"
        kicker="ABOUT US"
        titleLines={['THE STORY', 'BEHIND', 'SOUNDWITHIN']}
        description="A space for healing, self-awareness and inner transformation through the power of sound, nature and mindful practices."
      />

      {/* OUR PURPOSE / WHY SOUNDWITHIN? */}
      <section className="py-12 sm:py-16 bg-[#FAF7FD]">
        <div className="layout-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Organic Blob Image */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-[560px]">
                <img
                  src={withBaseUrl('/assets/extracted/about_why_soundwithin.png')}
                  alt="Woman peacefully looking up into sunlit trees framed by purple blossoms"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Right Purpose Content with Left Hairline Divider */}
            <div className="lg:col-span-6 lg:pl-12 lg:border-l lg:border-[#D5B9EC] space-y-4">
              <p className="font-sans-body text-[12px] font-semibold uppercase tracking-[0.26em] text-[#3A1352]">
                OUR PURPOSE
              </p>
              <h2 className="font-serif-display text-[32px] sm:text-[42px] font-medium uppercase tracking-[0.03em] text-[#321048] leading-tight">
                WHY SOUNDWITHIN?
              </h2>
              <p className="font-sans-body text-[15px] sm:text-[16px] leading-[1.75] text-[#2E1442] max-w-[600px]">
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

      {/* OUR PHILOSOPHY WAVY LAVENDER BAND */}
      <section className="relative py-14 sm:py-16 bg-gradient-to-b from-[#EFE3FA] via-[#F4ECFC] to-[#EFE3FA] border-y border-[#E3CFF5]">
        <div className="layout-container">
          <div className="flex items-center justify-center gap-4 mb-10">
            <span className="w-16 sm:w-24 h-[1px] bg-[#B491D1]" />
            <h2 className="font-sans-body text-[12.5px] font-semibold uppercase tracking-[0.28em] text-[#321048]">
              OUR PHILOSOPHY
            </h2>
            <span className="w-16 sm:w-24 h-[1px] bg-[#B491D1]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8">
            {philosophyItems.map((item, idx) => (
              <div
                key={item.title}
                className={`flex flex-col items-center text-center px-6 ${
                  idx < philosophyItems.length - 1
                    ? 'lg:border-r lg:border-[#C5A3E0]'
                    : ''
                }`}
              >
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-serif-display text-[22px] font-semibold text-[#2E1142] mb-1.5">
                  {item.title}
                </h3>
                <p className="font-sans-body text-[13.5px] text-[#3F2157] leading-relaxed max-w-[230px]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEET THE FOUNDER / THE HEART BEHIND SOUNDWITHIN */}
      <section className="py-14 sm:py-18 bg-[#FAF7FD]">
        <div className="layout-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-5 space-y-4">
              <p className="font-sans-body text-[11.5px] font-semibold uppercase tracking-[0.25em] text-[#3A1352]">
                MEET THE FOUNDER
              </p>
              <h2 className="font-serif-display text-[32px] sm:text-[40px] font-medium uppercase tracking-[0.03em] leading-[1.14] text-[#321048]">
                {settings.founderHeadline || 'THE HEART BEHIND SOUNDWITHIN'}
              </h2>
              <div className="w-14 h-[2px] bg-[#5D237A]" />
              <p className="font-sans-body text-[15px] sm:text-[15.5px] leading-[1.72] text-[#2E1442] pt-1 max-w-[540px]">
                {settings.founderBioShort}
              </p>
              <p className="text-[12px] text-[#6B4A8C] italic">
                {settings.founderNoteLabel}
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowFounderModal(true)}
                  className="inline-flex items-center justify-center px-8 py-2.5 rounded-full bg-white hover:bg-[#4B1664] text-[#3A1352] hover:text-white border border-[#5D237A] text-[14px] font-medium transition-all cursor-pointer shadow-xs text-center"
                >
                  <span>My Journey</span>
                </button>
              </div>
            </div>

            {/* Right Column: Singing Bowls Waterfall Blob Image */}
            <div className="lg:col-span-7 flex justify-center lg:justify-end">
              <div className="w-full max-w-[740px]">
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

          {/* OUR APPROACH ROUNDED BAR */}
          <div className="mt-12 rounded-[26px] bg-gradient-to-r from-[#EFE4FA] via-[#F6EFFD] to-[#EFE4FA] border border-[#D8C0EE] p-6 sm:p-8 shadow-[0_6px_22px_rgba(75,22,100,0.06)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-3 text-center lg:text-left lg:border-r lg:border-[#C5A3E0] lg:pr-6">
                <h3 className="font-serif-display text-[26px] sm:text-[28px] font-medium uppercase tracking-[0.06em] text-[#321048] leading-tight">
                  OUR
                  <span className="block">APPROACH</span>
                </h3>
              </div>

              <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {approachItems.map((item, idx) => (
                  <div
                    key={item.title}
                    className={`flex flex-col items-center text-center px-4 ${
                      idx < approachItems.length - 1
                        ? 'sm:border-r sm:border-[#C5A3E0]'
                        : ''
                    }`}
                  >
                    <div className="mb-2">{item.icon}</div>
                    <h4 className="font-serif-display text-[21px] font-semibold text-[#2E1142] mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[13.5px] text-[#3F2157] leading-snug max-w-[230px]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WALK THE PATH WITH US / BEGIN YOUR HEALING JOURNEY CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#DFCCF4] via-[#F3EAFB] to-[#DFCCF4] border-t border-[#D8C0EE]">
        <div className="layout-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[220px]">
            <div className="hidden lg:block lg:col-span-4 h-full">
              <img
                src={withBaseUrl('/assets/extracted/cta_about_left.png')}
                alt="Waterfall and purple flowers"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-4 py-12 px-6 text-center flex flex-col items-center justify-center">
              <p className="font-sans-body text-[11.5px] font-semibold uppercase tracking-[0.26em] text-[#3A1352] mb-2">
                WALK THE PATH WITH US
              </p>
              <h2 className="font-serif-display text-[30px] sm:text-[38px] font-medium uppercase tracking-[0.04em] leading-[1.15] text-[#321048] mb-5">
                BEGIN YOUR
                <span className="block">HEALING JOURNEY</span>
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
                src={withBaseUrl('/assets/extracted/cta_about_right.png')}
                alt="River stone and purple flowers"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover object-right"
              />
            </div>
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
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#EFE2FA] text-[#3B1254] flex items-center justify-center hover:bg-[#E2CCF5] cursor-pointer"
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
                  className="px-5 py-2 rounded-full border border-[#5D237A] text-[#3A1352] text-sm font-medium hover:bg-[#F2E6FA] cursor-pointer text-center"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowFounderModal(false);
                    onNavigate('book');
                  }}
                  className="px-6 py-2 rounded-full bg-[#4B1664] text-white text-sm font-medium hover:bg-[#3A0E50] cursor-pointer text-center"
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
