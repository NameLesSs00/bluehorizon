import Image from "next/image";
import Link from "next/link";

export interface UnitItem {
  id: string | number;
  title: string;
  description?: string;
  badge: "Primary" | "Resale";
  area: string;
  rooms: string;
  baths: string;
  price: string;
  imageSrc: string;
  location?: string;
  type?: "primary" | "resale";
  href?: string;
  rawPrice?: number;
  category?: string;
}

interface ProjectUnitCardProps {
  unit: UnitItem;
}

export default function ProjectUnitCard({ unit }: ProjectUnitCardProps) {
  const isResale = unit.badge === "Resale";
  const linkHref =
    unit.href ||
    `/units/${unit.id}?type=${unit.type || (isResale ? "resale" : "primary")}`;

  return (
    <div className="group flex flex-col justify-between rounded-[20px] border border-[#E1E7E3] bg-white p-3 sm:p-3.5 transition-all duration-200 hover:-translate-y-1 hover:border-[#145C4B]/40 hover:shadow-md">
      <div>
        {/* Thumbnail with Badge */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px] bg-[#FAF8F5]">
          <Image
            src={unit.imageSrc || "/default-fallback.png"}
            alt={unit.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <span
            className={`absolute top-2.5 left-2.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur-xs shadow-xs ${
              isResale
                ? "bg-[#202326]/85 text-white"
                : "bg-white/95 text-[#145C4B]"
            }`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {unit.badge}
          </span>
        </div>

        {/* Content */}
        <div className="pt-3 pb-1">
          <h4
            className="truncate text-[15px] sm:text-[16px] font-bold text-[#202326] transition-colors group-hover:text-[#145C4B]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            {unit.title}
          </h4>

          {unit.description && (
            <p
              className="mt-0.5 truncate text-xs text-[#6B7570]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {unit.description}
            </p>
          )}

          {/* Specs Row */}
          <div
            className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-[#6B7570]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {/* Area */}
            <span className="inline-flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <rect x="1.5" y="1.5" width="9" height="9" rx="1.5" stroke="#6B7570" strokeWidth="1.2" />
                <path d="M4 1.5V4M8 1.5V4M1.5 4H4" stroke="#6B7570" strokeWidth="1.2" />
              </svg>
              {unit.area}
            </span>

            <span className="text-[#A1AAA5]">·</span>

            {/* Rooms */}
            <span className="inline-flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M1.5 5.5V9.5M10.5 5.5V9.5M1.5 7.5H10.5M3 5.5V4C3 3.44772 3.44772 3 4 3H8C8.55228 3 9 3.44772 9 4V5.5" stroke="#6B7570" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              {unit.rooms}
            </span>

            <span className="text-[#A1AAA5]">·</span>

            {/* Baths */}
            <span className="inline-flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6.5C2 7.88071 3.11929 9 4.5 9H7.5C8.88071 9 10 7.88071 10 6.5V6H2V6.5ZM3 9V10.5M9 9V10.5M3 4V6" stroke="#6B7570" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              {unit.baths}
            </span>
          </div>

          {unit.location && (
            <div className="mt-2 flex items-center gap-1 text-[11px] text-[#6B7570]">
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M6 1.5C4.067 1.5 2.5 3.067 2.5 5C2.5 7.625 6 10.5 6 10.5C6 10.5 9.5 7.625 9.5 5C9.5 3.067 7.933 1.5 6 1.5ZM6 6.25C5.30964 6.25 4.75 5.69036 4.75 5C4.75 4.30964 5.30964 3.75 6 3.75C6.69036 3.75 7.25 4.30964 7.25 5C7.25 5.69036 6.69036 6.25 6 6.25Z" stroke="#6B7570" strokeWidth="1.1" />
              </svg>
              <span className="truncate">{unit.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer: Price & CTA */}
      <div className="mt-3 pt-3 border-t border-[#E1E7E3]">
        <span
          className="block text-base sm:text-[17px] font-bold text-[#202326]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          {unit.price}
        </span>

        <Link
          href={linkHref}
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#145C4B] py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#0F473A]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <span>View Details</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
