"use client";

import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

export default function RentalBreadcrumb() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto w-full max-w-[1360px] px-4 pt-6 pb-4 sm:px-6 lg:px-8"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <ol className="flex items-center gap-2 text-xs font-medium text-[#65706B]">
        <li>
          <Link
            href="/"
            className="transition-colors hover:text-[#0F473A]"
          >
            Home
          </Link>
        </li>
        <li>
          <FiChevronRight className="h-3.5 w-3.5 text-[#9CA3AF]" />
        </li>
        <li className="font-semibold text-[#0F473A]">Units for Rent</li>
      </ol>
    </nav>
  );
}

