import { LocalizedText } from "./faq";

export enum PropertyType {
  Apartment = 0,
  Villa = 1,
  Townhouse = 2,
  Studio = 3,
  Penthouse = 4,
  OneBedroom = 5,
  TwoBedroom = 6,
  ThreeBedroom = 7,
  Chalet = 8,
  FourBedroom = 9,
  StudioCompact = 10,
}

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  [PropertyType.Apartment]: "Apartment",
  [PropertyType.Villa]: "Villa",
  [PropertyType.Townhouse]: "Townhouse",
  [PropertyType.Studio]: "Studio",
  [PropertyType.Penthouse]: "Penthouse",
  [PropertyType.OneBedroom]: "1 Bedroom",
  [PropertyType.TwoBedroom]: "2 Bedrooms",
  [PropertyType.ThreeBedroom]: "3 Bedrooms",
  [PropertyType.Chalet]: "Chalet",
  [PropertyType.FourBedroom]: "4 Bedrooms",
  [PropertyType.StudioCompact]: "Studio (Compact)",
};

export interface RentalPrice {
  id: number;
  currency: string;
  price: number;
}

export interface RentalImageItem {
  id: number;
  imageUrl: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface RentalListingDetails {
  lateCheckIn: string;
  services: string[];
  extraPeopleFee: number;
  familyFriendly: boolean;
  privateEntrance: boolean;
  extraPeople: string;
}

export interface LocalizedRentalListingDetails {
  lateCheckIn: LocalizedText;
  services: LocalizedText[];
  extraPeopleFee: number;
  familyFriendly: boolean;
  privateEntrance: boolean;
  extraPeople: LocalizedText;
}

export interface RentalCategoryItem {
  id: number;
  name: string;
  icon?: string;
  displayOrder?: number;
}

export interface RentalInfoAreaPlace {
  id: number;
  name: string;
  distance: string;
}

export interface RentalLocationReference {
  id: number;
  name: string;
  description?: string;
  videoUrl?: string | null;
}

export interface RentalItem {
  id: number;
  code: string;
  name: string;
  description: string;
  rentalLocation?: RentalLocationReference | null;
  floor: string;
  bedroomNo: number;
  bathroomNo: number;
  capacity: number;
  size: number;
  prices: RentalPrice[];
  propertyType: PropertyType;
  isAvailable: boolean;
  isFeatured: boolean;
  hasSeaView: boolean;
  hasPoolView: boolean;
  hasGardenView: boolean;
  hasMountainView: boolean;
  hasCityView: boolean;
  rulesCancellation: string;
  notes: string;
  listingDetails: RentalListingDetails;
  categoryItems?: RentalCategoryItem[];
  infoAreaPlaces?: RentalInfoAreaPlace[];
  images: RentalImageItem[];
  createdBy?: string | null;
  createdAt?: string | null;
  updatedBy?: string | null;
  updatedAt?: string | null;
}

export interface PaginatedRentalsData {
  items: RentalItem[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface RentalsQueryParams {
  Language?: string;
  Currency?: string;
  CategoryItemId?: number;
  PageNumber?: number;
  PageSize?: number;
}

export interface RentalRelationAreaPlacePayload {
  infoAreaPlaceId: number;
  distance: string;
}

export interface RentalFormPayload {
  id?: number;
  code: string;
  name: LocalizedText;
  description: LocalizedText;
  rentalLocationId: number;
  floor: LocalizedText;
  bedroomNo: number;
  bathroomNo: number;
  capacity: number;
  size: number;
  priceUSD: number;
  propertyType: PropertyType;
  isAvailable: boolean;
  isFeatured: boolean;
  hasSeaView: boolean;
  hasPoolView: boolean;
  hasGardenView: boolean;
  hasMountainView: boolean;
  hasCityView: boolean;
  rulesCancellation: LocalizedText;
  notes: LocalizedText;
  listingDetails: LocalizedRentalListingDetails;
  propertyCategoryItemIds: number[];
  infoAreaPlaces: RentalRelationAreaPlacePayload[];
}

export interface LocalizedRentalDetails {
  id: number;
  code: string;
  name: LocalizedText;
  description: LocalizedText;
  rulesCancellation: LocalizedText;
  rentalLocationId: number;
  floor: LocalizedText;
  bedroomNo: number;
  bathroomNo: number;
  capacity: number;
  size: number;
  priceUSD: number;
  propertyType: PropertyType;
  isAvailable: boolean;
  isFeatured: boolean;
  hasSeaView: boolean;
  hasPoolView: boolean;
  hasGardenView: boolean;
  hasMountainView: boolean;
  hasCityView: boolean;
  notes: LocalizedText;
  listingDetails: LocalizedRentalListingDetails;
  propertyCategoryItemIds: number[];
  infoAreaPlaces: RentalRelationAreaPlacePayload[];
  images: RentalImageItem[];
}

export function normalizePropertyType(
  type: PropertyType | string | number | undefined | null
): PropertyType {
  if (type === undefined || type === null) return PropertyType.Apartment;
  if (typeof type === "number") {
    return type in PropertyType ? (type as PropertyType) : PropertyType.Apartment;
  }
  const lower = String(type).toLowerCase().replace(/\s+/g, "");
  switch (lower) {
    case "apartment":
      return PropertyType.Apartment;
    case "villa":
      return PropertyType.Villa;
    case "townhouse":
      return PropertyType.Townhouse;
    case "studio":
      return PropertyType.Studio;
    case "penthouse":
      return PropertyType.Penthouse;
    case "onebedroom":
      return PropertyType.OneBedroom;
    case "twobedroom":
      return PropertyType.TwoBedroom;
    case "threebedroom":
      return PropertyType.ThreeBedroom;
    case "chalet":
      return PropertyType.Chalet;
    case "fourbedroom":
      return PropertyType.FourBedroom;
    case "studiocompact":
      return PropertyType.StudioCompact;
    default: {
      const parsed = parseInt(String(type), 10);
      return !isNaN(parsed) && parsed in PropertyType
        ? (parsed as PropertyType)
        : PropertyType.Apartment;
    }
  }
}

