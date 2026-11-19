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
import {
  IS_STATIC_PRESENTATION,
  STATIC_AVAILABILITY,
  STATIC_EXPERIENCES,
  STATIC_RETREATS,
  STATIC_SETTINGS,
  STATIC_TESTIMONIALS,
  STATIC_UPCOMING_RETREATS,
} from './data/staticContent';
import {withBaseUrl} from './utils/assetUrl';
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
  experiences:
    'Healing Experiences — SoundWithin | Sound Baths & Guided Meditation',
  retreats: 'Immersive Healing Retreats — SoundWithin | Nature-Based Retreats',
  about: 'About Us — The Story Behind SoundWithin',
  contact: "Contact Us — Let's Connect | SoundWithin",
  book: 'Book a Session — Reserve Your Healing Experience | SoundWithin',
  admin: 'Admin Management Portal — SoundWithin',
};

const VALID_CUSTOMER_ROUTES: PageRoute[] = [
  'home',
  'experiences',
  'retreats',
  'about',
  'contact',
  'book',
];

function getRouteFromLocation(): PageRoute {
  if (typeof window === 'undefined') return 'home';
  const rawHash = window.location.hash.replace(/^#\/?/, '').trim().toLowerCase();
  if (rawHash === 'admin' && !IS_STATIC_PRESENTATION) {
    return 'admin';
  }
  if ((VALID_CUSTOMER_ROUTES as string[]).includes(rawHash)) {
    return rawHash as PageRoute;
  }
  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>(() =>
    getRouteFromLocation()
  );
  const [experiences, setExperiences] =
    useState<Experience[]>(STATIC_EXPERIENCES);
  const [retreats, setRetreats] = useState<Retreat[]>(STATIC_RETREATS);
  const [upcomingRetreats, setUpcomingRetreats] = useState<
    UpcomingRetreatBatch[]
  >(STATIC_UPCOMING_RETREATS);
  const [availability, setAvailability] =
    useState<AvailabilityConfig>(STATIC_AVAILABILITY);
  const [bookedSlotsByDate, setBookedSlotsByDate] = useState<
    Record<string, string[]>
  >({});
  const [testimonials, setTestimonials] =
    useState<Testimonial[]>(STATIC_TESTIMONIALS);
  const [settings, setSettings] = useState<WebsiteSettings>(STATIC_SETTINGS);
  const [loadingBootstrap, setLoadingBootstrap] = useState<boolean>(
    !IS_STATIC_PRESENTATION
  );

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
    if (IS_STATIC_PRESENTATION) {
      setLoadingBootstrap(false);
      return;
    }
    try {
      const res = await fetch('/api/bootstrap');
      if (!res.ok) return;
      const data = (await res.json()) as PublicBootstrapData;
      if (data.experiences?.length) {
        setExperiences(
          data.experiences.map((e) => ({...e, image: withBaseUrl(e.image)}))
        );
      }
      if (data.retreats?.length) {
        setRetreats(
          data.retreats.map((r) => ({...r, image: withBaseUrl(r.image)}))
        );
      }
      if (data.upcomingRetreats?.length) {
        setUpcomingRetreats(data.upcomingRetreats);
      }
      if (data.availability) setAvailability(data.availability);
      setBookedSlotsByDate(data.bookedSlotsByDate || {});
      if (data.testimonials?.length) setTestimonials(data.testimonials);
      if (data.settings) setSettings(data.settings);
    } catch {
      // Keep static fallback state if server is unreachable
    } finally {
      setLoadingBootstrap(false);
    }
  }, []);

  useEffect(() => {
    fetchBootstrapData();
  }, [fetchBootstrapData]);

  // Listen to hashchange for direct URL navigation, refresh, and browser back/forward on GitHub Pages
  useEffect(() => {
    const onHashChange = () => {
      const route = getRouteFromLocation();
      setCurrentPage(route);
      document.title = PAGE_TITLES[route] || PAGE_TITLES.home;
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Sync page title & URL hash & scroll to top on navigation
  const handleNavigate = useCallback((page: PageRoute) => {
    const targetPage: PageRoute =
      page === 'admin' && IS_STATIC_PRESENTATION ? 'home' : page;
    setCurrentPage(targetPage);
    document.title = PAGE_TITLES[targetPage] || PAGE_TITLES.home;
    const nextHash = targetPage === 'home' ? '#/' : `#/${targetPage}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash);
    }
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

            {!IS_STATIC_PRESENTATION && currentPage === 'admin' && (
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
