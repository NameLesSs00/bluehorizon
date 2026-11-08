export type AdminRole = "SuperAdmin" | "Admin" | (string & {});

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: string[] | Record<string, string[]> | string | null;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface AuthTokenData {
  accessToken: string;
  refreshToken: string;
  email: string;
  fullName: string;
  role?: AdminRole;
  roles?: AdminRole[];
}

export interface RefreshTokenRequestDto {
  refreshToken: string;
}

export interface AdminUserItem {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  role?: AdminRole;
  roles?: AdminRole[];
}

export interface PaginatedAdminsData {
  items: AdminUserItem[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface AdminsQueryParams {
  PageNumber?: number;
  PageSize?: number;
}

export interface AddAdminRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UpdateAdminProfileInput {
  userName: string;
  email: string;
}

export interface UpdateAdminRequestDto {
  userName: string;
  email: string;
  phoneNumber: string;
}

export interface UpdatePasswordRequestDto {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface CurrentAdminSession {
  id: string;
  email: string;
  fullName: string;
  role: AdminRole;
  roles?: AdminRole[];
}
