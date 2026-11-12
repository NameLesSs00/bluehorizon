"use client";

import Image from "next/image";

export default function LocationsCtaSection() {
  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
      <div className="relative overflow-hidden rounded-[24px] sm:rounded-[28px] bg-[#0F473A] shadow-xl">
        {/* Topographic Background Graphic */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/Locations/ctaBackGound.png"
            alt="Background pattern"
            fill
            sizes="(max-width: 1360px) 100vw, 1360px"
            className="object-cover object-center"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 p-8 sm:p-12 lg:p-14">
          <div className="max-w-2xl">
            <span
              className="text-[11px] font-bold uppercase tracking-wider text-[#E8F1EC]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              NEED CUSTOM LOCATION ADVICE?
            </span>

            <h2
              className="mt-3 text-2xl sm:text-3xl lg:text-[34px] font-bold text-white leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Speak with Our Location Specialists
            </h2>

            <p
              className="mt-3 text-sm sm:text-base leading-relaxed text-white/85 max-w-xl"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Get unbiased guidance on market trends, compound pricing, and
              private site tour arrangements.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0">
            <a
              href="https://wa.me/201000004570"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-xs sm:text-sm font-semibold text-[#202326] shadow-sm transition-colors hover:bg-[#F3F5F3]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              WhatsApp Chat
            </a>

            <a
              href="tel:+201000004570"
              className="inline-flex items-center justify-center rounded-full border border-white px-7 py-3 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-white/10"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Call Agent
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

