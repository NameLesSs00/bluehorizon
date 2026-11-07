export interface ProjectTypeItem {
  id: number;
  name: string;
  icon: string | null;
}

export interface PaginatedProjectTypesData {
  items: ProjectTypeItem[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ProjectTypesQueryParams {
  Language?: string;
  SearchTerm?: string;
  SortBy?: string;
  SortDirection?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface CreateProjectTypeRequestDto {
  name: {
    en: string;
    ar: string;
    de: string;
  };
  icon: string;
}

export interface UpdateProjectTypeRequestDto {
  id: number;
  name: {
    en: string;
    ar: string;
    de: string;
  };
  icon: string;
}

export interface LocalizedProjectTypeData {
  id: number;
  icon: string;
  name: {
    en: string;
    ar: string;
    de: string;
  };
}

