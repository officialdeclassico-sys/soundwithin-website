import React, {useEffect, useId, useRef, useState} from 'react';
import {Check, ChevronDown} from 'lucide-react';

export interface ThemedSelectOption {
  value: string;
  label: string;
  displayText?: string;
  disabled?: boolean;
  note?: string;
}

interface ThemedSelectProps {
  id?: string;
  ariaLabel: string;
  value: string;
  options: ThemedSelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  prefixIcon?: React.ReactNode;
  className?: string;
  flowMenu?: boolean;
}

/**
 * Custom accessible SOUNDWITHIN themed dropdown field.
 * - Matches modal input rounded corners, height, 16px anti-zoom typography & border.
 * - Opens directly beneath the trigger with identical width (left-0 right-0 w-full).
 * - Scrollable internally when list exceeds available height.
 */
export function ThemedSelect({
  id,
  ariaLabel,
  value,
  options,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  prefixIcon,
  className = '',
  flowMenu = false,
}: ThemedSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown, {passive: true});
    document.addEventListener('keydown', handleKeyDown, true);

    requestAnimationFrame(() => {
      menuRef.current?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    });

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  const handleSelectOption = (option: ThemedSelectOption) => {
    if (option.disabled) return;
    onChange(option.value);
    setIsOpen(false);
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        return;
      }
      const enabledOptions = options.filter((o) => !o.disabled);
      if (enabledOptions.length === 0) return;
      const currentIdx = enabledOptions.findIndex((o) => o.value === value);
      const nextIdx =
        e.key === 'ArrowDown'
          ? (currentIdx + 1) % enabledOptions.length
          : (currentIdx - 1 + enabledOptions.length) % enabledOptions.length;
      onChange(enabledOptions[nextIdx].value);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <button
        id={id}
        type="button"
        role="combobox"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        disabled={disabled}
        onClick={handleToggle}
        onKeyDown={handleTriggerKeyDown}
        className={`w-full min-h-[46px] px-3.5 py-2.5 rounded-xl border text-left flex items-center justify-between gap-2 text-[16px] font-sans-body transition-all shadow-2xs focus-visible:outline-none ${
          disabled
            ? 'bg-[#F2EAF8] border-[#D9C6EB] text-[#7D6296] cursor-not-allowed'
            : isOpen
              ? 'bg-gradient-to-r from-[#FAF3FE] via-[#F7EEF9] to-[#FDF0F6] border-[#5D237A] ring-2 ring-[#8B52B8]/25 text-[#2E1142] cursor-pointer'
              : 'bg-gradient-to-r from-[#FFFFFF] via-[#FCF8FE] to-[#FDF4F9] border-[#C6A7E2] hover:border-[#7D48B0] hover:from-[#FAF4FE] hover:to-[#FCEFF6] text-[#2E1142] cursor-pointer'
        }`}
      >
        <span className="flex items-center gap-2 min-w-0 flex-1">
          {prefixIcon && <span className="shrink-0">{prefixIcon}</span>}
          <span className="truncate font-medium">
            {selectedOption
              ? selectedOption.displayText || selectedOption.label
              : placeholder}
          </span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#5D237A] shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          id={listboxId}
          role="listbox"
          aria-label={ariaLabel}
          className={`${
            flowMenu
              ? 'relative w-full mt-1.5 z-40'
              : 'absolute left-0 right-0 top-full mt-1.5 z-40 w-full'
          } max-h-[210px] overflow-y-auto overscroll-contain scrollbar-hidden rounded-xl border border-[#C6A7E2] bg-gradient-to-b from-[#FFFFFF] via-[#FAF3FD] to-[#FDF0F6] shadow-[0_14px_34px_rgba(75,22,100,0.2)] p-1.5 space-y-0.5`}
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                disabled={option.disabled}
                onClick={() => handleSelectOption(option)}
                className={`w-full min-h-[40px] px-3 py-2 rounded-lg text-left flex items-center justify-between gap-2 text-[16px] sm:text-[14.5px] font-sans-body transition-all ${
                  option.disabled
                    ? 'text-[#8B71A3] opacity-60 cursor-not-allowed bg-transparent'
                    : isSelected
                      ? 'bg-gradient-to-r from-[#EAD8FC] via-[#F4E3FB] to-[#FCE3EE] text-[#2E1142] font-semibold shadow-2xs cursor-pointer'
                      : 'text-[#2E1142] hover:bg-gradient-to-r hover:from-[#F3E8FC] hover:to-[#FCECF4] cursor-pointer'
                }`}
              >
                <span className="min-w-0 flex-1 truncate">
                  {option.label}
                  {option.note && (
                    <span className="ml-1.5 text-[12px] font-normal text-[#6E4F87]">
                      ({option.note})
                    </span>
                  )}
                </span>
                {isSelected && !option.disabled && (
                  <Check
                    className="w-4 h-4 text-[#5D237A] shrink-0"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
