"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { usePublicProjectLocationsQuery } from "@/features/projectLocations/useProjectLocationsQueries";
import { useProjectTypesQuery } from "@/features/projectTypes/useProjectTypesQueries";
import { usePropertyCategoriesQuery } from "@/features/propertyCategories/usePropertyCategoriesQueries";
import { usePublicRentalLocationsQuery } from "@/features/rentalLocations/useRentalLocationsQueries";
import { useCurrencyStore } from "@/features/currency/useCurrencyStore";
import { useTranslation } from "@/features/i18n/useTranslation";
import HeroFilterDropdown, { DropdownOption } from "./HeroFilterDropdown";
import HeroSearchTabs from "./HeroSearchTabs";
import {
  BEDROOM_OPTIONS,
  HeroSearchTab,
  PriceBracket,
  SHARED_PROPERTY_TYPES,
  getPurchasePriceBrackets,
  getRentalPriceBrackets,
} from "./HeroSearchTypes";

const TABS: HeroSearchTab[] = ["Buy", "Rent", "Standalone"];

export default function HeroSearchFilterCard() {
  const router = useRouter();
  const { t, locale } = useTranslation();
  const currentCurrency = useCurrencyStore((state) => state.currentCurrency);

  const [activeTab, setActiveTab] = useState<HeroSearchTab>("Buy");
  const [standaloneSearch, setStandaloneSearch] = useState("");
  const [selectedArea, setSelectedArea] = useState<DropdownOption | null>(null);
  const [selectedType, setSelectedType] = useState<DropdownOption | null>(null);
  const [selectedSecondary, setSelectedSecondary] = useState<DropdownOption | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<DropdownOption | null>(null);

  function handleTabChange(tab: HeroSearchTab) {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setStandaloneSearch("");
    setSelectedArea(null);
    setSelectedType(null);
    setSelectedSecondary(null);
    setSelectedPrice(null);
  }

  // Data Queries
  const { data: projectLocations } = usePublicProjectLocationsQuery({
    Language: locale,
    PageSize: 100,
  });
  const { data: projectTypes } = useProjectTypesQuery({
    Language: locale,
    PageSize: 100,
  });
  const { data: propertyCategories } = usePropertyCategoriesQuery({
    Language: locale,
    PageSize: 100,
  });
  const { data: rentalLocations } = usePublicRentalLocationsQuery({
    Language: locale,
    PageSize: 100,
  });

  // Default labels
  const defaultAreaLabel = t("home.hero.search.anyArea", "Any Area");
  const defaultTypeLabel = t("home.hero.search.allTypes", "All Types");
  const defaultCategoryLabel = t("home.hero.search.anyCategory", "Any Category");
  const defaultBedroomsLabel = t("home.hero.search.anyBedrooms", "Any Bedrooms");
  const defaultPriceLabel = t("home.hero.search.budgetPlaceholder", "{currency} Budget").replace(
    "{currency}",
    currentCurrency
  );

  // Slot 1: Location for Buy & Rent (Standalone has no location entity)
  const areaOptions: DropdownOption[] = useMemo(() => {
    if (activeTab === "Buy") {
      const items = projectLocations?.items ?? [];
      return [{ label: defaultAreaLabel }, ...items.map((l) => ({ id: l.id, label: l.name, value: l.id }))];
    }
    if (activeTab === "Rent") {
      const items = rentalLocations?.items ?? [];
      return [{ label: defaultAreaLabel }, ...items.map((l) => ({ id: l.id, label: l.name, value: l.id }))];
    }
    return [];
  }, [activeTab, projectLocations, rentalLocations, defaultAreaLabel]);

  // Slot 2: Property Type (Rental and Standalone share the same types)
  const typeOptions: DropdownOption[] = useMemo(() => {
    if (activeTab === "Buy") {
      const items = projectTypes?.items ?? [];
      return [{ label: defaultTypeLabel }, ...items.map((t) => ({ id: t.id, label: t.name, value: t.id }))];
    }
    if (activeTab === "Rent") {
      return [
        { label: defaultTypeLabel },
        ...SHARED_PROPERTY_TYPES.map((s) => ({
          id: s.rentalId,
          label: s.label,
          value: s.rentalId,
        })),
      ];
    }
    return [
      { label: defaultTypeLabel },
      ...SHARED_PROPERTY_TYPES.map((s) => ({
        id: s.standaloneValue,
        label: s.label,
        value: s.standaloneValue,
      })),
    ];
  }, [activeTab, projectTypes, defaultTypeLabel]);

  // Slot 3: Categories for Buy; Bedrooms for Rent & Standalone
  const secondaryOptions: DropdownOption[] = useMemo(() => {
    if (activeTab === "Buy") {
      const items = propertyCategories?.items ?? [];
      return [{ label: defaultCategoryLabel }, ...items.map((c) => ({ id: c.id, label: c.name, value: c.id }))];
    }
    return [
      { label: defaultBedroomsLabel },
      ...BEDROOM_OPTIONS.map((b) => ({ id: b.id, label: b.label, value: b.id })),
    ];
  }, [activeTab, propertyCategories, defaultCategoryLabel, defaultBedroomsLabel]);

  // Slot 4: Price Bracket Options
  const priceOptions: DropdownOption[] = useMemo(() => {
    const brackets =
      activeTab === "Rent"
        ? getRentalPriceBrackets(currentCurrency)
        : getPurchasePriceBrackets(currentCurrency);

    return brackets.map((b) => ({
      label: b.min || b.max ? `${b.label}` : defaultPriceLabel,
      value: b,
    }));
  }, [activeTab, currentCurrency, defaultPriceLabel]);

  const secondaryLabel =
    activeTab === "Buy"
      ? t("home.hero.search.categories", "Categories")
      : t("home.hero.search.bedrooms", "Bedrooms");

  const secondaryDefaultText = activeTab === "Buy" ? defaultCategoryLabel : defaultBedroomsLabel;

  const getTabLabel = (tab: HeroSearchTab) => {
    if (tab === "Buy") return t("home.hero.search.tabBuy", "Buy");
    if (tab === "Rent") return t("home.hero.search.tabRent", "Rent");
    if (tab === "Standalone") return t("home.hero.search.tabStandalone", "Standalone");
    return tab;
  };

  function handleSearch() {
    const params = new URLSearchParams();
    const priceVal = selectedPrice?.value as PriceBracket | undefined;
    if (priceVal?.min) params.set("minPrice", String(priceVal.min));
    if (priceVal?.max) params.set("maxPrice", String(priceVal.max));

    if (activeTab === "Buy") {
      if (selectedArea?.id) params.set("locationId", String(selectedArea.id));
      if (selectedType?.id) params.set("projectTypeId", String(selectedType.id));
      if (selectedSecondary?.id) params.set("categoryId", String(selectedSecondary.id));
      router.push(`/${locale}/projects?${params.toString()}`);
      return;
    }

    if (activeTab === "Rent") {
      if (selectedArea?.id) params.set("locationId", String(selectedArea.id));
      if (selectedType?.id !== undefined && selectedType?.id !== "") {
        params.set("propertyType", String(selectedType.id));
      }
      if (selectedSecondary?.id) params.set("bedrooms", String(selectedSecondary.id));
      router.push(`/${locale}/rent?${params.toString()}`);
      return;
    }

    if (activeTab === "Standalone") {
      if (standaloneSearch.trim()) params.set("searchTerm", standaloneSearch.trim());
      if (selectedType?.value) params.set("propertyType", String(selectedType.value));
      if (selectedSecondary?.id) params.set("bedrooms", String(selectedSecondary.id));
      router.push(`/${locale}/standalone?${params.toString()}`);
    }
  }

  return (
    <div className="w-full max-w-[1300px] drop-shadow-[0_20px_35px_rgba(0,0,0,0.08)]">
      <HeroSearchTabs
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        getTabLabel={getTabLabel}
      />

      {/* Main Filter Body Card */}
      <div className="rounded-[24px] lg:rounded-b-[32px] lg:rounded-tr-[32px] lg:rounded-tl-none bg-white p-3.5 sm:p-5 lg:p-6 border border-[#E2E8F3]/80 lg:border-none shadow-lg lg:shadow-none">
        <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center">
          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:flex lg:flex-1 lg:flex-row lg:items-center lg:gap-0">
            {/* Slot 1: Location for Buy & Rent; Search for Standalone (no location entity) */}
            {activeTab === "Standalone" ? (
              <div className="flex w-full items-center gap-2 sm:gap-3.5 px-2.5 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-3.5 text-start transition-colors hover:bg-neutral-50/80 rounded-xl sm:rounded-2xl border border-[#E2E8F3] lg:border-none">
                <div className="relative flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center">
                  <FiSearch className="h-5 w-5 sm:h-6 sm:w-6 text-[#1B3A6B]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className="text-[10px] sm:text-[12px] font-medium text-[#65706B] leading-none"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {t("standaloneList.filters.search", "Search")}
                  </p>
                  <input
                    type="text"
                    value={standaloneSearch}
                    onChange={(e) => setStandaloneSearch(e.target.value)}
                    placeholder={t("standaloneList.filters.searchPlaceholder", "Search by name...")}
                    className="mt-1 w-full bg-transparent text-[12px] sm:text-[14px] lg:text-[16px] font-semibold text-[#202326] outline-none placeholder:text-[#9AA5A0] placeholder:font-normal"
                    style={{ fontFamily: "var(--font-inter)" }}
                  />
                </div>
              </div>
            ) : (
              <HeroFilterDropdown
                iconSrc="/HomePage/hero/location.svg"
                iconAlt="Area"
                label={t("home.hero.search.area", "Area")}
                selectedValue={selectedArea?.label || defaultAreaLabel}
                options={areaOptions}
                onSelect={setSelectedArea}
              />
            )}

            <div className="hidden h-11 w-[1px] bg-[#E2E8F3] lg:block shrink-0 mx-2" />

            {/* Slot 2: Property Type */}
            <HeroFilterDropdown
              iconSrc="/HomePage/hero/home.svg"
              iconAlt="Property Type"
              label={t("home.hero.search.propertyType", "Property Type")}
              selectedValue={selectedType?.label || defaultTypeLabel}
              options={typeOptions}
              onSelect={setSelectedType}
            />

            <div className="hidden h-11 w-[1px] bg-[#E2E8F3] lg:block shrink-0 mx-2" />

            {/* Slot 3: Categories (Buy) or Bedrooms (Rent/Standalone) */}
            <HeroFilterDropdown
              iconSrc="/HomePage/hero/label.svg"
              iconAlt={secondaryLabel}
              label={secondaryLabel}
              selectedValue={selectedSecondary?.label || secondaryDefaultText}
              options={secondaryOptions}
              onSelect={setSelectedSecondary}
            />

            <div className="hidden h-11 w-[1px] bg-[#E2E8F3] lg:block shrink-0 mx-2" />

            {/* Slot 4: Price Range */}
            <HeroFilterDropdown
              iconSrc="/HomePage/hero/coin.svg"
              iconAlt="Price Range"
              label={t("home.hero.search.priceRange", "Price Range")}
              selectedValue={selectedPrice?.label || defaultPriceLabel}
              options={priceOptions}
              onSelect={setSelectedPrice}
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
            <span>{t("home.hero.search.searchButton", "Search Properties")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
