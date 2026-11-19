import React from 'react';
import {BookOpen, Calendar} from 'lucide-react';
import {
  InfinityLineIcon,
  LotusLineIcon,
  MeditatePersonIcon,
  SoundwaveIcon,
  SproutLeafIcon,
  ZenStonesIcon,
} from './BrandIcons';
import {getRetreatButtonToken} from '../utils/buttonThemes';
import type {Retreat, RetreatFeature} from '../types';

export interface RetreatCardProps {
  retreat: Retreat;
  index: number;
  onExplore: (retreat: Retreat) => void;
}

interface RetreatPastelTheme {
  stopTop: string;
  stopMid: string;
  stopBottom: string;
  outerBorderHex: string;
  sprigHex: string;
}

const RETREAT_PASTEL_THEMES: Record<string, RetreatPastelTheme> = {
  // 1. Sound Healing Retreat — Soft Blush Pink
  'retreat-sound-healing': {
    stopTop: '#FCE4F1',
    stopMid: '#FAD3E8',
    stopBottom: '#FDECF5',
    outerBorderHex: '#F3D5E8',
    sprigHex: '#E59EC5',
  },
  // 2. Self-Awareness Retreat — Warm Peach
  'retreat-self-awareness': {
    stopTop: '#FDEBE0',
    stopMid: '#FBD9BE',
    stopBottom: '#FEF2E7',
    outerBorderHex: '#F3DEC9',
    sprigHex: '#E8AE72',
  },
  // 3. Transformation Retreat — Soft Lavender
  'retreat-transformation': {
    stopTop: '#ECE2FD',
    stopMid: '#DEC9FB',
    stopBottom: '#F4EEFE',
    outerBorderHex: '#E1D2F8',
    sprigHex: '#B391EA',
  },
};

const FALLBACK_RETREAT_THEMES: RetreatPastelTheme[] = [
  RETREAT_PASTEL_THEMES['retreat-sound-healing'],
  RETREAT_PASTEL_THEMES['retreat-self-awareness'],
  RETREAT_PASTEL_THEMES['retreat-transformation'],
];

export function renderRetreatFeatureIcon(icon: RetreatFeature['icon']) {
  switch (icon) {
    case 'soundwave':
      return <SoundwaveIcon className="w-[22px] h-[22px] text-[#3B1554]" />;
    case 'lotus':
      return <LotusLineIcon className="w-[24px] h-[22px] text-[#3B1554]" />;
    case 'leaf':
      return <SproutLeafIcon className="w-[22px] h-[22px] text-[#3B1554]" />;
    case 'book':
      return <BookOpen className="w-[21px] h-[21px] text-[#3B1554]" strokeWidth={1.7} />;
    case 'meditate':
      return <MeditatePersonIcon className="w-[22px] h-[22px] text-[#3B1554]" />;
    case 'stones':
      return <ZenStonesIcon className="w-[22px] h-[22px] text-[#3B1554]" />;
    case 'infinity':
      return <InfinityLineIcon className="w-[24px] h-[22px] text-[#3B1554]" />;
    default:
      return <LotusLineIcon className="w-[22px] h-[22px] text-[#3B1554]" />;
  }
}

