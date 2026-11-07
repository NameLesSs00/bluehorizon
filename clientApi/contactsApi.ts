import { apiClient } from "./apiConfig";
import { ApiResponse } from "@/models/admin";
import {
  ContactItem,
  CreateContactRequestDto,
  UpdateContactStatusDto,
} from "@/models/contact";

export async function getContacts(): Promise<ContactItem[]> {
  const response = await apiClient.get<ApiResponse<ContactItem[]>>(
    "/api/Contacts"
  );

  if (response.data && Array.isArray(response.data.data)) {
    return response.data.data;
  }

  return [];
}

export async function getContactById(
  id: number
): Promise<ApiResponse<ContactItem>> {
  const response = await apiClient.get<ApiResponse<ContactItem>>(
    `/api/Contacts/${id}`
  );
  return response.data;
}

export async function createContact(
  payload: CreateContactRequestDto
): Promise<ApiResponse<number>> {
  const response = await apiClient.post<ApiResponse<number>>(
    "/api/Contacts",
    payload
  );
  return response.data;
}

export async function updateContactStatus(
  id: number,
  payload: UpdateContactStatusDto
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.put<ApiResponse<boolean>>(
    `/api/Contacts/${id}/status`,
    payload
  );
  return response.data;
}

export async function deleteContact(id: number): Promise<ApiResponse<boolean>> {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    `/api/Contacts/${id}`
  );
  return response.data;
}

