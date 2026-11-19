import React from 'react';
import {withBaseUrl} from '../utils/assetUrl';
import {BUTTON_TOKENS} from '../utils/buttonThemes';

interface BottomPromoBannerProps {
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  objectPositionClass?: string;
  fallbackBgClass?: string;
  heading: string;
  subheading: string;
  ctaLabel: string;
  onAction: () => void;
}

/**
 * Shared 6:1 horizontal bottom promotional banner matching the audited Home page
 * bottom CTA banner dimensions, breakpoints, typography scaling, and rose-plum button.
 */
export function BottomPromoBanner({
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  objectPositionClass = 'object-[50%_78%]',
  fallbackBgClass = 'bg-gradient-to-r from-[#F9E7EA] via-[#FBF4EB] to-[#EDF1DF]',
  heading,
  subheading,
  ctaLabel,
  onAction,
}: BottomPromoBannerProps) {
  return (
    <div
      className={`relative w-full aspect-[6/1] rounded-[16px] sm:rounded-[24px] overflow-hidden border border-[#DFC4EC] shadow-[0_10px_30px_rgba(62,20,88,0.09)] ${fallbackBgClass}`}
    >
      <img
        src={withBaseUrl(imageSrc)}
        alt={imageAlt}
        width={imageWidth}
        height={imageHeight}
        referrerPolicy="no-referrer"
        loading="lazy"
        decoding="async"
        className={`block w-full h-full object-cover ${objectPositionClass} select-none`}
      />

      {/* Layered Functional Content Positioned in the Open Center Canvas (Zero Overlays or Image Filters) */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-[20%] text-center">
        <p className="font-sans-body text-[clamp(6.5px,1.7vw,12px)] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.25em] leading-none text-[#70283F]/90 mb-[2px] sm:mb-1.5 whitespace-nowrap">
          {heading}
        </p>
        <h2 className="font-serif-display text-[clamp(8.5px,2.2vw,30px)] font-bold uppercase tracking-[0.02em] leading-[1.08] text-[#2F1041] whitespace-nowrap mb-[3px] sm:mb-2 lg:mb-3.5">
          {subheading}
        </h2>
        <button
          type="button"
          onClick={onAction}
          className={`inline-flex items-center justify-center px-[clamp(11px,2.8vw,30px)] py-[clamp(3px,0.75vw,10px)] rounded-full font-sans-body text-[clamp(8px,1.9vw,14px)] leading-none font-semibold tracking-[0.015em] cursor-pointer text-center whitespace-nowrap ${BUTTON_TOKENS.rosePlum}`}
        >
          <span>{ctaLabel}</span>
        </button>
      </div>
    </div>
  );
}
