import React, {useState, useEffect, useMemo, useRef, useCallback} from 'react';
import {AlertCircle, CheckCircle2} from 'lucide-react';
import {HeroBanner} from '../components/HeroBanner';
import {ExperienceCard} from '../components/ExperienceCard';
import {BookingModal} from '../components/BookingModal';
import {InfiniteHorizontalCarousel} from '../components/InfiniteHorizontalCarousel';
import {IS_STATIC_PRESENTATION} from '../data/staticContent';
import {BUTTON_TOKENS} from '../utils/buttonThemes';
import {
  InfinityLineIcon,
  LotusLineIcon,
  SproutLeafIcon,
  ZenStonesIcon,
} from '../components/BrandIcons';
import type {
  AvailabilityConfig,
  Booking,
  Experience,
  PageRoute,
  WebsiteSettings,
} from '../types';

interface BookSessionPageProps {
  onNavigate: (page: PageRoute) => void;
  experiences: Experience[];
  availability: AvailabilityConfig;
  bookedSlotsByDate: Record<string, string[]>;
  settings: WebsiteSettings;
  initialExperienceId?: string | null;
  initialFormat?: string | null;
  onBookingCreated: (
    booking: Booking,
    updatedBookedSlots: Record<string, string[]>
  ) => void;
}

