import React, {useEffect, useRef} from 'react';
import {
  AlertCircle,
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Layers,
  Mail,
  Phone,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import {ThemedSelect, type ThemedSelectOption} from './ThemedSelect';
import {IS_STATIC_PRESENTATION} from '../data/staticContent';
import {BUTTON_TOKENS} from '../utils/buttonThemes';
import type {
  AvailabilityConfig,
  Experience,
  PageRoute,
  WebsiteSettings,
} from '../types';

export interface CalendarCell {
  ymd: string;
  dayNumber: number;
  dateObj: Date;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  experience: Experience | undefined;
  selectedFormat: string;
  onFormatChange: (format: string) => void;
  selectedDate: string;
  onSelectDate: (ymd: string) => void;
  calendarOpen: boolean;
  onToggleCalendar: () => void;
  calendarMonth: Date;
  onChangeCalendarMonth: (nextMonth: Date) => void;
  calendarDays: Array<CalendarCell | null>;
  isDateDisabled: (ymd: string, dateObj: Date) => boolean;
  allSlotsForDate: string[];
  bookedSlotsForSelectedDate: string[];
  selectedTimeSlot: string;
  onSelectTimeSlot: (slot: string) => void;
  customerName: string;
  onCustomerNameChange: (val: string) => void;
  phoneCountryCode: string;
  onPhoneCountryCodeChange: (val: string) => void;
  customerPhone: string;
  onCustomerPhoneChange: (val: string) => void;
  customerEmail: string;
  onCustomerEmailChange: (val: string) => void;
  specialRequests: string;
  onSpecialRequestsChange: (val: string) => void;
  paymentMethod: 'pay_at_session' | 'razorpay';
  onPaymentMethodChange: (val: 'pay_at_session' | 'razorpay') => void;
  fieldErrors: Record<string, string>;
  submitting: boolean;
  submitError: string | null;
  staticBookingNotice: boolean;
  availability: AvailabilityConfig;
  settings: WebsiteSettings;
  onNavigate: (page: PageRoute) => void;
  onSubmit: (e: React.FormEvent) => void;
  formatReadableDate: (ymd: string) => string;
  calculateEndTime: (startSlot: string, durationMinutes: number) => string;
}

const COUNTRY_CODE_OPTIONS: ThemedSelectOption[] = [
  {value: '+91', label: '🇮🇳 +91', displayText: '🇮🇳 +91'},
  {value: '+1', label: '🇺🇸 +1', displayText: '🇺🇸 +1'},
  {value: '+44', label: '🇬🇧 +44', displayText: '🇬🇧 +44'},
  {value: '+65', label: '🇸🇬 +65', displayText: '🇸🇬 +65'},
];

export function BookingModal({
  isOpen,
  onClose,
  experience,
  selectedFormat,
  onFormatChange,
  selectedDate,
  onSelectDate,
  calendarOpen,
  onToggleCalendar,
  calendarMonth,
  onChangeCalendarMonth,
  calendarDays,
  isDateDisabled,
  allSlotsForDate,
  bookedSlotsForSelectedDate,
  selectedTimeSlot,
  onSelectTimeSlot,
  customerName,
  onCustomerNameChange,
  phoneCountryCode,
  onPhoneCountryCodeChange,
  customerPhone,
  onCustomerPhoneChange,
  customerEmail,
  onCustomerEmailChange,
  specialRequests,
  onSpecialRequestsChange,
  paymentMethod,
  onPaymentMethodChange,
  fieldErrors,
  submitting,
  submitError,
  staticBookingNotice,
  availability,
  settings,
  onNavigate,
  onSubmit,
  formatReadableDate,
  calculateEndTime,
}: BookingModalProps) {
  const scrollBodyRef = useRef<HTMLDivElement>(null);
  const calendarPanelRef = useRef<HTMLDivElement>(null);
  const backdropMouseDownTargetRef = useRef<EventTarget | null>(null);

  // Lock background page scroll reliably on desktop, Android & iOS Safari while modal is open
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    const prevBodyPosition = document.body.style.position;
    const prevBodyTop = document.body.style.top;
    const prevBodyLeft = document.body.style.left;
    const prevBodyRight = document.body.style.right;
    const prevBodyWidth = document.body.style.width;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      document.body.style.position = prevBodyPosition;
      document.body.style.top = prevBodyTop;
      document.body.style.left = prevBodyLeft;
      document.body.style.right = prevBodyRight;
      document.body.style.width = prevBodyWidth;
      window.scrollTo({
        top: scrollY,
        behavior: 'instant' as ScrollBehavior,
      });
    };
  }, [isOpen, onClose]);

  // Reset modal scroll to top cleanly whenever opened for an experience
  useEffect(() => {
    if (isOpen && scrollBodyRef.current) {
      scrollBodyRef.current.scrollTop = 0;
    }
  }, [isOpen, experience?.id]);

  // Keep open calendar dropdown cleanly visible within modal scroll bounds
  useEffect(() => {
    if (calendarOpen && calendarPanelRef.current) {
      requestAnimationFrame(() => {
        calendarPanelRef.current?.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      });
    }
  }, [calendarOpen]);

  if (!isOpen || !experience) return null;

  const formatOptions: ThemedSelectOption[] = [
    {
      value: 'In-Person',
      label: 'In-Person',
      disabled: !experience.availableFormats.includes('In-Person'),
      note: !experience.availableFormats.includes('In-Person')
        ? 'Unavailable'
        : undefined,
    },
    {
      value: 'Online',
      label: 'Online',
      disabled: !experience.availableFormats.includes('Online'),
      note: !experience.availableFormats.includes('Online')
        ? 'Sanctuary Only'
        : undefined,
    },
  ];

  // Keep active input visible above mobile keyboard without page zoom or layout shift
  const handleFieldFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.currentTarget;
    window.setTimeout(() => {
      target.scrollIntoView({block: 'nearest', behavior: 'smooth'});
    }, 220);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onMouseDown={(e) => {
        backdropMouseDownTargetRef.current = e.target;
      }}
      onClick={(e) => {
        if (
          e.target === e.currentTarget &&
          backdropMouseDownTargetRef.current === e.currentTarget
        ) {
          onClose();
        }
      }}
      style={{
        paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
        paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
        paddingLeft: 'max(0.75rem, env(safe-area-inset-left))',
        paddingRight: 'max(0.75rem, env(safe-area-inset-right))',
      }}
      className="fixed inset-0 z-50 bg-[#1B0828]/65 backdrop-blur-sm flex items-center justify-center overflow-hidden"
    >
      {/* Compact Centred Modal Shell */}
      <div className="relative w-full max-w-[540px] max-h-[calc(100dvh-24px)] sm:max-h-[min(86dvh,760px)] rounded-[26px] bg-gradient-to-b from-[#FCF8FE] via-[#F7EFFC] to-[#F3E6FB] border border-[#D8C0EE] shadow-[0_24px_64px_rgba(32,10,48,0.45)] flex flex-col overflow-hidden text-[#2A123F]">
        {/* Persistent Accessible Modal Header with Selected Experience Name & Close (X) */}
        <div className="shrink-0 bg-gradient-to-r from-[#FBF0F6] via-[#F3E9FC] to-[#FDEFE6] border-b border-[#E3CFF5] px-4.5 py-3.5 sm:px-6 sm:py-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-sans-body text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#6B2D8F]">
              Book Your Session
            </p>
            <h2
              id="booking-modal-title"
              className="font-serif-display text-[22px] sm:text-[26px] font-bold leading-tight text-[#2E1142] mt-0.5 truncate"
            >
              {experience.name}
            </h2>
            <p className="font-sans-body text-[12px] sm:text-[12.5px] text-[#4E2B69] mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 tabular-nums">
              <span>{experience.duration}</span>
              <span aria-hidden="true">&middot;</span>
              <span>{selectedFormat}</span>
              <span aria-hidden="true">&middot;</span>
              <span className="font-semibold text-[#3A1352]">
                ₹{experience.price.toLocaleString('en-IN')}
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking modal"
            className="w-9 h-9 rounded-full bg-gradient-to-br from-white/95 to-[#F3E8FC]/95 hover:from-white hover:to-[#EBD8FA] border border-[#D7BCEE] text-[#3B1254] flex items-center justify-center shadow-sm shrink-0 cursor-pointer transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5D237A]"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Independent Internal Vertical Scroll Body */}
        <div
          ref={scrollBodyRef}
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain scrollbar-hidden scroll-pb-6 px-4.5 py-4 sm:px-6 sm:py-5"
        >
          <form onSubmit={onSubmit} noValidate className="space-y-3.5">
            {/* STEP 1 SECTION: Choose Experience (Independent Mobile Vertical Scroll) */}
            <section
              aria-label="Choose Experience"
              className="rounded-2xl bg-white/75 border border-[#DFC9F2] p-3 sm:p-3.5 min-w-0 w-full max-h-[235px] sm:max-h-none overflow-y-auto sm:overflow-visible overscroll-contain scrollbar-hidden scroll-pb-3 space-y-2.5 shadow-2xs"
            >
              <div className="flex items-center gap-2 text-[12px] sm:text-[12.5px] font-bold uppercase tracking-[0.12em] text-[#5D237A]">
                <span className="w-5 h-5 rounded-full bg-[#4B1664] text-white text-[11px] flex items-center justify-center font-bold tabular-nums shrink-0">
                  1
                </span>
                <span>Choose Experience</span>
              </div>

              {/* Compact Selected Experience Preview Card */}
              <div className="flex items-center gap-2.5 sm:gap-3 p-2 sm:p-2.5 rounded-xl bg-white border border-[#E5D4F5] shadow-2xs min-w-0">
                <img
                  src={experience.image}
                  alt={experience.name}
                  referrerPolicy="no-referrer"
                  className="w-15 h-12 sm:w-18 sm:h-14 rounded-lg object-cover shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-serif-display text-[16px] sm:text-[18.5px] font-semibold text-[#2E1142] leading-snug truncate">
                    {experience.name}
                  </p>
                  <p className="text-[11.5px] sm:text-[12px] text-[#4A2B63] flex items-center gap-1.5 mt-0.5 tabular-nums truncate">
                    <Clock className="w-3.5 h-3.5 text-[#5D237A] shrink-0" />
                    <span className="truncate">
                      {experience.duration} &bull; {selectedFormat}
                    </span>
                  </p>
                </div>
                <span className="font-serif-display text-[17px] sm:text-[20px] font-bold text-[#4B1664] tabular-nums shrink-0 pr-0.5">
                  ₹{experience.price.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Session Format — Themed Custom Dropdown */}
              <div>
                <label
                  htmlFor="booking-format-select"
                  className="flex items-center gap-2 text-[13px] sm:text-[13.5px] font-semibold text-[#2E1142] mb-1.5"
                >
                  <Layers className="w-4 h-4 text-[#5D237A] shrink-0" />
                  <span>Session Format</span>
                </label>
                <ThemedSelect
                  id="booking-format-select"
                  ariaLabel="Session Format"
                  value={selectedFormat}
                  options={formatOptions}
                  onChange={onFormatChange}
                  flowMenu
                />
              </div>
            </section>

            {/* STEP 2 SECTION: Select Date & Time (Independent Mobile Vertical Scroll) */}
            <section
              aria-label="Select Date and Time"
              className="rounded-2xl bg-white/75 border border-[#DFC9F2] p-3 sm:p-3.5 min-w-0 w-full max-h-[255px] sm:max-h-none overflow-y-auto sm:overflow-visible overscroll-contain scrollbar-hidden scroll-pb-3 space-y-3 shadow-2xs"
            >
              <div className="flex items-center gap-2 text-[12px] sm:text-[12.5px] font-bold uppercase tracking-[0.12em] text-[#5D237A]">
                <span className="w-5 h-5 rounded-full bg-[#4B1664] text-white text-[11px] flex items-center justify-center font-bold tabular-nums shrink-0">
                  2
                </span>
                <span>Select Date &amp; Time</span>
              </div>

              {/* Select Date — Themed Custom Trigger & Aligned Dropdown Calendar */}
              <div>
                <div className="flex flex-wrap items-center justify-between mb-1.5 gap-x-2 gap-y-0.5">
                  <label className="flex items-center gap-2 text-[13px] sm:text-[13.5px] font-semibold text-[#2E1142]">
                    <CalendarIcon className="w-4 h-4 text-[#5D237A] shrink-0" />
                    <span>Select Date</span>
                  </label>
                  {availability.isDemoAvailability && (
                    <span className="text-[11px] text-[#6B2D8F] font-medium">
                      Demo Availability Active
                    </span>
                  )}
                </div>

                <div className="relative w-full">
                  <button
                    type="button"
                    aria-expanded={calendarOpen}
                    aria-label="Select Date"
                    onClick={onToggleCalendar}
                    className={`w-full min-h-[44px] sm:min-h-[46px] px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl border text-left flex items-center justify-between gap-2 text-[15px] sm:text-[16px] font-sans-body transition-all cursor-pointer shadow-2xs focus-visible:outline-none ${
                      calendarOpen
                        ? 'bg-gradient-to-r from-[#FAF3FE] via-[#F7EEF9] to-[#FDF0F6] border-[#5D237A] ring-2 ring-[#8B52B8]/25 text-[#2E1142]'
                        : 'bg-gradient-to-r from-[#FFFFFF] via-[#FCF8FE] to-[#FDF4F9] border-[#C6A7E2] hover:border-[#7D48B0] hover:from-[#FAF4FE] hover:to-[#FCEFF6] text-[#2E1142]'
                    }`}
                  >
                    <span className="font-medium truncate">
                      {selectedDate
                        ? formatReadableDate(selectedDate)
                        : 'Choose a date'}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#5D237A] shrink-0 transition-transform duration-200 ${
                        calendarOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Aligned Dropdown Calendar directly beneath trigger (same width) */}
                  {calendarOpen && (
                    <div
                      ref={calendarPanelRef}
                      className="mt-1.5 w-full p-2.5 sm:p-3.5 rounded-2xl bg-gradient-to-b from-white via-[#FAF4FE] to-[#FDF0F6] border border-[#C6A7E2] shadow-[0_12px_30px_rgba(75,22,100,0.16)]"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <button
                          type="button"
                          onClick={() =>
                            onChangeCalendarMonth(
                              new Date(
                                calendarMonth.getFullYear(),
                                calendarMonth.getMonth() - 1,
                                1
                              )
                            )
                          }
                          aria-label="Previous month"
                          className="p-1.5 rounded-lg hover:bg-[#F1E4FB] text-[#4B1664] cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="font-serif-display text-base sm:text-lg font-semibold text-[#2E1142]">
                          {calendarMonth.toLocaleDateString('en-US', {
                            month: 'long',
                            year: 'numeric',
                          })}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onChangeCalendarMonth(
                              new Date(
                                calendarMonth.getFullYear(),
                                calendarMonth.getMonth() + 1,
                                1
                              )
                            )
                          }
                          aria-label="Next month"
                          className="p-1.5 rounded-lg hover:bg-[#F1E4FB] text-[#4B1664] cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-[#6E4F87] mb-1">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                          <span key={d}>{d}</span>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {calendarDays.map((cell, idx) => {
                          if (!cell) {
                            return <div key={`empty-${idx}`} />;
                          }
                          const disabled = isDateDisabled(cell.ymd, cell.dateObj);
                          const isChosen = cell.ymd === selectedDate;
                          return (
                            <button
                              key={cell.ymd}
                              type="button"
                              disabled={disabled}
                              onClick={() => {
                                onSelectDate(cell.ymd);
                                onToggleCalendar();
                              }}
                              className={`h-8 rounded-lg text-[12px] sm:text-[12.5px] font-medium tabular-nums transition-all ${
                                disabled
                                  ? 'text-[#C5B4D4] bg-transparent cursor-not-allowed line-through'
                                  : isChosen
                                    ? 'bg-gradient-to-br from-[#632488] to-[#4B1664] text-white font-bold shadow-xs cursor-pointer'
                                    : 'text-[#2E1142] hover:bg-gradient-to-br hover:from-[#F2E7FC] hover:to-[#FCEEF5] cursor-pointer'
                              }`}
                            >
                              {cell.dayNumber}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                {fieldErrors.date && (
                  <p className="text-xs text-[#A82040] mt-1">
                    {fieldErrors.date}
                  </p>
                )}
              </div>

              {/* Select Time Slots */}
              <div>
                <div className="flex flex-wrap items-center justify-between mb-1.5 gap-x-2 gap-y-0.5">
                  <label className="flex items-center gap-2 text-[13px] sm:text-[13.5px] font-semibold text-[#2E1142]">
                    <Clock className="w-4 h-4 text-[#5D237A] shrink-0" />
                    <span>Select Time</span>
                  </label>
                  {selectedTimeSlot && (
                    <span className="text-[11px] sm:text-[11.5px] text-[#5B3A75] tabular-nums">
                      {selectedTimeSlot} &ndash;{' '}
                      {calculateEndTime(
                        selectedTimeSlot,
                        experience.durationMinutes
                      )}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2">
                  {allSlotsForDate.map((slot) => {
                    const isBooked = bookedSlotsForSelectedDate.includes(slot);
                    const isSelected = selectedTimeSlot === slot && !isBooked;
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={isBooked}
                        onClick={() => onSelectTimeSlot(slot)}
                        className={`min-h-[38px] sm:min-h-[40px] py-1.5 px-2 sm:px-2.5 rounded-full text-[11.5px] sm:text-[12.5px] font-medium border transition-all tabular-nums whitespace-nowrap text-center truncate ${
                          isBooked
                            ? 'bg-[#EDE6F2] text-[#9A85AD] border-[#D8C9E6] cursor-not-allowed line-through'
                            : isSelected
                              ? 'sw-btn-pill sw-btn-soft-violet cursor-pointer'
                              : 'bg-gradient-to-r from-white to-[#FAF4FD] text-[#2E1142] border-[#C6A7E2] hover:from-[#F5ECFC] hover:to-[#FCEFF6] hover:border-[#7D48B0] cursor-pointer'
                        }`}
                      >
                        {isBooked ? `${slot} (Booked)` : slot}
                      </button>
                    );
                  })}
                </div>
                {fieldErrors.timeSlot && (
                  <p className="text-xs text-[#A82040] mt-1">
                    {fieldErrors.timeSlot}
                  </p>
                )}
              </div>
            </section>

            {/* STEP 3 SECTION: Your Details (Independent Mobile Vertical Scroll) */}
            <section
              aria-label="Your Details"
              className="rounded-2xl bg-white/75 border border-[#DFC9F2] p-3 sm:p-3.5 min-w-0 w-full max-h-[260px] sm:max-h-none overflow-y-auto sm:overflow-visible overscroll-contain scrollbar-hidden scroll-pb-3 space-y-2.5 shadow-2xs"
            >
              <div className="flex items-center gap-2 text-[12px] sm:text-[12.5px] font-bold uppercase tracking-[0.12em] text-[#5D237A]">
                <span className="w-5 h-5 rounded-full bg-[#4B1664] text-white text-[11px] flex items-center justify-center font-bold tabular-nums shrink-0">
                  3
                </span>
                <span>Your Details</span>
              </div>

              <div>
                <div className="flex items-center gap-2 text-[13px] sm:text-[13.5px] font-semibold text-[#2E1142] mb-1.5">
                  <User className="w-4 h-4 text-[#5D237A] shrink-0" />
                  <span>Guest Information</span>
                </div>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => onCustomerNameChange(e.target.value)}
                  onFocus={handleFieldFocus}
                  placeholder="Full Name *"
                  aria-label="Full Name"
                  autoComplete="name"
                  className="w-full min-h-[44px] sm:min-h-[46px] px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-white border border-[#C6A7E2] text-[16px] text-[#2E1142] placeholder-[#5B3D73] focus:outline-none focus:border-[#5D237A] focus:ring-2 focus:ring-[#8B52B8]/25"
                />
                {fieldErrors.customerName && (
                  <p className="text-xs text-[#A82040] mt-1">
                    {fieldErrors.customerName}
                  </p>
                )}
              </div>

              {/* Country Code (ThemedSelect) + Phone Number aligned cleanly down to 360px */}
              <div>
                <div className="grid grid-cols-[106px_minmax(0,1fr)] sm:grid-cols-[128px_minmax(0,1fr)] gap-2 sm:gap-2.5 items-start">
                  <ThemedSelect
                    ariaLabel="Phone country code"
                    value={phoneCountryCode}
                    options={COUNTRY_CODE_OPTIONS}
                    onChange={onPhoneCountryCodeChange}
                    flowMenu
                  />
                  <input
                    type="tel"
                    inputMode="tel"
                    value={customerPhone}
                    onChange={(e) => onCustomerPhoneChange(e.target.value)}
                    onFocus={handleFieldFocus}
                    placeholder="Phone Number *"
                    aria-label="Phone Number"
                    autoComplete="tel-national"
                    className="w-full min-w-0 min-h-[44px] sm:min-h-[46px] px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-white border border-[#C6A7E2] text-[16px] text-[#2E1142] placeholder-[#5B3D73] focus:outline-none focus:border-[#5D237A] focus:ring-2 focus:ring-[#8B52B8]/25"
                  />
                </div>
                {fieldErrors.customerPhone && (
                  <p className="text-xs text-[#A82040] mt-1">
                    {fieldErrors.customerPhone}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  inputMode="email"
                  value={customerEmail}
                  onChange={(e) => onCustomerEmailChange(e.target.value)}
                  onFocus={handleFieldFocus}
                  placeholder="Email Address *"
                  aria-label="Email Address"
                  autoComplete="email"
                  className="w-full min-h-[44px] sm:min-h-[46px] px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-white border border-[#C6A7E2] text-[16px] text-[#2E1142] placeholder-[#5B3D73] focus:outline-none focus:border-[#5D237A] focus:ring-2 focus:ring-[#8B52B8]/25"
                />
                {fieldErrors.customerEmail && (
                  <p className="text-xs text-[#A82040] mt-1">
                    {fieldErrors.customerEmail}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => onSpecialRequestsChange(e.target.value)}
                  onFocus={handleFieldFocus}
                  placeholder="Any specific request? (Optional)"
                  aria-label="Special Requests"
                  className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-white border border-[#C6A7E2] text-[16px] text-[#2E1142] placeholder-[#5B3D73] focus:outline-none focus:border-[#5D237A] focus:ring-2 focus:ring-[#8B52B8]/25 resize-none scrollbar-hidden"
                />
              </div>

              {/* Payment Option Toggle (Hidden in Static Presentation Mode) */}
              {!IS_STATIC_PRESENTATION && (
                <div className="pt-0.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12.5px]">
                    <button
                      type="button"
                      onClick={() => onPaymentMethodChange('pay_at_session')}
                      className={`min-h-[42px] py-2 px-3 rounded-xl font-medium transition-all cursor-pointer text-center ${
                        paymentMethod === 'pay_at_session'
                          ? 'bg-gradient-to-r from-[#EDE0FC] via-[#F4E6FA] to-[#FCE9F2] border border-[#8E58B5] text-[#2F1041] shadow-xs'
                          : 'bg-white border border-[#DEC9F2] text-[#6B4A8C] hover:bg-gradient-to-r hover:from-[#F7F1FC] hover:to-[#FDF2F7]'
                      }`}
                    >
                      Reserve (Pay at Session)
                    </button>
                    <button
                      type="button"
                      onClick={() => onPaymentMethodChange('razorpay')}
                      className={`min-h-[42px] py-2 px-3 rounded-xl font-medium transition-all cursor-pointer text-center ${
                        paymentMethod === 'razorpay'
                          ? 'bg-gradient-to-r from-[#EDE0FC] via-[#F4E6FA] to-[#FCE9F2] border border-[#8E58B5] text-[#2F1041] shadow-xs'
                          : 'bg-white border border-[#DEC9F2] text-[#6B4A8C] hover:bg-gradient-to-r hover:from-[#F7F1FC] hover:to-[#FDF2F7]'
                      }`}
                    >
                      Razorpay Online{' '}
                      {!settings.razorpayConfigured && '(Setup Pending)'}
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* Live Booking Summary Box */}
            <div className="p-3 rounded-xl bg-white/85 border border-[#DEC9F2] text-[12.5px] text-[#3F2157] space-y-0.5">
              <div className="flex items-center justify-between font-semibold text-[#2E1142]">
                <span className="inline-flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#5D237A]" />
                  <span>Booking Summary</span>
                </span>
                <span className="tabular-nums">
                  ₹{experience.price.toLocaleString('en-IN')}
                </span>
              </div>
              <p>
                {experience.name} ({experience.duration} &bull; {selectedFormat})
              </p>
              <p className="font-medium text-[#4B1664]">
                {selectedDate ? formatReadableDate(selectedDate) : 'Select Date'}{' '}
                {selectedTimeSlot ? `at ${selectedTimeSlot}` : ''}
              </p>
            </div>

            {staticBookingNotice && (
              <div
                role="status"
                className="p-4 rounded-2xl bg-[#F3E8FC] border-2 border-[#6B2D8F] text-[#2E1142] space-y-3 shadow-sm"
              >
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-5 h-5 text-[#5D237A] shrink-0 mt-0.5" />
                  <p className="font-sans-body text-[13.5px] font-medium leading-relaxed text-[#2E1142]">
                    Thank you for your interest in SOUNDWITHIN. Our booking
                    service is currently being prepared. Please contact us to
                    arrange your session.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-0.5 pl-7">
                  <a
                    href={`mailto:${settings.emailDisplay.split(' ')[0]}?subject=${encodeURIComponent(
                      `Session Request: ${experience.name} (${selectedFormat})`
                    )}&body=${encodeURIComponent(
                      `Namaste SoundWithin,\n\nI would like to arrange a session:\n- Experience: ${experience.name} (${selectedFormat})\n- Preferred Date: ${formatReadableDate(selectedDate)} at ${selectedTimeSlot}\n- Name: ${customerName}\n- Phone: ${phoneCountryCode} ${customerPhone}\n- Notes: ${specialRequests || 'None'}`
                    )}`}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap ${BUTTON_TOKENS.general}`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email {settings.emailDisplay.split(' ')[0]}</span>
                  </a>
                  <a
                    href={`tel:${settings.phoneDisplay.split(' (')[0].replace(/\s+/g, '')}`}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap ${BUTTON_TOKENS.secondary}`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call {settings.phoneDisplay.split(' (')[0]}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigate('contact');
                    }}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-medium cursor-pointer whitespace-nowrap ${BUTTON_TOKENS.secondary}`}
                  >
                    <span>Contact Page</span>
                  </button>
                </div>
              </div>
            )}

            {submitError && (
              <div className="p-2.5 rounded-xl bg-[#FDF0F3] border border-[#E699AA] text-xs text-[#6E1A2C] flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#B32846]" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Confirm Booking Button */}
            <button
              type="submit"
              disabled={submitting}
              className={`w-full min-h-[46px] py-3 px-6 rounded-full disabled:opacity-60 font-sans-body text-[14.5px] font-medium flex items-center justify-center gap-2 cursor-pointer text-center whitespace-nowrap ${BUTTON_TOKENS.general}`}
            >
              <CalendarIcon className="w-4 h-4 text-[#E6CFF8]" />
              <span>
                {submitting ? 'Confirming Booking...' : 'Confirm Booking'}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
