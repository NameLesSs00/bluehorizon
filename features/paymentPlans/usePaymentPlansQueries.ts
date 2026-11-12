"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createPaymentPlan,
  deletePaymentPlan,
  fetchPaymentPlanById,
  fetchPaymentPlans,
  updatePaymentPlan,
} from "@/clientApi/paymentPlansApi";
import {
  CreatePaymentPlanPayload,
  PaymentPlanListParams,
  UpdatePaymentPlanPayload,
} from "@/models/paymentPlan";
import { showApiErrorToast } from "@/shared/utils/errorHandler";
import { useAdminAuthStore } from "@/features/admin/useAdminAuthStore";

export const PAYMENT_PLANS_QUERY_KEY = ["payment-plans"] as const;

export function usePaymentPlansQuery(
  params: PaymentPlanListParams,
  enabled: boolean = true
) {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [
      ...PAYMENT_PLANS_QUERY_KEY,
      params.projectId,
      params.PaymentType || "",
      params.Status ?? "",
      params.SearchTerm || "",
      params.Currency || "USD",
      params.PageNumber || 1,
      params.PageSize || 10,
    ],
    queryFn: () => fetchPaymentPlans(params),
    enabled: Boolean(accessToken) && Boolean(params.projectId) && enabled,
    staleTime: 0,
  });
}

export function usePaymentPlanByIdQuery(
  projectId: number,
  id?: number | null,
  currency: string = "USD"
) {
  const accessToken = useAdminAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [...PAYMENT_PLANS_QUERY_KEY, "single", projectId, id, currency],
    queryFn: () => fetchPaymentPlanById(projectId, id!, currency),
    enabled: Boolean(accessToken) && Boolean(projectId) && Boolean(id),
  });
}

export function useCreatePaymentPlanMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePaymentPlanPayload) => createPaymentPlan(payload),
    onSuccess: async (_, variables) => {
      toast.success("Payment plan created successfully");
      await queryClient.invalidateQueries({
        queryKey: [...PAYMENT_PLANS_QUERY_KEY, variables.projectId],
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: [...PAYMENT_PLANS_QUERY_KEY, variables.projectId],
        type: "active",
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useUpdatePaymentPlanMutation(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePaymentPlanPayload) => updatePaymentPlan(payload),
    onSuccess: async (_, variables) => {
      toast.success("Payment plan updated successfully");
      await queryClient.invalidateQueries({
        queryKey: [...PAYMENT_PLANS_QUERY_KEY, variables.projectId],
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: [...PAYMENT_PLANS_QUERY_KEY, variables.projectId],
        type: "active",
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}

export function useDeletePaymentPlanMutation(projectId: number, onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePaymentPlan(projectId, id),
    onSuccess: async () => {
      toast.success("Payment plan deleted successfully");
      await queryClient.invalidateQueries({
        queryKey: [...PAYMENT_PLANS_QUERY_KEY, projectId],
        refetchType: "all",
      });
      queryClient.refetchQueries({
        queryKey: [...PAYMENT_PLANS_QUERY_KEY, projectId],
        type: "active",
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      showApiErrorToast(error);
    },
  });
}
