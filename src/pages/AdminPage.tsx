import React, {useState, useEffect} from 'react';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Lock,
  LogOut,
  Mail,
  RefreshCw,
  Save,
  Settings,
  ShieldCheck,
  Sparkles,
  Tent,
} from 'lucide-react';
import {Navbar} from '../components/Navbar';
import type {
  AvailabilityConfig,
  Booking,
  BookingStatus,
  Enquiry,
  Experience,
  PageRoute,
  Retreat,
  UpcomingRetreatBatch,
  WebsiteSettings,
} from '../types';

interface AdminPageProps {
  onNavigate: (page: PageRoute) => void;
  onRefreshPublicData: () => Promise<void>;
}

type AdminTab =
  | 'bookings'
  | 'enquiries'
  | 'experiences'
  | 'retreats'
  | 'availability'
  | 'settings';

export function AdminPage({onNavigate, onRefreshPublicData}: AdminPageProps) {
  const [token, setToken] = useState<string | null>(() =>
    sessionStorage.getItem('sw_admin_token')
  );
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<AdminTab>('bookings');
  const [statusToast, setStatusToast] = useState<string | null>(null);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [retreats, setRetreats] = useState<Retreat[]>([]);
  const [upcomingRetreats, setUpcomingRetreats] = useState<
    UpcomingRetreatBatch[]
  >([]);
  const [availability, setAvailability] = useState<AvailabilityConfig | null>(
    null
  );
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);

  const [slotsText, setSlotsText] = useState('');
  const [blockedDatesText, setBlockedDatesText] = useState('');

  const showToast = (msg: string) => {
    setStatusToast(msg);
    setTimeout(() => setStatusToast(null), 4000);
  };

  const fetchDashboard = async (adminToken: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/dashboard', {
        headers: {Authorization: `Bearer ${adminToken}`},
      });
      if (res.status === 401) {
        sessionStorage.removeItem('sw_admin_token');
        setToken(null);
        return;
      }
      const data = await res.json();
      setBookings(data.bookings || []);
      setEnquiries(data.enquiries || []);
      setExperiences(data.experiences || []);
      setRetreats(data.retreats || []);
      setUpcomingRetreats(data.upcomingRetreats || []);
      setAvailability(data.availability || null);
      if (data.availability) {
        setSlotsText((data.availability.defaultTimeSlots || []).join(', '));
        setBlockedDatesText((data.availability.blockedDates || []).join(', '));
      }
      setSettings(data.settings || null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboard(token);
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({password}),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error || 'Login failed');
        return;
      }
      sessionStorage.setItem('sw_admin_token', data.token);
      setToken(data.token);
      setPassword('');
    } catch {
      setLoginError('Network error while signing in.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (token) {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: {Authorization: `Bearer ${token}`},
      }).catch(() => {});
    }
    sessionStorage.removeItem('sw_admin_token');
    setToken(null);
  };

  const handleBookingStatusChange = async (
    bookingId: string,
    newStatus: BookingStatus
  ) => {
    if (!token) return;
    const res = await fetch(`/api/admin/bookings/${bookingId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({status: newStatus}),
    });
    if (res.ok) {
      const data = await res.json();
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? data.booking : b))
      );
      await onRefreshPublicData();
      showToast(`Booking status updated to ${newStatus}.`);
    }
  };

  const handleEnquiryStatusChange = async (
    enquiryId: string,
    newStatus: 'New' | 'Reviewed' | 'Replied'
  ) => {
    if (!token) return;
    const res = await fetch(`/api/admin/enquiries/${enquiryId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({status: newStatus}),
    });
    if (res.ok) {
      const data = await res.json();
      setEnquiries((prev) =>
        prev.map((e) => (e.id === enquiryId ? data.enquiry : e))
      );
      showToast('Enquiry status updated.');
    }
  };

  const handleSaveExperience = async (exp: Experience) => {
    if (!token) return;
    const res = await fetch(`/api/admin/experiences/${exp.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(exp),
    });
    if (res.ok) {
      await onRefreshPublicData();
      showToast(`Saved changes for ${exp.name}.`);
    }
  };

  const handleSaveRetreat = async (ret: Retreat) => {
    if (!token) return;
    const res = await fetch(`/api/admin/retreats/${ret.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ret),
    });
    if (res.ok) {
      await onRefreshPublicData();
      showToast(`Saved changes for ${ret.name}.`);
    }
  };

  const handleSaveUpcomingBatches = async () => {
    if (!token) return;
    const res = await fetch('/api/admin/upcoming-retreats', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({upcomingRetreats}),
    });
    if (res.ok) {
      await onRefreshPublicData();
      showToast('Saved upcoming retreat schedules.');
    }
  };

  const handleSaveAvailability = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !availability) return;
    const parsedSlots = slotsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const parsedBlocked = blockedDatesText
      .split(',')
      .map((s) => s.trim())
      .filter((s) => /^\d{4}-\d{2}-\d{2}$/.test(s));

    const res = await fetch('/api/admin/availability', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        defaultTimeSlots: parsedSlots,
        blockedDates: parsedBlocked,
        isDemoAvailability: availability.isDemoAvailability,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setAvailability(data.availability);
      await onRefreshPublicData();
      showToast('Session availability settings saved.');
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !settings) return;
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(settings),
    });
    if (res.ok) {
      const data = await res.json();
      setSettings(data.settings);
      await onRefreshPublicData();
      showToast('Website contact & founder settings saved.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7FD] text-[#2A123F]">
      {/* Dark Purple Top Bar Wrapper for Admin */}
      <div className="bg-gradient-to-r from-[#340E4B] via-[#4B1664] to-[#340E4B] pb-2">
        <Navbar currentPage="admin" onNavigate={onNavigate} />
      </div>

      <div className="layout-container py-10">
        {!token ? (
          /* ADMIN LOGIN CARD */
          <div className="max-w-[460px] mx-auto rounded-3xl bg-white border border-[#DEC9F2] shadow-xl p-8">
            <div className="w-12 h-12 rounded-2xl bg-[#EFE2FA] text-[#4B1664] flex items-center justify-center mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-serif-display text-3xl font-semibold text-[#2E1142] mb-1">
              Admin Management
            </h1>
            <p className="text-[14px] text-[#5B3A75] mb-6">
              Sign in to manage bookings, customer enquiries, session pricing,
              retreat schedules, availability, and sanctuary contact details.
            </p>

            {loginError && (
              <div className="mb-4 p-3 rounded-xl bg-[#FDF0F3] border border-[#E699AA] text-xs text-[#6E1A2C] flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#B32846]" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="admin-pass"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#4B2B63] mb-1.5"
                >
                  Administrator Password
                </label>
                <input
                  id="admin-pass"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 rounded-xl border border-[#C6A7E2] text-sm focus:outline-none focus:border-[#4B1664]"
                />
                <p className="text-[11.5px] text-[#6E4F87] mt-1.5">
                  Default password (unless overridden by <code>ADMIN_PASSWORD</code> env var):{' '}
                  <code className="font-mono bg-[#F3E8FC] px-1.5 py-0.5 rounded">
                    soundwithin-admin
                  </code>
                </p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-full bg-[#4B1664] hover:bg-[#3A0E50] text-white text-sm font-medium shadow-md transition-colors cursor-pointer"
              >
                {loading ? 'Authenticating...' : 'Sign In to Admin Portal'}
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN DASHBOARD */
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#5D237A] mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Protected Backend Administration</span>
                </div>
                <h1 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#2E1142]">
                  SoundWithin Management Portal
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => fetchDashboard(token)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C6A7E2] bg-white text-xs font-medium text-[#3A1352] hover:bg-[#F3E8FC] cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh</span>
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3A1352] text-white text-xs font-medium hover:bg-[#240B36] cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {statusToast && (
              <div className="mb-6 p-4 rounded-2xl bg-[#EBF9F1] border border-[#7AC79B] text-[#1A4D31] flex items-center gap-2.5 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#237A4B]" />
                <span>{statusToast}</span>
              </div>
            )}

            {/* Admin Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-[#DFC9F2] mb-8">
              {[
                {id: 'bookings', label: `Bookings (${bookings.length})`, icon: Calendar},
                {id: 'enquiries', label: `Enquiries (${enquiries.length})`, icon: Mail},
                {id: 'experiences', label: 'Manage Experiences & Prices', icon: Sparkles},
                {id: 'retreats', label: 'Manage Retreats & Schedules', icon: Tent},
                {id: 'availability', label: 'Session Availability', icon: Calendar},
                {id: 'settings', label: 'Website & Contact Settings', icon: Settings},
              ].map((t) => {
                const Icon = t.icon;
                const active = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTab(t.id as AdminTab)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium border transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#4B1664] text-white border-[#4B1664] shadow-sm'
                        : 'bg-white text-[#3A1352] border-[#C6A7E2] hover:bg-[#F3E8FC]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB 1: BOOKINGS */}
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                {bookings.length === 0 ? (
                  <div className="p-10 rounded-3xl bg-white border border-[#DEC9F2] text-center text-[#5B3A75]">
                    No session bookings have been placed yet.
                  </div>
                ) : (
                  bookings.map((b) => (
                    <div
                      key={b.id}
                      className="p-5 rounded-2xl bg-white border border-[#DEC9F2] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-[#EFE2FA] text-[#4B1664] tabular-nums">
                            {b.referenceCode}
                          </span>
                          <span className="font-serif-display text-xl font-semibold text-[#2E1142]">
                            {b.experienceName}
                          </span>
                          <span className="text-xs text-[#6B4A8C]">
                            ({b.duration} &bull; {b.sessionFormat})
                          </span>
                        </div>
                        <p className="text-sm font-medium text-[#4B1664]">
                          Date: {b.date} at {b.timeSlot} &bull; Fee: ₹
                          {b.amount.toLocaleString('en-IN')}
                        </p>
                        <p className="text-xs text-[#4A2B63]">
                          Customer: <strong>{b.customerName}</strong> | Phone:{' '}
                          {b.phoneCountryCode} {b.customerPhone} | Email:{' '}
                          {b.customerEmail}
                        </p>
                        {b.specialRequests && (
                          <p className="text-xs text-[#5B3A75] italic">
                            Special Request: &ldquo;{b.specialRequests}&rdquo;
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {(
                          [
                            'Pending',
                            'Confirmed',
                            'Completed',
                            'Cancelled',
                          ] as BookingStatus[]
                        ).map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => handleBookingStatusChange(b.id, st)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                              b.status === st
                                ? 'bg-[#4B1664] text-white border-[#4B1664]'
                                : 'bg-[#FAF6FE] text-[#3A1352] border-[#C6A7E2] hover:bg-[#EFE2FA]'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 2: ENQUIRIES */}
            {activeTab === 'enquiries' && (
              <div className="space-y-4">
                {enquiries.length === 0 ? (
                  <div className="p-10 rounded-3xl bg-white border border-[#DEC9F2] text-center text-[#5B3A75]">
                    No customer enquiries have been submitted yet.
                  </div>
                ) : (
                  enquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className="p-5 rounded-2xl bg-white border border-[#DEC9F2] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#EFE2FA] text-[#4B1664]">
                            {enq.inquiryType}
                          </span>
                          <span className="font-serif-display text-xl font-semibold text-[#2E1142]">
                            {enq.fullName}
                          </span>
                        </div>
                        <p className="text-xs text-[#5B3A75]">
                          Email: {enq.email} &bull; Phone:{' '}
                          {enq.phoneCountryCode} {enq.phone} &bull; Received:{' '}
                          {new Date(enq.createdAt).toLocaleString()}
                        </p>
                        <p className="text-sm text-[#2E1142] pt-1">
                          {enq.message}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {(['New', 'Reviewed', 'Replied'] as const).map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() =>
                              handleEnquiryStatusChange(enq.id, st)
                            }
                            className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                              enq.status === st
                                ? 'bg-[#4B1664] text-white border-[#4B1664]'
                                : 'bg-[#FAF6FE] text-[#3A1352] border-[#C6A7E2] hover:bg-[#EFE2FA]'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 3: EXPERIENCES & PRICING */}
            {activeTab === 'experiences' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {experiences.map((exp, idx) => (
                  <div
                    key={exp.id}
                    className="p-6 rounded-2xl bg-white border border-[#DEC9F2] space-y-3"
                  >
                    <h3 className="font-serif-display text-2xl font-semibold text-[#2E1142]">
                      {exp.name}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#5B3A75] mb-1">
                          Price (INR)
                        </label>
                        <input
                          type="number"
                          value={exp.price}
                          onChange={(e) => {
                            const updated = [...experiences];
                            updated[idx] = {
                              ...exp,
                              price: Number(e.target.value),
                            };
                            setExperiences(updated);
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-[#C6A7E2] text-sm tabular-nums"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#5B3A75] mb-1">
                          Duration Label
                        </label>
                        <input
                          type="text"
                          value={exp.duration}
                          onChange={(e) => {
                            const updated = [...experiences];
                            updated[idx] = {...exp, duration: e.target.value};
                            setExperiences(updated);
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-[#C6A7E2] text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#5B3A75] mb-1">
                        Short Description
                      </label>
                      <textarea
                        rows={2}
                        value={exp.shortDescription}
                        onChange={(e) => {
                          const updated = [...experiences];
                          updated[idx] = {
                            ...exp,
                            shortDescription: e.target.value,
                          };
                          setExperiences(updated);
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#C6A7E2] text-sm"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSaveExperience(exp)}
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#4B1664] text-white text-xs font-medium hover:bg-[#3A0E50] cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Experience</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 4: RETREATS & UPCOMING SCHEDULES */}
            {activeTab === 'retreats' && (
              <div className="space-y-8">
                {/* Upcoming Retreats Bar Editor */}
                <div className="p-6 rounded-2xl bg-white border border-[#DEC9F2] space-y-4">
                  <h3 className="font-serif-display text-2xl font-semibold text-[#2E1142]">
                    Upcoming Retreat Schedule Slots
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {upcomingRetreats.map((batch, i) => (
                      <div
                        key={batch.id}
                        className="p-4 rounded-xl bg-[#FAF6FE] border border-[#DEC9F2] space-y-2.5"
                      >
                        <input
                          type="text"
                          value={batch.retreatName}
                          onChange={(e) => {
                            const next = [...upcomingRetreats];
                            next[i] = {...batch, retreatName: e.target.value};
                            setUpcomingRetreats(next);
                          }}
                          placeholder="Retreat Name"
                          className="w-full px-3 py-1.5 rounded-lg border border-[#C6A7E2] text-sm font-medium bg-white"
                        />
                        <input
                          type="text"
                          value={batch.dateLabel}
                          onChange={(e) => {
                            const next = [...upcomingRetreats];
                            next[i] = {...batch, dateLabel: e.target.value};
                            setUpcomingRetreats(next);
                          }}
                          placeholder="Date Label"
                          className="w-full px-3 py-1.5 rounded-lg border border-[#C6A7E2] text-sm bg-white"
                        />
                        <input
                          type="text"
                          value={batch.locationLabel}
                          onChange={(e) => {
                            const next = [...upcomingRetreats];
                            next[i] = {...batch, locationLabel: e.target.value};
                            setUpcomingRetreats(next);
                          }}
                          placeholder="Location Label"
                          className="w-full px-3 py-1.5 rounded-lg border border-[#C6A7E2] text-sm bg-white"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveUpcomingBatches}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#4B1664] text-white text-xs font-medium hover:bg-[#3A0E50] cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Upcoming Schedules</span>
                  </button>
                </div>

                {/* Retreat Details Editor */}
                <div className="grid grid-cols-1 gap-6">
                  {retreats.map((ret, idx) => (
                    <div
                      key={ret.id}
                      className="p-6 rounded-2xl bg-white border border-[#DEC9F2] space-y-3"
                    >
                      <h3 className="font-serif-display text-2xl font-semibold text-[#2E1142]">
                        {ret.name} ({ret.badgeDuration})
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-[#5B3A75] mb-1">
                            Location Text
                          </label>
                          <input
                            type="text"
                            value={ret.locationPlaceholder}
                            onChange={(e) => {
                              const next = [...retreats];
                              next[idx] = {
                                ...ret,
                                locationPlaceholder: e.target.value,
                              };
                              setRetreats(next);
                            }}
                            className="w-full px-3 py-2 rounded-xl border border-[#C6A7E2] text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#5B3A75] mb-1">
                            Schedule Text
                          </label>
                          <input
                            type="text"
                            value={ret.schedulePlaceholder}
                            onChange={(e) => {
                              const next = [...retreats];
                              next[idx] = {
                                ...ret,
                                schedulePlaceholder: e.target.value,
                              };
                              setRetreats(next);
                            }}
                            className="w-full px-3 py-2 rounded-xl border border-[#C6A7E2] text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#5B3A75] mb-1">
                            Pricing Text
                          </label>
                          <input
                            type="text"
                            value={ret.pricingPlaceholder}
                            onChange={(e) => {
                              const next = [...retreats];
                              next[idx] = {
                                ...ret,
                                pricingPlaceholder: e.target.value,
                              };
                              setRetreats(next);
                            }}
                            className="w-full px-3 py-2 rounded-xl border border-[#C6A7E2] text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#5B3A75] mb-1">
                            Available Seats Text
                          </label>
                          <input
                            type="text"
                            value={ret.availableSeatsPlaceholder}
                            onChange={(e) => {
                              const next = [...retreats];
                              next[idx] = {
                                ...ret,
                                availableSeatsPlaceholder: e.target.value,
                              };
                              setRetreats(next);
                            }}
                            className="w-full px-3 py-2 rounded-xl border border-[#C6A7E2] text-sm"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSaveRetreat(ret)}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#4B1664] text-white text-xs font-medium hover:bg-[#3A0E50] cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Retreat Details</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: AVAILABILITY */}
            {activeTab === 'availability' && availability && (
              <form
                onSubmit={handleSaveAvailability}
                className="max-w-[680px] p-6 rounded-2xl bg-white border border-[#DEC9F2] space-y-4"
              >
                <h3 className="font-serif-display text-2xl font-semibold text-[#2E1142]">
                  Session Time Slots &amp; Blocked Dates
                </h3>
                <div>
                  <label className="block text-xs font-semibold text-[#5B3A75] mb-1">
                    Default Daily Time Slots (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={slotsText}
                    onChange={(e) => setSlotsText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#C6A7E2] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#5B3A75] mb-1">
                    Blocked Dates (YYYY-MM-DD, comma-separated)
                  </label>
                  <input
                    type="text"
                    value={blockedDatesText}
                    onChange={(e) => setBlockedDatesText(e.target.value)}
                    placeholder="2026-12-25, 2026-12-31"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#C6A7E2] text-sm"
                  />
                </div>
                <label className="flex items-center gap-2 text-sm text-[#2E1142] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={availability.isDemoAvailability}
                    onChange={(e) =>
                      setAvailability({
                        ...availability,
                        isDemoAvailability: e.target.checked,
                      })
                    }
                  />
                  <span>
                    Display &ldquo;Demo Availability Active&rdquo; label on
                    booking calendar
                  </span>
                </label>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#4B1664] text-white text-xs font-medium hover:bg-[#3A0E50] cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Availability Settings</span>
                </button>
              </form>
            )}

            {/* TAB 6: WEBSITE & CONTACT SETTINGS */}
            {activeTab === 'settings' && settings && (
              <form
                onSubmit={handleSaveSettings}
                className="max-w-[760px] p-6 rounded-2xl bg-white border border-[#DEC9F2] space-y-4"
              >
                <h3 className="font-serif-display text-2xl font-semibold text-[#2E1142]">
                  Sanctuary Contact Details &amp; Founder Profile
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#5B3A75] mb-1">
                      Displayed Phone / WhatsApp Text
                    </label>
                    <input
                      type="text"
                      value={settings.phoneDisplay}
                      onChange={(e) =>
                        setSettings({...settings, phoneDisplay: e.target.value})
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-[#C6A7E2] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#5B3A75] mb-1">
                      WhatsApp Business Number (e.g. 919876543210)
                    </label>
                    <input
                      type="text"
                      value={settings.whatsappNumber}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          whatsappNumber: e.target.value,
                        })
                      }
                      placeholder="Leave empty until verified"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#C6A7E2] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#5B3A75] mb-1">
                      Displayed Email Address
                    </label>
                    <input
                      type="text"
                      value={settings.emailDisplay}
                      onChange={(e) =>
                        setSettings({...settings, emailDisplay: e.target.value})
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-[#C6A7E2] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#5B3A75] mb-1">
                      Primary Location Label
                    </label>
                    <input
                      type="text"
                      value={settings.locationPrimary}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          locationPrimary: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-[#C6A7E2] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5B3A75] mb-1">
                    Founder Short Biography (About Us Page)
                  </label>
                  <textarea
                    rows={3}
                    value={settings.founderBioShort}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        founderBioShort: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-[#C6A7E2] text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#4B1664] text-white text-xs font-medium hover:bg-[#3A0E50] cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Website Settings</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
