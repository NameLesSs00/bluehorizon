"use client";

import Image from "next/image";
import Link from "next/link";
import { usePublicRentalLocationsQuery } from "@/features/rentalLocations/useRentalLocationsQueries";
import { RentalLocationItem } from "@/models/rentalLocation";
import RentalLocationCard from "./RentalLocationCard";

const FALLBACK_RENTAL_LOCATIONS: RentalLocationItem[] = [
  {
    id: 1,
    name: "New Cairo",
    description: "Premier modern residential and business hub.",
    videoUrl: null,
    images: [
      {
        id: 101,
        imageUrl: "/Locations/hero.png",
        isPrimary: true,
        sortOrder: 1,
      },
    ],
  },
  {
    id: 2,
    name: "6th of October",
    description: "Vibrant suburban community with top amenities.",
    videoUrl: null,
    images: [
      {
        id: 102,
        imageUrl: "/HomePage/hero/homeImage.jpg",
        isPrimary: true,
        sortOrder: 1,
      },
    ],
  },
  {
    id: 3,
    name: "North Coast",
    description: "Crystal blue Mediterranean coastal paradise.",
    videoUrl: null,
    images: [
      {
        id: 103,
        imageUrl: "/Locations/ctaBackGound.png",
        isPrimary: true,
        sortOrder: 1,
      },
    ],
  },
  {
    id: 4,
    name: "Sheikh Zayed",
    description: "Upscale modern living and green communities.",
    videoUrl: null,
    images: [
      {
        id: 104,
        imageUrl: "/Blogs/hero.png",
        isPrimary: true,
        sortOrder: 1,
      },
    ],
  },
];

export default function PopularRentalLocationsSection() {
  const { data: locationsData, isLoading } = usePublicRentalLocationsQuery({
    Language: "en",
    PageNumber: 1,
    PageSize: 4,
  });

  const rawLocations = locationsData?.items || [];
  const displayLocations =
    rawLocations.length > 0 ? rawLocations.slice(0, 4) : FALLBACK_RENTAL_LOCATIONS;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <header className="mb-10 sm:mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className="text-[11px] font-bold uppercase leading-none tracking-[0.12em] text-[#145C4B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              FIND YOUR COMFORTABLE ZONE
            </p>
            <h2
              className="mt-2 text-[32px] font-semibold leading-[1.18] tracking-[-0.03em] text-[#202326] sm:text-[38px]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Popular rental Locations
            </h2>
            <p
              className="mt-3 text-[15px] font-normal leading-[1.6] text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Discover top destinations and find your ideal location.
            </p>
          </div>

          <Link
            href="/locations"
            className="inline-flex items-center gap-2 self-start text-[14px] font-semibold text-[#145C4B] transition-opacity hover:opacity-80 md:self-end"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span>Discover all locations</span>
            <Image
              src="/HomePage/FeaturedProjects/link.svg"
              alt=""
              width={9}
              height={9}
              className="h-[9px] w-[9px] shrink-0"
            />
          </Link>
        </header>

        {/* 4-Column Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="aspect-[300/380] w-full animate-pulse rounded-[20px] bg-[#E8F1EC]"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {displayLocations.map((loc) => (
              <RentalLocationCard key={loc.id} location={loc} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

