"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Standalone", href: "/properties?category=standalone" },
  { label: "Rent", href: "/properties?type=rent" },
  { label: "Blogs", href: "/blogs" },
  { label: "About Us", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E1E7E3]/70 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 w-full max-w-[1360px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="relative block h-10 w-36 sm:h-12 sm:w-44 shrink-0">
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
                href={item.href}
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
          {/* Language Selector Pill */}
          <div className="flex h-9 items-center gap-1.5 rounded-full border border-[#E1E7E3] bg-[#FCFCFC] px-3.5 text-xs font-semibold text-[#202326]">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6B7570"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span>EN</span>
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6B7570"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {/* Currency Selector Pill */}
          <div className="flex h-9 items-center gap-1.5 rounded-full border border-[#E1E7E3] bg-[#FCFCFC] px-3.5 text-xs font-semibold text-[#202326]">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6B7570"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="6" width="20" height="12" rx="2" />
              <circle cx="12" cy="12" r="2" />
              <path d="M6 12h.01M18 12h.01" />
            </svg>
            <span>EGP</span>
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6B7570"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {/* Contact Us Button */}
          <Link
            href="/contact"
            className="flex h-10 items-center justify-center rounded-full bg-[#145C4B] px-5 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-[#0F473A]"
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
                href={item.href}
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
                href="/contact"
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

