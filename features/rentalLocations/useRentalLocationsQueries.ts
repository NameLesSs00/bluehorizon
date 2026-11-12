"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createRentalLocation,
  deleteRentalLocation,
  deleteRentalLocationImage,
  deleteRentalLocationVideo,
  getFullLocalizedRentalLocation,
  getRentalLocationById,
  getRentalLocationImages,
  getRentalLocations,
  setPrimaryRentalLocationImage,
  updateRentalLocation,
  uploadRentalLocationImages,
  uploadRentalLocationVideo,
} from "@/clientApi/rentalLocationsApi";
import {
  RentalLocationFormPayload,
  RentalLocationsQueryParams,
} from "@/models/rentalLocation";
import { showApiErrorToast } from "@/shared/utils/errorHandler";
import { useAdminAuthStore } from "@/features/admin/useAdminAuthStore";

export const RENTAL_LOCATIONS_QUERY_KEY = ["rental-locations"] as const;

export function usePublicRentalLocationsQuery(
  params?: RentalLocationsQueryParams
) {
  return useQuery({
    queryKey: [
      ...RENTAL_LOCATIONS_QUERY_KEY,
      "public",
      params?.Language || "en",
      params?.PageNumber || 1,
      params?.PageSize || 10,
    ],
    queryFn: () => getRentalLocations(params),
    staleTime: 1000 * 60 * 5,
  });
}

export function useRentalLocationsQuery(params?: RentalLocationsQueryParams) {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [
      ...RENTAL_LOCATIONS_QUERY_KEY,
      params?.Language || "en",
      params?.PageNumber || 1,
      params?.PageSize || 10,
    ],
    queryFn: () => getRentalLocations(params),
    enabled: Boolean(accessToken),
  });
}

export function useRentalLocationByIdQuery(
  id?: number | null,
  language: string = "en",
  isOpen?: boolean
) {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [...RENTAL_LOCATIONS_QUERY_KEY, "single", id, language],
    queryFn: async () => {
      const res = await getRentalLocationById(id!, language);
      return res.data;
    },
    enabled:
      Boolean(accessToken) && Boolean(isOpen) && typeof id === "number" && id > 0,
  });
}

export function useLocalizedRentalLocationQuery(
  id?: number | null,
  isOpen?: boolean
) {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [...RENTAL_LOCATIONS_QUERY_KEY, "details", id],
    queryFn: () => getFullLocalizedRentalLocation(id!),
    enabled:
      Boolean(accessToken) && Boolean(isOpen) && typeof id === "number" && id > 0,
  });
}

export function useRentalLocationImagesQuery(
  id?: number | null,
  isOpen?: boolean
) {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [...RENTAL_LOCATIONS_QUERY_KEY, "images", id],
    queryFn: () => getRentalLocationImages(id!),
    enabled:
      Boolean(accessToken) && Boolean(isOpen) && typeof id === "number" && id > 0,
  });
}

export function useCreateRentalLocationMutation(
  onSuccessCallback?: () => void
) {
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
      const newId = res.data;

      if (initialImages && initialImages.length > 0) {
        await uploadRentalLocationImages(newId, initialImages);
      }
      if (initialVideo) {
        await uploadRentalLocationVideo(newId, initialVideo);
      }
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Rental location created successfully");
      queryClient.invalidateQueries({ queryKey: RENTAL_LOCATIONS_QUERY_KEY });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUpdateRentalLocationMutation(
  onSuccessCallback?: () => void
) {
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
    onSuccess: (res) => {
      toast.success(res.message || "Rental location updated successfully");
      queryClient.invalidateQueries({ queryKey: RENTAL_LOCATIONS_QUERY_KEY });
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
    onSuccess: (res) => {
      toast.success(res.message || "Rental location deleted successfully");
      queryClient.invalidateQueries({ queryKey: RENTAL_LOCATIONS_QUERY_KEY });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUploadRentalLocationImagesMutation(
  onSuccessCallback?: () => void
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, files }: { id: number; files: File[] }) => {
      const res = await uploadRentalLocationImages(id, files);
      if (!res.success) {
        throw new Error(res.message || "Failed to upload images");
      }
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Images uploaded successfully");
      queryClient.invalidateQueries({ queryKey: RENTAL_LOCATIONS_QUERY_KEY });
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
    mutationFn: async ({
      id,
      imageId,
    }: {
      id: number;
      imageId: number;
    }) => {
      const res = await deleteRentalLocationImage(id, imageId);
      if (!res.success) {
        throw new Error(res.message || "Failed to delete image");
      }
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Image deleted successfully");
      queryClient.invalidateQueries({ queryKey: RENTAL_LOCATIONS_QUERY_KEY });
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
      const res = await setPrimaryRentalLocationImage(
        rentalLocationId,
        imageId
      );
      if (!res.success) {
        throw new Error(res.message || "Failed to set primary image");
      }
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Primary image updated successfully");
      queryClient.invalidateQueries({ queryKey: RENTAL_LOCATIONS_QUERY_KEY });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUploadRentalLocationVideoMutation(
  onSuccessCallback?: () => void
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, file }: { id: number; file: File }) => {
      const res = await uploadRentalLocationVideo(id, file);
      if (!res.success) {
        throw new Error(res.message || "Failed to upload video");
      }
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Video updated successfully");
      queryClient.invalidateQueries({ queryKey: RENTAL_LOCATIONS_QUERY_KEY });
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
    onSuccess: (res) => {
      toast.success(res.message || "Video deleted successfully");
      queryClient.invalidateQueries({ queryKey: RENTAL_LOCATIONS_QUERY_KEY });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

