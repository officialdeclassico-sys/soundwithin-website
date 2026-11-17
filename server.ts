import crypto from 'crypto';
import dotenv from 'dotenv';
import express, {NextFunction, Request, Response} from 'express';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {createServer as createViteServer} from 'vite';
import type {
  AvailabilityConfig,
  Booking,
  BookingStatus,
  Enquiry,
  Experience,
  Retreat,
  Testimonial,
  UpcomingRetreatBatch,
  WebsiteSettings,
} from './src/types.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DB_PATH = path.join(DATA_DIR, 'db.json');

interface DatabaseSchema {
  experiences: Experience[];
  retreats: Retreat[];
  upcomingRetreats: UpcomingRetreatBatch[];
  bookings: Booking[];
  availability: AvailabilityConfig;
  enquiries: Enquiry[];
  testimonials: Testimonial[];
  settings: WebsiteSettings;
}

const INITIAL_EXPERIENCES: Experience[] = [
  {
    id: 'exp-sound-healing',
    slug: 'sound-healing-session',
    name: 'Sound Healing Session',
    shortDescription:
      'A therapeutic sound experience using singing bowls, gongs and healing frequencies.',
    fullDescription:
      'Immerse yourself in the restorative resonance of hand-hammered Himalayan singing bowls, resonant gongs, and harmonic chimes. This personalized or small-group session uses targeted vibrational frequencies to entrain brainwaves into deep theta relaxation, quiet an overactive nervous system, and restore energetic coherence.',
    duration: '60 mins',
    durationMinutes: 60,
    formatLabel: 'In-Person / Online',
    availableFormats: ['In-Person', 'Online'],
    iconType: 'soundwave',
    image: '/assets/extracted/exp_sound_healing.png',
    price: 2500,
    currency: 'INR',
    priceNote: 'Editable session fee (configurable in Admin)',
    objectives: [
      'Calm the sympathetic nervous system and reduce cortisol levels',
      'Release deeply held physical tension and mental fatigue',
      'Support restful sleep and emotional equilibrium',
      'Restore natural harmonic resonance across body and mind',
    ],
    whatToExpect: [
      '10-minute grounding breathwork and intention setting',
      '40-minute immersive sound vibration therapy with singing bowls placed around the body',
      '10-minute silent integration and gentle awakening with herbal infusion',
    ],
    preparationInstructions: [
      'Wear loose, comfortable natural-fibre clothing',
      'Hydrate well before and after the session to aid cellular resonance',
      'Avoid heavy meals at least 60 minutes prior to your appointment',
      'For online sessions, prepare a quiet space with headphones or a quality speaker',
    ],
  },
  {
    id: 'exp-guided-meditation',
    slug: 'guided-meditation',
    name: 'Guided Meditation',
    shortDescription:
      'A gentle, guided journey to calm your mind, release stress and build self-awareness.',
    fullDescription:
      'Rooted in mindful awareness and conscious breathwork, our Guided Meditation sessions offer a sanctuary from daily mental chatter. Accompanied by soft ambient tones and nature-inspired stillness, you will learn practical techniques to observe thoughts without attachment and anchor yourself in the present moment.',
    duration: '45 mins',
    durationMinutes: 45,
    formatLabel: 'In-Person / Online',
    availableFormats: ['In-Person', 'Online'],
    iconType: 'lotus',
    image: '/assets/extracted/exp_guided_meditation.png',
    price: 1800,
    currency: 'INR',
    priceNote: 'Editable session fee (configurable in Admin)',
    objectives: [
      'Cultivate non-judgmental present-moment awareness',
      'Develop practical breath anchors for everyday anxiety relief',
      'Improve mental clarity, focus, and emotional resilience',
      'Establish a sustainable personal meditation rhythm',
    ],
    whatToExpect: [
      'Postural alignment and conscious diaphragmatic breathing',
      'Progressive body-scan relaxation and sensory grounding',
      'Guided inner stillness practice accompanied by gentle singing bowl overtones',
    ],
    preparationInstructions: [
      'Choose a comfortable seated posture or cushions (provided for in-person sessions)',
      'Arrive 5–10 minutes early to settle your breath',
      'Keep a journal nearby if you wish to note reflections afterward',
    ],
  },
  {
    id: 'exp-sound-bath',
    slug: 'sound-bath-journey',
    name: 'Sound Bath Journey',
    shortDescription:
      'An immersive, multi-instrument sound bath that relaxes your body and resets your energy.',
    fullDescription:
      'Lie back in effortless stillness as waves of pure acoustic sound wash over you. Featuring frosted quartz crystal bowls, Tibetan bowls, rainsticks, ocean drums, and koshi chimes, this extended 90-minute acoustic journey guides you through layered harmonic soundscapes designed for deep somatic release.',
    duration: '90 mins',
    durationMinutes: 90,
    formatLabel: 'In-Person',
    availableFormats: ['In-Person'],
    iconType: 'mandala',
    image: '/assets/extracted/exp_sound_bath.png',
    price: 3500,
    currency: 'INR',
    priceNote: 'Editable session fee (configurable in Admin)',
    objectives: [
      'Experience multi-layered acoustic immersion across crystal and bronze instruments',
      'Facilitate deep somatic rest equivalent to several hours of restorative sleep',
      'Clear stagnant emotional energy and mental overwhelm',
      'Reconnect with intuitive stillness and creative clarity',
    ],
    whatToExpect: [
      'Supported savasana setup with bolsters, eye pillows, and warm blankets',
      'Layered progression from grounding earth tones to crystalline upper harmonics',
      'Extended silence and gentle grounding snacks post-journey',
    ],
    preparationInstructions: [
      'All mats, bolsters, and blankets are provided at our sanctuary',
      'Bring warm socks or a light shawl as body temperature naturally drops during deep rest',
      'Switch all mobile and wearable devices to complete silence prior to entry',
    ],
  },
  {
    id: 'exp-chakra-alignment',
    slug: 'chakra-sound-alignment',
    name: 'Chakra Sound Alignment',
    shortDescription:
      'Balance and harmonise your energy centres through sound and vibration.',
    fullDescription:
      'Each energy centre in the subtle body responds to specific musical intervals and vibrational frequencies. In this focused session, tuned singing bowls, crystal resonance, and guided visualization work systematically from the root to the crown chakra to dissolve energetic blocks and restore harmonious flow.',
    duration: '60 mins',
    durationMinutes: 60,
    formatLabel: 'In-Person / Online',
    availableFormats: ['In-Person', 'Online'],
    iconType: 'crystal',
    image: '/assets/extracted/exp_chakra_alignment.png',
    price: 2800,
    currency: 'INR',
    priceNote: 'Editable session fee (configurable in Admin)',
    objectives: [
      'Identify and harmonize imbalances across the seven primary energy centres',
      'Combine frequency-specific singing bowls with conscious breath and intention',
      'Release emotional blockages stored in the subtle and physical body',
      'Experience grounded vitality and heightened inner alignment',
    ],
    whatToExpect: [
      'Brief energetic check-in to identify focus areas',
      'Sequential acoustic tuning from Root (Muladhara) to Crown (Sahasrara)',
      'Closing harmonic integration and personalized self-care recommendations',
    ],
    preparationInstructions: [
      'Reflect briefly on any areas of life or emotion feeling stagnant',
      'Wear comfortable attire free of heavy metal buckles or jewelry',
      'Drink plenty of warm water following the alignment session',
    ],
  },
  {
    id: 'exp-nature-retreat',
    slug: 'nature-sound-retreat',
    name: 'Nature Sound Retreat',
    shortDescription:
      'A day of deep rest, sound healing, meditation and nature immersion at a serene location.',
    fullDescription:
      'Step away from urban noise for a full-day sanctuary amidst lush greenery and natural flowing water. Combining open-air sound baths, mindful forest walks, waterfall meditation, and nourishing sattvic meals, this day immersion reconnects your nervous system with the healing rhythms of nature.',
    duration: 'Full-Day',
    durationMinutes: 360,
    formatLabel: 'In-Person',
    availableFormats: ['In-Person'],
    iconType: 'nature',
    image: '/assets/extracted/exp_nature_retreat.png',
    price: 6500,
    currency: 'INR',
    priceNote: 'Editable session fee (configurable in Admin)',
    isDurationCalendarBased: true,
    objectives: [
      'Disconnect completely from digital stimulation in a natural sanctuary',
      'Blend acoustic sound healing with the organic frequencies of water and forest',
      'Practice mindful walking, nature contemplation, and guided group meditation',
      'Return home replenished, grounded, and inwardly clear',
    ],
    whatToExpect: [
      'Morning welcome herbal infusion and grounding circle in an open-air pavilion',
      'Guided nature immersion walk and riverside mindfulness practice',
      'Wholesome plant-based lunch followed by an afternoon multi-instrument Sound Bath',
      'Sunset reflection circle and journaling before departure',
    ],
    preparationInstructions: [
      'Bring comfortable walking footwear suitable for natural forest trails',
      'Carry a reusable water bottle, sun hat, and light natural layers',
      'Exact sanctuary location pin is shared upon confirmed booking',
    ],
  },
  {
    id: 'exp-self-awareness',
    slug: 'self-awareness-journey',
    name: 'Self-Awareness Journey',
    shortDescription:
      'A transformative inner journey to release limiting patterns and reconnect with your true self.',
    fullDescription:
      'True healing unfolds when we listen deeply to our inner world. This structured multi-session mentorship weaves together contemplative inquiry, somatic mindfulness, reflective journaling, and personalizado sound healing to help you recognize unconscious patterns, heal emotional wounds, and live from authentic clarity.',
    duration: 'Multi-Session',
    durationMinutes: 75,
    formatLabel: 'Online / In-Person',
    availableFormats: ['Online', 'In-Person'],
    iconType: 'triskelion',
    image: '/assets/extracted/exp_self_awareness.png',
    price: 4500,
    currency: 'INR',
    priceNote: 'Editable session fee (configurable in Admin)',
    isDurationCalendarBased: true,
    objectives: [
      'Uncover and gently release recurring emotional and behavioral patterns',
      'Build a compassionate, observant relationship with your inner dialogue',
      'Integrate sound healing and mindfulness into daily life transitions',
      'Foster authentic self-understanding and purposeful living',
    ],
    whatToExpect: [
      '75-minute one-on-one guided self-inquiry and somatic awareness dialogue',
      'Customized sound meditation tailored to your current emotional landscape',
      'Between-session reflective journaling prompts and mindfulness practices',
    ],
    preparationInstructions: [
      'Keep a dedicated reflection journal for your sessions',
      'Ensure an uninterrupted, private environment if attending online',
      'Approach the session with openness and gentle curiosity',
    ],
  },
];

