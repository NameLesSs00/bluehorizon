"use client";

import Image from "next/image";
import Link from "next/link";
import { usePublicRentalsQuery } from "@/features/rentals/useRentalsQueries";
import RentalUnitCard from "@/components/UserComp/Rentals/RentalUnitCard";

export default function UnitsForRentSection() {
  const { data, isLoading } = usePublicRentalsQuery({
    Language: "en",
    PageNumber: 1,
    PageSize: 4,
  });

  const rawUnits = data?.items || [];
  const displayUnits = rawUnits.slice(0, 4);

  return (
    <section className="bg-[#F3F5F3] py-8 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <header className="mb-8 sm:mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className="text-[11px] font-bold uppercase leading-none tracking-[0.12em] text-[#145C4B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              FEEL AT HOME, RIGHT AWAY
            </p>
            <h2
              className="mt-2 text-[24px] sm:text-[30px] lg:text-[38px] font-semibold leading-[1.18] tracking-[-0.03em] text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Units for Rent
            </h2>
            <p
              className="mt-3 text-[15px] font-normal leading-[1.6] text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Comfortable rentals for every lifestyle. Find the perfect place for your next chapter.
            </p>
          </div>

          <Link
            href="/rent"
            className="inline-flex items-center gap-2 self-start text-[14px] font-semibold text-[#145C4B] transition-opacity hover:opacity-80 md:self-end"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span>Browse all rentals</span>
            <Image
              src="/HomePage/FeaturedProjects/link.svg"
              alt=""
              width={9}
              height={9}
              className="h-[9px] w-[9px] shrink-0"
            />
          </Link>
        </header>

        {/* 4-Column Card Grid or Empty State */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-[420px] w-full animate-pulse rounded-[20px] bg-[#E8F1EC]"
              />
            ))}
          </div>
        ) : displayUnits.length === 0 ? (
          <div className="flex h-44 w-full flex-col items-center justify-center rounded-2xl border border-[#E6EAE7] bg-white p-8 text-center">
            <p
              className="text-[15px] font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              No rental units available at the moment.
            </p>
            <p
              className="mt-1 text-[13px] text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Please check back soon as vacation and long-term units are added.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {displayUnits.map((unit) => (
              <RentalUnitCard key={unit.id} unit={unit} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
