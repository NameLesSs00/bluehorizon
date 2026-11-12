export type HeroSearchTab = "Buy" | "Rent" | "Standalone";

export interface HeroSearchFilterState {
  tab: HeroSearchTab;
  categoryId?: number;
  categoryName?: string;
  propertyTypeId?: number;
  propertyTypeName?: string;
  priceRange?: string;
  minPrice?: number;
  maxPrice?: number;
  locationId?: number;
  locationName?: string;
}

export interface PriceBracket {
  label: string;
  min?: number;
  max?: number;
}

export const HERO_PRICE_BRACKETS: PriceBracket[] = [
  { label: "Any Budget" },
  { label: "Under 2M", max: 2000000 },
  { label: "2M - 5M", min: 2000000, max: 5000000 },
  { label: "5M - 10M", min: 5000000, max: 10000000 },
  { label: "10M - 20M", min: 10000000, max: 20000000 },
  { label: "Above 20M", min: 20000000 },
];