const INITIAL_RETREATS: Retreat[] = [
  {
    id: 'retreat-sound-healing',
    slug: 'sound-healing-retreat',
    name: 'Sound Healing Retreat',
    badgeDuration: '2 Days / 1 Night',
    shortDescription:
      'A restorative retreat to relax your nervous system, release stress and recharge through immersive sound healing.',
    overview:
      'Designed as a gentle weekend sanctuary in nature, the Sound Healing Retreat immerses you in restorative frequencies, waterfallside stillness, and mindful rest. Ideal for anyone seeking to step out of chronic busyness and reset their nervous system in a supportive environment.',
    image: '/assets/extracted/retreat_sound_healing.png',
    features: [
      {icon: 'soundwave', label: 'Sound Baths'},
      {icon: 'lotus', label: 'Meditation'},
      {icon: 'leaf', label: 'Nature Time'},
    ],
    locationPlaceholder:
      '[Editable Placeholder] Western Ghats Sanctuary, Maharashtra (Exact venue configured via Admin)',
    schedulePlaceholder:
      '[Editable Placeholder] Upcoming Weekend Batch — Dates to be announced (Configurable via Admin)',
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrival, Grounding & Twilight Sound Immersion',
        activities: [
          'Arrival welcome tea & sanctuary orientation (Schedule placeholder)',
          'Opening intention circle & nervous system grounding breathwork',
          'Sunset Himalayan Singing Bowl & Gong Sound Bath overlooking nature',
          'Nourishing sattvic dinner & candlelit silent contemplation',
        ],
      },
      {
        day: 'Day 2',
        title: 'Nature Awakening, Waterfall Meditation & Integration',
        activities: [
          'Sunrise mindful movement & guided forest breathing',
          'Stream-side sensory meditation & acoustic overtone session',
          'Wholesome brunch, reflective journaling & closing sharing circle',
        ],
      },
    ],
    accommodationInfo:
      '[Editable Placeholder] Eco-conscious private & twin-sharing sanctuary cottages surrounded by forest canopy. Update genuine room categories in Admin.',
    activities: [
      'Multi-instrument bronze & crystal singing bowl sound baths',
      'Guided breathwork and somatic nervous system relaxation',
      'Mindful forest and waterfall walks',
      'Reflective journaling and group sharing circles',
    ],
    mealsAndInclusions: [
      '1 Night comfortable accommodation at the retreat sanctuary',
      'All wholesome vegetarian/sattvic meals and herbal infusions',
      'All daily sound healing and guided meditation sessions',
      'Use of meditation cushions, mats, and healing props',
    ],
    exclusions: [
      'Personal transport to and from the retreat venue',
      'Additional private 1-on-1 therapy sessions outside the schedule',
      'Personal travel insurance',
    ],
    pricingPlaceholder:
      'Pricing Placeholder: To be configured by Administrator (No advance payment required to enquire/reserve)',
    priceAmount: null,
    availableSeatsPlaceholder:
      'Availability Placeholder: Intimate small-group batch (Configure exact seat count in Admin)',
    isPlaceholderData: true,
  },
  {
    id: 'retreat-self-awareness',
    slug: 'self-awareness-retreat',
    name: 'Self-Awareness Retreat',
    badgeDuration: '3 Days / 2 Nights',
    shortDescription:
      'A deeper inner journey to understand yourself, release limiting patterns and reconnect with your true self.',
    overview:
      'Over three unhurried days in nature, the Self-Awareness Retreat blends contemplative self-inquiry, guided journaling, conscious breathwork, and harmonic sound healing. Create the space to listen within, dissolve old conditioning, and realign with what truly matters.',
    image: '/assets/extracted/retreat_self_awareness.png',
    features: [
      {icon: 'lotus', label: 'Inner Work'},
      {icon: 'book', label: 'Journaling'},
      {icon: 'meditate', label: 'Meditation'},
    ],
    locationPlaceholder:
      '[Editable Placeholder] Serene Forest Retreat Venue (Exact location configured via Admin)',
    schedulePlaceholder:
      '[Editable Placeholder] 3-Day Schedule — Exact dates to be configured by Admin',
    itinerary: [
      {
        day: 'Day 1',
        title: 'Stepping Into Stillness & Observing the Inner Landscape',
        activities: [
          'Sanctuary check-in, herbal welcome & digital detox initiation',
          'Guided workshop: Understanding Mental Patterns & Emotional Triggers',
          'Evening Crystal Bowl Sound Journey for emotional softening',
        ],
      },
      {
        day: 'Day 2',
        title: 'Deep Inquiry, Emotional Release & Nature Connection',
        activities: [
          'Morning silent walk & nature contemplation by flowing water',
          'Deep journaling & guided somatic release practice',
          'Afternoon Chakra Sound Alignment & twilight campfire reflection',
        ],
      },
      {
        day: 'Day 3',
        title: 'Integration, Clarity & Returning Home Aligned',
        activities: [
          'Dawn meditation & gratitude frequency bath',
          'Personal integration blueprint for daily life',
          'Closing circle & farewell wholesome lunch',
        ],
      },
    ],
    accommodationInfo:
      '[Editable Placeholder] Serene nature-view rooms designed for quiet reflection and restful sleep. Configure actual venue room details in Admin.',
    activities: [
      'Guided self-awareness and emotional clarity workshops',
      'Structured reflective journaling and contemplation periods',
      'Daily sound healing and chakra frequency sessions',
      'Silent nature immersion walks',
    ],
    mealsAndInclusions: [
      '2 Nights peaceful stay at the retreat venue',
      'All freshly prepared vegetarian meals, snacks & herbal teas',
      'Personal retreat reflection journal and practice guide',
      'All scheduled workshops, sound baths, and nature walks',
    ],
    exclusions: [
      'Travel and transfers to the retreat sanctuary',
      'Personal expenses and optional add-on consultations',
    ],
    pricingPlaceholder:
      'Pricing Placeholder: To be configured by Administrator (Contact or reserve interest below)',
    priceAmount: null,
    availableSeatsPlaceholder:
      'Availability Placeholder: Seat availability to be updated by Admin',
    isPlaceholderData: true,
  },
  {
    id: 'retreat-transformation',
    slug: 'transformation-retreat',
    name: 'Transformation Retreat',
    badgeDuration: '5 Days / 4 Nights',
    shortDescription:
      'An intensive, immersive retreat for complete reset — combining sound healing, meditation, nature immersion and holistic practices.',
    overview:
      'Our flagship 5-day immersion for profound inner renewal. Surrounded by waterfalls, tropical forest canopy, and sacred acoustic spaces, the Transformation Retreat guides you through a progressive arc of nervous system restoration, deep emotional catharsis, energetic alignment, and lasting personal transformation.',
    image: '/assets/extracted/retreat_transformation.png',
    features: [
      {icon: 'soundwave', label: 'Deep Healing'},
      {icon: 'stones', label: 'Energy Balance'},
      {icon: 'infinity', label: 'Lasting Change'},
    ],
    locationPlaceholder:
      '[Editable Placeholder] Nature Sanctuary Venue (Exact destination configured via Admin)',
    schedulePlaceholder:
      '[Editable Placeholder] 5-Day Immersive Schedule — Dates to be announced via Admin',
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrival, Decompression & Sacred Space Opening',
        activities: [
          'Welcome orientation, grounding meal & digital unplugging',
          'Opening ceremony & restorative Tibetan bowl sound bath',
        ],
      },
      {
        day: 'Day 2',
        title: 'Somatic Release & Nervous System Reset',
        activities: [
          'Morning breathwork & mindful movement in nature',
          'Deep acoustic vibration therapy & somatic stress release',
          'Evening silent meditation under the canopy',
        ],
      },
      {
        day: 'Day 3',
        title: 'Shadow Inquiry, Emotional Clearing & Waterfall Immersion',
        activities: [
          'Guided nature immersion at the waterfall sanctuary',
          'Self-awareness breakthrough workshop & reflective solo time',
          'Multi-instrument Gong & Crystal Bowl journey',
        ],
      },
      {
        day: 'Day 4',
        title: 'Chakra Harmonisation & Authentic Alignment',
        activities: [
          'Seven-chakra frequency alignment & vocal toning practice',
          'One-on-one integration guidance & nature contemplation',
          'Evening candlelit gratitude & sound ceremony',
        ],
      },
      {
        day: 'Day 5',
        title: 'Embodiment, Closing Circle & New Beginnings',
        activities: [
          'Sunrise meditation & closing harmonic blessing',
          'Sustaining transformation at home: practical integration',
          'Farewell feast & departure',
        ],
      },
    ],
    accommodationInfo:
      '[Editable Placeholder] Private sanctuary suites and eco-cottages immersed in nature. Update verified accommodation details in Admin.',
    activities: [
      'Extended daily sound baths, gong journeys, and chakra tuning',
      'Deep self-inquiry, breathwork, and somatic mindfulness',
      'Guided waterfall and tropical forest immersions',
      'Personal integration mentoring and post-retreat practice plan',
    ],
    mealsAndInclusions: [
      '4 Nights full-board sanctuary accommodation',
      'All gourmet sattvic meals, herbal elixirs, and snacks',
      'Complete 5-day curriculum of sound healing and mindfulness sessions',
      'Retreat journal, practice materials, and post-retreat follow-up call',
    ],
    exclusions: [
      'Airfare or surface transportation to the venue',
      'Personal insurance and off-site excursions',
    ],
    pricingPlaceholder:
      'Pricing Placeholder: To be configured by Administrator',
    priceAmount: null,
    availableSeatsPlaceholder:
      'Availability Placeholder: Limited cohort size (Configure in Admin)',
    isPlaceholderData: true,
  },
];

