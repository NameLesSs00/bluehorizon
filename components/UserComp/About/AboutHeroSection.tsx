import Image from "next/image";
import Link from "next/link";

export default function AboutHeroSection() {
  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="mb-4 flex items-center gap-2 text-[13px] text-[#6B7570]"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <Link
          href="/"
          className="transition-colors hover:text-[#145C4B]"
        >
          Home
        </Link>
        <span className="text-[#6B7570]/60">/</span>
        <span className="font-semibold text-[#202326]">About Us</span>
      </nav>

      {/* Hero Banner Card */}
      <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] min-h-[440px] sm:min-h-[480px] lg:min-h-[500px] flex items-end">
        {/* Background Photo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/aboutus/hero.png"
            alt="Redefining Real Estate Excellence in the Red Sea"
            fill
            priority
            sizes="(max-width: 1360px) 100vw, 1360px"
          />
        </div>

        {/* Specified Linear Gradient Overlays */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              " linear-gradient(180deg, rgba(15, 71, 58, 0) 11.06%, rgba(15, 71, 58, 0.9) 89.42%)",
          }}
        />

        {/* Hero Content */}
        <div className="relative z-20 w-full p-6 sm:p-10 lg:p-14">
          <div className="max-w-2xl">
            {/* Pill Tag */}
            <span
              className="inline-block rounded-full bg-[#0F473A]/85 border border-white/20 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#E8F1EC]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              PREMIER REAL ESTATE CONSULTANCY
            </span>

            {/* Main Headline */}
            <h1
              className="mt-4 text-[32px] sm:text-[44px] lg:text-[52px] font-bold leading-[1.12] tracking-[-0.02em] text-white"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Redefining Real Estate Excellence in the Red Sea
            </h1>

            {/* Subtitle / Description */}
            <p
              className="mt-4 max-w-xl text-[14px] sm:text-[16px] font-normal leading-[1.65] text-white/90"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Empower your property investments with trusted guidance, seamless
              digital search and deep local expertise across Egypt&apos;s most
              sought-after coastal and urban destinations.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-[14px] font-semibold text-[#145C4B] transition-all hover:bg-[#F3F5F3]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Explore Projects
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#0F473A]/60 border border-white/30 px-7 py-3 text-[14px] font-medium text-white transition-all hover:bg-[#0F473A]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Talk to an Advisor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