function formatYMD(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatReadableDate(ymd: string): string {
  if (!ymd) return '';
  const [y, m, d] = ymd.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function calculateEndTime(startSlot: string, durationMinutes: number): string {
  const match = startSlot.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return '';
  let hours = parseInt(match[1], 10);
  const mins = parseInt(match[2], 10);
  const period = match[3].toUpperCase();
  if (period === 'PM' && hours < 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  const totalMinutes = hours * 60 + mins + durationMinutes;
  const endHours24 = Math.floor(totalMinutes / 60) % 24;
  const endMins = totalMinutes % 60;
  const endPeriod = endHours24 >= 12 ? 'PM' : 'AM';
  const endHours12 = endHours24 % 12 === 0 ? 12 : endHours24 % 12;
  return `${endHours12}:${String(endMins).padStart(2, '0')} ${endPeriod}`;
}

function getDefaultFormatForExperience(
  exp: Experience | undefined,
  preferredFormat?: string | null
): string {
  if (!exp) return 'In-Person';
  if (preferredFormat && exp.availableFormats.includes(preferredFormat)) {
    return preferredFormat;
  }
  if (exp.availableFormats.includes('In-Person')) return 'In-Person';
  return exp.availableFormats[0] || 'In-Person';
}

export function BookSessionPage({
  onNavigate,
  experiences,
  availability,
  bookedSlotsByDate,
  settings,
  initialExperienceId,
  initialFormat,
  onBookingCreated,
}: BookSessionPageProps) {
  // Booking form is strictly hidden inside a modal until the user clicks "Book This Experience"
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);

  const [selectedExpId, setSelectedExpId] = useState<string>(
    initialExperienceId || experiences[0]?.id || 'exp-sound-healing'
  );

  const selectedExperience = useMemo(
    () =>
      experiences.find((e) => e.id === selectedExpId) ||
      experiences[0],
    [experiences, selectedExpId]
  );

  const [selectedFormat, setSelectedFormat] = useState<string>(() =>
    getDefaultFormatForExperience(
      experiences.find((e) => e.id === (initialExperienceId || experiences[0]?.id)),
      initialFormat
    )
  );

  useEffect(() => {
    if (initialExperienceId) {
      setSelectedExpId(initialExperienceId);
    }
  }, [initialExperienceId]);

  useEffect(() => {
    if (selectedExperience) {
      if (
        initialFormat &&
        selectedExperience.id === initialExperienceId &&
        selectedExperience.availableFormats.includes(initialFormat)
      ) {
        setSelectedFormat(initialFormat);
      } else if (!selectedExperience.availableFormats.includes(selectedFormat)) {
        setSelectedFormat(getDefaultFormatForExperience(selectedExperience));
      }
    }
  }, [selectedExperience, initialExperienceId, initialFormat]);

  // Calendar state
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const tomorrowYMD = useMemo(() => {
    const t = new Date(today);
    t.setDate(t.getDate() + 1);
    return formatYMD(t);
  }, [today]);

  const [selectedDate, setSelectedDate] = useState<string>(tomorrowYMD);
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const [calendarMonth, setCalendarMonth] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  // Slots for the selected date
  const allSlotsForDate = useMemo(() => {
    if (!selectedDate) return availability.defaultTimeSlots;
    return (
      availability.customDateSlots[selectedDate] ??
      availability.defaultTimeSlots
    );
  }, [selectedDate, availability]);

  const bookedSlotsForSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    return bookedSlotsByDate[selectedDate] ?? [];
  }, [selectedDate, bookedSlotsByDate]);

  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('3:00 PM');

  // Keep selectedTimeSlot valid when date changes
  useEffect(() => {
    if (
      selectedTimeSlot &&
      allSlotsForDate.includes(selectedTimeSlot) &&
      !bookedSlotsForSelectedDate.includes(selectedTimeSlot)
    ) {
      return;
    }
    const firstAvailable = allSlotsForDate.find(
      (s) => !bookedSlotsForSelectedDate.includes(s)
    );
    setSelectedTimeSlot(firstAvailable || '');
  }, [selectedDate, allSlotsForDate, bookedSlotsForSelectedDate, selectedTimeSlot]);

  // Customer details
  const [customerName, setCustomerName] = useState('');
  const [phoneCountryCode, setPhoneCountryCode] = useState('+91');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<
    'pay_at_session' | 'razorpay'
  >('pay_at_session');

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [staticBookingNotice, setStaticBookingNotice] =
    useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(
    null
  );
  const [paymentWarning, setPaymentWarning] = useState<string | null>(null);

  const handleOpenBookingModal = (exp: Experience) => {
    const preferred =
      exp.id === initialExperienceId ? initialFormat : null;
    setSelectedExpId(exp.id);
    setSelectedFormat(getDefaultFormatForExperience(exp, preferred));
    setFieldErrors({});
    setSubmitError(null);
    setStaticBookingNotice(false);
    setCalendarOpen(false);
    setIsBookingModalOpen(true);
  };

  // Compute derived step progress from booking state and allow explicit step selection
  const derivedStep: 1 | 2 | 3 = useMemo(() => {
    if (confirmedBooking || isBookingModalOpen) {
      if (customerName.trim() || customerPhone.trim() || customerEmail.trim()) {
        return 3;
      }
      if (selectedDate && selectedTimeSlot) {
        return 2;
      }
    }
    return 1;
  }, [
    confirmedBooking,
    isBookingModalOpen,
    customerName,
    customerPhone,
    customerEmail,
    selectedDate,
    selectedTimeSlot,
  ]);

  const [selectedStep, setSelectedStep] = useState<1 | 2 | 3>(1);
  const stepNavRef = useRef<HTMLElement>(null);
  const stepButtonRefs = useRef<Record<1 | 2 | 3, HTMLButtonElement | null>>({
    1: null,
    2: null,
    3: null,
  });

  useEffect(() => {
    setSelectedStep(derivedStep);
  }, [derivedStep]);

  const currentStep = selectedStep;

  const ensureStepVisible = useCallback((step: 1 | 2 | 3) => {
    const nav = stepNavRef.current;
    const btn = stepButtonRefs.current[step];
    if (!nav || !btn) return;
    if (nav.scrollWidth <= nav.clientWidth) return;

    const edgePadding = 14;
    const btnLeft = btn.offsetLeft;
    const btnRight = btnLeft + btn.offsetWidth;
    const viewLeft = nav.scrollLeft;
    const viewRight = viewLeft + nav.clientWidth;

    if (btnLeft < viewLeft + edgePadding || btnRight > viewRight - edgePadding) {
      const targetLeft = Math.max(
        0,
        Math.min(
          nav.scrollWidth - nav.clientWidth,
          btnLeft - (nav.clientWidth - btn.offsetWidth) / 2
        )
      );
      nav.scrollTo({left: targetLeft, behavior: 'smooth'});
    }
  }, []);

  useEffect(() => {
    ensureStepVisible(currentStep);
  }, [currentStep, ensureStepVisible]);

  const handleSelectStep = (step: 1 | 2 | 3) => {
    setSelectedStep(step);
    requestAnimationFrame(() => ensureStepVisible(step));
  };

  // Check if a calendar date is disabled
  const isDateDisabled = (ymd: string, dateObj: Date): boolean => {
    const todayStr = formatYMD(today);
    if (ymd < todayStr) return true;
    if (availability.blockedDates.includes(ymd)) return true;
    if (availability.closedWeekdays.includes(dateObj.getDay())) return true;
    const slots =
      availability.customDateSlots[ymd] ?? availability.defaultTimeSlots;
    const booked = bookedSlotsByDate[ymd] ?? [];
    return slots.every((s) => booked.includes(s));
  };

  // Generate calendar grid days for calendarMonth
  const calendarDays = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: Array<{ymd: string; dayNumber: number; dateObj: Date} | null> =
      [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      cells.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dt = new Date(year, month, d);
      cells.push({
        ymd: formatYMD(dt),
        dayNumber: d,
        dateObj: dt,
      });
    }
    return cells;
  }, [calendarMonth]);

  const validateBookingForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!selectedExperience) {
      errors.experience = 'Please select an experience.';
    }
    if (!selectedDate) {
      errors.date = 'Please select an appointment date.';
    } else {
      const [y, m, d] = selectedDate.split('-').map(Number);
      if (isDateDisabled(selectedDate, new Date(y, m - 1, d))) {
        errors.date = 'Selected date is unavailable. Please pick another date.';
      }
    }
    if (!selectedTimeSlot) {
      errors.timeSlot = 'Please select an available time slot.';
    } else if (bookedSlotsForSelectedDate.includes(selectedTimeSlot)) {
      errors.timeSlot =
        'This time slot is already booked. Please choose another slot.';
    }
    if (!customerName.trim() || customerName.trim().length < 2) {
      errors.customerName = 'Please enter your full name.';
    }
    const cleanPhone = customerPhone.replace(/[\s\-()]/g, '');
    if (!/^\d{7,15}$/.test(cleanPhone)) {
      errors.customerPhone = 'Please enter a valid phone number (7–15 digits).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(customerEmail.trim())) {
      errors.customerEmail = 'Please enter a valid email address.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setPaymentWarning(null);
    setStaticBookingNotice(false);

    if (!validateBookingForm()) return;

    if (IS_STATIC_PRESENTATION) {
      setStaticBookingNotice(true);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          experienceId: selectedExperience.id,
          sessionFormat: selectedFormat,
          date: selectedDate,
          timeSlot: selectedTimeSlot,
          customerName: customerName.trim(),
          phoneCountryCode,
          customerPhone: customerPhone.trim(),
          customerEmail: customerEmail.trim(),
          specialRequests: specialRequests.trim(),
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setSubmitError(
          data.error || 'Could not complete your booking. Please try again.'
        );
        return;
      }

      const savedBooking: Booking = data.booking;
      onBookingCreated(savedBooking, data.bookedSlotsByDate || {});

      // If user chose Razorpay, attempt order creation on backend
      if (paymentMethod === 'razorpay') {
        const orderRes = await fetch('/api/payments/create-order', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({bookingId: savedBooking.id}),
        });
        const orderData = await orderRes.json();
        if (!orderRes.ok) {
          setPaymentWarning(
            orderData.error ||
              'Online payment is awaiting Razorpay merchant credentials. Your booking has been safely reserved under Pay at Session.'
          );
        }
      }

      setIsBookingModalOpen(false);
      setConfirmedBooking(savedBooking);
    } catch {
      setSubmitError('Network error while saving booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Four Booking Benefits with subtle complementary pastel gradient badges & SVG strokes
  const bottomTrustItems = [
    {
      label: 'Personalised Sessions',
      badgeGradient:
        'bg-gradient-to-br from-[#F3E8FD] via-[#EAD8FB] to-[#E0C7F8] border-[#CFAEEB]',
      icon: (
        <LotusLineIcon
          className="w-7 h-6 sm:w-8 sm:h-7"
          gradientStops={['#74329E', '#4B1664']}
        />
      ),
    },
    {
      label: 'Safe & Supportive Space',
      badgeGradient:
        'bg-gradient-to-br from-[#FCE8F2] via-[#FDE6DE] to-[#FBDCD0] border-[#F0C2CF]',
      icon: (
        <SproutLeafIcon
          className="w-6.5 h-6.5 sm:w-7.5 sm:h-7.5"
          gradientStops={['#943764', '#5D237A']}
        />
      ),
    },
    {
      label: 'Experienced Guidance',
      badgeGradient:
        'bg-gradient-to-br from-[#FEF0E4] via-[#F8E2F2] to-[#EBD8FB] border-[#DFC0EC]',
      icon: (
        <ZenStonesIcon
          className="w-6.5 h-6.5 sm:w-7.5 sm:h-7.5"
          gradientStops={['#7C3BA6', '#4E1B7B']}
        />
      ),
    },
    {
      label: 'Holistic Well-Being',
      badgeGradient:
        'bg-gradient-to-br from-[#E8F7F0] via-[#EFEAFB] to-[#E5D4FA] border-[#C9B5EB]',
      icon: (
        <InfinityLineIcon
          className="w-7.5 h-6 sm:w-8.5 sm:h-7"
          gradientStops={['#5D237A', '#3C1459']}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7FD] text-[#2A123F]">
      {/* HERO SECTION */}
      <HeroBanner
        currentPage="book"
        onNavigate={onNavigate}
        variant="book-peace"
        kicker="BOOK A SESSION"
        titleLines={['Book Your Session']}
        description="Choose your experience, embrace the journey, and step into inner peace."
        showCalendarIconOnNavCta={true}
      />

      {/* 3-STEP PROGRESS BAR — Single Horizontal Row with Touch Swipe on Narrow Viewports */}
      <section className="pt-3.5 pb-1.5 sm:pt-4 sm:pb-2 bg-[#FAF7FD]">
        <nav
          ref={stepNavRef}
          aria-label="Booking steps"
          className="relative w-full max-w-[1560px] mx-auto overflow-x-auto scrollbar-hidden touch-pan-x overscroll-x-contain"
        >
          <div className="flex flex-nowrap items-center justify-start md:justify-center gap-2.5 sm:gap-3.5 w-max min-w-full px-3.5 sm:px-[22px] lg:px-9 xl:px-12 py-1">
            {/* Step 1 Button */}
            <button
              ref={(el) => {
                stepButtonRefs.current[1] = el;
              }}
              type="button"
              onClick={() => handleSelectStep(1)}
              aria-current={currentStep === 1 ? 'step' : undefined}
              className={`shrink-0 inline-flex items-center gap-2 px-3.5 sm:px-4.5 py-2 sm:py-1.5 rounded-full border text-[13px] sm:text-[13.5px] transition-all cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5D237A]/50 ${
                currentStep === 1
                  ? 'bg-white border-[#5D237A] ring-1 ring-[#6B2D8F]/20 text-[#2E1142] font-semibold shadow-sm'
                  : 'bg-[#F6F0FC] border-[#DEC8F2] text-[#5B3D73] font-medium hover:border-[#B48CE0]'
              }`}
            >
              <span
                className={`w-5.5 h-5.5 rounded-full text-xs flex items-center justify-center font-bold tabular-nums shrink-0 border ${
                  currentStep === 1
                    ? 'bg-[#4B1664] text-white border-[#4B1664]'
                    : 'bg-white text-[#4B1664] border-[#8D5BB0]'
                }`}
              >
                1
              </span>
              <span className="whitespace-nowrap">Choose Experience</span>
            </button>

            <div className="hidden md:block w-10 lg:w-16 h-[1px] bg-[#C8A8E8] shrink-0" />

            {/* Step 2 Button */}
            <button
              ref={(el) => {
                stepButtonRefs.current[2] = el;
              }}
              type="button"
              onClick={() => handleSelectStep(2)}
              aria-current={currentStep === 2 ? 'step' : undefined}
              className={`shrink-0 inline-flex items-center gap-2 px-3.5 sm:px-4.5 py-2 sm:py-1.5 rounded-full border text-[13px] sm:text-[13.5px] transition-all cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5D237A]/50 ${
                currentStep === 2
                  ? 'bg-white border-[#5D237A] ring-1 ring-[#6B2D8F]/20 text-[#2E1142] font-semibold shadow-sm'
                  : 'bg-[#F6F0FC] border-[#DEC8F2] text-[#5B3D73] font-medium hover:border-[#B48CE0]'
              }`}
            >
              <span
                className={`w-5.5 h-5.5 rounded-full text-xs flex items-center justify-center font-bold tabular-nums shrink-0 border ${
                  currentStep === 2
                    ? 'bg-[#4B1664] text-white border-[#4B1664]'
                    : 'bg-white text-[#4B1664] border-[#8D5BB0]'
                }`}
              >
                2
              </span>
              <span className="whitespace-nowrap">Select Date &amp; Time</span>
            </button>

            <div className="hidden md:block w-10 lg:w-16 h-[1px] bg-[#C8A8E8] shrink-0" />

            {/* Step 3 Button */}
            <button
              ref={(el) => {
                stepButtonRefs.current[3] = el;
              }}
              type="button"
              onClick={() => handleSelectStep(3)}
              aria-current={currentStep === 3 ? 'step' : undefined}
              className={`shrink-0 inline-flex items-center gap-2 px-3.5 sm:px-4.5 py-2 sm:py-1.5 rounded-full border text-[13px] sm:text-[13.5px] transition-all cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5D237A]/50 ${
                currentStep === 3
                  ? 'bg-white border-[#5D237A] ring-1 ring-[#6B2D8F]/20 text-[#2E1142] font-semibold shadow-sm'
                  : 'bg-[#F6F0FC] border-[#DEC8F2] text-[#5B3D73] font-medium hover:border-[#B48CE0]'
              }`}
            >
              <span
                className={`w-5.5 h-5.5 rounded-full text-xs flex items-center justify-center font-bold tabular-nums shrink-0 border ${
                  currentStep === 3
                    ? 'bg-[#4B1664] text-white border-[#4B1664]'
                    : 'bg-white text-[#4B1664] border-[#8D5BB0]'
                }`}
              >
                3
              </span>
              <span className="whitespace-nowrap">Your Details</span>
            </button>
          </div>
        </nav>
      </section>

      {/* MAIN EXPERIENCE CARDS COLLECTION OR CONFIRMATION SCREEN */}
      <section className="py-4 sm:py-7 lg:py-8 bg-[#FAF7FD]">
        <div className="layout-container">
          {confirmedBooking ? (
            /* BOOKING CONFIRMATION VIEW */
            <div className="max-w-[740px] mx-auto rounded-[28px] bg-gradient-to-b from-white to-[#F4ECFC] border-2 border-[#6B2D8F] shadow-[0_16px_48px_rgba(75,22,100,0.16)] p-6 sm:p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-[#4B1664] text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#5D237A] mb-1 whitespace-nowrap">
                Booking Confirmed &amp; Saved
              </p>
              <h2 className="font-serif-display text-[clamp(16px,3.2vw,36px)] font-semibold text-[#2E1142] mb-1.5 whitespace-nowrap">
                We Look Forward to Welcoming You
              </h2>
              <p className="text-[clamp(6.8px,1.9vw,14.5px)] text-[#4A2B63] mx-auto mb-5 whitespace-nowrap">
                Your session has been reserved in our schedule. Please keep your unique booking reference for your records.
              </p>

              {/* Unique Reference Badge */}
              <div className="inline-block px-5 py-2.5 rounded-2xl bg-[#EFE2FA] border border-[#C6A1E6] mb-5">
                <span className="text-xs uppercase tracking-wider text-[#5B3A75] block">
                  Booking Reference
                </span>
                <span className="font-mono text-2xl font-bold text-[#3A1352] tracking-wider tabular-nums">
                  {confirmedBooking.referenceCode}
                </span>
              </div>

              {paymentWarning && (
                <div className="mb-5 p-3.5 rounded-2xl bg-[#FFF8EB] border border-[#E5C07B] text-left text-[13px] text-[#5E400D] flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#B87D14]" />
                  <span>{paymentWarning}</span>
                </div>
              )}

              {/* Summary Table */}
              <div className="text-left rounded-2xl bg-white border border-[#DEC9F2] p-4 sm:p-5 mb-6 space-y-2.5 text-[13.5px]">
                <div className="flex justify-between py-1.5 border-b border-[#F2E8FA]">
                  <span className="text-[#6B4A8C]">Experience</span>
                  <span className="font-semibold text-[#2E1142]">
                    {confirmedBooking.experienceName}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#F2E8FA]">
                  <span className="text-[#6B4A8C]">Duration &amp; Format</span>
                  <span className="font-medium text-[#2E1142]">
                    {confirmedBooking.duration} &bull;{' '}
                    {confirmedBooking.sessionFormat}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#F2E8FA]">
                  <span className="text-[#6B4A8C]">Date &amp; Time</span>
                  <span className="font-semibold text-[#4B1664]">
                    {formatReadableDate(confirmedBooking.date)} at{' '}
                    {confirmedBooking.timeSlot}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#F2E8FA]">
                  <span className="text-[#6B4A8C]">Guest Details</span>
                  <span className="font-medium text-[#2E1142]">
                    {confirmedBooking.customerName} (
                    {confirmedBooking.phoneCountryCode}{' '}
                    {confirmedBooking.customerPhone})
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#F2E8FA]">
                  <span className="text-[#6B4A8C]">Email</span>
                  <span className="font-medium text-[#2E1142]">
                    {confirmedBooking.customerEmail}
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#6B4A8C]">Session Fee &amp; Status</span>
                  <span className="font-semibold text-[#2E1142] tabular-nums">
                    ₹{confirmedBooking.amount.toLocaleString('en-IN')} &bull;{' '}
                    {confirmedBooking.status} (
                    {confirmedBooking.paymentMethod === 'pay_at_session'
                      ? 'Pay at Session'
                      : confirmedBooking.paymentStatus}
                    )
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3.5">
                <button
                  type="button"
                  onClick={() => {
                    setConfirmedBooking(null);
                    setCustomerName('');
                    setCustomerPhone('');
                    setCustomerEmail('');
                    setSpecialRequests('');
                  }}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium cursor-pointer text-center whitespace-nowrap ${BUTTON_TOKENS.secondary}`}
                >
                  Book Another Session
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className={`px-7 py-2.5 rounded-full text-sm font-medium cursor-pointer text-center whitespace-nowrap ${BUTTON_TOKENS.general}`}
                >
                  Return to Home
                </button>
              </div>
            </div>
          ) : (
            /* 6 EXPERIENCE CARDS MATCHING EXPERIENCES PAGE (3x2 GRID) */
            <div>
              <h2 className="font-serif-display text-[clamp(17px,4.8vw,34px)] font-medium uppercase tracking-[0.025em] sm:tracking-[0.04em] text-[#321048] mb-3.5 sm:mb-4.5 whitespace-nowrap">
                CHOOSE YOUR EXPERIENCE
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                {experiences.map((exp, index) => (
                  <ExperienceCard
                    key={exp.id}
                    experience={exp}
                    index={index}
                    ctaLabel="Book This Experience"
                    onLearnMore={handleOpenBookingModal}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* BOTTOM 4 BOOKING BENEFITS — CONTINUOUS INFINITE HORIZONTAL LOOP MATCHING EXPERIENCES PAGE */}
      <section
        aria-label="Booking Benefits"
        className="relative z-20 bg-gradient-to-b from-[#F4ECFB] to-[#EADBF8] border-t border-[#E5D3F6] overflow-hidden"
      >
        <InfiniteHorizontalCarousel
          items={bottomTrustItems}
          getItemKey={(item, idx) => `${item.label}-${idx}`}
          speedPxPerSec={28}
          className="py-3 sm:py-4.5"
          dividerClassName="h-7 sm:h-9 w-[1px] bg-[#C5A3E0]/65 shrink-0"
          renderItem={(item) => (
            <div className="group flex flex-col items-center justify-center px-5 sm:px-8 lg:px-11 py-0.5 text-center shrink-0">
              <div
                className={`mb-1.5 sm:mb-2 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border shadow-2xs flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${item.badgeGradient}`}
              >
                {item.icon}
              </div>
              <span className="font-serif-display text-[14px] sm:text-[17px] lg:text-[18.5px] leading-tight font-semibold text-[#3A1352] whitespace-nowrap">
                {item.label}
              </span>
            </div>
          )}
        />
      </section>

      {/* COMPACT CENTRED BOOKING MODAL POPUP (OPENED ON "BOOK THIS EXPERIENCE" CLICK) */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        experience={selectedExperience}
        selectedFormat={selectedFormat}
        onFormatChange={setSelectedFormat}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        calendarOpen={calendarOpen}
        onToggleCalendar={() => setCalendarOpen((prev) => !prev)}
        calendarMonth={calendarMonth}
        onChangeCalendarMonth={setCalendarMonth}
        calendarDays={calendarDays}
        isDateDisabled={isDateDisabled}
        allSlotsForDate={allSlotsForDate}
        bookedSlotsForSelectedDate={bookedSlotsForSelectedDate}
        selectedTimeSlot={selectedTimeSlot}
        onSelectTimeSlot={setSelectedTimeSlot}
        customerName={customerName}
        onCustomerNameChange={setCustomerName}
        phoneCountryCode={phoneCountryCode}
        onPhoneCountryCodeChange={setPhoneCountryCode}
        customerPhone={customerPhone}
        onCustomerPhoneChange={setCustomerPhone}
        customerEmail={customerEmail}
        onCustomerEmailChange={setCustomerEmail}
        specialRequests={specialRequests}
        onSpecialRequestsChange={setSpecialRequests}
        paymentMethod={paymentMethod}
        onPaymentMethodChange={setPaymentMethod}
        fieldErrors={fieldErrors}
        submitting={submitting}
        submitError={submitError}
        staticBookingNotice={staticBookingNotice}
        availability={availability}
        settings={settings}
        onNavigate={onNavigate}
        onSubmit={handleConfirmBooking}
        formatReadableDate={formatReadableDate}
        calculateEndTime={calculateEndTime}
      />
    </div>
  );
}
