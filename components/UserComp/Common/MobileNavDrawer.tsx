"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiX, FiArrowRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import CurrencyDropdown from "./CurrencyDropdown";
import LanguageDropdown from "./LanguageDropdown";
import { useTranslation } from "@/features/i18n/useTranslation";

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

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 0.1 } },
};

const drawerVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.28, ease: "easeIn" as const },
  },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

export default function MobileNavDrawer({
  isOpen,
  onClose,
  navItems,
  localizedHref,
  isActive,
}: MobileNavDrawerProps) {
  const { t } = useTranslation();

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
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          aria-hidden={!isOpen}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/30 backdrop-blur-xs"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Full-width Slide-over Sidebar */}
          <motion.aside
            className="absolute inset-0 z-10 flex h-full w-full flex-col bg-white shadow-2xl"
            style={{ fontFamily: "var(--font-inter)" }}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            aria-label="Mobile Navigation Menu"
          >
            {/* Drawer Header */}
            <div className="flex h-18 sm:h-20 items-center justify-between border-b border-[#D9E2EE] px-5 sm:px-8">
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
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D9E2EE] text-[#202326] transition-colors hover:bg-[#F0F3FA]"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* Top Utility Bar */}
            <div className="relative z-30 flex items-center justify-between border-b border-[#D9E2EE] px-5 sm:px-8 py-3 bg-[#FAFBF9]">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#6B7570]">
                Preferences
              </span>
              <div className="flex items-center gap-2 sm:gap-3">
                <LanguageDropdown />
                <CurrencyDropdown />
              </div>
            </div>

            {/* Scrollable Navigation Links */}
            <motion.nav
              className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 space-y-2"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <motion.div key={item.href} variants={listItemVariants}>
                    <Link
                      href={localizedHref(item.href)}
                      onClick={onClose}
                      className={`flex items-center justify-between rounded-2xl px-5 py-3.5 sm:py-4 text-[16px] sm:text-[17px] font-semibold transition-all ${
                        active
                          ? "bg-[#1B3A6B] text-white shadow-xs"
                          : "text-[#202326] hover:bg-[#F0F3FA] hover:text-[#1B3A6B]"
                      }`}
                    >
                      <span>{item.label}</span>
                      <FiArrowRight
                        className={`h-4 w-4 ${active ? "text-white" : "text-[#9AA5A0]"}`}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* Drawer Bottom CTA */}
            <div className="border-t border-[#D9E2EE] p-5 sm:p-8 bg-[#FAFBF9]">
              <Link
                href={localizedHref("/contact")}
                onClick={onClose}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1B3A6B] text-[15px] font-semibold text-white shadow-md transition-colors hover:bg-[#2B5FA6]"
              >
                <span>{t("common.nav.contactUs", "Contact Us")}</span>
                <FiArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
