"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { usePublicProjectLocationsQuery } from "@/features/projectLocations/useProjectLocationsQueries";
import { useProjectTypesQuery } from "@/features/projectTypes/useProjectTypesQueries";
import { usePropertyCategoriesQuery } from "@/features/propertyCategories/usePropertyCategoriesQueries";
import { useCurrencyStore } from "@/features/currency/useCurrencyStore";
import HeroFilterDropdown, { DropdownOption } from "./HeroFilterDropdown";
import {
  HERO_PRICE_BRACKETS,
  HeroSearchTab,
} from "./HeroSearchTypes";

const TABS: HeroSearchTab[] = ["Buy", "Rent", "Standalone"];

export default function HeroSearchFilterCard() {
  const router = useRouter();
  const currentCurrency = useCurrencyStore((state) => state.currentCurrency);

  const [activeTab, setActiveTab] = useState<HeroSearchTab>("Buy");
  const [selectedCategory, setSelectedCategory] = useState<DropdownOption>({
    label: "Any Category",
  });
  const [selectedType, setSelectedType] = useState<DropdownOption>({
    label: "All Types",
  });
  const [selectedPrice, setSelectedPrice] = useState<DropdownOption>({
    label: `${currentCurrency} Budget`,
  });
  const [selectedArea, setSelectedArea] = useState<DropdownOption>({
    label: "Any Area",
  });

  const { data: locationsData } = usePublicProjectLocationsQuery({
    PageSize: 100,
  });
  const { data: typesData } = useProjectTypesQuery({ PageSize: 100 });
  const { data: categoriesData } = usePropertyCategoriesQuery({
    PageSize: 100,
  });

  const categoryOptions: DropdownOption[] = useMemo(() => {
    const items = categoriesData?.items ?? [];
    return [
      { label: "Any Category" },
      ...items.map((c) => ({ id: c.id, label: c.name, value: c.id })),
    ];
  }, [categoriesData]);

  const typeOptions: DropdownOption[] = useMemo(() => {
    const items = typesData?.items ?? [];
    return [
      { label: "All Types" },
      ...items.map((t) => ({ id: t.id, label: t.name, value: t.id })),
    ];
  }, [typesData]);

  const priceOptions: DropdownOption[] = useMemo(() => {
    return HERO_PRICE_BRACKETS.map((b) => ({
      label: b.min || b.max ? `${b.label} (${currentCurrency})` : `${currentCurrency} Budget`,
      value: b,
    }));
  }, [currentCurrency]);

  const areaOptions: DropdownOption[] = useMemo(() => {
    const items = locationsData?.items ?? [];
    return [
      { label: "Any Area" },
      ...items.map((l) => ({ id: l.id, label: l.name, value: l.id })),
    ];
  }, [locationsData]);

  function handleSearch() {
    const params = new URLSearchParams();

    if (selectedArea.id) {
      params.set("locationId", String(selectedArea.id));
    }
    if (selectedType.id) {
      params.set("typeId", String(selectedType.id));
    }
    if (selectedCategory.id) {
      params.set("categoryId", String(selectedCategory.id));
    }

    const priceVal = selectedPrice.value as { min?: number; max?: number } | undefined;
    if (priceVal?.min) params.set("minPrice", String(priceVal.min));
    if (priceVal?.max) params.set("maxPrice", String(priceVal.max));

    if (activeTab === "Rent") {
      router.push(`/rent?${params.toString()}`);
    } else if (activeTab === "Standalone") {
      router.push(`/standalone?${params.toString()}`);
    } else {
      router.push(`/projects?${params.toString()}`);
    }
  }

  return (
    <div className="w-full max-w-[1300px] drop-shadow-[0_20px_35px_rgba(0,0,0,0.08)]">
      {/* Desktop Top Segmented Tabs - Attached only on large screens */}
      <div className="hidden lg:flex">
        <div className="relative z-10 -mb-[2px] inline-flex items-center gap-1.5 rounded-t-3xl bg-white px-6 pt-4 pb-3.5">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-7 py-3 text-[15px] font-semibold transition-all ${
                  isActive
                    ? "bg-[#1B3A6B] text-white"
                    : "text-[#202326] hover:text-[#1B3A6B]"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Filter Body Card */}
      <div className="rounded-[24px] lg:rounded-b-[32px] lg:rounded-tr-[32px] lg:rounded-tl-none bg-white p-3.5 sm:p-5 lg:p-6 border border-[#E2E8F3]/80 lg:border-none shadow-lg lg:shadow-none">
        {/* Mobile Full-Width Segmented Tabs */}
        <div className="grid grid-cols-3 gap-1 rounded-full bg-[#F0F3FA] p-1 mb-3 lg:hidden">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full py-2 text-xs font-semibold transition-all text-center ${
                  isActive
                    ? "bg-[#1B3A6B] text-white shadow-2xs"
                    : "text-[#202326] hover:text-[#1B3A6B]"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center">
          {/* 4 Filter Columns: 2x2 grid on mobile/tablet, horizontal bar on desktop */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:flex lg:flex-1 lg:flex-row lg:items-center lg:gap-0">
            {/* Categories */}
            <HeroFilterDropdown
              iconSrc="/HomePage/hero/label.svg"
              iconAlt="Categories"
              label="Categories"
              selectedValue={selectedCategory.label}
              options={categoryOptions}
              onSelect={setSelectedCategory}
            />

            <div className="hidden h-11 w-[1px] bg-[#E2E8F3] lg:block shrink-0 mx-2" />

            {/* Property Type */}
            <HeroFilterDropdown
              iconSrc="/HomePage/hero/home.svg"
              iconAlt="Property Type"
              label="Property Type"
              selectedValue={selectedType.label}
              options={typeOptions}
              onSelect={setSelectedType}
            />

            <div className="hidden h-11 w-[1px] bg-[#E2E8F3] lg:block shrink-0 mx-2" />

            {/* Price Range */}
            <HeroFilterDropdown
              iconSrc="/HomePage/hero/coin.svg"
              iconAlt="Price Range"
              label="Price Range"
              selectedValue={selectedPrice.label}
              options={priceOptions}
              onSelect={setSelectedPrice}
            />

            <div className="hidden h-11 w-[1px] bg-[#E2E8F3] lg:block shrink-0 mx-2" />

            {/* Area */}
            <HeroFilterDropdown
              iconSrc="/HomePage/hero/location.svg"
              iconAlt="Area"
              label="Area"
              selectedValue={selectedArea.label}
              options={areaOptions}
              onSelect={setSelectedArea}
            />
          </div>

          {/* Search Button */}
          <button
            type="button"
            onClick={handleSearch}
            className="inline-flex w-full lg:w-auto shrink-0 items-center justify-center gap-2.5 rounded-full bg-[#1B3A6B] px-6 py-3 sm:py-3.5 lg:px-9 lg:py-4.5 text-[14px] sm:text-[15px] lg:text-[16px] font-semibold text-white shadow-md transition-all hover:bg-[#2B5FA6] hover:shadow-xl"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <FiSearch className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Search Properties</span>
          </button>
        </div>
      </div>
    </div>
  );
}
