"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  addAdmin,
  deleteAdmin,
  getAdmins,
  loginAdmin,
  logoutAdmin,
  updateAdminPassword,
  updateAdminProfile,
} from "@/clientApi/adminApi";
import {
  AddAdminRequestDto,
  AdminsQueryParams,
  LoginRequestDto,
  UpdateAdminProfileInput,
  UpdatePasswordRequestDto,
} from "@/models/admin";
import { showApiErrorToast } from "@/shared/utils/errorHandler";
import { isSuperAdminSession, useAdminAuthStore } from "./useAdminAuthStore";

export const ADMINS_QUERY_KEY = ["admins"] as const;

export function useLoginMutation() {
  const router = useRouter();
  const setAuth = useAdminAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (payload: LoginRequestDto) => {
      const res = await loginAdmin(payload);
      if (!res.success || !res.data?.accessToken) {
        const errMsg =
          Array.isArray(res.errors) && res.errors.length > 0
            ? res.errors.join(" | ")
            : res.message || "Invalid credentials";
        throw new Error(errMsg);
      }
      return res;
    },
    onSuccess: (res) => {
      setAuth(res.data);
      toast.success(res.message || "Signed in successfully");
      const isSuperAdmin =
        res.data.role === "SuperAdmin" ||
        res.data.roles?.includes("SuperAdmin") ||
        isSuperAdminSession(null, res.data.accessToken);

      if (isSuperAdmin) {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/admin/contacts");
      }
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useLogoutMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const refreshToken = useAdminAuthStore((state) => state.refreshToken);
  const clearAuth = useAdminAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: async () => {
      if (refreshToken) {
        await logoutAdmin(refreshToken);
      }
    },
    onSettled: () => {
      clearAuth();
      queryClient.clear();
      toast.success("Logged out successfully");
      router.replace("/admin/login");
    },
  });
}

export function useAdminsQuery(params?: AdminsQueryParams) {
  const accessToken = useAdminAuthStore((state) => state.accessToken);
  const currentUser = useAdminAuthStore((state) => state.user);
  const isSuperAdmin = isSuperAdminSession(currentUser, accessToken);

  return useQuery({
    queryKey: [...ADMINS_QUERY_KEY, params?.PageNumber ?? 1, params?.PageSize ?? 10],
    queryFn: () => getAdmins(params),
    enabled: Boolean(accessToken) && isSuperAdmin,
    staleTime: 0,
  });
}

export function useAddAdminMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: AddAdminRequestDto) => {
      const res = await addAdmin(payload);
      if (!res.success) {
        const errMsg =
          Array.isArray(res.errors) && res.errors.length > 0
            ? res.errors.join(" | ")
            : res.message || "Failed to add admin";
        throw new Error(errMsg);
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Admin created successfully");
      await queryClient.invalidateQueries({
        queryKey: ADMINS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: ADMINS_QUERY_KEY,
        type: "active",
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUpdateAdminProfileMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();
  const updateCurrentUser = useAdminAuthStore(
    (state) => state.updateCurrentUser
  );

  return useMutation({
    mutationFn: async (input: UpdateAdminProfileInput) => {
      const res = await updateAdminProfile(input);
      if (!res.success) {
        const errMsg =
          Array.isArray(res.errors) && res.errors.length > 0
            ? res.errors.join(" | ")
            : res.message || "Failed to update profile";
        throw new Error(errMsg);
      }
      return { res, input };
    },
    onSuccess: async ({ res, input }) => {
      updateCurrentUser({
        userName: res.data?.userName || input.userName,
        email: res.data?.email || input.email,
      });
      toast.success(res.message || "Profile updated successfully");
      await queryClient.invalidateQueries({
        queryKey: ADMINS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: ADMINS_QUERY_KEY,
        type: "active",
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUpdatePasswordMutation(onSuccessCallback?: () => void) {
  return useMutation({
    mutationFn: async (payload: UpdatePasswordRequestDto) => {
      const res = await updateAdminPassword(payload);
      if (!res.success) {
        const errMsg =
          Array.isArray(res.errors) && res.errors.length > 0
            ? res.errors.join(" | ")
            : res.message || "Failed to update password";
        throw new Error(errMsg);
      }
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Password updated successfully");
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useDeleteAdminMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteAdmin(id);
      if (!res.success) {
        const errMsg =
          Array.isArray(res.errors) && res.errors.length > 0
            ? res.errors.join(" | ")
            : res.message || "Failed to delete admin";
        throw new Error(errMsg);
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Admin deleted successfully");
      await queryClient.invalidateQueries({
        queryKey: ADMINS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: ADMINS_QUERY_KEY,
        type: "active",
      });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}
