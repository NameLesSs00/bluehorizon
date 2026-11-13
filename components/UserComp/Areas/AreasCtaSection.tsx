import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function AreasCtaSection() {
  return (
    <section className="bg-[#F0F3FA] py-10 sm:py-16">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[22px] bg-[#1B3A6B]">
          {/* Background Topographic Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/Areas/ctaBackGound.jpg"
              alt="Assistance banner background"
              fill
              sizes="(max-width: 1320px) 100vw, 1320px"
              className="object-cover object-center"
            />
          </div>

          {/* Banner Content */}
          <div className="relative z-10 flex flex-col items-start justify-between gap-8 px-8 py-10 sm:px-12 sm:py-14 md:flex-row md:items-center lg:px-16 lg:py-16">
            <div className="max-w-2xl">
              <p
                className="text-[11px] font-semibold uppercase leading-none tracking-[0.12em] text-white/90"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                NEED ASSISTANCE?
              </p>

              <h2
                className="mt-4 text-[26px] font-bold leading-[1.2] tracking-[-0.02em] text-white sm:text-[34px] lg:text-[38px]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                Not sure which area is right for you?
              </h2>

              <p
                className="mt-3.5 text-[14px] font-normal leading-[1.6] text-[#C5D3E8] sm:text-[15px]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Our team will help you compare areas and find the right property.
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 rounded-[16px] bg-white px-8 py-4 text-[14px] font-semibold text-[#2B5FA6] transition-all duration-200 hover:bg-[#F3F7F5] sm:px-9 sm:py-4 sm:text-[15px]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <span>Contact Us</span>
                <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

