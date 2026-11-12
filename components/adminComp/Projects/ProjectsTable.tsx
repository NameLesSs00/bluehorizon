"use client";

import { useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiCreditCard, FiEdit2, FiImage, FiMapPin, FiTrash2 } from "react-icons/fi";
import { LuBuilding, LuSparkles } from "react-icons/lu";
import { getFullProjectImageUrl } from "@/clientApi/projectsApi";
import { useDeleteProjectMutation } from "@/features/projects/useProjectsQueries";
import { FurnitureTypeEnum, ProjectItem } from "@/models/project";
import DynamicIcon from "@/components/adminComp/Common/DynamicIcon";

interface ProjectsTableProps {
  projects: ProjectItem[];
  isLoading: boolean;
  selectedCurrency: string;
  pageNumber: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPageChange: (newPage: number) => void;
  onEdit: (project: ProjectItem) => void;
  onManageImages: (project: ProjectItem) => void;
  onManagePaymentPlans: (project: ProjectItem) => void;
}

function formatPriceRange(project: ProjectItem, currencyCode: string): string {
  const price = project.prices?.find((p) => p.currency.toUpperCase() === currencyCode.toUpperCase());
  if (!price || (!price.minimumPrice && !price.maximumPrice)) return "Price on request";
  const symbol = currencyCode === "USD" ? "$" : currencyCode === "EUR" ? "€" : currencyCode === "GBP" ? "£" : "EGP ";
  const minFormatted = price.minimumPrice ? Number(price.minimumPrice).toLocaleString() : "0";
  const maxFormatted = price.maximumPrice ? Number(price.maximumPrice).toLocaleString() : "";
  return maxFormatted ? `${symbol}${minFormatted} - ${symbol}${maxFormatted}` : `From ${symbol}${minFormatted}`;
}

