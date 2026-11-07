import { apiClient } from "./apiConfig";
import {
  AddAdminRequestDto,
  AdminsQueryParams,
  AdminUserItem,
  ApiResponse,
  AuthTokenData,
  LoginRequestDto,
  PaginatedAdminsData,
  RefreshTokenRequestDto,
  UpdateAdminProfileInput,
  UpdateAdminRequestDto,
  UpdatePasswordRequestDto,
} from "@/models/admin";

export async function loginAdmin(
  payload: LoginRequestDto
): Promise<ApiResponse<AuthTokenData>> {
  const response = await apiClient.post<ApiResponse<AuthTokenData>>(
    "/api/Auth/login",
    payload
  );
  return response.data;
}

export async function logoutAdmin(
  refreshToken: string
): Promise<ApiResponse<null>> {
  const response = await apiClient.post<ApiResponse<null>>(
    "/api/Auth/logout",
    JSON.stringify(refreshToken),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

export async function refreshAdminToken(
  payload: RefreshTokenRequestDto
): Promise<ApiResponse<AuthTokenData>> {
  const response = await apiClient.post<ApiResponse<AuthTokenData>>(
    "/api/Auth/refresh-token",
    payload
  );
  return response.data;
}

export async function getAdmins(
  params?: AdminsQueryParams
): Promise<{
  items: AdminUserItem[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}> {
  const response = await apiClient.get<
    ApiResponse<AdminUserItem[] | PaginatedAdminsData> | PaginatedAdminsData
  >("/api/Admins", {
    params,
  });

  const body = response.data;

  // Handle wrapped ApiResponse<AdminUserItem[]>
  if ("success" in body && Array.isArray(body.data)) {
    return {
      items: body.data,
      pageNumber: params?.PageNumber || 1,
      totalPages: 1,
      totalCount: body.data.length,
      hasPreviousPage: false,
      hasNextPage: false,
    };
  }

  // Handle wrapped ApiResponse<PaginatedAdminsData>
  if (
    "success" in body &&
    body.data &&
    typeof body.data === "object" &&
    "items" in body.data
  ) {
    return body.data;
  }

  // Handle direct PaginatedAdminsData
  if ("items" in body && Array.isArray(body.items)) {
    return body;
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

export async function addAdmin(
  payload: AddAdminRequestDto
): Promise<ApiResponse<string>> {
  const response = await apiClient.post<ApiResponse<string>>(
    "/api/Auth/add-admin",
    payload
  );
  return response.data;
}

export async function updateAdminProfile(
  input: UpdateAdminProfileInput
): Promise<ApiResponse<UpdateAdminRequestDto>> {
  // Phone is hidden in UI and always sent as 11 zeros per backend requirements
  const payload: UpdateAdminRequestDto = {
    userName: input.userName,
    email: input.email,
    phoneNumber: "00000000000",
  };
  const response = await apiClient.put<ApiResponse<UpdateAdminRequestDto>>(
    "/api/Admins/update",
    payload
  );
  return response.data;
}

export async function updateAdminPassword(
  payload: UpdatePasswordRequestDto
): Promise<ApiResponse<null>> {
  const response = await apiClient.put<ApiResponse<null>>(
    "/api/Auth/update-password",
    payload
  );
  return response.data;
}

export async function deleteAdmin(id: string): Promise<ApiResponse<boolean>> {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    `/api/Auth/delete-admin/${id}`
  );
  return response.data;
}

