import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createInfoAreaPlace,
  deleteInfoAreaPlace,
  getInfoAreaPlaceById,
  getInfoAreaPlaces,
  updateInfoAreaPlace,
} from "@/clientApi/infoAreaPlacesApi";
import {
  CreateInfoAreaPlaceRequestDto,
  InfoAreaPlacesQueryParams,
  UpdateInfoAreaPlaceRequestDto,
} from "@/models/infoAreaPlace";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

export const INFO_AREA_PLACES_QUERY_KEY = ["infoAreaPlaces"] as const;

export function useInfoAreaPlacesQuery(params?: InfoAreaPlacesQueryParams) {
  return useQuery({
    queryKey: [...INFO_AREA_PLACES_QUERY_KEY, params],
    queryFn: () => getInfoAreaPlaces(params),
    staleTime: 0,
  });
}

export function useInfoAreaPlaceByIdQuery(id: number, language?: string) {
  return useQuery({
    queryKey: [...INFO_AREA_PLACES_QUERY_KEY, id, language],
    queryFn: () => getInfoAreaPlaceById(id, language),
    enabled: id > 0,
  });
}

export function useCreateInfoAreaPlaceMutation(
  onSuccessCallback?: () => void
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateInfoAreaPlaceRequestDto) =>
      createInfoAreaPlace(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: INFO_AREA_PLACES_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: INFO_AREA_PLACES_QUERY_KEY,
        type: "active",
      });
      toast.success("Area landmark created successfully.");
      onSuccessCallback?.();
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(error, "Failed to create area landmark.")
      );
    },
  });
}

export function useUpdateInfoAreaPlaceMutation(
  onSuccessCallback?: () => void
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateInfoAreaPlaceRequestDto;
    }) => updateInfoAreaPlace(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: INFO_AREA_PLACES_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: INFO_AREA_PLACES_QUERY_KEY,
        type: "active",
      });
      toast.success("Area landmark updated successfully.");
      onSuccessCallback?.();
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(error, "Failed to update area landmark.")
      );
    },
  });
}

export function useDeleteInfoAreaPlaceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteInfoAreaPlace(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: INFO_AREA_PLACES_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: INFO_AREA_PLACES_QUERY_KEY,
        type: "active",
      });
      toast.success("Area landmark deleted successfully.");
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(error, "Failed to delete area landmark.")
      );
    },
  });
}
