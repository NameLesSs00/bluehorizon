"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/features/i18n/useTranslation";

interface StandaloneBreadcrumbProps {
  unitName: string;
}

export default function StandaloneBreadcrumb({ unitName }: StandaloneBreadcrumbProps) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const segments = pathname ? pathname.split("/").filter(Boolean) : [];
  const locale =
    segments.length > 0 && ["en", "de", "ar"].includes(segments[0]) ? segments[0] : "en";

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#6B7570]"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <Link href={`/${locale}`} className="transition-colors hover:text-[#2B5FA6]">
        {t("standaloneDetail.breadcrumb.home", "Home")}
      </Link>
      <span className="text-[#6B7570]/60">/</span>
      <Link href={`/${locale}/standalone`} className="transition-colors hover:text-[#2B5FA6]">
        {t("standaloneDetail.breadcrumb.standalone", "Standalone")}
      </Link>
      <span className="text-[#6B7570]/60">/</span>
      <span className="font-semibold text-[#2B5FA6] line-clamp-1 max-w-xs sm:max-w-md">
        {unitName}
      </span>
    </motion.nav>
  );
}
