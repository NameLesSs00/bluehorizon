import { apiClient, ApiResponse } from "./apiConfig";
import {
  CreateProjectTypeRequestDto,
  LocalizedProjectTypeData,
  PaginatedProjectTypesData,
  ProjectTypeItem,
  ProjectTypesQueryParams,
  UpdateProjectTypeRequestDto,
} from "@/models/projectType";

export async function getProjectTypes(
  params?: ProjectTypesQueryParams
): Promise<PaginatedProjectTypesData> {
  const response = await apiClient.get<ApiResponse<PaginatedProjectTypesData>>(
    "/api/project-types",
    { params }
  );
  return response.data.data;
}

export async function getProjectTypeById(
  id: number,
  language?: string
): Promise<ProjectTypeItem> {
  const response = await apiClient.get<ApiResponse<ProjectTypeItem>>(
    `/api/project-types/${id}`,
    { params: language ? { Language: language } : undefined }
  );
  return response.data.data;
}

export async function getFullLocalizedProjectType(
  id: number
): Promise<LocalizedProjectTypeData> {
  const [enRes, arRes, deRes] = await Promise.allSettled([
    getProjectTypeById(id, "en"),
    getProjectTypeById(id, "ar"),
    getProjectTypeById(id, "de"),
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
      ar: arItem?.name ?? "",
      de: deItem?.name ?? "",
    },
  };
}

export async function createProjectType(
  payload: CreateProjectTypeRequestDto
): Promise<number> {
  const response = await apiClient.post<ApiResponse<number>>(
    "/api/project-types",
    payload
  );
  return response.data.data;
}

export async function updateProjectType(
  id: number,
  payload: UpdateProjectTypeRequestDto
): Promise<boolean> {
  const response = await apiClient.put<ApiResponse<boolean>>(
    `/api/project-types/${id}`,
    payload
  );
  return response.data.data;
}

export async function deleteProjectType(id: number): Promise<boolean> {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    `/api/project-types/${id}`
  );
  return response.data.data;
}

