"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createKeyValue,
  deleteKeyValue,
  getKeyValues,
  updateKeyValue,
} from "@/clientApi/keyValuesApi";
import {
  CreateKeyValueRequestDto,
  UpdateKeyValueRequestDto,
} from "@/models/keyValue";
import { showApiErrorToast } from "@/shared/utils/errorHandler";
import { useAdminAuthStore } from "@/features/admin/useAdminAuthStore";

export const KEY_VALUES_QUERY_KEY = ["keyValues"] as const;

export function useKeyValuesQuery() {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: KEY_VALUES_QUERY_KEY,
    queryFn: () => getKeyValues(),
    enabled: Boolean(accessToken),
    staleTime: 0,
  });
}

export function useCreateKeyValueMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateKeyValueRequestDto) => {
      const res = await createKeyValue(payload);
      if (!res.success) {
        const errMsg =
          Array.isArray(res.errors) && res.errors.length > 0
            ? res.errors.join(" | ")
            : res.message || "Failed to create site link";
        throw new Error(errMsg);
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Site link created successfully");
      await queryClient.invalidateQueries({
        queryKey: KEY_VALUES_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: KEY_VALUES_QUERY_KEY,
        type: "active",
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUpdateKeyValueMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateKeyValueRequestDto) => {
      const res = await updateKeyValue(payload);
      if (!res.success) {
        const errMsg =
          Array.isArray(res.errors) && res.errors.length > 0
            ? res.errors.join(" | ")
            : res.message || "Failed to update site link";
        throw new Error(errMsg);
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Site link updated successfully");
      await queryClient.invalidateQueries({
        queryKey: KEY_VALUES_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: KEY_VALUES_QUERY_KEY,
        type: "active",
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useDeleteKeyValueMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await deleteKeyValue(id);
      if (!res.success) {
        const errMsg =
          Array.isArray(res.errors) && res.errors.length > 0
            ? res.errors.join(" | ")
            : res.message || "Failed to delete site link";
        throw new Error(errMsg);
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Site link deleted successfully");
      await queryClient.invalidateQueries({
        queryKey: KEY_VALUES_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: KEY_VALUES_QUERY_KEY,
        type: "active",
      });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}
