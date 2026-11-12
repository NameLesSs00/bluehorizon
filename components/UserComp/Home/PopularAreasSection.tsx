"use client";

import Image from "next/image";
import Link from "next/link";
import { usePublicProjectLocationsQuery } from "@/features/projectLocations/useProjectLocationsQueries";
import PopularAreaCard from "./PopularAreaCard";

export default function PopularAreasSection() {
  const { data: locationsData, isLoading } = usePublicProjectLocationsQuery({
    Language: "en",
    PageNumber: 1,
    PageSize: 4,
  });

  const areas = locationsData?.items?.slice(0, 4) || [];

  // If no real areas are available from the backend, hide the section entirely
  if (!isLoading && areas.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className="text-[11px] font-bold uppercase leading-none tracking-[0.12em] text-[#145C4B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              FIND YOUR NEIGHBORHOOD
            </p>
            <h2
              className="mt-2 text-[32px] font-semibold leading-[1.18] tracking-[-0.03em] text-[#202326] sm:text-[38px]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Explore Popular Areas
            </h2>
            <p
              className="mt-3 text-[15px] font-normal leading-[1.6] tracking-normal text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Discover top Places and find your ideal Area.
            </p>
          </div>

          <Link
            href="/areas"
            className="inline-flex items-center gap-2 self-start text-[14px] font-semibold leading-none text-[#145C4B] transition-opacity hover:opacity-80 md:self-end"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span>Discover all areas</span>
            <Image
              src="/HomePage/FeaturedProjects/link.svg"
              alt="Arrow"
              width={9}
              height={9}
              className="h-[9px] w-[9px] shrink-0"
            />
          </Link>
        </header>

        {isLoading ? (
          <div className="flex h-72 w-full flex-col items-center justify-center rounded-2xl border border-[#E6EAE7] bg-[#FAF8F5]">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#145C4B] border-t-transparent" />
            <p
              className="mt-3 text-[13px] text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Loading popular areas...
            </p>
          </div>
        ) : areas.length === 0 ? (
          <div className="flex h-48 w-full items-center justify-center rounded-2xl border border-[#E6EAE7] bg-[#FAF8F5] text-[14px] text-[#65706B]">
            No areas available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {areas.map((area) => (
              <PopularAreaCard key={area.id} area={area} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

