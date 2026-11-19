import React, {useState, useRef, useEffect, useCallback} from 'react';
import {Calendar, ChevronLeft, ChevronRight, MapPin} from 'lucide-react';
import {getUpcomingRetreatButtonToken} from '../utils/buttonThemes';
import type {UpcomingRetreatBatch} from '../types';

export interface UpcomingRetreatCarouselProps {
  batches: UpcomingRetreatBatch[];
  onSelectBatch: (batch: UpcomingRetreatBatch) => void;
  onViewAllDates?: () => void;
}

interface CardVisualTheme {
  id: string;
  cardBgGradient: string;
  borderColor: string;
  waveFillPrimary: string;
  waveFillSecondary: string;
  glowColor: string;
  titleColor: string;
  metaTextColor: string;
  iconColor: string;
  dividerColor: string;
  buttonBg: string;
  buttonHoverBg: string;
  buttonShadow: string;
  dotActiveBg: string;
  artwork: 'lotus' | 'stones' | 'leaves';
}

const CARD_THEMES: Record<string, CardVisualTheme> = {
  'retreat-sound-healing': {
    id: 'retreat-sound-healing',
    cardBgGradient:
      'linear-gradient(118deg, #FDF2EE 0%, #FCE6DF 46%, #F9D2C9 100%)',
    borderColor: '#F1CBC3',
    waveFillPrimary: '#F7C6BE',
    waveFillSecondary: '#FAD8D0',
    glowColor: 'rgba(247, 178, 168, 0.36)',
    titleColor: '#762333',
    metaTextColor: '#69343E',
    iconColor: '#983B4C',
    dividerColor: '#CCA3AA',
    buttonBg: '#913847',
    buttonHoverBg: '#7A2B38',
    buttonShadow: '0 4px 14px rgba(145, 56, 71, 0.28)',
    dotActiveBg: '#913847',
    artwork: 'lotus',
  },
  'retreat-self-awareness': {
    id: 'retreat-self-awareness',
    cardBgGradient:
      'linear-gradient(118deg, #F5F5E3 0%, #ECF0D7 48%, #DDE5BD 100%)',
    borderColor: '#D6DFB3',
    waveFillPrimary: '#CCD7A4',
    waveFillSecondary: '#DCE4BA',
    glowColor: 'rgba(232, 238, 198, 0.55)',
    titleColor: '#1E341D',
    metaTextColor: '#3B4829',
    iconColor: '#4B5E22',
    dividerColor: '#B5C096',
    buttonBg: '#4C5F1C',
    buttonHoverBg: '#3B4B14',
    buttonShadow: '0 4px 14px rgba(76, 95, 28, 0.28)',
    dotActiveBg: '#4C5F1C',
    artwork: 'stones',
  },
  'retreat-transformation': {
    id: 'retreat-transformation',
    cardBgGradient:
      'linear-gradient(118deg, #F5ECFD 0%, #EAD9FB 48%, #DEC3F8 100%)',
    borderColor: '#D7B9F4',
    waveFillPrimary: '#CCA7F2',
    waveFillSecondary: '#DCBEF7',
    glowColor: 'rgba(255, 255, 255, 0.52)',
    titleColor: '#340F4B',
    metaTextColor: '#4E2A6B',
    iconColor: '#7440A2',
    dividerColor: '#BE9FD9',
    buttonBg: '#471261',
    buttonHoverBg: '#360B4C',
    buttonShadow: '0 4px 14px rgba(71, 18, 97, 0.28)',
    dotActiveBg: '#471261',
    artwork: 'leaves',
  },
};

const FALLBACK_THEMES: CardVisualTheme[] = [
  CARD_THEMES['retreat-sound-healing'],
  CARD_THEMES['retreat-self-awareness'],
  CARD_THEMES['retreat-transformation'],
];

