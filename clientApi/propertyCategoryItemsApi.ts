import { apiClient, ApiResponse } from "./apiConfig";
import {
  CreatePropertyCategoryItemRequestDto,
  LocalizedPropertyCategoryItemData,
  PaginatedPropertyCategoryItemsData,
  PropertyCategoryDetailItem,
  PropertyCategoryItemsQueryParams,
  UpdatePropertyCategoryItemRequestDto,
} from "@/models/propertyCategoryItem";

export async function getPropertyCategoryItems(
  params?: PropertyCategoryItemsQueryParams
): Promise<PaginatedPropertyCategoryItemsData> {
  const language = params?.Language || "en";
  const response = await apiClient.get<ApiResponse<PaginatedPropertyCategoryItemsData>>(
    "/api/property-category-items",
    {
      params,
      headers: {
        "Accept-Language": language,
      },
    }
  );
  return response.data.data;
}

export async function getPropertyCategoryItemById(
  id: number,
  language?: string
): Promise<PropertyCategoryDetailItem> {
  const targetLang = language || "en";
  const response = await apiClient.get<ApiResponse<PropertyCategoryDetailItem>>(
    `/api/property-category-items/${id}`,
    {
      params: language ? { Language: language } : undefined,
      headers: {
        "Accept-Language": targetLang,
      },
    }
  );
  return response.data.data;
}

export async function getFullLocalizedPropertyCategoryItem(
  id: number
): Promise<LocalizedPropertyCategoryItemData> {
  const [enRes, arRes, deRes] = await Promise.allSettled([
    getPropertyCategoryItemById(id, "en"),
    getPropertyCategoryItemById(id, "ar"),
    getPropertyCategoryItemById(id, "de"),
  ]);

  const enItem = enRes.status === "fulfilled" ? enRes.value : null;
  const arItem = arRes.status === "fulfilled" ? arRes.value : null;
  const deItem = deRes.status === "fulfilled" ? deRes.value : null;

  const resolvedIcon =
    enItem?.icon || arItem?.icon || deItem?.icon || "";
  const resolvedCategoryId =
    enItem?.propertyCategoryId ?? arItem?.propertyCategoryId ?? deItem?.propertyCategoryId ?? 0;
  const resolvedDisplayOrder =
    enItem?.displayOrder ?? arItem?.displayOrder ?? deItem?.displayOrder ?? 1;

  return {
    id,
    propertyCategoryId: resolvedCategoryId,
    icon: resolvedIcon,
    displayOrder: resolvedDisplayOrder,
    name: {
      en: enItem?.name ?? "",
      ar: arItem?.name ?? enItem?.name ?? "",
      de: deItem?.name ?? enItem?.name ?? "",
    },
  };
}

export async function createPropertyCategoryItem(
  payload: CreatePropertyCategoryItemRequestDto
): Promise<PropertyCategoryDetailItem> {
  const response = await apiClient.post<ApiResponse<PropertyCategoryDetailItem>>(
    "/api/property-category-items",
    payload
  );
  return response.data.data;
}

export async function updatePropertyCategoryItem(
  id: number,
  payload: UpdatePropertyCategoryItemRequestDto
): Promise<boolean> {
  const response = await apiClient.put<ApiResponse<boolean>>(
    `/api/property-category-items/${id}`,
    payload
  );
  return response.data.data;
}

export async function deletePropertyCategoryItem(
  id: number
): Promise<boolean> {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    `/api/property-category-items/${id}`
  );
  return response.data.data;
}

