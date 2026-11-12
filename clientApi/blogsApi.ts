import { apiClient, API_BASE_URL } from "./apiConfig";
import { ApiResponse } from "@/models/admin";
import { LocalizedText } from "@/models/faq";
import {
  BlogItem,
  BlogsQueryParams,
  CreateBlogRequestDto,
  LocalizedBlogSectionInput,
  PaginatedBlogsData,
  UpdateBlogRequestDto,
} from "@/models/blog";

export function getFullImageUrl(relativeOrAbsoluteUrl?: string | null): string {
  if (!relativeOrAbsoluteUrl) return "";
  if (
    relativeOrAbsoluteUrl.startsWith("http://") ||
    relativeOrAbsoluteUrl.startsWith("https://")
  ) {
    return relativeOrAbsoluteUrl;
  }
  const cleanPath = relativeOrAbsoluteUrl.startsWith("/")
    ? relativeOrAbsoluteUrl
    : `/${relativeOrAbsoluteUrl}`;
  return `${API_BASE_URL}${cleanPath}`;
}

export async function getBlogs(
  params?: BlogsQueryParams
): Promise<PaginatedBlogsData> {
  const response = await apiClient.get<ApiResponse<PaginatedBlogsData>>(
    "/api/Blogs",
    {
      params: {
        Language: params?.Language || "en",
        PageNumber: params?.PageNumber || 1,
        PageSize: params?.PageSize || 10,
      },
    }
  );

  if (response.data && response.data.data) {
    return response.data.data;
  }

  return {
    items: [],
    pageNumber: 1,
    totalPages: 1,
    totalCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  };
}

export async function getBlogById(id: number): Promise<ApiResponse<BlogItem>> {
  const response = await apiClient.get<ApiResponse<BlogItem>>(
    `/api/Blogs/${id}`
  );
  return response.data;
}

export async function getFullLocalizedBlog(id: number): Promise<{
  id: number;
  title: LocalizedText;
  publishDate: string;
  blogType: LocalizedText;
  sections: LocalizedBlogSectionInput[];
}> {
  const [enRes, arRes, deRes] = await Promise.allSettled([
    getBlogs({ Language: "en", PageNumber: 1, PageSize: 50 }),
    getBlogs({ Language: "ar", PageNumber: 1, PageSize: 50 }),
    getBlogs({ Language: "de", PageNumber: 1, PageSize: 50 }),
  ]);

  const enBlog =
    enRes.status === "fulfilled"
      ? enRes.value.items.find((b) => b.id === id)
      : undefined;
  const arBlog =
    arRes.status === "fulfilled"
      ? arRes.value.items.find((b) => b.id === id)
      : undefined;
  const deBlog =
    deRes.status === "fulfilled"
      ? deRes.value.items.find((b) => b.id === id)
      : undefined;

  const maxSections = Math.max(
    enBlog?.sections.length || 0,
    arBlog?.sections.length || 0,
    deBlog?.sections.length || 0,
    1
  );

  const sections: LocalizedBlogSectionInput[] = [];

  for (let i = 0; i < maxSections; i++) {
    const sEn = enBlog?.sections[i];
    const sAr = arBlog?.sections[i];
    const sDe = deBlog?.sections[i];

    sections.push({
      sectionNumber: i + 1,
      tittle: {
        en: sEn?.tittle || "",
        ar: sAr?.tittle || "",
        de: sDe?.tittle || "",
      },
      content: {
        en: sEn?.content || "",
        ar: sAr?.content || "",
        de: sDe?.content || "",
      },
    });
  }

  const publishDate =
    enBlog?.publishDate ||
    arBlog?.publishDate ||
    deBlog?.publishDate ||
    new Date().toISOString();

  return {
    id,
    title: {
      en: enBlog?.title || "",
      ar: arBlog?.title || "",
      de: deBlog?.title || "",
    },
    publishDate,
    blogType: {
      en: enBlog?.blogType || "",
      ar: arBlog?.blogType || "",
      de: deBlog?.blogType || "",
    },
    sections,
  };
}

export async function createBlog(
  payload: CreateBlogRequestDto
): Promise<ApiResponse<number>> {
  const response = await apiClient.post<ApiResponse<number>>(
    "/api/Blogs",
    payload
  );
  return response.data;
}

export async function updateBlog(
  payload: UpdateBlogRequestDto
): Promise<ApiResponse<unknown>> {
  const response = await apiClient.put<ApiResponse<unknown>>(
    "/api/Blogs",
    payload
  );
  return response.data;
}

export async function deleteBlog(id: number): Promise<ApiResponse<unknown>> {
  const response = await apiClient.delete<ApiResponse<unknown>>(
    `/api/Blogs/${id}`
  );
  return response.data;
}

export async function uploadBlogImage(
  id: number,
  file: File
): Promise<ApiResponse<string>> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post<ApiResponse<string>>(
    `/api/Blogs/${id}/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

export async function deleteBlogImage(
  id: number
): Promise<ApiResponse<unknown>> {
  const response = await apiClient.delete<ApiResponse<unknown>>(
    `/api/Blogs/${id}/image`
  );
  return response.data;
}

export async function uploadBlogSectionImage(
  id: number,
  sectionId: number,
  file: File
): Promise<ApiResponse<string>> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post<ApiResponse<string>>(
    `/api/Blogs/${id}/sections/${sectionId}/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

export async function deleteBlogSectionImage(
  id: number,
  sectionId: number
): Promise<ApiResponse<unknown>> {
  const response = await apiClient.delete<ApiResponse<unknown>>(
    `/api/Blogs/${id}/sections/${sectionId}/image`
  );
  return response.data;
}

