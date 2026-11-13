import Image from "next/image";
import Link from "next/link";

interface DreamHomeSectionProps {
  sectionClassName?: string;
}

export default function DreamHomeSection({
  sectionClassName = "bg-white py-8 sm:py-10 lg:py-12",
}: DreamHomeSectionProps) {
  return (
    <section className={sectionClassName}>
      <div className="mx-auto w-full max-w-[1540px] px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[24px] bg-[#2B5FA6]">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-stretch">
            {/* Left Column: Text & Call to Action */}
            <div className="flex flex-col justify-center px-6 py-10 sm:px-12 sm:py-14 lg:col-span-7 lg:px-16 lg:py-16">
              <p
                className="text-[11px] font-normal uppercase leading-none tracking-[0.12em] text-[#C5D3E8]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                YOUR NEXT CHAPTER STARTS HERE
              </p>

              <h2
                className="mt-3 sm:mt-4 max-w-md text-[26px] font-normal leading-[1.18] sm:leading-[1.15] tracking-[-0.03em] text-white sm:text-[36px] lg:text-[44px]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                Let&rsquo;s find your dream home.
              </h2>

              <p
                className="mt-5 max-w-lg text-[15px] font-normal leading-[1.6] tracking-normal text-[#C5D3E8]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Tell us what matters to you. Our experts will take it from
                there.
              </p>

              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-[8px] bg-white px-14 py-3.5 text-[14px] font-medium text-[#2B5FA6] transition-colors hover:bg-[#F3F7F5] sm:w-auto sm:min-w-[235px]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Find my home
                </Link>
              </div>
            </div>

            {/* Right Column: Full-height Image */}
            <div className="relative min-h-[280px] sm:min-h-[340px] lg:col-span-5 lg:min-h-full">
              <Image
                src="/HomePage/DreamHome/sectionImage.png"
                alt="Luxury dream home villa"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
