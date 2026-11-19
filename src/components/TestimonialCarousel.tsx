import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {Quote} from 'lucide-react';
import type {Testimonial} from '../types';

export interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  /** Continuous scroll speed in px/sec for Desktop (3 cards) & Tablet (2 cards) */
  continuousSpeedPxPerSec?: number;
  /** Autoplay step interval in ms for Mobile (1 card at a time) */
  mobileStepIntervalMs?: number;
}

type ViewportMode = 'mobile' | 'tablet' | 'desktop';

function getViewportMode(): ViewportMode {
  if (typeof window === 'undefined') return 'desktop';
  if (window.innerWidth < 640) return 'mobile';
  if (window.innerWidth < 1024) return 'tablet';
  return 'desktop';
}

export function TestimonialCarousel({
  testimonials,
  continuousSpeedPxPerSec = 42,
  mobileStepIntervalMs = 3400,
}: TestimonialCarouselProps) {
  const count = testimonials.length;

  // Triple the slide list [Set 0, Set 1 (middle active set), Set 2] for seamless infinite looping in both directions
  const loopedSlides = useMemo(() => {
    if (count === 0) return [];
    return [...testimonials, ...testimonials, ...testimonials];
  }, [testimonials, count]);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [mode, setMode] = useState<ViewportMode>(() => getViewportMode());
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState<boolean>(false);

  // Desktop & Tablet continuous animation refs (avoiding React re-renders on every frame)
  const isHoveredRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const offsetPxRef = useRef<number>(0);
  const initializedContinuousRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartYRef = useRef<number>(0);
  const dragStartOffsetRef = useRef<number>(0);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);

  // Mobile single-card step carousel state (starts at the first card of Set 1, index = count)
  const [mobileIndex, setMobileIndex] = useState<number>(() =>
    count > 0 ? count : 0
  );
  const [mobileAnimate, setMobileAnimate] = useState<boolean>(true);
  const [mobileDragDeltaX, setMobileDragDeltaX] = useState<number>(0);
  const mobileTouchActiveRef = useRef<boolean>(false);

  // Reduced motion media query listener
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Measure viewport container width & responsive mode (mobile: 1 card, tablet: 2 cards, desktop: 3 cards)
  useEffect(() => {
    const updateMeasurements = () => {
      const nextMode = getViewportMode();
      setMode((prev) => (prev !== nextMode ? nextMode : prev));
      if (viewportRef.current) {
        const w = viewportRef.current.clientWidth;
        if (w > 0) setContainerWidth(w);
      }
    };

    updateMeasurements();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && viewportRef.current) {
      ro = new ResizeObserver(() => {
        updateMeasurements();
      });
      ro.observe(viewportRef.current);
    }

    window.addEventListener('resize', updateMeasurements);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', updateMeasurements);
    };
  }, []);

  // Compute visible cards count, gap, card width, and single-set stride
  const visibleCount = mode === 'desktop' ? 3 : mode === 'tablet' ? 2 : 1;
  const gapPx = mode === 'desktop' ? 24 : mode === 'tablet' ? 20 : 24;

  const cardWidthPx = useMemo(() => {
    if (containerWidth <= 0) return 0;
    return (containerWidth - (visibleCount - 1) * gapPx) / visibleCount;
  }, [containerWidth, visibleCount, gapPx]);

  const slideStridePx = cardWidthPx > 0 ? cardWidthPx + gapPx : 0;
  const singleSetWidthPx = slideStridePx * count;

  // Apply DOM transform directly for continuous mode (Desktop & Tablet)
  const applyContinuousTransform = useCallback(
    (rawOffset: number) => {
      if (!trackRef.current || singleSetWidthPx <= 0) return;
      let normalized = rawOffset;
      while (normalized >= 2 * singleSetWidthPx) {
        normalized -= singleSetWidthPx;
      }
      while (normalized < singleSetWidthPx) {
        normalized += singleSetWidthPx;
      }
      offsetPxRef.current = normalized;
      trackRef.current.style.transition = 'none';
      trackRef.current.style.transform = `translate3d(-${normalized}px, 0, 0)`;
    },
    [singleSetWidthPx]
  );

  // Initialize continuous offset to the start of the middle set (Set 1) when entering Desktop/Tablet
  useEffect(() => {
    if (mode === 'mobile' || singleSetWidthPx <= 0) {
      initializedContinuousRef.current = false;
      return;
    }
    if (!initializedContinuousRef.current) {
      offsetPxRef.current = singleSetWidthPx;
      initializedContinuousRef.current = true;
    }
    applyContinuousTransform(offsetPxRef.current);
  }, [mode, singleSetWidthPx, applyContinuousTransform]);

  // Continuous right-to-left requestAnimationFrame loop for Desktop (3 cards) & Tablet (2 cards)
  useEffect(() => {
    if (
      mode === 'mobile' ||
      count === 0 ||
      singleSetWidthPx <= 0 ||
      prefersReducedMotion
    ) {
      return;
    }

    let rafId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.064, Math.max(0, (now - lastTime) / 1000));
      lastTime = now;

      if (!isHoveredRef.current && !isDraggingRef.current) {
        const nextOffset =
          offsetPxRef.current + continuousSpeedPxPerSec * dt;
        applyContinuousTransform(nextOffset);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [
    mode,
    count,
    singleSetWidthPx,
    continuousSpeedPxPerSec,
    prefersReducedMotion,
    applyContinuousTransform,
  ]);

  // Mobile mode: Keep mobileIndex in middle set [count .. 2*count - 1]
  useEffect(() => {
    if (mode !== 'mobile' || count === 0) return;
    setMobileAnimate(false);
    setMobileIndex(count);
  }, [mode, count]);

  // Re-enable smooth transition after silent index normalization on Mobile
  useEffect(() => {
    if (mode !== 'mobile') return;
    if (!mobileAnimate) {
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setMobileAnimate(true);
        });
      });
      return () => cancelAnimationFrame(id);
    }
  }, [mode, mobileAnimate, mobileIndex]);

  // Mobile mode: Autoplay timer stepping 1 full card at a time from right to left
  useEffect(() => {
    if (mode !== 'mobile' || count <= 1 || prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      if (mobileTouchActiveRef.current || isHoveredRef.current) return;
      setMobileAnimate(true);
      setMobileIndex((prev) => prev + 1);
    }, mobileStepIntervalMs);

    return () => window.clearInterval(timer);
  }, [mode, count, mobileStepIntervalMs, prefersReducedMotion]);

  // Mobile mode: Seamless wrap when transition finishes on a cloned set item
  const handleMobileTransitionEnd = () => {
    if (mode !== 'mobile' || count === 0) return;
    if (mobileIndex >= 2 * count) {
      setMobileAnimate(false);
      setMobileIndex((prev) => prev - count);
    } else if (mobileIndex < count) {
      setMobileAnimate(false);
      setMobileIndex((prev) => prev + count);
    }
  };

  // Touch handlers for both Mobile (1-card snap) and Tablet/Desktop (continuous drag)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    dragStartXRef.current = touch.clientX;
    dragStartYRef.current = touch.clientY;
    isHorizontalSwipeRef.current = null;

    if (mode === 'mobile') {
      mobileTouchActiveRef.current = true;
      // Normalize index before dragging if currently on a clone boundary
      if (count > 0) {
        if (mobileIndex >= 2 * count) {
          setMobileAnimate(false);
          setMobileIndex((prev) => prev - count);
        } else if (mobileIndex < count) {
          setMobileAnimate(false);
          setMobileIndex((prev) => prev + count);
        }
      }
      setMobileDragDeltaX(0);
    } else {
      isDraggingRef.current = true;
      dragStartOffsetRef.current = offsetPxRef.current;
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStartXRef.current;
    const dy = touch.clientY - dragStartYRef.current;

    if (isHorizontalSwipeRef.current === null) {
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        isHorizontalSwipeRef.current = Math.abs(dx) > Math.abs(dy);
      }
    }

    if (!isHorizontalSwipeRef.current) return;

    if (mode === 'mobile') {
      setMobileDragDeltaX(dx);
    } else {
      applyContinuousTransform(dragStartOffsetRef.current - dx);
    }
  };

  const handleTouchEnd = () => {
    if (mode === 'mobile') {
      const dx = mobileDragDeltaX;
      setMobileDragDeltaX(0);
      mobileTouchActiveRef.current = false;

      if (isHorizontalSwipeRef.current && Math.abs(dx) > 36) {
        setMobileAnimate(true);
        if (dx < 0) {
          setMobileIndex((prev) => prev + 1);
        } else {
          setMobileIndex((prev) => prev - 1);
        }
      } else if (Math.abs(dx) > 0) {
        setMobileAnimate(true);
      }
    } else {
      isDraggingRef.current = false;
    }
    isHorizontalSwipeRef.current = null;
  };

  if (count === 0) return null;

  // Compute inline style for the track in Mobile mode (in Desktop/Tablet mode, requestAnimationFrame updates transform directly)
  const mobileTranslateX =
    mode === 'mobile' && slideStridePx > 0
      ? -(mobileIndex * slideStridePx) + mobileDragDeltaX
      : 0;

  const trackStyle: React.CSSProperties =
    mode === 'mobile'
      ? {
          gap: `${gapPx}px`,
          transform: `translate3d(${mobileTranslateX}px, 0, 0)`,
          transition:
            mobileAnimate && mobileDragDeltaX === 0
              ? 'transform 620ms cubic-bezier(0.22, 1, 0.36, 1)'
              : 'none',
        }
      : {
          gap: `${gapPx}px`,
          transform: `translate3d(-${offsetPxRef.current}px, 0, 0)`,
          transition: 'none',
        };

  return (
    <div
      ref={viewportRef}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      aria-label="Customer reflections carousel"
      className="relative w-full overflow-hidden py-1 touch-pan-y"
    >
      <div
        ref={trackRef}
        onTransitionEnd={handleMobileTransitionEnd}
        style={trackStyle}
        className="flex items-stretch will-change-transform"
      >
        {loopedSlides.map((t, idx) => (
          <div
            key={`${t.id}-${idx}`}
            style={
              cardWidthPx > 0
                ? {
                    width: `${cardWidthPx}px`,
                    minWidth: `${cardWidthPx}px`,
                    maxWidth: `${cardWidthPx}px`,
                  }
                : undefined
            }
            className="shrink-0 w-full sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-48px)/3)] flex"
          >
            <div className="w-full p-5 sm:p-5.5 rounded-[22px] bg-gradient-to-b from-white to-[#F5ECFC] border border-[#DFC9F2] shadow-[0_6px_22px_rgba(75,22,100,0.06)] flex flex-col justify-between">
              <div>
                <Quote className="w-6 h-6 text-[#9C6BC2] mb-2.5 opacity-70" />
                <p className="text-[14px] leading-[1.6] text-[#381B4E] italic mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="pt-3 border-t border-[#E6D4F6]">
                <p className="font-serif-display text-[18px] font-semibold text-[#2E1142]">
                  {t.name}
                </p>
                <p className="text-[12px] text-[#64427D]">
                  {t.role} &middot; {t.location}
                </p>
                <p className="text-[11.5px] font-medium text-[#5D237A] mt-0.5">
                  {t.experienceName}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
