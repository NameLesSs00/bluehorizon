import { apiClient } from "./apiConfig";
import { ApiResponse } from "@/models/admin";
import {
  CreateKeyValueRequestDto,
  KeyValueItem,
  UpdateKeyValueRequestDto,
} from "@/models/keyValue";

export async function getKeyValues(): Promise<KeyValueItem[]> {
  const response = await apiClient.get<ApiResponse<KeyValueItem[]>>(
    "/api/KeyValues"
  );

  if (response.data && Array.isArray(response.data.data)) {
    return response.data.data;
  }

  return [];
}

export async function createKeyValue(
  payload: CreateKeyValueRequestDto
): Promise<ApiResponse<KeyValueItem>> {
  const response = await apiClient.post<ApiResponse<KeyValueItem>>(
    "/api/KeyValues",
    payload
  );
  return response.data;
}

export async function updateKeyValue(
  payload: UpdateKeyValueRequestDto
): Promise<ApiResponse<KeyValueItem>> {
  const response = await apiClient.put<ApiResponse<KeyValueItem>>(
    "/api/KeyValues",
    payload
  );
  return response.data;
}

export async function deleteKeyValue(id: number): Promise<ApiResponse<boolean>> {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    `/api/KeyValues/${id}`
  );
  return response.data;
}

