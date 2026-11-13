"use client";

import { useMemo, useState } from "react";
import { usePublicRentalLocationsQuery } from "@/features/rentalLocations/useRentalLocationsQueries";
import { useTranslation } from "@/features/i18n/useTranslation";
import LocationsHeroSection from "./LocationsHeroSection";
import LocationsFilterBar, { LocationRegion } from "./LocationsFilterBar";
import LocationsGridSection from "./LocationsGridSection";
import LocationsCtaSection from "./LocationsCtaSection";
import Navbar from "@/components/UserComp/Common/Navbar";
import Footer from "@/components/UserComp/Common/Footer";

export default function LocationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] =
    useState<LocationRegion>("All Regions");
  const { locale } = useTranslation();

  const { data: locationsData, isLoading } = usePublicRentalLocationsQuery({
    Language: locale,
    PageNumber: 1,
    PageSize: 50,
  });

  const rawLocations = locationsData?.items || [];

  const filteredLocations = useMemo(() => {
    return rawLocations.filter((loc) => {
      const matchesSearch =
        searchQuery.trim().length === 0 ||
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.description?.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedRegion === "All Regions") return true;

      const lowerName = loc.name.toLowerCase();
      if (selectedRegion === "Greater Cairo") {
        return (
          lowerName.includes("cairo") ||
          lowerName.includes("october") ||
          lowerName.includes("zayed") ||
          lowerName.includes("tagamoa")
        );
      }
      if (selectedRegion === "North Coast") {
        return (
          lowerName.includes("north") ||
          lowerName.includes("coast") ||
          lowerName.includes("sahel") ||
          lowerName.includes("alamein")
        );
      }
      if (selectedRegion === "Red Sea") {
        return (
          lowerName.includes("sahl") ||
          lowerName.includes("hurghada") ||
          lowerName.includes("gouna") ||
          lowerName.includes("makadi") ||
          lowerName.includes("soma")
        );
      }

      return true;
    });
  }, [rawLocations, searchQuery, selectedRegion]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedRegion("All Regions");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FCFCFC]">
      <Navbar />
      <main className="flex-1 pb-8">
        <LocationsHeroSection />

        <LocationsFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedRegion={selectedRegion}
          onSelectRegion={setSelectedRegion}
        />

        <LocationsGridSection
          locations={filteredLocations}
          isLoading={isLoading}
          onClearFilters={handleClearFilters}
        />

        <LocationsCtaSection />
      </main>

      <Footer />
    </div>
  );
}
