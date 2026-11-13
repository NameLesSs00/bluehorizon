"use client";

import Link from "next/link";
import Navbar from "@/components/UserComp/Common/Navbar";
import Footer from "@/components/UserComp/Common/Footer";
import { usePublicRentalByIdQuery } from "@/features/rentals/useRentalsQueries";
import { useCurrencyStore } from "@/features/currency/useCurrencyStore";
import { useTranslation } from "@/features/i18n/useTranslation";
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
  const { t, locale } = useTranslation();
  const currentCurrency = useCurrencyStore((state) => state.currentCurrency);
  const { data: unit, isLoading } = usePublicRentalByIdQuery(
    id,
    locale,
    currentCurrency || "EGP"
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#FCFCFC]">
        <Navbar />
        <main className="mx-auto w-full max-w-[1536px] flex-1 px-4 py-12 sm:px-6 lg:px-8">
          <div className="h-6 w-48 animate-pulse rounded-[12px] bg-[#D9E2EE]" />
          <div className="mt-4 h-10 w-96 animate-pulse rounded-[12px] bg-[#D9E2EE]" />
          <div className="mt-6 h-[480px] animate-pulse rounded-[24px] bg-[#E5ECF6]" />
          <div className="mt-8 h-24 animate-pulse rounded-[20px] bg-[#E5ECF6]" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!unit) {
    return (
      <div className="flex min-h-screen flex-col bg-[#FCFCFC]">
        <Navbar />
        <main className="mx-auto flex w-full max-w-[1536px] flex-1 items-center justify-center px-4 py-24 text-center">
          <div>
            <h2
              className="text-2xl font-bold text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {t("rent.details.notFoundTitle")}
            </h2>
            <p
              className="mt-2 text-sm text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("rent.details.notFoundSubtitle")}
            </p>
            <Link
              href={`/${locale}/rent`}
              className="mt-6 inline-flex items-center rounded-[12px] bg-[#2B5FA6] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1B3A6B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("rent.details.backToRentals")}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FCFCFC]">
      <Navbar />

      <main className="mx-auto w-full max-w-[1536px] flex-1 px-4 py-6 sm:px-6 lg:px-8 pb-16">
        <RentalBreadcrumb unitName={unit.name} />
        <RentalDetailsHeader unit={unit} />

        {/* Gallery */}
        <div className="mt-6">
          <RentalImageGallery images={unit.images || []} title={unit.name} />
        </div>

        {/* Key Specs Bar */}
        <div className="mt-6">
          <RentalSpecsBar unit={unit} />
        </div>

        {/* Main Content + Sidebar */}
        <div className="mt-8 flex flex-col lg:flex-row items-start gap-8">
          {/* Left Column: Sections */}
          <div className="flex-1 space-y-6 w-full">
            <RentalViewsSection unit={unit} />
            <RentalAboutSection unit={unit} />
            <RentalFacilitiesSection unit={unit} />
            <RentalRulesSection unit={unit} />
          </div>

          {/* Right Column: Sticky Inquiry Card */}
          <RentalInquiryCard unit={unit} />
        </div>

        {/* Related Units Carousel / Grid */}
        <RentalRelatedUnits currentUnitId={unit.id} />
      </main>

      <Footer />
    </div>
  );
}
