"use client";

import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FiSliders } from "react-icons/fi";
import { getStandaloneUnits } from "@/clientApi/standaloneUnitsApi";
import { useTranslation } from "@/features/i18n/useTranslation";
import { useCurrencyStore } from "@/features/currency/useCurrencyStore";
import StandaloneHeroSection from "./StandaloneHeroSection";
import StandaloneFilterSidebar, { FilterState } from "./StandaloneFilterSidebar";
import StandaloneFilterDrawer from "./StandaloneFilterDrawer";
import StandaloneUnitsGrid from "./StandaloneUnitsGrid";
import StandaloneCtaSection from "./StandaloneCtaSection";
import Navbar from "@/components/UserComp/Common/Navbar";
import Footer from "@/components/UserComp/Common/Footer";

export default function StandaloneListPage() {
  const searchParams = useSearchParams();
  const { t, locale } = useTranslation();
  const currentCurrency = useCurrencyStore((state) => state.currentCurrency);

  const urlPropertyType = searchParams.get("propertyType") || "";
  const urlBedrooms = searchParams.get("bedrooms") || "";
  const urlMinPrice = searchParams.get("minPrice") || "";
  const urlMaxPrice = searchParams.get("maxPrice") || "";
  const urlSearchTerm =
    searchParams.get("searchTerm") || searchParams.get("city") || "";

  const [pageNumber, setPageNumber] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: urlSearchTerm,
    propertyType: urlPropertyType,
    bedrooms: urlBedrooms,
    minPrice: urlMinPrice,
    maxPrice: urlMaxPrice,
  });

  const { data, isLoading } = useQuery({
    queryKey: [
      "standalone-units",
      "public",
      filters.searchTerm,
      filters.propertyType,
      filters.minPrice,
      filters.maxPrice,
      pageNumber,
      locale,
      currentCurrency,
    ],
    queryFn: () =>
      getStandaloneUnits({
        Language: locale,
        Currency: currentCurrency,
        SearchTerm: filters.searchTerm || undefined,
        PropertyType: filters.propertyType || undefined,
        MinPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
        MaxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
        PageNumber: pageNumber,
        PageSize: 9,
      }),
    staleTime: 1000 * 60 * 5,
  });

  // Client-side bedroom filter
  const filteredUnits = useMemo(() => {
    const rawItems = data?.items || [];
    if (!filters.bedrooms) return rawItems;
    const bedCount = parseInt(filters.bedrooms, 10);
    return rawItems.filter((u) => {
      if (filters.bedrooms === "5") return (u.noBedRoom || 0) >= 5;
      return u.noBedRoom === bedCount;
    });
  }, [data?.items, filters.bedrooms]);

  const hasActiveFilters = Boolean(
    filters.searchTerm.trim() ||
      filters.propertyType ||
      filters.bedrooms ||
      filters.minPrice ||
      filters.maxPrice
  );

  const handleApplyFilters = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    setPageNumber(1);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters({
      searchTerm: "",
      propertyType: "",
      bedrooms: "",
      minPrice: "",
      maxPrice: "",
    });
    setPageNumber(1);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#FCFCFC]">
      <Navbar />

      <main className="flex-1 pb-8">
        {/* Hero — fades + slides up on mount */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <StandaloneHeroSection />
        </motion.div>

        {/* Main Content Area */}
        <div className="mx-auto mt-10 w-full max-w-[1536px] px-4 sm:px-6 lg:px-8">

          {/* Mobile: Filter toggle button (hidden on lg+) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="mb-5 flex items-center justify-end lg:hidden"
          >
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 rounded-[12px] border border-[#D9E2EE] bg-white px-4 py-2.5 text-xs font-semibold text-[#1B3A6B] shadow-sm transition-colors hover:border-[#2B5FA6] hover:text-[#2B5FA6]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <FiSliders className="h-4 w-4" />
              <span>{t("standaloneList.filters.title", "Filters")}</span>
              {hasActiveFilters && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2B5FA6] text-[10px] font-bold text-white">
                  !
                </span>
              )}
            </button>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Desktop Sidebar — slides in from left */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className="hidden lg:block shrink-0"
            >
              <StandaloneFilterSidebar
                initialFilters={filters}
                onApplyFilters={handleApplyFilters}
                onResetFilters={handleResetFilters}
              />
            </motion.div>

            {/* Grid — fades in from right */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
              className="flex-1 min-w-0"
            >
              <StandaloneUnitsGrid
                units={filteredUnits}
                isLoading={isLoading}
                totalCount={data?.totalCount || 0}
                currentPage={data?.pageNumber || pageNumber}
                totalPages={data?.totalPages || 1}
                onPageChange={setPageNumber}
                onResetFilters={handleResetFilters}
              />
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <StandaloneCtaSection />
      </main>

      {/* Mobile Filter Drawer */}
      <StandaloneFilterDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        initialFilters={filters}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <Footer />
    </div>
  );
}
