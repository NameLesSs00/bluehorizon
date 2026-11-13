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

  return (
    <section className="bg-white pt-8 sm:pt-10 lg:pt-28 pb-8 sm:pb-10 lg:pb-12">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <header className="mb-8 sm:mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className="text-[11px] font-bold uppercase leading-none tracking-[0.12em] text-[#145C4B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              FIND YOUR NEIGHBORHOOD
            </p>
            <h2
              className="mt-2 text-[24px] sm:text-[30px] lg:text-[38px] font-semibold leading-[1.18] tracking-[-0.03em] text-[#202326]"
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-[280px] w-full animate-pulse rounded-[24px] bg-[#E8F1EC]"
              />
            ))}
          </div>
        ) : areas.length === 0 ? (
          <div className="flex h-44 w-full flex-col items-center justify-center rounded-2xl border border-[#E6EAE7] bg-[#FAF8F5] p-8 text-center">
            <p
              className="text-[15px] font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              No areas available at the moment.
            </p>
            <p
              className="mt-1 text-[13px] text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Please check back soon as new destination areas are added.
            </p>
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
