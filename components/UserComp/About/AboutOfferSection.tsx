import Image from "next/image";

interface ServiceOffer {
  icon: string;
  title: string;
  description: string;
}

const OFFERS: ServiceOffer[] = [
  {
    icon: "/aboutus/ic (10).svg",
    title: "Exclusive Off-Plan Projects",
    description:
      "Direct launch access to top master-planned coastal resorts and gated communities with zero buyer commission.",
  },
  {
    icon: "/aboutus/ic (11).svg",
    title: "Standalone Resale Villas",
    description:
      "Vetted luxury homes, standalone beachfront villas and ready-to-move twin houses across prime destinations.",
  },
  {
    icon: "/aboutus/ic (12).svg",
    title: "High-Yield Rental Management",
    description:
      "Complete hands-free rental services including guest management, short-term holiday leasing and regular payouts.",
  },
  {
    icon: "/aboutus/ic (13).svg",
    title: "Legal & Investment Advisory",
    description:
      "In-house legal experts reviewing ownership deeds, developer contracts and tax guidance for foreign investors.",
  },
  {
    icon: "/aboutus/ic (14).svg",
    title: "Valuation & Market Insights",
    description:
      "Data-driven valuation models and quarterly market reports helping buyers time their entry and exit points.",
  },
  {
    icon: "/aboutus/ic (15).svg",
    title: "VIP Concierge & Relocation",
    description:
      "Dedicated assistance for international buyers including airport transfers, site inspections and utility setup.",
  },
];

export default function AboutOfferSection() {
  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p
            className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#145C4B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            TAILORED SOLUTIONS
          </p>

          <h2
            className="mt-2 text-[28px] sm:text-[36px] font-bold leading-tight tracking-tight text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            What We Offer?
          </h2>
        </div>

        <p
          className="max-w-md text-[14px] sm:text-[15px] font-normal leading-relaxed text-[#6B7570] md:text-right lg:text-left"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Comprehensive end-to-end services tailored for homebuyers, private
          owners and institutional real estate investors.
        </p>
      </div>

      {/* 6 Offer Cards */}
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {OFFERS.map((offer) => (
          <div
            key={offer.title}
            className="flex flex-col justify-between rounded-[24px] border border-[#E1E7E3] bg-white p-7 sm:p-8 transition-all duration-200 hover:border-[#145C4B]/40 hover:shadow-xs"
          >
            <div>
              <div className="relative h-11 w-11 shrink-0">
                <Image
                  src={offer.icon}
                  alt={offer.title}
                  width={44}
                  height={44}
                  className="h-11 w-11 object-contain"
                />
              </div>

              <h3
                className="mt-5 text-[18px] sm:text-[19px] font-bold text-[#202326]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {offer.title}
              </h3>

              <p
                className="mt-2.5 text-[13px] sm:text-[14px] font-normal leading-[1.65] text-[#6B7570]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {offer.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

