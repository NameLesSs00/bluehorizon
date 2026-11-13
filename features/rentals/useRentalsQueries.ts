"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createRental,
  deleteRental,
  deleteRentalImage,
  getFullLocalizedRental,
  getRentalById,
  getRentals,
  setPrimaryRentalImage,
  updateRental,
  uploadRentalImages,
} from "@/clientApi/rentalsApi";
import { RentalFormPayload, RentalsQueryParams } from "@/models/rental";
import { showApiErrorToast } from "@/shared/utils/errorHandler";
import { useAdminAuthStore } from "@/features/admin/useAdminAuthStore";

export const RENTALS_QUERY_KEY = ["rentals"] as const;

export function usePublicRentalsQuery(params?: RentalsQueryParams) {
  return useQuery({
    queryKey: [
      ...RENTALS_QUERY_KEY,
      "public",
      params?.Language || "en",
      params?.Currency || "USD",
      params?.PageNumber || 1,
      params?.PageSize || 10,
    ],
    queryFn: () => getRentals(params),
    staleTime: 1000 * 60 * 5,
  });
}

export function useRentalsQuery(params?: RentalsQueryParams) {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [
      ...RENTALS_QUERY_KEY,
      params?.Language || "en",
      params?.Currency || "USD",
      params?.PageNumber || 1,
      params?.PageSize || 10,
    ],
    queryFn: () => getRentals(params),
    enabled: Boolean(accessToken),
  });
}

export function useRentalByIdQuery(
  id?: number | null,
  language: string = "en",
  currency: string = "USD",
  isOpen?: boolean
) {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [...RENTALS_QUERY_KEY, "single", id, language, currency],
    queryFn: async () => {
      const res = await getRentalById(id!, language, currency);
      return res.data;
    },
    enabled:
      Boolean(accessToken) && Boolean(isOpen) && typeof id === "number" && id > 0,
  });
}

export function usePublicRentalByIdQuery(
  id?: number | null,
  language: string = "en",
  currency: string = "USD"
) {
  return useQuery({
    queryKey: [...RENTALS_QUERY_KEY, "public-single", id, language, currency],
    queryFn: async () => {
      if (!id || id <= 0) return null;
      const res = await getRentalById(id, language, currency);
      return res.data;
    },
    enabled: typeof id === "number" && id > 0,
    staleTime: 1000 * 60 * 5,
  });
}

export function useLocalizedRentalQuery(id?: number | null, isOpen?: boolean) {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [...RENTALS_QUERY_KEY, "details", id],
    queryFn: () => getFullLocalizedRental(id!),
    enabled:
      Boolean(accessToken) && Boolean(isOpen) && typeof id === "number" && id > 0,
  });
}

export function useCreateRentalMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      payload,
      initialImages,
    }: {
      payload: RentalFormPayload;
      initialImages?: File[];
    }) => {
      const res = await createRental(payload);
      if (!res.success || !res.data) {
        throw new Error(res.message || "Failed to create rental property");
      }
      const newId = res.data.id;

      if (initialImages && initialImages.length > 0) {
        await uploadRentalImages(newId, initialImages);
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Rental property created successfully");
      await queryClient.invalidateQueries({
        queryKey: RENTALS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: RENTALS_QUERY_KEY,
        type: "active",
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUpdateRentalMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: RentalFormPayload;
    }) => {
      const res = await updateRental(id, payload);
      if (!res.success) {
        throw new Error(res.message || "Failed to update rental property");
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Rental property updated successfully");
      await queryClient.invalidateQueries({
        queryKey: RENTALS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: RENTALS_QUERY_KEY,
        type: "active",
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useDeleteRentalMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await deleteRental(id);
      if (!res.success) {
        throw new Error(res.message || "Failed to delete rental property");
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Rental property deleted successfully");
      await queryClient.invalidateQueries({
        queryKey: RENTALS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: RENTALS_QUERY_KEY,
        type: "active",
      });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUploadRentalImagesMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      rentalId,
      files,
    }: {
      rentalId: number;
      files: File[];
    }) => {
      const res = await uploadRentalImages(rentalId, files);
      if (!res.success) {
        throw new Error(res.message || "Failed to upload images");
      }
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Images uploaded successfully");
      queryClient.invalidateQueries({ queryKey: RENTALS_QUERY_KEY });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useSetPrimaryRentalImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      rentalId,
      imageId,
    }: {
      rentalId: number;
      imageId: number;
    }) => {
      const res = await setPrimaryRentalImage(rentalId, imageId);
      if (!res.success) {
        throw new Error(res.message || "Failed to set primary image");
      }
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Primary image updated successfully");
      queryClient.invalidateQueries({ queryKey: RENTALS_QUERY_KEY });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useDeleteRentalImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      rentalId,
      imageId,
    }: {
      rentalId: number;
      imageId: number;
    }) => {
      const res = await deleteRentalImage(rentalId, imageId);
      if (!res.success) {
        throw new Error(res.message || "Failed to delete image");
      }
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Image deleted successfully");
      queryClient.invalidateQueries({ queryKey: RENTALS_QUERY_KEY });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

