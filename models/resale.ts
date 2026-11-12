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

export interface ResalePrice {
  id: number;
  currency: string;
  price: number;
}

export interface ResaleImageItem {
  id: number;
  imageUrl: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ResaleProjectRef {
  id: number;
  name: string;
  description?: string;
}

export interface ResaleServiceItem {
  id: number;
  name: string;
  icon?: string;
}

export interface ResaleItem {
  id: number;
  markerId: string;
  name: string;
  description: string;
  area: number;
  noBathRoom: number;
  noBedRoom: number;
  noKitchen: number;
  floorName: string;
  floorNumber: number;
  view: string;
  propertyType: string | PropertyType;
  isFeatured: boolean;
  isActive: boolean;
  projectName?: string;
  project?: ResaleProjectRef | null;
  prices: ResalePrice[];
  imageUrls: string[];
  services: ResaleServiceItem[];
  createdBy?: string | null;
  createdAt?: string;
  updatedBy?: string | null;
  updatedAt?: string | null;
}

export interface PaginatedResalesData {
  items: ResaleItem[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ResalesQueryParams {
  Language?: string;
  Currency?: string;
  SearchTerm?: string;
  Search?: string;
  MinPrice?: number;
  MaxPrice?: number;
  PropertyType?: string | number;
  ProjectId?: number;
  IsFeatured?: boolean;
  IsActive?: boolean;
  SortBy?: string;
  SortDirection?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface ResaleFormPayload {
  projectId?: number;
  name: LocalizedText;
  description: LocalizedText;
  view: LocalizedText;
  floorName: LocalizedText;
  propertyType: PropertyType;
  noBathRoom: number;
  noBedRoom: number;
  noKitchen: number;
  floorNumber: number;
  area: number;
  isFeatured: boolean;
  serviceIds: number[];
  priceUSD: number;
}

export interface LocalizedResaleDetails {
  id: number;
  projectId?: number;
  markerId?: string;
  name: LocalizedText;
  description: LocalizedText;
  view: LocalizedText;
  floorName: LocalizedText;
  propertyType: PropertyType;
  noBathRoom: number;
  noBedRoom: number;
  noKitchen: number;
  floorNumber: number;
  area: number;
  isFeatured: boolean;
  isActive: boolean;
  serviceIds: number[];
  priceUSD: number;
  imageUrls: string[];
}

