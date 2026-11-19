/**
 * Contextual Gradient Design Tokens for SOUNDWITHIN Buttons
 * Maps each card ID and section context to its matching CSS gradient token class.
 */

export const BUTTON_TOKENS = {
  general: 'sw-btn-pill sw-btn-general',
  softViolet: 'sw-btn-pill sw-btn-soft-violet',
  lavenderViolet: 'sw-btn-pill sw-btn-lavender-violet',
  blushRose: 'sw-btn-pill sw-btn-blush-rose',
  peachLavender: 'sw-btn-pill sw-btn-peach-lavender',
  softVioletPastel: 'sw-btn-pill sw-btn-soft-violet-pastel',
  mintLavender: 'sw-btn-pill sw-btn-mint-lavender',
  sageMoss: 'sw-btn-pill sw-btn-sage-moss',
  rosePlum: 'sw-btn-pill sw-btn-rose-plum',
  secondary: 'sw-btn-pill sw-btn-pastel-secondary',
} as const;

const EXPERIENCE_BUTTON_BY_ID: Record<string, string> = {
  // 1. Sound Healing Session (Pastel Rose Pink card) -> Lavender to Violet
  'exp-sound-healing': BUTTON_TOKENS.lavenderViolet,
  // 2. Guided Meditation (Pastel Warm Peach card) -> Soft Violet to Lavender
  'exp-guided-meditation': BUTTON_TOKENS.softVioletPastel,
  // 3. Sound Bath Journey (Pastel Lavender Lilac card) -> Peach to Warm Lavender
  'exp-sound-bath': BUTTON_TOKENS.peachLavender,
  // 4. Chakra Sound Alignment (Pastel Orchid Violet card) -> Blush Pink to Soft Rose
  'exp-chakra-alignment': BUTTON_TOKENS.blushRose,
  // 5. Nature Sound Retreat (Pastel Mint Sage card) -> Mint Cream to Soft Lavender
  'exp-nature-retreat': BUTTON_TOKENS.mintLavender,
  // 6. Self-Awareness Journey (Pastel Warm Apricot Blush card) -> Blush Pink to Soft Rose
  'exp-self-awareness': BUTTON_TOKENS.blushRose,
};

const EXPERIENCE_BUTTON_FALLBACKS = [
  BUTTON_TOKENS.lavenderViolet,
  BUTTON_TOKENS.softVioletPastel,
  BUTTON_TOKENS.peachLavender,
  BUTTON_TOKENS.blushRose,
  BUTTON_TOKENS.mintLavender,
  BUTTON_TOKENS.blushRose,
];

export function getExperienceButtonToken(experienceId: string, index = 0): string {
  return (
    EXPERIENCE_BUTTON_BY_ID[experienceId] ||
    EXPERIENCE_BUTTON_FALLBACKS[index % EXPERIENCE_BUTTON_FALLBACKS.length]
  );
}

const RETREAT_BUTTON_BY_ID: Record<string, string> = {
  // 1. Sound Healing Retreat (Blush Pink card) -> Lavender to Violet
  'retreat-sound-healing': BUTTON_TOKENS.lavenderViolet,
  // 2. Self-Awareness Retreat (Warm Peach card) -> Blush Pink to Soft Rose
  'retreat-self-awareness': BUTTON_TOKENS.blushRose,
  // 3. Transformation Retreat (Soft Lavender card) -> Peach to Warm Lavender
  'retreat-transformation': BUTTON_TOKENS.peachLavender,
};

const RETREAT_BUTTON_FALLBACKS = [
  BUTTON_TOKENS.lavenderViolet,
  BUTTON_TOKENS.blushRose,
  BUTTON_TOKENS.peachLavender,
];

export function getRetreatButtonToken(retreatId: string, index = 0): string {
  return (
    RETREAT_BUTTON_BY_ID[retreatId] ||
    RETREAT_BUTTON_FALLBACKS[index % RETREAT_BUTTON_FALLBACKS.length]
  );
}

const UPCOMING_RETREAT_BUTTON_BY_ID: Record<string, string> = {
  // 1. Peach/Pink lotus horizontal card -> Blush Pink to Soft Rose
  'retreat-sound-healing': BUTTON_TOKENS.blushRose,
  // 2. Sage green/cream stones horizontal card -> Sage Cream to Soft Moss
  'retreat-self-awareness': BUTTON_TOKENS.sageMoss,
  // 3. Lavender/Purple botanical horizontal card -> Lavender to Violet
  'retreat-transformation': BUTTON_TOKENS.lavenderViolet,
};

export function getUpcomingRetreatButtonToken(retreatId: string, index = 0): string {
  return (
    UPCOMING_RETREAT_BUTTON_BY_ID[retreatId] ||
    RETREAT_BUTTON_FALLBACKS[index % RETREAT_BUTTON_FALLBACKS.length]
  );
}
