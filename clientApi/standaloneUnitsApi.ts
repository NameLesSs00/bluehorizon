import { apiClient, API_BASE_URL } from "./apiConfig";
import { ApiResponse } from "@/models/admin";
import {
  LocalizedStandaloneUnitDetails,
  PaginatedStandaloneUnitsData,
  StandaloneUnitFormPayload,
  StandaloneUnitImageItem,
  StandaloneUnitItem,
  StandaloneUnitsQueryParams,
} from "@/models/standaloneUnit";

export function getFullStandaloneUnitMediaUrl(
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

export async function getStandaloneUnits(
  params?: StandaloneUnitsQueryParams
): Promise<PaginatedStandaloneUnitsData> {
  const response = await apiClient.get<ApiResponse<PaginatedStandaloneUnitsData>>(
    "/api/unit-outsides",
    {
      params: {
        Language: params?.Language || "en",
        Currency: params?.Currency || "USD",
        PageNumber: params?.PageNumber || 1,
        PageSize: params?.PageSize || 10,
        SearchTerm: params?.SearchTerm,
        Search: params?.Search,
        PropertyType: params?.PropertyType,
        MinPrice: params?.MinPrice,
        MaxPrice: params?.MaxPrice,
        City: params?.City,
        Country: params?.Country,
        NoFloor: params?.NoFloor,
        MinFloor: params?.MinFloor,
        MaxFloor: params?.MaxFloor,
        IsActive: params?.IsActive,
        FeatureId: params?.FeatureId,
        FeatureName: params?.FeatureName,
        SortBy: params?.SortBy,
        SortDirection: params?.SortDirection,
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

export async function getStandaloneUnitById(
  id: number,
  language: string = "en",
  currency: string = "USD"
): Promise<ApiResponse<StandaloneUnitItem>> {
  const response = await apiClient.get<ApiResponse<StandaloneUnitItem>>(
    `/api/unit-outsides/${id}`,
    {
      params: { language, currency },
    }
  );
  return response.data;
}

export async function getFullLocalizedStandaloneUnit(
  id: number
): Promise<LocalizedStandaloneUnitDetails> {
  const [enRes, arRes, deRes] = await Promise.allSettled([
    getStandaloneUnitById(id, "en", "USD"),
    getStandaloneUnitById(id, "ar", "USD"),
    getStandaloneUnitById(id, "de", "USD"),
  ]);

  const enUnit = enRes.status === "fulfilled" ? enRes.value.data : null;
  const arUnit = arRes.status === "fulfilled" ? arRes.value.data : null;
  const deUnit = deRes.status === "fulfilled" ? deRes.value.data : null;

  const base = enUnit || arUnit || deUnit;
  if (!base) {
    throw new Error("Failed to fetch standalone property details");
  }

  const priceUSD =
    base.prices?.find((p) => p.currency.toUpperCase() === "USD")?.price ||
    base.price ||
    0;

  return {
    id: base.id,
    name: {
      en: enUnit?.name || "",
      ar: arUnit?.name || "",
      de: deUnit?.name || "",
    },
    description: {
      en: enUnit?.description || "",
      ar: arUnit?.description || "",
      de: deUnit?.description || "",
    },
    view: {
      en: enUnit?.view || "",
      ar: arUnit?.view || "",
      de: deUnit?.view || "",
    },
    floorName: {
      en: enUnit?.floorName || "",
      ar: arUnit?.floorName || "",
      de: deUnit?.floorName || "",
    },
    country: {
      en: enUnit?.country || "",
      ar: arUnit?.country || "",
      de: deUnit?.country || "",
    },
    city: {
      en: enUnit?.city || "",
      ar: arUnit?.city || "",
      de: deUnit?.city || "",
    },
    district: {
      en: enUnit?.district || "",
      ar: arUnit?.district || "",
      de: deUnit?.district || "",
    },
    street: {
      en: enUnit?.street || "",
      ar: arUnit?.street || "",
      de: deUnit?.street || "",
    },
    address: {
      en: enUnit?.address || "",
      ar: arUnit?.address || "",
      de: deUnit?.address || "",
    },
    buildingNumber: base.buildingNumber || "",
    apartmentNumber: base.apartmentNumber || "",
    postalCode: base.postalCode || "",
    latitude: base.latitude || 0,
    longitude: base.longitude || 0,
    area: base.area || 0,
    noBathRoom: base.noBathRoom || 0,
    noBedRoom: base.noBedRoom || 0,
    noKitchen: base.noKitchen || 0,
    noFloor: base.noFloor || 0,
    floorNumber: base.floorNumber || 0,
    propertyType: base.propertyType || "Villa",
    isFeatured: Boolean(base.isFeatured),
    priceUSD,
    serviceIds: base.serviceIds || base.services?.map((s) => s.id) || [],
  };
}

export async function createStandaloneUnit(
  payload: StandaloneUnitFormPayload
): Promise<ApiResponse<number>> {
  const response = await apiClient.post<ApiResponse<number>>(
    "/api/unit-outsides",
    payload
  );
  return response.data;
}

export async function updateStandaloneUnit(
  id: number,
  payload: StandaloneUnitFormPayload
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.put<ApiResponse<boolean>>(
    `/api/unit-outsides/${id}`,
    payload
  );
  return response.data;
}

export async function deleteStandaloneUnit(
  id: number
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    `/api/unit-outsides/${id}`
  );
  return response.data;
}

export async function getStandaloneUnitImages(
  id: number
): Promise<ApiResponse<StandaloneUnitImageItem[]>> {
  const response = await apiClient.get<ApiResponse<StandaloneUnitImageItem[]>>(
    `/api/unit-outsides/${id}/images`
  );
  return response.data;
}

export async function uploadStandaloneUnitImages(
  id: number,
  files: File[]
): Promise<ApiResponse<boolean>> {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("images", file);
  });

  const response = await apiClient.put<ApiResponse<boolean>>(
    `/api/unit-outsides/${id}/images`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

export async function deleteStandaloneUnitImage(
  id: number,
  imageId: number
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    `/api/unit-outsides/${id}/images`,
    {
      params: { imageId },
    }
  );
  return response.data;
}

export async function setPrimaryStandaloneUnitImage(
  unitId: number,
  imageId: number
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.put<ApiResponse<boolean>>(
    `/api/unit-outsides/${unitId}/images/${imageId}/primary`,
    { isPrimary: true }
  );
  return response.data;
}

export async function updateStandaloneUnitStatus(
  id: number,
  isActive: boolean
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.put<ApiResponse<boolean>>(
    `/api/unit-outsides/${id}/status`,
    { isActive }
  );
  return response.data;
}

export async function updateStandaloneUnitFeatured(
  id: number,
  isFeatured: boolean
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.put<ApiResponse<boolean>>(
    `/api/unit-outsides/${id}/featured`,
    { isFeatured }
  );
  return response.data;
}

