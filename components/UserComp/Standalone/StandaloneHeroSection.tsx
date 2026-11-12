import Image from "next/image";
import Link from "next/link";

export default function StandaloneHeroSection() {
  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 pt-6 sm:px-6 lg:px-8">
      {/* Breadcrumb above hero banner */}
      <nav
        aria-label="Breadcrumb"
        className="mb-4 flex items-center gap-2 text-xs sm:text-sm font-medium text-[#6B7570]"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <Link href="/" className="transition-colors hover:text-[#145C4B]">
          Home
        </Link>
        <span className="text-[#6B7570]/60">/</span>
        <span className="font-semibold text-[#145C4B]">Standalone units</span>
      </nav>

      {/* Hero Banner Card */}
      <div className="relative overflow-hidden rounded-[24px] sm:rounded-[28px] min-h-[320px] sm:min-h-[380px] lg:min-h-[420px] flex items-center shadow-lg">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/Standalone.png"
            alt="Standalone properties background"
            fill
            priority
            sizes="(max-width: 1360px) 100vw, 1360px"
            className="object-cover object-center"
          />
        </div>

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
background: "linear-gradient(180deg, rgba(15, 71, 58, 0) 21.63%, #0F473A 94.71%)"
,
          }}
        />

        {/* Banner Content */}
        <div className="relative z-20 max-w-2xl p-6 sm:p-10 lg:p-14">
          {/* Badge */}
          <span
            className="inline-block rounded-full bg-white px-3.5 py-1 text-[11px] font-bold tracking-wider text-[#145C4B] shadow-sm uppercase"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Verified Premium Units
          </span>

          <h1
            className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Standalone Properties for Sale
          </h1>

          <p
            className="mt-4 text-sm font-normal leading-relaxed text-white/90 sm:text-base"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Discover a diverse selection of independent apartments, villas, and
            residential units outside gated communities, offering flexibility,
            privacy, and prime locations across Egypt&apos;s most sought-after
            neighborhoods.
          </p>
        </div>
      </div>
    </section>
  );
}
