"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createBlog,
  deleteBlog,
  deleteBlogImage,
  deleteBlogSectionImage,
  getBlogs,
  updateBlog,
  uploadBlogImage,
  uploadBlogSectionImage,
} from "@/clientApi/blogsApi";
import {
  BlogsQueryParams,
  CreateBlogRequestDto,
  UpdateBlogRequestDto,
} from "@/models/blog";
import { showApiErrorToast } from "@/shared/utils/errorHandler";
import { useAdminAuthStore } from "@/features/admin/useAdminAuthStore";

export const BLOGS_QUERY_KEY = ["blogs"] as const;

export function useBlogsQuery(params?: BlogsQueryParams) {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [
      ...BLOGS_QUERY_KEY,
      params?.Language || "en",
      params?.PageNumber || 1,
      params?.PageSize || 10,
    ],
    queryFn: () => getBlogs(params),
    enabled: Boolean(accessToken),
  });
}

export function useCreateBlogMutation(
  onSuccessCallback?: (createdId: number) => void
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateBlogRequestDto) => {
      const res = await createBlog(payload);
      if (!res.success) {
        const errMsg =
          Array.isArray(res.errors) && res.errors.length > 0
            ? res.errors.join(" | ")
            : res.message || "Failed to create blog post";
        throw new Error(errMsg);
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Blog created successfully");
      await queryClient.invalidateQueries({
        queryKey: BLOGS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: BLOGS_QUERY_KEY,
        type: "active",
      });
      onSuccessCallback?.(Number(res.data));
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUpdateBlogMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateBlogRequestDto) => {
      const res = await updateBlog(payload);
      if (!res.success) {
        const errMsg =
          Array.isArray(res.errors) && res.errors.length > 0
            ? res.errors.join(" | ")
            : res.message || "Failed to update blog post";
        throw new Error(errMsg);
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Blog updated successfully");
      await queryClient.invalidateQueries({
        queryKey: BLOGS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: BLOGS_QUERY_KEY,
        type: "active",
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useDeleteBlogMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await deleteBlog(id);
      if (!res.success) {
        const errMsg =
          Array.isArray(res.errors) && res.errors.length > 0
            ? res.errors.join(" | ")
            : res.message || "Failed to delete blog";
        throw new Error(errMsg);
      }
      return res;
    },
    onSuccess: async (res) => {
      toast.success(res.message || "Blog deleted successfully");
      await queryClient.invalidateQueries({
        queryKey: BLOGS_QUERY_KEY,
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: BLOGS_QUERY_KEY,
        type: "active",
      });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUploadBlogImageMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, file }: { id: number; file: File }) => {
      const res = await uploadBlogImage(id, file);
      if (!res.success) {
        throw new Error(res.message || "Failed to upload cover image");
      }
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Cover image uploaded");
      queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useDeleteBlogImageMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await deleteBlogImage(id);
      if (!res.success) {
        throw new Error(res.message || "Failed to delete cover image");
      }
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Cover image deleted");
      queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUploadBlogSectionImageMutation(
  onSuccessCallback?: () => void
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      sectionId,
      file,
    }: {
      id: number;
      sectionId: number;
      file: File;
    }) => {
      const res = await uploadBlogSectionImage(id, sectionId, file);
      if (!res.success) {
        throw new Error(res.message || "Failed to upload section image");
      }
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Section image uploaded");
      queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useDeleteBlogSectionImageMutation(
  onSuccessCallback?: () => void
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      sectionId,
    }: {
      id: number;
      sectionId: number;
    }) => {
      const res = await deleteBlogSectionImage(id, sectionId);
      if (!res.success) {
        throw new Error(res.message || "Failed to delete section image");
      }
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Section image deleted");
      queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

