import {withBaseUrl} from '../utils/assetUrl';
import type {
  AvailabilityConfig,
  Experience,
  Retreat,
  Testimonial,
  UpcomingRetreatBatch,
  WebsiteSettings,
} from '../types';

/**
 * Static Presentation Mode flag.
 * Enabled by default for static client presentation & GitHub Pages deployment.
 * Set VITE_ENABLE_BACKEND="true" when resuming full-stack backend development.
 */
export const IS_STATIC_PRESENTATION =
  import.meta.env.VITE_ENABLE_BACKEND !== 'true';

export const STATIC_EXPERIENCES: Experience[] = [
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
    image: withBaseUrl('/assets/extracted/exp_sound_healing.png'),
    price: 2500,
    currency: 'INR',
    priceNote: 'Session Contribution',
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
    image: withBaseUrl('/assets/extracted/exp_guided_meditation.png'),
    price: 1800,
    currency: 'INR',
    priceNote: 'Session Contribution',
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
    image: withBaseUrl('/assets/extracted/exp_sound_bath.png'),
    price: 3500,
    currency: 'INR',
    priceNote: 'Session Contribution',
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
    image: withBaseUrl('/assets/extracted/exp_chakra_alignment.png'),
    price: 2800,
    currency: 'INR',
    priceNote: 'Session Contribution',
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
    image: withBaseUrl('/assets/extracted/exp_nature_retreat.png'),
    price: 6500,
    currency: 'INR',
    priceNote: 'Full-Day Retreat Contribution',
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
      'True healing unfolds when we listen deeply to our inner world. This structured multi-session mentorship weaves together contemplative inquiry, somatic mindfulness, reflective journaling, and personalized sound healing to help you recognize unconscious patterns, heal emotional wounds, and live from authentic clarity.',
    duration: 'Multi-Session',
    durationMinutes: 75,
    formatLabel: 'Online / In-Person',
    availableFormats: ['Online', 'In-Person'],
    iconType: 'triskelion',
    image: withBaseUrl('/assets/extracted/exp_self_awareness.png'),
    price: 4500,
    currency: 'INR',
    priceNote: 'Session Contribution',
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

export const STATIC_RETREATS: Retreat[] = [
  {
    id: 'retreat-sound-healing',
    slug: 'sound-healing-retreat',
    name: 'Sound Healing Retreat',
    badgeDuration: '2 Days / 1 Night',
    shortDescription:
      'A restorative retreat to relax your nervous system, release stress and recharge through immersive sound healing.',
    overview:
      'Designed as a gentle weekend sanctuary in nature, the Sound Healing Retreat immerses you in restorative frequencies, waterfallside stillness, and mindful rest. Ideal for anyone seeking to step out of chronic busyness and reset their nervous system in a supportive environment.',
    image: withBaseUrl('/assets/extracted/retreat_sound_healing.png'),
    features: [
      {icon: 'soundwave', label: 'Sound Baths'},
      {icon: 'lotus', label: 'Meditation'},
      {icon: 'leaf', label: 'Nature Time'},
    ],
    locationPlaceholder: 'Western Ghats Sanctuary, Igatpuri, Maharashtra',
    schedulePlaceholder: 'Dec 12 – Dec 14 (Weekend Immersion)',
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrival, Grounding & Twilight Sound Immersion',
        activities: [
          'Arrival welcome herbal tea & sanctuary orientation',
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
      'Eco-conscious private & twin-sharing sanctuary cottages surrounded by serene forest canopy.',
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
    pricingPlaceholder: 'Contact us for retreat contribution & room options',
    priceAmount: null,
    availableSeatsPlaceholder: 'Intimate small-group batch (Limited seats)',
    isPlaceholderData: false,
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
    image: withBaseUrl('/assets/extracted/retreat_self_awareness.png'),
    features: [
      {icon: 'lotus', label: 'Inner Work'},
      {icon: 'book', label: 'Journaling'},
      {icon: 'meditate', label: 'Meditation'},
    ],
    locationPlaceholder: 'Serene Forest Retreat Sanctuary, Wayanad, Kerala',
    schedulePlaceholder: 'Jan 09 – Jan 11 (3-Day Immersion)',
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
      'Serene nature-view rooms designed for quiet reflection and restful sleep.',
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
    pricingPlaceholder: 'Contact us for retreat contribution & room options',
    priceAmount: null,
    availableSeatsPlaceholder: 'Intimate small-group batch (Limited seats)',
    isPlaceholderData: false,
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
    image: withBaseUrl('/assets/extracted/retreat_transformation.png'),
    features: [
      {icon: 'soundwave', label: 'Deep Healing'},
      {icon: 'stones', label: 'Energy Balance'},
      {icon: 'infinity', label: 'Lasting Change'},
    ],
    locationPlaceholder: 'Rainforest Sanctuary Venue, Coorg, Karnataka',
    schedulePlaceholder: 'Feb 20 – Feb 24 (5-Day Flagship Immersion)',
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
      'Private sanctuary suites and eco-cottages immersed in tranquil natural surroundings.',
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
    pricingPlaceholder: 'Contact us for retreat contribution & suite options',
    priceAmount: null,
    availableSeatsPlaceholder: 'Limited cohort size for personal guidance',
    isPlaceholderData: false,
  },
];

export const STATIC_UPCOMING_RETREATS: UpcomingRetreatBatch[] = [
  {
    id: 'batch-1',
    retreatId: 'retreat-sound-healing',
    retreatName: 'Sound Healing Retreat',
    dateLabel: 'Dec 12 – Dec 14',
    locationLabel: 'Igatpuri, Maharashtra',
    seatsLabel: 'Registration Open — Enquire to Reserve',
    isPlaceholder: false,
  },
  {
    id: 'batch-2',
    retreatId: 'retreat-self-awareness',
    retreatName: 'Self-Awareness Retreat',
    dateLabel: 'Jan 09 – Jan 11',
    locationLabel: 'Wayanad, Kerala',
    seatsLabel: 'Registration Open — Enquire to Reserve',
    isPlaceholder: false,
  },
  {
    id: 'batch-3',
    retreatId: 'retreat-transformation',
    retreatName: 'Transformation Retreat',
    dateLabel: 'Feb 20 – Feb 24',
    locationLabel: 'Coorg, Karnataka',
    seatsLabel: 'Registration Open — Enquire to Reserve',
    isPlaceholder: false,
  },
];

export const STATIC_AVAILABILITY: AvailabilityConfig = {
  isDemoAvailability: false,
  defaultTimeSlots: ['10:00 AM', '12:00 PM', '3:00 PM', '5:00 PM', '7:00 PM'],
  customDateSlots: {},
  blockedDates: [],
  closedWeekdays: [],
};

export const STATIC_TESTIMONIALS: Testimonial[] = [
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
  {
    id: 'test-4',
    name: 'Siddharth Mehta',
    role: 'Creative Director',
    location: 'Hyderabad',
    experienceName: 'Sound Bath Journey',
    quote:
      'The multi-instrument sound bath felt like a deep energetic reset. By the end of the ninety minutes, my nervous system felt completely unburdened and my sleep improved immediately.',
  },
  {
    id: 'test-5',
    name: 'Kavya Subramanian',
    role: 'Yoga Educator & Wellness Coach',
    location: 'Chennai',
    experienceName: 'Chakra Sound Alignment',
    quote:
      'Every frequency was offered with such intuition and reverence. I could physically feel the vibrations clearing tension through my chest and shoulders, leaving me centred and radiant.',
  },
  {
    id: 'test-6',
    name: 'Vikramaditya Joshi',
    role: 'Entrepreneur & Founder',
    location: 'Delhi',
    experienceName: 'Transformation Retreat',
    quote:
      'Five days immersed in forest silence, guided meditation, and evening sound baths shifted my entire perspective on life and work. I returned home with lasting clarity and inner peace.',
  },
];

export const STATIC_SETTINGS: WebsiteSettings = {
  phoneDisplay: '+91 98765 43210',
  whatsappNumber: '919876543210',
  isContactConfigured: true,
  emailDisplay: 'hello@soundwithin.in',
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
    'SoundWithin was founded with a single heartfelt intention: to offer a serene, authentic space where individuals can pause from the noise of modern life and return to their natural inner frequency.',
    'Through the therapeutic resonance of traditional Himalayan singing bowls, crystal alchemy instruments, mindful breathwork, and immersion in the living waters and forests of the Western Ghats, each session is held with deep presence, humility, and care.',
  ],
  founderNoteLabel: 'Sound Healing Practitioner & Meditation Guide',
  allowBookingWithoutAdvancePayment: true,
  razorpayConfigured: false,
  razorpayKeyIdPublic: '',
  emailIntegrationConfigured: false,
};
