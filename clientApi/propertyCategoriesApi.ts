import { apiClient, ApiResponse } from "./apiConfig";
import {
  CreatePropertyCategoryRequestDto,
  LocalizedPropertyCategoryData,
  PaginatedPropertyCategoriesData,
  PropertyCategoriesQueryParams,
  PropertyCategoryItem,
  UpdatePropertyCategoryRequestDto,
} from "@/models/propertyCategory";

export async function getPropertyCategories(
  params?: PropertyCategoriesQueryParams
): Promise<PaginatedPropertyCategoriesData> {
  const language = params?.Language || "en";
  const response = await apiClient.get<ApiResponse<PaginatedPropertyCategoriesData>>(
    "/api/property-categories",
    {
      params,
      headers: {
        "Accept-Language": language,
      },
    }
  );
  return response.data.data;
}

export async function getPropertyCategoryById(
  id: number,
  language?: string
): Promise<PropertyCategoryItem> {
  const targetLang = language || "en";
  const response = await apiClient.get<ApiResponse<PropertyCategoryItem>>(
    `/api/property-categories/${id}`,
    {
      params: language ? { Language: language } : undefined,
      headers: {
        "Accept-Language": targetLang,
      },
    }
  );
  return response.data.data;
}

export async function getFullLocalizedPropertyCategory(
  id: number
): Promise<LocalizedPropertyCategoryData> {
  const [enRes, arRes, deRes] = await Promise.allSettled([
    getPropertyCategoryById(id, "en"),
    getPropertyCategoryById(id, "ar"),
    getPropertyCategoryById(id, "de"),
  ]);

  const enItem = enRes.status === "fulfilled" ? enRes.value : null;
  const arItem = arRes.status === "fulfilled" ? arRes.value : null;
  const deItem = deRes.status === "fulfilled" ? deRes.value : null;

  const resolvedIcon =
    enItem?.icon || arItem?.icon || deItem?.icon || "";
  const resolvedDisplayOrder =
    enItem?.displayOrder ?? arItem?.displayOrder ?? deItem?.displayOrder ?? 1;

  return {
    id,
    icon: resolvedIcon,
    displayOrder: resolvedDisplayOrder,
    name: {
      en: enItem?.name ?? "",
      ar: arItem?.name ?? enItem?.name ?? "",
      de: deItem?.name ?? enItem?.name ?? "",
    },
  };
}

export async function createPropertyCategory(
  payload: CreatePropertyCategoryRequestDto
): Promise<number> {
  const response = await apiClient.post<ApiResponse<number>>(
    "/api/property-categories",
    payload
  );
  return response.data.data;
}

export async function updatePropertyCategory(
  id: number,
  payload: UpdatePropertyCategoryRequestDto
): Promise<boolean> {
  const response = await apiClient.put<ApiResponse<boolean>>(
    `/api/property-categories/${id}`,
    payload
  );
  return response.data.data;
}

export async function deletePropertyCategory(id: number): Promise<boolean> {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    `/api/property-categories/${id}`
  );
  return response.data.data;
}

