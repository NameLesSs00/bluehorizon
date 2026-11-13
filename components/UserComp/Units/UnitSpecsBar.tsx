interface UnitSpecsBarProps {
  priceFormatted: string;
  area?: number;
  bedrooms?: number;
  bathrooms?: number;
  kitchens?: number;
  floorNumber?: number;
  propertyType?: string;
}

export default function UnitSpecsBar({
  priceFormatted,
  area,
  bedrooms,
  bathrooms,
  kitchens,
  floorNumber,
  propertyType,
}: UnitSpecsBarProps) {
  const specs = [
    {
      label: "Total Price",
      value: priceFormatted,
      icon: (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#2B5FA6" strokeWidth="1.6">
          <circle cx="10" cy="10" r="8" />
          <path d="M10 6v8M12.5 8.5H8.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H7.5" />
        </svg>
      ),
      show: Boolean(priceFormatted),
    },
    {
      label: "Total Area",
      value: area && area > 0 ? `${area} m²` : null,
      icon: (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#2B5FA6" strokeWidth="1.6">
          <rect x="2.5" y="2.5" width="15" height="15" rx="2" />
          <path d="M6.5 2.5v4M13.5 2.5v4M2.5 6.5h4" />
        </svg>
      ),
      show: Boolean(area && area > 0),
    },
    {
      label: "Unit Type",
      value: propertyType || null,
      icon: (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#2B5FA6" strokeWidth="1.6">
          <path d="M2.5 8.5L10 2.5l7.5 6V17.5h-15V8.5z" />
          <path d="M7.5 17.5v-6h5v6" />
        </svg>
      ),
      show: Boolean(propertyType),
    },
    {
      label: "Bedrooms",
      value: bedrooms && bedrooms > 0 ? `${bedrooms} ${bedrooms === 1 ? "Room" : "Rooms"}` : null,
      icon: (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#2B5FA6" strokeWidth="1.6">
          <path d="M2.5 9v7M17.5 9v7M2.5 12.5h15M5 9V6.5C5 5.67 5.67 5 6.5 5h7c.83 0 1.5.67 1.5 1.5V9" strokeLinecap="round" />
        </svg>
      ),
      show: Boolean(bedrooms && bedrooms > 0),
    },
    {
      label: "Bathrooms",
      value: bathrooms && bathrooms > 0 ? `${bathrooms} ${bathrooms === 1 ? "Bath" : "Baths"}` : null,
      icon: (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#2B5FA6" strokeWidth="1.6">
          <path d="M3 10.5c0 2.48 2.02 4.5 4.5 4.5h5c2.48 0 4.5-2.02 4.5-4.5V9.5H3v1z" />
          <path d="M5 15v2M15 15v2M5 6v3.5" strokeLinecap="round" />
        </svg>
      ),
      show: Boolean(bathrooms && bathrooms > 0),
    },
    {
      label: "Kitchens",
      value: kitchens && kitchens > 0 ? `${kitchens} Kitchen` : null,
      icon: (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#2B5FA6" strokeWidth="1.6">
          <rect x="3" y="3" width="14" height="14" rx="2" />
          <path d="M3 8.5h14M10 8.5v8.5" />
        </svg>
      ),
      show: Boolean(kitchens && kitchens > 0),
    },
    {
      label: "Floor",
      value: floorNumber !== undefined && floorNumber !== null ? `Floor ${floorNumber}` : null,
      icon: (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#2B5FA6" strokeWidth="1.6">
          <path d="M3 17h14M5 17V3h10v14M8 6h1M11 6h1M8 10h1M11 10h1" strokeLinecap="round" />
        </svg>
      ),
      show: floorNumber !== undefined && floorNumber !== null && floorNumber >= 0,
    },
  ].filter((s) => s.show && s.value);

  if (specs.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8 pb-10">
      <div className="rounded-[20px] border border-[#D9E2EE] bg-white p-4 sm:p-5 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#D9E2EE]">
          {specs.map((item, idx) => (
            <div
              key={item.label}
              className={`flex items-center gap-3 ${
                idx > 0 ? "pt-3 sm:pt-0 sm:pl-5" : ""
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E5ECF6]">
                {item.icon}
              </div>
              <div className="min-w-0">
                <span
                  className="block text-[11px] font-medium text-[#6B7570] truncate"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {item.label}
                </span>
                <span
                  className="block text-sm sm:text-[15px] font-bold text-[#202326] truncate"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