function LotusCornerArtwork() {
  return (
    <svg
      viewBox="0 0 220 175"
      fill="none"
      className="w-[150px] sm:w-[195px] lg:w-[220px] h-auto pointer-events-none select-none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="lotusCoreGlow" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#FFF5B8" />
          <stop offset="55%" stopColor="#F9D56E" />
          <stop offset="100%" stopColor="#E4A842" />
        </radialGradient>
        <linearGradient id="lotusPetalMain" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFDCE8" />
          <stop offset="55%" stopColor="#F89EC0" />
          <stop offset="100%" stopColor="#DC6492" />
        </linearGradient>
        <linearGradient id="lotusPetalDeep" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FCA8C6" />
          <stop offset="65%" stopColor="#E6709E" />
          <stop offset="100%" stopColor="#BA406F" />
        </linearGradient>
        <linearGradient id="lotusPetalFront" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFE6EF" />
          <stop offset="50%" stopColor="#F5A7C6" />
          <stop offset="100%" stopColor="#DF6D99" />
        </linearGradient>
        <linearGradient id="lotusLeafGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A2BE6A" />
          <stop offset="100%" stopColor="#5D7D36" />
        </linearGradient>
      </defs>

      {/* Subtle green leaves & stem under lotus */}
      <path
        d="M150 132C155 152 162 168 171 178"
        stroke="#739144"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M148 158C124 148 106 154 96 172C116 177 137 172 148 158Z"
        fill="url(#lotusLeafGreen)"
        opacity="0.88"
      />
      <path
        d="M157 148C178 134 202 138 214 156C198 168 175 164 157 148Z"
        fill="url(#lotusLeafGreen)"
        opacity="0.92"
      />
      <path
        d="M168 158C188 152 208 160 216 174C198 178 180 172 168 158Z"
        fill="#6E8E3F"
        opacity="0.8"
      />

      {/* Back outer petals */}
      <path
        d="M118 118C90 100 72 72 68 46C95 52 114 78 124 114Z"
        fill="url(#lotusPetalDeep)"
        opacity="0.88"
      />
      <path
        d="M154 116C174 86 186 58 188 32C164 44 148 72 144 112Z"
        fill="url(#lotusPetalDeep)"
        opacity="0.88"
      />

      {/* Far left & right spreading petals */}
      <path
        d="M114 128C76 122 44 108 26 88C54 84 86 96 116 122Z"
        fill="url(#lotusPetalMain)"
        opacity="0.92"
      />
      <path
        d="M162 126C192 116 210 98 216 74C194 76 174 94 158 122Z"
        fill="url(#lotusPetalMain)"
        opacity="0.92"
      />

      {/* Mid inner petals framing the glowing golden core */}
      <path
        d="M136 116C122 86 122 54 136 30C150 54 150 86 136 116Z"
        fill="url(#lotusPetalMain)"
      />
      <path
        d="M126 122C102 104 88 76 92 48C112 64 126 90 132 120Z"
        fill="url(#lotusPetalMain)"
      />
      <path
        d="M148 122C168 100 176 72 170 46C152 64 142 90 140 120Z"
        fill="url(#lotusPetalMain)"
      />

      {/* Golden center & stamens */}
      <ellipse cx="137" cy="96" rx="18" ry="11" fill="url(#lotusCoreGlow)" />
      <circle cx="127" cy="92" r="2.2" fill="#FFF8D4" />
      <circle cx="134" cy="89" r="2.2" fill="#FFF8D4" />
      <circle cx="141" cy="89" r="2.2" fill="#FFF8D4" />
      <circle cx="148" cy="92" r="2.2" fill="#FFF8D4" />

      {/* Front foreground cradling petals */}
      <path
        d="M137 138C116 134 104 114 108 94C122 100 132 118 137 138Z"
        fill="url(#lotusPetalFront)"
      />
      <path
        d="M137 138C158 134 170 114 166 94C152 100 142 118 137 138Z"
        fill="url(#lotusPetalFront)"
      />
      <path
        d="M137 142C126 136 120 118 127 100C134 104 140 104 147 100C154 118 148 136 137 142Z"
        fill="url(#lotusPetalFront)"
      />
      <path
        d="M114 134C92 138 66 132 48 118C72 114 96 120 116 130Z"
        fill="url(#lotusPetalDeep)"
        opacity="0.86"
      />
      <path
        d="M160 134C182 136 202 128 214 112C194 110 176 118 158 130Z"
        fill="url(#lotusPetalDeep)"
        opacity="0.86"
      />
    </svg>
  );
}

