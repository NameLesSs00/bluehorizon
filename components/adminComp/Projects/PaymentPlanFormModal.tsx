"use client";

import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import {
  CreatePaymentPlanPayload,
  PaymentPlanItem,
  PaymentPlanStatus,
  PaymentPlanType,
  UpdatePaymentPlanPayload,
} from "@/models/paymentPlan";

interface PaymentPlanFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: number;
  planToEdit: PaymentPlanItem | null;
  onSubmitCreate: (payload: CreatePaymentPlanPayload) => void;
  onSubmitUpdate: (payload: UpdatePaymentPlanPayload) => void;
  isSubmitting: boolean;
}

export default function PaymentPlanFormModal({
  isOpen,
  onClose,
  projectId,
  planToEdit,
  onSubmitCreate,
  onSubmitUpdate,
  isSubmitting,
}: PaymentPlanFormModalProps) {
  const [paymentType, setPaymentType] = useState<PaymentPlanType>("Installment");
  const [commissionRate, setCommissionRate] = useState<number>(0);
  const [status, setStatus] = useState<PaymentPlanStatus>(0);
  const [downPaymentAmountUSD, setDownPaymentAmountUSD] = useState<number>(0);
  const [installmentYears, setInstallmentYears] = useState<number>(0);
  const [installmentMonths, setInstallmentMonths] = useState<number>(0);

  useEffect(() => {
    if (planToEdit) {
      setPaymentType(
        planToEdit.paymentType.toLowerCase() === "cash" ? "Cash" : "Installment"
      );
      setCommissionRate(planToEdit.commissionRate || 0);
      setStatus(
        planToEdit.status.toLowerCase() === "sold" ||
          String(planToEdit.status) === "1"
          ? 1
          : 0
      );
      setDownPaymentAmountUSD(planToEdit.downPayment?.usd || 0);
      setInstallmentYears(planToEdit.installmentYears || 0);
      setInstallmentMonths(planToEdit.installmentMonths || 0);
    } else {
      setPaymentType("Installment");
      setCommissionRate(0);
      setStatus(0);
      setDownPaymentAmountUSD(0);
      setInstallmentYears(0);
      setInstallmentMonths(0);
    }
  }, [planToEdit, isOpen]);

  if (!isOpen) return null;

  const isCash = paymentType === "Cash";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      projectId,
      paymentType,
      commissionRate: Number(commissionRate) || 0,
      status,
      downPaymentAmountUSD: isCash ? 0 : Number(downPaymentAmountUSD) || 0,
      installmentYears: isCash ? 0 : Number(installmentYears) || 0,
      installmentMonths: isCash ? 0 : Number(installmentMonths) || 0,
    };

    if (planToEdit) {
      onSubmitUpdate({
        id: planToEdit.id,
        ...payload,
      });
    } else {
      onSubmitCreate(payload);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#E2E8F3] pb-4">
          <h3 className="text-[17px] font-semibold text-[#202326]">
            {planToEdit ? "Edit Payment Plan" : "Add Payment Plan"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-[#65706B] hover:bg-[#F0F3FA] hover:text-[#202326]"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Payment Type Selection */}
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-[#202326]">
              Payment Type *
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentType("Cash")}
                className={`rounded-xl border py-2.5 text-[13px] font-semibold transition-all ${
                  isCash
                    ? "border-[#2B5FA6] bg-[#2B5FA6] text-white"
                    : "border-[#D0D9EA] bg-white text-[#202326] hover:bg-[#F0F3FA]"
                }`}
              >
                Cash
              </button>
              <button
                type="button"
                onClick={() => setPaymentType("Installment")}
                className={`rounded-xl border py-2.5 text-[13px] font-semibold transition-all ${
                  !isCash
                    ? "border-[#2B5FA6] bg-[#2B5FA6] text-white"
                    : "border-[#D0D9EA] bg-white text-[#202326] hover:bg-[#F0F3FA]"
                }`}
              >
                Installment
              </button>
            </div>
          </div>

          {/* Status and Commission Rate */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-[12px] font-medium text-[#202326]">
                Status *
              </label>
              <select
                value={status}
                onChange={(e) =>
                  setStatus(Number(e.target.value) as PaymentPlanStatus)
                }
                className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[13px] text-[#202326] focus:border-[#2B5FA6] focus:outline-none"
              >
                <option value={0}>Approved</option>
                <option value={1}>Sold</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-[12px] font-medium text-[#202326]">
                Commission Rate (%) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={commissionRate}
                onChange={(e) => setCommissionRate(parseFloat(e.target.value) || 0)}
                placeholder="e.g. 5"
                className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[13px] text-[#202326] focus:border-[#2B5FA6] focus:outline-none"
              />
            </div>
          </div>

          {/* Conditional Installment Fields */}
          {!isCash && (
            <div className="space-y-3 rounded-xl border border-[#D0D9EA] bg-[#F9F7F4] p-3.5">
              <div>
                <label className="mb-1 block text-[12px] font-medium text-[#202326]">
                  Down Payment (USD) *
                </label>
                <input
                  type="number"
                  min="0"
                  required={!isCash}
                  value={downPaymentAmountUSD}
                  onChange={(e) =>
                    setDownPaymentAmountUSD(parseFloat(e.target.value) || 0)
                  }
                  placeholder="e.g. 15000"
                  className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[13px] text-[#202326] focus:border-[#2B5FA6] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-[12px] font-medium text-[#202326]">
                    Installment Years
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={installmentYears}
                    onChange={(e) =>
                      setInstallmentYears(parseInt(e.target.value, 10) || 0)
                    }
                    placeholder="e.g. 3"
                    className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[13px] text-[#202326] focus:border-[#2B5FA6] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[12px] font-medium text-[#202326]">
                    Installment Months
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={installmentMonths}
                    onChange={(e) =>
                      setInstallmentMonths(parseInt(e.target.value, 10) || 0)
                    }
                    placeholder="e.g. 6"
                    className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[13px] text-[#202326] focus:border-[#2B5FA6] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#D0D9EA] bg-white px-4 py-2 text-[13px] font-medium text-[#65706B] hover:bg-[#F0F3FA]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-[#2B5FA6] px-5 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#1B3A6B] disabled:opacity-50"
            >
              {isSubmitting
                ? "Saving..."
                : planToEdit
                ? "Save Changes"
                : "Create Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

