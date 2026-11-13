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
      {/* Top Segmented Tabs - Generously Sized & Seamlessly Attached */}
      <div className="flex">
        <div className="relative z-10 -mb-[2px] inline-flex items-center gap-1.5 rounded-t-3xl bg-white px-5 pt-3.5 pb-3 sm:px-6 sm:pt-4 sm:pb-3.5">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-6 py-2.5 sm:px-7 sm:py-3 text-[14px] sm:text-[15px] font-semibold transition-all ${
                  isActive
                    ? "bg-[#0F473A] text-white"
                    : "text-[#202326] hover:text-[#0F473A]"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Filter Body Card - More Spacious, Elegant & Big */}
      <div className="rounded-b-[32px] rounded-tr-[32px] bg-white p-4 sm:p-5 lg:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          {/* 4 Filter Columns with subtle vertical separators */}
          <div className="flex flex-1 flex-col gap-2 sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:items-center lg:gap-0">
            {/* Categories */}
            <HeroFilterDropdown
              iconSrc="/HomePage/hero/label.svg"
              iconAlt="Categories"
              label="Categories"
              selectedValue={selectedCategory.label}
              options={categoryOptions}
              onSelect={setSelectedCategory}
            />

            <div className="hidden h-11 w-[1px] bg-[#E6EAE7] lg:block shrink-0 mx-2" />

            {/* Property Type */}
            <HeroFilterDropdown
              iconSrc="/HomePage/hero/home.svg"
              iconAlt="Property Type"
              label="Property Type"
              selectedValue={selectedType.label}
              options={typeOptions}
              onSelect={setSelectedType}
            />

            <div className="hidden h-11 w-[1px] bg-[#E6EAE7] lg:block shrink-0 mx-2" />

            {/* Price Range */}
            <HeroFilterDropdown
              iconSrc="/HomePage/hero/coin.svg"
              iconAlt="Price Range"
              label="Price Range"
              selectedValue={selectedPrice.label}
              options={priceOptions}
              onSelect={setSelectedPrice}
            />

            <div className="hidden h-11 w-[1px] bg-[#E6EAE7] lg:block shrink-0 mx-2" />

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
            className="inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[#0F473A] px-8 py-4 sm:px-9 sm:py-4.5 text-[15px] sm:text-[16px] font-semibold text-white shadow-md transition-all hover:bg-[#145C4B] hover:shadow-xl"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <FiSearch className="h-5 w-5" />
            <span>Search Properties</span>
          </button>
        </div>
      </div>
    </div>
  );
}
