"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiSliders } from "react-icons/fi";
import { useTranslation } from "@/features/i18n/useTranslation";
import StandaloneFilterSidebar, { FilterState } from "./StandaloneFilterSidebar";

interface StandaloneFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialFilters: FilterState;
  onApplyFilters: (filters: FilterState) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export default function StandaloneFilterDrawer({
  isOpen,
  onClose,
  initialFilters,
  onApplyFilters,
  onResetFilters,
  hasActiveFilters,
}: StandaloneFilterDrawerProps) {
  const { t } = useTranslation();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel sliding from the right */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="fixed inset-y-0 right-0 z-50 flex w-[85vw] max-w-[360px] flex-col bg-white shadow-2xl lg:hidden"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between border-b border-[#D9E2EE] px-5 py-4">
              <div className="flex items-center gap-2">
                <FiSliders className="h-4 w-4 text-[#2B5FA6]" />
                <span
                  className="text-base font-bold text-[#202326]"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  {t("standaloneList.filters.title", "Filters")}
                </span>
                {hasActiveFilters && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2B5FA6] text-[10px] font-bold text-white">
                    !
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close filters"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D9E2EE] text-[#6B7570] transition-colors hover:border-[#2B5FA6] hover:text-[#2B5FA6]"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable filter content */}
            <div className="flex-1 overflow-y-auto px-4 py-5">
              <StandaloneFilterSidebar
                bare
                initialFilters={initialFilters}
                onApplyFilters={onApplyFilters}
                onResetFilters={onResetFilters}
              />
            </div>

            {/* Footer — explicit close button */}
            <div className="border-t border-[#D9E2EE] px-4 py-4">
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-[12px] bg-[#1B3A6B] py-3 text-center text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-[#2B5FA6]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                              {t("standaloneList.filters.done", "Done")}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
