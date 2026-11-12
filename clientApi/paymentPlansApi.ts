import { apiClient } from "./apiConfig";
import { ApiResponse } from "@/models/admin";
import {
  CreatePaymentPlanPayload,
  PaymentPlanItem,
  PaymentPlanListParams,
  PaymentPlansResponse,
  UpdatePaymentPlanPayload,
} from "@/models/paymentPlan";

export async function fetchPaymentPlans(
  params: PaymentPlanListParams
): Promise<PaymentPlansResponse> {
  const { projectId, ...queryParams } = params;

  const response = await apiClient.get<ApiResponse<PaymentPlansResponse>>(
    `/api/projects/${projectId}/payment-plans`,
    { params: queryParams }
  );

  if (response.data && response.data.data) {
    return response.data.data;
  }

  return {
    items: [],
    pageNumber: 1,
    totalPages: 1,
    totalCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  };
}

export async function fetchPaymentPlanById(
  projectId: number,
  id: number,
  currency?: string
): Promise<PaymentPlanItem | null> {
  const response = await apiClient.get<ApiResponse<PaymentPlanItem>>(
    `/api/projects/${projectId}/payment-plans/${id}`,
    {
      params: currency ? { currency } : undefined,
    }
  );

  return response.data?.data ?? null;
}

export async function createPaymentPlan(
  payload: CreatePaymentPlanPayload
): Promise<number> {
  const { projectId, ...body } = payload;

  const response = await apiClient.post<ApiResponse<number>>(
    `/api/projects/${projectId}/payment-plans`,
    body
  );

  return response.data?.data ?? 0;
}

export async function updatePaymentPlan(
  payload: UpdatePaymentPlanPayload
): Promise<boolean> {
  const { projectId, id, ...body } = payload;

  const response = await apiClient.put<ApiResponse<boolean>>(
    `/api/projects/${projectId}/payment-plans/${id}`,
    {
      id,
      projectId,
      ...body,
    }
  );

  return response.data?.data ?? true;
}

export async function deletePaymentPlan(
  projectId: number,
  id: number
): Promise<boolean> {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    `/api/projects/${projectId}/payment-plans/${id}`
  );

  return response.data?.data ?? true;
}

