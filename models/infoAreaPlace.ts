export interface InfoAreaPlaceItem {
  id: number;
  name: string;
}

export interface InfoAreaPlaceDetailItem {
  id: number;
  name: string;
  names?: {
    en: string;
    ar: string;
    de: string;
  };
}

export interface PaginatedInfoAreaPlacesData {
  items: InfoAreaPlaceItem[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface InfoAreaPlacesQueryParams {
  Language?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface CreateInfoAreaPlaceRequestDto {
  name: {
    en: string;
    ar: string;
    de: string;
  };
}

export interface UpdateInfoAreaPlaceRequestDto {
  id: number;
  name: {
    en: string;
    ar: string;
    de: string;
  };
}

export interface LocalizedInfoAreaPlaceData {
  id: number;
  name: {
    en: string;
    ar: string;
    de: string;
  };
}

