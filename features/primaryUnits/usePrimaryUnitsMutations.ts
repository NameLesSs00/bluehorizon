"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createPrimaryUnit,
  deletePrimaryUnit,
  deletePrimaryUnitImage,
  setPrimaryUnitImage,
  updatePrimaryUnit,
  updatePrimaryUnitFeatured,
  updatePrimaryUnitStatus,
  uploadPrimaryUnitImages,
} from "@/clientApi/primaryUnitsApi";
import { PrimaryUnitFormPayload } from "@/models/primaryUnit";
import { showApiErrorToast } from "@/shared/utils/errorHandler";
import { PRIMARY_UNITS_QUERY_KEY } from "./usePrimaryUnitsQueries";

export function useCreatePrimaryUnitMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      payload,
      initialImages,
    }: {
      payload: PrimaryUnitFormPayload;
      initialImages?: File[];
    }) => {
      const res = await createPrimaryUnit(payload);
      if (!res.success || !res.data) {
        throw new Error(res.message || "Failed to create primary unit");
      }
      const rawData = res.data as unknown;
      const newId =
        typeof rawData === "number"
          ? rawData
          : (rawData as { id?: number })?.id;

      if (initialImages && initialImages.length > 0 && newId) {
        await uploadPrimaryUnitImages(newId, initialImages);
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Primary unit created successfully");
      await queryClient.invalidateQueries({
        queryKey: PRIMARY_UNITS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: PRIMARY_UNITS_QUERY_KEY,
        type: "active",
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUpdatePrimaryUnitMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: PrimaryUnitFormPayload;
    }) => {
      const res = await updatePrimaryUnit(id, payload);
      if (!res.success) {
        throw new Error(res.message || "Failed to update primary unit");
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Primary unit updated successfully");
      await queryClient.invalidateQueries({
        queryKey: PRIMARY_UNITS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: PRIMARY_UNITS_QUERY_KEY,
        type: "active",
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useDeletePrimaryUnitMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await deletePrimaryUnit(id);
      if (!res.success) {
        throw new Error(res.message || "Failed to delete primary unit");
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Primary unit deleted successfully");
      await queryClient.invalidateQueries({
        queryKey: PRIMARY_UNITS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: PRIMARY_UNITS_QUERY_KEY,
        type: "active",
      });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUploadPrimaryUnitImagesMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      primaryUnitId,
      files,
    }: {
      primaryUnitId: number;
      files: File[];
    }) => {
      const res = await uploadPrimaryUnitImages(primaryUnitId, files);
      if (!res.success) {
        throw new Error(res.message || "Failed to upload images");
      }
      return res;
    },
    onSuccess: () => {
      toast.success("Images uploaded successfully");
      queryClient.invalidateQueries({ queryKey: PRIMARY_UNITS_QUERY_KEY });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useSetPrimaryUnitImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (imageId: number) => {
      const res = await setPrimaryUnitImage(imageId);
      if (!res.success) {
        throw new Error(res.message || "Failed to set primary image");
      }
      return res;
    },
    onSuccess: () => {
      toast.success("Primary image updated successfully");
      queryClient.invalidateQueries({ queryKey: PRIMARY_UNITS_QUERY_KEY });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useDeletePrimaryUnitImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      unitId,
      imageId,
    }: {
      unitId: number;
      imageId: number;
    }) => {
      const res = await deletePrimaryUnitImage(unitId, imageId);
      if (!res.success) {
        throw new Error(res.message || "Failed to delete image");
      }
      return res;
    },
    onSuccess: () => {
      toast.success("Image deleted successfully");
      queryClient.invalidateQueries({ queryKey: PRIMARY_UNITS_QUERY_KEY });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUpdatePrimaryUnitStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      isActive,
    }: {
      id: number;
      isActive: boolean;
    }) => {
      const res = await updatePrimaryUnitStatus(id, isActive);
      if (!res.success) {
        throw new Error(res.message || "Failed to update status");
      }
      return res;
    },
    onSuccess: () => {
      toast.success("Primary unit status updated");
      queryClient.invalidateQueries({ queryKey: PRIMARY_UNITS_QUERY_KEY });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUpdatePrimaryUnitFeaturedMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      isFeatured,
    }: {
      id: number;
      isFeatured: boolean;
    }) => {
      const res = await updatePrimaryUnitFeatured(id, isFeatured);
      if (!res.success) {
        throw new Error(res.message || "Failed to update featured status");
      }
      return res;
    },
    onSuccess: () => {
      toast.success("Featured badge updated");
      queryClient.invalidateQueries({ queryKey: PRIMARY_UNITS_QUERY_KEY });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

