import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0F473A] pt-8 pb-8 sm:pt-12 sm:pb-10">
      {/* Outer wrapper spanning wider with tight side padding */}
      <div className="mx-auto w-full max-w-[1720px] px-3 sm:px-6 lg:px-8">
        {/* Inner Floating Card */}
        <div className="rounded-[28px] bg-[#FAF8F5] px-8 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16 shadow-xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
            {/* Brand & SEO Description */}
            <div className="lg:col-span-5 flex flex-col justify-start">
              <div className="relative h-20 w-64 sm:h-24 sm:w-80">
                <Image
                  src="/logo.svg"
                  alt="Blue Horizon"
                  fill
                  priority
                  className="object-contain object-left"
                />
              </div>

              <p
                className="mt-6 max-w-lg text-[14px] font-normal leading-[1.7] text-[#65706B]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Blue Horizon is your trusted real estate partner in Hurghada and
                the Red Sea coast. Whether you are looking to buy a luxury
                villa, invest in off-plan compounds, or rent a modern seaside
                apartment in El Kawthar and beyond, we connect you with
                exceptional homes and high-yield property opportunities in
                Egypt.
              </p>
            </div>

            {/* Discover Links */}
            <div className="lg:col-span-2 lg:pt-3">
              <h3
                className="text-[17px] font-bold leading-none tracking-normal text-[#000000]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                Discover
              </h3>
              <ul className="mt-6 space-y-3.5">
                <li>
                  <Link
                    href="/properties?type=buy"
                    className="text-[13px] font-normal leading-[1.5] text-[#000000] transition-colors hover:text-[#145C4B]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Buy a home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/properties?type=rent"
                    className="text-[13px] font-normal leading-[1.5] text-[#000000] transition-colors hover:text-[#145C4B]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Rent a home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="text-[13px] font-normal leading-[1.5] text-[#000000] transition-colors hover:text-[#145C4B]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Featured projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/areas"
                    className="text-[13px] font-normal leading-[1.5] text-[#000000] transition-colors hover:text-[#145C4B]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Popular areas
                  </Link>
                </li>
              </ul>
            </div>

            {/* Blue Horizon Links */}
            <div className="lg:col-span-2 lg:pt-3">
              <h3
                className="text-[17px] font-bold leading-none tracking-normal text-[#000000]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                Blue Horizon
              </h3>
              <ul className="mt-6 space-y-3.5">
                <li>
                  <Link
                    href="/about"
                    className="text-[13px] font-normal leading-[1.5] text-[#000000] transition-colors hover:text-[#145C4B]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-[13px] font-normal leading-[1.5] text-[#000000] transition-colors hover:text-[#145C4B]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Our services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="text-[13px] font-normal leading-[1.5] text-[#000000] transition-colors hover:text-[#145C4B]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Blogs &amp; insights
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-[13px] font-normal leading-[1.5] text-[#000000] transition-colors hover:text-[#145C4B]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Get in touch Info */}
            <div className="lg:col-span-3 lg:pt-3">
              <h3
                className="text-[17px] font-bold leading-none tracking-normal text-[#000000]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                Get in touch
              </h3>
              <div
                className="mt-6 space-y-3.5 text-[13px] font-normal leading-[1.6] text-[#000000]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <p>
                  <a
                    href="tel:+201000004570"
                    className="transition-colors hover:text-[#145C4B]"
                  >
                    +20 100 000 4570
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:info@bluehorizon.com"
                    className="transition-colors hover:text-[#145C4B]"
                  >
                    info@bluehorizon.com
                  </a>
                </p>
                <p>El Kawthar, Hurghada, Red Sea, Egypt</p>
                <p className="text-[#65706B]">Sun–Thu &middot; 9:00 AM–6:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: 3-column balanced grid so center links are strictly centered */}
        <div className="mt-8 border-t border-white/15 pt-6">
          <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-3">
            {/* Left: Copyright */}
            <p
              className="text-center text-[11px] font-normal leading-none text-[#CBDFD5] sm:text-left"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              &copy; 2026 Blue HORIZON. All rights reserved. Powered by{" "}
              <a
                href="https://tech-gear.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 transition-colors hover:text-white"
              >
                Tech Gear Solutions
              </a>
            </p>

            {/* Center: Legal Links strictly centered */}
            <div
              className="flex items-center justify-center gap-6 text-[11px] font-normal leading-none text-[#CBDFD5]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <Link
                href="/privacy-policy"
                className="transition-colors hover:text-white"
              >
                Privacy policy
              </Link>
              <Link href="/terms" className="transition-colors hover:text-white">
                Terms &amp; conditions
              </Link>
            </div>

            {/* Right: Social Icons aligned right */}
            <div className="flex items-center justify-center gap-5 sm:justify-end">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-transform hover:scale-110 hover:opacity-90"
              >
                <Image
                  src="/HomePage/footer/instagram.svg"
                  alt="Instagram"
                  width={18}
                  height={18}
                  className="h-[18px] w-[18px]"
                />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="transition-transform hover:scale-110 hover:opacity-90"
              >
                <Image
                  src="/HomePage/footer/facebook.svg"
                  alt="Facebook"
                  width={18}
                  height={18}
                  className="h-[18px] w-[18px]"
                />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition-transform hover:scale-110 hover:opacity-90"
              >
                <Image
                  src="/HomePage/footer/linkedin.svg"
                  alt="LinkedIn"
                  width={18}
                  height={18}
                  className="h-[18px] w-[18px]"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
