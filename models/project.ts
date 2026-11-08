import { LocalizedText } from "./faq";

export enum FurnitureTypeEnum {
  None = 0,
  Semi = 1,
  Fully = 2,
}

export type ProjectCurrency = "USD" | "EUR" | "GBP" | "EGP";

export const SUPPORTED_PROJECT_CURRENCIES: ProjectCurrency[] = [
  "USD",
  "EUR",
  "GBP",
  "EGP",
];

export interface ProjectPriceDto {
  id?: number;
  currency: string;
  minimumPrice: number;
  maximumPrice: number;
}

export interface ProjectTypeRef {
  id: number;
  name: string;
  icon: string;
}

export interface ProjectFacilityRef {
  id: number;
  name: string;
  icon: string;
}

export interface ProjectItem {
  id: number;
  name: string;
  description: string;
  locationId: number | null;
  locationName: string | null;
  deliveryDate: string | null;
  isFurniture: boolean;
  furnitureType: string | number;
  isFeature: boolean;
  prices: ProjectPriceDto[];
  projectTypes: ProjectTypeRef[];
  projectTypeIds: number[];
  imageUrls: string[];
  facilities: ProjectFacilityRef[];
  createdBy: string | null;
  createdAt: string;
  updatedBy: string | null;
  updatedAt: string | null;
}

export interface PaginatedProjectsData {
  items: ProjectItem[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ProjectsQueryParams {
  Language?: string;
  Currency?: string;
  ProjectTypeId?: number;
  MinimumPrice?: number;
  MaximumPrice?: number;
  IsFurniture?: boolean;
  FurnitureType?: number;
  DeliveryDateFrom?: string;
  DeliveryDateTo?: string;
  IsFeature?: boolean;
  FeatureId?: number;
  FacilityId?: number;
  LocationId?: number;
  SearchTerm?: string;
  Search?: string;
  SortBy?: string;
  SortDirection?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface CreateProjectRequestDto {
  name: LocalizedText;
  description: LocalizedText;
  locationId: number | null;
  deliveryDate: string | null;
  isFurniture: boolean;
  furnitureType: number;
  isFeature: boolean;
  projectTypeIds: number[];
  facilityIds: number[];
  prices: ProjectPriceDto[];
}

export interface UpdateProjectRequestDto extends CreateProjectRequestDto {
  id: number;
}

export interface LocalizedProjectDetails {
  id: number;
  name: LocalizedText;
  description: LocalizedText;
  locationId: number | null;
  deliveryDate: string | null;
  isFurniture: boolean;
  furnitureType: number;
  isFeature: boolean;
  projectTypeIds: number[];
  facilityIds: number[];
  prices: ProjectPriceDto[];
  imageUrls: string[];
}

