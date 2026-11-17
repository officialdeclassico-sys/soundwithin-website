import React, {useState, useEffect, useRef} from 'react';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Globe,
  Instagram,
  Mail,
  MapPin,
  MessageCircleQuestion,
  Music2,
  Phone,
  Youtube,
} from 'lucide-react';
import {HeroBanner} from '../components/HeroBanner';
import {LotusLineIcon} from '../components/BrandIcons';
import type {EnquiryType, PageRoute, WebsiteSettings} from '../types';

interface ContactPageProps {
  onNavigate: (page: PageRoute) => void;
  settings: WebsiteSettings;
  preselectedInquiryType?: EnquiryType | null;
  preselectedSubjectNote?: string;
}

const INQUIRY_OPTIONS: EnquiryType[] = [
  'Sound Healing',
  'Meditation',
  'Retreats',
  'Self-Awareness',
  'General Inquiry',
];

export function ContactPage({
  onNavigate,
  settings,
  preselectedInquiryType,
  preselectedSubjectNote,
}: ContactPageProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneCountryCode, setPhoneCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState<EnquiryType | ''>(
    preselectedInquiryType || ''
  );
  const [message, setMessage] = useState(preselectedSubjectNote || '');

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [socialNotice, setSocialNotice] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedInquiryType) {
      setInquiryType(preselectedInquiryType);
    }
    if (preselectedSubjectNote) {
      setMessage(preselectedSubjectNote);
    }
  }, [preselectedInquiryType, preselectedSubjectNote]);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name (at least 2 characters).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    const cleanPhone = phone.replace(/[\s\-()]/g, '');
    if (!/^\d{7,15}$/.test(cleanPhone)) {
      errors.phone = 'Please enter a valid phone number (7 to 15 digits).';
    }
    if (!inquiryType) {
      errors.inquiryType = 'Please select an inquiry topic.';
    }
    if (!message.trim() || message.trim().length < 10) {
      errors.message = 'Please enter a message of at least 10 characters.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phoneCountryCode,
          phone: phone.trim(),
          inquiryType,
          message: message.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || 'Could not submit your inquiry.');
      } else {
        setSubmitSuccess(
          data.message ||
            'Thank you for reaching out! Your message has been received.'
        );
        setFullName('');
        setEmail('');
        setPhone('');
        setInquiryType('');
        setMessage('');
        setFieldErrors({});
      }
    } catch {
      setSubmitError('Network error while sending message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsAppAction = () => {
    const rawNum = settings.whatsappNumber.replace(/\D/g, '');
    if (!rawNum) {
      setSocialNotice(
        'WhatsApp business number is currently set to a placeholder. Configure the verified WhatsApp number in the Admin Management portal to open live WhatsApp chat.'
      );
      return;
    }
    const url = `https://wa.me/${rawNum}?text=${encodeURIComponent(
      'Namaste SoundWithin, I would like to enquire about your healing sessions.'
    )}`;
    window.location.href = url;
  };

  const handleSocialClick = (platform: string, url: string) => {
    if (!url || !url.trim()) {
      setSocialNotice(
        `The ${platform} profile URL has not been configured yet. You can add the official ${platform} URL in the Admin Management portal.`
      );
      return;
    }
    window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-[#FAF7FD] text-[#2A123F]">
      {/* HERO SECTION */}
      <HeroBanner
        currentPage="contact"
        onNavigate={onNavigate}
        variant="brass-lantern"
        kicker="CONTACT US"
        titleLines={["LET'S", 'CONNECT']}
        description="Have a question, want to book a session or learn more about our retreats? We're here to support your healing journey."
      />

      {/* MAIN TWO-COLUMN CONTACT SECTION */}
      <section className="py-12 sm:py-16 bg-[#FAF7FD]">
        <div className="layout-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* LEFT COLUMN: GET IN TOUCH */}
            <div className="lg:col-span-5 lg:pr-10 lg:border-r lg:border-[#D9C2EE] space-y-6">
              <div>
                <p className="font-sans-body text-[11.5px] font-semibold uppercase tracking-[0.26em] text-[#3A1352] mb-2">
                  GET IN TOUCH
                </p>
                <h2 className="font-serif-display text-[32px] sm:text-[40px] font-medium uppercase tracking-[0.03em] leading-[1.15] text-[#321048]">
                  WE&rsquo;D LOVE
                  <span className="block">TO HEAR FROM YOU</span>
                </h2>
                <div className="w-12 h-[2px] bg-[#5D237A] mt-3.5 mb-4" />
                <p className="font-sans-body text-[15px] leading-[1.7] text-[#2E1442] max-w-[480px]">
                  Whether you&rsquo;re looking for a personal session, a
                  retreat, or simply have a question, feel free to reach out.
                  We&rsquo;ll get back to you soon.
                </p>
              </div>

              {/* Contact Items */}
              <div className="space-y-5 pt-1">
                {/* Call / WhatsApp */}
                <div className="flex items-start gap-4">
                  <button
                    type="button"
                    onClick={handleWhatsAppAction}
                    className="w-12 h-12 rounded-2xl bg-[#EAE0F6] border border-[#D4B8EE] flex items-center justify-center text-[#5D237A] shrink-0 hover:bg-[#4B1664] hover:text-white transition-colors cursor-pointer"
                    aria-label="Contact via Phone or WhatsApp"
                  >
                    <Phone className="w-5 h-5" />
                  </button>
                  <div>
                    <p className="font-sans-body text-[14px] font-semibold text-[#2E1142]">
                      Call / WhatsApp
                    </p>
                    <button
                      type="button"
                      onClick={handleWhatsAppAction}
                      className="text-[15.5px] text-[#3A1352] hover:text-[#5D237A] font-medium mt-0.5 text-left cursor-pointer"
                    >
                      {settings.phoneDisplay}
                    </button>
                  </div>
                </div>

                {/* Email Us */}
                <div className="flex items-start gap-4">
                  <a
                    href={`mailto:${settings.emailDisplay.split(' ')[0]}`}
                    className="w-12 h-12 rounded-2xl bg-[#EAE0F6] border border-[#D4B8EE] flex items-center justify-center text-[#5D237A] shrink-0 hover:bg-[#4B1664] hover:text-white transition-colors"
                    aria-label="Send email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                  <div>
                    <p className="font-sans-body text-[14px] font-semibold text-[#2E1142]">
                      Email Us
                    </p>
                    <a
                      href={`mailto:${settings.emailDisplay.split(' ')[0]}`}
                      className="text-[15.5px] text-[#3A1352] hover:text-[#5D237A] font-medium mt-0.5 block"
                    >
                      {settings.emailDisplay}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#EAE0F6] border border-[#D4B8EE] flex items-center justify-center text-[#5D237A] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-sans-body text-[14px] font-semibold text-[#2E1142]">
                      Our Location
                    </p>
                    <p className="text-[15px] text-[#2E1142] mt-0.5">
                      {settings.locationPrimary}
                    </p>
                    <p className="text-[13px] text-[#5B3A75]">
                      {settings.locationSecondary}
                    </p>
                  </div>
                </div>
              </div>

              {/* CONNECT WITH US SOCIAL BUTTONS */}
              <div className="pt-3">
                <p className="font-sans-body text-[11.5px] font-semibold uppercase tracking-[0.22em] text-[#2E1142] mb-3.5">
                  CONNECT WITH US
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      handleSocialClick('Instagram', settings.socialLinks.instagram)
                    }
                    aria-label="Instagram"
                    className="w-11 h-11 rounded-xl bg-[#EAE0F6] hover:bg-[#4B1664] text-[#4B1664] hover:text-white border border-[#D4B8EE] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Instagram className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleSocialClick('YouTube', settings.socialLinks.youtube)
                    }
                    aria-label="YouTube"
                    className="w-11 h-11 rounded-xl bg-[#EAE0F6] hover:bg-[#4B1664] text-[#4B1664] hover:text-white border border-[#D4B8EE] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Youtube className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleSocialClick('Spotify', settings.socialLinks.spotify)
                    }
                    aria-label="Spotify"
                    className="w-11 h-11 rounded-xl bg-[#EAE0F6] hover:bg-[#4B1664] text-[#4B1664] hover:text-white border border-[#D4B8EE] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Music2 className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleSocialClick('Community', settings.socialLinks.community)
                    }
                    aria-label="SoundWithin Community"
                    className="w-11 h-11 rounded-xl bg-[#EAE0F6] hover:bg-[#4B1664] text-[#4B1664] hover:text-white border border-[#D4B8EE] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Globe className="w-5 h-5" />
                  </button>
                </div>

                {socialNotice && (
                  <div className="mt-3 p-3 rounded-xl bg-[#F3E8FC] border border-[#C8A4E6] text-[12.5px] text-[#3B1554] flex items-start justify-between gap-2">
                    <span>{socialNotice}</span>
                    <button
                      type="button"
                      onClick={() => setSocialNotice(null)}
                      className="text-xs font-semibold underline shrink-0 cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: SEND US A MESSAGE CARD */}
            <div className="lg:col-span-7">
              <div className="relative rounded-[28px] bg-gradient-to-b from-[#F8F3FD] to-[#F3EAFB] border border-[#DEC8F2] shadow-[0_12px_36px_rgba(75,22,100,0.09)] p-6 sm:p-10">
                <h3 className="font-sans-body text-[13px] font-semibold uppercase tracking-[0.24em] text-[#2E1142] mb-6">
                  SEND US A MESSAGE
                </h3>

                {submitSuccess && (
                  <div className="mb-6 p-4 rounded-2xl bg-[#EBF9F1] border border-[#7AC79B] text-[#1A4D31] flex items-start gap-3 text-[14px]">
                    <CheckCircle2 className="w-5 h-5 text-[#237A4B] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Message Sent Successfully</p>
                      <p className="mt-0.5 text-[13.5px]">{submitSuccess}</p>
                    </div>
                  </div>
                )}

                {submitError && (
                  <div className="mb-6 p-4 rounded-2xl bg-[#FDF0F3] border border-[#E699AA] text-[#6E1A2C] flex items-start gap-3 text-[14px]">
                    <AlertCircle className="w-5 h-5 text-[#B32846] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Unable to Submit</p>
                      <p className="mt-0.5 text-[13.5px]">{submitError}</p>
                    </div>
                  </div>
                )}

                <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Row 1: Full Name & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="sr-only">
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your Name *"
                        className="w-full px-4 py-3.5 rounded-2xl bg-white/95 border border-[#C6A7E2] text-[16px] sm:text-[14.5px] text-[#2E1142] placeholder-[#5B3D73] focus:outline-none focus:border-[#4B1664] focus:ring-2 focus:ring-[#4B1664]/20"
                      />
                      {fieldErrors.fullName && (
                        <p className="text-xs text-[#A82040] mt-1 pl-1">
                          {fieldErrors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="sr-only">
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address *"
                        className="w-full px-4 py-3.5 rounded-2xl bg-white/95 border border-[#C6A7E2] text-[16px] sm:text-[14.5px] text-[#2E1142] placeholder-[#5B3D73] focus:outline-none focus:border-[#4B1664] focus:ring-2 focus:ring-[#4B1664]/20"
                      />
                      {fieldErrors.email && (
                        <p className="text-xs text-[#A82040] mt-1 pl-1">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Phone Number & Inquiry Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center rounded-2xl bg-white/95 border border-[#C6A7E2] focus-within:border-[#4B1664] focus-within:ring-2 focus-within:ring-[#4B1664]/20 overflow-hidden">
                        <div className="flex items-center gap-1.5 pl-3.5 pr-2 py-3.5 border-r border-[#E1CCF4] bg-[#F9F4FD]">
                          <span className="text-sm" aria-hidden="true">
                            🇮🇳
                          </span>
                          <select
                            aria-label="Country code"
                            value={phoneCountryCode}
                            onChange={(e) => setPhoneCountryCode(e.target.value)}
                            className="bg-transparent text-[13.5px] font-medium text-[#2E1142] focus:outline-none cursor-pointer"
                          >
                            <option value="+91">+91</option>
                            <option value="+1">+1</option>
                            <option value="+44">+44</option>
                            <option value="+65">+65</option>
                            <option value="+971">+971</option>
                          </select>
                        </div>
                        <input
                          id="contact-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Phone Number *"
                          className="w-full px-3.5 py-3.5 bg-transparent text-[16px] sm:text-[14.5px] text-[#2E1142] placeholder-[#5B3D73] focus:outline-none"
                        />
                      </div>
                      {fieldErrors.phone && (
                        <p className="text-xs text-[#A82040] mt-1 pl-1">
                          {fieldErrors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="relative">
                        <select
                          id="contact-inquiry"
                          aria-label="Inquiry About"
                          value={inquiryType}
                          onChange={(e) =>
                            setInquiryType(e.target.value as EnquiryType)
                          }
                          className="w-full appearance-none px-4 py-3.5 pr-10 rounded-2xl bg-white/95 border border-[#C6A7E2] text-[16px] sm:text-[14.5px] text-[#2E1142] focus:outline-none focus:border-[#4B1664] focus:ring-2 focus:ring-[#4B1664]/20 cursor-pointer"
                        >
                          <option value="">Inquiry About *</option>
                          {INQUIRY_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#5D237A] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                      {fieldErrors.inquiryType && (
                        <p className="text-xs text-[#A82040] mt-1 pl-1">
                          {fieldErrors.inquiryType}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Message Textarea */}
                  <div>
                    <label htmlFor="contact-message" className="sr-only">
                      Your Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your Message *"
                      className="w-full px-4 py-3.5 rounded-2xl bg-white/95 border border-[#C6A7E2] text-[16px] sm:text-[14.5px] text-[#2E1142] placeholder-[#5B3D73] focus:outline-none focus:border-[#4B1664] focus:ring-2 focus:ring-[#4B1664]/20 resize-y scrollbar-hidden"
                    />
                    {fieldErrors.message && (
                      <p className="text-xs text-[#A82040] mt-1 pl-1">
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button — No decorative arrow */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center justify-center px-10 py-3.5 rounded-full bg-gradient-to-r from-[#4B1664] to-[#5E207D] hover:from-[#3A0E50] hover:to-[#4B1664] disabled:opacity-60 text-white font-sans-body text-[15px] font-medium shadow-[0_6px_20px_rgba(75,22,100,0.38)] transition-all cursor-pointer text-center"
                    >
                      <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM QUICK ACTIONS & FINAL CTA SECTION */}
      <section className="relative pt-10 pb-14 overflow-hidden bg-gradient-to-b from-[#FAF7FD] via-[#EFE3FA] to-[#E3D1F4]">
        {/* Left & Right Corner Scenic Assets from Contact Reference */}
        <img
          src="/assets/extracted/cta_contact_left.png"
          alt="Purple blossoms by flowing stream"
          referrerPolicy="no-referrer"
          loading="lazy"
          className="hidden lg:block absolute bottom-0 left-0 w-80 h-60 object-cover object-left-bottom pointer-events-none select-none opacity-95"
        />
        <img
          src="/assets/extracted/cta_contact_right.png"
          alt="Stacked zen stones and glowing candle beside water"
          referrerPolicy="no-referrer"
          loading="lazy"
          className="hidden lg:block absolute bottom-0 right-0 w-96 h-60 object-cover object-right-bottom pointer-events-none select-none opacity-95"
        />

        <div className="relative z-10 layout-container text-center">
          {/* 3 Quick Booking Actions */}
          <div className="max-w-[920px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-y-6 py-4 mb-8">
            <button
              type="button"
              onClick={() => onNavigate('book')}
              className="flex flex-col items-center justify-center px-4 sm:border-r sm:border-[#C29FE0] group cursor-pointer"
            >
              <Calendar className="w-7 h-7 text-[#5D237A] mb-2.5 group-hover:scale-110 transition-transform" />
              <span className="font-sans-body text-[15.5px] font-semibold text-[#2E1142] group-hover:text-[#5D237A]">
                Book a Session
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('retreats')}
              className="flex flex-col items-center justify-center px-4 sm:border-r sm:border-[#C29FE0] group cursor-pointer"
            >
              <LotusLineIcon className="w-8 h-7 text-[#5D237A] mb-2.5 group-hover:scale-110 transition-transform" />
              <span className="font-sans-body text-[15.5px] font-semibold text-[#2E1142] group-hover:text-[#5D237A]">
                Join a Retreat
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                formRef.current?.scrollIntoView({behavior: 'smooth'});
              }}
              className="flex flex-col items-center justify-center px-4 group cursor-pointer"
            >
              <MessageCircleQuestion className="w-7 h-7 text-[#5D237A] mb-2.5 group-hover:scale-110 transition-transform" />
              <span className="font-sans-body text-[15.5px] font-semibold text-[#2E1142] group-hover:text-[#5D237A]">
                Ask a Question
              </span>
            </button>
          </div>

          {/* Start Your Healing Journey Button — No decorative arrow */}
          <button
            type="button"
            onClick={() => onNavigate('book')}
            className="inline-flex items-center justify-center px-11 py-3.5 rounded-full bg-gradient-to-r from-[#4B1664] to-[#5E207D] hover:from-[#3A0E50] hover:to-[#4B1664] text-white text-[15.5px] font-medium shadow-[0_8px_24px_rgba(75,22,100,0.42)] transition-all cursor-pointer text-center"
          >
            <span>Start Your Healing Journey</span>
          </button>
        </div>
      </section>
    </div>
  );
}
