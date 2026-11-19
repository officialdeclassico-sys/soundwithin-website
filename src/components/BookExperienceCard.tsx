import React from 'react';
import {Calendar, Clock, Layers, MapPin, Video} from 'lucide-react';
import {ExperienceBadgeIcon} from './BrandIcons';
import {BUTTON_TOKENS} from '../utils/buttonThemes';
import type {Experience} from '../types';

interface BookExperienceCardProps {
  experience: Experience;
  selectedFormat: string;
  isSelectedExperience: boolean;
  onFormatChange: (experienceId: string, format: string) => void;
  onBookExperience: (experience: Experience, chosenFormat: string) => void;
}

function BotanicalSprigDecoration({className = ''}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 64 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Main curved stem */}
      <path
        d="M52 88C44 68 38 46 42 14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Top terminal leaf */}
      <path
        d="M42 14C37 8 39 2 44 2C48 2 49 8 42 14Z"
        fill="currentColor"
      />
      {/* Left upper leaf */}
      <path
        d="M40 30C29 26 24 18 27 13C32 14 38 21 40 30Z"
        fill="currentColor"
      />
      {/* Right upper leaf */}
      <path
        d="M41 36C49 29 56 24 60 27C59 33 50 37 41 36Z"
        fill="currentColor"
      />
      {/* Left middle leaf */}
      <path
        d="M41 50C28 46 20 37 23 31C29 32 37 40 41 50Z"
        fill="currentColor"
      />
      {/* Right middle leaf */}
      <path
        d="M43 56C52 49 60 45 62 49C60 55 51 58 43 56Z"
        fill="currentColor"
      />
      {/* Left lower leaf */}
      <path
        d="M46 70C33 67 24 59 27 53C33 53 41 61 46 70Z"
        fill="currentColor"
      />
    </svg>
  );
}

function getSessionTypeDetails(exp: Experience): {
  primary: string;
  secondary: string;
  useCalendarIcon: boolean;
} {
  if (exp.id === 'exp-nature-retreat' || exp.duration.toLowerCase().includes('full')) {
    return {
      primary: 'Full Day',
      secondary: '(Retreat Format)',
      useCalendarIcon: true,
    };
  }
  if (exp.id === 'exp-self-awareness' || exp.duration.toLowerCase().includes('multi')) {
    return {
      primary: 'Multi-Session',
      secondary: 'Session Type',
      useCalendarIcon: false,
    };
  }
  return {
    primary: 'Single Session',
    secondary: 'Session Type',
    useCalendarIcon: false,
  };
}

