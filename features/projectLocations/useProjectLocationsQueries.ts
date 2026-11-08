"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createProjectLocation,
  deleteProjectLocation,
  deleteProjectLocationImage,
  deleteProjectLocationVideo,
  getFullLocalizedProjectLocation,
  getProjectLocationById,
  getProjectLocationImages,
  getProjectLocations,
  replaceProjectLocationImage,
  setPrimaryProjectLocationImage,
  updateProjectLocation,
  uploadProjectLocationImages,
  uploadProjectLocationVideo,
} from "@/clientApi/projectLocationsApi";
import {
  ProjectLocationFormPayload,
  ProjectLocationsQueryParams,
} from "@/models/projectLocation";
import { showApiErrorToast } from "@/shared/utils/errorHandler";
import { useAdminAuthStore } from "@/features/admin/useAdminAuthStore";

export const PROJECT_LOCATIONS_QUERY_KEY = ["project-locations"] as const;

export function usePublicProjectLocationsQuery(params?: ProjectLocationsQueryParams) {
  return useQuery({
    queryKey: [
      ...PROJECT_LOCATIONS_QUERY_KEY,
      "public",
      params?.Language || "en",
      params?.PageNumber || 1,
      params?.PageSize || 4,
    ],
    queryFn: () => getProjectLocations(params),
    staleTime: 1000 * 60 * 5,
  });
}

export function useProjectLocationsQuery(params?: ProjectLocationsQueryParams) {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [
      ...PROJECT_LOCATIONS_QUERY_KEY,
      params?.Language || "en",
      params?.PageNumber || 1,
      params?.PageSize || 10,
    ],
    queryFn: () => getProjectLocations(params),
    enabled: Boolean(accessToken),
  });
}

export function useProjectLocationByIdQuery(
  id?: number | null,
  language: string = "en",
  isOpen?: boolean
) {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [...PROJECT_LOCATIONS_QUERY_KEY, "single", id, language],
    queryFn: async () => {
      const res = await getProjectLocationById(id!, language);
      return res.data;
    },
    enabled: Boolean(accessToken) && Boolean(isOpen) && typeof id === "number" && id > 0,
  });
}

export function useLocalizedProjectLocationQuery(id?: number | null, isOpen?: boolean) {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [...PROJECT_LOCATIONS_QUERY_KEY, "details", id],
    queryFn: () => getFullLocalizedProjectLocation(id!),
    enabled: Boolean(accessToken) && Boolean(isOpen) && typeof id === "number" && id > 0,
  });
}

export function useProjectLocationImagesQuery(id?: number | null, isOpen?: boolean) {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [...PROJECT_LOCATIONS_QUERY_KEY, "images", id],
    queryFn: () => getProjectLocationImages(id!),
    enabled: Boolean(accessToken) && Boolean(isOpen) && typeof id === "number" && id > 0,
  });
}

export function useCreateProjectLocationMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      payload,
      initialImages,
      initialVideo,
    }: {
      payload: ProjectLocationFormPayload;
      initialImages?: File[];
      initialVideo?: File | null;
    }) => {
      const res = await createProjectLocation(payload);
      if (!res.success || !res.data) {
        throw new Error(res.message || "Failed to create project location");
      }
      const newId = res.data;

      if (initialImages && initialImages.length > 0) {
        await uploadProjectLocationImages(newId, initialImages);
      }
      if (initialVideo) {
        await uploadProjectLocationVideo(newId, initialVideo);
      }
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Location created successfully");
      queryClient.invalidateQueries({ queryKey: PROJECT_LOCATIONS_QUERY_KEY });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUpdateProjectLocationMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: ProjectLocationFormPayload;
    }) => {
      const res = await updateProjectLocation(id, payload);
      if (!res.success) {
        throw new Error(res.message || "Failed to update project location");
      }
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Location updated successfully");
      queryClient.invalidateQueries({ queryKey: PROJECT_LOCATIONS_QUERY_KEY });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useDeleteProjectLocationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await deleteProjectLocation(id);
      if (!res.success) {
        throw new Error(res.message || "Failed to delete project location");
      }
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Location deleted successfully");
      queryClient.invalidateQueries({ queryKey: PROJECT_LOCATIONS_QUERY_KEY });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

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
    onSuccess: (res) => {
      toast.success(res.message || "Images uploaded successfully");
      queryClient.invalidateQueries({ queryKey: PROJECT_LOCATIONS_QUERY_KEY });
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
    onSuccess: (res) => {
      toast.success(res.message || "Image deleted successfully");
      queryClient.invalidateQueries({ queryKey: PROJECT_LOCATIONS_QUERY_KEY });
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
    onSuccess: (res) => {
      toast.success(res.message || "Image replaced successfully");
      queryClient.invalidateQueries({ queryKey: PROJECT_LOCATIONS_QUERY_KEY });
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
    onSuccess: (res) => {
      toast.success(res.message || "Primary image updated successfully");
      queryClient.invalidateQueries({ queryKey: PROJECT_LOCATIONS_QUERY_KEY });
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
    onSuccess: (res) => {
      toast.success(res.message || "Video updated successfully");
      queryClient.invalidateQueries({ queryKey: PROJECT_LOCATIONS_QUERY_KEY });
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
    onSuccess: (res) => {
      toast.success(res.message || "Video deleted successfully");
      queryClient.invalidateQueries({ queryKey: PROJECT_LOCATIONS_QUERY_KEY });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