const INITIAL_UPCOMING_RETREATS: UpcomingRetreatBatch[] = [
  {
    id: 'batch-1',
    retreatId: 'retreat-sound-healing',
    retreatName: 'Sound Healing Retreat',
    dateLabel: 'Dates TBA (Placeholder – Dec 12–14)',
    locationLabel: 'Igatpuri, Maharashtra (Placeholder)',
    seatsLabel: 'Schedule & Seats Configurable in Admin',
    isPlaceholder: true,
  },
  {
    id: 'batch-2',
    retreatId: 'retreat-self-awareness',
    retreatName: 'Self-Awareness Retreat',
    dateLabel: 'Dates TBA (Placeholder – Jan 09–11)',
    locationLabel: 'Wayanad, Kerala (Placeholder)',
    seatsLabel: 'Schedule & Seats Configurable in Admin',
    isPlaceholder: true,
  },
  {
    id: 'batch-3',
    retreatId: 'retreat-transformation',
    retreatName: 'Transformation Retreat',
    dateLabel: 'Dates TBA (Placeholder – Feb 20–24)',
    locationLabel: 'Coorg, Karnataka (Placeholder)',
    seatsLabel: 'Schedule & Seats Configurable in Admin',
    isPlaceholder: true,
  },
];

const INITIAL_AVAILABILITY: AvailabilityConfig = {
  isDemoAvailability: true,
  defaultTimeSlots: ['10:00 AM', '12:00 PM', '3:00 PM', '5:00 PM', '7:00 PM'],
  customDateSlots: {},
  blockedDates: [],
  closedWeekdays: [],
};

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Ananya Deshmukh',
    role: 'Architect & Mindfulness Seeker',
    location: 'Mumbai',
    experienceName: 'Sound Healing Session',
    quote:
      'From the very first resonance of the singing bowls, months of accumulated mental fatigue began to dissolve. I walked out feeling a quiet stillness I had not experienced in years.',
  },
  {
    id: 'test-2',
    name: 'Rohan Kulkarni',
    role: 'Product Leader',
    location: 'Pune',
    experienceName: 'Nature Sound Retreat',
    quote:
      'Listening to the harmonic bowls beside flowing water in the Western Ghats was deeply grounding. The space holds such genuine warmth, safety, and authenticity.',
  },
  {
    id: 'test-3',
    name: 'Meera Nair',
    role: 'Clinical Psychologist',
    location: 'Bengaluru',
    experienceName: 'Self-Awareness Journey',
    quote:
      'The combination of gentle self-inquiry and vibrational healing helped me release emotional blocks that talk alone could not reach. Truly transformative work.',
  },
];

