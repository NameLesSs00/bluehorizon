"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import CurrencyDropdown from "./CurrencyDropdown";
import LanguageDropdown from "./LanguageDropdown";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Standalone", href: "/standalone" },
  { label: "Rent", href: "/properties?type=rent" },
  { label: "Blogs", href: "/blogs" },
  { label: "About Us", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const segments = pathname ? pathname.split("/").filter(Boolean) : [];
  const currentLocale =
    segments.length > 0 && (segments[0] === "en" || segments[0] === "de" || segments[0] === "ar")
      ? segments[0]
      : "en";

  const localizedHref = (href: string) => {
    if (href === "/") return `/${currentLocale}`;
    return `/${currentLocale}${href.startsWith("/") ? href : `/${href}`}`;
  };

  const isActive = (href: string) => {
    const target = localizedHref(href);
    if (href === "/" && (pathname === "/" || pathname === `/${currentLocale}`)) return true;
    if (href !== "/" && (pathname === target || pathname.startsWith(`${target}/`))) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E1E7E3]/70 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 sm:h-24 w-full max-w-[1360px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href={localizedHref("/")} className="relative block h-14 w-44 sm:h-16 sm:w-56 md:h-16 md:w-60 shrink-0">
          <Image
            src="/logo.svg"
            alt="Blue Horizon"
            fill
            priority
            className="object-contain object-left"
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-7 lg:gap-9"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={localizedHref(item.href)}
                className={`relative py-1 text-sm transition-colors ${
                  active
                    ? "font-semibold text-[#145C4B]"
                    : "font-normal text-[#202326] hover:text-[#145C4B]"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#145C4B]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Selector Pill with Flags */}
          <LanguageDropdown />

          {/* Currency Selector Pill */}
          <CurrencyDropdown />

          {/* Contact Us Button */}
          <Link
            href={localizedHref("/contact")}
            className="flex h-10 items-center justify-center rounded-full bg-[#0F473A] px-5 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-[#145C4B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E1E7E3] text-[#202326] md:hidden"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {mobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-[#E1E7E3] bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col space-y-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={localizedHref(item.href)}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 text-sm font-medium ${
                  isActive(item.href)
                    ? "font-semibold text-[#145C4B]"
                    : "text-[#202326]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-[#E1E7E3]">
              <Link
                href={localizedHref("/contact")}
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-10 w-full items-center justify-center rounded-full bg-[#145C4B] text-sm font-semibold text-white"
              >
                Contact Us
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

