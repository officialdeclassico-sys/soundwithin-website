import React, {useState, useEffect} from 'react';
import {
  AlertCircle,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  Home,
  MapPin,
  Users,
  Wallet,
  X,
} from 'lucide-react';
import type {Retreat} from '../types';

interface RetreatDetailModalProps {
  retreat: Retreat | null;
  onClose: () => void;
  onBookRetreatSession: () => void;
  onEnquireRetreat: (retreatName: string) => void;
}

export function RetreatDetailModal({
  retreat,
  onClose,
  onBookRetreatSession,
  onEnquireRetreat,
}: RetreatDetailModalProps) {
  const [openDayIndex, setOpenDayIndex] = useState<number>(0);

  useEffect(() => {
    if (!retreat) return;
    setOpenDayIndex(0);
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
  }, [retreat, onClose]);

  if (!retreat) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#1B0828]/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto scrollbar-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="retreat-detail-title"
    >
      <div className="relative w-full max-w-[1040px] max-h-[92vh] overflow-y-auto scrollbar-hidden rounded-3xl bg-[#FAF6FE] border border-[#D7BEEF] shadow-[0_24px_60px_rgba(32,10,48,0.5)] text-[#2A123F]">
        {/* Hero Image Header */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden">
          <img
            src={retreat.image}
            alt={retreat.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#240B36]/90 via-[#240B36]/35 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close retreat details"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#3B1254] flex items-center justify-center shadow-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-5 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#E4CCF7] mb-1">
                Immersive Healing Retreat &bull; {retreat.badgeDuration}
              </p>
              <h2
                id="retreat-detail-title"
                className="font-serif-display text-3xl sm:text-4xl font-semibold text-white"
              >
                {retreat.name}
              </h2>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-7">
          {/* Transparent Placeholder Notice Banner */}
          {retreat.isPlaceholderData && (
            <div className="p-4 rounded-2xl bg-[#F3E8FC] border border-[#C8A4E6] flex items-start gap-3 text-[13.5px] text-[#3B1554]">
              <AlertCircle className="w-5 h-5 text-[#5D237A] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">
                  Editable Retreat Configuration Notice
                </p>
                <p className="text-[#4F2D69] mt-0.5">
                  Retreat dates, venue locations, pricing, accommodation specifics,
                  and seat availability shown below are clearly labelled editable
                  placeholders until genuine batch details are configured in the
                  Admin Management portal.
                </p>
              </div>
            </div>
          )}

          {/* Overview */}
          <div>
            <h3 className="font-serif-display text-2xl font-semibold text-[#3A1352] mb-2">
              Retreat Overview
            </h3>
            <p className="text-[15px] leading-relaxed text-[#3D2252]">
              {retreat.overview}
            </p>
          </div>

          {/* 4 Key Info Cards: Location, Schedule, Pricing, Available Seats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-[#E2CEF4] flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#6B2D8F] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6E4F87]">
                  Location
                </h4>
                <p className="text-[14px] text-[#2E1142] mt-1">
                  {retreat.locationPlaceholder}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E2CEF4] flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#6B2D8F] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6E4F87]">
                  Schedule
                </h4>
                <p className="text-[14px] text-[#2E1142] mt-1">
                  {retreat.schedulePlaceholder}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E2CEF4] flex items-start gap-3">
              <Wallet className="w-5 h-5 text-[#6B2D8F] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6E4F87]">
                  Pricing
                </h4>
                <p className="text-[14px] text-[#2E1142] mt-1">
                  {retreat.priceAmount
                    ? `₹${retreat.priceAmount.toLocaleString('en-IN')}`
                    : retreat.pricingPlaceholder}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E2CEF4] flex items-start gap-3">
              <Users className="w-5 h-5 text-[#6B2D8F] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6E4F87]">
                  Available Seats
                </h4>
                <p className="text-[14px] text-[#2E1142] mt-1">
                  {retreat.availableSeatsPlaceholder}
                </p>
              </div>
            </div>
          </div>

          {/* Day-by-Day Itinerary Accordion */}
          <div>
            <h3 className="font-serif-display text-2xl font-semibold text-[#3A1352] mb-3">
              Day-by-Day Itinerary
            </h3>
            <div className="space-y-3">
              {retreat.itinerary.map((dayItem, index) => {
                const isOpen = openDayIndex === index;
                return (
                  <div
                    key={dayItem.day}
                    className="rounded-2xl bg-white border border-[#DFC9F2] overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenDayIndex(isOpen ? -1 : index)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#F7F0FC] transition-colors cursor-pointer"
                    >
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#6B2D8F] mr-2">
                          {dayItem.day}:
                        </span>
                        <span className="font-serif-display text-lg font-semibold text-[#2E1142]">
                          {dayItem.title}
                        </span>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-[#6B2D8F]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#6B2D8F]" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 pt-1 border-t border-[#F0E3FA]">
                        <ul className="space-y-2 text-[14px] text-[#432359]">
                          {dayItem.activities.map((act, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <span className="text-[#6B2D8F] font-bold">&bull;</span>
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Accommodation & Activities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-[#F3EAFB]/80 border border-[#DFC9F2]">
              <h3 className="font-serif-display text-xl font-semibold text-[#3A1352] mb-2 flex items-center gap-2">
                <Home className="w-4 h-4 text-[#6B2D8F]" />
                <span>Accommodation Information</span>
              </h3>
              <p className="text-[14px] leading-relaxed text-[#3D2252]">
                {retreat.accommodationInfo}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F3EAFB]/80 border border-[#DFC9F2]">
              <h3 className="font-serif-display text-xl font-semibold text-[#3A1352] mb-2">
                Core Retreat Activities
              </h3>
              <ul className="space-y-2 text-[14px] text-[#3D2252]">
                {retreat.activities.map((act, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#5D237A] shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Meals & Inclusions vs Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-white border border-[#E2CEF4]">
              <h3 className="font-serif-display text-xl font-semibold text-[#3A1352] mb-2.5">
                Meals &amp; Inclusions
              </h3>
              <ul className="space-y-2 text-[13.5px] text-[#3D2252]">
                {retreat.mealsAndInclusions.map((inc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#4B1664] shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E2CEF4]">
              <h3 className="font-serif-display text-xl font-semibold text-[#3A1352] mb-2.5">
                Exclusions
              </h3>
              <ul className="space-y-2 text-[13.5px] text-[#5B3E72]">
                {retreat.exclusions.map((exc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#85629E]">&ndash;</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-[#6B308B] text-[#3B1254] text-[14px] font-medium hover:bg-[#F1E4FA] transition-colors cursor-pointer text-center"
            >
              Close
            </button>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => onEnquireRetreat(retreat.name)}
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#4B1664] bg-white text-[#4B1664] hover:bg-[#F3E8FC] text-[14px] font-medium transition-colors cursor-pointer text-center"
              >
                Enquire About Retreat
              </button>
              <button
                type="button"
                onClick={onBookRetreatSession}
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#4B1664] hover:bg-[#3A0E50] text-white text-[14px] font-medium shadow-[0_6px_18px_rgba(75,22,100,0.35)] transition-all cursor-pointer text-center"
              >
                <span>Reserve Retreat Experience</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
