"use client";

import Navbar from "@/components/UserComp/Common/Navbar";
import Footer from "@/components/UserComp/Common/Footer";
import { usePublicRentalByIdQuery } from "@/features/rentals/useRentalsQueries";
import { useCurrencyStore } from "@/features/currency/useCurrencyStore";
import { getFallbackRentalById } from "../rentalFallbacks";
import RentalBreadcrumb from "./RentalBreadcrumb";
import RentalDetailsHeader from "./RentalDetailsHeader";
import RentalImageGallery from "./RentalImageGallery";
import RentalSpecsBar from "./RentalSpecsBar";
import RentalViewsSection from "./RentalViewsSection";
import RentalAboutSection from "./RentalAboutSection";
import RentalFacilitiesSection from "./RentalFacilitiesSection";
import RentalRulesSection from "./RentalRulesSection";
import RentalInquiryCard from "./RentalInquiryCard";
import RentalRelatedUnits from "./RentalRelatedUnits";

interface RentalDetailsPageProps {
  id: number;
}

export default function RentalDetailsPage({ id }: RentalDetailsPageProps) {
  const currentCurrency = useCurrencyStore((state) => state.currentCurrency);
  const { data: apiUnit, isLoading } = usePublicRentalByIdQuery(
    id,
    "en",
    currentCurrency || "EGP"
  );

  // If loading or if API returned data, use it; otherwise fallback to rich mock data
  const unit = apiUnit || getFallbackRentalById(id);

  if (isLoading && !unit) {
    return (
      <div className="flex min-h-screen flex-col bg-[#FCFCFC]">
        <Navbar />
        <main className="mx-auto w-full max-w-[1536px] flex-1 px-4 py-12 sm:px-6 lg:px-8">
          <div className="h-6 w-48 animate-pulse rounded-[12px] bg-[#E1E7E3]" />
          <div className="mt-4 h-10 w-96 animate-pulse rounded-[12px] bg-[#E1E7E3]" />
          <div className="mt-6 h-[480px] animate-pulse rounded-[24px] bg-[#E8F1EC]" />
          <div className="mt-8 h-24 animate-pulse rounded-[20px] bg-[#E8F1EC]" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FCFCFC]">
      <Navbar />

      <main className="mx-auto w-full max-w-[1536px] flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <RentalBreadcrumb
          locationName={unit.rentalLocation?.name}
          unitName={unit.name}
        />

        {/* Title & Location Header */}
        <RentalDetailsHeader unit={unit} />

        {/* Asymmetrical Image Gallery */}
        <RentalImageGallery images={unit.images || []} title={unit.name} />

        {/* 7-Metric Key Specs Strip */}
        <RentalSpecsBar unit={unit} />

        {/* Scenic Views & Orientation (Only renders true views) */}
        <RentalViewsSection unit={unit} />

        {/* 2-Column Main Section: Left Details + Right Sticky Inquiry */}
        <div className="mt-8 flex flex-col lg:flex-row items-start gap-8">
          {/* Left Column */}
          <div className="w-full flex-1 space-y-8">
            <RentalAboutSection unit={unit} />
            <RentalFacilitiesSection unit={unit} />
            <RentalRulesSection unit={unit} />
          </div>

          {/* Right Column (Sticky Inquiry Card) */}
          <RentalInquiryCard unit={unit} />
        </div>

        {/* Related Rental Properties (5 Cards, excluding current ID) */}
        <RentalRelatedUnits currentUnitId={unit.id} />
      </main>

      <Footer />
    </div>
  );
}

