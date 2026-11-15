"use client";

import Link from "next/link";
import { useTranslation } from "@/features/i18n/useTranslation";
import { toUrlSlug } from "@/shared/utils/slug";

interface UnitBreadcrumbProps {
  unitName?: string;
  projectName?: string;
  projectId?: number;
}

export default function UnitBreadcrumb({
  unitName,
  projectName,
  projectId,
}: UnitBreadcrumbProps) {
  const { t, locale } = useTranslation();
  const displayUnitName = unitName || t("unitDetails.defaultTitle", "Unit Details");

  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 pt-4 pb-4"
    >
      <ol
        className="flex flex-wrap items-center gap-2 text-xs sm:text-[13px] text-[#6B7570]"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <li>
          <Link href={`/${locale}`} className="transition-colors hover:text-[#2B5FA6]">
            {t("projects.details.breadcrumbHome", "Home")}
          </Link>
        </li>

        <li aria-hidden="true" className="select-none text-[#A1AAA5]">
          /
        </li>

        <li>
          <Link
            href={`/${locale}/projects`}
            className="transition-colors hover:text-[#2B5FA6]"
          >
            {t("projects.details.breadcrumbProjects", "Projects")}
          </Link>
        </li>

        {projectId && projectName && (
          <>
            <li aria-hidden="true" className="select-none text-[#A1AAA5]">
              /
            </li>
            <li>
              <Link
                href={`/${locale}/projects/${toUrlSlug(projectName, projectId)}`}
                className="transition-colors hover:text-[#2B5FA6]"
              >
                {projectName}
              </Link>
            </li>
          </>
        )}

        <li aria-hidden="true" className="select-none text-[#A1AAA5]">
          /
        </li>

        <li
          aria-current="page"
          className="font-medium text-[#202326] truncate max-w-[240px] sm:max-w-none"
        >
          {displayUnitName}
        </li>
      </ol>
    </nav>
  );
}
