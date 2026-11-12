export default function ContactCtaSection() {
  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] bg-[#0F473A] px-8 py-10 sm:px-12 sm:py-14 lg:px-14 lg:py-16 text-white">
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Left Column */}
          <div className="max-w-xl">
            <span
              className="inline-block rounded-full bg-[#0B3B30] border border-white/20 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#E8F1EC]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              NEED IMMEDIATE ANSWERS?
            </span>

            <h2
              className="mt-4 text-[28px] sm:text-[34px] lg:text-[38px] font-bold leading-[1.18] tracking-[-0.02em] text-white"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Speak to a Senior Specialist Now
            </h2>

            <p
              className="mt-3 text-[14px] sm:text-[15px] font-normal leading-[1.65] text-[#E8F1EC]/85"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Our hotline is available 6 days a week for urgent property
              inquiries and tour bookings.
            </p>
          </div>

          {/* Right Column Action Buttons */}
          <div className="flex shrink-0 flex-col gap-3.5 sm:flex-row w-full sm:w-auto">
            <a
              href="https://wa.me/201234567890"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-[12px] bg-white px-8 py-3.5 text-[14px] font-semibold text-[#145C4B] transition-all hover:bg-[#F3F5F3] text-center"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              WhatsApp Chat
            </a>

            <a
              href="tel:+201234567890"
              className="inline-flex items-center justify-center rounded-[12px]  bg-[#145C4B] border border-white/25 px-8 py-3.5 text-[14px] font-medium text-white transition-all hover:bg-[#0B3B30] text-center"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Call +20 123 456 7890
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