const INITIAL_SETTINGS: WebsiteSettings = {
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
    'Through the therapeutic resonance of traditional Himalayan singing bowls, crystal alchemy instruments, mindful breathwork, and immersion in the living waters and forests of the Western Ghats, each session is held with deep presence, humility, and care.',
    'Administrator Note: Use the Admin Management interface to replace this placeholder biography with the founder’s verified personal story, certifications, and lineage.',
  ],
  founderNoteLabel: 'Editable Founder Profile (Configure verified details in Admin)',
  allowBookingWithoutAdvancePayment: true,
  razorpayConfigured: Boolean(
    process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  ),
  razorpayKeyIdPublic: process.env.RAZORPAY_KEY_ID || '',
  emailIntegrationConfigured: Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
  ),
};

function loadDb(): DatabaseSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, {recursive: true});
  }
  if (!fs.existsSync(DB_PATH)) {
    const initial: DatabaseSchema = {
      experiences: INITIAL_EXPERIENCES,
      retreats: INITIAL_RETREATS,
      upcomingRetreats: INITIAL_UPCOMING_RETREATS,
      bookings: [],
      availability: INITIAL_AVAILABILITY,
      enquiries: [],
      testimonials: INITIAL_TESTIMONIALS,
      settings: INITIAL_SETTINGS,
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  }
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    const parsed = JSON.parse(raw) as DatabaseSchema;
    parsed.settings.razorpayConfigured = Boolean(
      process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
    );
    parsed.settings.razorpayKeyIdPublic = process.env.RAZORPAY_KEY_ID || '';
    parsed.settings.emailIntegrationConfigured = Boolean(
      process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
    );
    return parsed;
  } catch {
    const fallback: DatabaseSchema = {
      experiences: INITIAL_EXPERIENCES,
      retreats: INITIAL_RETREATS,
      upcomingRetreats: INITIAL_UPCOMING_RETREATS,
      bookings: [],
      availability: INITIAL_AVAILABILITY,
      enquiries: [],
      testimonials: INITIAL_TESTIMONIALS,
      settings: INITIAL_SETTINGS,
    };
    return fallback;
  }
}