export default function ProjectsTable({
  projects,
  isLoading,
  selectedCurrency,
  pageNumber,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  onPageChange,
  onEdit,
  onManageImages,
  onManagePaymentPlans,
}: ProjectsTableProps) {
  const deleteMutation = useDeleteProjectMutation();
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  function handleConfirmDelete(id: number) {
    deleteMutation.mutate(id, { onSettled: () => setConfirmDeleteId(null) });
  }

  if (isLoading) {
    return (
      <div className="flex h-72 w-full items-center justify-center rounded-2xl border border-[#E6EAE7] bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0F473A] border-t-transparent" />
          <p className="text-[13px] text-[#65706B]">Loading developments &amp; projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#E6EAE7] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E6EAE7] bg-[#FAF8F5]">
              <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Project
              </th>
              <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Location &amp; Types
              </th>
              <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Price Range ({selectedCurrency})
              </th>
              <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Specs &amp; Delivery
              </th>
              <th className="px-6 py-4 text-right text-[12px] font-bold uppercase tracking-[0.08em] text-[#65706B]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E6EAE7]">
            {projects.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center text-[14px] text-[#65706B]">
                  No projects found. Add your first development project to get started.
                </td>
              </tr>
            ) : (
              projects.map((proj) => {
                const coverImage =
                  proj.images?.find((img) => img.isPrimary)?.imageUrl ||
                  proj.images?.[0]?.imageUrl ||
                  proj.imageUrls?.[0];
                const imageCount =
                  proj.images?.length || proj.imageUrls?.length || 0;
                const priceText = formatPriceRange(proj, selectedCurrency);

                const deliveryFormatted = proj.deliveryDate
                  ? new Date(proj.deliveryDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                  : "Ready / TBD";

                return (
                  <tr key={proj.id} className="transition-colors hover:bg-[#F3F5F3]/50">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3.5">
                        <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-xl border border-[#DCE2DE] bg-neutral-100">
                          {coverImage ? (
                            <Image
                              src={getFullProjectImageUrl(coverImage)}
                              alt={proj.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-[#0F473A]/10 text-[#0F473A]">
                              <LuBuilding className="h-5 w-5" />
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[15px] font-semibold text-[#202326]">
                              {proj.name}
                            </span>
                            {proj.isFeature && (
                              <span className="inline-flex items-center gap-1 rounded-md bg-[#25D366]/15 px-2 py-0.5 text-[10px] font-bold text-[#0F473A]">
                                <LuSparkles className="h-3 w-3" />
                                <span>Featured</span>
                              </span>
                            )}
                          </div>
                          <p className="line-clamp-1 max-w-xs text-[12px] text-[#65706B]">
                            {proj.description || "No description"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1 text-[13px] font-semibold text-[#202326]">
                          <FiMapPin className="h-3.5 w-3.5 text-[#145C4B]" />
                          <span>{proj.locationName || "Location TBD"}</span>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {proj.projectTypes?.map((t) => (
                            <span
                              key={t.id}
                              className="inline-flex items-center gap-1 rounded-md border border-[#E6EAE7] bg-[#FAF8F5] px-2 py-0.5 text-[11px] text-[#202326]"
                            >
                              <DynamicIcon name={t.icon} className="h-3 w-3 text-[#145C4B]" />
                              <span>{t.name}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <p className="text-[14px] font-bold text-[#0F473A]">
                        {priceText}
                      </p>
                      <span className="text-[11px] text-[#65706B]">
                        {proj.prices?.length || 0} currencies configured
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="space-y-1 text-[12px] text-[#65706B]">
                        <p>
                          Delivery: <strong className="text-[#202326]">{deliveryFormatted}</strong>
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-[#202326]">
                            {proj.furnitureType === "Fully" || proj.furnitureType === 2
                              ? "Fully Furnished"
                              : proj.furnitureType === "Semi" || proj.furnitureType === 1
                              ? "Semi-Furnished"
                              : "Unfurnished"}
                          </span>
                          <span className="text-[11px]">
                            {proj.facilities?.length || 0} facilities
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-right">
                      {confirmDeleteId === proj.id ? (
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            disabled={deleteMutation.isPending}
                            onClick={() => handleConfirmDelete(proj.id)}
                            className="rounded-lg bg-red-600 px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                          >
                            {deleteMutation.isPending ? "Deleting..." : "Confirm"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(null)}
                            className="rounded-lg border border-[#DCE2DE] px-2.5 py-1.5 text-[12px] font-medium text-[#65706B] hover:bg-[#F3F5F3]"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => onManagePaymentPlans(proj)}
                            className="inline-flex items-center gap-1 rounded-lg border border-[#DCE2DE] bg-white px-2.5 py-1.5 text-[12px] font-medium text-[#145C4B] hover:bg-[#FAF8F5]"
                          >
                            <FiCreditCard className="h-3.5 w-3.5" />
                            <span>Plans</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onManageImages(proj)}
                            className="inline-flex items-center gap-1 rounded-lg border border-[#DCE2DE] bg-white px-2.5 py-1.5 text-[12px] font-medium text-[#145C4B] hover:bg-[#FAF8F5]"
                          >
                            <FiImage className="h-3.5 w-3.5" />
                            <span>Images ({imageCount})</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onEdit(proj)}
                            className="inline-flex items-center gap-1 rounded-lg border border-[#DCE2DE] bg-white px-2.5 py-1.5 text-[12px] font-medium text-[#202326] hover:bg-[#F3F5F3]"
                          >
                            <FiEdit2 className="h-3.5 w-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(proj.id)}
                            className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-[12px] font-medium text-red-600 hover:bg-red-50"
                          >
                            <FiTrash2 className="h-3.5 w-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between border-t border-[#E6EAE7] bg-[#FAF8F5] px-6 py-4">
        <p className="text-[13px] text-[#65706B]">
          Page <span className="font-semibold text-[#202326]">{pageNumber}</span> of{" "}
          <span className="font-semibold text-[#202326]">{Math.max(1, totalPages)}</span>
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={!hasPreviousPage && pageNumber <= 1}
            onClick={() => onPageChange(Math.max(1, pageNumber - 1))}
            className="inline-flex items-center gap-1 rounded-lg border border-[#DCE2DE] bg-white px-3.5 py-1.5 text-[12px] font-medium text-[#202326] transition-colors hover:bg-[#F3F5F3] disabled:cursor-not-allowed disabled:opacity-45"
          >
            <FiChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            disabled={!hasNextPage && pageNumber >= totalPages}
            onClick={() => onPageChange(pageNumber + 1)}
            className="inline-flex items-center gap-1 rounded-lg border border-[#DCE2DE] bg-white px-3.5 py-1.5 text-[12px] font-medium text-[#202326] transition-colors hover:bg-[#F3F5F3] disabled:cursor-not-allowed disabled:opacity-45"
          >
            <span>Next</span>
            <FiChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
