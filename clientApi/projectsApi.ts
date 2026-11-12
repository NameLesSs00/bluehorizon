import { apiClient, API_BASE_URL } from "./apiConfig";
import { ApiResponse } from "@/models/admin";
import {
  CreateProjectRequestDto,
  FurnitureTypeEnum,
  LocalizedProjectDetails,
  PaginatedProjectsData,
  ProjectItem,
  ProjectPriceDto,
  ProjectsQueryParams,
  SUPPORTED_PROJECT_CURRENCIES,
  UpdateProjectRequestDto,
} from "@/models/project";

export function getFullProjectImageUrl(relativeOrAbsoluteUrl?: string | null): string {
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

export function parseFurnitureTypeToEnum(
  val: string | number | undefined | null
): FurnitureTypeEnum {
  if (typeof val === "number") {
    if (val === 1) return FurnitureTypeEnum.Semi;
    if (val === 2) return FurnitureTypeEnum.Fully;
    return FurnitureTypeEnum.None;
  }
  if (typeof val === "string") {
    const lower = val.toLowerCase().trim();
    if (lower === "semi" || lower === "1") return FurnitureTypeEnum.Semi;
    if (lower === "fully" || lower === "2") return FurnitureTypeEnum.Fully;
  }
  return FurnitureTypeEnum.None;
}

export function normalizeProjectItem(item: ProjectItem): ProjectItem {
  const images =
    item.images && item.images.length > 0
      ? item.images
      : (item.imageUrls || []).map((url, i) => ({
          id: i,
          imageUrl: url,
          isPrimary: i === 0,
        }));

  const imageUrls =
    item.imageUrls && item.imageUrls.length > 0
      ? item.imageUrls
      : images.map((img) => img.imageUrl);

  return {
    ...item,
    images,
    imageUrls,
  };
}

export async function getProjects(
  params?: ProjectsQueryParams
): Promise<PaginatedProjectsData> {
  const lang = params?.Language || "en";
  const response = await apiClient.get<ApiResponse<PaginatedProjectsData>>(
    "/api/Projects",
    {
      params: {
        Language: lang,
        Currency: params?.Currency || "USD",
        PageNumber: params?.PageNumber || 1,
        PageSize: params?.PageSize || 10,
        ...(params?.ProjectTypeId && { ProjectTypeId: params.ProjectTypeId }),
        ...(params?.MinimumPrice !== undefined && { MinimumPrice: params.MinimumPrice }),
        ...(params?.MaximumPrice !== undefined && { MaximumPrice: params.MaximumPrice }),
        ...(params?.IsFurniture !== undefined && { IsFurniture: params.IsFurniture }),
        ...(params?.FurnitureType !== undefined && { FurnitureType: params.FurnitureType }),
        ...(params?.IsFeature !== undefined && { IsFeature: params.IsFeature }),
        ...(params?.FacilityId && { FacilityId: params.FacilityId }),
        ...(params?.LocationId && { LocationId: params.LocationId }),
        ...(params?.SearchTerm && { SearchTerm: params.SearchTerm }),
        ...(params?.Search && { Search: params.Search }),
        ...(params?.SortBy && { SortBy: params.SortBy }),
        ...(params?.SortDirection && { SortDirection: params.SortDirection }),
      },
      headers: {
        "Accept-Language": lang,
      },
    }
  );

  if (response.data && response.data.data) {
    const data = response.data.data;
    return {
      ...data,
      items: (data.items || []).map(normalizeProjectItem),
    };
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

export async function getProjectById(
  id: number,
  language: string = "en",
  currency: string = "USD"
): Promise<ApiResponse<ProjectItem>> {
  const response = await apiClient.get<ApiResponse<ProjectItem>>(
    `/api/Projects/${id}`,
    {
      params: { language, currency },
      headers: { "Accept-Language": language },
    }
  );
  if (response.data && response.data.data) {
    response.data.data = normalizeProjectItem(response.data.data);
  }
  return response.data;
}

export async function getFullLocalizedProject(
  id: number
): Promise<LocalizedProjectDetails> {
  const [enRes, arRes, deRes, eurRes, gbpRes, egpRes] = await Promise.allSettled([
    getProjectById(id, "en", "USD"),
    getProjectById(id, "ar", "USD"),
    getProjectById(id, "de", "USD"),
    getProjectById(id, "en", "EUR"),
    getProjectById(id, "en", "GBP"),
    getProjectById(id, "en", "EGP"),
  ]);

  const enItem = enRes.status === "fulfilled" ? enRes.value.data : null;
  const arItem = arRes.status === "fulfilled" ? arRes.value.data : null;
  const deItem = deRes.status === "fulfilled" ? deRes.value.data : null;

  const baseItem = enItem || arItem || deItem;

  const priceMap: Record<string, ProjectPriceDto> = {
    USD: { currency: "USD", minimumPrice: 0, maximumPrice: 0 },
    EUR: { currency: "EUR", minimumPrice: 0, maximumPrice: 0 },
    GBP: { currency: "GBP", minimumPrice: 0, maximumPrice: 0 },
    EGP: { currency: "EGP", minimumPrice: 0, maximumPrice: 0 },
  };

  const fillPrices = (item: ProjectItem | null) => {
    if (!item?.prices) return;
    item.prices.forEach((p) => {
      const code = p.currency.toUpperCase();
      if (priceMap[code]) {
        priceMap[code] = {
          currency: code,
          minimumPrice: p.minimumPrice || 0,
          maximumPrice: p.maximumPrice || 0,
        };
      }
    });
  };

  fillPrices(enItem);
  if (eurRes.status === "fulfilled") fillPrices(eurRes.value.data);
  if (gbpRes.status === "fulfilled") fillPrices(gbpRes.value.data);
  if (egpRes.status === "fulfilled") fillPrices(egpRes.value.data);

  const finalPrices: ProjectPriceDto[] = SUPPORTED_PROJECT_CURRENCIES.map(
    (curr) => priceMap[curr]
  );

  const typeIds = baseItem?.projectTypes?.map((t) => t.id) || baseItem?.projectTypeIds || [];
  const facilityIds = baseItem?.facilities?.map((f) => f.id) || [];

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
    locationId: baseItem?.locationId ?? null,
    deliveryDate: baseItem?.deliveryDate ?? null,
    isFurniture: Boolean(baseItem?.isFurniture),
    furnitureType: parseFurnitureTypeToEnum(baseItem?.furnitureType),
    isFeature: Boolean(baseItem?.isFeature),
    projectTypeIds: typeIds,
    facilityIds,
    prices: finalPrices,
    imageUrls: baseItem?.imageUrls || [],
    images: baseItem?.images || [],
  };
}

export async function createProject(
  payload: CreateProjectRequestDto
): Promise<ApiResponse<number>> {
  const response = await apiClient.post<ApiResponse<number>>(
    "/api/Projects",
    payload
  );
  return response.data;
}

export async function updateProject(
  payload: UpdateProjectRequestDto
): Promise<ApiResponse<unknown>> {
  const response = await apiClient.put<ApiResponse<unknown>>(
    "/api/Projects",
    payload
  );
  return response.data;
}

export async function deleteProject(id: number): Promise<ApiResponse<boolean>> {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    `/api/Projects/${id}`
  );
  return response.data;
}

export async function uploadProjectImages(
  id: number,
  files: File[]
): Promise<ApiResponse<string[]>> {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await apiClient.post<ApiResponse<string[]>>(
    `/api/Projects/${id}/images`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

export async function deleteProjectImage(
  id: number,
  url: string
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    `/api/Projects/${id}/deleteproject/images`,
    {
      params: { url },
    }
  );
  return response.data;
}

export async function deleteProjectFacility(
  projectId: number,
  faciltyId: number
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    "/api/Projects/delete-project-facility",
    {
      data: {
        projectId,
        faciltyId,
      },
    }
  );
  return response.data;
}