export function RetreatCard({retreat, index, onExplore}: RetreatCardProps) {
  const theme =
    RETREAT_PASTEL_THEMES[retreat.id] ||
    FALLBACK_RETREAT_THEMES[index % FALLBACK_RETREAT_THEMES.length];

  return (
    <article
      style={{borderColor: theme.outerBorderHex}}
      className="group relative rounded-[26px] bg-white/95 p-[5px] sm:p-1.5 border shadow-[0_10px_28px_rgba(62,20,88,0.08)] hover:shadow-[0_16px_38px_rgba(62,20,88,0.14)] transition-all duration-200 flex flex-col"
    >
      <div className="relative rounded-[20px] overflow-hidden flex-1 flex flex-col">
        {/* Top Landscape Image with Rounded Upper Corners & Real UI Top-Right Duration Badge */}
        <div className="relative aspect-[480/228] w-full overflow-hidden shrink-0 bg-[#231130]">
          <img
            src={retreat.image}
            alt={retreat.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />

          {/* Actual Website UI Duration Badge in Top-Right of Image */}
          <div className="absolute top-3 right-3 z-20 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-xs text-[#3A1352] font-sans-body text-[11.5px] sm:text-[12px] font-semibold flex items-center gap-1.5 shadow-[0_4px_14px_rgba(42,16,60,0.22)] border border-[#5D237A]/25">
            <Calendar
              className="w-3.5 h-3.5 text-[#4E1B6B] shrink-0"
              strokeWidth={2}
            />
            <span className="whitespace-nowrap leading-none">
              {retreat.badgeDuration}
            </span>
          </div>
        </div>

        {/* Pastel Wavy Lower Content Body */}
        <div
          style={{
            background: `linear-gradient(165deg, ${theme.stopTop} 0%, ${theme.stopMid} 48%, ${theme.stopBottom} 100%)`,
          }}
          className="relative pt-3 pb-5 px-5 sm:pt-3.5 sm:pb-5.5 sm:px-5.5 flex-1 flex flex-col justify-between"
        >
          {/* Smooth Curved / Wavy Transition Overlapping Bottom 32px of Image */}
          <svg
            viewBox="0 0 400 34"
            fill="none"
            preserveAspectRatio="none"
            className="absolute -top-[32px] inset-x-0 w-full h-[34px] pointer-events-none select-none z-10"
            aria-hidden="true"
          >
            <path
              d="M0 17 C68 1, 134 3, 202 20 C268 35, 334 1, 400 15 L400 34 L0 34 Z"
              fill={theme.stopTop}
            />
            <path
              d="M0 17 C68 1, 134 3, 202 20 C268 35, 334 1, 400 15"
              stroke="#FFFFFF"
              strokeWidth="2.2"
              strokeOpacity="0.92"
              fill="none"
            />
          </svg>

          {/* Subtle 4-Point White Sparkle Accent near Right Wave Crest */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="absolute -top-1.5 right-6 w-4 h-4 text-white/95 pointer-events-none select-none z-20"
            aria-hidden="true"
          >
            <path
              d="M12 1C12.7 7.2 16.8 11.3 23 12C16.8 12.7 12.7 16.8 12 23C11.3 16.8 7.2 12.7 1 12C7.2 11.3 11.3 7.2 12 1Z"
              fill="currentColor"
            />
          </svg>

          {/* Botanical Decorative Leaf Sprig in Bottom-Right Corner */}
          <svg
            viewBox="0 0 68 92"
            fill="none"
            style={{color: theme.sprigHex}}
            className="absolute bottom-1.5 right-2.5 w-13 h-18 opacity-65 pointer-events-none select-none"
            aria-hidden="true"
          >
            <path
              d="M14 88C22 66 36 42 54 16"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <path
              d="M54 16C50 7 56 2 61 5C63 11 59 16 54 16Z"
              fill="currentColor"
            />
            <path
              d="M45 30C37 23 37 14 43 12C48 16 49 24 45 30Z"
              fill="currentColor"
            />
            <path
              d="M46 32C54 28 61 31 61 37C56 40 49 37 46 32Z"
              fill="currentColor"
            />
            <path
              d="M36 46C27 39 27 29 33 27C39 31 39 39 36 46Z"
              fill="currentColor"
            />
            <path
              d="M37 48C46 44 54 47 54 53C48 56 41 53 37 48Z"
              fill="currentColor"
            />
            <path
              d="M27 63C19 56 18 46 24 44C30 48 30 56 27 63Z"
              fill="currentColor"
            />
            <path
              d="M28 65C37 61 45 64 45 70C39 73 32 70 28 65Z"
              fill="currentColor"
            />
          </svg>

          {/* Left-Aligned Serif Title & Supporting Description */}
          <div className="relative z-10 text-left pr-2">
            <h3 className="font-serif-display text-[23px] sm:text-[25px] font-bold leading-[1.15] text-[#2F1041] mb-2">
              {retreat.name}
            </h3>
            <p className="font-sans-body text-[13px] sm:text-[13.5px] text-[#261233] leading-[1.54] mb-4">
              {retreat.shortDescription}
            </p>
          </div>

          {/* 3 Benefit/Activity Items with Vertical Dividers + Deep Purple Gradient Pill CTA */}
          <div className="relative z-10">
            <div className="grid grid-cols-3 py-1 mb-4.5">
              {retreat.features.map((feat, fIdx) => (
                <div
                  key={feat.label}
                  className={`flex flex-col items-center justify-center px-1 text-center ${
                    fIdx < retreat.features.length - 1
                      ? 'border-r border-[#3B1554]/18'
                      : ''
                  }`}
                >
                  <div className="mb-1.5 flex items-center justify-center">
                    {renderRetreatFeatureIcon(feat.icon)}
                  </div>
                  <span className="font-sans-body text-[11px] sm:text-[11.5px] font-medium text-[#2A103C] whitespace-nowrap">
                    {feat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Contextual Pastel Gradient Pill Explore Retreat Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => onExplore(retreat)}
                className={`inline-flex items-center justify-center min-w-[168px] px-7 py-2.5 rounded-full font-sans-body text-[13px] sm:text-[13.5px] font-semibold tracking-[0.01em] cursor-pointer whitespace-nowrap text-center ${getRetreatButtonToken(retreat.id, index)}`}
              >
                <span>Explore Retreat</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
