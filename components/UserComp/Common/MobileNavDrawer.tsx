"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiX, FiArrowRight } from "react-icons/fi";
import CurrencyDropdown from "./CurrencyDropdown";
import LanguageDropdown from "./LanguageDropdown";

export interface MobileNavItem {
  label: string;
  href: string;
}

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: MobileNavItem[];
  localizedHref: (href: string) => string;
  isActive: (href: string) => boolean;
}

export default function MobileNavDrawer({
  isOpen,
  onClose,
  navItems,
  localizedHref,
  isActive,
}: MobileNavDrawerProps) {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
        isOpen ? "pointer-events-auto visible" : "pointer-events-none invisible"
      }`}
      aria-hidden={!isOpen}
    >
      {/* Full-width Slide-over Sidebar from Right */}
      <aside
        className={`fixed inset-0 z-50 flex h-full w-full flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ fontFamily: "var(--font-inter)" }}
        aria-label="Mobile Navigation Menu"
      >
        {/* Drawer Header */}
        <div className="flex h-18 sm:h-20 items-center justify-between border-b border-[#E1E7E3] px-5 sm:px-8">
          <Link
            href={localizedHref("/")}
            onClick={onClose}
            className="relative block h-10 w-36 sm:h-12 sm:w-44 shrink-0"
          >
            <Image
              src="/logo.svg"
              alt="Blue Horizon"
              fill
              className="object-contain object-left"
            />
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E1E7E3] text-[#202326] transition-colors hover:bg-[#F3F5F3]"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Top Utility Bar with Language & Currency at the top with links */}
        <div className="relative z-30 flex items-center justify-between border-b border-[#E1E7E3] px-5 sm:px-8 py-3 bg-[#FAFBF9]">
          <span className="text-[12px] font-semibold uppercase tracking-wider text-[#6B7570]">
            Preferences
          </span>
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageDropdown />
            <CurrencyDropdown />
          </div>
        </div>

        {/* Scrollable Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 space-y-2">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={localizedHref(item.href)}
                onClick={onClose}
                className={`flex items-center justify-between rounded-2xl px-5 py-3.5 sm:py-4 text-[16px] sm:text-[17px] font-semibold transition-all ${
                  active
                    ? "bg-[#0F473A] text-white shadow-xs"
                    : "text-[#202326] hover:bg-[#F3F5F3] hover:text-[#0F473A]"
                }`}
              >
                <span>{item.label}</span>
                <FiArrowRight
                  className={`h-4 w-4 ${
                    active ? "text-white" : "text-[#9AA5A0]"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Drawer Bottom CTA Button */}
        <div className="border-t border-[#E1E7E3] p-5 sm:p-8 bg-[#FAFBF9]">
          <Link
            href={localizedHref("/contact")}
            onClick={onClose}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0F473A] text-[15px] font-semibold text-white shadow-md transition-colors hover:bg-[#145C4B]"
          >
            <span>Contact Us</span>
            <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </aside>
    </div>
  );
}
