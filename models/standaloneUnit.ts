import { LocalizedText } from "./faq";

export interface StandaloneUnitPrice {
  id: number;
  currency: string;
  price: number;
}

export interface StandaloneUnitImageItem {
  id: number;
  imageUrl: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface StandaloneUnitServiceItem {
  id: number;
  name: string;
  icon?: string;
}

export interface StandaloneUnitReviewItem {
  id: number;
  fullName: string;
  comment: string;
  rate: number;
  createdAt: string;
}

export interface StandaloneUnitItem {
  id: number;
  markerId?: string;
  name: string;
  description: string;
  price: number;
  currencyCode?: string;
  area: number;
  noBathRoom: number;
  noBedRoom: number;
  noKitchen: number;
  noFloor?: number;
  floorNumber?: number;
  floorName?: string;
  propertyType: string;
  view?: string;
  country: string;
  city: string;
  district: string;
  street: string;
  buildingNumber?: string;
  apartmentNumber?: string;
  postalCode?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  isFeatured: boolean;
  isActive: boolean;
  prices: StandaloneUnitPrice[];
  images: StandaloneUnitImageItem[];
  services: StandaloneUnitServiceItem[];
  serviceIds?: number[];
  reviews?: StandaloneUnitReviewItem[];
  createdBy?: string | null;
  createdAt?: string;
  updatedBy?: string | null;
  updatedAt?: string | null;
}

export interface PaginatedStandaloneUnitsData {
  items: StandaloneUnitItem[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface StandaloneUnitsQueryParams {
  Language?: string;
  Currency?: string;
  SearchTerm?: string;
  Search?: string;
  PropertyType?: string;
  MinPrice?: number;
  MaxPrice?: number;
  City?: string;
  Country?: string;
  NoFloor?: number;
  MinFloor?: number;
  MaxFloor?: number;
  IsActive?: boolean;
  FeatureId?: number;
  FeatureName?: string;
  SortBy?: string;
  SortDirection?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface StandaloneUnitFormPayload {
  name: LocalizedText;
  description: LocalizedText;
  view: LocalizedText;
  area: number;
  noBathRoom: number;
  noBedRoom: number;
  noKitchen: number;
  country: LocalizedText;
  city: LocalizedText;
  district: LocalizedText;
  street: LocalizedText;
  address: LocalizedText;
  buildingNumber: string;
  apartmentNumber: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  propertyType: string;
  floorNumber: number;
  floorName: LocalizedText;
  isFeatured: boolean;
  noFloor: number;
  priceUSD: number;
  serviceIds: number[];
}

export interface LocalizedStandaloneUnitDetails {
  id: number;
  name: LocalizedText;
  description: LocalizedText;
  view: LocalizedText;
  floorName: LocalizedText;
  country: LocalizedText;
  city: LocalizedText;
  district: LocalizedText;
  street: LocalizedText;
  address: LocalizedText;
  buildingNumber: string;
  apartmentNumber: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  area: number;
  noBathRoom: number;
  noBedRoom: number;
  noKitchen: number;
  noFloor: number;
  floorNumber: number;
  propertyType: string;
  isFeatured: boolean;
  priceUSD: number;
  serviceIds: number[];
}

