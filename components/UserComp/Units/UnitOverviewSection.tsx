interface UnitOverviewSectionProps {
  description?: string;
  view?: string;
  floorName?: string;
  markerId?: string;
  projectName?: string;
}

export default function UnitOverviewSection({
  description,
  view,
  floorName,
  markerId,
  projectName,
}: UnitOverviewSectionProps) {
  const metaAttributes = [
    { label: "Project", value: projectName },
    { label: "View", value: view },
    { label: "Floor", value: floorName },
    { label: "Unit Reference", value: markerId ? `#${markerId}` : null },
  ].filter((attr) => Boolean(attr.value));

  if (!description && metaAttributes.length === 0) {
    return null;
  }

  return (
    <section className="rounded-[20px] border border-[#D9E2EE] bg-white p-6 sm:p-8 shadow-xs">
      <h2
        className="text-xl sm:text-2xl font-bold text-[#202326] mb-4"
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        Property Overview & Description
      </h2>

      {description && (
        <div
          className="text-sm leading-relaxed text-[#6B7570] whitespace-pre-line"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {description}
        </div>
      )}

      {metaAttributes.length > 0 && (
        <div className="mt-6 pt-6 border-t border-[#D9E2EE] grid grid-cols-2 sm:grid-cols-4 gap-4">
          {metaAttributes.map((attr) => (
            <div
              key={attr.label}
              className="rounded-xl bg-[#F0F3FA] p-3.5 border border-[#D9E2EE]/60"
            >
              <span
                className="block text-[11px] font-medium text-[#6B7570]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {attr.label}
              </span>
              <span
                className="block mt-0.5 text-xs sm:text-sm font-bold text-[#202326] truncate"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                {attr.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

