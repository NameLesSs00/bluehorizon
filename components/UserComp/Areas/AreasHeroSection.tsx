import Image from "next/image";
import Link from "next/link";

export default function AreasHeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Areas/heroAreaImage.jpg"
          alt="Areas in Hurghada and the Red Sea"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Specified Linear Gradient Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(90deg, #145C4B 31.77%, rgba(20, 92, 75, 0.8) 46.15%, rgba(20, 92, 75, 0) 80.77%)",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-20 mx-auto max-w-[1536px] px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[13px] font-normal text-white/85"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <Link
            href="/"
            className="transition-colors hover:text-white"
          >
            Home
          </Link>
          <span className="text-white/60">/</span>
          <span className="font-semibold text-white">Areas</span>
        </nav>

        {/* Heading & Subtitle */}
        <div className="mt-8 sm:mt-12">
          <h1
            className="text-[44px] font-bold leading-none tracking-[-0.02em] text-white sm:text-[56px] lg:text-[64px]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Areas
          </h1>

          <p
            className="mt-6 max-w-xl text-[15px] font-normal leading-[1.65] text-white/95 sm:text-[16px]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Discover the Red Sea&apos;s most desirable communities and find the
            area that fits the way you want to live.
          </p>
        </div>
      </div>
    </section>
  );
}

