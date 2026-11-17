import React, {useState} from 'react';
import {
  AlertCircle,
  BedDouble,
  BookOpen,
  Calendar,
  MapPin,
  Trees,
  Users,
  Utensils,
} from 'lucide-react';
import {HeroBanner} from '../components/HeroBanner';
import {
  InfinityLineIcon,
  LotusLineIcon,
  MeditatePersonIcon,
  SoundwaveIcon,
  SproutLeafIcon,
  WavyOrnament,
  ZenStonesIcon,
} from '../components/BrandIcons';
import type {PageRoute, Retreat, RetreatFeature, UpcomingRetreatBatch} from '../types';

interface RetreatsPageProps {
  onNavigate: (page: PageRoute) => void;
  retreats: Retreat[];
  upcomingRetreats: UpcomingRetreatBatch[];
  onOpenRetreatDetail: (retreat: Retreat) => void;
}

function renderRetreatFeatureIcon(icon: RetreatFeature['icon']) {
  switch (icon) {
    case 'soundwave':
      return <SoundwaveIcon className="w-5 h-5 text-[#5D237A]" />;
    case 'lotus':
      return <LotusLineIcon className="w-6 h-5 text-[#5D237A]" />;
    case 'leaf':
      return <SproutLeafIcon className="w-5 h-5 text-[#5D237A]" />;
    case 'book':
      return <BookOpen className="w-5 h-5 text-[#5D237A]" strokeWidth={1.7} />;
    case 'meditate':
      return <MeditatePersonIcon className="w-5 h-5 text-[#5D237A]" />;
    case 'stones':
      return <ZenStonesIcon className="w-5 h-5 text-[#5D237A]" />;
    case 'infinity':
      return <InfinityLineIcon className="w-6 h-5 text-[#5D237A]" />;
    default:
      return <LotusLineIcon className="w-5 h-5 text-[#5D237A]" />;
  }
}

