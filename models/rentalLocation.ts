import { LocalizedText } from "./faq";

export interface RentalLocationImageItem {
  id: number;
  imageUrl: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface RentalLocationItem {
  id: number;
  name: string;
  description: string;
  videoUrl: string | null;
  images: RentalLocationImageItem[];
  propertiesCount?: number;
}

export interface PaginatedRentalLocationsData {
  items: RentalLocationItem[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface RentalLocationsQueryParams {
  Language?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface RentalLocationFormPayload {
  name: LocalizedText;
  description: LocalizedText;
}

export interface LocalizedRentalLocationDetails {
  id: number;
  name: LocalizedText;
  description: LocalizedText;
  videoUrl: string | null;
  images: RentalLocationImageItem[];
}

