import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createService,
  deleteService,
  getServiceById,
  getServices,
  updateService,
} from "@/clientApi/servicesApi";
import {
  CreateServiceRequestDto,
  UpdateServiceRequestDto,
} from "@/models/service";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

export const SERVICES_QUERY_KEY = ["services"] as const;

export function useServicesQuery(language?: string) {
  return useQuery({
    queryKey: [...SERVICES_QUERY_KEY, language],
    queryFn: () => getServices(language),
    staleTime: 1000 * 60 * 2,
  });
}

export function useServiceByIdQuery(id: number, language?: string) {
  return useQuery({
    queryKey: [...SERVICES_QUERY_KEY, id, language],
    queryFn: () => getServiceById(id, language),
    enabled: id > 0,
  });
}

export function useCreateServiceMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateServiceRequestDto) => createService(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SERVICES_QUERY_KEY });
      toast.success("Property service created successfully.");
      onSuccessCallback?.();
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(error, "Failed to create property service.")
      );
    },
  });
}

export function useUpdateServiceMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateServiceRequestDto) => updateService(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SERVICES_QUERY_KEY });
      toast.success("Property service updated successfully.");
      onSuccessCallback?.();
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(error, "Failed to update property service.")
      );
    },
  });
}

export function useDeleteServiceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SERVICES_QUERY_KEY });
      toast.success("Property service deleted successfully.");
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(error, "Failed to delete property service.")
      );
    },
  });
}

