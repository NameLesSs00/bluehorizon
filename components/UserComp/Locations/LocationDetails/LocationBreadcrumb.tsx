import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

interface LocationBreadcrumbProps {
  locationName?: string;
}

export default function LocationBreadcrumb({
  locationName,
}: LocationBreadcrumbProps) {
  return (
    <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs sm:text-[13px] text-[#6B7570]"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <Link
          href="/"
          className="transition-colors hover:text-[#145C4B]"
        >
          Home
        </Link>
        <FiChevronRight className="h-3 w-3 shrink-0 text-[#A1AAA5]" />
        <Link
          href="/locations"
          className="transition-colors hover:text-[#145C4B]"
        >
          Locations
        </Link>
        {locationName && (
          <>
            <FiChevronRight className="h-3 w-3 shrink-0 text-[#A1AAA5]" />
            <span className="font-semibold text-[#145C4B] truncate max-w-[200px] sm:max-w-xs">
              {locationName}
            </span>
          </>
        )}
      </nav>
    </div>
  );
}

