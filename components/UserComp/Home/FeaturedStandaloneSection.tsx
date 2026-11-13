"use client";

import Image from "next/image";
import Link from "next/link";
import { usePublicStandaloneUnitsQuery } from "@/features/standaloneUnits/useStandaloneUnitsQueries";
import { StandaloneUnitItem } from "@/models/standaloneUnit";
import StandaloneUnitCard from "@/components/UserComp/Standalone/StandaloneUnitCard";

const FALLBACK_STANDALONE_UNITS: StandaloneUnitItem[] = [
  {
    id: 1,
    name: "Luxury Sea-View Apartment",
    description: "Panoramic sea view with spacious balcony and premium finishes.",
    price: 4500000,
    currencyCode: "EGP",
    area: 125,
    noBedRoom: 2,
    noBathRoom: 2,
    noKitchen: 1,
    propertyType: "Home",
    country: "Egypt",
    city: "Hurghada",
    district: "El Kawthar",
    street: "Airport Road",
    isFeatured: true,
    isActive: true,
    prices: [{ id: 1, currency: "EGP", price: 4500000 }],
    services: [],
    images: [
      {
        id: 201,
        imageUrl: "/HomePage/hero/homeImage.jpg",
        isPrimary: true,
        sortOrder: 1,
      },
    ],
  },
  {
    id: 2,
    name: "Luxury Sea-View Apartment",
    description: "Panoramic sea view with spacious balcony and premium finishes.",
    price: 4500000,
    currencyCode: "EGP",
    area: 125,
    noBedRoom: 2,
    noBathRoom: 2,
    noKitchen: 1,
    propertyType: "Villa",
    country: "Egypt",
    city: "Hurghada",
    district: "El Kawthar",
    street: "Airport Road",
    isFeatured: true,
    isActive: true,
    prices: [{ id: 2, currency: "EGP", price: 4500000 }],
    services: [],
    images: [
      {
        id: 202,
        imageUrl: "/rental/heroRental.jpg",
        isPrimary: true,
        sortOrder: 1,
      },
    ],
  },
  {
    id: 3,
    name: "Luxury Sea-View Apartment",
    description: "Panoramic sea view with spacious balcony and premium finishes.",
    price: 4500000,
    currencyCode: "EGP",
    area: 125,
    noBedRoom: 2,
    noBathRoom: 2,
    noKitchen: 1,
    propertyType: "Apartment",
    country: "Egypt",
    city: "Hurghada",
    district: "El Kawthar",
    street: "Airport Road",
    isFeatured: true,
    isActive: true,
    prices: [{ id: 3, currency: "EGP", price: 4500000 }],
    services: [],
    images: [
      {
        id: 203,
        imageUrl: "/Locations/hero.png",
        isPrimary: true,
        sortOrder: 1,
      },
    ],
  },
  {
    id: 4,
    name: "Luxury Sea-View Apartment",
    description: "Panoramic sea view with spacious balcony and premium finishes.",
    price: 4500000,
    currencyCode: "EGP",
    area: 125,
    noBedRoom: 2,
    noBathRoom: 2,
    noKitchen: 1,
    propertyType: "Studio",
    country: "Egypt",
    city: "Hurghada",
    district: "El Kawthar",
    street: "Airport Road",
    isFeatured: true,
    isActive: true,
    prices: [{ id: 4, currency: "EGP", price: 4500000 }],
    services: [],
    images: [
      {
        id: 204,
        imageUrl: "/Blogs/hero.png",
        isPrimary: true,
        sortOrder: 1,
      },
    ],
  },
];

export default function FeaturedStandaloneSection() {
  const { data, isLoading } = usePublicStandaloneUnitsQuery({
    Language: "en",
    PageNumber: 1,
    PageSize: 4,
  });

  const rawUnits = data?.items || [];
  const displayUnits =
    rawUnits.length > 0 ? rawUnits.slice(0, 4) : FALLBACK_STANDALONE_UNITS;

  return (
    <section className="bg-white py-8 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <header className="mb-8 sm:mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className="text-[11px] font-bold uppercase leading-none tracking-[0.12em] text-[#145C4B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              A PLACE OF YOUR OWN
            </p>
            <h2
              className="mt-2 text-[24px] sm:text-[30px] lg:text-[38px] font-semibold leading-[1.18] tracking-[-0.03em] text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Featured Standalone Units
            </h2>
            <p
              className="mt-3 text-[15px] font-normal leading-[1.6] text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Independent homes outside gated communities, in established
              neighborhoods you&apos;ll love.
            </p>
          </div>

          <Link
            href="/standalone"
            className="inline-flex items-center gap-2 self-start text-[14px] font-semibold text-[#145C4B] transition-opacity hover:opacity-80 md:self-end"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span>View all resale units</span>
            <Image
              src="/HomePage/FeaturedProjects/link.svg"
              alt=""
              width={9}
              height={9}
              className="h-[9px] w-[9px] shrink-0"
            />
          </Link>
        </header>

        {/* 4-Column Card Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-[420px] w-full animate-pulse rounded-[20px] bg-[#E8F1EC]"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {displayUnits.map((unit) => (
              <StandaloneUnitCard key={unit.id} unit={unit} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