function ZenStonesCornerArtwork() {
  return (
    <svg
      viewBox="0 0 220 175"
      fill="none"
      className="w-[150px] sm:w-[195px] lg:w-[220px] h-auto pointer-events-none select-none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="stoneBottomGrad" cx="38%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#858A7E" />
          <stop offset="45%" stopColor="#4F554A" />
          <stop offset="100%" stopColor="#262B23" />
        </radialGradient>
        <radialGradient id="stoneMidGrad" cx="38%" cy="28%" r="65%">
          <stop offset="0%" stopColor="#8E9287" />
          <stop offset="50%" stopColor="#555A4F" />
          <stop offset="100%" stopColor="#2A2F27" />
        </radialGradient>
        <radialGradient id="stoneTopGrad" cx="38%" cy="28%" r="65%">
          <stop offset="0%" stopColor="#94988C" />
          <stop offset="50%" stopColor="#585D52" />
          <stop offset="100%" stopColor="#2D3229" />
        </radialGradient>
        <linearGradient id="bambooLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B6CC76" />
          <stop offset="100%" stopColor="#6D8D3B" />
        </linearGradient>
      </defs>

      {/* Right botanical bamboo/leaf stems behind the stones */}
      <path
        d="M174 166C174 115 186 64 206 16"
        stroke="#7A9744"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M196 34C188 18 196 4 208 2C210 16 204 28 196 34Z"
        fill="url(#bambooLeafGrad)"
      />
      <path
        d="M188 54C168 42 162 24 172 14C185 24 190 40 188 54Z"
        fill="url(#bambooLeafGrad)"
      />
      <path
        d="M190 58C204 48 214 48 218 58C209 67 198 66 190 58Z"
        fill="url(#bambooLeafGrad)"
      />
      <path
        d="M180 86C158 76 150 56 160 44C174 54 182 70 180 86Z"
        fill="url(#bambooLeafGrad)"
      />
      <path
        d="M182 88C198 76 212 76 218 86C208 97 192 96 182 88Z"
        fill="url(#bambooLeafGrad)"
      />

      {/* Base wide horizontal green leaves around bottom stone */}
      <path
        d="M126 156C104 146 84 150 72 164C92 171 112 168 126 156Z"
        fill="url(#bambooLeafGrad)"
        opacity="0.88"
      />
      <path
        d="M116 148C94 134 74 132 62 144C80 156 100 156 116 148Z"
        fill="url(#bambooLeafGrad)"
        opacity="0.78"
      />
      <path
        d="M168 156C188 144 208 146 218 158C202 170 182 168 168 156Z"
        fill="url(#bambooLeafGrad)"
        opacity="0.9"
      />

      {/* Soft ground shadow under cairn */}
      <ellipse
        cx="142"
        cy="160"
        rx="48"
        ry="10"
        fill="#2C3522"
        opacity="0.22"
      />

      {/* Bottom large river stone */}
      <path
        d="M96 138C96 123 116 115 142 115C168 115 188 124 188 139C188 154 166 160 142 160C116 160 96 152 96 138Z"
        fill="url(#stoneBottomGrad)"
      />
      <ellipse
        cx="132"
        cy="126"
        rx="20"
        ry="5"
        fill="#FFFFFF"
        opacity="0.16"
      />

      {/* Middle river stone */}
      <path
        d="M107 108C107 95 123 89 142 89C162 89 177 96 177 108C177 119 160 123 142 123C124 123 107 118 107 108Z"
        fill="url(#stoneMidGrad)"
      />
      <ellipse
        cx="134"
        cy="98"
        rx="15"
        ry="3.8"
        fill="#FFFFFF"
        opacity="0.18"
      />

      {/* Top small smooth stone */}
      <path
        d="M119 81C119 71 129 66 142 66C155 66 165 72 165 81C165 89 154 93 142 93C129 93 119 89 119 81Z"
        fill="url(#stoneTopGrad)"
      />
      <ellipse
        cx="136"
        cy="74"
        rx="10"
        ry="2.8"
        fill="#FFFFFF"
        opacity="0.22"
      />
    </svg>
  );
}

