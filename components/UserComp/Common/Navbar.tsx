"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import { motion } from "framer-motion";

import CurrencyDropdown from "./CurrencyDropdown";
import LanguageDropdown from "./LanguageDropdown";
import MobileNavDrawer, { MobileNavItem } from "./MobileNavDrawer";
import { useTranslation } from "@/features/i18n/useTranslation";
import { SUPPORTED_LOCALES, SupportedLocale } from "@/features/i18n/i18nConfig";

const NAV_ITEM_KEYS: { key: string; href: string; translationKey: string }[] = [
  { key: "home", href: "/", translationKey: "common.nav.home" },
  { key: "areas", href: "/areas", translationKey: "common.nav.areas" },
  { key: "projects", href: "/projects", translationKey: "common.nav.projects" },
  { key: "standalone", href: "/second-hand", translationKey: "common.nav.standalone" },
  { key: "rent", href: "/rent", translationKey: "common.nav.rent" },
  { key: "blogs", href: "/blogs", translationKey: "common.nav.blogs" },
  { key: "about", href: "/about", translationKey: "common.nav.aboutUs" },
  { key: "faq", href: "/faq", translationKey: "common.nav.faq" },
];

// Animation variants
const headerVariants = {
  hidden: { y: -80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const logoVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: 0.15, ease: "easeOut" as const },
  },
};

const navContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.25 },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

const actionsVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: 0.3, ease: "easeOut" as const },
  },
};

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const segments = pathname ? pathname.split("/").filter(Boolean) : [];
  const currentLocale =
    segments.length > 0 && SUPPORTED_LOCALES.includes(segments[0] as SupportedLocale)
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

  const navItems: MobileNavItem[] = NAV_ITEM_KEYS.map((item) => ({
    label: t(item.translationKey, item.key),
    href: item.href,
  }));

  return (
    <>
      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="sticky top-0 z-40 w-full border-b border-[#D9E2EE]/80 bg-white/95 backdrop-blur-md shadow-2xs transition-shadow"
      >
        <div className="mx-auto flex h-18 sm:h-20 xl:h-24 w-full max-w-[1440px] items-center justify-between gap-4 xl:gap-6 px-4 sm:px-6 xl:px-8">

          {/* Logo */}
          <motion.div variants={logoVariants} initial="hidden" animate="visible" className="shrink-0">
            <Link
              href={localizedHref("/")}
              className="relative block h-14 w-44 sm:h-16 sm:w-52 xl:h-20 xl:w-56 2xl:w-64 shrink-0"
            >
              <Image
                src="/logo.svg"
                alt="Blue Horizon"
                fill
                priority
                style={{
                  filter: "drop-shadow(0 3px 6px rgba(27, 58, 107, 0.24))",
                }}
                className="object-contain object-left transition-transform duration-300 hover:scale-[1.02]"
              />
            </Link>
          </motion.div>

          {/* Desktop Nav Links */}
          <motion.nav
            aria-label="Main Navigation"
            className="hidden xl:flex items-center gap-4 2xl:gap-7 min-w-0"
            style={{ fontFamily: "var(--font-inter)" }}
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {NAV_ITEM_KEYS.map((item) => {
              const active = isActive(item.href);
              const label = t(item.translationKey, item.key);
              return (
                <motion.div key={item.href} variants={navItemVariants} className="shrink-0">
                  <Link
                    href={localizedHref(item.href)}
                    className={`relative py-1 text-[13px] 2xl:text-sm whitespace-nowrap transition-colors ${
                      active
                        ? "font-semibold text-[#1B3A6B]"
                        : "font-normal text-[#202326] hover:text-[#B8963E]"
                    }`}
                  >
                    {label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#B8963E]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </motion.nav>

          {/* Right Actions */}
          <motion.div
            className="flex shrink-0 items-center gap-2 sm:gap-3"
            variants={actionsVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="hidden sm:block">
              <LanguageDropdown />
            </div>

            <div className="hidden sm:block">
              <CurrencyDropdown />
            </div>

            <Link
              href={localizedHref("/contact")}
              className="hidden xl:flex h-10 items-center justify-center rounded-full bg-[#B8963E] px-5 text-sm font-semibold text-white whitespace-nowrap transition-colors hover:bg-[#D4A843] shadow-xs"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("common.nav.contactUs", "Contact Us")}
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D9E2EE] text-[#202326] transition-colors hover:bg-[#F0F3FA] xl:hidden shrink-0"
            >
              <FiMenu className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </motion.header>

      <MobileNavDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
        localizedHref={localizedHref}
        isActive={isActive}
      />
    </>
  );
}
