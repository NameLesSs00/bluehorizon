import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createFacility,
  deleteFacility,
  getFacilities,
  getFacilityById,
  updateFacility,
} from "@/clientApi/facilitiesApi";
import {
  CreateFacilityRequestDto,
  UpdateFacilityRequestDto,
} from "@/models/facility";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

export const FACILITIES_QUERY_KEY = ["facilities"] as const;

export function useFacilitiesQuery(language?: string) {
  return useQuery({
    queryKey: [...FACILITIES_QUERY_KEY, language],
    queryFn: () => getFacilities(language),
    staleTime: 1000 * 60 * 2,
  });
}

export function useFacilityByIdQuery(id: number, language?: string) {
  return useQuery({
    queryKey: [...FACILITIES_QUERY_KEY, id, language],
    queryFn: () => getFacilityById(id, language),
    enabled: id > 0,
  });
}

export function useCreateFacilityMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateFacilityRequestDto) => createFacility(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FACILITIES_QUERY_KEY });
      toast.success("Project facility created successfully.");
      onSuccessCallback?.();
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(error, "Failed to create project facility.")
      );
    },
  });
}

export function useUpdateFacilityMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateFacilityRequestDto) => updateFacility(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FACILITIES_QUERY_KEY });
      toast.success("Project facility updated successfully.");
      onSuccessCallback?.();
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(error, "Failed to update project facility.")
      );
    },
  });
}

export function useDeleteFacilityMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteFacility(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FACILITIES_QUERY_KEY });
      toast.success("Project facility deleted successfully.");
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(error, "Failed to delete project facility.")
      );
    },
  });
}

