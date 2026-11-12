import { apiClient, API_BASE_URL } from "./apiConfig";
import { ApiResponse } from "@/models/admin";
import {
  LocalizedPrimaryUnitDetails,
  PaginatedPrimaryUnitsData,
  PrimaryUnitFormPayload,
  PrimaryUnitImageItem,
  PrimaryUnitItem,
  PrimaryUnitsQueryParams,
  PropertyType,
} from "@/models/primaryUnit";

export function getFullPrimaryUnitMediaUrl(
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

export async function getPrimaryUnits(
  params?: PrimaryUnitsQueryParams
): Promise<PaginatedPrimaryUnitsData> {
  const lang = params?.Language || "en";
  const currency = params?.Currency || "USD";

  const response = await apiClient.get<ApiResponse<PaginatedPrimaryUnitsData>>(
    "/api/primary-units",
    {
      params: {
        Language: lang,
        Currency: currency,
        SearchTerm: params?.SearchTerm || undefined,
        Search: params?.Search || undefined,
        ProjectId: params?.ProjectId || undefined,
        PropertyType:
          params?.PropertyType !== undefined && params?.PropertyType !== ""
            ? params.PropertyType
            : undefined,
        MinPrice: params?.MinPrice || undefined,
        MaxPrice: params?.MaxPrice || undefined,
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

export async function getPrimaryUnitById(
  id: number,
  language: string = "en",
  currency: string = "USD"
): Promise<ApiResponse<PrimaryUnitItem>> {
  const response = await apiClient.get<ApiResponse<PrimaryUnitItem>>(
    `/api/primary-units/${id}`,
    {
      params: { language, currency },
      headers: { "Accept-Language": language },
    }
  );
  return response.data;
}

export async function getFullLocalizedPrimaryUnit(
  id: number
): Promise<LocalizedPrimaryUnitDetails> {
  const [enRes, arRes, deRes] = await Promise.allSettled([
    getPrimaryUnitById(id, "en", "USD"),
    getPrimaryUnitById(id, "ar", "USD"),
    getPrimaryUnitById(id, "de", "USD"),
  ]);

  const enItem = enRes.status === "fulfilled" ? enRes.value.data : null;
  const arItem = arRes.status === "fulfilled" ? arRes.value.data : null;
  const deItem = deRes.status === "fulfilled" ? deRes.value.data : null;

  const baseItem = enItem || arItem || deItem;

  const priceUSD =
    baseItem?.prices?.find((p) => p.currency === "USD")?.price || 0;

  return {
    id,
    projectId: baseItem?.projectId,
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
    area: baseItem?.area || 0,
    noBathRoom: baseItem?.noBathRoom || 0,
    noBedRoom: baseItem?.noBedRoom || 0,
    noKitchen: baseItem?.noKitchen || 0,
    propertyType: (typeof baseItem?.propertyType === "number"
      ? baseItem.propertyType
      : PropertyType.Apartment) as PropertyType,
    floorNumber: baseItem?.floorNumber || 0,
    isFeatured: baseItem?.isFeatured ?? false,
    isActive: baseItem?.isActive ?? true,
    priceUSD,
    serviceIds: baseItem?.services?.map((s) => s.id) || [],
    images: baseItem?.images || [],
  };
}

export async function createPrimaryUnit(
  payload: PrimaryUnitFormPayload
): Promise<ApiResponse<{ id: number; message?: string }>> {
  const response = await apiClient.post<ApiResponse<{ id: number; message?: string }>>(
    "/api/primary-units",
    payload
  );
  return response.data;
}

export async function updatePrimaryUnit(
  id: number,
  payload: PrimaryUnitFormPayload
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.put<ApiResponse<boolean>>(
    `/api/primary-units/${id}`,
    payload
  );
  return response.data;
}

export async function deletePrimaryUnit(
  id: number
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    `/api/primary-units/${id}`
  );
  return response.data;
}

export async function getPrimaryUnitImages(
  id: number
): Promise<ApiResponse<PrimaryUnitImageItem[]>> {
  const response = await apiClient.get<ApiResponse<PrimaryUnitImageItem[]>>(
    `/api/primary-units/${id}/images`
  );
  return response.data;
}

export async function uploadPrimaryUnitImages(
  primaryUnitId: number,
  files: File[]
): Promise<ApiResponse<string[]>> {
  const formData = new FormData();
  formData.append("PrimaryUnitId", primaryUnitId.toString());
  files.forEach((file) => {
    formData.append("Images", file);
  });

  const response = await apiClient.post<ApiResponse<string[]>>(
    `/api/primary-units/${primaryUnitId}/images`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

export async function deletePrimaryUnitImage(
  unitId: number,
  imageId: number
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    `/api/primary-units/${unitId}/images/${imageId}`
  );
  return response.data;
}

export async function setPrimaryUnitImage(
  imageId: number
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.put<ApiResponse<boolean>>(
    `/api/primary-units/images/${imageId}/primary`,
    {
      isPrimary: true,
    }
  );
  return response.data;
}

export async function updatePrimaryUnitStatus(
  id: number,
  isActive: boolean
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.put<ApiResponse<boolean>>(
    `/api/primary-units/${id}/status`,
    { isActive }
  );
  return response.data;
}

export async function updatePrimaryUnitFeatured(
  id: number,
  isFeatured: boolean
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.put<ApiResponse<boolean>>(
    `/api/primary-units/${id}/featured`,
    { isFeatured }
  );
  return response.data;
}

export async function removePrimaryUnitService(
  id: number,
  serviceId: number
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    `/api/primary-units/${id}/services/${serviceId}`
  );
  return response.data;
}

