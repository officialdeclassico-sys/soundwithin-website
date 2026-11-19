import React, {useEffect, useRef, useState} from 'react';

interface InfiniteHorizontalCarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  getItemKey: (item: T, index: number) => string;
  speedPxPerSec?: number;
  className?: string;
  trackClassName?: string;
  showDivider?: boolean;
  dividerClassName?: string;
}

/**
 * Reusable continuously scrolling horizontal carousel matching the exact
 * requestAnimationFrame + scrollLeft + tripled-sequence seamless loop logic
 * established on the Experiences page.
 */
export function InfiniteHorizontalCarousel<T>({
  items,
  renderItem,
  getItemKey,
  speedPxPerSec = 28,
  className = '',
  trackClassName = '',
  showDivider = true,
  dividerClassName = 'h-16 sm:h-20 w-[1px] bg-[#C5A3E0]/65 shrink-0',
}: InfiniteHorizontalCarouselProps<T>) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const scrollPosRef = useRef(0);
  const resumeTimerRef = useRef<number | null>(null);
  const [isManualScrolling, setIsManualScrolling] = useState(false);

  // Repeat base sequence twice per loop segment (3 segments total) so wide viewports remain seamlessly filled
  const baseSegment = [...items, ...items];
  const infiniteItems = [...baseSegment, ...baseSegment, ...baseSegment];

  useEffect(() => {
    const el = carouselRef.current;
    if (!el || items.length === 0) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrameId: number;
    let lastTimestamp = 0;

    const initPosition = () => {
      const singleSetWidth = el.scrollWidth / 3;
      if (singleSetWidth > 0 && el.scrollLeft === 0) {
        el.scrollLeft = singleSetWidth;
        scrollPosRef.current = singleSetWidth;
      }
    };

    initPosition();

    const step = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaSec = Math.min((timestamp - lastTimestamp) / 1000, 0.1);
      lastTimestamp = timestamp;

      const singleSetWidth = el.scrollWidth / 3;
      if (singleSetWidth > 0) {
        if (!isPausedRef.current && !mediaQuery.matches) {
          scrollPosRef.current += speedPxPerSec * deltaSec;
          if (scrollPosRef.current >= singleSetWidth * 2) {
            scrollPosRef.current -= singleSetWidth;
          } else if (scrollPosRef.current <= 0) {
            scrollPosRef.current += singleSetWidth;
          }
          el.scrollLeft = scrollPosRef.current;
        } else {
          if (el.scrollLeft >= singleSetWidth * 2.5) {
            el.scrollLeft -= singleSetWidth;
          } else if (el.scrollLeft <= singleSetWidth * 0.2) {
            el.scrollLeft += singleSetWidth;
          }
          scrollPosRef.current = el.scrollLeft;
        }
      }

      animationFrameId = window.requestAnimationFrame(step);
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      if (resumeTimerRef.current) {
        window.clearTimeout(resumeTimerRef.current);
      }
    };
  }, [items.length, speedPxPerSec]);

  const handleCarouselPause = () => {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
    isPausedRef.current = true;
    setIsManualScrolling(true);
  };

  const handleCarouselResume = () => {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = window.setTimeout(() => {
      if (carouselRef.current) {
        scrollPosRef.current = carouselRef.current.scrollLeft;
      }
      setIsManualScrolling(false);
      isPausedRef.current = false;
    }, 900);
  };

  return (
    <div
      ref={carouselRef}
      onTouchStart={handleCarouselPause}
      onTouchEnd={handleCarouselResume}
      onTouchCancel={handleCarouselResume}
      onMouseEnter={handleCarouselPause}
      onMouseLeave={handleCarouselResume}
      onWheel={() => {
        handleCarouselPause();
        handleCarouselResume();
      }}
      className={`w-full overflow-x-auto scrollbar-hidden select-none touch-pan-x ${
        isManualScrolling ? 'snap-x snap-proximity scroll-smooth' : ''
      } ${className}`}
    >
      <div className={`flex items-stretch w-max ${trackClassName}`}>
        {infiniteItems.map((item, idx) => (
          <div
            key={getItemKey(item, idx)}
            className="flex items-center shrink-0 snap-center"
          >
            {renderItem(item, idx)}
            {showDivider && (
              <span className={dividerClassName} aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
