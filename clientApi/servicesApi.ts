import { apiClient, ApiResponse } from "./apiConfig";
import {
  CreateServiceRequestDto,
  LocalizedServiceData,
  PropertyServiceItem,
  UpdateServiceRequestDto,
} from "@/models/service";

export async function getServices(
  language?: string
): Promise<PropertyServiceItem[]> {
  const targetLang = language || "en";
  const response = await apiClient.get<ApiResponse<PropertyServiceItem[]>>(
    "/api/Services",
    {
      params: language ? { language } : undefined,
      headers: {
        "Accept-Language": targetLang,
      },
    }
  );
  return response.data.data;
}

export async function getServiceById(
  id: number,
  language?: string
): Promise<PropertyServiceItem> {
  const targetLang = language || "en";
  const response = await apiClient.get<ApiResponse<PropertyServiceItem>>(
    `/api/Services/${id}`,
    {
      params: language ? { language } : undefined,
      headers: {
        "Accept-Language": targetLang,
      },
    }
  );
  return response.data.data;
}

export async function getFullLocalizedService(
  id: number
): Promise<LocalizedServiceData> {
  const [enRes, arRes, deRes] = await Promise.allSettled([
    getServiceById(id, "en"),
    getServiceById(id, "ar"),
    getServiceById(id, "de"),
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

export async function createService(
  payload: CreateServiceRequestDto
): Promise<number> {
  const response = await apiClient.post<ApiResponse<number>>(
    "/api/Services",
    payload
  );
  return response.data.data;
}

export async function updateService(
  payload: UpdateServiceRequestDto
): Promise<number> {
  const response = await apiClient.put<ApiResponse<number>>(
    "/api/Services",
    payload
  );
  return response.data.data;
}

export async function deleteService(id: number): Promise<boolean> {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    `/api/Services/${id}`
  );
  return response.data.data;
}

