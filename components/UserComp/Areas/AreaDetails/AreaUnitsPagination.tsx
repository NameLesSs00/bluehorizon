"use client";

interface AreaUnitsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function AreaUnitsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: AreaUnitsPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D9E2EE] bg-white text-xs font-medium text-[#202326] transition-colors hover:bg-[#F0F3FA] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        &lt;
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
              isActive
                ? "bg-[#2B5FA6] text-white"
                : "border border-[#D9E2EE] bg-white text-[#202326] hover:bg-[#F0F3FA]"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D9E2EE] bg-white text-xs font-medium text-[#202326] transition-colors hover:bg-[#F0F3FA] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        &gt;
      </button>
    </div>
  );
}

