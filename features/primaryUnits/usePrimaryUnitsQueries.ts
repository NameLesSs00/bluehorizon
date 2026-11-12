"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getFullLocalizedPrimaryUnit,
  getPrimaryUnitById,
  getPrimaryUnitImages,
  getPrimaryUnits,
} from "@/clientApi/primaryUnitsApi";
import { PrimaryUnitsQueryParams } from "@/models/primaryUnit";
import { useAdminAuthStore } from "@/features/admin/useAdminAuthStore";

export const PRIMARY_UNITS_QUERY_KEY = ["primary-units"] as const;

export function usePublicPrimaryUnitsQuery(params?: PrimaryUnitsQueryParams) {
  return useQuery({
    queryKey: [
      ...PRIMARY_UNITS_QUERY_KEY,
      "public",
      params?.Language || "en",
      params?.Currency || "USD",
      params?.SearchTerm || "",
      params?.ProjectId || "all",
      params?.PageNumber || 1,
      params?.PageSize || 10,
    ],
    queryFn: () => getPrimaryUnits(params),
    staleTime: 1000 * 60 * 5,
  });
}

export function usePrimaryUnitsQuery(params?: PrimaryUnitsQueryParams) {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [
      ...PRIMARY_UNITS_QUERY_KEY,
      params?.Language || "en",
      params?.Currency || "USD",
      params?.SearchTerm || "",
      params?.ProjectId || "all",
      params?.PageNumber || 1,
      params?.PageSize || 10,
    ],
    queryFn: () => getPrimaryUnits(params),
    enabled: Boolean(accessToken),
  });
}

export function usePrimaryUnitByIdQuery(
  id?: number | null,
  language: string = "en",
  currency: string = "USD",
  isOpen?: boolean
) {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [...PRIMARY_UNITS_QUERY_KEY, "single", id, language, currency],
    queryFn: async () => {
      const res = await getPrimaryUnitById(id!, language, currency);
      return res.data;
    },
    enabled:
      Boolean(accessToken) && Boolean(isOpen) && typeof id === "number" && id > 0,
  });
}

export function useLocalizedPrimaryUnitQuery(id?: number | null, isOpen?: boolean) {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [...PRIMARY_UNITS_QUERY_KEY, "details", id],
    queryFn: () => getFullLocalizedPrimaryUnit(id!),
    enabled:
      Boolean(accessToken) && Boolean(isOpen) && typeof id === "number" && id > 0,
  });
}

export function usePrimaryUnitImagesQuery(id?: number | null, isOpen?: boolean) {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [...PRIMARY_UNITS_QUERY_KEY, "images", id],
    queryFn: async () => {
      const res = await getPrimaryUnitImages(id!);
      return res.data || [];
    },
    enabled:
      Boolean(accessToken) && Boolean(isOpen) && typeof id === "number" && id > 0,
  });
}

// Re-export all mutation hooks from usePrimaryUnitsMutations
export * from "./usePrimaryUnitsMutations";

