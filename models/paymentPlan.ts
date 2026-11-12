export type PaymentPlanType = "Cash" | "Installment";

export type PaymentPlanStatus = 0 | 1; // 0 = Approved, 1 = Sold

export interface DownPaymentCurrencies {
  usd?: number | null;
  eur?: number | null;
  egp?: number | null;
  gbp?: number | null;
}

export interface PaymentPlanItem {
  id: number;
  projectId: number;
  projectName: string;
  commissionRate: number;
  installmentMonths: number;
  installmentYears?: number;
  paymentType: PaymentPlanType;
  status: "Approved" | "Sold" | string;
  downPayment: DownPaymentCurrencies | null;
  createdBy?: string | null;
  createdAt?: string;
  updatedBy?: string | null;
  updatedAt?: string | null;
}

export interface PaymentPlanListParams {
  projectId: number;
  PaymentType?: string;
  Status?: number;
  SearchTerm?: string;
  SortBy?: string;
  SortDirection?: string;
  Currency?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface CreatePaymentPlanPayload {
  projectId: number;
  paymentType: PaymentPlanType;
  downPaymentAmountUSD: number;
  installmentYears: number;
  installmentMonths: number;
  commissionRate: number;
  status: PaymentPlanStatus;
}

export interface UpdatePaymentPlanPayload {
  id: number;
  projectId: number;
  paymentType: PaymentPlanType;
  downPaymentAmountUSD: number;
  installmentYears: number;
  installmentMonths: number;
  commissionRate: number;
  status: PaymentPlanStatus;
}

export interface PaymentPlansResponse {
  items: PaymentPlanItem[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

