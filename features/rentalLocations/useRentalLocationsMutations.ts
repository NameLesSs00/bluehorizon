"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createRentalLocation,
  deleteRentalLocation,
  deleteRentalLocationImage,
  deleteRentalLocationVideo,
  setPrimaryRentalLocationImage,
  updateRentalLocation,
  uploadRentalLocationImages,
  uploadRentalLocationVideo,
} from "@/clientApi/rentalLocationsApi";
import { RentalLocationFormPayload } from "@/models/rentalLocation";
import { showApiErrorToast } from "@/shared/utils/errorHandler";
import { RENTAL_LOCATIONS_QUERY_KEY } from "./useRentalLocationsQueries";

export function useCreateRentalLocationMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      payload,
      initialImages,
      initialVideo,
    }: {
      payload: RentalLocationFormPayload;
      initialImages?: File[];
      initialVideo?: File | null;
    }) => {
      const res = await createRentalLocation(payload);
      if (!res.success || !res.data) {
        throw new Error(res.message || "Failed to create rental location");
      }
      const rawData = res.data as unknown;
      const newId =
        typeof rawData === "number"
          ? rawData
          : (rawData as { id?: number })?.id ?? Number(rawData);

      if (initialImages && initialImages.length > 0) {
        await uploadRentalLocationImages(newId, initialImages);
      }
      if (initialVideo) {
        await uploadRentalLocationVideo(newId, initialVideo);
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Rental location created successfully");
      await queryClient.invalidateQueries({
        queryKey: RENTAL_LOCATIONS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: RENTAL_LOCATIONS_QUERY_KEY,
        type: "active",
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUpdateRentalLocationMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: RentalLocationFormPayload;
    }) => {
      const res = await updateRentalLocation(id, payload);
      if (!res.success) {
        throw new Error(res.message || "Failed to update rental location");
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Rental location updated successfully");
      await queryClient.invalidateQueries({
        queryKey: RENTAL_LOCATIONS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: RENTAL_LOCATIONS_QUERY_KEY,
        type: "active",
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useDeleteRentalLocationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await deleteRentalLocation(id);
      if (!res.success) {
        throw new Error(res.message || "Failed to delete rental location");
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Rental location deleted successfully");
      await queryClient.invalidateQueries({
        queryKey: RENTAL_LOCATIONS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: RENTAL_LOCATIONS_QUERY_KEY,
        type: "active",
      });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUploadRentalLocationImagesMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, files }: { id: number; files: File[] }) => {
      const res = await uploadRentalLocationImages(id, files);
      if (!res.success) {
        throw new Error(res.message || "Failed to upload images");
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Images uploaded successfully");
      await queryClient.invalidateQueries({
        queryKey: RENTAL_LOCATIONS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: RENTAL_LOCATIONS_QUERY_KEY,
        type: "active",
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useDeleteRentalLocationImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, imageId }: { id: number; imageId: number }) => {
      const res = await deleteRentalLocationImage(id, imageId);
      if (!res.success) {
        throw new Error(res.message || "Failed to delete image");
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Image deleted successfully");
      await queryClient.invalidateQueries({
        queryKey: RENTAL_LOCATIONS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: RENTAL_LOCATIONS_QUERY_KEY,
        type: "active",
      });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useSetPrimaryRentalLocationImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      rentalLocationId,
      imageId,
    }: {
      rentalLocationId: number;
      imageId: number;
    }) => {
      const res = await setPrimaryRentalLocationImage(rentalLocationId, imageId);
      if (!res.success) {
        throw new Error(res.message || "Failed to set primary image");
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Primary image updated successfully");
      await queryClient.invalidateQueries({
        queryKey: RENTAL_LOCATIONS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: RENTAL_LOCATIONS_QUERY_KEY,
        type: "active",
      });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUploadRentalLocationVideoMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, file }: { id: number; file: File }) => {
      const res = await uploadRentalLocationVideo(id, file);
      if (!res.success) {
        throw new Error(res.message || "Failed to upload video");
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Video updated successfully");
      await queryClient.invalidateQueries({
        queryKey: RENTAL_LOCATIONS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: RENTAL_LOCATIONS_QUERY_KEY,
        type: "active",
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useDeleteRentalLocationVideoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await deleteRentalLocationVideo(id);
      if (!res.success) {
        throw new Error(res.message || "Failed to delete video");
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Video deleted successfully");
      await queryClient.invalidateQueries({
        queryKey: RENTAL_LOCATIONS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: RENTAL_LOCATIONS_QUERY_KEY,
        type: "active",
      });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

