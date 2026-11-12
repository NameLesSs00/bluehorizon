"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createResale,
  deleteResale,
  deleteResaleImage,
  setPrimaryResaleImage,
  updateResale,
  updateResaleFeatured,
  updateResaleStatus,
  uploadResaleImages,
} from "@/clientApi/resalesApi";
import { ResaleFormPayload } from "@/models/resale";
import { showApiErrorToast } from "@/shared/utils/errorHandler";
import { RESALES_QUERY_KEY } from "./useResalesQueries";

export function useCreateResaleMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      payload,
      initialImages,
    }: {
      payload: ResaleFormPayload;
      initialImages?: File[];
    }) => {
      const res = await createResale(payload);
      if (!res.success || !res.data) {
        throw new Error(res.message || "Failed to create resale property");
      }
      const rawData = res.data as unknown;
      const newId =
        typeof rawData === "number"
          ? rawData
          : (rawData as { id?: number })?.id;

      if (initialImages && initialImages.length > 0 && newId) {
        await uploadResaleImages(newId, initialImages);
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Resale property created successfully");
      await queryClient.invalidateQueries({
        queryKey: RESALES_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: RESALES_QUERY_KEY,
        type: "active",
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUpdateResaleMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: ResaleFormPayload;
    }) => {
      const res = await updateResale(id, payload);
      if (!res.success) {
        throw new Error(res.message || "Failed to update resale property");
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Resale property updated successfully");
      await queryClient.invalidateQueries({
        queryKey: RESALES_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: RESALES_QUERY_KEY,
        type: "active",
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useDeleteResaleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await deleteResale(id);
      if (!res.success) {
        throw new Error(res.message || "Failed to delete resale property");
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Resale property deleted successfully");
      await queryClient.invalidateQueries({
        queryKey: RESALES_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: RESALES_QUERY_KEY,
        type: "active",
      });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUploadResaleImagesMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      resaleId,
      files,
    }: {
      resaleId: number;
      files: File[];
    }) => {
      const res = await uploadResaleImages(resaleId, files);
      if (!res.success) {
        throw new Error(res.message || "Failed to upload images");
      }
      return res;
    },
    onSuccess: () => {
      toast.success("Images uploaded successfully");
      queryClient.invalidateQueries({ queryKey: RESALES_QUERY_KEY });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useSetPrimaryResaleImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (imageId: number) => {
      const res = await setPrimaryResaleImage(imageId);
      if (!res.success) {
        throw new Error(res.message || "Failed to set primary image");
      }
      return res;
    },
    onSuccess: () => {
      toast.success("Primary image updated successfully");
      queryClient.invalidateQueries({ queryKey: RESALES_QUERY_KEY });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useDeleteResaleImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      resaleId,
      imageId,
    }: {
      resaleId: number;
      imageId: number;
    }) => {
      const res = await deleteResaleImage(resaleId, imageId);
      if (!res.success) {
        throw new Error(res.message || "Failed to delete image");
      }
      return res;
    },
    onSuccess: () => {
      toast.success("Image deleted successfully");
      queryClient.invalidateQueries({ queryKey: RESALES_QUERY_KEY });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUpdateResaleStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      isActive,
    }: {
      id: number;
      isActive: boolean;
    }) => {
      const res = await updateResaleStatus(id, isActive);
      if (!res.success) {
        throw new Error(res.message || "Failed to update status");
      }
      return res;
    },
    onSuccess: () => {
      toast.success("Resale status updated");
      queryClient.invalidateQueries({ queryKey: RESALES_QUERY_KEY });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUpdateResaleFeaturedMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      isFeatured,
    }: {
      id: number;
      isFeatured: boolean;
    }) => {
      const res = await updateResaleFeatured(id, isFeatured);
      if (!res.success) {
        throw new Error(res.message || "Failed to update featured status");
      }
      return res;
    },
    onSuccess: () => {
      toast.success("Featured badge updated");
      queryClient.invalidateQueries({ queryKey: RESALES_QUERY_KEY });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

