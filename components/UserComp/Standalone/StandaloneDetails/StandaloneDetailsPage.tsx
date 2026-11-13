"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getStandaloneUnitById } from "@/clientApi/standaloneUnitsApi";
import StandaloneBreadcrumb from "./StandaloneBreadcrumb";
import StandaloneDetailsHeader from "./StandaloneDetailsHeader";
import StandaloneImageGallery from "./StandaloneImageGallery";
import StandaloneSpecsBar from "./StandaloneSpecsBar";
import StandaloneAboutSection from "./StandaloneAboutSection";
import StandaloneFacilitiesSection from "./StandaloneFacilitiesSection";
import StandaloneReviewsSection from "./StandaloneReviewsSection";
import StandaloneInquiryCard from "./StandaloneInquiryCard";
import StandaloneSimilarUnits from "./StandaloneSimilarUnits";
import Navbar from "@/components/UserComp/Common/Navbar";
import Footer from "@/components/UserComp/Common/Footer";

interface StandaloneDetailsPageProps {
  id: number;
}

export default function StandaloneDetailsPage({ id }: StandaloneDetailsPageProps) {
  const { data: res, isLoading, isError } = useQuery({
    queryKey: ["standalone-units", "detail", id],
    queryFn: () => getStandaloneUnitById(id, "en", "USD"),
    enabled: id > 0,
    staleTime: 1000 * 60 * 5,
  });

  const unit = res?.data;

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#FCFCFC]">
        <Navbar />
        <main className="flex-1 mx-auto w-full max-w-[1360px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="h-6 w-48 animate-pulse rounded-[12px] bg-[#E1E7E3]" />
          <div className="mt-6 h-10 w-96 animate-pulse rounded-[12px] bg-[#E1E7E3]" />
          <div className="mt-8 h-[450px] animate-pulse rounded-[24px] bg-[#F3F5F3]" />
          <div className="mt-8 h-24 animate-pulse rounded-[20px] bg-[#F3F5F3]" />
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !unit) {
    return (
      <div className="flex min-h-screen flex-col bg-[#FCFCFC]">
        <Navbar />
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F1EC] text-[#145C4B]">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2
            className="mt-4 text-2xl font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Standalone Unit Not Found
          </h2>
          <p
            className="mt-2 text-sm text-[#6B7570] max-w-md"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            The standalone residential unit you are looking for does not exist or
            is currently unavailable.
          </p>
          <Link
            href="/standalone"
            className="mt-6 rounded-[12px] bg-[#145C4B] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0F473A]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Back to Standalone Units
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FCFCFC]">
      <Navbar />
      <main className="flex-1 pb-16">
        <div className="mx-auto w-full max-w-[1360px] px-4 pt-6 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <StandaloneBreadcrumb unitName={unit.name} />

          {/* Title & Asking Price Header */}
          <StandaloneDetailsHeader unit={unit} />

          {/* Photo Gallery */}
          <StandaloneImageGallery images={unit.images || []} title={unit.name} />

          {/* Specs Bar */}
          <StandaloneSpecsBar unit={unit} />

          {/* Two Columns: Left Details & Right Inquiry */}
          <div className="mt-8 flex flex-col lg:flex-row items-start gap-8">
            {/* Left 2/3 Content */}
            <div className="flex-1 w-full space-y-8">
              <StandaloneAboutSection unit={unit} />
              <StandaloneFacilitiesSection unit={unit} />
              <StandaloneReviewsSection unit={unit} />
            </div>

            {/* Right 1/3 Sticky Inquiry Card */}
            <StandaloneInquiryCard unit={unit} />
          </div>

          {/* Similar Recommended Units */}
          <StandaloneSimilarUnits
            currentUnitId={unit.id}
            propertyType={unit.propertyType}
            city={unit.city}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

