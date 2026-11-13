"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createProject,
  deleteProject,
  deleteProjectFacility,
  deleteProjectImage,
  getFullLocalizedProject,
  getProjectById,
  getProjects,
  updateProject,
  uploadProjectImages,
} from "@/clientApi/projectsApi";
import {
  CreateProjectRequestDto,
  ProjectsQueryParams,
  UpdateProjectRequestDto,
} from "@/models/project";
import { showApiErrorToast } from "@/shared/utils/errorHandler";
import { useAdminAuthStore } from "@/features/admin/useAdminAuthStore";

export const PROJECTS_QUERY_KEY = ["projects"] as const;

export function usePublicProjectsQuery(params?: ProjectsQueryParams) {
  return useQuery({
    queryKey: [
      ...PROJECTS_QUERY_KEY,
      "public",
      params?.Language || "en",
      params?.Currency || "USD",
      params?.PageNumber || 1,
      params?.PageSize || 8,
      params?.SearchTerm || "",
      params?.Search || "",
      params?.LocationId ?? "all",
      params?.ProjectTypeId ?? "all",
      params?.MinimumPrice ?? "all",
      params?.MaximumPrice ?? "all",
      params?.DeliveryDateFrom || "",
      params?.DeliveryDateTo || "",
      params?.IsFeature ?? "all",
    ],
    queryFn: () => getProjects(params),
    staleTime: 1000 * 60 * 5,
  });
}

export function useProjectsQuery(params?: ProjectsQueryParams) {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [
      ...PROJECTS_QUERY_KEY,
      params?.Language || "en",
      params?.Currency || "USD",
      params?.PageNumber || 1,
      params?.PageSize || 10,
      params?.LocationId ?? "all",
      params?.IsFeature ?? "all",
      params?.Search || "",
    ],
    queryFn: () => getProjects(params),
    enabled: Boolean(accessToken),
  });
}

export function useProjectByIdQuery(
  id?: number | null,
  isOpen?: boolean,
  currency: string = "USD"
) {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [...PROJECTS_QUERY_KEY, "single", id, currency],
    queryFn: async () => {
      const res = await getProjectById(id!, "en", currency);
      return res.data;
    },
    enabled: Boolean(accessToken) && Boolean(isOpen) && typeof id === "number" && id > 0,
  });
}

export function useLocalizedProjectQuery(id?: number | null, isOpen?: boolean) {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [...PROJECTS_QUERY_KEY, "details", id],
    queryFn: () => getFullLocalizedProject(id!),
    enabled: Boolean(accessToken) && Boolean(isOpen) && typeof id === "number" && id > 0,
  });
}

export function useCreateProjectMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      payload,
      initialImages,
    }: {
      payload: CreateProjectRequestDto;
      initialImages?: File[];
    }) => {
      const res = await createProject(payload);
      if (!res.success || !res.data) {
        throw new Error(res.message || "Failed to create project");
      }
      const newId = res.data;

      if (initialImages && initialImages.length > 0) {
        await uploadProjectImages(newId, initialImages);
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Project created successfully");
      await queryClient.invalidateQueries({
        queryKey: PROJECTS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: PROJECTS_QUERY_KEY,
        type: "active",
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUpdateProjectMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      payload,
      removedFacilityIds,
    }: {
      payload: UpdateProjectRequestDto;
      removedFacilityIds?: number[];
    }) => {
      const res = await updateProject(payload);
      if (!res.success) {
        throw new Error(res.message || "Failed to update project");
      }

      if (removedFacilityIds && removedFacilityIds.length > 0) {
        await Promise.allSettled(
          removedFacilityIds.map((facId) =>
            deleteProjectFacility(payload.id, facId)
          )
        );
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Project updated successfully");
      await queryClient.invalidateQueries({
        queryKey: PROJECTS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: PROJECTS_QUERY_KEY,
        type: "active",
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useDeleteProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await deleteProject(id);
      if (!res.success) {
        throw new Error(res.message || "Failed to delete project");
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Project deleted successfully");
      await queryClient.invalidateQueries({
        queryKey: PROJECTS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: PROJECTS_QUERY_KEY,
        type: "active",
      });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUploadProjectImagesMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, files }: { id: number; files: File[] }) => {
      const res = await uploadProjectImages(id, files);
      if (!res.success) {
        throw new Error(res.message || "Failed to upload images");
      }
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Images uploaded successfully");
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useDeleteProjectImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, url }: { id: number; url: string }) => {
      const res = await deleteProjectImage(id, url);
      if (!res.success) {
        throw new Error(res.message || "Failed to delete image");
      }
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Image deleted successfully");
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

