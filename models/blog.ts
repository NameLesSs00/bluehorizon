import { LocalizedText } from "./faq";

export interface BlogSectionItem {
  id: number;
  sectionNumber: number;
  tittle: string;
  content: string;
  imageUrl: string;
}

export interface BlogItem {
  id: number;
  title: string;
  imageUrl: string;
  publishDate?: string;
  blogType?: string;
  sections: BlogSectionItem[];
}

export interface PaginatedBlogsData {
  items: BlogItem[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface BlogsQueryParams {
  Language?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface LocalizedBlogSectionInput {
  sectionNumber: number;
  tittle: LocalizedText;
  content: LocalizedText;
}

export interface CreateBlogRequestDto {
  title: LocalizedText;
  publishDate: string;
  blogType: LocalizedText;
  sections: LocalizedBlogSectionInput[];
}

export interface UpdateBlogRequestDto {
  id: number;
  title: LocalizedText;
  publishDate: string;
  blogType: LocalizedText;
  sections: LocalizedBlogSectionInput[];
}