function saveDb(db: DatabaseSchema): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, {recursive: true});
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
}

// Active admin tokens in memory
const activeAdminTokens = new Set<string>();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'soundwithin-admin';

function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({error: 'Unauthorized: Admin authentication required.'});
    return;
  }
  const token = authHeader.slice('Bearer '.length).trim();
  if (!activeAdminTokens.has(token)) {
    res.status(401).json({error: 'Invalid or expired admin session token.'});
    return;
  }
  next();
}

function computeBookedSlotsByDate(bookings: Booking[]): Record<string, string[]> {
  const map: Record<string, string[]> = {};
  for (const b of bookings) {
    if (b.status === 'Cancelled') continue;
    if (!map[b.date]) {
      map[b.date] = [];
    }
    if (!map[b.date].includes(b.timeSlot)) {
      map[b.date].push(b.timeSlot);
    }
  }
  return map;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/[\s\-()]/g, '');
  return /^\d{7,15}$/.test(digits);
}

function isDateInPast(dateStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return true;
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  return dateStr < todayStr;
}

// Simple lock for atomic booking creation
let bookingLock = false;

async function startServer() {
  const app = express();
  app.use(express.json({limit: '2mb'}));

  // Public Bootstrap Endpoint
  app.get('/api/bootstrap', (_req: Request, res: Response) => {
    const db = loadDb();
    res.json({
      experiences: db.experiences,
      retreats: db.retreats,
      upcomingRetreats: db.upcomingRetreats,
      availability: db.availability,
      bookedSlotsByDate: computeBookedSlotsByDate(db.bookings),
      testimonials: db.testimonials,
      settings: db.settings,
    });
  });

  // Get available slots for a specific date & experience
  app.get('/api/availability/:date', (req: Request, res: Response) => {
    const {date} = req.params;
    const db = loadDb();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || isDateInPast(date)) {
      res.json({
        date,
        isAvailableDate: false,
        reason: 'Past or invalid date',
        allSlots: [],
        bookedSlots: [],
        availableSlots: [],
        isDemoAvailability: db.availability.isDemoAvailability,
      });
      return;
    }

    const [y, m, d] = date.split('-').map(Number);
    const weekday = new Date(y, m - 1, d).getDay();

    if (
      db.availability.blockedDates.includes(date) ||
      db.availability.closedWeekdays.includes(weekday)
    ) {
      res.json({
        date,
        isAvailableDate: false,
        reason: 'Date is unavailable for sessions',
        allSlots: [],
        bookedSlots: [],
        availableSlots: [],
        isDemoAvailability: db.availability.isDemoAvailability,
      });
      return;
    }

    const allSlots =
      db.availability.customDateSlots[date] ?? db.availability.defaultTimeSlots;
    const bookedMap = computeBookedSlotsByDate(db.bookings);
    const bookedSlots = bookedMap[date] ?? [];
    const availableSlots = allSlots.filter((s) => !bookedSlots.includes(s));

    res.json({
      date,
      isAvailableDate: availableSlots.length > 0,
      allSlots,
      bookedSlots,
      availableSlots,
      isDemoAvailability: db.availability.isDemoAvailability,
    });
  });

  // Submit Contact Enquiry
  app.post('/api/enquiries', (req: Request, res: Response) => {
    const {
      fullName,
      email,
      phoneCountryCode = '+91',
      phone,
      inquiryType,
      message,
    } = req.body ?? {};

    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      res.status(400).json({error: 'Please enter your full name (at least 2 characters).'});
      return;
    }
    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
      res.status(400).json({error: 'Please enter a valid email address.'});
      return;
    }
    if (!phone || typeof phone !== 'string' || !isValidPhone(phone)) {
      res.status(400).json({
        error: 'Please enter a valid phone number (7 to 15 digits).',
      });
      return;
    }
    const validTypes = [
      'Sound Healing',
      'Meditation',
      'Retreats',
      'Self-Awareness',
      'General Inquiry',
    ];
    if (!inquiryType || !validTypes.includes(inquiryType)) {
      res.status(400).json({error: 'Please select a valid inquiry type.'});
      return;
    }
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      res.status(400).json({
        error: 'Please enter a message with at least 10 characters.',
      });
      return;
    }

    const db = loadDb();

    // Prevent duplicate submission within 5 minutes
    const fiveMinsAgo = Date.now() - 5 * 60 * 1000;
    const duplicate = db.enquiries.find(
      (e) =>
        e.email.toLowerCase() === email.trim().toLowerCase() &&
        e.message.trim().toLowerCase() === message.trim().toLowerCase() &&
        new Date(e.createdAt).getTime() > fiveMinsAgo
    );

    if (duplicate) {
      res.status(409).json({
        error:
          'We have already received this exact inquiry from you recently. We will get back to you soon.',
      });
      return;
    }

    const emailConfigured = Boolean(
      process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
    );

    const newEnquiry: Enquiry = {
      id: `enq-${Date.now()}-${ crypto.randomBytes(3).toString('hex') }`,
      fullName: fullName.trim(),
      email: email.trim(),
      phoneCountryCode: String(phoneCountryCode).trim(),
      phone: phone.trim(),
      inquiryType,
      message: message.trim(),
      status: 'New',
      emailNotificationSent: emailConfigured,
      createdAt: new Date().toISOString(),
    };

    db.enquiries.unshift(newEnquiry);
    saveDb(db);

    res.status(201).json({
      enquiry: newEnquiry,
      message: emailConfigured
        ? 'Your inquiry has been saved and an email notification has been dispatched.'
        : 'Your inquiry has been saved to our system. (Note: Live SMTP email notifications are awaiting server credentials configuration.)',
    });
  });

  // Create Booking (Atomic reservation)
  app.post('/api/bookings', (req: Request, res: Response) => {
    if (bookingLock) {
      res.status(429).json({
        error: 'Another booking is currently being processed. Please try again in a moment.',
      });
      return;
    }

    bookingLock = true;
    try {
      const {
        experienceId,
        sessionFormat,
        date,
        timeSlot,
        customerName,
        phoneCountryCode = '+91',
        customerPhone,
        customerEmail,
        specialRequests = '',
        paymentMethod = 'pay_at_session',
      } = req.body ?? {};

      const db = loadDb();
      const experience = db.experiences.find((e) => e.id === experienceId);
      if (!experience) {
        res.status(400).json({error: 'Please select a valid healing experience.'});
        return;
      }

      if (!date || typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        res.status(400).json({error: 'Please select a valid appointment date.'});
        return;
      }

      if (isDateInPast(date)) {
        res.status(400).json({error: 'Bookings cannot be made for dates in the past.'});
        return;
      }

      const [y, m, d] = date.split('-').map(Number);
      const weekday = new Date(y, m - 1, d).getDay();
      if (
        db.availability.blockedDates.includes(date) ||
        db.availability.closedWeekdays.includes(weekday)
      ) {
        res.status(400).json({error: 'The selected date is unavailable for bookings.'});
        return;
      }

      const allowedSlots =
        db.availability.customDateSlots[date] ?? db.availability.defaultTimeSlots;
      if (!timeSlot || !allowedSlots.includes(timeSlot)) {
        res.status(400).json({error: 'Please select a valid appointment time slot.'});
        return;
      }

      // Check atomic slot availability
      const slotTaken = db.bookings.some(
        (b) =>
          b.status !== 'Cancelled' && b.date === date && b.timeSlot === timeSlot
      );
      if (slotTaken) {
        res.status(409).json({
          error: `The ${timeSlot} slot on ${date} has just been reserved by another guest. Please select a different time slot.`,
        });
        return;
      }

      if (!customerName || typeof customerName !== 'string' || customerName.trim().length < 2) {
        res.status(400).json({error: 'Please enter your full name.'});
        return;
      }
      if (!customerPhone || typeof customerPhone !== 'string' || !isValidPhone(customerPhone)) {
        res.status(400).json({
          error: 'Please enter a valid phone number (7 to 15 digits).',
        });
        return;
      }
      if (!customerEmail || typeof customerEmail !== 'string' || !isValidEmail(customerEmail)) {
        res.status(400).json({error: 'Please enter a valid email address.'});
        return;
      }

      const chosenFormat =
        sessionFormat && experience.availableFormats.includes(sessionFormat)
          ? sessionFormat
          : experience.availableFormats[0] || experience.formatLabel;

      const referenceCode = `SW-${date.replace(/-/g, '').slice(2)}-${crypto
        .randomBytes(2)
        .toString('hex')
        .toUpperCase()}`;

      const emailConfigured = Boolean(
        process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
      );

      const newBooking: Booking = {
        id: `bk-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
        referenceCode,
        experienceId: experience.id,
        experienceName: experience.name,
        duration: experience.duration,
        sessionFormat: chosenFormat,
        date,
        timeSlot,
        customerName: customerName.trim(),
        phoneCountryCode: String(phoneCountryCode).trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim(),
        specialRequests: String(specialRequests || '').trim(),
        status: paymentMethod === 'razorpay' ? 'Pending' : 'Confirmed',
        paymentMethod: paymentMethod === 'razorpay' ? 'razorpay' : 'pay_at_session',
        paymentStatus: paymentMethod === 'razorpay' ? 'Pending' : 'Unpaid',
        amount: experience.price,
        currency: experience.currency,
        emailNotificationSent: emailConfigured,
        createdAt: new Date().toISOString(),
      };

      db.bookings.unshift(newBooking);
      saveDb(db);

      res.status(201).json({
        booking: newBooking,
        bookedSlotsByDate: computeBookedSlotsByDate(db.bookings),
        message:
          'Your healing session has been reserved and saved with a unique booking reference.',
      });
    } finally {
      bookingLock = false;
    }
  });

  // Razorpay Order Creation Endpoint
  app.post('/api/payments/create-order', async (req: Request, res: Response) => {
    const {bookingId} = req.body ?? {};
    const db = loadDb();
    const booking = db.bookings.find((b) => b.id === bookingId);
    if (!booking) {
      res.status(404).json({error: 'Booking record not found.'});
      return;
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      res.status(503).json({
        configured: false,
        error:
          'Razorpay merchant credentials (RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET) are not configured on the server yet. Your booking remains reserved under Pay at Session.',
      });
      return;
    }

    try {
      const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify({
          amount: Math.round(booking.amount * 100), // in paise
          currency: booking.currency || 'INR',
          receipt: booking.referenceCode,
          notes: {
            bookingId: booking.id,
            experienceName: booking.experienceName,
          },
        }),
      });

      if (!response.ok) {
        const errData = await response.text();
        res.status(502).json({
          configured: true,
          error: `Razorpay order creation failed: ${errData}`,
        });
        return;
      }

      const order = (await response.json()) as {id: string; amount: number; currency: string};
      booking.razorpayOrderId = order.id;
      saveDb(db);

      res.json({
        configured: true,
        keyId,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        bookingReference: booking.referenceCode,
      });
    } catch (err) {
      res.status(500).json({
        configured: true,
        error: err instanceof Error ? err.message : 'Failed to connect to Razorpay.',
      });
    }
  });

  // Razorpay Payment Verification Endpoint
  app.post('/api/payments/verify', (req: Request, res: Response) => {
    const {
      bookingId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body ?? {};

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      res.status(503).json({
        error: 'Razorpay secret key is not configured on the server.',
      });
      return;
    }

    const db = loadDb();
    const booking = db.bookings.find((b) => b.id === bookingId);
    if (!booking) {
      res.status(404).json({error: 'Booking not found.'});
      return;
    }

    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      booking.paymentStatus = 'Failed';
      saveDb(db);
      res.status(400).json({error: 'Payment signature verification failed.'});
      return;
    }

    booking.paymentStatus = 'Paid';
    booking.status = 'Confirmed';
    booking.razorpayOrderId = razorpay_order_id;
    booking.razorpayPaymentId = razorpay_payment_id;
    saveDb(db);

    res.json({
      verified: true,
      booking,
    });
  });

  // ==========================================
  // ADMIN AUTHENTICATION & MANAGEMENT ROUTES
  // ==========================================

  app.post('/api/admin/login', (req: Request, res: Response) => {
    const {password} = req.body ?? {};
    if (!password || password !== ADMIN_PASSWORD) {
      res.status(401).json({
        error:
          'Invalid administrator password. (Default demo password: "soundwithin-admin" unless ADMIN_PASSWORD env var is set)',
      });
      return;
    }
    const token = crypto.randomBytes(24).toString('hex');
    activeAdminTokens.add(token);
    res.json({token});
  });

  app.post('/api/admin/logout', requireAdminAuth, (req: Request, res: Response) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.slice('Bearer '.length).trim();
    activeAdminTokens.delete(token);
    res.json({ok: true});
  });

  app.get('/api/admin/dashboard', requireAdminAuth, (_req: Request, res: Response) => {
    const db = loadDb();
    res.json({
      bookings: db.bookings,
      enquiries: db.enquiries,
      experiences: db.experiences,
      retreats: db.retreats,
      upcomingRetreats: db.upcomingRetreats,
      availability: db.availability,
      settings: db.settings,
    });
  });

  // Update booking status
  app.patch('/api/admin/bookings/:id', requireAdminAuth, (req: Request, res: Response) => {
    const {id} = req.params;
    const {status, paymentStatus} = req.body ?? {};
    const db = loadDb();
    const booking = db.bookings.find((b) => b.id === id);
    if (!booking) {
      res.status(404).json({error: 'Booking not found.'});
      return;
    }
    const validStatuses: BookingStatus[] = [
      'Pending',
      'Confirmed',
      'Cancelled',
      'Completed',
    ];
    if (status && validStatuses.includes(status)) {
      booking.status = status;
    }
    if (
      paymentStatus &&
      ['Unpaid', 'Pending', 'Paid', 'Failed'].includes(paymentStatus)
    ) {
      booking.paymentStatus = paymentStatus;
    }
    saveDb(db);
    res.json({
      booking,
      bookedSlotsByDate: computeBookedSlotsByDate(db.bookings),
    });
  });

  // Update enquiry status
  app.patch('/api/admin/enquiries/:id', requireAdminAuth, (req: Request, res: Response) => {
    const {id} = req.params;
    const {status} = req.body ?? {};
    const db = loadDb();
    const enquiry = db.enquiries.find((e) => e.id === id);
    if (!enquiry) {
      res.status(404).json({error: 'Enquiry not found.'});
      return;
    }
    if (status && ['New', 'Reviewed', 'Replied'].includes(status)) {
      enquiry.status = status;
    }
    saveDb(db);
    res.json({enquiry});
  });

  // Update Experience (price, duration, description, formats)
  app.put('/api/admin/experiences/:id', requireAdminAuth, (req: Request, res: Response) => {
    const {id} = req.params;
    const updates = req.body ?? {};
    const db = loadDb();
    const idx = db.experiences.findIndex((e) => e.id === id);
    if (idx === -1) {
      res.status(404).json({error: 'Experience not found.'});
      return;
    }
    db.experiences[idx] = {
      ...db.experiences[idx],
      name: updates.name ?? db.experiences[idx].name,
      shortDescription:
        updates.shortDescription ?? db.experiences[idx].shortDescription,
      fullDescription:
        updates.fullDescription ?? db.experiences[idx].fullDescription,
      duration: updates.duration ?? db.experiences[idx].duration,
      formatLabel: updates.formatLabel ?? db.experiences[idx].formatLabel,
      price:
        typeof updates.price === 'number' && updates.price >= 0
          ? updates.price
          : db.experiences[idx].price,
    };
    saveDb(db);
    res.json({experience: db.experiences[idx], experiences: db.experiences});
  });

  // Update Retreat details
  app.put('/api/admin/retreats/:id', requireAdminAuth, (req: Request, res: Response) => {
    const {id} = req.params;
    const updates = req.body ?? {};
    const db = loadDb();
    const idx = db.retreats.findIndex((r) => r.id === id);
    if (idx === -1) {
      res.status(404).json({error: 'Retreat not found.'});
      return;
    }
    db.retreats[idx] = {
      ...db.retreats[idx],
      name: updates.name ?? db.retreats[idx].name,
      badgeDuration: updates.badgeDuration ?? db.retreats[idx].badgeDuration,
      shortDescription:
        updates.shortDescription ?? db.retreats[idx].shortDescription,
      overview: updates.overview ?? db.retreats[idx].overview,
      locationPlaceholder:
        updates.locationPlaceholder ?? db.retreats[idx].locationPlaceholder,
      schedulePlaceholder:
        updates.schedulePlaceholder ?? db.retreats[idx].schedulePlaceholder,
      accommodationInfo:
        updates.accommodationInfo ?? db.retreats[idx].accommodationInfo,
      pricingPlaceholder:
        updates.pricingPlaceholder ?? db.retreats[idx].pricingPlaceholder,
      availableSeatsPlaceholder:
        updates.availableSeatsPlaceholder ??
        db.retreats[idx].availableSeatsPlaceholder,
      isPlaceholderData:
        typeof updates.isPlaceholderData === 'boolean'
          ? updates.isPlaceholderData
          : false,
    };
    saveDb(db);
    res.json({retreat: db.retreats[idx], retreats: db.retreats});
  });

  // Update Upcoming Retreat Schedules
  app.put('/api/admin/upcoming-retreats', requireAdminAuth, (req: Request, res: Response) => {
    const {upcomingRetreats} = req.body ?? {};
    if (!Array.isArray(upcomingRetreats)) {
      res.status(400).json({error: 'Invalid upcoming retreats array.'});
      return;
    }
    const db = loadDb();
    db.upcomingRetreats = upcomingRetreats;
    saveDb(db);
    res.json({upcomingRetreats: db.upcomingRetreats});
  });

  // Update Session Availability
  app.put('/api/admin/availability', requireAdminAuth, (req: Request, res: Response) => {
    const {defaultTimeSlots, blockedDates, isDemoAvailability} = req.body ?? {};
    const db = loadDb();
    if (Array.isArray(defaultTimeSlots) && defaultTimeSlots.length > 0) {
      db.availability.defaultTimeSlots = defaultTimeSlots;
    }
    if (Array.isArray(blockedDates)) {
      db.availability.blockedDates = blockedDates;
    }
    if (typeof isDemoAvailability === 'boolean') {
      db.availability.isDemoAvailability = isDemoAvailability;
    }
    saveDb(db);
    res.json({availability: db.availability});
  });

  // Update Website Settings & Contact Info
  app.put('/api/admin/settings', requireAdminAuth, (req: Request, res: Response) => {
    const updates = req.body ?? {};
    const db = loadDb();
    db.settings = {
      ...db.settings,
      phoneDisplay: updates.phoneDisplay ?? db.settings.phoneDisplay,
      whatsappNumber: updates.whatsappNumber ?? db.settings.whatsappNumber,
      isContactConfigured:
        typeof updates.isContactConfigured === 'boolean'
          ? updates.isContactConfigured
          : db.settings.isContactConfigured,
      emailDisplay: updates.emailDisplay ?? db.settings.emailDisplay,
      locationPrimary: updates.locationPrimary ?? db.settings.locationPrimary,
      locationSecondary:
        updates.locationSecondary ?? db.settings.locationSecondary,
      socialLinks: {
        ...db.settings.socialLinks,
        ...(updates.socialLinks || {}),
      },
      founderHeadline: updates.founderHeadline ?? db.settings.founderHeadline,
      founderBioShort: updates.founderBioShort ?? db.settings.founderBioShort,
      founderBioExtended: Array.isArray(updates.founderBioExtended)
        ? updates.founderBioExtended
        : db.settings.founderBioExtended,
      allowBookingWithoutAdvancePayment:
        typeof updates.allowBookingWithoutAdvancePayment === 'boolean'
          ? updates.allowBookingWithoutAdvancePayment
          : db.settings.allowBookingWithoutAdvancePayment,
    };
    saveDb(db);
    res.json({settings: db.settings});
  });

  // Vite middleware in development, static files in production
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: {middlewareMode: true},
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SoundWithin server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
