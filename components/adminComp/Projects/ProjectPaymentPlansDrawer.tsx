"use client";

import { useState } from "react";
import { FiPlus, FiCreditCard } from "react-icons/fi";
import AdminSlideDrawer from "@/components/adminComp/Common/AdminSlideDrawer";
import { ProjectItem } from "@/models/project";
import {
  useCreatePaymentPlanMutation,
  useDeletePaymentPlanMutation,
  usePaymentPlansQuery,
  useUpdatePaymentPlanMutation,
} from "@/features/paymentPlans/usePaymentPlansQueries";
import {
  CreatePaymentPlanPayload,
  PaymentPlanItem,
  UpdatePaymentPlanPayload,
} from "@/models/paymentPlan";
import PaymentPlanItemCard from "./PaymentPlanItemCard";
import PaymentPlanFormModal from "./PaymentPlanFormModal";

interface ProjectPaymentPlansDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectItem | null;
}

export default function ProjectPaymentPlansDrawer({
  isOpen,
  onClose,
  project,
}: ProjectPaymentPlansDrawerProps) {
  const projectId = project?.id ?? 0;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [planToEdit, setPlanToEdit] = useState<PaymentPlanItem | null>(null);

  const { data: plansData, isLoading } = usePaymentPlansQuery(
    {
      projectId,
      PageSize: 100,
    },
    isOpen && Boolean(projectId)
  );

  const createMutation = useCreatePaymentPlanMutation(() => {
    setIsModalOpen(false);
    setPlanToEdit(null);
  });

  const updateMutation = useUpdatePaymentPlanMutation(() => {
    setIsModalOpen(false);
    setPlanToEdit(null);
  });

  const deleteMutation = useDeletePaymentPlanMutation(projectId);

  if (!project) return null;

  const plans = plansData?.items ?? [];

  function handleOpenCreate() {
    setPlanToEdit(null);
    setIsModalOpen(true);
  }

  function handleOpenEdit(plan: PaymentPlanItem) {
    setPlanToEdit(plan);
    setIsModalOpen(true);
  }

  function handleCreateSubmit(payload: CreatePaymentPlanPayload) {
    createMutation.mutate(payload);
  }

  function handleUpdateSubmit(payload: UpdatePaymentPlanPayload) {
    updateMutation.mutate(payload);
  }

  return (
    <>
      <AdminSlideDrawer
        isOpen={isOpen}
        onClose={onClose}
        title="Manage Payment Plans"
        subtitle={`Payment structure for ${project.name}`}
        maxWidthClass="max-w-2xl"
      >
        <div className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-[14px] font-bold text-[#202326]">
                Available Plans ({plans.length})
              </h3>
              <p className="text-[12px] text-[#65706B]">
                Configure Cash terms and Installment payment plans for buyers.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#1B3A6B] px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#2B5FA6]"
            >
              <FiPlus className="h-4 w-4" />
              <span>Add Plan</span>
            </button>
          </div>

          {isLoading ? (
            <div className="flex h-56 items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#2B5FA6] border-t-transparent" />
                <p className="text-[12px] text-[#65706B]">Loading payment plans...</p>
              </div>
            </div>
          ) : plans.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#D0D9EA] bg-[#F9F7F4] p-12 text-center">
              <FiCreditCard className="h-10 w-10 text-[#9BA5A0]" />
              <p className="mt-3 text-[14px] font-semibold text-[#202326]">
                No payment plans configured
              </p>
              <p className="mt-1 text-[12px] text-[#65706B]">
                Click &quot;Add Plan&quot; to set up Cash or Installment options for this project.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {plans.map((plan) => (
                <PaymentPlanItemCard
                  key={plan.id}
                  plan={plan}
                  onEdit={handleOpenEdit}
                  onDelete={(id) => deleteMutation.mutate(id)}
                  isDeleting={deleteMutation.isPending}
                />
              ))}
            </div>
          )}
        </div>
      </AdminSlideDrawer>

      <PaymentPlanFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setPlanToEdit(null);
        }}
        projectId={projectId}
        planToEdit={planToEdit}
        onSubmitCreate={handleCreateSubmit}
        onSubmitUpdate={handleUpdateSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />
    </>
  );
}

