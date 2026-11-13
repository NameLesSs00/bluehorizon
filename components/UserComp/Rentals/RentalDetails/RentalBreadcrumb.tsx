import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

interface RentalBreadcrumbProps {
  locationName?: string;
  unitName: string;
}

export default function RentalBreadcrumb({
  locationName,
  unitName,
}: RentalBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#65706B]"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <Link href="/" className="transition-colors hover:text-[#0F473A]">
        Home
      </Link>
      <FiChevronRight className="h-3 w-3 text-[#9CA3AF]" />
      <Link href="/rent" className="transition-colors hover:text-[#0F473A]">
        For Rent
      </Link>
      {locationName && (
        <>
          <FiChevronRight className="h-3 w-3 text-[#9CA3AF]" />
          <span className="text-[#65706B]">{locationName}</span>
        </>
      )}
      <FiChevronRight className="h-3 w-3 text-[#9CA3AF]" />
      <span className="font-semibold text-[#0F473A] line-clamp-1 max-w-xs sm:max-w-md">
        {unitName}
      </span>
    </nav>
  );
}

