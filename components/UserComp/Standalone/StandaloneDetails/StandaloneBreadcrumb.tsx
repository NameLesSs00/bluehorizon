import Link from "next/link";

interface StandaloneBreadcrumbProps {
  unitName: string;
}

export default function StandaloneBreadcrumb({
  unitName,
}: StandaloneBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#6B7570]"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <Link href="/" className="transition-colors hover:text-[#2B5FA6]">
        Home
      </Link>
      <span className="text-[#6B7570]/60">/</span>
      <Link href="/standalone" className="transition-colors hover:text-[#2B5FA6]">
        Standalone
      </Link>
      <span className="text-[#6B7570]/60">/</span>
      <span className="font-semibold text-[#2B5FA6] line-clamp-1 max-w-xs sm:max-w-md">
        {unitName}
      </span>
    </nav>
  );
}

