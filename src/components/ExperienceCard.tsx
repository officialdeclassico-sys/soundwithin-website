import React from 'react';
import {Calendar, Clock, MapPin} from 'lucide-react';
import {getExperienceButtonToken} from '../utils/buttonThemes';
import type {Experience} from '../types';

export interface ExperienceCardProps {
  experience: Experience;
  index: number;
  onLearnMore: (exp: Experience) => void;
  ctaLabel?: string;
}

interface ExperiencePastelTheme {
  stopTop: string;
  stopMid: string;
  stopBottom: string;
  borderHex: string;
  sprigHex: string;
}

const EXPERIENCE_PASTEL_THEMES_BY_ID: Record<string, ExperiencePastelTheme> = {
  // 1. Sound Healing Session — Pastel Rose Pink
  'exp-sound-healing': {
    stopTop: '#FDECF4',
    stopMid: '#FAD9E9',
    stopBottom: '#F7C6DF',
    borderHex: '#F3BBD7',
    sprigHex: '#D17BA5',
  },
  // 2. Guided Meditation — Pastel Warm Peach / Champagne
  'exp-guided-meditation': {
    stopTop: '#FEF4E8',
    stopMid: '#FCE4CA',
    stopBottom: '#F9D5B1',
    borderHex: '#F3C89E',
    sprigHex: '#DF9E58',
  },
  // 3. Sound Bath Journey — Pastel Lavender Lilac
  'exp-sound-bath': {
    stopTop: '#F4EEFD',
    stopMid: '#E6D7FB',
    stopBottom: '#D9C3F8',
    borderHex: '#CEB4F3',
    sprigHex: '#9573D4',
  },
  // 4. Chakra Sound Alignment — Pastel Orchid Violet
  'exp-chakra-alignment': {
    stopTop: '#F5ECFD',
    stopMid: '#E8D5FB',
    stopBottom: '#DCBDF8',
    borderHex: '#D1ADF3',
    sprigHex: '#AF75DC',
  },
  // 5. Nature Sound Retreat — Pastel Mint Sage
  'exp-nature-retreat': {
    stopTop: '#ECFAF4',
    stopMid: '#D6F5E8',
    stopBottom: '#C0EFDC',
    borderHex: '#AEE6CF',
    sprigHex: '#5AB696',
  },
  // 6. Self-Awareness Journey — Pastel Warm Apricot Blush
  'exp-self-awareness': {
    stopTop: '#FEF1E8',
    stopMid: '#FBE0CE',
    stopBottom: '#F7CFB7',
    borderHex: '#F0BFA3',
    sprigHex: '#DF8B62',
  },
};

const FALLBACK_EXPERIENCE_THEMES: ExperiencePastelTheme[] = [
  EXPERIENCE_PASTEL_THEMES_BY_ID['exp-sound-healing'],
  EXPERIENCE_PASTEL_THEMES_BY_ID['exp-guided-meditation'],
  EXPERIENCE_PASTEL_THEMES_BY_ID['exp-sound-bath'],
  EXPERIENCE_PASTEL_THEMES_BY_ID['exp-chakra-alignment'],
  EXPERIENCE_PASTEL_THEMES_BY_ID['exp-nature-retreat'],
  EXPERIENCE_PASTEL_THEMES_BY_ID['exp-self-awareness'],
];

