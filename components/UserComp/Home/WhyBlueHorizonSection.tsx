import Image from "next/image";
import Link from "next/link";

interface FeatureItem {
  icon: string;
  titleLine1: string;
  titleLine2: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: "/HomePage/WhyBlueHorizon/gem.svg",
    titleLine1: "Premium",
    titleLine2: "Quality",
  },
  {
    icon: "/HomePage/WhyBlueHorizon/shield-check.svg",
    titleLine1: "Trusted",
    titleLine2: "Experience",
  },
  {
    icon: "/HomePage/WhyBlueHorizon/handshake.svg",
    titleLine1: "Dedicated",
    titleLine2: "Support",
  },
  {
    icon: "/HomePage/WhyBlueHorizon/headset.svg",
    titleLine1: "After-Sales",
    titleLine2: "Care",
  },
];

export default function WhyBlueHorizonSection() {
  return (
    <section className="bg-white py-6 sm:py-8 lg:py-10 transition-colors duration-500 ease-in-out">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 ">
        <div
          className="relative flex flex-col overflow-hidden bg-[#145C4B] shadow-xs lg:h-[255px] lg:flex-row lg:items-stretch"
          style={{ borderRadius: "17.07px" }}
        >
          {/* Left Column: Heading, Subtitle & Button */}
          <div className="flex flex-col justify-between p-6 sm:p-7 lg:w-[442px] lg:shrink-0 lg:py-[29px] lg:pl-[65px] lg:pr-6">
            <div>
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                WHY Blue HORIZON? —
              </p>

              <h2
                className="mt-2 text-[20px] font-bold leading-[1.18] tracking-[-0.02em] text-white sm:text-[24px] lg:text-[28px]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                More Than a Home,
                <br />
                A Better Lifestyle
              </h2>

              <p
                className="mt-2 max-w-[340px] text-[12.5px] font-normal leading-[1.5] text-white/80"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                We&apos;re committed to providing you with premium properties,
                trusted services, and a seamless experience.
              </p>
            </div>

            <div className="mt-5 lg:mt-0">
              <Link
                href="/about"
                className="group inline-flex h-[37px] items-center gap-2 rounded-full bg-white px-5 text-[13px] font-semibold text-[#145C4B] transition-all duration-200 hover:bg-[#F3F5F3]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <span>Learn More</span>
                <Image
                  src="/HomePage/WhyBlueHorizon/arrow-right.svg"
                  alt=""
                  width={14}
                  height={14}
                  className="h-3.5 w-3.5 object-contain transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          {/* Thin Vertical Divider Line (Desktop only) */}
          <div
            className="hidden w-px shrink-0 bg-white/20 lg:my-[32px] lg:block"
            aria-hidden="true"
          />

          {/* Middle Column: 4 Features */}
          <div className="flex items-center justify-around px-6 py-8 sm:px-8 lg:flex-1 lg:px-4 lg:py-0">
            <div className="grid w-full grid-cols-2 gap-5 sm:grid-cols-4 sm:gap-4 lg:grid-cols-4 lg:gap-2">
              {FEATURES.map((item) => (
                <div
                  key={item.titleLine1 + item.titleLine2}
                  className="flex flex-col items-center justify-center text-center"
                >
                  <div className="relative flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center">
                    <Image
                      src={item.icon}
                      alt={`${item.titleLine1} ${item.titleLine2}`}
                      width={28}
                      height={28}
                      className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
                    />
                  </div>

                  <p
                    className="mt-2.5 text-[12px] sm:text-[13px] lg:text-[14px] font-medium leading-[1.25] text-white"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {item.titleLine1}
                    <br />
                    {item.titleLine2}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Building Image with ONLY Gradient Overlay */}
          <div className="relative h-44 sm:h-52 w-full shrink-0 overflow-hidden lg:h-full lg:w-[354px] xl:w-[374px]">
            <Image
              src="/HomePage/WhyBlueHorizon/Architecture — reference crop.png"
              alt="Why Blue Horizon Architecture"
              fill
              sizes="(max-width: 1024px) 100vw, 374px"
              priority
              className="object-cover object-right lg:object-left"
            />

            {/* Gradient Overlay applied ONLY over the building image */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, #145C4B 5.08%, rgba(20, 92, 75, 0) 39.9%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
