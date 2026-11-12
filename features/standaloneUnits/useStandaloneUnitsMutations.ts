"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createStandaloneUnit,
  deleteStandaloneUnit,
  deleteStandaloneUnitImage,
  setPrimaryStandaloneUnitImage,
  updateStandaloneUnit,
  updateStandaloneUnitFeatured,
  updateStandaloneUnitStatus,
  uploadStandaloneUnitImages,
} from "@/clientApi/standaloneUnitsApi";
import { StandaloneUnitFormPayload } from "@/models/standaloneUnit";
import { showApiErrorToast } from "@/shared/utils/errorHandler";
import { STANDALONE_UNITS_QUERY_KEY } from "./useStandaloneUnitsQueries";

export function useCreateStandaloneUnitMutation(
  onSuccessCallback?: () => void
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      payload,
      initialImages,
    }: {
      payload: StandaloneUnitFormPayload;
      initialImages?: File[];
    }) => {
      const res = await createStandaloneUnit(payload);
      if (!res.success) {
        throw new Error(res.message || "Failed to create standalone property");
      }
      const rawData = res.data as unknown;
      const newId =
        typeof rawData === "number"
          ? rawData
          : (rawData as { id?: number })?.id;

      if (initialImages && initialImages.length > 0 && newId) {
        await uploadStandaloneUnitImages(newId, initialImages);
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Standalone property created successfully");
      await queryClient.invalidateQueries({
        queryKey: STANDALONE_UNITS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: STANDALONE_UNITS_QUERY_KEY,
        type: "active",
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUpdateStandaloneUnitMutation(
  onSuccessCallback?: () => void
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: StandaloneUnitFormPayload;
    }) => {
      const res = await updateStandaloneUnit(id, payload);
      if (!res.success) {
        throw new Error(res.message || "Failed to update standalone property");
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Standalone property updated successfully");
      await queryClient.invalidateQueries({
        queryKey: STANDALONE_UNITS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: STANDALONE_UNITS_QUERY_KEY,
        type: "active",
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useDeleteStandaloneUnitMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await deleteStandaloneUnit(id);
      if (!res.success) {
        throw new Error(res.message || "Failed to delete standalone property");
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Standalone property deleted successfully");
      await queryClient.invalidateQueries({
        queryKey: STANDALONE_UNITS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: STANDALONE_UNITS_QUERY_KEY,
        type: "active",
      });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUploadStandaloneUnitImagesMutation(
  onSuccessCallback?: () => void
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, files }: { id: number; files: File[] }) => {
      const res = await uploadStandaloneUnitImages(id, files);
      if (!res.success) {
        throw new Error(res.message || "Failed to upload images");
      }
      return res;
    },
    onSuccess: async () => {
      toast.success("Images uploaded successfully");
      await queryClient.invalidateQueries({
        queryKey: STANDALONE_UNITS_QUERY_KEY,
        refetchType: "all",
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useDeleteStandaloneUnitImageMutation(
  onSuccessCallback?: () => void
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, imageId }: { id: number; imageId: number }) => {
      const res = await deleteStandaloneUnitImage(id, imageId);
      if (!res.success) {
        throw new Error(res.message || "Failed to delete image");
      }
      return res;
    },
    onSuccess: async () => {
      toast.success("Image deleted successfully");
      await queryClient.invalidateQueries({
        queryKey: STANDALONE_UNITS_QUERY_KEY,
        refetchType: "all",
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useSetPrimaryStandaloneUnitImageMutation(
  onSuccessCallback?: () => void
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      unitId,
      imageId,
    }: {
      unitId: number;
      imageId: number;
    }) => {
      const res = await setPrimaryStandaloneUnitImage(unitId, imageId);
      if (!res.success) {
        throw new Error(res.message || "Failed to set primary image");
      }
      return res;
    },
    onSuccess: async () => {
      toast.success("Primary image set successfully");
      await queryClient.invalidateQueries({
        queryKey: STANDALONE_UNITS_QUERY_KEY,
        refetchType: "all",
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useToggleStandaloneUnitStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, isActive }: { id: number; isActive: boolean }) => {
      const res = await updateStandaloneUnitStatus(id, isActive);
      if (!res.success) {
        throw new Error(res.message || "Failed to update property status");
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Property status updated");
      await queryClient.invalidateQueries({
        queryKey: STANDALONE_UNITS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: STANDALONE_UNITS_QUERY_KEY,
        type: "active",
      });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useToggleStandaloneUnitFeaturedMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      isFeatured,
    }: {
      id: number;
      isFeatured: boolean;
    }) => {
      const res = await updateStandaloneUnitFeatured(id, isFeatured);
      if (!res.success) {
        throw new Error(res.message || "Failed to update featured status");
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Featured status updated");
      await queryClient.invalidateQueries({
        queryKey: STANDALONE_UNITS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: STANDALONE_UNITS_QUERY_KEY,
        type: "active",
      });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

