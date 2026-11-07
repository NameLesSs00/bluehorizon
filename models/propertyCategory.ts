export interface PropertyCategoryItem {
  id: number;
  name: string;
  icon: string | null;
  displayOrder: number;
}

export interface PaginatedPropertyCategoriesData {
  items: PropertyCategoryItem[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PropertyCategoriesQueryParams {
  Language?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface CreatePropertyCategoryRequestDto {
  name: {
    en: string;
    ar: string;
    de: string;
  };
  icon?: string;
  displayOrder: number;
}

export interface UpdatePropertyCategoryRequestDto {
  id: number;
  name: {
    en: string;
    ar: string;
    de: string;
  };
  icon?: string;
  displayOrder: number;
}

export interface LocalizedPropertyCategoryData {
  id: number;
  icon: string;
  displayOrder: number;
  name: {
    en: string;
    ar: string;
    de: string;
  };
}

