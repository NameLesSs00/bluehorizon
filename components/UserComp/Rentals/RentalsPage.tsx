"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { usePublicRentalsQuery } from "@/features/rentals/useRentalsQueries";
import { useCurrencyStore } from "@/features/currency/useCurrencyStore";
import { useTranslation } from "@/features/i18n/useTranslation";
import Navbar from "@/components/UserComp/Common/Navbar";
import Footer from "@/components/UserComp/Common/Footer";
import RentalBreadcrumb from "./RentalBreadcrumb";
import RentalHeroSection from "./RentalHeroSection";
import RentalFilterSidebar, { RentalFilterState } from "./RentalFilterSidebar";
import RentalUnitsGrid from "./RentalUnitsGrid";
import RentalCtaSection from "./RentalCtaSection";

export default function RentalsPage() {
  const { locale } = useTranslation();
  const searchParams = useSearchParams();
  const urlLocationId = searchParams.get("locationId") || "";
  const urlPropertyType = searchParams.get("propertyType") || "";

  const currentCurrency = useCurrencyStore((state) => state.currentCurrency);
  const [pageNumber, setPageNumber] = useState(1);
  const [filters, setFilters] = useState<RentalFilterState>({
    searchTerm: "",
    locationId: urlLocationId,
    propertyType: urlPropertyType,
    bedrooms: "",
    minPrice: "",
    maxPrice: "",
  });

  const { data: rentalsData, isLoading } = usePublicRentalsQuery({
    Language: locale,
    Currency: currentCurrency || "EGP",
    PageNumber: pageNumber,
    PageSize: 9,
  });

  const rawUnits = rentalsData?.items || [];

  // Client-side filtering when backend pagination is combined with multi-faceted filters
  const filteredUnits = useMemo(() => {
    return rawUnits.filter((unit) => {
      // Search term
      if (
        filters.searchTerm.trim() &&
        !unit.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
        !unit.description?.toLowerCase().includes(filters.searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Location
      if (
        filters.locationId &&
        unit.rentalLocation?.id !== Number(filters.locationId)
      ) {
        return false;
      }

      // Property type
      if (
        filters.propertyType &&
        unit.propertyType !== Number(filters.propertyType)
      ) {
        return false;
      }

      // Bedrooms
      if (filters.bedrooms) {
        const bedTarget = parseInt(filters.bedrooms, 10);
        if (filters.bedrooms === "5") {
          if ((unit.bedroomNo || 0) < 5) return false;
        } else if (unit.bedroomNo !== bedTarget) {
          return false;
        }
      }

      // Min price
      if (filters.minPrice) {
        const min = Number(filters.minPrice);
        const unitPrice =
          unit.prices?.find((p) => p.currency === currentCurrency)?.price ||
          unit.prices?.[0]?.price ||
          0;
        if (unitPrice < min) return false;
      }

      // Max price
      if (filters.maxPrice) {
        const max = Number(filters.maxPrice);
        const unitPrice =
          unit.prices?.find((p) => p.currency === currentCurrency)?.price ||
          unit.prices?.[0]?.price ||
          0;
        if (unitPrice > max) return false;
      }

      return true;
    });
  }, [rawUnits, filters, currentCurrency]);

  const handleApplyFilters = (newFilters: RentalFilterState) => {
    setFilters(newFilters);
    setPageNumber(1);
  };

  const handleResetFilters = () => {
    setFilters({
      searchTerm: "",
      locationId: "",
      propertyType: "",
      bedrooms: "",
      minPrice: "",
      maxPrice: "",
    });
    setPageNumber(1);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FCFCFC]">
      <Navbar />

      <main className="flex-1 pb-8">
        <RentalBreadcrumb />
        <RentalHeroSection />

        {/* Main Content Area: Sidebar + Grid */}
        <div className="mx-auto mt-12 w-full max-w-[1536px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <RentalFilterSidebar
              initialFilters={filters}
              onApplyFilters={handleApplyFilters}
              onResetFilters={handleResetFilters}
            />

            <RentalUnitsGrid
              units={filteredUnits}
              isLoading={isLoading}
              currentPage={rentalsData?.pageNumber || pageNumber}
              totalPages={rentalsData?.totalPages || 1}
              onPageChange={setPageNumber}
              onResetFilters={handleResetFilters}
            />
          </div>
        </div>

        <RentalCtaSection />
      </main>

      <Footer />
    </div>
  );
}