function LavenderLeavesCornerArtwork() {
  return (
    <svg
      viewBox="0 0 220 175"
      fill="none"
      className="w-[145px] sm:w-[188px] lg:w-[215px] h-auto pointer-events-none select-none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lavLeafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B88EE7" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#7E52BA" stopOpacity="0.88" />
        </linearGradient>
        <linearGradient id="lavLeafGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D3B4F5" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#9C71D7" stopOpacity="0.82" />
        </linearGradient>
      </defs>

      {/* Secondary soft background stem */}
      <path
        d="M138 175C142 138 158 102 184 68"
        stroke="#A47BE0"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M168 92C154 82 152 66 164 58C174 68 176 82 168 92Z"
        fill="url(#lavLeafGrad2)"
        opacity="0.55"
      />
      <path
        d="M154 118C138 108 136 92 148 84C158 94 160 108 154 118Z"
        fill="url(#lavLeafGrad2)"
        opacity="0.5"
      />
      <path
        d="M144 146C128 136 126 120 138 112C148 122 150 136 144 146Z"
        fill="url(#lavLeafGrad2)"
        opacity="0.45"
      />

      {/* Primary foreground arched botanical stem */}
      <path
        d="M174 175C178 128 188 80 162 24"
        stroke="#8658C4"
        strokeWidth="2.1"
        strokeLinecap="round"
        opacity="0.78"
      />
      {/* Top terminal leaf */}
      <path
        d="M162 24C154 10 160 2 169 4C174 14 170 22 162 24Z"
        fill="url(#lavLeafGrad1)"
      />
      {/* Upper leaf pair */}
      <path
        d="M168 44C150 38 140 24 146 14C158 18 168 30 168 44Z"
        fill="url(#lavLeafGrad1)"
      />
      <path
        d="M171 48C184 36 198 36 206 46C196 58 182 58 171 48Z"
        fill="url(#lavLeafGrad1)"
      />
      {/* Mid-upper leaf pair */}
      <path
        d="M174 74C152 68 140 52 148 40C162 46 172 60 174 74Z"
        fill="url(#lavLeafGrad1)"
      />
      <path
        d="M177 78C194 64 210 64 218 76C206 88 190 88 177 78Z"
        fill="url(#lavLeafGrad1)"
      />
      {/* Middle leaf pair */}
      <path
        d="M177 104C154 98 142 82 150 70C164 76 174 90 177 104Z"
        fill="url(#lavLeafGrad1)"
      />
      <path
        d="M179 108C196 96 212 96 218 108C206 120 190 120 179 108Z"
        fill="url(#lavLeafGrad1)"
      />
      {/* Lower leaf pair */}
      <path
        d="M176 136C152 130 142 114 150 102C164 108 174 122 176 136Z"
        fill="url(#lavLeafGrad1)"
      />
      <path
        d="M178 140C194 128 210 130 216 142C204 152 188 150 178 140Z"
        fill="url(#lavLeafGrad1)"
      />
    </svg>
  );
}

