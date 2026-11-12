import { apiClient, API_BASE_URL } from "./apiConfig";
import { ApiResponse } from "@/models/admin";
import {
  LocalizedRentalLocationDetails,
  PaginatedRentalLocationsData,
  RentalLocationFormPayload,
  RentalLocationImageItem,
  RentalLocationItem,
  RentalLocationsQueryParams,
} from "@/models/rentalLocation";

export function getFullRentalLocationMediaUrl(
  relativeOrAbsoluteUrl?: string | null
): string {
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

export async function getRentalLocations(
  params?: RentalLocationsQueryParams
): Promise<PaginatedRentalLocationsData> {
  const lang = params?.Language || "en";
  const response = await apiClient.get<ApiResponse<PaginatedRentalLocationsData>>(
    "/api/rentallocations",
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

export async function getRentalLocationById(
  id: number,
  language: string = "en"
): Promise<ApiResponse<RentalLocationItem>> {
  const response = await apiClient.get<ApiResponse<RentalLocationItem>>(
    `/api/rentallocations/${id}`,
    {
      params: { language },
      headers: { "Accept-Language": language },
    }
  );
  return response.data;
}

export async function getFullLocalizedRentalLocation(
  id: number
): Promise<LocalizedRentalLocationDetails> {
  const [enRes, arRes, deRes] = await Promise.allSettled([
    getRentalLocationById(id, "en"),
    getRentalLocationById(id, "ar"),
    getRentalLocationById(id, "de"),
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

export async function createRentalLocation(
  payload: RentalLocationFormPayload
): Promise<ApiResponse<number>> {
  const formData = new FormData();
  formData.append("Name.En", payload.name.en || "");
  formData.append("Name.Ar", payload.name.ar || "");
  formData.append("Name.De", payload.name.de || "");
  formData.append("Description.En", payload.description.en || "");
  formData.append("Description.Ar", payload.description.ar || "");
  formData.append("Description.De", payload.description.de || "");

  const response = await apiClient.post<ApiResponse<number>>(
    "/api/rentallocations",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

export async function updateRentalLocation(
  id: number,
  payload: RentalLocationFormPayload
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.put<ApiResponse<boolean>>(
    `/api/rentallocations/${id}`,
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

export async function deleteRentalLocation(
  id: number
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    `/api/rentallocations/${id}`
  );
  return response.data;
}

export async function getRentalLocationImages(
  id: number
): Promise<RentalLocationImageItem[]> {
  const response = await apiClient.get<ApiResponse<RentalLocationImageItem[]>>(
    `/api/rentallocations/${id}/images`
  );
  return response.data.data || [];
}

export async function uploadRentalLocationImages(
  id: number,
  files: File[]
): Promise<ApiResponse<boolean>> {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("images", file);
  });

  const response = await apiClient.put<ApiResponse<boolean>>(
    `/api/rentallocations/${id}/images`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

export async function deleteRentalLocationImage(
  id: number,
  imageId: number
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    `/api/rentallocations/${id}/images`,
    {
      params: { imageId },
    }
  );
  return response.data;
}

export async function setPrimaryRentalLocationImage(
  rentalLocationId: number,
  imageId: number
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.put<ApiResponse<boolean>>(
    `/api/rentallocations/${rentalLocationId}/images/${imageId}/primary`,
    {
      isPrimary: true,
    }
  );
  return response.data;
}

export async function uploadRentalLocationVideo(
  id: number,
  file: File
): Promise<ApiResponse<boolean>> {
  const formData = new FormData();
  formData.append("video", file);

  const response = await apiClient.put<ApiResponse<boolean>>(
    `/api/rentallocations/${id}/video`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

export async function deleteRentalLocationVideo(
  id: number
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    `/api/rentallocations/${id}/video`
  );
  return response.data;
}

