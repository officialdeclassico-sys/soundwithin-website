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
import {BUTTON_TOKENS} from '../utils/buttonThemes';
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
      <div className="relative w-full max-w-[980px] max-h-[92vh] overflow-y-auto scrollbar-hidden rounded-3xl bg-[#FAF6FE] border border-[#D7BEEF] shadow-[0_24px_60px_rgba(32,10,48,0.5)] text-[#2A123F]">
        {/* Hero Image Header */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden">
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
            className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-gradient-to-br from-white/95 to-[#F3E8FC]/95 hover:from-white hover:to-[#EBD8FA] border border-white/80 text-[#3B1254] flex items-center justify-center shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5D237A]"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#E4CCF7] mb-1">
                Immersive Healing Retreat &bull; {retreat.badgeDuration}
              </p>
              <h2
                id="retreat-detail-title"
                className="font-serif-display text-2xl sm:text-3xl font-semibold text-white"
              >
                {retreat.name}
              </h2>
            </div>
          </div>
        </div>

        <div className="p-4.5 sm:p-6 space-y-4.5 sm:space-y-5">
          {/* Transparent Placeholder Notice Banner */}
          {retreat.isPlaceholderData && (
            <div className="p-3.5 rounded-2xl bg-[#F3E8FC] border border-[#C8A4E6] flex items-start gap-3 text-[13px] text-[#3B1554]">
              <AlertCircle className="w-4.5 h-4.5 text-[#5D237A] shrink-0 mt-0.5" />
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
            <h3 className="font-serif-display text-xl font-semibold text-[#3A1352] mb-1.5">
              Retreat Overview
            </h3>
            <p className="text-[14.5px] leading-relaxed text-[#3D2252]">
              {retreat.overview}
            </p>
          </div>

          {/* 4 Key Info Cards: Location, Schedule, Pricing, Available Seats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-3.5 rounded-2xl bg-white border border-[#E2CEF4] flex items-start gap-2.5">
              <MapPin className="w-4.5 h-4.5 text-[#6B2D8F] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6E4F87]">
                  Location
                </h4>
                <p className="text-[13.5px] text-[#2E1142] mt-0.5">
                  {retreat.locationPlaceholder}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#E2CEF4] flex items-start gap-2.5">
              <Calendar className="w-4.5 h-4.5 text-[#6B2D8F] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6E4F87]">
                  Schedule
                </h4>
                <p className="text-[13.5px] text-[#2E1142] mt-0.5">
                  {retreat.schedulePlaceholder}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#E2CEF4] flex items-start gap-2.5">
              <Wallet className="w-4.5 h-4.5 text-[#6B2D8F] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6E4F87]">
                  Pricing
                </h4>
                <p className="text-[13.5px] text-[#2E1142] mt-0.5">
                  {retreat.priceAmount
                    ? `₹${retreat.priceAmount.toLocaleString('en-IN')}`
                    : retreat.pricingPlaceholder}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#E2CEF4] flex items-start gap-2.5">
              <Users className="w-4.5 h-4.5 text-[#6B2D8F] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6E4F87]">
                  Available Seats
                </h4>
                <p className="text-[13.5px] text-[#2E1142] mt-0.5">
                  {retreat.availableSeatsPlaceholder}
                </p>
              </div>
            </div>
          </div>

          {/* Day-by-Day Itinerary Accordion */}
          <div>
            <h3 className="font-serif-display text-xl font-semibold text-[#3A1352] mb-2">
              Day-by-Day Itinerary
            </h3>
            <div className="space-y-2.5">
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
                      className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[#F7F0FC] transition-colors cursor-pointer"
                    >
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#6B2D8F] mr-2">
                          {dayItem.day}:
                        </span>
                        <span className="font-serif-display text-base sm:text-lg font-semibold text-[#2E1142]">
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
                      <div className="px-4 pb-3 pt-1 border-t border-[#F0E3FA]">
                        <ul className="space-y-1.5 text-[13.5px] text-[#432359]">
                          {dayItem.activities.map((act, i) => (
                            <li key={i} className="flex items-start gap-2">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#F3EAFB]/80 border border-[#DFC9F2]">
              <h3 className="font-serif-display text-lg font-semibold text-[#3A1352] mb-1.5 flex items-center gap-2">
                <Home className="w-4 h-4 text-[#6B2D8F]" />
                <span>Accommodation Information</span>
              </h3>
              <p className="text-[13.5px] leading-relaxed text-[#3D2252]">
                {retreat.accommodationInfo}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F3EAFB]/80 border border-[#DFC9F2]">
              <h3 className="font-serif-display text-lg font-semibold text-[#3A1352] mb-1.5">
                Core Retreat Activities
              </h3>
              <ul className="space-y-1.5 text-[13.5px] text-[#3D2252]">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-[#E2CEF4]">
              <h3 className="font-serif-display text-lg font-semibold text-[#3A1352] mb-2">
                Meals &amp; Inclusions
              </h3>
              <ul className="space-y-1.5 text-[13.5px] text-[#3D2252]">
                {retreat.mealsAndInclusions.map((inc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#4B1664] shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E2CEF4]">
              <h3 className="font-serif-display text-lg font-semibold text-[#3A1352] mb-2">
                Exclusions
              </h3>
              <ul className="space-y-1.5 text-[13.5px] text-[#5B3E72]">
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
          <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className={`w-full sm:w-auto px-5 py-2 rounded-full text-[13.5px] font-medium cursor-pointer text-center whitespace-nowrap ${BUTTON_TOKENS.secondary}`}
            >
              Close
            </button>

            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => onEnquireRetreat(retreat.name)}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-full text-[13.5px] font-medium cursor-pointer text-center whitespace-nowrap ${BUTTON_TOKENS.peachLavender}`}
              >
                Enquire About Retreat
              </button>
              <button
                type="button"
                onClick={onBookRetreatSession}
                className={`w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 rounded-full text-[13.5px] font-medium cursor-pointer text-center whitespace-nowrap ${BUTTON_TOKENS.general}`}
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
