"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  deleteProjectLocationImage,
  deleteProjectLocationVideo,
  replaceProjectLocationImage,
  setPrimaryProjectLocationImage,
  uploadProjectLocationImages,
  uploadProjectLocationVideo,
} from "@/clientApi/projectLocationsApi";
import { showApiErrorToast } from "@/shared/utils/errorHandler";
import { PROJECT_LOCATIONS_QUERY_KEY } from "./useProjectLocationsQueries";

export function useUploadProjectLocationImagesMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, files }: { id: number; files: File[] }) => {
      const res = await uploadProjectLocationImages(id, files);
      if (!res.success) {
        throw new Error(res.message || "Failed to upload images");
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Images uploaded successfully");
      await queryClient.invalidateQueries({
        queryKey: PROJECT_LOCATIONS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: PROJECT_LOCATIONS_QUERY_KEY,
        type: "active",
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useDeleteProjectLocationImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, imageId }: { id: number; imageId: number }) => {
      const res = await deleteProjectLocationImage(id, imageId);
      if (!res.success) {
        throw new Error(res.message || "Failed to delete image");
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Image deleted successfully");
      await queryClient.invalidateQueries({
        queryKey: PROJECT_LOCATIONS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: PROJECT_LOCATIONS_QUERY_KEY,
        type: "active",
      });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useReplaceProjectLocationImageMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      locationId,
      imageId,
      file,
    }: {
      locationId: number;
      imageId: number;
      file: File;
    }) => {
      const res = await replaceProjectLocationImage(locationId, imageId, file);
      if (!res.success) {
        throw new Error(res.message || "Failed to replace image");
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Image replaced successfully");
      await queryClient.invalidateQueries({
        queryKey: PROJECT_LOCATIONS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: PROJECT_LOCATIONS_QUERY_KEY,
        type: "active",
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useSetPrimaryProjectLocationImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      locationId,
      imageId,
    }: {
      locationId: number;
      imageId: number;
    }) => {
      const res = await setPrimaryProjectLocationImage(locationId, imageId);
      if (!res.success) {
        throw new Error(res.message || "Failed to set primary image");
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Primary image updated successfully");
      await queryClient.invalidateQueries({
        queryKey: PROJECT_LOCATIONS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: PROJECT_LOCATIONS_QUERY_KEY,
        type: "active",
      });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUploadProjectLocationVideoMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, file }: { id: number; file: File }) => {
      const res = await uploadProjectLocationVideo(id, file);
      if (!res.success) {
        throw new Error(res.message || "Failed to upload video");
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Video updated successfully");
      await queryClient.invalidateQueries({
        queryKey: PROJECT_LOCATIONS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: PROJECT_LOCATIONS_QUERY_KEY,
        type: "active",
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useDeleteProjectLocationVideoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await deleteProjectLocationVideo(id);
      if (!res.success) {
        throw new Error(res.message || "Failed to delete video");
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Video deleted successfully");
      await queryClient.invalidateQueries({
        queryKey: PROJECT_LOCATIONS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: PROJECT_LOCATIONS_QUERY_KEY,
        type: "active",
      });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

