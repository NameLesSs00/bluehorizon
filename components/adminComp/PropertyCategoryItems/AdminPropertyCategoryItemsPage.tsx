"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FiFilter, FiPlus } from "react-icons/fi";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import { usePropertyCategoriesQuery } from "@/features/propertyCategories/usePropertyCategoriesQueries";
import { usePropertyCategoryItemsQuery } from "@/features/propertyCategoryItems/usePropertyCategoryItemsQueries";
import { PropertyCategoryDetailItem } from "@/models/propertyCategoryItem";
import PropertyCategoryItemsTable from "./PropertyCategoryItemsTable";
import PropertyCategoryItemFormDrawer from "./PropertyCategoryItemFormDrawer";

function PropertyCategoryItemsContent() {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get("categoryId");
  const initialCategoryId = initialCategoryParam
    ? parseInt(initialCategoryParam) || 0
    : 0;

  const [selectedCategoryId, setSelectedCategoryId] =
    useState<number>(initialCategoryId);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  // Load parent categories for filter bar
  const { data: categoriesData } = usePropertyCategoriesQuery({
    Language: "en",
    PageNumber: 1,
    PageSize: 100,
  });
  const categories = categoriesData?.items ?? [];

  // Query category items
  const { data: itemsData, isLoading } = usePropertyCategoryItemsQuery({
    Language: "en",
    PropertyCategoryId: selectedCategoryId > 0 ? selectedCategoryId : undefined,
    PageNumber: pageNumber,
    PageSize: pageSize,
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] =
    useState<PropertyCategoryDetailItem | null>(null);

  const items = itemsData?.items ?? [];
  const totalPages = itemsData?.totalPages ?? 1;
  const hasPreviousPage = itemsData?.hasPreviousPage ?? pageNumber > 1;
  const hasNextPage = itemsData?.hasNextPage ?? pageNumber < totalPages;

  function handleOpenCreate() {
    setSelectedItem(null);
    setIsDrawerOpen(true);
  }

  function handleOpenEdit(item: PropertyCategoryDetailItem) {
    setSelectedItem(item);
    setIsDrawerOpen(true);
  }

  function handleCloseDrawer() {
    setIsDrawerOpen(false);
    setSelectedItem(null);
  }

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p
            className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2B5FA6]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            RENTAL AMENITIES REPOSITORY
          </p>
          <h1
            className="mt-1 text-[28px] font-semibold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Rental Items
          </h1>
          <p
            className="mt-1 text-[13px] text-[#65706B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Manage equipment, appliances, and features (Coffee Makers, Bathtubs, Smart Locks, Wi-Fi) categorized for Hurghada vacation rental units.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-[#1B3A6B] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#2B5FA6]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <FiPlus className="h-4 w-4" />
          <span>Add Rental Item</span>
        </button>
      </div>

      {/* Filter by Parent Category */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#E2E8F3] bg-white p-4 shadow-2xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-[13px] font-semibold text-[#202326]">
          <FiFilter className="h-4 w-4 text-[#2B5FA6]" />
          <span>Filter by Parent Category:</span>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCategoryId}
            onChange={(e) => {
              setSelectedCategoryId(parseInt(e.target.value) || 0);
              setPageNumber(1);
            }}
            className="rounded-xl border border-[#D0D9EA] bg-[#F9F7F4] px-3.5 py-2 text-[13px] font-medium text-[#202326] outline-none transition-all focus:border-[#2B5FA6] focus:bg-white"
          >
            <option value={0}>All Categories ({categories.length})</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {selectedCategoryId > 0 && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategoryId(0);
                setPageNumber(1);
              }}
              className="rounded-xl border border-[#D0D9EA] px-3 py-2 text-[12px] font-medium text-[#65706B] hover:bg-neutral-100 hover:text-[#202326]"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Full-width Table */}
      <PropertyCategoryItemsTable
        items={items}
        isLoading={isLoading}
        pageNumber={pageNumber}
        totalPages={totalPages}
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
        onPageChange={setPageNumber}
        onEdit={handleOpenEdit}
      />

      {/* Right-Side Slide Drawer */}
      <PropertyCategoryItemFormDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        itemToEdit={selectedItem}
        defaultCategoryId={selectedCategoryId > 0 ? selectedCategoryId : undefined}
      />
    </div>
  );
}

export default function AdminPropertyCategoryItemsPage() {
  return (
    <AdminShell>
      <Suspense
        fallback={
          <div className="flex h-72 w-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#1B3A6B] border-t-transparent" />
          </div>
        }
      >
        <PropertyCategoryItemsContent />
      </Suspense>
    </AdminShell>
  );
}

