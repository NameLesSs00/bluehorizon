import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createProjectType,
  deleteProjectType,
  getProjectTypeById,
  getProjectTypes,
  updateProjectType,
} from "@/clientApi/projectTypesApi";
import {
  CreateProjectTypeRequestDto,
  ProjectTypesQueryParams,
  UpdateProjectTypeRequestDto,
} from "@/models/projectType";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

export const PROJECT_TYPES_QUERY_KEY = ["projectTypes"] as const;

export function useProjectTypesQuery(params?: ProjectTypesQueryParams) {
  return useQuery({
    queryKey: [...PROJECT_TYPES_QUERY_KEY, params],
    queryFn: () => getProjectTypes(params),
    staleTime: 0,
  });
}

export function useProjectTypeByIdQuery(id: number, language?: string) {
  return useQuery({
    queryKey: [...PROJECT_TYPES_QUERY_KEY, id, language],
    queryFn: () => getProjectTypeById(id, language),
    enabled: id > 0,
  });
}

export function useCreateProjectTypeMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProjectTypeRequestDto) =>
      createProjectType(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROJECT_TYPES_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: PROJECT_TYPES_QUERY_KEY,
        type: "active",
      });
      toast.success("Project type created successfully.");
      onSuccessCallback?.();
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Failed to create project type."));
    },
  });
}

export function useUpdateProjectTypeMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateProjectTypeRequestDto;
    }) => updateProjectType(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROJECT_TYPES_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: PROJECT_TYPES_QUERY_KEY,
        type: "active",
      });
      toast.success("Project type updated successfully.");
      onSuccessCallback?.();
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Failed to update project type."));
    },
  });
}

export function useDeleteProjectTypeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteProjectType(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROJECT_TYPES_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: PROJECT_TYPES_QUERY_KEY,
        type: "active",
      });
      toast.success("Project type deleted successfully.");
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Failed to delete project type."));
    },
  });
}
