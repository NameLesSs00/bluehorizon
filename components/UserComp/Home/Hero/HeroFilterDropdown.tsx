"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiChevronDown } from "react-icons/fi";

export interface DropdownOption {
  id?: number | string;
  label: string;
  value?: unknown;
}

interface HeroFilterDropdownProps {
  iconSrc: string;
  iconAlt: string;
  label: string;
  selectedValue: string;
  options: DropdownOption[];
  onSelect: (option: DropdownOption) => void;
}

export default function HeroFilterDropdown({
  iconSrc,
  iconAlt,
  label,
  selectedValue,
  options,
  onSelect,
}: HeroFilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative flex-1">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-2 sm:gap-3.5 px-2.5 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-3.5 text-left transition-colors hover:bg-neutral-50/80 rounded-xl sm:rounded-2xl border border-[#E6EAE7] lg:border-none"
      >
        {/* Icon */}
        <div className="relative flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center">
          <Image
            src={iconSrc}
            alt={iconAlt}
            width={28}
            height={28}
            className="h-5 w-5 sm:h-7 sm:w-7 lg:h-8 lg:w-8 object-contain"
          />
        </div>

        {/* Text Stack */}
        <div className="min-w-0 flex-1">
          <p
            className="text-[10px] sm:text-[12px] font-medium text-[#65706B] leading-none"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {label}
          </p>
          <div className="mt-1 flex items-center gap-1 sm:gap-1.5">
            <span
              className="truncate text-[12px] sm:text-[14px] lg:text-[16px] font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {selectedValue}
            </span>
            <FiChevronDown
              className={`h-3.5 w-3.5 shrink-0 text-[#202326] transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 max-h-72 w-full min-w-[200px] sm:w-64 overflow-y-auto rounded-2xl border border-[#E6EAE7] bg-white py-2 shadow-2xl">
          {options.map((opt, idx) => (
            <button
              key={`${opt.label}-${idx}`}
              type="button"
              onClick={() => {
                onSelect(opt);
                setIsOpen(false);
              }}
              className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-[14px] transition-colors hover:bg-[#FAF8F5] ${
                selectedValue === opt.label
                  ? "font-semibold text-[#145C4B] bg-[#FAF8F5]"
                  : "font-normal text-[#202326]"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <span className="truncate">{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
