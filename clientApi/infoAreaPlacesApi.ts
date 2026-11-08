import { apiClient, ApiResponse } from "./apiConfig";
import {
  CreateInfoAreaPlaceRequestDto,
  InfoAreaPlaceDetailItem,
  InfoAreaPlacesQueryParams,
  LocalizedInfoAreaPlaceData,
  PaginatedInfoAreaPlacesData,
  UpdateInfoAreaPlaceRequestDto,
} from "@/models/infoAreaPlace";

export async function getInfoAreaPlaces(
  params?: InfoAreaPlacesQueryParams
): Promise<PaginatedInfoAreaPlacesData> {
  const language = params?.Language || "en";
  const response = await apiClient.get<ApiResponse<PaginatedInfoAreaPlacesData>>(
    "/api/info-area-places",
    {
      params,
      headers: {
        "Accept-Language": language,
      },
    }
  );
  return response.data.data;
}

export async function getInfoAreaPlaceById(
  id: number,
  language?: string
): Promise<InfoAreaPlaceDetailItem> {
  const targetLang = language || "en";
  const response = await apiClient.get<ApiResponse<InfoAreaPlaceDetailItem>>(
    `/api/info-area-places/${id}`,
    {
      params: language ? { Language: language } : undefined,
      headers: {
        "Accept-Language": targetLang,
      },
    }
  );
  return response.data.data;
}

export async function getFullLocalizedInfoAreaPlace(
  id: number
): Promise<LocalizedInfoAreaPlaceData> {
  // First fetch by id - Swagger returns { id, name, names: { en, ar, de } }
  try {
    const detail = await getInfoAreaPlaceById(id);
    if (detail.names && (detail.names.en || detail.names.ar || detail.names.de)) {
      return {
        id,
        name: {
          en: detail.names.en || detail.name || "",
          ar: detail.names.ar || "",
          de: detail.names.de || "",
        },
      };
    }
  } catch {
    // Fallback to parallel requests
  }

  const [enRes, arRes, deRes] = await Promise.allSettled([
    getInfoAreaPlaceById(id, "en"),
    getInfoAreaPlaceById(id, "ar"),
    getInfoAreaPlaceById(id, "de"),
  ]);

  const enItem = enRes.status === "fulfilled" ? enRes.value : null;
  const arItem = arRes.status === "fulfilled" ? arRes.value : null;
  const deItem = deRes.status === "fulfilled" ? deRes.value : null;

  return {
    id,
    name: {
      en: enItem?.name ?? "",
      ar: arItem?.name ?? enItem?.name ?? "",
      de: deItem?.name ?? enItem?.name ?? "",
    },
  };
}

export async function createInfoAreaPlace(
  payload: CreateInfoAreaPlaceRequestDto
): Promise<InfoAreaPlaceDetailItem> {
  const response = await apiClient.post<ApiResponse<InfoAreaPlaceDetailItem>>(
    "/api/info-area-places",
    payload
  );
  return response.data.data;
}

export async function updateInfoAreaPlace(
  id: number,
  payload: UpdateInfoAreaPlaceRequestDto
): Promise<InfoAreaPlaceDetailItem> {
  const response = await apiClient.put<ApiResponse<InfoAreaPlaceDetailItem>>(
    `/api/info-area-places/${id}`,
    payload
  );
  return response.data.data;
}

export async function deleteInfoAreaPlace(id: number): Promise<boolean> {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    `/api/info-area-places/${id}`
  );
  return response.data.data;
}

