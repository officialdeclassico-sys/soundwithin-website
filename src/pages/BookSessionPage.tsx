import React, {useState, useEffect, useMemo, useRef} from 'react';
import {
  AlertCircle,
  Calendar as CalendarIcon,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  User,
} from 'lucide-react';
import {HeroBanner} from '../components/HeroBanner';
import {BookExperienceCard} from '../components/BookExperienceCard';
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
  // Default selected experience: first experience or initialExperienceId
  const [selectedExpId, setSelectedExpId] = useState<string>(
    initialExperienceId || experiences[0]?.id || 'exp-sound-healing'
  );

  const selectedExperience = useMemo(
    () =>
      experiences.find((e) => e.id === selectedExpId) ||
      experiences[0],
    [experiences, selectedExpId]
  );

  const [selectedFormat, setSelectedFormat] = useState<string>(
    initialFormat ||
      (selectedExperience?.availableFormats.includes('In-Person')
        ? 'In-Person'
        : selectedExperience?.availableFormats[0]) ||
      'In-Person'
  );

  // Per-card format state so each card's In-Person / Online toggle is independently interactive
  const [cardFormats, setCardFormats] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    for (const exp of experiences) {
      map[exp.id] = exp.availableFormats.includes('In-Person')
        ? 'In-Person'
        : exp.availableFormats[0] || 'In-Person';
    }
    if (initialExperienceId && initialFormat) {
      map[initialExperienceId] = initialFormat;
    }
    return map;
  });

  const bookingFormRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setCardFormats((prev) => {
      const next = {...prev};
      for (const exp of experiences) {
        if (!next[exp.id] || !exp.availableFormats.includes(next[exp.id])) {
          next[exp.id] = exp.availableFormats.includes('In-Person')
            ? 'In-Person'
            : exp.availableFormats[0] || 'In-Person';
        }
      }
      return next;
    });
  }, [experiences]);

  useEffect(() => {
    if (initialExperienceId) {
      setSelectedExpId(initialExperienceId);
    }
  }, [initialExperienceId]);

  useEffect(() => {
    if (selectedExperience) {
      if (
        initialFormat &&
        selectedExperience.availableFormats.includes(initialFormat)
      ) {
        setSelectedFormat(initialFormat);
        setCardFormats((prev) => ({
          ...prev,
          [selectedExperience.id]: initialFormat,
        }));
      } else if (!selectedExperience.availableFormats.includes(selectedFormat)) {
        const fallback = selectedExperience.availableFormats.includes('In-Person')
          ? 'In-Person'
          : selectedExperience.availableFormats[0] || 'In-Person';
        setSelectedFormat(fallback);
      }
    }
  }, [selectedExperience, initialFormat]);

  const handleCardFormatChange = (experienceId: string, format: string) => {
    const exp = experiences.find((e) => e.id === experienceId);
    if (!exp || !exp.availableFormats.includes(format)) return;
    setCardFormats((prev) => ({
      ...prev,
      [experienceId]: format,
    }));
    if (experienceId === selectedExperience?.id) {
      setSelectedFormat(format);
    }
  };

  const handleBookExperienceCardClick = (
    exp: Experience,
    chosenFormat: string
  ) => {
    const validFormat = exp.availableFormats.includes(chosenFormat)
      ? chosenFormat
      : exp.availableFormats[0] || 'In-Person';
    setSelectedExpId(exp.id);
    setSelectedFormat(validFormat);
    setCardFormats((prev) => ({
      ...prev,
      [exp.id]: validFormat,
    }));
    if (bookingFormRef.current) {
      bookingFormRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

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
  }, [selectedDate, allSlotsForDate, bookedSlotsForSelectedDate]);

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
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(
    null
  );
  const [paymentWarning, setPaymentWarning] = useState<string | null>(null);

  // Compute current active step (1, 2, or 3) for visual progress bar
  const currentStep = useMemo(() => {
    if (customerName.trim() || customerPhone.trim() || customerEmail.trim()) {
      return 3;
    }
    if (selectedDate && selectedTimeSlot) {
      return 2;
    }
    return 1;
  }, [customerName, customerPhone, customerEmail, selectedDate, selectedTimeSlot]);

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

    if (!validateBookingForm()) return;

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

      setConfirmedBooking(savedBooking);
    } catch {
      setSubmitError('Network error while saving booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const bottomTrustItems = [
    {
      icon: <LotusLineIcon className="w-9 h-8 text-[#5D237A]" />,
      label: 'Personalised Sessions',
    },
    {
      icon: <SproutLeafIcon className="w-8 h-8 text-[#5D237A]" />,
      label: 'Safe & Supportive Space',
    },
    {
      icon: <ZenStonesIcon className="w-8 h-8 text-[#5D237A]" />,
      label: 'Experienced Guidance',
    },
    {
      icon: <InfinityLineIcon className="w-9 h-8 text-[#5D237A]" />,
      label: 'Holistic Well-Being',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7FD] text-[#2A123F]">
      {/* HERO SECTION */}
      <HeroBanner
        currentPage="book"
        onNavigate={onNavigate}
        variant="pink-lantern"
        kicker="BOOK A SESSION"
        titleLines={['RESERVE YOUR', 'HEALING EXPERIENCE']}
        description="Choose a session, pick a time and begin your journey towards balance, clarity and inner peace."
        showCalendarIconOnNavCta={true}
      />

      {/* 3-STEP PROGRESS BAR */}
      <section className="pt-6 pb-4 bg-[#FAF7FD]">
        <div className="layout-container">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            {/* Step 1 Pill */}
            <div
              className={`flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full border text-[13px] sm:text-[14px] font-semibold transition-all shadow-xs ${
                currentStep >= 1
                  ? 'bg-white border-[#C8A8E8] text-[#2E1142]'
                  : 'bg-[#F3EAFB] border-[#DEC8F2] text-[#6E4F87]'
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-[#4B1664] text-white text-xs flex items-center justify-center font-bold tabular-nums">
                1
              </span>
              <span className="whitespace-nowrap">Choose Experience</span>
            </div>

            <div className="hidden sm:block w-12 md:w-20 h-[1px] bg-[#C8A8E8]" />

            {/* Step 2 Pill */}
            <div
              className={`flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full border text-[13px] sm:text-[14px] font-medium transition-all shadow-xs ${
                currentStep >= 2
                  ? 'bg-white border-[#5D237A] text-[#2E1142]'
                  : 'bg-[#F6F0FC] border-[#DEC8F2] text-[#5B3D73]'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-semibold tabular-nums border ${
                  currentStep >= 2
                    ? 'bg-[#4B1664] text-white border-[#4B1664]'
                    : 'bg-white text-[#4B1664] border-[#8D5BB0]'
                }`}
              >
                2
              </span>
              <span className="whitespace-nowrap">Select Date &amp; Time</span>
            </div>

            <div className="hidden sm:block w-12 md:w-20 h-[1px] bg-[#C8A8E8]" />

            {/* Step 3 Pill */}
            <div
              className={`flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full border text-[13px] sm:text-[14px] font-medium transition-all shadow-xs ${
                currentStep >= 3
                  ? 'bg-white border-[#5D237A] text-[#2E1142]'
                  : 'bg-[#F6F0FC] border-[#DEC8F2] text-[#5B3D73]'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-semibold tabular-nums border ${
                  currentStep >= 3
                    ? 'bg-[#4B1664] text-white border-[#4B1664]'
                    : 'bg-white text-[#4B1664] border-[#8D5BB0]'
                }`}
              >
                3
              </span>
              <span className="whitespace-nowrap">Your Details</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN BOOKING WORKSPACE OR CONFIRMATION SCREEN */}
      <section className="py-8 sm:py-12 bg-[#FAF7FD]">
        <div className="layout-container">
          {confirmedBooking ? (
            /* BOOKING CONFIRMATION VIEW */
            <div className="max-w-[760px] mx-auto rounded-[30px] bg-gradient-to-b from-white to-[#F4ECFC] border-2 border-[#6B2D8F] shadow-[0_16px_48px_rgba(75,22,100,0.16)] p-7 sm:p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-[#4B1664] text-white flex items-center justify-center mx-auto mb-5 shadow-lg">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#5D237A] mb-1">
                Booking Confirmed &amp; Saved
              </p>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#2E1142] mb-2">
                We Look Forward to Welcoming You
              </h2>
              <p className="text-[14.5px] text-[#4A2B63] max-w-[520px] mx-auto mb-6">
                Your session has been reserved in our schedule. Please keep your
                unique booking reference for your records.
              </p>

              {/* Unique Reference Badge */}
              <div className="inline-block px-6 py-3 rounded-2xl bg-[#EFE2FA] border border-[#C6A1E6] mb-6">
                <span className="text-xs uppercase tracking-wider text-[#5B3A75] block">
                  Booking Reference
                </span>
                <span className="font-mono text-2xl font-bold text-[#3A1352] tracking-wider tabular-nums">
                  {confirmedBooking.referenceCode}
                </span>
              </div>

              {paymentWarning && (
                <div className="mb-6 p-4 rounded-2xl bg-[#FFF8EB] border border-[#E5C07B] text-left text-[13px] text-[#5E400D] flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#B87D14]" />
                  <span>{paymentWarning}</span>
                </div>
              )}

              {/* Summary Table */}
              <div className="text-left rounded-2xl bg-white border border-[#DEC9F2] p-5 sm:p-6 mb-7 space-y-3 text-[14px]">
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

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setConfirmedBooking(null);
                    setCustomerName('');
                    setCustomerPhone('');
                    setCustomerEmail('');
                    setSpecialRequests('');
                  }}
                  className="px-7 py-3 rounded-full border border-[#5D237A] text-[#3A1352] hover:bg-[#EFE2FA] text-sm font-medium transition-colors cursor-pointer text-center"
                >
                  Book Another Session
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="px-8 py-3 rounded-full bg-[#4B1664] hover:bg-[#3A0E50] text-white text-sm font-medium shadow-md transition-colors cursor-pointer text-center"
                >
                  Return to Home
                </button>
              </div>
            </div>
          ) : (
            /* SIX-CARD EXPERIENCE COLLECTION + EXISTING BOOKING WORKFLOW */
            <div className="space-y-12 lg:space-y-14">
              {/* 1. CHOOSE YOUR EXPERIENCE — 6-CARD RESPONSIVE GRID (Desktop 3x2, Tablet 2x3, Mobile 1x6) */}
              <div>
                <h2 className="font-serif-display text-[28px] sm:text-[34px] font-medium uppercase tracking-[0.04em] text-[#321048] mb-6">
                  CHOOSE YOUR EXPERIENCE
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                  {experiences.map((exp) => {
                    const cardFormat =
                      cardFormats[exp.id] ||
                      (exp.availableFormats.includes('In-Person')
                        ? 'In-Person'
                        : exp.availableFormats[0] || 'In-Person');

                    return (
                      <BookExperienceCard
                        key={exp.id}
                        experience={exp}
                        selectedFormat={cardFormat}
                        isSelectedExperience={exp.id === selectedExperience?.id}
                        onFormatChange={handleCardFormatChange}
                        onBookExperience={handleBookExperienceCardClick}
                      />
                    );
                  })}
                </div>
              </div>

              {/* 2. YOUR BOOKING FORM PANEL — CONNECTED TO SELECTED EXPERIENCE & FORMAT */}
              <div
                ref={bookingFormRef}
                id="your-booking-section"
                className="max-w-[780px] mx-auto scroll-mt-6"
              >
                <form
                  onSubmit={handleConfirmBooking}
                  noValidate
                  className="rounded-[28px] bg-gradient-to-b from-[#FAF6FE] via-[#F7F0FC] to-[#EFE4FA] border border-[#D8C0EE] shadow-[0_14px_40px_rgba(75,22,100,0.12)] p-6 sm:p-8 space-y-5"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="font-sans-body text-[14px] font-bold uppercase tracking-[0.22em] text-[#2E1142]">
                      YOUR BOOKING
                    </h2>
                    <span className="font-serif-display text-xl font-bold text-[#4B1664] tabular-nums">
                      ₹{selectedExperience?.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Selected Experience Mini Card */}
                  {selectedExperience && (
                    <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/90 border border-[#DEC9F2]">
                      <img
                        src={selectedExperience.image}
                        alt={selectedExperience.name}
                        referrerPolicy="no-referrer"
                        className="w-24 h-16 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-serif-display text-[20px] font-semibold text-[#2E1142] truncate">
                          {selectedExperience.name}
                        </h3>
                        <p className="text-[12.5px] text-[#432359] flex items-center gap-1.5 mt-0.5">
                          <Clock className="w-3.5 h-3.5 text-[#5D237A] shrink-0" />
                          <span>
                            {selectedExperience.duration} &bull;{' '}
                            {selectedFormat}
                          </span>
                        </p>
                        {/* Format Switcher if multiple formats exist */}
                        {selectedExperience.availableFormats.length > 1 && (
                          <div className="flex items-center gap-1.5 mt-2">
                            {selectedExperience.availableFormats.map((fmt) => (
                              <button
                                key={fmt}
                                type="button"
                                onClick={() => {
                                  setSelectedFormat(fmt);
                                  setCardFormats((prev) => ({
                                    ...prev,
                                    [selectedExperience.id]: fmt,
                                  }));
                                }}
                                className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border transition-colors cursor-pointer ${
                                  selectedFormat === fmt
                                    ? 'bg-[#4B1664] text-white border-[#4B1664]'
                                    : 'bg-[#F5ECFC] text-[#4B1664] border-[#C8A8E8] hover:bg-[#E7D4F7]'
                                }`}
                              >
                                {fmt}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 2A: SELECT DATE */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="flex items-center gap-2 text-[14.5px] font-semibold text-[#2E1142]">
                        <CalendarIcon className="w-4 h-4 text-[#5D237A]" />
                        <span>Select Date</span>
                      </label>
                      {availability.isDemoAvailability && (
                        <span className="text-[11px] text-[#6B2D8F] font-medium">
                          Demo Availability Active
                        </span>
                      )}
                    </div>

                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setCalendarOpen(!calendarOpen)}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#C6A7E2] hover:border-[#5D237A] text-left flex items-center justify-between text-[14px] text-[#2E1142] cursor-pointer shadow-2xs"
                      >
                        <span>
                          {selectedDate
                            ? formatReadableDate(selectedDate)
                            : 'Choose a date'}
                        </span>
                        <CalendarIcon className="w-4 h-4 text-[#5D237A]" />
                      </button>

                      {/* Interactive Dropdown Calendar */}
                      {calendarOpen && (
                        <div className="mt-2 p-4 rounded-2xl bg-white border border-[#C8A8E8] shadow-xl">
                          <div className="flex items-center justify-between mb-3">
                            <button
                              type="button"
                              onClick={() =>
                                setCalendarMonth(
                                  new Date(
                                    calendarMonth.getFullYear(),
                                    calendarMonth.getMonth() - 1,
                                    1
                                  )
                                )
                              }
                              aria-label="Previous month"
                              className="p-1.5 rounded-lg hover:bg-[#F3E8FC] text-[#4B1664] cursor-pointer"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="font-serif-display text-lg font-semibold text-[#2E1142]">
                              {calendarMonth.toLocaleDateString('en-US', {
                                month: 'long',
                                year: 'numeric',
                              })}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setCalendarMonth(
                                  new Date(
                                    calendarMonth.getFullYear(),
                                    calendarMonth.getMonth() + 1,
                                    1
                                  )
                                )
                              }
                              aria-label="Next month"
                              className="p-1.5 rounded-lg hover:bg-[#F3E8FC] text-[#4B1664] cursor-pointer"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-[#6E4F87] mb-1">
                            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(
                              (d) => (
                                <span key={d}>{d}</span>
                              )
                            )}
                          </div>

                          <div className="grid grid-cols-7 gap-1">
                            {calendarDays.map((cell, idx) => {
                              if (!cell) {
                                return <div key={`empty-${idx}`} />;
                              }
                              const disabled = isDateDisabled(
                                cell.ymd,
                                cell.dateObj
                              );
                              const isChosen = cell.ymd === selectedDate;
                              return (
                                <button
                                  key={cell.ymd}
                                  type="button"
                                  disabled={disabled}
                                  onClick={() => {
                                    setSelectedDate(cell.ymd);
                                    setCalendarOpen(false);
                                  }}
                                  className={`h-8 rounded-lg text-[12.5px] font-medium tabular-nums transition-colors ${
                                    disabled
                                      ? 'text-[#C5B4D4] bg-transparent cursor-not-allowed line-through'
                                      : isChosen
                                        ? 'bg-[#4B1664] text-white font-bold shadow-xs cursor-pointer'
                                        : 'text-[#2E1142] hover:bg-[#EFE2FA] cursor-pointer'
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

                  {/* STEP 2B: SELECT TIME */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <label className="flex items-center gap-2 text-[14.5px] font-semibold text-[#2E1142]">
                        <Clock className="w-4 h-4 text-[#5D237A]" />
                        <span>Select Time</span>
                      </label>
                      {selectedTimeSlot && selectedExperience && (
                        <span className="text-[11.5px] text-[#5B3A75] tabular-nums">
                          {selectedTimeSlot} &ndash;{' '}
                          {calculateEndTime(
                            selectedTimeSlot,
                            selectedExperience.durationMinutes
                          )}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-2.5">
                      {allSlotsForDate.map((slot) => {
                        const isBooked =
                          bookedSlotsForSelectedDate.includes(slot);
                        const isSelected = selectedTimeSlot === slot && !isBooked;
                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={isBooked}
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`py-2 px-3 rounded-full text-[12.5px] font-medium border transition-all tabular-nums whitespace-nowrap text-center ${
                              isBooked
                                ? 'bg-[#EDE6F2] text-[#9A85AD] border-[#D8C9E6] cursor-not-allowed line-through'
                                : isSelected
                                  ? 'bg-[#4B1664] text-white border-[#4B1664] shadow-[0_4px_12px_rgba(75,22,100,0.35)] cursor-pointer'
                                  : 'bg-white text-[#2E1142] border-[#C6A7E2] hover:border-[#4B1664] cursor-pointer'
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

                  {/* STEP 3: YOUR DETAILS */}
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center gap-2 text-[14.5px] font-semibold text-[#2E1142]">
                      <User className="w-4 h-4 text-[#5D237A]" />
                      <span>Your Details</span>
                    </div>

                    <div>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Full Name *"
                        aria-label="Full Name"
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#C6A7E2] text-[16px] sm:text-[13.5px] text-[#2E1142] placeholder-[#5B3D73] focus:outline-none focus:border-[#4B1664]"
                      />
                      {fieldErrors.customerName && (
                        <p className="text-xs text-[#A82040] mt-1">
                          {fieldErrors.customerName}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center rounded-xl bg-white border border-[#C6A7E2] focus-within:border-[#4B1664] overflow-hidden">
                        <div className="flex items-center gap-1 pl-3 pr-2 py-2.5 border-r border-[#E1CCF4] bg-[#F9F4FD]">
                          <span className="text-xs" aria-hidden="true">
                            🇮🇳
                          </span>
                          <select
                            aria-label="Phone country code"
                            value={phoneCountryCode}
                            onChange={(e) =>
                              setPhoneCountryCode(e.target.value)
                            }
                            className="bg-transparent text-[13px] font-medium text-[#2E1142] focus:outline-none cursor-pointer"
                          >
                            <option value="+91">+91</option>
                            <option value="+1">+1</option>
                            <option value="+44">+44</option>
                            <option value="+65">+65</option>
                          </select>
                        </div>
                        <input
                          type="tel"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="Phone Number *"
                          aria-label="Phone Number"
                          className="w-full px-3 py-2.5 bg-transparent text-[16px] sm:text-[13.5px] text-[#2E1142] placeholder-[#5B3D73] focus:outline-none"
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
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="Email Address *"
                        aria-label="Email Address"
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#C6A7E2] text-[16px] sm:text-[13.5px] text-[#2E1142] placeholder-[#5B3D73] focus:outline-none focus:border-[#4B1664]"
                      />
                      {fieldErrors.customerEmail && (
                        <p className="text-xs text-[#A82040] mt-1">
                          {fieldErrors.customerEmail}
                        </p>
                      )}
                    </div>

                    <div>
                      <textarea
                        rows={3}
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="Any specific request? (Optional)"
                        aria-label="Special Requests"
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#C6A7E2] text-[16px] sm:text-[13.5px] text-[#2E1142] placeholder-[#5B3D73] focus:outline-none focus:border-[#4B1664] resize-none scrollbar-hidden"
                      />
                    </div>

                    {/* Payment Option Toggle */}
                    <div className="pt-1">
                      <div className="grid grid-cols-2 gap-2 text-[12px]">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('pay_at_session')}
                          className={`py-2 px-3 rounded-xl border font-medium transition-colors cursor-pointer text-center ${
                            paymentMethod === 'pay_at_session'
                              ? 'bg-[#EFE2FA] border-[#5D237A] text-[#3A1352]'
                              : 'bg-white border-[#DEC9F2] text-[#6B4A8C]'
                          }`}
                        >
                          Reserve (Pay at Session)
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('razorpay')}
                          className={`py-2 px-3 rounded-xl border font-medium transition-colors cursor-pointer text-center ${
                            paymentMethod === 'razorpay'
                              ? 'bg-[#EFE2FA] border-[#5D237A] text-[#3A1352]'
                              : 'bg-white border-[#DEC9F2] text-[#6B4A8C]'
                          }`}
                        >
                          Razorpay Online{' '}
                          {!settings.razorpayConfigured && '(Setup Pending)'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Live Booking Summary Box */}
                  <div className="p-3.5 rounded-xl bg-white/80 border border-[#DEC9F2] text-[12.5px] text-[#3F2157] space-y-1">
                    <div className="flex items-center justify-between font-semibold text-[#2E1142]">
                      <span className="inline-flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#5D237A]" />
                        <span>Booking Summary</span>
                      </span>
                      <span className="tabular-nums">
                        ₹{selectedExperience?.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <p>
                      {selectedExperience?.name} ({selectedExperience?.duration}{' '}
                      &bull; {selectedFormat})
                    </p>
                    <p className="font-medium text-[#4B1664]">
                      {selectedDate
                        ? formatReadableDate(selectedDate)
                        : 'Select Date'}{' '}
                      {selectedTimeSlot ? `at ${selectedTimeSlot}` : ''}
                    </p>
                  </div>

                  {submitError && (
                    <div className="p-3 rounded-xl bg-[#FDF0F3] border border-[#E699AA] text-xs text-[#6E1A2C] flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#B32846]" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Confirm Booking Button — No decorative arrow */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#4B1664] via-[#5E207D] to-[#4B1664] hover:from-[#3A0E50] hover:to-[#4B1664] disabled:opacity-60 text-white font-sans-body text-[15px] font-medium flex items-center justify-center gap-2.5 shadow-[0_6px_20px_rgba(75,22,100,0.4)] transition-all cursor-pointer text-center"
                  >
                    <CalendarIcon className="w-4 h-4 text-[#E6CFF8]" />
                    <span>
                      {submitting ? 'Confirming Booking...' : 'Confirm Booking'}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* BOTTOM 4 TRUST PILLARS BAR */}
      <section className="py-12 bg-gradient-to-b from-[#FAF7FD] to-[#EADBF8] border-t border-[#E5D3F6]">
        <div className="layout-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8">
            {bottomTrustItems.map((item, idx) => (
              <div
                key={item.label}
                className={`flex flex-col items-center justify-center text-center px-4 ${
                  idx < bottomTrustItems.length - 1
                    ? 'lg:border-r lg:border-[#C5A3E0]'
                    : ''
                }`}
              >
                <div className="mb-2.5">{item.icon}</div>
                <span className="font-sans-body text-[14.5px] sm:text-[15.5px] font-semibold text-[#3A1352]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
