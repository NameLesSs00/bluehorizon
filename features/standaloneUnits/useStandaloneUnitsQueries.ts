"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getStandaloneUnitById,
  getStandaloneUnitImages,
  getStandaloneUnits,
} from "@/clientApi/standaloneUnitsApi";
import { StandaloneUnitsQueryParams } from "@/models/standaloneUnit";
import { useAdminAuthStore } from "@/features/admin/useAdminAuthStore";

export const STANDALONE_UNITS_QUERY_KEY = ["standalone-units"] as const;

export function usePublicStandaloneUnitsQuery(
  params?: StandaloneUnitsQueryParams
) {
  return useQuery({
    queryKey: [
      ...STANDALONE_UNITS_QUERY_KEY,
      "public",
      params?.Language || "en",
      params?.Currency || "USD",
      params?.SearchTerm || "",
      params?.PropertyType || "",
      params?.City || "",
      params?.PageNumber || 1,
      params?.PageSize || 10,
    ],
    queryFn: () => getStandaloneUnits(params),
    staleTime: 1000 * 60 * 5,
  });
}

export function useStandaloneUnitsQuery(params?: StandaloneUnitsQueryParams) {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [
      ...STANDALONE_UNITS_QUERY_KEY,
      params?.Language || "en",
      params?.Currency || "USD",
      params?.SearchTerm || "",
      params?.PropertyType || "",
      params?.City || "",
      params?.IsActive ?? "",
      params?.PageNumber || 1,
      params?.PageSize || 10,
    ],
    queryFn: () => getStandaloneUnits(params),
    enabled: Boolean(accessToken),
  });
}

export function useStandaloneUnitByIdQuery(
  id?: number | null,
  language: string = "en",
  currency: string = "USD",
  isOpen?: boolean
) {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [...STANDALONE_UNITS_QUERY_KEY, "single", id, language, currency],
    queryFn: async () => {
      const res = await getStandaloneUnitById(id!, language, currency);
      return res.data;
    },
    enabled: Boolean(accessToken) && Boolean(id) && (isOpen ?? true),
  });
}

export function useStandaloneUnitImagesQuery(
  id?: number | null,
  isOpen?: boolean
) {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [...STANDALONE_UNITS_QUERY_KEY, "images", id],
    queryFn: async () => {
      const res = await getStandaloneUnitImages(id!);
      return res.data || [];
    },
    enabled: Boolean(accessToken) && Boolean(id) && (isOpen ?? true),
  });
}
