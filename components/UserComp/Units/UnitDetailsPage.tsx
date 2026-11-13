"use client";

import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/UserComp/Common/Navbar";
import Footer from "@/components/UserComp/Common/Footer";
import UnitBreadcrumb from "./UnitBreadcrumb";
import UnitDetailsHeader from "./UnitDetailsHeader";
import UnitImageGallery from "./UnitImageGallery";
import UnitSpecsBar from "./UnitSpecsBar";
import UnitOverviewSection from "./UnitOverviewSection";
import UnitFacilitiesSection from "./UnitFacilitiesSection";
import UnitReviewsSection from "./UnitReviewsSection";
import UnitInquiryCard from "./UnitInquiryCard";
import UnitSimilarUnits from "./UnitSimilarUnits";
import { getPrimaryUnitById, getFullPrimaryUnitMediaUrl } from "@/clientApi/primaryUnitsApi";
import { getResaleById, getFullResaleMediaUrl } from "@/clientApi/resalesApi";
import { PROPERTY_TYPE_LABELS } from "@/models/resale";
import { NormalizedUnitDetails } from "./unitTypes";

interface UnitDetailsPageProps {
  id: number;
  type?: "primary" | "resale";
}

export default function UnitDetailsPage({ id, type = "primary" }: UnitDetailsPageProps) {
  // Query primary unit if type === "primary"
  const { data: primaryRes, isLoading: isPrimaryLoading } = useQuery({
    queryKey: ["publicPrimaryUnit", id],
    queryFn: async () => {
      if (!id || id <= 0) return null;
      const res = await getPrimaryUnitById(id, "en", "USD");
      return res.data;
    },
    enabled: type === "primary" && typeof id === "number" && id > 0,
    staleTime: 1000 * 60 * 5,
  });

  // Query resale unit if type === "resale"
  const { data: resaleRes, isLoading: isResaleLoading } = useQuery({
    queryKey: ["publicResaleUnit", id],
    queryFn: async () => {
      if (!id || id <= 0) return null;
      const res = await getResaleById(id, "en", "USD");
      return res.data;
    },
    enabled: type === "resale" && typeof id === "number" && id > 0,
    staleTime: 1000 * 60 * 5,
  });

  const isLoading = type === "resale" ? isResaleLoading : isPrimaryLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#F3F5F3]">
        <Navbar />
        <main className="flex-1 pb-16">
          <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 pt-8">
            <div className="h-4 w-48 animate-pulse rounded bg-[#E1E7E3] mb-6" />
            <div className="h-10 w-80 animate-pulse rounded bg-[#E1E7E3] mb-6" />
            <div className="h-[360px] lg:h-[460px] w-full animate-pulse rounded-[24px] bg-[#E8F1EC] mb-8" />
            <div className="h-24 w-full animate-pulse rounded-[20px] bg-white mb-8" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Normalize data based on unit type
  let unit: NormalizedUnitDetails | null = null;

  if (type === "primary" && primaryRes) {
    const p = primaryRes;
    const priceUSD =
      p.prices?.find((pr) => pr.currency === "USD")?.price || p.prices?.[0]?.price;
    const priceFormatted =
      typeof priceUSD === "number" && priceUSD > 0
        ? `$ ${priceUSD.toLocaleString()}`
        : "Price on request";

    const catName =
      typeof p.propertyType === "number"
        ? PROPERTY_TYPE_LABELS[p.propertyType as keyof typeof PROPERTY_TYPE_LABELS] || ""
        : String(p.propertyType || "");

    const images = (p.images || []).map((img) => ({
      id: img.id,
      url: getFullPrimaryUnitMediaUrl(img.imageUrl),
      isPrimary: img.isPrimary,
    }));

    unit = {
      id: p.id,
      type: "primary",
      title: p.name,
      description: p.description,
      priceFormatted,
      rawPrice: priceUSD,
      currency: "USD",
      area: p.area,
      bedrooms: p.noBedRoom,
      bathrooms: p.noBathRoom,
      kitchens: p.noKitchen,
      floorNumber: p.floorNumber,
      floorName: p.floorName,
      view: p.view,
      markerId: p.markerId,
      propertyType: catName,
      projectId: p.projectId,
      projectName: p.projectName,
      images,
      services: p.services || [],
      reviews: p.reviews || [],
    };
  } else if (type === "resale" && resaleRes) {
    const r = resaleRes;
    const priceUSD =
      r.prices?.find((pr) => pr.currency === "USD")?.price || r.prices?.[0]?.price;
    const priceFormatted =
      typeof priceUSD === "number" && priceUSD > 0
        ? `$ ${priceUSD.toLocaleString()}`
        : "Price on request";

    const catName =
      typeof r.propertyType === "number"
        ? PROPERTY_TYPE_LABELS[r.propertyType as keyof typeof PROPERTY_TYPE_LABELS] || ""
        : String(r.propertyType || "");

    const images = (r.imageUrls || []).map((url, idx) => ({
      url: getFullResaleMediaUrl(url),
      isPrimary: idx === 0,
    }));

    unit = {
      id: r.id,
      type: "resale",
      title: r.name,
      description: r.description,
      priceFormatted,
      rawPrice: priceUSD,
      currency: "USD",
      area: r.area,
      bedrooms: r.noBedRoom,
      bathrooms: r.noBathRoom,
      kitchens: r.noKitchen,
      floorNumber: r.floorNumber,
      floorName: r.floorName,
      view: r.view,
      markerId: r.markerId,
      propertyType: catName,
      projectId: r.project?.id,
      projectName: r.project?.name || r.projectName,
      images,
      services: r.services || [],
      reviews: [],
    };
  }

  if (!unit) {
    return (
      <div className="flex min-h-screen flex-col bg-[#F3F5F3]">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-md rounded-[24px] bg-white p-8 text-center shadow-xs">
            <h2
              className="text-xl font-bold text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Unit Not Found
            </h2>
            <p
              className="mt-2 text-xs text-[#6B7570]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              The unit you are looking for is currently unavailable or does not exist.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F3F5F3]">
      <Navbar />

      <main className="flex-1 pb-20">
        <UnitBreadcrumb
          unitName={unit.title}
          projectName={unit.projectName}
          projectId={unit.projectId}
        />

        <UnitDetailsHeader
          title={unit.title}
          location={unit.projectName || unit.projectLocation}
          priceFormatted={unit.priceFormatted}
          badge={unit.type === "resale" ? "Resale" : "Primary"}
          propertyType={unit.propertyType}
        />

        <UnitImageGallery images={unit.images} title={unit.title} />

        <UnitSpecsBar
          priceFormatted={unit.priceFormatted}
          area={unit.area}
          bedrooms={unit.bedrooms}
          bathrooms={unit.bathrooms}
          kitchens={unit.kitchens}
          floorNumber={unit.floorNumber}
          propertyType={unit.propertyType}
        />

        {/* Content Two-Column Layout */}
        <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Left Column (65%) */}
            <div className="w-full lg:w-2/3 space-y-8">
              <UnitOverviewSection
                description={unit.description}
                view={unit.view}
                floorName={unit.floorName}
                markerId={unit.markerId}
                projectName={unit.projectName}
              />

              <UnitFacilitiesSection services={unit.services} />

              <UnitReviewsSection reviews={unit.reviews} />

              <UnitSimilarUnits
                currentUnitId={unit.id}
                type={unit.type}
                projectId={unit.projectId}
              />
            </div>

            {/* Right Column (35% Sticky) */}
            <div className="w-full lg:w-1/3">
              <UnitInquiryCard
                priceFormatted={unit.priceFormatted}
                unitTitle={unit.title}
                unitId={unit.id}
                unitType={unit.type}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

