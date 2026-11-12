import Link from "next/link";
import Image from "next/image";

export default function StandaloneCtaSection() {
  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 mb-12 sm:mb-16">
      <div className="relative overflow-hidden rounded-[24px] sm:rounded-[28px] bg-[#0F473A] p-8 sm:p-12 lg:p-14 text-white shadow-xl">
        {/* Subtle decorative glow */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/Locations/ctaBackGound.png"
            alt="Background pattern"
            fill
            sizes="(max-width: 1360px) 100vw, 1360px"
            className="object-cover object-center"
          />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Content */}
          <div className="max-w-2xl">
            <span
              className="text-xs font-bold uppercase tracking-widest text-[#E8F1EC]/80"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Need Immediate Assistance?
            </span>

            <h2
              className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Talk to Our Sales Team
            </h2>

            <p
              className="mt-3 text-xs sm:text-sm lg:text-base leading-relaxed text-white/80"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Our property advisors are ready to help you explore available
              standalone units, provide detailed information, and arrange private
              viewings to find the right property for you.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Link
              href="https://wa.me/201000004570"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-[12px] bg-white px-6 py-3.5 text-center text-xs sm:text-sm font-semibold text-[#145C4B] shadow-sm transition-colors hover:bg-white/90"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              WhatsApp Chat
            </Link>

            <Link
              href="tel:+201000004570"
              className="flex items-center justify-center rounded-[12px] border border-white px-6 py-3.5 text-center text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-white/10"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Call +20 100 000 4570
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
