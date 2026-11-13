"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStandaloneUnits } from "@/clientApi/standaloneUnitsApi";
import StandaloneHeroSection from "./StandaloneHeroSection";
import StandaloneFilterSidebar, { FilterState } from "./StandaloneFilterSidebar";
import StandaloneUnitsGrid from "./StandaloneUnitsGrid";
import StandaloneCtaSection from "./StandaloneCtaSection";
import Navbar from "@/components/UserComp/Common/Navbar";
import Footer from "@/components/UserComp/Common/Footer";

export default function StandaloneListPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: "",
    propertyType: "",
    bedrooms: "",
    minPrice: "",
    maxPrice: "",
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
    ],
    queryFn: () =>
      getStandaloneUnits({
        Language: "en",
        Currency: "USD",
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
      if (filters.bedrooms === "5") {
        return (u.noBedRoom || 0) >= 5;
      }
      return u.noBedRoom === bedCount;
    });
  }, [data?.items, filters.bedrooms]);

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    setPageNumber(1);
  };

  const handleResetFilters = () => {
    setFilters({
      searchTerm: "",
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
        <StandaloneHeroSection />

        {/* Main Content Area */}
        <div className="mx-auto mt-10 w-full max-w-[1536px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Left Filter Sidebar */}
            <StandaloneFilterSidebar
              initialFilters={filters}
              onApplyFilters={handleApplyFilters}
              onResetFilters={handleResetFilters}
            />

            {/* Right Units Grid */}
            <StandaloneUnitsGrid
              units={filteredUnits}
              isLoading={isLoading}
              totalCount={data?.totalCount || 0}
              currentPage={data?.pageNumber || pageNumber}
              totalPages={data?.totalPages || 1}
              onPageChange={setPageNumber}
              onResetFilters={handleResetFilters}
            />
          </div>
        </div>

        <StandaloneCtaSection />
      </main>

      <Footer />
    </div>
  );
}

