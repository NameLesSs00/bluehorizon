import { LocalizedText } from "./faq";

export interface LocationImageItem {
  id: number;
  imageUrl: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProjectLocationItem {
  id: number;
  name: string;
  description: string;
  videoUrl: string | null;
  images: LocationImageItem[];
  propertiesCount?: number;
}

export interface PaginatedProjectLocationsData {
  items: ProjectLocationItem[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ProjectLocationsQueryParams {
  Language?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface ProjectLocationFormPayload {
  name: LocalizedText;
  description: LocalizedText;
}

export interface LocalizedProjectLocationDetails {
  id: number;
  name: LocalizedText;
  description: LocalizedText;
  videoUrl: string | null;
  images: LocationImageItem[];
}

