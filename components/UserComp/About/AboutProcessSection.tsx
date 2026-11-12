import Image from "next/image";

interface ProcessStep {
  step: string;
  icon: string;
  title: string;
  description: string;
}

const STEPS: ProcessStep[] = [
  {
    step: "01",
    icon: "/aboutus/ic (6).svg",
    title: "Discover & Consult",
    description:
      "We analyze your lifestyle preferences and financial goals to curate a targeted shortlist of primary and coastal properties.",
  },
  {
    step: "02",
    icon: "/aboutus/ic (7).svg",
    title: "Private & Virtual Tours",
    description:
      "Experience hosted on-site walkthroughs or immersive HD 3D virtual tours with our dedicated area specialists.",
  },
  {
    step: "03",
    icon: "/aboutus/ic (8).svg",
    title: "Legal Shield & Terms",
    description:
      "Our legal advisors review contracts, developer escrow clauses and payment plans for total financial security.",
  },
  {
    step: "04",
    icon: "/aboutus/ic (9).svg",
    title: "Handover & Yield Mgmt",
    description:
      "From key collection to long-term tenant placement and property management, we stay by your side post-handover.",
  },
];

export default function AboutProcessSection() {
  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Light Gray / Green Container Card */}
      <div className="rounded-[28px] sm:rounded-[32px] bg-[#F3F5F3] border border-[#E1E7E3]/70 px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        {/* Section Header */}
        <div className="text-center">
          <p
            className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#145C4B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            STRUCTURED PROCESS
          </p>

          <h2
            className="mt-2 text-[28px] sm:text-[36px] font-bold leading-tight tracking-tight text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Your Property Journey Starts With Us
          </h2>

          <p
            className="mx-auto mt-3 max-w-xl text-[14px] sm:text-[15px] font-normal leading-relaxed text-[#6B7570]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            A streamlined 4-step path designed to eliminate stress and guarantee
            peace of mind.
          </p>
        </div>

        {/* 4 Process Cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div
              key={step.step}
              className="flex flex-col justify-between rounded-[20px] border border-[#E1E7E3] bg-white p-6 sm:p-7 transition-all duration-200 hover:border-[#145C4B]/40 hover:shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className="text-[28px] sm:text-[32px] font-bold leading-none text-[#202326]"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    {step.step}
                  </span>

                  <div className="relative h-11 w-11 shrink-0">
                    <Image
                      src={step.icon}
                      alt={step.title}
                      width={44}
                      height={44}
                      className="h-11 w-11 object-contain"
                    />
                  </div>
                </div>

                <h3
                  className="mt-5 text-[17px] sm:text-[18px] font-bold text-[#202326]"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  {step.title}
                </h3>

                <p
                  className="mt-2.5 text-[13px] font-normal leading-[1.65] text-[#6B7570]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

