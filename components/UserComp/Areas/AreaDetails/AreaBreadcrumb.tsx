import Link from "next/link";

interface AreaBreadcrumbProps {
  areaName?: string;
}

export default function AreaBreadcrumb({ areaName }: AreaBreadcrumbProps) {
  const displayName = areaName || "Area Details";

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
          <Link
            href="/"
            className="transition-colors hover:text-[#145C4B]"
          >
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="select-none text-[#A1AAA5]">
          /
        </li>
        <li>
          <Link
            href="/areas"
            className="transition-colors hover:text-[#145C4B]"
          >
            Areas
          </Link>
        </li>
        <li aria-hidden="true" className="select-none text-[#A1AAA5]">
          /
        </li>
        <li
          aria-current="page"
          className="font-medium text-[#202326] truncate max-w-[240px] sm:max-w-none"
        >
          {displayName}
        </li>
      </ol>
    </nav>
  );
}

