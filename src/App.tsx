import React, {useState, useEffect, useCallback} from 'react';
import {Footer} from './components/Footer';
import {ExperienceDetailModal} from './components/ExperienceDetailModal';
import {RetreatDetailModal} from './components/RetreatDetailModal';
import {HomePage} from './pages/HomePage';
import {ExperiencesPage} from './pages/ExperiencesPage';
import {RetreatsPage} from './pages/RetreatsPage';
import {AboutPage} from './pages/AboutPage';
import {ContactPage} from './pages/ContactPage';
import {BookSessionPage} from './pages/BookSessionPage';
import {AdminPage} from './pages/AdminPage';
import type {
  AvailabilityConfig,
  Booking,
  EnquiryType,
  Experience,
  PageRoute,
  PublicBootstrapData,
  Retreat,
  Testimonial,
  UpcomingRetreatBatch,
  WebsiteSettings,
} from './types';

const PAGE_TITLES: Record<PageRoute, string> = {
  home: 'SoundWithin — Return to Your Inner Frequency | Sound Healing & Retreats',
  experiences: 'Healing Experiences — SoundWithin | Sound Baths & Guided Meditation',
  retreats: 'Immersive Healing Retreats — SoundWithin | Nature-Based Retreats',
  about: 'About Us — The Story Behind SoundWithin',
  contact: "Contact Us — Let's Connect | SoundWithin",
  book: 'Book a Session — Reserve Your Healing Experience | SoundWithin',
  admin: 'Admin Management Portal — SoundWithin',
};

const FALLBACK_SETTINGS: WebsiteSettings = {
  phoneDisplay: '+91 98765 43210 (Placeholder – Configure in Admin)',
  whatsappNumber: '',
  isContactConfigured: false,
  emailDisplay: 'hello@soundwithin.in (Placeholder – Configure in Admin)',
  locationPrimary: 'Western Ghats, Maharashtra',
  locationSecondary: '(Retreat Venue – details shared upon booking)',
  socialLinks: {
    instagram: '',
    youtube: '',
    spotify: '',
    community: '',
  },
  founderHeadline: 'THE HEART BEHIND SOUNDWITHIN',
  founderBioShort:
    'A sound healing practitioner, meditation guide and lifelong seeker of self-awareness. My journey began with a personal quest for healing and balance, which later evolved into a deeper calling — to create a safe, nature-connected space for others to heal, reflect and transform.',
  founderBioExtended: [
    '[Editable Founder Biography Placeholder — Update via Admin Panel]',
    'SoundWithin was founded with a single heartfelt intention: to offer a serene, authentic space where individuals can pause from the noise of modern life and return to their natural inner frequency.',
  ],
  founderNoteLabel: 'Editable Founder Profile (Configure verified details in Admin)',
  allowBookingWithoutAdvancePayment: true,
  razorpayConfigured: false,
  razorpayKeyIdPublic: '',
  emailIntegrationConfigured: false,
};

