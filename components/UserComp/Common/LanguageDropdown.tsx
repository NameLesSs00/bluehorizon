"use client";

import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { FlagEgypt, FlagGermany, FlagUK } from "@/components/adminComp/Common/LanguageFlags";

export type SupportedLanguage = "en" | "de" | "ar";

interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  FlagComponent: React.ComponentType<{ className?: string }>;
}

const LANGUAGES: LanguageOption[] = [
  {
    code: "en",
    label: "English",
    FlagComponent: FlagUK,
  },
  {
    code: "de",
    label: "Deutsch",
    FlagComponent: FlagGermany,
  },
  {
    code: "ar",
    label: "العربية",
    FlagComponent: FlagEgypt,
  },
];

export default function LanguageDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>("en");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeOption =
    LANGUAGES.find((lang) => lang.code === selectedLang) || LANGUAGES[0];
  const ActiveFlag = activeOption.FlagComponent;

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
        className="flex h-9 items-center gap-2 rounded-full border border-[#E1E7E3] bg-[#FCFCFC] px-3.5 text-xs font-semibold text-[#202326] transition-colors hover:border-[#145C4B]/40 hover:bg-white"
      >
        <span className="flex items-center overflow-hidden rounded-xs shadow-2xs">
          <ActiveFlag className="h-3 w-4.5 object-cover" />
        </span>
        <span className="uppercase">{activeOption.code}</span>
        <FiChevronDown
          className={`h-3 w-3 text-[#6B7570] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-1.5 w-36 overflow-hidden rounded-xl border border-[#E1E7E3] bg-white py-1 shadow-lg">
          {LANGUAGES.map((lang) => {
            const Flag = lang.FlagComponent;
            const isSelected = lang.code === selectedLang;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setSelectedLang(lang.code);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 px-3.5 py-2 text-xs font-medium transition-colors hover:bg-[#FAF8F5] ${
                  isSelected
                    ? "bg-[#FAF8F5] font-bold text-[#145C4B]"
                    : "text-[#202326]"
                }`}
              >
                <span className="flex items-center overflow-hidden rounded-xs shadow-2xs">
                  <Flag className="h-3 w-4.5 object-cover" />
                </span>
                <span>{lang.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

