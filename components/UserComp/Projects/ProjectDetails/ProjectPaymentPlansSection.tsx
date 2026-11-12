interface PaymentPlanItem {
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
  plans?: PaymentPlanItem[];
}

const UI_PLANS: PaymentPlanItem[] = [
  {
    id: "plan-01",
    planName: "Plan 01",
    badge: "Default Plan",
    downPayment: "25%",
    installments: "6 Years",
    maintenance: "10%",
    cashDiscount: "30%",
    isFeatured: true,
  },
  {
    id: "plan-02",
    planName: "Plan 02",
    badge: "Flexible",
    downPayment: "15%",
    installments: "5 Years",
    maintenance: "10%",
    cashDiscount: "30%",
    isFeatured: false,
  },
  {
    id: "plan-03",
    planName: "Plan 03",
    badge: "Extended",
    downPayment: "10%",
    installments: "4 Years",
    maintenance: "10%",
    cashDiscount: "30%",
    isFeatured: false,
  },
];

export default function ProjectPaymentPlansSection({
  plans = UI_PLANS,
}: ProjectPaymentPlansSectionProps) {
  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mt-14 sm:mt-16">
      {/* Header */}
      <div className="mb-8">
        <span
          className="text-xs font-bold tracking-[0.1em] text-[#145C4B] uppercase"
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

      {/* 3 Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isFeatured = Boolean(plan.isFeatured);

          return (
            <div
              key={plan.id}
              className={`rounded-[20px] p-6 sm:p-7 transition-all duration-200 hover:-translate-y-1 ${
                isFeatured
                  ? "bg-[#145C4B] text-white shadow-md"
                  : "bg-white text-[#202326] border border-[#E1E7E3] hover:border-[#145C4B]/40 hover:shadow-xs"
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
                      : "bg-[#F3F5F3] text-[#6B7570]"
                  }`}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {plan.badge}
                </span>
              </div>

              {/* Divider */}
              <div
                className={`my-6 border-t ${
                  isFeatured ? "border-white/20" : "border-[#E1E7E3]"
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
    </section>
  );
}
