import Link from "next/link";

export default function AboutCtaSection() {
  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] bg-[#0F473A] px-8 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16">
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Left Column */}
          <div className="max-w-2xl">
            <span
              className="inline-block rounded-full bg-[#0B3B30] border border-white/20 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#E8F1EC]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              GET IN TOUCH TODAY
            </span>

            <h2
              className="mt-4 text-[28px] sm:text-[36px] lg:text-[40px] font-bold leading-[1.18] tracking-[-0.02em] text-white"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Ready to Find Your Next Luxury Home or High-Yield Investment?
            </h2>

            <p
              className="mt-3.5 text-[14px] sm:text-[15px] font-normal leading-[1.65] text-[#E8F1EC]/85"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Speak with our real estate specialists today for a private
              consultation, virtual walkthrough or customized investment
              portfolio presentation.
            </p>
          </div>

          {/* Right Column Action Buttons */}
          <div className="flex shrink-0 flex-col gap-3.5 sm:flex-row lg:flex-col w-full sm:w-auto">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-[14px] font-semibold text-[#145C4B] transition-all hover:bg-[#F3F5F3] text-center w-full sm:w-60"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Schedule a Call
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-full bg-[#145C4B] border border-white/25 px-8 py-3.5 text-[14px] font-medium text-white transition-all hover:bg-[#0B3B30] text-center w-full sm:w-60"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Explore Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

