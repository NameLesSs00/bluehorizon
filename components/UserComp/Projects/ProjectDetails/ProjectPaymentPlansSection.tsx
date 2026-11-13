"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPaymentPlans } from "@/clientApi/paymentPlansApi";

interface PaymentPlanDisplayItem {
  id: string | number;
  planName: string;
  badge: string;
  downPayment: string;
  installments: string;
  maintenance: string;
  cashDiscount: string;
  isFeatured?: boolean;
}

interface ProjectPaymentPlansSectionProps {
  projectId?: number;
  plans?: PaymentPlanDisplayItem[];
}

export default function ProjectPaymentPlansSection({
  projectId,
  plans: propPlans,
}: ProjectPaymentPlansSectionProps) {
  // Query real payment plans from backend API if projectId is provided
  const { data: plansData, isLoading } = useQuery({
    queryKey: ["payment-plans", "public", projectId],
    queryFn: () =>
      fetchPaymentPlans({
        projectId: projectId!,
        PageNumber: 1,
        PageSize: 10,
      }),
    enabled: typeof projectId === "number" && projectId > 0,
    staleTime: 1000 * 60 * 5,
  });

  const apiPlans: PaymentPlanDisplayItem[] = (plansData?.items || []).map(
    (item, idx) => {
      const downPaymentVal = item.downPayment?.usd
        ? `$ ${item.downPayment.usd.toLocaleString()}`
        : item.downPayment?.egp
        ? `EGP ${item.downPayment.egp.toLocaleString()}`
        : "N/A";

      const installmentText = item.installmentYears
        ? `${item.installmentYears} Years`
        : item.installmentMonths
        ? `${item.installmentMonths} Months`
        : "Flexible";

      return {
        id: item.id,
        planName: item.paymentType === "Cash" ? "Cash Plan" : `Plan 0${idx + 1}`,
        badge: item.status || item.paymentType,
        downPayment: downPaymentVal,
        installments: installmentText,
        maintenance: `${item.commissionRate || 0}%`,
        cashDiscount: item.paymentType === "Cash" ? "Available" : "N/A",
        isFeatured: idx === 0,
      };
    }
  );

  const plans = propPlans || apiPlans;

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mt-14 sm:mt-16">
      {/* Header */}
      <div className="mb-8">
        <span
          className="text-xs font-bold tracking-[0.1em] text-[#2B5FA6] uppercase"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          PURCHASE OPTIONS
        </span>
        <h2
          className="mt-1 text-2xl sm:text-3xl font-bold text-[#202326]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          Payment Plans
        </h2>
        <p
          className="mt-1 text-sm text-[#6B7570]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Compare upfront payments and installment offers designed for flexibility.
        </p>
      </div>

      {/* Plans Grid or Empty State */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-64 animate-pulse rounded-[20px] bg-[#E5ECF6]"
            />
          ))}
        </div>
      ) : plans.length === 0 ? (
        <div className="flex h-36 w-full flex-col items-center justify-center rounded-[20px] border border-[#D9E2EE] bg-white p-8 text-center">
          <p
            className="text-[15px] font-semibold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            No payment plans currently published for this project.
          </p>
          <p
            className="mt-1 text-xs text-[#6B7570]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Contact our sales team for custom installment and financing options.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isFeatured = Boolean(plan.isFeatured);

            return (
              <div
                key={plan.id}
                className={`rounded-[20px] p-6 sm:p-7 transition-all duration-200 hover:-translate-y-1 ${
                  isFeatured
                    ? "bg-[#2B5FA6] text-white shadow-md"
                    : "bg-white text-[#202326] border border-[#D9E2EE] hover:border-[#2B5FA6]/40 hover:shadow-xs"
                }`}
              >
                {/* Card Header */}
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-lg sm:text-xl font-bold ${
                      isFeatured ? "text-white" : "text-[#202326]"
                    }`}
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    {plan.planName}
                  </h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      isFeatured
                        ? "bg-white/20 text-white"
                        : "bg-[#F0F3FA] text-[#6B7570]"
                    }`}
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {plan.badge}
                  </span>
                </div>

                {/* Divider */}
                <div
                  className={`my-6 border-t ${
                    isFeatured ? "border-white/20" : "border-[#D9E2EE]"
                  }`}
                />

                {/* 2x2 Metrics Grid */}
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <span
                      className={`block text-xs font-normal ${
                        isFeatured ? "text-white/80" : "text-[#6B7570]"
                      }`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      Down Payment
                    </span>
                    <span
                      className={`mt-1 block text-2xl sm:text-3xl font-bold ${
                        isFeatured ? "text-white" : "text-[#202326]"
                      }`}
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      {plan.downPayment}
                    </span>
                  </div>

                  <div>
                    <span
                      className={`block text-xs font-normal ${
                        isFeatured ? "text-white/80" : "text-[#6B7570]"
                      }`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      Installments
                    </span>
                    <span
                      className={`mt-1 block text-2xl sm:text-3xl font-bold ${
                        isFeatured ? "text-white" : "text-[#202326]"
                      }`}
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      {plan.installments}
                    </span>
                  </div>

                  <div>
                    <span
                      className={`block text-xs font-normal ${
                        isFeatured ? "text-white/80" : "text-[#6B7570]"
                      }`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      Maintenance
                    </span>
                    <span
                      className={`mt-1 block text-2xl sm:text-3xl font-bold ${
                        isFeatured ? "text-white" : "text-[#202326]"
                      }`}
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      {plan.maintenance}
                    </span>
                  </div>

                  <div>
                    <span
                      className={`block text-xs font-normal ${
                        isFeatured ? "text-white/80" : "text-[#6B7570]"
                      }`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      Cash Discount
                    </span>
                    <span
                      className={`mt-1 block text-2xl sm:text-3xl font-bold ${
                        isFeatured ? "text-white" : "text-[#202326]"
                      }`}
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      {plan.cashDiscount}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
