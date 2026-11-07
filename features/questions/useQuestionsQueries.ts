"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createQuestion,
  deleteQuestion,
  getQuestions,
  updateQuestion,
} from "@/clientApi/questionsApi";
import {
  CreateQuestionRequestDto,
  QuestionLanguage,
  UpdateQuestionRequestDto,
} from "@/models/faq";
import { showApiErrorToast } from "@/shared/utils/errorHandler";
import { useAdminAuthStore } from "@/features/admin/useAdminAuthStore";

export const QUESTIONS_QUERY_KEY = ["questions"] as const;

export function useQuestionsQuery(language: QuestionLanguage = "en") {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [...QUESTIONS_QUERY_KEY, language],
    queryFn: () => getQuestions(language),
    enabled: Boolean(accessToken),
  });
}

export function useCreateQuestionMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateQuestionRequestDto) => {
      const res = await createQuestion(payload);
      if (!res.success) {
        const errMsg =
          Array.isArray(res.errors) && res.errors.length > 0
            ? res.errors.join(" | ")
            : res.message || "Failed to create FAQ item";
        throw new Error(errMsg);
      }
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message || "FAQ created successfully");
      queryClient.invalidateQueries({ queryKey: QUESTIONS_QUERY_KEY });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUpdateQuestionMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateQuestionRequestDto) => {
      const res = await updateQuestion(payload);
      if (!res.success) {
        const errMsg =
          Array.isArray(res.errors) && res.errors.length > 0
            ? res.errors.join(" | ")
            : res.message || "Failed to update FAQ item";
        throw new Error(errMsg);
      }
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message || "FAQ updated successfully");
      queryClient.invalidateQueries({ queryKey: QUESTIONS_QUERY_KEY });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useDeleteQuestionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await deleteQuestion(id);
      if (!res.success) {
        const errMsg =
          Array.isArray(res.errors) && res.errors.length > 0
            ? res.errors.join(" | ")
            : res.message || "Failed to delete FAQ item";
        throw new Error(errMsg);
      }
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message || "FAQ deleted successfully");
      queryClient.invalidateQueries({ queryKey: QUESTIONS_QUERY_KEY });
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

