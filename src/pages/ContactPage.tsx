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
import {withBaseUrl} from '../utils/assetUrl';
import {BUTTON_TOKENS} from '../utils/buttonThemes';
import {IS_STATIC_PRESENTATION} from '../data/staticContent';
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
  const [staticServiceNotice, setStaticServiceNotice] = useState<boolean>(false);
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
    setStaticServiceNotice(false);

    if (!validateForm()) return;

    if (IS_STATIC_PRESENTATION) {
      setStaticServiceNotice(true);
      return;
    }

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
        'Please contact us via email at hello@soundwithin.in or call +91 98765 43210.'
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
        `Our official ${platform} channel is being updated. Please connect with us directly at ${settings.emailDisplay.split(' ')[0]} or ${settings.phoneDisplay.split(' (')[0]}.`
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
        variant="contact-corner"
        kicker="WE'RE HERE FOR YOU"
        titleLines={["Let's Connect"]}
        description="Have a question or want to begin your wellness journey? We'd love to hear from you."
      />

      {/* MAIN TWO-COLUMN CONTACT SECTION */}
      <section className="py-7 sm:py-10 lg:py-12 bg-[#FAF7FD]">
        <div className="layout-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-start">
            {/* LEFT COLUMN: GET IN TOUCH */}
            <div className="lg:col-span-5 lg:pr-8 lg:border-r lg:border-[#D9C2EE] space-y-4">
              <div>
                <p className="font-sans-body text-[11px] sm:text-[11.5px] font-semibold uppercase tracking-[0.22em] sm:tracking-[0.26em] text-[#3A1352] mb-1.5 whitespace-nowrap">
                  GET IN TOUCH
                </p>
                <h2 className="font-serif-display text-[clamp(15px,2.3vw,32px)] font-medium uppercase tracking-[0.02em] sm:tracking-[0.025em] leading-[1.15] text-[#321048] whitespace-nowrap">
                  WE&rsquo;D LOVE TO HEAR FROM YOU
                </h2>
                <div className="w-12 h-[2px] bg-[#5D237A] mt-2.5 mb-2.5" />
                <p className="font-sans-body text-[14.5px] leading-[1.65] text-[#2E1442] max-w-[480px]">
                  Whether you&rsquo;re looking for a personal session, a
                  retreat, or simply have a question, feel free to reach out.
                  We&rsquo;ll get back to you soon.
                </p>
              </div>

              {/* Contact Items */}
              <div className="space-y-3.5 pt-0.5">
                {/* Call / WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <button
                    type="button"
                    onClick={handleWhatsAppAction}
                    className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#EFE4FA] to-[#F9E7F2] border border-[#D4B8EE] flex items-center justify-center text-[#5D237A] shrink-0 hover:from-[#632488] hover:to-[#4B1664] hover:text-white hover:border-[#632488] transition-all duration-200 cursor-pointer shadow-2xs"
                    aria-label="Contact via Phone or WhatsApp"
                  >
                    <Phone className="w-4.5 h-4.5" />
                  </button>
                  <div>
                    <p className="font-sans-body text-[13.5px] font-semibold text-[#2E1142]">
                      Call / WhatsApp
                    </p>
                    <button
                      type="button"
                      onClick={handleWhatsAppAction}
                      className="text-[15px] text-[#3A1352] hover:text-[#5D237A] font-medium mt-0.5 text-left cursor-pointer"
                    >
                      {settings.phoneDisplay}
                    </button>
                  </div>
                </div>

                {/* Email Us */}
                <div className="flex items-start gap-3.5">
                  <a
                    href={`mailto:${settings.emailDisplay.split(' ')[0]}`}
                    className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#EFE4FA] to-[#F9E7F2] border border-[#D4B8EE] flex items-center justify-center text-[#5D237A] shrink-0 hover:from-[#632488] hover:to-[#4B1664] hover:text-white hover:border-[#632488] transition-all duration-200 shadow-2xs"
                    aria-label="Send email"
                  >
                    <Mail className="w-4.5 h-4.5" />
                  </a>
                  <div>
                    <p className="font-sans-body text-[13.5px] font-semibold text-[#2E1142]">
                      Email Us
                    </p>
                    <a
                      href={`mailto:${settings.emailDisplay.split(' ')[0]}`}
                      className="text-[15px] text-[#3A1352] hover:text-[#5D237A] font-medium mt-0.5 block"
                    >
                      {settings.emailDisplay}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#EAE0F6] border border-[#D4B8EE] flex items-center justify-center text-[#5D237A] shrink-0">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="font-sans-body text-[13.5px] font-semibold text-[#2E1142]">
                      Our Location
                    </p>
                    <p className="text-[14.5px] text-[#2E1142] mt-0.5">
                      {settings.locationPrimary}
                    </p>
                    <p className="text-[12.5px] text-[#5B3A75]">
                      {settings.locationSecondary}
                    </p>
                  </div>
                </div>
              </div>

              {/* CONNECT WITH US SOCIAL BUTTONS */}
              <div className="pt-2">
                <p className="font-sans-body text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2E1142] mb-2.5">
                  CONNECT WITH US
                </p>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      handleSocialClick('Instagram', settings.socialLinks.instagram)
                    }
                    aria-label="Instagram"
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EFE4FA] to-[#F9E7F2] hover:from-[#632488] hover:to-[#4B1664] text-[#4B1664] hover:text-white border border-[#D4B8EE] hover:border-[#632488] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs"
                  >
                    <Instagram className="w-4.5 h-4.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleSocialClick('YouTube', settings.socialLinks.youtube)
                    }
                    aria-label="YouTube"
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EFE4FA] to-[#F9E7F2] hover:from-[#632488] hover:to-[#4B1664] text-[#4B1664] hover:text-white border border-[#D4B8EE] hover:border-[#632488] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs"
                  >
                    <Youtube className="w-4.5 h-4.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleSocialClick('Spotify', settings.socialLinks.spotify)
                    }
                    aria-label="Spotify"
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EFE4FA] to-[#F9E7F2] hover:from-[#632488] hover:to-[#4B1664] text-[#4B1664] hover:text-white border border-[#D4B8EE] hover:border-[#632488] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs"
                  >
                    <Music2 className="w-4.5 h-4.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleSocialClick('Community', settings.socialLinks.community)
                    }
                    aria-label="SoundWithin Community"
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EFE4FA] to-[#F9E7F2] hover:from-[#632488] hover:to-[#4B1664] text-[#4B1664] hover:text-white border border-[#D4B8EE] hover:border-[#632488] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs"
                  >
                    <Globe className="w-4.5 h-4.5" />
                  </button>
                </div>

                {socialNotice && (
                  <div className="mt-2.5 p-2.5 rounded-xl bg-[#F3E8FC] border border-[#C8A4E6] text-[12px] text-[#3B1554] flex items-start justify-between gap-2">
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
              <div className="relative rounded-[26px] bg-gradient-to-b from-[#F8F3FD] to-[#F3EAFB] border border-[#DEC8F2] shadow-[0_12px_36px_rgba(75,22,100,0.09)] p-5 sm:p-7">
                <h3 className="font-sans-body text-[12.5px] font-semibold uppercase tracking-[0.24em] text-[#2E1142] mb-4">
                  SEND US A MESSAGE
                </h3>

                {staticServiceNotice && (
                  <div className="mb-4 p-4 rounded-2xl bg-[#F3E8FC] border border-[#B589DC] text-[#2E1142] space-y-2.5 text-[13.5px]">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-[#5D237A] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-serif-display text-lg font-semibold text-[#321048]">
                          Enquiry Service Currently Being Prepared
                        </p>
                        <p className="mt-1 text-[13px] leading-relaxed text-[#3B1E54]">
                          Thank you for reaching out to SOUNDWITHIN. Our online
                          enquiry submission service is temporarily unavailable
                          while our booking portal is being finalized. Please
                          connect with us directly via email or WhatsApp below.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2.5 pt-1 pl-8">
                      <a
                        href={`mailto:${settings.emailDisplay.split(' ')[0]}?subject=${encodeURIComponent(
                          `SOUNDWITHIN Inquiry: ${inquiryType || 'General'}`
                        )}&body=${encodeURIComponent(
                          `Name: ${fullName}\nPhone: ${phoneCountryCode} ${phone}\n\n${message}`
                        )}`}
                        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12.5px] font-medium whitespace-nowrap ${BUTTON_TOKENS.general}`}
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Email {settings.emailDisplay.split(' ')[0]}</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleWhatsAppAction}
                        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12.5px] font-medium cursor-pointer whitespace-nowrap ${BUTTON_TOKENS.secondary}`}
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>WhatsApp / Call {settings.phoneDisplay.split(' (')[0]}</span>
                      </button>
                    </div>
                  </div>
                )}

                {submitSuccess && (
                  <div className="mb-4 p-3.5 rounded-2xl bg-[#EBF9F1] border border-[#7AC79B] text-[#1A4D31] flex items-start gap-2.5 text-[13.5px]">
                    <CheckCircle2 className="w-5 h-5 text-[#237A4B] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Message Sent Successfully</p>
                      <p className="mt-0.5 text-[13px]">{submitSuccess}</p>
                    </div>
                  </div>
                )}

                {submitError && (
                  <div className="mb-4 p-3.5 rounded-2xl bg-[#FDF0F3] border border-[#E699AA] text-[#6E1A2C] flex items-start gap-2.5 text-[13.5px]">
                    <AlertCircle className="w-5 h-5 text-[#B32846] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Unable to Submit</p>
                      <p className="mt-0.5 text-[13px]">{submitError}</p>
                    </div>
                  </div>
                )}

                <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-3">
                  {/* Row 1: Full Name & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                        className="w-full px-3.5 py-2.5 sm:py-3 rounded-2xl bg-white/95 border border-[#C6A7E2] text-[16px] sm:text-[14px] text-[#2E1142] placeholder-[#5B3D73] focus:outline-none focus:border-[#4B1664] focus:ring-2 focus:ring-[#4B1664]/20"
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
                        className="w-full px-3.5 py-2.5 sm:py-3 rounded-2xl bg-white/95 border border-[#C6A7E2] text-[16px] sm:text-[14px] text-[#2E1142] placeholder-[#5B3D73] focus:outline-none focus:border-[#4B1664] focus:ring-2 focus:ring-[#4B1664]/20"
                      />
                      {fieldErrors.email && (
                        <p className="text-xs text-[#A82040] mt-1 pl-1">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Phone Number & Inquiry Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <div className="flex items-center rounded-2xl bg-white/95 border border-[#C6A7E2] focus-within:border-[#4B1664] focus-within:ring-2 focus-within:ring-[#4B1664]/20 overflow-hidden">
                        <div className="flex items-center gap-1.5 pl-3 pr-2 py-2.5 sm:py-3 border-r border-[#E1CCF4] bg-[#F9F4FD]">
                          <span className="text-sm" aria-hidden="true">
                            🇮🇳
                          </span>
                          <select
                            aria-label="Country code"
                            value={phoneCountryCode}
                            onChange={(e) => setPhoneCountryCode(e.target.value)}
                            className="bg-transparent text-[13px] font-medium text-[#2E1142] focus:outline-none cursor-pointer"
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
                          className="w-full px-3 py-2.5 sm:py-3 bg-transparent text-[16px] sm:text-[14px] text-[#2E1142] placeholder-[#5B3D73] focus:outline-none"
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
                          className="w-full appearance-none px-3.5 py-2.5 sm:py-3 pr-9 rounded-2xl bg-white/95 border border-[#C6A7E2] text-[16px] sm:text-[14px] text-[#2E1142] focus:outline-none focus:border-[#4B1664] focus:ring-2 focus:ring-[#4B1664]/20 cursor-pointer"
                        >
                          <option value="">Inquiry About *</option>
                          {INQUIRY_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#5D237A] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
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
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your Message *"
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-2xl bg-white/95 border border-[#C6A7E2] text-[16px] sm:text-[14px] text-[#2E1142] placeholder-[#5B3D73] focus:outline-none focus:border-[#4B1664] focus:ring-2 focus:ring-[#4B1664]/20 resize-y scrollbar-hidden"
                    />
                    {fieldErrors.message && (
                      <p className="text-xs text-[#A82040] mt-1 pl-1">
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button — No decorative arrow */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={submitting}
                      className={`inline-flex items-center justify-center px-8 py-2.5 sm:px-9 sm:py-3 rounded-full disabled:opacity-60 font-sans-body text-[14.5px] font-medium cursor-pointer text-center whitespace-nowrap ${BUTTON_TOKENS.general}`}
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

      {/* BOTTOM PROMOTIONAL BANNER — Exact 6:1 Responsive Match with Home Bottom Banner */}
      <section className="pt-2 pb-3 sm:pt-3 sm:pb-5 bg-gradient-to-b from-[#FAF7FD] to-[#EADBF8]/80">
        <div className="layout-container">
          <div className="relative w-full aspect-[6/1] rounded-[16px] sm:rounded-[24px] overflow-hidden border border-[#DFC4EC] shadow-[0_10px_30px_rgba(62,20,88,0.09)] bg-gradient-to-r from-[#F9E3D3] via-[#FCE6DC] to-[#F7D7C7]">
            <img
              src={withBaseUrl('/assets/aistudio/Serene_Sunlit_Wellness_Studio_f8ef36d0.png')}
              alt="Serene sunlit wellness studio with semicircular glowing wall arch, wooden shelves, olive trees, and botanicals"
              width={2172}
              height={724}
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
              className="block w-full h-full object-cover object-[50%_58%] select-none"
            />

            {/* Layered Functional Content Positioned in the Open Center Canvas (Zero Overlays or Image Filters) */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-[6%] sm:px-[14%] lg:px-[18%] text-center">
              {/* 3 Quick Booking Actions — Single Horizontal Row across Mobile, Tablet & Desktop */}
              <div className="w-full max-w-[780px] mx-auto grid grid-cols-3 gap-0 mb-[3px] sm:mb-2 lg:mb-3.5">
                <button
                  type="button"
                  onClick={() => onNavigate('book')}
                  className="flex flex-col items-center justify-center px-1 sm:px-4 border-r border-[#9E75C4]/55 group cursor-pointer min-w-0"
                >
                  <Calendar className="w-3 h-3 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#4A1864] mb-[1px] sm:mb-1 group-hover:scale-110 transition-transform shrink-0 drop-shadow-[0_1px_4px_rgba(255,248,242,0.92)]" />
                  <span className="font-sans-body text-[clamp(7.5px,2.1vw,15px)] leading-[1.08] font-semibold text-[#2E1142] group-hover:text-[#5D237A] whitespace-nowrap [text-shadow:0_1px_8px_rgba(255,248,242,0.94)]">
                    Book a Session
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('retreats')}
                  className="flex flex-col items-center justify-center px-1 sm:px-4 border-r border-[#9E75C4]/55 group cursor-pointer min-w-0"
                >
                  <LotusLineIcon className="w-3.5 h-3 sm:w-6 sm:h-5 lg:w-7 lg:h-6 text-[#4A1864] mb-[1px] sm:mb-1 group-hover:scale-110 transition-transform shrink-0 drop-shadow-[0_1px_4px_rgba(255,248,242,0.92)]" />
                  <span className="font-sans-body text-[clamp(7.5px,2.1vw,15px)] leading-[1.08] font-semibold text-[#2E1142] group-hover:text-[#5D237A] whitespace-nowrap [text-shadow:0_1px_8px_rgba(255,248,242,0.94)]">
                    Join a Retreat
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    formRef.current?.scrollIntoView({behavior: 'smooth'});
                  }}
                  className="flex flex-col items-center justify-center px-1 sm:px-4 group cursor-pointer min-w-0"
                >
                  <MessageCircleQuestion className="w-3 h-3 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#4A1864] mb-[1px] sm:mb-1 group-hover:scale-110 transition-transform shrink-0 drop-shadow-[0_1px_4px_rgba(255,248,242,0.92)]" />
                  <span className="font-sans-body text-[clamp(7.5px,2.1vw,15px)] leading-[1.08] font-semibold text-[#2E1142] group-hover:text-[#5D237A] whitespace-nowrap [text-shadow:0_1px_8px_rgba(255,248,242,0.94)]">
                    Ask a Question
                  </span>
                </button>
              </div>

              {/* Start Your Healing Journey Button */}
              <button
                type="button"
                onClick={() => onNavigate('book')}
                className={`inline-flex items-center justify-center px-[clamp(11px,2.8vw,30px)] py-[clamp(3px,0.75vw,10px)] rounded-full font-sans-body text-[clamp(7.5px,1.9vw,14px)] leading-none font-semibold tracking-[0.015em] cursor-pointer text-center whitespace-nowrap ${BUTTON_TOKENS.general}`}
              >
                <span>Start Your Healing Journey</span>
              </button>
            </div>
          </div>

          {/* Subtle Muted Gold & Light Burgundy Horizontal Divider separating CTA from Footer */}
          <div
            className="mt-3 sm:mt-4 flex items-center justify-center gap-2.5 px-4"
            aria-hidden="true"
          >
            <span className="h-[1px] flex-1 max-w-[130px] sm:max-w-[220px] bg-gradient-to-r from-transparent via-[#C69A4A]/55 to-[#70283F]/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#B78A45]/75" />
            <span className="h-[1px] flex-1 max-w-[130px] sm:max-w-[220px] bg-gradient-to-l from-transparent via-[#C69A4A]/55 to-[#70283F]/40" />
          </div>
        </div>
      </section>
    </div>
  );
}
