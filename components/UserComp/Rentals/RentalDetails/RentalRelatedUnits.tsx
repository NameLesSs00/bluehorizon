"use client";

import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { usePublicRentalsQuery } from "@/features/rentals/useRentalsQueries";
import { FALLBACK_RENTAL_UNITS } from "../rentalFallbacks";
import RentalUnitCard from "../RentalUnitCard";

interface RentalRelatedUnitsProps {
  currentUnitId: number;
}

export default function RentalRelatedUnits({
  currentUnitId,
}: RentalRelatedUnitsProps) {
  const { data, isLoading } = usePublicRentalsQuery({
    Language: "en",
    PageNumber: 1,
    PageSize: 8,
  });

  const rawItems = data?.items || [];
  const filteredFromApi = rawItems.filter((u) => u.id !== currentUnitId);

  // If API has enough items, take up to 5; otherwise supplement from fallback units
  const relatedUnits =
    filteredFromApi.length >= 3
      ? filteredFromApi.slice(0, 5)
      : [
          ...filteredFromApi,
          ...FALLBACK_RENTAL_UNITS.filter(
            (u) =>
              u.id !== currentUnitId &&
              !filteredFromApi.some((apiU) => apiU.id === u.id)
          ),
        ].slice(0, 5);

  if (!isLoading && relatedUnits.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 sm:mt-20 pt-10 border-t border-[#E1E7E3]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2
            className="text-2xl sm:text-3xl font-bold text-[#145C4B]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Related Rental Properties
          </h2>
          <p
            className="mt-1 text-sm text-[#65706B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Explore verified luxury apartments, penthouses, and villas in prime locations
          </p>
        </div>

        <Link
          href="/rent"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#145C4B] transition-colors hover:text-[#0F473A]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <span>View all rentals</span>
          <FiChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-80 animate-pulse rounded-[20px] bg-[#E8F1EC]"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {relatedUnits.map((u) => (
            <RentalUnitCard key={u.id} unit={u} />
          ))}
        </div>
      )}
    </section>
  );
}

