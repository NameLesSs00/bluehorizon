"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import { usePropertyCategoriesQuery } from "@/features/propertyCategories/usePropertyCategoriesQueries";
import { PropertyCategoryItem } from "@/models/propertyCategory";
import PropertyCategoriesTable from "./PropertyCategoriesTable";
import PropertyCategoryFormDrawer from "./PropertyCategoryFormDrawer";

export default function AdminPropertyCategoriesPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const { data, isLoading } = usePropertyCategoriesQuery({
    Language: "en",
    PageNumber: pageNumber,
    PageSize: pageSize,
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<PropertyCategoryItem | null>(null);

  const categories = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;
  const hasPreviousPage = data?.hasPreviousPage ?? pageNumber > 1;
  const hasNextPage = data?.hasNextPage ?? pageNumber < totalPages;

  function handleOpenCreate() {
    setSelectedCategory(null);
    setIsDrawerOpen(true);
  }

  function handleOpenEdit(item: PropertyCategoryItem) {
    setSelectedCategory(item);
    setIsDrawerOpen(true);
  }

  function handleCloseDrawer() {
    setIsDrawerOpen(false);
    setSelectedCategory(null);
  }

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p
              className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#145C4B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              VACATION RENTALS ARCHITECTURE
            </p>
            <h1
              className="mt-1 text-[28px] font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Rental Categories
            </h1>
            <p
              className="mt-1 text-[13px] text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Configure top-level rental amenity & equipment groups (Kitchen & Dining, Bathroom, Bedroom, Entertainment, Safety) with multilingual translations and icons.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 self-start rounded-xl bg-[#145C4B] px-4 py-2.5 text-[13px] font-semibold text-white shadow-xs transition-colors hover:bg-[#0F473A] sm:self-auto"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <FiPlus className="h-4 w-4" />
            <span>Add Rental Category</span>
          </button>
        </div>

        {/* Full-width Table */}
        <PropertyCategoriesTable
          categories={categories}
          isLoading={isLoading}
          pageNumber={pageNumber}
          totalPages={totalPages}
          hasPreviousPage={hasPreviousPage}
          hasNextPage={hasNextPage}
          onPageChange={setPageNumber}
          onEdit={handleOpenEdit}
        />

        {/* Right-Side Slide Drawer */}
        <PropertyCategoryFormDrawer
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          categoryToEdit={selectedCategory}
        />
      </div>
    </AdminShell>
  );
}

