import { LocalizedText } from "./faq";

export enum FurnitureTypeEnum {
  None = 0,
  Semi = 1,
  Fully = 2,
}

export type ProjectTierType = "TopSeller" | "Luxury" | "BigHit";

export const PROJECT_TIER_OPTIONS: { value: ProjectTierType; label: string }[] = [
  { value: "TopSeller", label: "Top Seller" },
  { value: "Luxury", label: "Luxury" },
  { value: "BigHit", label: "Big Hit" },
];

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

export interface ProjectImageItem {
  id?: number;
  imageUrl: string;
  isPrimary?: boolean;
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
  projectType?: ProjectTierType | string | null;
  isHotOffer?: boolean;
  startDateHotOffer?: string | null;
  endDateHotOffer?: string | null;
  prices: ProjectPriceDto[];
  projectTypes: ProjectTypeRef[];
  projectTypeIds: number[];
  imageUrls: string[];
  images?: ProjectImageItem[];
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
  ProjectType?: ProjectTierType | string;
  MinimumPrice?: number;
  MaximumPrice?: number;
  IsFurniture?: boolean;
  FurnitureType?: number;
  DeliveryDateFrom?: string;
  DeliveryDateTo?: string;
  IsFeature?: boolean;
  IsHotOffer?: boolean;
  StartDateHotOffer?: string;
  EndDateHotOffer?: string;
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
  projectType: ProjectTierType;
  isHotOffer?: boolean;
  startDateHotOffer?: string | null;
  endDateHotOffer?: string | null;
  projectTypeIds: number[];
  facilityIds: number[];
  minimumPriceUSD?: number;
  maximumPriceUSD?: number;
  prices?: ProjectPriceDto[];
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
  projectType: ProjectTierType | null;
  isHotOffer: boolean;
  startDateHotOffer: string | null;
  endDateHotOffer: string | null;
  projectTypeIds: number[];
  facilityIds: number[];
  prices: ProjectPriceDto[];
  imageUrls: string[];
  images?: ProjectImageItem[];
}
