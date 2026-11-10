import Image from "next/image";

interface CardContent {
  icon: string;
  title: string;
  description: string;
  points: string[];
}

const CARDS: CardContent[] = [
  {
    icon: "/aboutus/ic (4).svg",
    title: "Our Vision",
    description:
      "To be the leading, most trusted digital real estate ecosystem across the Red Sea and Egypt, seamlessly connecting homebuyers, international investors and property developers with unrivaled market intelligence.",
    points: [
      "Pioneering digital property discovery tools",
      "Elevating Egyptian coastal real estate on global stages",
    ],
  },
  {
    icon: "/aboutus/ic (5).svg",
    title: "Our Mission",
    description:
      "To empower clients with transparent advice, personalized portfolio matching and zero-friction legal protection throughout every phase of property acquisition, management and resale.",
    points: [
      "End-to-end buyer security and legal verification",
      "Maximizing capital appreciation and rental yield returns",
    ],
  },
];

export default function AboutVisionMissionSection() {
  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      {/* Section Header */}
      <div className="text-center">
        <p
          className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#145C4B]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          CORE PURPOSE
        </p>

        <h2
          className="mt-2 text-[28px] sm:text-[36px] font-bold leading-tight tracking-tight text-[#202326]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          Guided by Integrity & Innovation
        </h2>

        <p
          className="mx-auto mt-3 max-w-2xl text-[14px] sm:text-[15px] font-normal leading-relaxed text-[#6B7570]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Building long-term client trust through complete transparency and
          data-backed real estate consulting.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {CARDS.map((card) => (
          <div
            key={card.title}
            className="flex flex-col justify-between rounded-[24px] border border-[#E1E7E3] bg-white p-8 sm:p-10 transition-all duration-200 hover:border-[#145C4B]/40 hover:shadow-xs"
          >
            <div>
              {/* Icon */}
              <div className="relative h-11 w-11 shrink-0">
                <Image
                  src={card.icon}
                  alt={card.title}
                  width={44}
                  height={44}
                  className="h-11 w-11 object-contain"
                />
              </div>

              {/* Title */}
              <h3
                className="mt-5 text-[22px] sm:text-[24px] font-bold text-[#202326]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {card.title}
              </h3>

              {/* Description */}
              <p
                className="mt-3 text-[14px] sm:text-[15px] font-normal leading-[1.65] text-[#6B7570]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {card.description}
              </p>
            </div>

            {/* Checklist */}
            <ul className="mt-8 space-y-3 pt-4">
              {card.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-[#145C4B]"
                  >
                    <path
                      d="M3.75 9.75L7.5 13.5L14.25 4.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    className="text-[13px] sm:text-[14px] font-semibold text-[#202326]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

