import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createPropertyCategoryItem,
  deletePropertyCategoryItem,
  getPropertyCategoryItemById,
  getPropertyCategoryItems,
  updatePropertyCategoryItem,
} from "@/clientApi/propertyCategoryItemsApi";
import {
  CreatePropertyCategoryItemRequestDto,
  PropertyCategoryItemsQueryParams,
  UpdatePropertyCategoryItemRequestDto,
} from "@/models/propertyCategoryItem";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

export const PROPERTY_CATEGORY_ITEMS_QUERY_KEY = [
  "propertyCategoryItems",
] as const;

export function usePropertyCategoryItemsQuery(
  params?: PropertyCategoryItemsQueryParams
) {
  return useQuery({
    queryKey: [...PROPERTY_CATEGORY_ITEMS_QUERY_KEY, params],
    queryFn: () => getPropertyCategoryItems(params),
    staleTime: 1000 * 60 * 2,
  });
}

export function usePropertyCategoryItemByIdQuery(
  id: number,
  language?: string
) {
  return useQuery({
    queryKey: [...PROPERTY_CATEGORY_ITEMS_QUERY_KEY, id, language],
    queryFn: () => getPropertyCategoryItemById(id, language),
    enabled: id > 0,
  });
}

export function useCreatePropertyCategoryItemMutation(
  onSuccessCallback?: () => void
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePropertyCategoryItemRequestDto) =>
      createPropertyCategoryItem(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PROPERTY_CATEGORY_ITEMS_QUERY_KEY,
      });
      toast.success("Category item created successfully.");
      onSuccessCallback?.();
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(error, "Failed to create category item.")
      );
    },
  });
}

export function useUpdatePropertyCategoryItemMutation(
  onSuccessCallback?: () => void
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdatePropertyCategoryItemRequestDto;
    }) => updatePropertyCategoryItem(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PROPERTY_CATEGORY_ITEMS_QUERY_KEY,
      });
      toast.success("Category item updated successfully.");
      onSuccessCallback?.();
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(error, "Failed to update category item.")
      );
    },
  });
}

export function useDeletePropertyCategoryItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePropertyCategoryItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PROPERTY_CATEGORY_ITEMS_QUERY_KEY,
      });
      toast.success("Category item deleted successfully.");
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(error, "Failed to delete category item.")
      );
    },
  });
}

