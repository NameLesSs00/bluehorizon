import { apiClient, API_BASE_URL } from "./apiConfig";
import { ApiResponse } from "@/models/admin";
import {
  LocationImageItem,
  LocalizedProjectLocationDetails,
  PaginatedProjectLocationsData,
  ProjectLocationFormPayload,
  ProjectLocationItem,
  ProjectLocationsQueryParams,
} from "@/models/projectLocation";

export function getFullLocationMediaUrl(relativeOrAbsoluteUrl?: string | null): string {
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

export async function getProjectLocations(
  params?: ProjectLocationsQueryParams
): Promise<PaginatedProjectLocationsData> {
  const lang = params?.Language || "en";
  const response = await apiClient.get<ApiResponse<PaginatedProjectLocationsData>>(
    "/api/categories",
    {
      params: {
        Language: lang,
        PageNumber: params?.PageNumber || 1,
        PageSize: params?.PageSize || 10,
      },
      headers: {
        "Accept-Language": lang,
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

export async function getProjectLocationById(
  id: number,
  language: string = "en"
): Promise<ApiResponse<ProjectLocationItem>> {
  const response = await apiClient.get<ApiResponse<ProjectLocationItem>>(
    `/api/categories/${id}`,
    {
      params: { language },
      headers: { "Accept-Language": language },
    }
  );
  return response.data;
}

export async function getFullLocalizedProjectLocation(
  id: number
): Promise<LocalizedProjectLocationDetails> {
  const [enRes, arRes, deRes] = await Promise.allSettled([
    getProjectLocationById(id, "en"),
    getProjectLocationById(id, "ar"),
    getProjectLocationById(id, "de"),
  ]);

  const enItem = enRes.status === "fulfilled" ? enRes.value.data : null;
  const arItem = arRes.status === "fulfilled" ? arRes.value.data : null;
  const deItem = deRes.status === "fulfilled" ? deRes.value.data : null;

  return {
    id,
    name: {
      en: enItem?.name || "",
      ar: arItem?.name || "",
      de: deItem?.name || "",
    },
    description: {
      en: enItem?.description || "",
      ar: arItem?.description || "",
      de: deItem?.description || "",
    },
    videoUrl: enItem?.videoUrl || arItem?.videoUrl || deItem?.videoUrl || null,
    images: enItem?.images || arItem?.images || deItem?.images || [],
  };
}

export async function createProjectLocation(
  payload: ProjectLocationFormPayload
): Promise<ApiResponse<number>> {
  const formData = new FormData();
  formData.append("Name.En", payload.name.en || "");
  formData.append("Name.Ar", payload.name.ar || "");
  formData.append("Name.De", payload.name.de || "");
  formData.append("Description.En", payload.description.en || "");
  formData.append("Description.Ar", payload.description.ar || "");
  formData.append("Description.De", payload.description.de || "");

  const response = await apiClient.post<ApiResponse<number>>(
    "/api/categories",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

export async function updateProjectLocation(
  id: number,
  payload: ProjectLocationFormPayload
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.put<ApiResponse<boolean>>(
    `/api/categories/${id}`,
    {
      name: {
        en: payload.name.en,
        ar: payload.name.ar,
        de: payload.name.de,
      },
      description: {
        en: payload.description.en,
        ar: payload.description.ar,
        de: payload.description.de,
      },
    }
  );
  return response.data;
}

export async function deleteProjectLocation(
  id: number
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    `/api/categories/${id}`
  );
  return response.data;
}

export async function getProjectLocationImages(
  id: number
): Promise<LocationImageItem[]> {
  const response = await apiClient.get<ApiResponse<LocationImageItem[]>>(
    `/api/categories/${id}/images`
  );
  return response.data.data || [];
}

export async function uploadProjectLocationImages(
  id: number,
  files: File[]
): Promise<ApiResponse<boolean>> {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("images", file);
  });

  const response = await apiClient.put<ApiResponse<boolean>>(
    `/api/categories/${id}/images`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

export async function deleteProjectLocationImage(
  id: number,
  imageId: number
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    `/api/categories/${id}/images`,
    {
      params: { imageId },
    }
  );
  return response.data;
}

export async function replaceProjectLocationImage(
  locationId: number,
  imageId: number,
  file: File
): Promise<ApiResponse<LocationImageItem>> {
  const formData = new FormData();
  formData.append("image", file);

  const response = await apiClient.put<ApiResponse<LocationImageItem>>(
    `/api/categories/${locationId}/images/${imageId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

export async function setPrimaryProjectLocationImage(
  locationId: number,
  imageId: number
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.put<ApiResponse<boolean>>(
    `/api/categories/${locationId}/images/${imageId}/primary`,
    {
      isPrimary: true,
    }
  );
  return response.data;
}

export async function uploadProjectLocationVideo(
  id: number,
  file: File
): Promise<ApiResponse<boolean>> {
  const formData = new FormData();
  formData.append("video", file);

  const response = await apiClient.put<ApiResponse<boolean>>(
    `/api/categories/${id}/video`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

export async function deleteProjectLocationVideo(
  id: number
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    `/api/categories/${id}/video`
  );
  return response.data;
}

