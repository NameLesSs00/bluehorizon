"use client";

import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useCurrencyStore } from "@/features/currency/useCurrencyStore";

export default function CurrencyDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentCurrency = useCurrencyStore((state) => state.currentCurrency);
  const availableCurrencies = useCurrencyStore(
    (state) => state.availableCurrencies
  );
  const setCurrency = useCurrencyStore((state) => state.setCurrency);

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
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 items-center gap-1.5 rounded-full border border-[#D9E2EE] bg-[#FCFCFC] px-3.5 text-xs font-semibold text-[#202326] transition-colors hover:border-[#2B5FA6]/40 hover:bg-white"
      >
        <span>{currentCurrency}</span>
        <FiChevronDown
          className={`h-3 w-3 text-[#6B7570] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-1.5 w-28 overflow-hidden rounded-xl border border-[#D9E2EE] bg-white py-1 shadow-lg">
          {availableCurrencies.map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => {
                setCurrency(code);
                setIsOpen(false);
              }}
              className={`flex w-full items-center justify-between px-3.5 py-1.5 text-xs font-medium transition-colors hover:bg-[#F9F7F4] ${
                currentCurrency === code
                  ? "font-bold text-[#2B5FA6] bg-[#F9F7F4]"
                  : "text-[#202326]"
              }`}
            >
              <span>{code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
