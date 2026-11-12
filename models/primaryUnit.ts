import { LocalizedText } from "./faq";
import { PropertyType, PROPERTY_TYPE_LABELS } from "./resale";

export { PropertyType, PROPERTY_TYPE_LABELS };

export interface PrimaryUnitPrice {
  id: number;
  currency: string;
  price: number;
}

export interface PrimaryUnitImageItem {
  id: number;
  imageUrl: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface PrimaryUnitServiceItem {
  id: number;
  name: string;
  icon?: string;
}

export interface PrimaryUnitReviewItem {
  id: number;
  fullName: string;
  comment: string;
  rate: number;
  createdAt: string;
}

export interface PrimaryUnitItem {
  id: number;
  markerId: string;
  name: string;
  description: string;
  area: number;
  noBathRoom: number;
  noBedRoom: number;
  noKitchen: number;
  propertyType: string | PropertyType;
  floorNumber: number;
  view: string;
  floorName: string;
  isFeatured: boolean;
  isActive: boolean;
  projectId?: number;
  projectName?: string;
  prices: PrimaryUnitPrice[];
  images: PrimaryUnitImageItem[];
  services: PrimaryUnitServiceItem[];
  reviews?: PrimaryUnitReviewItem[];
  createdBy?: string | null;
  createdAt?: string;
  updatedBy?: string | null;
  updatedAt?: string | null;
}

export interface PaginatedPrimaryUnitsData {
  items: PrimaryUnitItem[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PrimaryUnitsQueryParams {
  Language?: string;
  Currency?: string;
  SearchTerm?: string;
  Search?: string;
  ProjectId?: number;
  PropertyType?: string | number;
  MinPrice?: number;
  MaxPrice?: number;
  IsFeatured?: boolean;
  IsActive?: boolean;
  SortBy?: string;
  SortDirection?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface PrimaryUnitFormPayload {
  projectId?: number;
  name: LocalizedText;
  description: LocalizedText;
  view: LocalizedText;
  floorName: LocalizedText;
  area: number;
  noBathRoom: number;
  noBedRoom: number;
  noKitchen: number;
  propertyType: PropertyType;
  floorNumber: number;
  isFeatured: boolean;
  priceUSD: number;
  serviceIds: number[];
}

export interface LocalizedPrimaryUnitDetails {
  id: number;
  projectId?: number;
  markerId?: string;
  name: LocalizedText;
  description: LocalizedText;
  view: LocalizedText;
  floorName: LocalizedText;
  area: number;
  noBathRoom: number;
  noBedRoom: number;
  noKitchen: number;
  propertyType: PropertyType;
  floorNumber: number;
  isFeatured: boolean;
  isActive: boolean;
  priceUSD: number;
  serviceIds: number[];
  images: PrimaryUnitImageItem[];
}

