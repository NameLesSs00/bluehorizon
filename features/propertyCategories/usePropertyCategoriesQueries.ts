import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createPropertyCategory,
  deletePropertyCategory,
  getPropertyCategories,
  getPropertyCategoryById,
  updatePropertyCategory,
} from "@/clientApi/propertyCategoriesApi";
import {
  CreatePropertyCategoryRequestDto,
  PropertyCategoriesQueryParams,
  UpdatePropertyCategoryRequestDto,
} from "@/models/propertyCategory";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

export const PROPERTY_CATEGORIES_QUERY_KEY = ["propertyCategories"] as const;

export function usePropertyCategoriesQuery(
  params?: PropertyCategoriesQueryParams
) {
  return useQuery({
    queryKey: [...PROPERTY_CATEGORIES_QUERY_KEY, params],
    queryFn: () => getPropertyCategories(params),
    staleTime: 0,
  });
}

export function usePropertyCategoryByIdQuery(id: number, language?: string) {
  return useQuery({
    queryKey: [...PROPERTY_CATEGORIES_QUERY_KEY, id, language],
    queryFn: () => getPropertyCategoryById(id, language),
    enabled: id > 0,
  });
}

export function useCreatePropertyCategoryMutation(
  onSuccessCallback?: () => void
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePropertyCategoryRequestDto) =>
      createPropertyCategory(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROPERTY_CATEGORIES_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: PROPERTY_CATEGORIES_QUERY_KEY,
        type: "active",
      });
      toast.success("Property category created successfully.");
      onSuccessCallback?.();
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(error, "Failed to create property category.")
      );
    },
  });
}

export function useUpdatePropertyCategoryMutation(
  onSuccessCallback?: () => void
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdatePropertyCategoryRequestDto;
    }) => updatePropertyCategory(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROPERTY_CATEGORIES_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: PROPERTY_CATEGORIES_QUERY_KEY,
        type: "active",
      });
      toast.success("Property category updated successfully.");
      onSuccessCallback?.();
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(error, "Failed to update property category.")
      );
    },
  });
}

export function useDeletePropertyCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePropertyCategory(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PROPERTY_CATEGORIES_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: PROPERTY_CATEGORIES_QUERY_KEY,
        type: "active",
      });
      toast.success("Property category deleted successfully.");
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(error, "Failed to delete property category.")
      );
    },
  });
}
