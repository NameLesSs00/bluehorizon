"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getFullLocalizedRentalLocation,
  getRentalLocationById,
  getRentalLocationImages,
  getRentalLocations,
} from "@/clientApi/rentalLocationsApi";
import { RentalLocationsQueryParams } from "@/models/rentalLocation";
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
    staleTime: 0,
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
    staleTime: 0,
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

export * from "./useRentalLocationsMutations";
