export interface PropertyCategoryDetailItem {
  id: number;
  name: string;
  icon: string | null;
  displayOrder: number;
  propertyCategoryId: number;
  propertyCategoryName?: string | null;
}

export interface PaginatedPropertyCategoryItemsData {
  items: PropertyCategoryDetailItem[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PropertyCategoryItemsQueryParams {
  Language?: string;
  PropertyCategoryId?: number;
  PageNumber?: number;
  PageSize?: number;
}

export interface CreatePropertyCategoryItemRequestDto {
  propertyCategoryId: number;
  name: {
    en: string;
    ar: string;
    de: string;
  };
  icon?: string;
  displayOrder: number;
}

export interface UpdatePropertyCategoryItemRequestDto {
  id: number;
  propertyCategoryId: number;
  name: {
    en: string;
    ar: string;
    de: string;
  };
  icon?: string;
  displayOrder: number;
}

export interface LocalizedPropertyCategoryItemData {
  id: number;
  propertyCategoryId: number;
  icon: string;
  displayOrder: number;
  name: {
    en: string;
    ar: string;
    de: string;
  };
}

