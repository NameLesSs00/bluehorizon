import Image from "next/image";
import Link from "next/link";

export default function ProjectsHeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#1B3A6B]">
      {/* Background City Image Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/projects.png"
          alt="Our Projects developments background"
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
            "linear-gradient(90deg, #1B3A6B 31.77%, rgba(27, 58, 107, 0.85) 46.15%, rgba(27, 58, 107, 0.2) 80.77%)",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-20 mx-auto max-w-[1536px] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        {/* Breadcrumb Navigation */}
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
          <span className="font-semibold text-white">Projects</span>
        </nav>

        {/* Heading & Subtitle */}
        <div className="mt-6 sm:mt-10">
          <h1
            className="text-[40px] font-bold leading-none tracking-[-0.02em] text-white sm:text-[52px] lg:text-[60px]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Our Projects
          </h1>

          <p
            className="mt-4 max-w-xl text-[15px] font-normal leading-[1.65] text-white/95 sm:text-[16px]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Explore our premium developments in the most sought-after
            locations.
          </p>
        </div>
      </div>
    </section>
  );
}