export function RetreatsPage({
  onNavigate,
  retreats,
  upcomingRetreats,
  onOpenRetreatDetail,
}: RetreatsPageProps) {
  const [showAllDatesModal, setShowAllDatesModal] = useState(false);

  const retreatBenefits = [
    {
      icon: <LotusLineIcon className="w-9 h-8 text-[#5D237A]" />,
      label: 'Deep Healing',
    },
    {
      icon: <ZenStonesIcon className="w-8 h-8 text-[#5D237A]" />,
      label: 'Inner Clarity',
    },
    {
      icon: <SproutLeafIcon className="w-8 h-8 text-[#5D237A]" />,
      label: 'Emotional Release',
    },
    {
      icon: <InfinityLineIcon className="w-9 h-8 text-[#5D237A]" />,
      label: 'Lasting Transformation',
    },
  ];

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
        variant="brass-lantern"
        kicker="RETREATS"
        titleLines={['IMMERSIVE', 'HEALING RETREATS']}
        description="Multi-day, nature-based retreats that blend sound healing, meditation, self-awareness and deep inner work to help you reset, heal and realign."
      />

      {/* 4 RETREAT BENEFITS STRIP */}
      <section className="py-7 bg-gradient-to-b from-[#EFE4FA] to-[#FAF7FD] border-b border-[#E7D8F6]">
        <div className="layout-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6">
            {retreatBenefits.map((item, idx) => (
              <div
                key={item.label}
                className={`flex flex-col items-center justify-center text-center px-4 ${
                  idx < retreatBenefits.length - 1
                    ? 'lg:border-r lg:border-[#C5A3E0]/80'
                    : ''
                }`}
              >
                <div className="mb-2">{item.icon}</div>
                <span className="font-sans-body text-[14.5px] sm:text-[15.5px] font-semibold text-[#3A1352]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR RETREATS / CHOOSE YOUR HEALING JOURNEY */}
      <section className="py-12 sm:py-16 bg-[#FAF7FD]">
        <div className="layout-container">
          {/* Section Title */}
          <div className="text-center max-w-[680px] mx-auto mb-11">
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="w-16 sm:w-24 h-[1px] bg-[#B491D1]" />
              <span className="font-sans-body text-[12px] font-semibold uppercase tracking-[0.28em] text-[#3A1352]">
                OUR RETREATS
              </span>
              <span className="w-16 sm:w-24 h-[1px] bg-[#B491D1]" />
            </div>
            <h2 className="font-serif-display text-[32px] sm:text-[42px] font-medium uppercase tracking-[0.03em] text-[#321048] mb-2">
              CHOOSE YOUR HEALING JOURNEY
            </h2>
            <p className="font-sans-body text-[15px] sm:text-[16px] text-[#3F2157] leading-relaxed max-w-[540px] mx-auto">
              Curated retreat experiences in serene natural locations, designed
              for rest, healing and self-discovery.
            </p>
          </div>

          {/* 3 RETREAT PACKAGE CARDS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 lg:gap-8">
            {retreats.map((retreat) => (
              <article
                key={retreat.id}
                className="group rounded-[26px] bg-gradient-to-b from-white via-[#FAF5FE] to-[#F3E9FB] border border-[#DEC9F2] shadow-[0_8px_28px_rgba(75,22,100,0.08)] hover:shadow-[0_14px_38px_rgba(75,22,100,0.16)] transition-all duration-200 overflow-hidden flex flex-col"
              >
                {/* Top Image with Duration Pill */}
                <div className="p-3 pb-0">
                  <div className="relative h-56 w-full rounded-[20px] overflow-hidden">
                    <img
                      src={retreat.image}
                      alt={retreat.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 px-3.5 py-1.5 rounded-full bg-white/95 text-[#3A1352] text-[12px] font-medium flex items-center gap-1.5 shadow-md">
                      <Calendar className="w-3.5 h-3.5 text-[#5D237A]" />
                      <span>{retreat.badgeDuration}</span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 text-center flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif-display text-[25px] font-semibold text-[#2E1142] mb-2">
                      {retreat.name}
                    </h3>
                    <p className="font-sans-body text-[13.5px] sm:text-[14px] text-[#3F2157] leading-[1.6] mb-5 max-w-[350px] mx-auto">
                      {retreat.shortDescription}
                    </p>
                  </div>

                  <div>
                    {/* 3 Mini Feature Pillars inside Card */}
                    <div className="grid grid-cols-3 py-3 mb-5 border-y border-[#E6D4F6]">
                      {retreat.features.map((feat, fIdx) => (
                        <div
                          key={feat.label}
                          className={`flex flex-col items-center justify-center px-1 ${
                            fIdx < retreat.features.length - 1
                              ? 'border-r border-[#D5B9EC]'
                              : ''
                          }`}
                        >
                          <div className="mb-1">
                            {renderRetreatFeatureIcon(feat.icon)}
                          </div>
                          <span className="text-[11.5px] sm:text-[12px] font-medium text-[#3A1352]">
                            {feat.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Explore Retreat Button — No decorative arrow */}
                    <button
                      type="button"
                      onClick={() => onOpenRetreatDetail(retreat)}
                      className="inline-flex items-center justify-center px-9 py-2.5 rounded-full bg-white hover:bg-[#4B1664] text-[#3A1352] hover:text-white border border-[#5D237A] text-[13.5px] font-medium transition-all cursor-pointer text-center"
                    >
                      <span>Explore Retreat</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* WHAT'S INCLUDED SECTION */}
          <div className="mt-14 pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Rounded Singing Bowl Image */}
              <div className="lg:col-span-4 flex justify-center lg:justify-start">
                <div className="w-full max-w-[400px] h-48 rounded-full overflow-hidden border-2 border-[#DEC9F2] shadow-[0_8px_24px_rgba(75,22,100,0.12)]">
                  <img
                    src="/assets/extracted/retreat_included_bowl.png"
                    alt="Tibetan singing bowl with incense smoke and amethyst crystal on mossy stone"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right 6 Inclusions */}
              <div className="lg:col-span-8 lg:pl-8 lg:border-l lg:border-[#D5B9EC]">
                <h3 className="font-serif-display text-[22px] sm:text-[24px] font-semibold uppercase tracking-[0.18em] text-[#3A1352] mb-6 text-center lg:text-left">
                  WHAT&rsquo;S INCLUDED?
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
                  {inclusions.map((inc) => (
                    <div
                      key={inc.line1}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="w-13 h-13 rounded-full bg-[#EFE2FA] border border-[#D8BEEC] flex items-center justify-center mb-2.5 shadow-xs">
                        {inc.icon}
                      </div>
                      <p className="text-[12.5px] font-medium text-[#2E1142] leading-tight">
                        {inc.line1}
                        <span className="block">{inc.line2}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* UPCOMING RETREATS BAR */}
          <div className="mt-12 rounded-[26px] bg-gradient-to-r from-[#EAE0F6] via-[#F2E9FB] to-[#EAE0F6] border border-[#D6BCEB] p-6 sm:p-8 shadow-[0_6px_22px_rgba(75,22,100,0.07)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Title */}
              <div className="lg:col-span-3 text-center lg:text-left lg:border-r lg:border-[#C5A3E0] lg:pr-4">
                <h3 className="font-serif-display text-[24px] sm:text-[26px] font-medium uppercase tracking-[0.14em] text-[#321048] leading-tight">
                  UPCOMING
                  <span className="block">RETREATS</span>
                </h3>
                <div className="mt-1 flex justify-center lg:justify-start">
                  <WavyOrnament className="w-28 h-3 text-[#5D237A]" />
                </div>
              </div>

              {/* Center 3 Schedule Slots */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
                {upcomingRetreats.map((batch, idx) => (
                  <button
                    key={batch.id}
                    type="button"
                    onClick={() => handleBatchClick(batch)}
                    className={`text-left px-3 py-1.5 rounded-xl hover:bg-white/60 transition-colors cursor-pointer ${
                      idx < upcomingRetreats.length - 1
                        ? 'sm:border-r sm:border-[#C5A3E0]/80 sm:pr-4'
                        : ''
                    }`}
                  >
                    <div className="flex items-center gap-2 text-[14px] font-semibold text-[#2E1142]">
                      <Calendar className="w-4 h-4 text-[#5D237A] shrink-0" />
                      <span>{batch.dateLabel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[13px] text-[#4A2B63] mt-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#6B2D8F] shrink-0" />
                      <span>{batch.locationLabel}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Right View All Dates Button — No decorative arrow */}
              <div className="lg:col-span-2 flex justify-center lg:justify-end">
                <button
                  type="button"
                  onClick={() => setShowAllDatesModal(true)}
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#4B1664] hover:bg-[#3A0E50] text-white text-[13px] font-medium shadow-md transition-colors whitespace-nowrap cursor-pointer text-center"
                >
                  <span>View All Dates</span>
                </button>
              </div>
            </div>

            {/* Subtle Editable Schedule Note */}
            <div className="mt-4 pt-3 border-t border-[#DEC8F0] flex items-center justify-center gap-2 text-[12px] text-[#5B3A75]">
              <AlertCircle className="w-3.5 h-3.5 text-[#5D237A] shrink-0" />
              <span>
                Note: Upcoming retreat dates and locations shown above are editable
                placeholders configurable in the Admin Management portal. Click any
                retreat to inspect its full itinerary.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM SCENIC STREAM BANNER & FINAL CTA */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7FD] via-[#EFE3FA] to-[#E6D4F6]">
        {/* Full-Width Forest Stream & Meditation Cushions Image */}
        <div className="relative w-full h-[250px] sm:h-[340px] overflow-hidden">
          <img
            src="/assets/extracted/retreat_stream_banner.png"
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
            className="absolute -bottom-1 inset-x-0 w-full h-14 sm:h-20"
            aria-hidden="true"
          >
            <path
              d="M0 40C240 95 480 0 720 35C960 70 1200 10 1440 45V90H0V40Z"
              fill="#F3EAFB"
            />
          </svg>
        </div>

        {/* Ready For a Deeper Reset CTA */}
        <div className="relative z-10 layout-container pt-6 pb-16 text-center">
          <p className="font-sans-body text-[11.5px] font-semibold uppercase tracking-[0.26em] text-[#3B1554] mb-2">
            READY FOR A DEEPER RESET?
          </p>
          <h2 className="font-serif-display text-[32px] sm:text-[44px] font-medium uppercase tracking-[0.04em] text-[#321048] mb-2">
            JOIN A HEALING RETREAT
          </h2>
          <p className="font-sans-body text-[15px] sm:text-[16px] text-[#3F2157] mb-6 max-w-[540px] mx-auto">
            Step away from the noise and give yourself the space to heal,
            reflect and realign.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('book')}
            className="inline-flex items-center justify-center px-10 py-3.5 rounded-full bg-gradient-to-r from-[#4B1664] to-[#5E207D] hover:from-[#3A0E50] hover:to-[#4B1664] text-white text-[15px] font-medium shadow-[0_6px_20px_rgba(75,22,100,0.4)] transition-all cursor-pointer text-center"
          >
            <span>Book Your Retreat</span>
          </button>
        </div>
      </section>

      {/* Modal for "View All Dates" */}
      {showAllDatesModal && (
        <div
          className="fixed inset-0 z-50 bg-[#1B0828]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto scrollbar-hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-[720px] max-h-[90vh] overflow-y-auto scrollbar-hidden rounded-3xl bg-[#FAF6FE] border border-[#D7BEEF] p-6 sm:p-8 shadow-2xl">
            <h3 className="font-serif-display text-3xl font-semibold text-[#321048] mb-2">
              Upcoming Retreat Schedule
            </h3>
            <p className="text-[14px] text-[#4B2B63] mb-5">
              Below are our retreat schedule slots. Please note that dates,
              locations, and seat counts are editable placeholders until finalized
              by the sanctuary administrator.
            </p>
            <div className="space-y-3 mb-6">
              {upcomingRetreats.map((batch) => (
                <div
                  key={batch.id}
                  className="p-4 rounded-2xl bg-white border border-[#DFC9F2] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <p className="font-serif-display text-xl font-semibold text-[#2E1142]">
                      {batch.retreatName}
                    </p>
                    <p className="text-[13.5px] text-[#4B2B63] mt-0.5">
                      {batch.dateLabel} &bull; {batch.locationLabel}
                    </p>
                    <p className="text-[12px] text-[#6B2D8F] mt-0.5">
                      {batch.seatsLabel}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAllDatesModal(false);
                      handleBatchClick(batch);
                    }}
                    className="self-start sm:self-center px-5 py-2 rounded-full bg-[#4B1664] text-white text-xs font-medium hover:bg-[#3A0E50] transition-colors cursor-pointer whitespace-nowrap text-center"
                  >
                    View Itinerary
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAllDatesModal(false)}
                className="px-6 py-2.5 rounded-full border border-[#5D237A] text-[#3A1352] text-sm font-medium hover:bg-[#F2E6FA] cursor-pointer text-center"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAllDatesModal(false);
                  onNavigate('contact');
                }}
                className="px-6 py-2.5 rounded-full bg-[#4B1664] text-white text-sm font-medium hover:bg-[#3A0E50] cursor-pointer text-center"
              >
                Request Custom Group Dates
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
