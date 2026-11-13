import Image from "next/image";
import Link from "next/link";

export default function ContactHeroSection() {
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
        <span className="text-[#6B7570]/60">&gt;</span>
        <span className="font-semibold text-[#202326]">Contact Us</span>
      </nav>

      {/* Hero Banner Card */}
      <div className="relative flex min-h-[360px] items-center overflow-hidden rounded-[24px] sm:min-h-[400px] sm:rounded-[32px] lg:min-h-[440px]">
        {/* Background Miniature House Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/ContactUs/hero.png"
            alt="Contact Blue Horizon Real Estate"
            fill
            priority
            sizes="(max-width: 1360px) 100vw, 1360px"
            className="object-cover object-center"
          />
        </div>

        {/* Specified Linear Gradient Overlay for Text Readability */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(15, 71, 58, 0) 30.77%, #0F473A 100%)"
          }}
        />

        {/* Hero Content */}
        <div className="relative z-20 w-full p-6 sm:p-10 lg:p-14">
          <div className="max-w-xl">
            {/* Pill Tag */}
            <span
              className="inline-block rounded-full border border-white/20 bg-[#0F473A]/85 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#E8F1EC]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              WE&apos;RE HERE TO HELP
            </span>

            {/* Main Headline */}
            <h1
              className="mt-4 text-[32px] font-bold leading-[1.14] tracking-[-0.02em] text-white sm:text-[42px] lg:text-[48px]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Get in Touch with Us
            </h1>

            {/* Subtitle */}
            <p
              className="mt-4 max-w-lg text-[14px] font-normal leading-[1.65] text-white/90 sm:text-[15px]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              We are here to help you find your dream luxury property across
              prime coastal and urban destinations. Reach out for
              consultations, site visits, or investment guidance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

