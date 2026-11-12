import { apiClient, API_BASE_URL } from "./apiConfig";
import { ApiResponse } from "@/models/admin";
import {
  LocalizedResaleDetails,
  PaginatedResalesData,
  ResaleFormPayload,
  ResaleImageItem,
  ResaleItem,
  ResalesQueryParams,
} from "@/models/resale";

export function getFullResaleMediaUrl(
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

export async function getResales(
  params?: ResalesQueryParams
): Promise<PaginatedResalesData> {
  const lang = params?.Language || "en";
  const currency = params?.Currency || "USD";

  const response = await apiClient.get<ApiResponse<PaginatedResalesData>>(
    "/api/resales",
    {
      params: {
        Language: lang,
        Currency: currency,
        SearchTerm: params?.SearchTerm || undefined,
        Search: params?.Search || undefined,
        MinPrice: params?.MinPrice || undefined,
        MaxPrice: params?.MaxPrice || undefined,
        PropertyType: params?.PropertyType !== undefined && params?.PropertyType !== "" ? params.PropertyType : undefined,
        ProjectId: params?.ProjectId || undefined,
        IsFeatured: params?.IsFeatured !== undefined ? params.IsFeatured : undefined,
        IsActive: params?.IsActive !== undefined ? params.IsActive : undefined,
        SortBy: params?.SortBy || undefined,
        SortDirection: params?.SortDirection || undefined,
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

export async function getResaleById(
  id: number,
  language: string = "en",
  currency: string = "USD"
): Promise<ApiResponse<ResaleItem>> {
  const response = await apiClient.get<ApiResponse<ResaleItem>>(
    `/api/resales/${id}`,
    {
      params: { language, currency },
      headers: { "Accept-Language": language },
    }
  );
  return response.data;
}

export async function getFullLocalizedResale(
  id: number
): Promise<LocalizedResaleDetails> {
  const [enRes, arRes, deRes] = await Promise.allSettled([
    getResaleById(id, "en", "USD"),
    getResaleById(id, "ar", "USD"),
    getResaleById(id, "de", "USD"),
  ]);

  const enItem = enRes.status === "fulfilled" ? enRes.value.data : null;
  const arItem = arRes.status === "fulfilled" ? arRes.value.data : null;
  const deItem = deRes.status === "fulfilled" ? deRes.value.data : null;

  const baseItem = enItem || arItem || deItem;

  const priceUSD =
    baseItem?.prices?.find((p) => p.currency === "USD")?.price || 0;

  return {
    id,
    projectId: baseItem?.project?.id,
    markerId: baseItem?.markerId,
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
    view: {
      en: enItem?.view || "",
      ar: arItem?.view || "",
      de: deItem?.view || "",
    },
    floorName: {
      en: enItem?.floorName || "",
      ar: arItem?.floorName || "",
      de: deItem?.floorName || "",
    },
    propertyType: (typeof baseItem?.propertyType === "number"
      ? baseItem.propertyType
      : 0) as number,
    noBathRoom: baseItem?.noBathRoom || 0,
    noBedRoom: baseItem?.noBedRoom || 0,
    noKitchen: baseItem?.noKitchen || 0,
    floorNumber: baseItem?.floorNumber || 0,
    area: baseItem?.area || 0,
    isFeatured: baseItem?.isFeatured ?? false,
    isActive: baseItem?.isActive ?? true,
    serviceIds: baseItem?.services?.map((s) => s.id) || [],
    priceUSD,
    imageUrls: baseItem?.imageUrls || [],
  };
}

export async function createResale(
  payload: ResaleFormPayload
): Promise<ApiResponse<{ id: number; message?: string }>> {
  const response = await apiClient.post<ApiResponse<{ id: number; message?: string }>>(
    "/api/resales",
    payload
  );
  return response.data;
}

export async function updateResale(
  id: number,
  payload: ResaleFormPayload
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.put<ApiResponse<boolean>>(
    `/api/resales/${id}`,
    payload
  );
  return response.data;
}

export async function deleteResale(
  id: number
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    `/api/resales/${id}`
  );
  return response.data;
}

export async function getResaleImages(
  id: number
): Promise<ApiResponse<ResaleImageItem[]>> {
  const response = await apiClient.get<ApiResponse<ResaleImageItem[]>>(
    `/api/resales/${id}/images`
  );
  return response.data;
}

export async function uploadResaleImages(
  resaleId: number,
  files: File[]
): Promise<ApiResponse<string[]>> {
  const formData = new FormData();
  formData.append("ResaleId", resaleId.toString());
  files.forEach((file) => {
    formData.append("Images", file);
  });

  const response = await apiClient.post<ApiResponse<string[]>>(
    `/api/resales/${resaleId}/images`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

export async function deleteResaleImage(
  resaleId: number,
  imageId: number
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    `/api/resales/${resaleId}/images/${imageId}`
  );
  return response.data;
}

export async function setPrimaryResaleImage(
  imageId: number
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.put<ApiResponse<boolean>>(
    `/api/resales/images/${imageId}/primary`,
    {
      isPrimary: true,
    }
  );
  return response.data;
}

export async function updateResaleStatus(
  id: number,
  isActive: boolean
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.put<ApiResponse<boolean>>(
    `/api/resales/${id}/status`,
    { isActive }
  );
  return response.data;
}

export async function updateResaleFeatured(
  id: number,
  isFeatured: boolean
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.put<ApiResponse<boolean>>(
    `/api/resales/${id}/featured`,
    { isFeatured }
  );
  return response.data;
}

export async function removeResaleService(
  id: number,
  serviceId: number
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    `/api/resales/${id}/services/${serviceId}`
  );
  return response.data;
}