export function UpcomingRetreatCarousel({
  batches,
  onSelectBatch,
  onViewAllDates,
}: UpcomingRetreatCarouselProps) {
  const count = batches.length;
  // Clone-boundary sequence: [last, ...batches, first] for seamless infinite sliding
  const loopedBatches =
    count > 1
      ? [batches[count - 1], ...batches, batches[0]]
      : batches;

  const [trackIndex, setTrackIndex] = useState<number>(count > 1 ? 1 : 0);
  const [isAnimated, setIsAnimated] = useState<boolean>(true);
  const [dragDeltaPx, setDragDeltaPx] = useState<number>(0);

  const viewportRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);
  const isTransitioningRef = useRef<boolean>(false);

  // Sync if batches count changes
  useEffect(() => {
    setIsAnimated(false);
    setTrackIndex(batches.length > 1 ? 1 : 0);
    isTransitioningRef.current = false;
  }, [batches.length]);

  // Re-enable smooth slide transitions after silent clone-boundary snap
  useEffect(() => {
    if (!isAnimated) {
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => {
          setIsAnimated(true);
        });
        return () => cancelAnimationFrame(raf2);
      });
      return () => cancelAnimationFrame(raf1);
    }
  }, [isAnimated, trackIndex]);

  const activeDotIndex =
    count > 1
      ? ((trackIndex - 1) % count + count) % count
      : 0;

  const activeBatch = batches[activeDotIndex];
  const activeTheme =
    (activeBatch && CARD_THEMES[activeBatch.retreatId]) ||
    FALLBACK_THEMES[activeDotIndex % FALLBACK_THEMES.length];

  const goNext = useCallback(() => {
    if (count <= 1) return;
    if (trackIndex >= count + 1) {
      // Normalize silently to first real item then advance
      setIsAnimated(false);
      setTrackIndex(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimated(true);
          setTrackIndex(2);
        });
      });
      return;
    }
    setIsAnimated(true);
    isTransitioningRef.current = true;
    setTrackIndex((prev) => prev + 1);
  }, [count, trackIndex]);

  const goPrev = useCallback(() => {
    if (count <= 1) return;
    if (trackIndex <= 0) {
      setIsAnimated(false);
      setTrackIndex(count);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimated(true);
          setTrackIndex(count - 1);
        });
      });
      return;
    }
    setIsAnimated(true);
    isTransitioningRef.current = true;
    setTrackIndex((prev) => prev - 1);
  }, [count, trackIndex]);

  const goToSlide = (targetIdx: number) => {
    if (count <= 1) return;
    setIsAnimated(true);
    isTransitioningRef.current = true;
    setTrackIndex(targetIdx + 1);
  };

  const handleTransitionEnd = () => {
    isTransitioningRef.current = false;
    if (count <= 1) return;
    if (trackIndex >= count + 1) {
      setIsAnimated(false);
      setTrackIndex(1);
    } else if (trackIndex <= 0) {
      setIsAnimated(false);
      setTrackIndex(count);
    }
  };

  // Touch / Swipe Handlers for Mobile & Tablet
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (count <= 1 || e.touches.length !== 1) return;
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    isHorizontalSwipeRef.current = null;

    // Normalize clone boundary before starting drag
    if (trackIndex >= count + 1) {
      setIsAnimated(false);
      setTrackIndex(1);
    } else if (trackIndex <= 0) {
      setIsAnimated(false);
      setTrackIndex(count);
    }
    setDragDeltaPx(0);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (count <= 1 || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - touchStartXRef.current;
    const dy = e.touches[0].clientY - touchStartYRef.current;

    if (isHorizontalSwipeRef.current === null) {
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        isHorizontalSwipeRef.current = Math.abs(dx) > Math.abs(dy);
      }
    }

    if (isHorizontalSwipeRef.current) {
      setDragDeltaPx(dx);
    }
  };

  const handleTouchEnd = () => {
    if (count <= 1) return;
    const dx = dragDeltaPx;
    setDragDeltaPx(0);

    if (isHorizontalSwipeRef.current && Math.abs(dx) > 42) {
      if (dx < 0) {
        goNext();
      } else {
        goPrev();
      }
    } else if (Math.abs(dx) > 0) {
      setIsAnimated(true);
    }
    isHorizontalSwipeRef.current = null;
  };

  if (count === 0) return null;

  return (
    <div
      className="mt-7 sm:mt-9"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') goNext();
        if (e.key === 'ArrowLeft') goPrev();
      }}
    >
      {/* Carousel Frame with Desktop/Laptop Left & Right Arrow Controls */}
      <div className="relative flex items-center">
        {/* Desktop & Laptop Previous Arrow */}
        {count > 1 && (
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous upcoming retreat"
            className="hidden md:flex items-center justify-center absolute left-2.5 lg:left-3.5 z-20 w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-white/92 to-[#F4E9FC]/90 hover:from-white hover:to-[#E9D5FA] backdrop-blur-xs border border-[#DFC9F2] text-[#3B1554] shadow-[0_4px_14px_rgba(45,15,65,0.14)] hover:scale-105 active:scale-95 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5D237A]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Single-Card-at-a-Time Horizontal Viewport */}
        <div
          ref={viewportRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          aria-roledescription="carousel"
          aria-label="Upcoming Retreats Cards"
          className="w-full overflow-hidden rounded-[22px] touch-pan-y"
        >
          <div
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translate3d(calc(-${trackIndex * 100}% + ${dragDeltaPx}px), 0, 0)`,
              transition:
                isAnimated && dragDeltaPx === 0
                  ? 'transform 480ms cubic-bezier(0.22, 1, 0.36, 1)'
                  : 'none',
            }}
            className="flex w-full will-change-transform"
          >
            {loopedBatches.map((batch, idx) => {
              const theme =
                CARD_THEMES[batch.retreatId] ||
                FALLBACK_THEMES[idx % FALLBACK_THEMES.length];

              return (
                <div
                  key={`${batch.id}-slide-${idx}`}
                  className="w-full shrink-0"
                >
                  <article
                    style={{
                      background: theme.cardBgGradient,
                      borderColor: theme.borderColor,
                    }}
                    className="relative w-full min-h-[172px] sm:min-h-[195px] lg:min-h-[212px] rounded-[22px] border shadow-[0_8px_24px_rgba(62,20,88,0.07)] overflow-hidden flex items-center"
                  >
                    {/* Soft Atmospheric Radial Glow in Upper Right */}
                    <div
                      style={{background: theme.glowColor}}
                      className="absolute -top-6 right-16 w-48 h-48 rounded-full blur-2xl pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Soft Layered Wavy Background Curves */}
                    <svg
                      viewBox="0 0 800 220"
                      fill="none"
                      preserveAspectRatio="none"
                      className="absolute inset-0 w-full h-full pointer-events-none select-none"
                      aria-hidden="true"
                    >
                      <path
                        d="M0 150 C160 115, 310 185, 490 145 C630 112, 725 130, 800 105 L800 220 L0 220 Z"
                        fill={theme.waveFillSecondary}
                        fillOpacity="0.6"
                      />
                      <path
                        d="M0 178 C200 148, 360 205, 560 165 C685 140, 745 155, 800 142 L800 220 L0 220 Z"
                        fill={theme.waveFillPrimary}
                        fillOpacity="0.52"
                      />
                    </svg>

                    {/* Right Botanical Artwork */}
                    <div className="absolute bottom-0 right-1 sm:right-4 lg:right-8 z-0 pointer-events-none">
                      {theme.artwork === 'lotus' && <LotusCornerArtwork />}
                      {theme.artwork === 'stones' && <ZenStonesCornerArtwork />}
                      {theme.artwork === 'leaves' && (
                        <LavenderLeavesCornerArtwork />
                      )}
                    </div>

                    {/* Left Card Content (Preserving Exact Content & Adding Arrow Clearance on Desktop/Laptop) */}
                    <div className="relative z-10 w-full px-6 py-5 sm:px-9 sm:py-6.5 md:pl-16 lg:pl-20 md:pr-44 lg:pr-56">
                      <h4
                        style={{color: theme.titleColor}}
                        className="font-serif-display text-[24px] sm:text-[29px] lg:text-[33px] font-medium leading-[1.16] tracking-[0.005em] mb-2.5 sm:mb-3"
                      >
                        {batch.retreatName}
                      </h4>

                      {/* Calendar Date | MapPin Location Row */}
                      <div
                        style={{color: theme.metaTextColor}}
                        className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-sans-body text-[13.5px] sm:text-[15.5px] mb-4 sm:mb-5"
                      >
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar
                            style={{color: theme.iconColor}}
                            className="w-4 h-4 shrink-0"
                            strokeWidth={1.8}
                          />
                          <span>{batch.dateLabel}</span>
                        </span>

                        <span
                          style={{backgroundColor: theme.dividerColor}}
                          className="hidden xs:inline-block sm:inline-block w-[1px] h-4 shrink-0"
                          aria-hidden="true"
                        />

                        <span className="inline-flex items-center gap-1.5">
                          <MapPin
                            style={{color: theme.iconColor}}
                            className="w-4 h-4 shrink-0"
                            strokeWidth={1.8}
                          />
                          <span>{batch.locationLabel}</span>
                        </span>
                      </div>

                      {/* Contextual Pastel Gradient Pill View All Dates Button */}
                      <button
                        type="button"
                        onClick={() =>
                          onSelectBatch
                            ? onSelectBatch(batch)
                            : onViewAllDates?.()
                        }
                        className={`inline-flex items-center justify-center px-6 sm:px-7 py-2 sm:py-2.5 rounded-full font-sans-body text-[13px] sm:text-[14.5px] font-semibold tracking-[0.01em] cursor-pointer text-center whitespace-nowrap ${getUpcomingRetreatButtonToken(batch.retreatId, idx)}`}
                      >
                        <span>View All Dates</span>
                      </button>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop & Laptop Next Arrow */}
        {count > 1 && (
          <button
            type="button"
            onClick={goNext}
            aria-label="Next upcoming retreat"
            className="hidden md:flex items-center justify-center absolute right-2.5 lg:right-3.5 z-20 w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-white/92 to-[#F4E9FC]/90 hover:from-white hover:to-[#E9D5FA] backdrop-blur-xs border border-[#DFC9F2] text-[#3B1554] shadow-[0_4px_14px_rgba(45,15,65,0.14)] hover:scale-105 active:scale-95 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5D237A]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Pagination Dots Directly Below Card */}
      {count > 1 && (
        <div
          className="mt-3.5 sm:mt-4 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Upcoming retreats slides"
        >
          {batches.map((batch, idx) => {
            const isActive = idx === activeDotIndex;
            return (
              <button
                key={batch.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`View ${batch.retreatName}`}
                onClick={() => goToSlide(idx)}
                style={
                  isActive ? {backgroundColor: activeTheme.dotActiveBg} : undefined
                }
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5D237A] ${
                  isActive
                    ? 'w-7 shadow-xs'
                    : 'w-2 bg-[#D3BCEB] hover:bg-[#B490DA]'
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
