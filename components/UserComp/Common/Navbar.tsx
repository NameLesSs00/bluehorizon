"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu } from "react-icons/fi";

import CurrencyDropdown from "./CurrencyDropdown";
import LanguageDropdown from "./LanguageDropdown";
import MobileNavDrawer, { MobileNavItem } from "./MobileNavDrawer";

const NAV_ITEMS: MobileNavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Standalone", href: "/standalone" },
  { label: "Rent", href: "/rent" },
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
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#D9E2EE]/80 bg-white/95 backdrop-blur-md shadow-2xs transition-shadow">
        <div className="mx-auto flex h-18 sm:h-20 lg:h-24 w-full max-w-[1360px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href={localizedHref("/")}
            className="relative block h-12 w-36 sm:h-14 sm:w-44 lg:h-16 lg:w-56 shrink-0"
          >
            <Image
              src="/logo.svg"
              alt="Blue Horizon"
              fill
              priority
              className="object-contain object-left"
            />
          </Link>

          {/* Desktop Nav Links - Only on lg: (1024px+) */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-5 xl:gap-8"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={localizedHref(item.href)}
                  className={`relative py-1 text-sm whitespace-nowrap transition-colors ${
                    active
                      ? "font-semibold text-[#2B5FA6]"
                      : "font-normal text-[#202326] hover:text-[#2B5FA6]"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#2B5FA6]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector Pill */}
            <div className="hidden sm:block">
              <LanguageDropdown />
            </div>

            {/* Currency Selector Pill */}
            <div className="hidden sm:block">
              <CurrencyDropdown />
            </div>

            {/* Contact Us Button - visible on desktop */}
            <Link
              href={localizedHref("/contact")}
              className="hidden lg:flex h-10 items-center justify-center rounded-full bg-[#B8963E] px-5 text-sm font-semibold text-white whitespace-nowrap transition-colors hover:bg-[#D4A843] shadow-xs"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Contact Us
            </Link>

            {/* Hamburger Menu Button (visible on mobile & tablet < lg) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D9E2EE] text-[#202326] transition-colors hover:bg-[#F0F3FA] lg:hidden shrink-0"
            >
              <FiMenu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over Navigation Sidebar from Right */}
      <MobileNavDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={NAV_ITEMS}
        localizedHref={localizedHref}
        isActive={isActive}
      />
    </>
  );
}
