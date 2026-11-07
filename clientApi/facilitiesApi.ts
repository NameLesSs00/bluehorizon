import { apiClient, ApiResponse } from "./apiConfig";
import {
  CreateFacilityRequestDto,
  FacilityItem,
  LocalizedFacilityData,
  UpdateFacilityRequestDto,
} from "@/models/facility";

export async function getFacilities(
  language?: string
): Promise<FacilityItem[]> {
  const response = await apiClient.get<ApiResponse<FacilityItem[]>>(
    "/api/Facilities",
    { params: language ? { language } : undefined }
  );
  return response.data.data;
}

export async function getFacilityById(
  id: number,
  language?: string
): Promise<FacilityItem> {
  const response = await apiClient.get<ApiResponse<FacilityItem>>(
    `/api/Facilities/${id}`,
    { params: language ? { language } : undefined }
  );
  return response.data.data;
}

export async function getFullLocalizedFacility(
  id: number
): Promise<LocalizedFacilityData> {
  // Built to query language parameter so it works as soon as backend team activates it
  const [enRes, arRes, deRes] = await Promise.allSettled([
    getFacilityById(id, "en"),
    getFacilityById(id, "ar"),
    getFacilityById(id, "de"),
  ]);

  const enItem = enRes.status === "fulfilled" ? enRes.value : null;
  const arItem = arRes.status === "fulfilled" ? arRes.value : null;
  const deItem = deRes.status === "fulfilled" ? deRes.value : null;

  const resolvedIcon =
    enItem?.icon || arItem?.icon || deItem?.icon || "";

  return {
    id,
    icon: resolvedIcon,
    name: {
      en: enItem?.name ?? "",
      ar: arItem?.name ?? enItem?.name ?? "",
      de: deItem?.name ?? enItem?.name ?? "",
    },
  };
}

export async function createFacility(
  payload: CreateFacilityRequestDto
): Promise<number> {
  const response = await apiClient.post<ApiResponse<number>>(
    "/api/Facilities",
    payload
  );
  return response.data.data;
}

export async function updateFacility(
  payload: UpdateFacilityRequestDto
): Promise<number> {
  const response = await apiClient.put<ApiResponse<number>>(
    "/api/Facilities",
    payload
  );
  return response.data.data;
}

export async function deleteFacility(id: number): Promise<boolean> {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    `/api/Facilities/${id}`
  );
  return response.data.data;
}

