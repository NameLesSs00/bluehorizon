"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getFullLocalizedResale,
  getResaleById,
  getResaleImages,
  getResales,
} from "@/clientApi/resalesApi";
import { ResalesQueryParams } from "@/models/resale";
import { useAdminAuthStore } from "@/features/admin/useAdminAuthStore";

export const RESALES_QUERY_KEY = ["resales"] as const;

export function usePublicResalesQuery(params?: ResalesQueryParams) {
  return useQuery({
    queryKey: [
      ...RESALES_QUERY_KEY,
      "public",
      params?.Language || "en",
      params?.Currency || "USD",
      params?.SearchTerm || "",
      params?.PageNumber || 1,
      params?.PageSize || 10,
    ],
    queryFn: () => getResales(params),
    staleTime: 1000 * 60 * 5,
  });
}

export function useResalesQuery(params?: ResalesQueryParams) {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [
      ...RESALES_QUERY_KEY,
      params?.Language || "en",
      params?.Currency || "USD",
      params?.SearchTerm || "",
      params?.PageNumber || 1,
      params?.PageSize || 10,
    ],
    queryFn: () => getResales(params),
    enabled: Boolean(accessToken),
  });
}

export function useResaleByIdQuery(
  id?: number | null,
  language: string = "en",
  currency: string = "USD",
  isOpen?: boolean
) {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [...RESALES_QUERY_KEY, "single", id, language, currency],
    queryFn: async () => {
      const res = await getResaleById(id!, language, currency);
      return res.data;
    },
    enabled:
      Boolean(accessToken) && Boolean(isOpen) && typeof id === "number" && id > 0,
  });
}

export function useLocalizedResaleQuery(id?: number | null, isOpen?: boolean) {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [...RESALES_QUERY_KEY, "details", id],
    queryFn: () => getFullLocalizedResale(id!),
    enabled:
      Boolean(accessToken) && Boolean(isOpen) && typeof id === "number" && id > 0,
  });
}

export function useResaleImagesQuery(id?: number | null, isOpen?: boolean) {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [...RESALES_QUERY_KEY, "images", id],
    queryFn: async () => {
      const res = await getResaleImages(id!);
      return res.data || [];
    },
    enabled:
      Boolean(accessToken) && Boolean(isOpen) && typeof id === "number" && id > 0,
  });
}

// Re-export all mutation hooks from useResalesMutations
export * from "./useResalesMutations";