export function BookExperienceCard({
  experience,
  selectedFormat,
  isSelectedExperience,
  onFormatChange,
  onBookExperience,
}: BookExperienceCardProps) {
  const supportsInPerson = experience.availableFormats.includes('In-Person');
  const supportsOnline = experience.availableFormats.includes('Online');

  const activeFormat = experience.availableFormats.includes(selectedFormat)
    ? selectedFormat
    : experience.availableFormats[0] || 'In-Person';

  const sessionType = getSessionTypeDetails(experience);

  return (
    <article
      className={`group relative rounded-[28px] bg-gradient-to-b from-[#FAF6FE] via-[#F7F0FC] to-[#EFE3FA] overflow-hidden flex flex-col justify-between transition-all duration-250 ${
        isSelectedExperience
          ? 'border-2 border-[#5D237A] shadow-[0_14px_36px_rgba(75,22,100,0.2)] ring-2 ring-[#D7B4F8]/60'
          : 'border border-[#DEC9F2] hover:border-[#B589DC] shadow-[0_10px_28px_rgba(75,22,100,0.09)] hover:shadow-[0_14px_34px_rgba(75,22,100,0.15)]'
      }`}
    >
      {/* Top Image Section (~38% of card) with Curved Wave Divider & Upper-Right Circular Purple Badge */}
      <div>
        <div className="relative h-42 sm:h-46 w-full overflow-hidden">
          <img
            src={experience.image}
            alt={experience.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Circular Purple Experience Icon Badge in Upper-Right Corner */}
          <div
            className="absolute top-3 right-3 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-b from-[#69278E] to-[#451060] border-[1.5px] border-white/85 shadow-[0_4px_14px_rgba(32,8,48,0.45)] flex items-center justify-center text-white"
            aria-hidden="true"
          >
            <ExperienceBadgeIcon
              type={experience.iconType}
              className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white"
            />
          </div>

          {/* Smooth Layered S-Curve Wave Transition Between Image and Content */}
          <div
            className="absolute -bottom-[1px] inset-x-0 h-10 sm:h-11 pointer-events-none select-none z-10"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 400 48"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              {/* Soft lavender upper wave rim */}
              <path
                d="M0 24C48 4 128 2 198 20C268 38 338 40 400 14V48H0V24Z"
                fill="#D4B2F0"
                fillOpacity="0.65"
              />
              {/* Secondary soft lilac wave rim */}
              <path
                d="M0 28C52 8 130 6 200 24C270 41 340 42 400 19V48H0V28Z"
                fill="#EBD9FA"
                fillOpacity="0.9"
              />
              {/* Main card content background wave fill */}
              <path
                d="M0 32C56 12 132 10 202 27C272 44 342 44 400 24V48H0V32Z"
                fill="#FAF6FE"
              />
            </svg>
          </div>
        </div>

        {/* Content Section: Heading, Description & Right Botanical Sprig */}
        <div className="relative px-4 sm:px-5 pt-0.5">
          <BotanicalSprigDecoration className="absolute right-1.5 -top-2 w-11 h-18 sm:w-12 sm:h-20 text-[#C5A0E6]/65 pointer-events-none select-none" />

          <h3 className="font-serif-display text-[21px] sm:text-[24px] font-bold text-[#2D0E41] leading-[1.16] tracking-[0.01em] mb-1 pr-7">
            {experience.name}
          </h3>

          <p className="font-sans-body text-[12.5px] sm:text-[13px] text-[#3B1E54] leading-[1.45] pr-6 min-h-[36px]">
            {experience.shortDescription}
          </p>
        </div>
      </div>

      {/* Bottom Interactive Section: Session Info Row, Format Toggle & Primary CTA */}
      <div className="px-4 sm:px-5 pt-2.5 pb-4 sm:pb-4.5 flex flex-col justify-end">
        {/* Horizontal Session Information Row */}
        <div className="grid grid-cols-3 items-center py-2 mb-3 border-y border-[#E3CFF5]/90">
          {/* 1. Duration */}
          <div className="flex items-center gap-1.5 sm:gap-2 pr-1.5">
            <Clock className="w-4 h-4 sm:w-[17px] sm:h-[17px] text-[#3A1352] shrink-0" />
            <div className="min-w-0">
              <span className="block font-sans-body text-[11.5px] sm:text-[12.5px] font-bold text-[#260B38] leading-tight truncate">
                {experience.duration}
              </span>
              <span className="block font-sans-body text-[10px] sm:text-[11px] text-[#5B3B73] leading-tight mt-0.5 truncate">
                Duration
              </span>
            </div>
          </div>

          {/* 2. Session Type */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-2 border-x border-[#DEC8F2]">
            {sessionType.useCalendarIcon ? (
              <Calendar className="w-4 h-4 sm:w-[17px] sm:h-[17px] text-[#3A1352] shrink-0" />
            ) : (
              <Layers className="w-4 h-4 sm:w-[17px] sm:h-[17px] text-[#3A1352] shrink-0" />
            )}
            <div className="min-w-0">
              <span className="block font-sans-body text-[11.5px] sm:text-[12.5px] font-bold text-[#260B38] leading-tight truncate">
                {sessionType.primary}
              </span>
              <span className="block font-sans-body text-[10px] sm:text-[11px] text-[#5B3B73] leading-tight mt-0.5 truncate">
                {sessionType.secondary}
              </span>
            </div>
          </div>

          {/* 3. Availability */}
          <div className="flex items-center gap-1.5 sm:gap-2 pl-2">
            <Video className="w-4 h-4 sm:w-[17px] sm:h-[17px] text-[#3A1352] shrink-0" />
            <div className="min-w-0">
              <span className="block font-sans-body text-[11.5px] sm:text-[12.5px] font-bold text-[#260B38] leading-tight truncate">
                {experience.formatLabel}
              </span>
              <span className="block font-sans-body text-[10px] sm:text-[11px] text-[#5B3B73] leading-tight mt-0.5 truncate">
                Available
              </span>
            </div>
          </div>
        </div>

        {/* In-Person / Online Segmented Toggle */}
        <div
          role="group"
          aria-label={`Session format for ${experience.name}`}
          className="w-full max-w-[300px] mx-auto mb-3 rounded-full border border-[#6C348D]/85 bg-[#FAF6FE] p-0.5 grid grid-cols-2 items-center shadow-2xs"
        >
          {/* In-Person Option (Left) */}
          <button
            type="button"
            disabled={!supportsInPerson}
            aria-pressed={activeFormat === 'In-Person'}
            onClick={() => onFormatChange(experience.id, 'In-Person')}
            className={`inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full font-sans-body text-[12px] sm:text-[12.5px] font-semibold transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5D237A]/60 ${
              activeFormat === 'In-Person'
                ? 'bg-gradient-to-r from-[#7D48B0] via-[#632D94] to-[#4E1B7B] text-white shadow-[0_2px_10px_rgba(84,34,132,0.3)] cursor-pointer'
                : 'bg-transparent text-[#321048] hover:bg-gradient-to-r hover:from-[#F3E9FC] hover:to-[#FCECF4] cursor-pointer'
            }`}
          >
            <MapPin
              className={`w-3.5 h-3.5 shrink-0 ${
                activeFormat === 'In-Person' ? 'text-white' : 'text-[#4B1664]'
              }`}
            />
            <span>In-Person</span>
          </button>

          {/* Online Option (Right) — Only selectable when supported by the experience */}
          {supportsOnline ? (
            <button
              type="button"
              aria-pressed={activeFormat === 'Online'}
              onClick={() => onFormatChange(experience.id, 'Online')}
              className={`inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full font-sans-body text-[12px] sm:text-[12.5px] font-semibold transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5D237A]/60 ${
                activeFormat === 'Online'
                  ? 'bg-gradient-to-r from-[#7D48B0] via-[#632D94] to-[#4E1B7B] text-white shadow-[0_2px_10px_rgba(84,34,132,0.3)] cursor-pointer'
                  : 'bg-transparent text-[#321048] hover:bg-gradient-to-r hover:from-[#F3E9FC] hover:to-[#FCECF4] cursor-pointer'
              }`}
            >
              <Video
                className={`w-3.5 h-3.5 shrink-0 ${
                  activeFormat === 'Online' ? 'text-white' : 'text-[#4B1664]'
                }`}
              />
              <span>Online</span>
            </button>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-full font-sans-body text-[11px] sm:text-[11.5px] font-medium text-[#7D5E96] select-none whitespace-nowrap"
            >
              <span>Sanctuary Only</span>
            </span>
          )}
        </div>

        {/* Primary CTA: Book This Experience (Soft Violet to Lavender Gradient) */}
        <button
          type="button"
          onClick={() => onBookExperience(experience, activeFormat)}
          className={`w-full py-2.5 px-5 rounded-full font-sans-body text-[14px] sm:text-[14.5px] font-semibold tracking-[0.01em] flex items-center justify-center text-center cursor-pointer whitespace-nowrap ${BUTTON_TOKENS.softViolet}`}
        >
          <span>Book This Experience</span>
        </button>
      </div>
    </article>
  );
}
