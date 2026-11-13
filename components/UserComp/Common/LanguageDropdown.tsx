"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FiChevronDown } from "react-icons/fi";
import { FlagEgypt, FlagGermany, FlagUK } from "@/components/adminComp/Common/LanguageFlags";
import { SupportedLocale, SUPPORTED_LOCALES } from "@/features/i18n/i18nConfig";

export type SupportedLanguage = SupportedLocale;

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
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Derive active locale from URL path
  const segments = pathname ? pathname.split("/").filter(Boolean) : [];
  const currentLocale =
    segments.length > 0 && SUPPORTED_LOCALES.includes(segments[0] as SupportedLocale)
      ? (segments[0] as SupportedLocale)
      : "en";

  const activeOption =
    LANGUAGES.find((lang) => lang.code === currentLocale) || LANGUAGES[0];
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

  function handleLanguageChange(targetLocale: SupportedLocale) {
    if (targetLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    let newPath: string;
    if (segments.length > 0 && SUPPORTED_LOCALES.includes(segments[0] as SupportedLocale)) {
      const rest = segments.slice(1).join("/");
      newPath = `/${targetLocale}${rest ? `/${rest}` : ""}`;
    } else {
      newPath = `/${targetLocale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
    }

    router.push(newPath);
    setIsOpen(false);
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 items-center gap-2 rounded-full border border-[#D9E2EE] bg-[#FCFCFC] px-3.5 text-xs font-semibold text-[#202326] transition-colors hover:border-[#2B5FA6]/40 hover:bg-white"
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
        <div className="absolute right-0 top-full z-50 mt-1.5 w-36 overflow-hidden rounded-xl border border-[#D9E2EE] bg-white py-1 shadow-lg">
          {LANGUAGES.map((lang) => {
            const Flag = lang.FlagComponent;
            const isSelected = lang.code === currentLocale;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex w-full items-center gap-2.5 px-3.5 py-2 text-xs font-medium transition-colors hover:bg-[#F9F7F4] ${
                  isSelected
                    ? "bg-[#F9F7F4] font-bold text-[#2B5FA6]"
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