const FALLBACK_AVAILABILITY: AvailabilityConfig = {
  isDemoAvailability: true,
  defaultTimeSlots: ['10:00 AM', '12:00 PM', '3:00 PM', '5:00 PM', '7:00 PM'],
  customDateSlots: {},
  blockedDates: [],
  closedWeekdays: [],
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [retreats, setRetreats] = useState<Retreat[]>([]);
  const [upcomingRetreats, setUpcomingRetreats] = useState<
    UpcomingRetreatBatch[]
  >([]);
  const [availability, setAvailability] = useState<AvailabilityConfig>(
    FALLBACK_AVAILABILITY
  );
  const [bookedSlotsByDate, setBookedSlotsByDate] = useState<
    Record<string, string[]>
  >({});
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [settings, setSettings] = useState<WebsiteSettings>(FALLBACK_SETTINGS);
  const [loadingBootstrap, setLoadingBootstrap] = useState<boolean>(true);

  // Detail Modals state
  const [detailExperience, setDetailExperience] = useState<Experience | null>(
    null
  );
  const [detailRetreat, setDetailRetreat] = useState<Retreat | null>(null);

  // Pre-selection state when jumping to Book or Contact page
  const [preselectedExpId, setPreselectedExpId] = useState<string | null>(null);
  const [preselectedFormat, setPreselectedFormat] = useState<string | null>(
    null
  );
  const [preselectedInquiryType, setPreselectedInquiryType] =
    useState<EnquiryType | null>(null);
  const [preselectedSubjectNote, setPreselectedSubjectNote] =
    useState<string>('');

  const fetchBootstrapData = useCallback(async () => {
    try {
      const res = await fetch('/api/bootstrap');
      if (!res.ok) return;
      const data = (await res.json()) as PublicBootstrapData;
      setExperiences(data.experiences || []);
      setRetreats(data.retreats || []);
      setUpcomingRetreats(data.upcomingRetreats || []);
      if (data.availability) setAvailability(data.availability);
      setBookedSlotsByDate(data.bookedSlotsByDate || {});
      setTestimonials(data.testimonials || []);
      if (data.settings) setSettings(data.settings);
    } catch {
      // Keep fallback state if server is starting
    } finally {
      setLoadingBootstrap(false);
    }
  }, []);

  useEffect(() => {
    fetchBootstrapData();
  }, [fetchBootstrapData]);

  // Sync page title & scroll to top on navigation
  const handleNavigate = useCallback((page: PageRoute) => {
    setCurrentPage(page);
    document.title = PAGE_TITLES[page] || PAGE_TITLES.home;
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);

  const handleBookExperienceFromModal = (
    experienceId: string,
    preferredFormat?: string
  ) => {
    setDetailExperience(null);
    setPreselectedExpId(experienceId);
    setPreselectedFormat(preferredFormat || null);
    handleNavigate('book');
  };

  const handleBookRetreatSession = () => {
    setDetailRetreat(null);
    const natureRetreatExp = experiences.find(
      (e) => e.id === 'exp-nature-retreat'
    );
    if (natureRetreatExp) {
      setPreselectedExpId(natureRetreatExp.id);
    }
    handleNavigate('book');
  };

  const handleEnquireRetreat = (retreatName: string) => {
    setDetailRetreat(null);
    setPreselectedInquiryType('Retreats');
    setPreselectedSubjectNote(
      `Namaste, I would like to receive schedule and booking details for the ${retreatName}.`
    );
    handleNavigate('contact');
  };

  const handleBookingCreated = (
    _booking: Booking,
    updatedBookedSlots: Record<string, string[]>
  ) => {
    setBookedSlotsByDate(updatedBookedSlots);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7FD] text-[#2A123F]">
      <main className="flex-1">
        {loadingBootstrap && experiences.length === 0 ? (
          <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center">
            <div className="w-12 h-12 rounded-full border-3 border-[#DEC9F2] border-t-[#4B1664] animate-spin mb-4" />
            <p className="font-serif-display text-2xl text-[#3A1352]">
              Entering SoundWithin Sanctuary...
            </p>
          </div>
        ) : (
          <>
            {currentPage === 'home' && (
              <HomePage
                onNavigate={handleNavigate}
                experiences={experiences}
                retreats={retreats}
                testimonials={testimonials}
                onOpenExperienceDetail={(exp) => setDetailExperience(exp)}
                onOpenRetreatDetail={(ret) => setDetailRetreat(ret)}
              />
            )}

            {currentPage === 'experiences' && (
              <ExperiencesPage
                onNavigate={handleNavigate}
                experiences={experiences}
                onOpenExperienceDetail={(exp) => setDetailExperience(exp)}
              />
            )}

            {currentPage === 'retreats' && (
              <RetreatsPage
                onNavigate={handleNavigate}
                retreats={retreats}
                upcomingRetreats={upcomingRetreats}
                onOpenRetreatDetail={(ret) => setDetailRetreat(ret)}
              />
            )}

            {currentPage === 'about' && (
              <AboutPage onNavigate={handleNavigate} settings={settings} />
            )}

            {currentPage === 'contact' && (
              <ContactPage
                onNavigate={handleNavigate}
                settings={settings}
                preselectedInquiryType={preselectedInquiryType}
                preselectedSubjectNote={preselectedSubjectNote}
              />
            )}

            {currentPage === 'book' && (
              <BookSessionPage
                onNavigate={handleNavigate}
                experiences={experiences}
                availability={availability}
                bookedSlotsByDate={bookedSlotsByDate}
                settings={settings}
                initialExperienceId={preselectedExpId}
                initialFormat={preselectedFormat}
                onBookingCreated={handleBookingCreated}
              />
            )}

            {currentPage === 'admin' && (
              <AdminPage
                onNavigate={handleNavigate}
                onRefreshPublicData={fetchBootstrapData}
              />
            )}
          </>
        )}
      </main>

      {/* Shared Complete Footer */}
      <Footer
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onSelectExperienceForBooking={(expId) => {
          setPreselectedExpId(expId);
          handleNavigate('book');
        }}
        experiences={experiences}
        settings={settings}
      />

      {/* Dedicated Experience Detail View Modal */}
      <ExperienceDetailModal
        experience={detailExperience}
        onClose={() => setDetailExperience(null)}
        onBookExperience={handleBookExperienceFromModal}
      />

      {/* Dedicated Retreat Detail View Modal */}
      <RetreatDetailModal
        retreat={detailRetreat}
        onClose={() => setDetailRetreat(null)}
        onBookRetreatSession={handleBookRetreatSession}
        onEnquireRetreat={handleEnquireRetreat}
      />
    </div>
  );
}
