import React, {useEffect} from 'react';
import {
  CheckCircle2,
  Clock,
  Compass,
  Sparkles,
  X,
} from 'lucide-react';
import {ExperienceBadgeIcon, SproutLeafIcon} from './BrandIcons';
import type {Experience} from '../types';

interface ExperienceDetailModalProps {
  experience: Experience | null;
  onClose: () => void;
  onBookExperience: (experienceId: string, preferredFormat?: string) => void;
}

export function ExperienceDetailModal({
  experience,
  onClose,
  onBookExperience,
}: ExperienceDetailModalProps) {
  useEffect(() => {
    if (!experience) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [experience, onClose]);

  if (!experience) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#1B0828]/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto scrollbar-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exp-detail-title"
    >
      <div className="relative w-full max-w-[960px] max-h-[90vh] overflow-y-auto scrollbar-hidden rounded-3xl bg-[#FAF6FE] border border-[#D7BEEF] shadow-[0_24px_60px_rgba(32,10,48,0.45)] text-[#2A123F]">
        {/* Top Hero Image Header */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden">
          <img
            src={experience.image}
            alt={experience.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#240B36]/85 via-[#240B36]/30 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close experience details"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#3B1254] flex items-center justify-center shadow-lg cursor-pointer transition-transform hover:scale-105"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-[#E5CFF8] text-xs uppercase tracking-[0.2em] mb-1.5">
                <ExperienceBadgeIcon
                  type={experience.iconType}
                  className="w-4 h-4 text-[#E5CFF8]"
                />
                <span>SoundWithin Healing Experience</span>
              </div>
              <h2
                id="exp-detail-title"
                className="font-serif-display text-2xl sm:text-4xl font-semibold text-white"
              >
                {experience.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-7">
          {/* Metadata Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#E3CFF5] text-[14px] text-[#431D60]">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#6B2D8F]" />
                <span className="font-medium">Duration:</span>
                <span>{experience.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <SproutLeafIcon className="w-4 h-4 text-[#6B2D8F]" />
                <span className="font-medium">Available Formats:</span>
                <span>{experience.availableFormats.join(' / ')}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-[#6E4F87] block">
                {experience.priceNote}
              </span>
              <span className="font-serif-display text-2xl font-bold text-[#4B1664] tabular-nums">
                {experience.currency === 'INR' ? '₹' : experience.currency}{' '}
                {experience.price.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Full Description */}
          <div>
            <h3 className="font-serif-display text-xl font-semibold text-[#3A1352] mb-2">
              Overview
            </h3>
            <p className="text-[15px] leading-relaxed text-[#3D2252]">
              {experience.fullDescription}
            </p>
          </div>

          {/* Two Column Grid: Objectives & What to Expect */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-[#F3EAFB]/80 border border-[#DFC9F2]">
              <h3 className="font-serif-display text-xl font-semibold text-[#3A1352] mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#6B2D8F]" />
                <span>Session Objectives</span>
              </h3>
              <ul className="space-y-2.5 text-[14px] text-[#3D2252]">
                {experience.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#5D237A] shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-[#F3EAFB]/80 border border-[#DFC9F2]">
              <h3 className="font-serif-display text-xl font-semibold text-[#3A1352] mb-3 flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#6B2D8F]" />
                <span>What to Expect</span>
              </h3>
              <ul className="space-y-2.5 text-[14px] text-[#3D2252]">
                {experience.whatToExpect.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#4B1664] text-white text-xs flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Preparation Instructions */}
          <div className="p-5 rounded-2xl bg-white border border-[#E2CEF4]">
            <h3 className="font-serif-display text-xl font-semibold text-[#3A1352] mb-2.5">
              Preparation Instructions
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[13.5px] text-[#4A2C60]">
              {experience.preparationInstructions.map((prep, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#6B2D8F] font-bold">&bull;</span>
                  <span>{prep}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-[#6B308B] text-[#3B1254] text-[14px] font-medium hover:bg-[#F1E4FA] transition-colors cursor-pointer text-center"
            >
              Close Details
            </button>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
              {experience.availableFormats.map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => onBookExperience(experience.id, fmt)}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#4B1664] hover:bg-[#3A0E50] text-white text-[14px] font-medium shadow-[0_6px_18px_rgba(75,22,100,0.35)] transition-all cursor-pointer text-center"
                >
                  <span>Book {fmt} Session</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
