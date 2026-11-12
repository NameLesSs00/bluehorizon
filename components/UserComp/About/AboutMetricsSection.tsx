import Image from "next/image";

interface MetricItem {
  icon: string;
  value: string;
  label: string;
}

const METRICS: MetricItem[] = [
  {
    icon: "/aboutus/ic.svg",
    value: "15+",
    label: "YEARS EXPERIENCE",
  },
  {
    icon: "/aboutus/ic (1).svg",
    value: "$250M+",
    label: "PROPERTY VOLUME",
  },
  {
    icon: "/aboutus/ic (2).svg",
    value: "1,200+",
    label: "HAPPY HOMEOWNERS",
  },
  {
    icon: "/aboutus/ic (3).svg",
    value: "99%",
    label: "CLIENT SATISFACTION",
  },
];

export default function AboutMetricsSection() {
  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
        {METRICS.map((metric) => (
          <div
            key={metric.label}
            className="flex flex-col items-center justify-center rounded-[22px] border border-[#E1E7E3] bg-white px-6 py-8 text-center transition-all duration-200 hover:border-[#145C4B]/40 hover:shadow-sm"
          >
            <div className="relative h-11 w-11 shrink-0">
              <Image
                src={metric.icon}
                alt={metric.label}
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
            </div>

            <div
              className="mt-4 text-[32px] sm:text-[36px] font-bold leading-none tracking-tight text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {metric.value}
            </div>

            <p
              className="mt-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#6B7570]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

