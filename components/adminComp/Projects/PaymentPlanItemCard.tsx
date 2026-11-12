"use client";

import { useState } from "react";
import { FiEdit2, FiTrash2, FiClock, FiPercent, FiDollarSign } from "react-icons/fi";
import { PaymentPlanItem } from "@/models/paymentPlan";

interface PaymentPlanItemCardProps {
  plan: PaymentPlanItem;
  onEdit: (plan: PaymentPlanItem) => void;
  onDelete: (id: number) => void;
  isDeleting: boolean;
}

export default function PaymentPlanItemCard({
  plan,
  onEdit,
  onDelete,
  isDeleting,
}: PaymentPlanItemCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const isCash = plan.paymentType.toLowerCase() === "cash";
  const isApproved = plan.status.toLowerCase() === "approved";

  const downPaymentUSD = plan.downPayment?.usd ?? 0;
  const durationText = [
    plan.installmentYears ? `${plan.installmentYears} yr` : null,
    plan.installmentMonths ? `${plan.installmentMonths} mo` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex flex-col justify-between rounded-xl border border-[#DCE2DE] bg-white p-4 shadow-2xs transition-all hover:border-[#145C4B]/40">
      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${
                isCash
                  ? "border-blue-200 bg-blue-50 text-blue-700"
                  : "border-emerald-200 bg-emerald-50 text-emerald-700"
              }`}
            >
              {plan.paymentType}
            </span>

            <span
              className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium ${
                isApproved
                  ? "border-teal-200 bg-teal-50 text-teal-800"
                  : "border-amber-200 bg-amber-50 text-amber-800"
              }`}
            >
              {plan.status}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onEdit(plan)}
              className="rounded-lg p-1.5 text-[#65706B] transition-colors hover:bg-[#F3F5F3] hover:text-[#202326]"
              title="Edit Payment Plan"
            >
              <FiEdit2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="rounded-lg p-1.5 text-red-500 transition-colors hover:bg-red-50 hover:text-red-700"
              title="Delete Payment Plan"
            >
              <FiTrash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 text-[12px]">
          <div className="rounded-lg bg-[#FAF8F5] p-2.5">
            <span className="flex items-center gap-1 font-medium text-[#65706B]">
              <FiPercent className="h-3 w-3" />
              Commission
            </span>
            <span className="mt-0.5 block font-semibold text-[#202326]">
              {plan.commissionRate}%
            </span>
          </div>

          {!isCash ? (
            <>
              <div className="rounded-lg bg-[#FAF8F5] p-2.5">
                <span className="flex items-center gap-1 font-medium text-[#65706B]">
                  <FiDollarSign className="h-3 w-3" />
                  Down Payment
                </span>
                <span className="mt-0.5 block font-semibold text-[#202326]">
                  ${downPaymentUSD.toLocaleString()} USD
                </span>
              </div>

              <div className="col-span-2 rounded-lg bg-[#FAF8F5] p-2.5">
                <span className="flex items-center gap-1 font-medium text-[#65706B]">
                  <FiClock className="h-3 w-3" />
                  Installment Term
                </span>
                <span className="mt-0.5 block font-semibold text-[#202326]">
                  {durationText || "0 months"}
                </span>
              </div>
            </>
          ) : (
            <div className="rounded-lg bg-[#FAF8F5] p-2.5">
              <span className="flex items-center gap-1 font-medium text-[#65706B]">
                <FiDollarSign className="h-3 w-3" />
                Payment Mode
              </span>
              <span className="mt-0.5 block font-semibold text-[#202326]">
                100% Upfront Cash
              </span>
            </div>
          )}
        </div>
      </div>

      {confirmDelete && (
        <div className="mt-3 flex items-center justify-between rounded-lg border border-red-200 bg-red-50/70 p-2 text-[12px]">
          <span className="text-red-800 font-medium">Delete this plan?</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isDeleting}
              onClick={() => {
                onDelete(plan.id);
                setConfirmDelete(false);
              }}
              className="rounded bg-red-600 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-red-700 disabled:opacity-50"
            >
              {isDeleting ? "..." : "Delete"}
            </button>
            <button
              type="button"
              onClick={() => setConfirmDelete(false)}
              className="rounded border border-[#DCE2DE] bg-white px-2 py-1 text-[11px] font-medium text-[#65706B] hover:bg-[#F3F5F3]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

