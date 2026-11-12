"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createProjectLocation,
  deleteProjectLocation,
  updateProjectLocation,
  uploadProjectLocationImages,
  uploadProjectLocationVideo,
} from "@/clientApi/projectLocationsApi";
import { ProjectLocationFormPayload } from "@/models/projectLocation";
import { showApiErrorToast } from "@/shared/utils/errorHandler";
import { PROJECT_LOCATIONS_QUERY_KEY } from "./useProjectLocationsQueries";

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
      const rawData = res.data as unknown;
      const newId =
        typeof rawData === "number"
          ? rawData
          : (rawData as { id?: number })?.id ?? Number(rawData);

      if (initialImages && initialImages.length > 0) {
        await uploadProjectLocationImages(newId, initialImages);
      }
      if (initialVideo) {
        await uploadProjectLocationVideo(newId, initialVideo);
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Location created successfully");
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
    onSuccess: async (res) => {
      toast.success(res.message || "Location updated successfully");
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
    onSuccess: async (res) => {
      toast.success(res.message || "Location deleted successfully");
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

export * from "./useProjectLocationMediaMutations";
