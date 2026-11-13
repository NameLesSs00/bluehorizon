"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { usePublicSiteSettingsQuery } from "@/features/keyValues/useKeyValuesQueries";
import { useTranslation } from "@/features/i18n/useTranslation";
import FooterSocialLinks from "./FooterSocialLinks";

// Fade-up animation triggered when element enters the viewport
function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { data: settingsData, isLoading } = usePublicSiteSettingsQuery();
  const { t } = useTranslation();
  const pathname = usePathname();
  const settings = settingsData?.map || {};

  const phone = settings["phone"] || "";
  const email = settings["email"] || "";
  const address = settings["address"] || "";
  const workingHours = settings["working_hours"] || "";

  const instagramUrl = settings["instagram"] || "";
  const facebookUrl = settings["facebook"] || "";
  const linkedinUrl = settings["linkedin"] || "";
  const whatsappUrl = settings["whatsapp"] || "";

  const cleanPhone = phone.replace(/\s+/g, "");

  // Derive locale from path for localized hrefs
  const segments = pathname ? pathname.split("/").filter(Boolean) : [];
  const currentLocale =
    segments.length > 0 && ["en", "de", "ar"].includes(segments[0])
      ? segments[0]
      : "en";

  const localizedHref = (href: string) => {
    if (href === "/") return `/${currentLocale}`;
    return `/${currentLocale}${href.startsWith("/") ? href : `/${href}`}`;
  };

  const linkClass =
    "text-[13px] font-normal leading-[1.5] text-[#000000] transition-colors hover:text-[#2B5FA6]";

  return (
    <footer className="bg-[#1B3A6B] pt-8 pb-8 sm:pt-12 sm:pb-10">
      <div className="mx-auto w-full max-w-[1720px] px-3 sm:px-6 lg:px-8">

        {/* Inner Floating Card */}
        <div className="rounded-[28px] bg-[#F9F7F4] px-8 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16 shadow-xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">

            {/* Brand & Description */}
            <FadeUp delay={0} className="lg:col-span-5 flex flex-col justify-start">
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
                {t(
                  "common.footer.description",
                  "Blue Horizon is your premier real estate partner across Hurghada and the Red Sea coast. Whether you are looking to purchase a coastal villa, invest in off-plan compounds, or lease a modern apartment in El Kawthar and surrounding prime destinations, we connect you with verified homes and high-yield property opportunities in Egypt."
                )}
              </p>
            </FadeUp>

            {/* Properties Links */}
            <FadeUp delay={0.1} className="lg:col-span-2 lg:pt-3">
              <h3
                className="text-[17px] font-bold leading-none tracking-normal text-[#000000]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {t("common.footer.properties", "Properties")}
              </h3>
              <ul className="mt-6 space-y-3.5" style={{ fontFamily: "var(--font-inter)" }}>
                <li>
                  <Link href={localizedHref("/standalone")} className={linkClass}>
                    {t("common.footer.standaloneUnits", "Standalone units")}
                  </Link>
                </li>
                <li>
                  <Link href={localizedHref("/rent")} className={linkClass}>
                    {t("common.footer.unitsForRent", "Units for rent")}
                  </Link>
                </li>
                <li>
                  <Link href={localizedHref("/projects")} className={linkClass}>
                    {t("common.footer.compoundsProjects", "Compounds & projects")}
                  </Link>
                </li>
                <li>
                  <Link href={localizedHref("/areas")} className={linkClass}>
                    {t("common.footer.exploreAreas", "Explore areas")}
                  </Link>
                </li>
                <li>
                  <Link href={localizedHref("/locations")} className={linkClass}>
                    {t("common.footer.rentalLocations", "Rental locations")}
                  </Link>
                </li>
              </ul>
            </FadeUp>

            {/* Quick Links */}
            <FadeUp delay={0.18} className="lg:col-span-2 lg:pt-3">
              <h3
                className="text-[17px] font-bold leading-none tracking-normal text-[#000000]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {t("common.footer.quickLinks", "Quick Links")}
              </h3>
              <ul className="mt-6 space-y-3.5" style={{ fontFamily: "var(--font-inter)" }}>
                <li>
                  <Link href={localizedHref("/")} className={linkClass}>
                    {t("common.footer.home", "Home")}
                  </Link>
                </li>
                <li>
                  <Link href={localizedHref("/about")} className={linkClass}>
                    {t("common.footer.aboutUs", "About us")}
                  </Link>
                </li>
                <li>
                  <Link href={localizedHref("/blogs")} className={linkClass}>
                    {t("common.footer.blogsGuides", "Blogs & guides")}
                  </Link>
                </li>
                <li>
                  <Link href={localizedHref("/contact")} className={linkClass}>
                    {t("common.footer.contactUs", "Contact us")}
                  </Link>
                </li>
              </ul>
            </FadeUp>

            {/* Get in Touch (dynamic from backend) */}
            <FadeUp delay={0.26} className="lg:col-span-3 lg:pt-3">
              <h3
                className="text-[17px] font-bold leading-none tracking-normal text-[#000000]"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {t("common.footer.getInTouch", "Get in touch")}
              </h3>
              {isLoading ? (
                <div className="mt-6 space-y-3">
                  <div className="h-4 w-32 animate-pulse rounded bg-[#E2E8F3]" />
                  <div className="h-4 w-44 animate-pulse rounded bg-[#E2E8F3]" />
                  <div className="h-4 w-52 animate-pulse rounded bg-[#E2E8F3]" />
                  <div className="h-4 w-36 animate-pulse rounded bg-[#E2E8F3]" />
                </div>
              ) : (
                <div
                  className="mt-6 space-y-3.5 text-[13px] font-normal leading-[1.6] text-[#000000]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {phone && (
                    <p>
                      <a href={`tel:${cleanPhone}`} className="transition-colors hover:text-[#2B5FA6]">
                        {phone}
                      </a>
                    </p>
                  )}
                  {email && (
                    <p>
                      <a href={`mailto:${email}`} className="transition-colors hover:text-[#2B5FA6]">
                        {email}
                      </a>
                    </p>
                  )}
                  {address && <p>{address}</p>}
                  {workingHours && <p className="text-[#65706B]">{workingHours}</p>}
                </div>
              )}
            </FadeUp>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-8 border-t border-white/15 pt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="hidden sm:block sm:w-44" aria-hidden="true" />

            <p
              className="text-center text-[12px] font-normal leading-relaxed text-[#C5D3E8]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              &copy; {currentYear} Blue Horizon. {t("common.footer.allRightsReserved", "All rights reserved.")}{" "}
              {t("common.footer.poweredBy", "Powered by")}{" "}
              <a
                href="https://tech-gear.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 transition-colors hover:text-white font-medium"
              >
                Tech Gear Solutions
              </a>
            </p>

            <FooterSocialLinks
              isLoading={isLoading}
              whatsappUrl={whatsappUrl}
              instagramUrl={instagramUrl}
              facebookUrl={facebookUrl}
              linkedinUrl={linkedinUrl}
            />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
