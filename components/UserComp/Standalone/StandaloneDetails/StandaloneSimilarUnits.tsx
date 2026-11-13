"use client";

import { useQuery } from "@tanstack/react-query";
import { getStandaloneUnits } from "@/clientApi/standaloneUnitsApi";
import StandaloneUnitCard from "../StandaloneUnitCard";

interface StandaloneSimilarUnitsProps {
  currentUnitId: number;
  propertyType?: string;
  city?: string;
}

export default function StandaloneSimilarUnits({
  currentUnitId,
  propertyType,
  city,
}: StandaloneSimilarUnitsProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["standalone-units", "similar", propertyType, city],
    queryFn: () =>
      getStandaloneUnits({
        Language: "en",
        Currency: "USD",
        // PropertyType: propertyType || undefined,
        // City: city || undefined,
        PageNumber: 1,
        PageSize: 5,
      }),
    staleTime: 1000 * 60 * 5,
  });

  const similarUnits = (data?.items || [])
    .filter((u) => u.id !== currentUnitId)
    .slice(0, 4);

  if (!isLoading && similarUnits.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 sm:mt-20">
      <div className="border-t border-[#E1E7E3] pt-12">
        {/* Section Header */}
        <div>
          <h2
            className="text-2xl sm:text-3xl font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Similar Recommended Units
          </h2>
          <p
            className="mt-1 text-xs sm:text-sm text-[#6B7570]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Explore similar luxury residences {city ? `in ${city}` : "ready for ownership"}
          </p>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="h-[360px] animate-pulse rounded-[20px] border border-[#E1E7E3] bg-[#F3F5F3]"
              />
            ))}
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarUnits.map((item) => (
              <StandaloneUnitCard key={item.id} unit={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

