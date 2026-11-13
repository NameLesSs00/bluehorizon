import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F473A] pt-8 pb-8 sm:pt-12 sm:pb-10">
      {/* Outer wrapper */}
      <div className="mx-auto w-full max-w-[1720px] px-3 sm:px-6 lg:px-8">
        {/* Inner Floating Card */}
        <div className="rounded-[28px] bg-[#FAF8F5] px-8 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16 shadow-xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
            {/* Brand & Description */}
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
                Blue Horizon is your premier real estate partner across Hurghada
                and the Red Sea coast. Whether you are looking to purchase a
                coastal villa, invest in off-plan compounds, or lease a modern
                apartment in El Kawthar and surrounding prime destinations, we
                connect you with verified homes and high-yield property
                opportunities in Egypt.
              </p>
            </div>

            {/* Properties Links */}
            <div className="lg:col-span-2 lg:pt-3">
              <h3
                className="text-[17px] font-bold leading-none tracking-normal text-[#000000]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                Properties
              </h3>
              <ul className="mt-6 space-y-3.5">
                <li>
                  <Link
                    href="/standalone"
                    className="text-[13px] font-normal leading-[1.5] text-[#000000] transition-colors hover:text-[#145C4B]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Standalone units
                  </Link>
                </li>
                <li>
                  <Link
                    href="/rent"
                    className="text-[13px] font-normal leading-[1.5] text-[#000000] transition-colors hover:text-[#145C4B]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Units for rent
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="text-[13px] font-normal leading-[1.5] text-[#000000] transition-colors hover:text-[#145C4B]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Compounds &amp; projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/areas"
                    className="text-[13px] font-normal leading-[1.5] text-[#000000] transition-colors hover:text-[#145C4B]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Explore areas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/locations"
                    className="text-[13px] font-normal leading-[1.5] text-[#000000] transition-colors hover:text-[#145C4B]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Rental locations
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2 lg:pt-3">
              <h3
                className="text-[17px] font-bold leading-none tracking-normal text-[#000000]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                Quick Links
              </h3>
              <ul className="mt-6 space-y-3.5">
                <li>
                  <Link
                    href="/"
                    className="text-[13px] font-normal leading-[1.5] text-[#000000] transition-colors hover:text-[#145C4B]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Home
                  </Link>
                </li>
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
                    href="/blogs"
                    className="text-[13px] font-normal leading-[1.5] text-[#000000] transition-colors hover:text-[#145C4B]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Blogs &amp; guides
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

        {/* Bottom Bar: Copyright & Made By centered, Socials on the right */}
        <div className="mt-8 border-t border-white/15 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Desktop Left Spacer to keep center text strictly centered */}
            <div className="hidden sm:block sm:w-36" aria-hidden="true" />

            {/* Centered Copyright & Made by */}
            <p
              className="text-center text-[12px] font-normal leading-relaxed text-[#CBDFD5]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              &copy; {currentYear} Blue Horizon. All rights reserved. Powered by{" "}
              <a
                href="https://tech-gear.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 transition-colors hover:text-white font-medium"
              >
                Tech Gear Solutions
              </a>
            </p>

            {/* Right: Social Media Icons */}
            <div className="flex items-center justify-center sm:justify-end gap-5 sm:w-36">
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
