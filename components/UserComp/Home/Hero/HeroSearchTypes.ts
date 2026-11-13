export type HeroSearchTab = "Buy" | "Rent" | "Standalone";

export interface PriceBracket {
  label: string;
  min?: number;
  max?: number;
}

export function getPurchasePriceBrackets(currency: string): PriceBracket[] {
  const isEgp = currency.toUpperCase() === "EGP";

  if (isEgp) {
    return [
      { label: "Any Budget" },
      { label: "Under 2M EGP", max: 2000000 },
      { label: "2M - 5M EGP", min: 2000000, max: 5000000 },
      { label: "5M - 10M EGP", min: 5000000, max: 10000000 },
      { label: "10M - 20M EGP", min: 10000000, max: 20000000 },
      { label: "Above 20M EGP", min: 20000000 },
    ];
  }

  const sym = currency.toUpperCase() === "EUR" ? "€" : currency.toUpperCase() === "GBP" ? "£" : "$";
  return [
    { label: "Any Budget" },
    { label: `Under ${sym}100K`, max: 100000 },
    { label: `${sym}100K - ${sym}250K`, min: 100000, max: 250000 },
    { label: `${sym}250K - ${sym}500K`, min: 250000, max: 500000 },
    { label: `${sym}500K - ${sym}1M`, min: 500000, max: 1000000 },
    { label: `Above ${sym}1M`, min: 1000000 },
  ];
}

export function getRentalPriceBrackets(currency: string): PriceBracket[] {
  const isEgp = currency.toUpperCase() === "EGP";

  if (isEgp) {
    return [
      { label: "Any Budget" },
      { label: "Under 15K EGP", max: 15000 },
      { label: "15K - 30K EGP", min: 15000, max: 30000 },
      { label: "30K - 60K EGP", min: 30000, max: 60000 },
      { label: "60K - 100K EGP", min: 60000, max: 100000 },
      { label: "Above 100K EGP", min: 100000 },
    ];
  }

  const sym = currency.toUpperCase() === "EUR" ? "€" : currency.toUpperCase() === "GBP" ? "£" : "$";
  return [
    { label: "Any Budget" },
    { label: `Under ${sym}500`, max: 500 },
    { label: `${sym}500 - ${sym}1,000`, min: 500, max: 1000 },
    { label: `${sym}1,000 - ${sym}2,500`, min: 1000, max: 2500 },
    { label: `${sym}2,500 - ${sym}5,000`, min: 2500, max: 5000 },
    { label: `Above ${sym}5,000`, min: 5000 },
  ];
}

export interface SharedPropertyType {
  label: string;
  rentalId: number;
  standaloneValue: string;
}

export const SHARED_PROPERTY_TYPES: SharedPropertyType[] = [
  { label: "Apartment", rentalId: 0, standaloneValue: "Apartment" },
  { label: "Villa", rentalId: 1, standaloneValue: "Villa" },
  { label: "Townhouse", rentalId: 2, standaloneValue: "Townhouse" },
  { label: "Studio", rentalId: 3, standaloneValue: "Studio" },
  { label: "Penthouse", rentalId: 4, standaloneValue: "Penthouse" },
  { label: "Chalet", rentalId: 8, standaloneValue: "Chalet" },
  { label: "1 Bedroom", rentalId: 5, standaloneValue: "OneBedroom" },
  { label: "2 Bedrooms", rentalId: 6, standaloneValue: "TwoBedroom" },
  { label: "3 Bedrooms", rentalId: 7, standaloneValue: "ThreeBedroom" },
  { label: "4 Bedrooms", rentalId: 9, standaloneValue: "FourBedroom" },
];

export const BEDROOM_OPTIONS = [
  { id: "1", label: "1 Bedroom" },
  { id: "2", label: "2 Bedrooms" },
  { id: "3", label: "3 Bedrooms" },
  { id: "4", label: "4 Bedrooms" },
  { id: "5", label: "5+ Bedrooms" },
];

