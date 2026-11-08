"use client";

import { usePublicProjectLocationsQuery } from "@/features/projectLocations/useProjectLocationsQueries";
import AreaListCard from "./AreaListCard";

export default function AreasListSection() {
  const { data, isLoading } = usePublicProjectLocationsQuery({
    Language: "en",
    PageNumber: 1,
    PageSize: 50,
  });

  const areas = data?.items || [];

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex h-72 w-full flex-col items-center justify-center rounded-[22px] border border-[#DCE4DF] bg-white">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#145C4B] border-t-transparent" />
            <p
              className="mt-3 text-[13px] text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Loading areas...
            </p>
          </div>
        ) : areas.length === 0 ? (
          <div className="flex h-48 w-full items-center justify-center rounded-[22px] border border-[#DCE4DF] bg-white text-[14px] text-[#65706B]">
            No areas available at the moment.
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {areas.map((area) => (
              <AreaListCard key={area.id} area={area} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

