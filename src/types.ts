export type PageRoute =
  | 'home'
  | 'experiences'
  | 'retreats'
  | 'about'
  | 'contact'
  | 'book'
  | 'admin';

export interface Experience {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  durationMinutes: number;
  formatLabel: string;
  availableFormats: string[];
  iconType: 'soundwave' | 'lotus' | 'mandala' | 'crystal' | 'nature' | 'triskelion';
  image: string;
  price: number;
  currency: string;
  priceNote: string;
  objectives: string[];
  whatToExpect: string[];
  preparationInstructions: string[];
  isDurationCalendarBased?: boolean;
}

export interface RetreatFeature {
  icon: 'soundwave' | 'lotus' | 'leaf' | 'book' | 'meditate' | 'stones' | 'infinity';
  label: string;
}

export interface RetreatItineraryDay {
  day: string;
  title: string;
  activities: string[];
}

export interface Retreat {
  id: string;
  slug: string;
  name: string;
  badgeDuration: string;
  shortDescription: string;
  overview: string;
  image: string;
  features: RetreatFeature[];
  locationPlaceholder: string;
  schedulePlaceholder: string;
  itinerary: RetreatItineraryDay[];
  accommodationInfo: string;
  activities: string[];
  mealsAndInclusions: string[];
  exclusions: string[];
  pricingPlaceholder: string;
  priceAmount: number | null;
  availableSeatsPlaceholder: string;
  isPlaceholderData: boolean;
}

export interface UpcomingRetreatBatch {
  id: string;
  retreatId: string;
  retreatName: string;
  dateLabel: string;
  locationLabel: string;
  seatsLabel: string;
  isPlaceholder: boolean;
}

export type BookingStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
export type PaymentStatus = 'Unpaid' | 'Pending' | 'Paid' | 'Failed';

export interface Booking {
  id: string;
  referenceCode: string;
  experienceId: string;
  experienceName: string;
  duration: string;
  sessionFormat: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:00 AM"
  customerName: string;
  phoneCountryCode: string;
  customerPhone: string;
  customerEmail: string;
  specialRequests?: string;
  status: BookingStatus;
  paymentMethod: 'pay_at_session' | 'razorpay';
  paymentStatus: PaymentStatus;
  amount: number;
  currency: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  emailNotificationSent: boolean;
  createdAt: string;
}

export interface AvailabilityConfig {
  isDemoAvailability: boolean;
  defaultTimeSlots: string[];
  customDateSlots: Record<string, string[]>; // YYYY-MM-DD -> custom slots
  blockedDates: string[]; // YYYY-MM-DD
  closedWeekdays: number[]; // 0=Sun..6=Sat
}

export type EnquiryType =
  | 'Sound Healing'
  | 'Meditation'
  | 'Retreats'
  | 'Self-Awareness'
  | 'General Inquiry';

export interface Enquiry {
  id: string;
  fullName: string;
  email: string;
  phoneCountryCode: string;
  phone: string;
  inquiryType: EnquiryType;
  message: string;
  status: 'New' | 'Reviewed' | 'Replied';
  emailNotificationSent: boolean;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  experienceName: string;
  quote: string;
}

export interface WebsiteSettings {
  phoneDisplay: string;
  whatsappNumber: string;
  isContactConfigured: boolean;
  emailDisplay: string;
  locationPrimary: string;
  locationSecondary: string;
  socialLinks: {
    instagram: string;
    youtube: string;
    spotify: string;
    community: string;
  };
  founderHeadline: string;
  founderBioShort: string;
  founderBioExtended: string[];
  founderNoteLabel: string;
  allowBookingWithoutAdvancePayment: boolean;
  razorpayConfigured: boolean;
  razorpayKeyIdPublic: string;
  emailIntegrationConfigured: boolean;
}

export interface PublicBootstrapData {
  experiences: Experience[];
  retreats: Retreat[];
  upcomingRetreats: UpcomingRetreatBatch[];
  availability: AvailabilityConfig;
  bookedSlotsByDate: Record<string, string[]>;
  testimonials: Testimonial[];
  settings: WebsiteSettings;
}