export function ExperienceCard({
  experience,
  index,
  onLearnMore,
  ctaLabel = 'Learn More',
}: ExperienceCardProps) {
  const theme =
    EXPERIENCE_PASTEL_THEMES_BY_ID[experience.id] ||
    FALLBACK_EXPERIENCE_THEMES[index % FALLBACK_EXPERIENCE_THEMES.length];

  const useCalendarIcon =
    Boolean(experience.isDurationCalendarBased) ||
    experience.id === 'exp-nature-retreat' ||
    experience.id === 'exp-self-awareness';

  return (
    <article
      style={{borderColor: theme.borderHex}}
      className="group relative rounded-[24px] bg-white/95 p-[5px] sm:p-1.5 border shadow-[0_8px_24px_rgba(62,20,88,0.08)] hover:shadow-[0_14px_34px_rgba(62,20,88,0.14)] transition-all duration-200 flex flex-col"
    >
      <div className="relative rounded-[19px] overflow-hidden flex-1 flex flex-col">
        {/* Top Experience Image — Full-bleed with smooth wavy lower transition */}
        <div className="relative h-44 sm:h-48 lg:h-50 w-full overflow-hidden shrink-0">
          <img
            src={experience.image}
            alt={experience.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Pastel Wavy Lower Card Body */}
        <div
          style={{
            background: `linear-gradient(180deg, ${theme.stopTop} 0%, ${theme.stopMid} 52%, ${theme.stopBottom} 100%)`,
          }}
          className="relative -mt-7 pt-4.5 pb-4.5 px-4.5 sm:pt-5 sm:pb-5 sm:px-5 flex-1 flex flex-col justify-between"
        >
          {/* Smooth S-Curve Wave Top Edge overlapping bottom of image */}
          <svg
            viewBox="0 0 400 34"
            fill="none"
            preserveAspectRatio="none"
            className="absolute -top-[33px] inset-x-0 w-full h-[34px] pointer-events-none select-none"
            aria-hidden="true"
          >
            <path
              d="M0 18 C65 2, 130 4, 198 20 C266 36, 332 2, 400 16 L400 34 L0 34 Z"
              fill={theme.stopTop}
            />
            <path
              d="M0 18 C65 2, 130 4, 198 20 C266 36, 332 2, 400 16"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeOpacity="0.85"
              fill="none"
            />
          </svg>

          {/* Subtle 4-Point White Sparkle Accent on Right Crest */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="absolute top-1 right-5 w-3.5 h-3.5 text-white/90 pointer-events-none select-none"
            aria-hidden="true"
          >
            <path
              d="M12 1C12.7 7.2 16.8 11.3 23 12C16.8 12.7 12.7 16.8 12 23C11.3 16.8 7.2 12.7 1 12C7.2 11.3 11.3 7.2 12 1Z"
              fill="currentColor"
            />
          </svg>

          {/* Subtle Botanical Leaf Sprig Accent in Bottom-Right Corner */}
          <svg
            viewBox="0 0 64 90"
            fill="none"
            style={{color: theme.sprigHex}}
            className="absolute bottom-0 right-1.5 w-12 h-17 opacity-55 pointer-events-none select-none"
            aria-hidden="true"
          >
            <path
              d="M18 88C24 66 36 42 52 16"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M52 16C48 7 54 2 59 5C61 11 57 16 52 16Z"
              fill="currentColor"
            />
            <path
              d="M44 30C36 23 36 14 42 12C47 16 48 24 44 30Z"
              fill="currentColor"
            />
            <path
              d="M45 32C53 28 60 31 60 37C55 40 48 37 45 32Z"
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

          {/* Title & Description */}
          <div className="relative z-10 text-left pr-2">
            <h3 className="font-serif-display text-[23px] sm:text-[25px] font-bold leading-[1.14] text-[#2F1041] mb-1.5">
              {experience.name}
            </h3>
            <p className="font-sans-body text-[13px] sm:text-[13.5px] text-[#261233] leading-[1.5] mb-3">
              {experience.shortDescription}
            </p>
          </div>

          {/* Metadata & Contextual Pastel Gradient CTA Button */}
          <div className="relative z-10">
            {/* Duration & Online/In-Person Row */}
            <div className="flex items-center justify-start gap-2.5 text-[12.5px] sm:text-[13px] font-medium text-[#2A103C] mb-3.5">
              <span className="inline-flex items-center gap-1.5">
                {useCalendarIcon ? (
                  <Calendar className="w-3.5 h-3.5 text-[#3B1554] shrink-0" />
                ) : (
                  <Clock className="w-3.5 h-3.5 text-[#3B1554] shrink-0" />
                )}
                <span>{experience.duration}</span>
              </span>
              <span className="text-[#3B1554]/45">|</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#3B1554] shrink-0" />
                <span>{experience.formatLabel}</span>
              </span>
            </div>

            {/* Contextual Pastel Gradient Pill CTA Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => onLearnMore(experience)}
                className={`inline-flex items-center justify-center min-w-[152px] px-7 py-2 rounded-full font-sans-body text-[13.5px] font-semibold tracking-[0.01em] cursor-pointer text-center whitespace-nowrap ${getExperienceButtonToken(experience.id, index)}`}
              >
                <span>{ctaLabel}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
