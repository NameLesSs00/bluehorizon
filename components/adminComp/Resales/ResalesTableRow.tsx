"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FiCheckCircle,
  FiEdit2,
  FiHome,
  FiImage,
  FiStar,
  FiTrash2,
  FiXCircle,
} from "react-icons/fi";
import { PROPERTY_TYPE_LABELS, PropertyType, ResaleItem } from "@/models/resale";
import { getFullResaleMediaUrl } from "@/clientApi/resalesApi";
import {
  useDeleteResaleMutation,
  useUpdateResaleFeaturedMutation,
  useUpdateResaleStatusMutation,
} from "@/features/resales/useResalesQueries";

interface ResalesTableRowProps {
  resale: ResaleItem;
  activeCurrency: string;
  onEdit: (resale: ResaleItem) => void;
  onManageMedia: (resale: ResaleItem) => void;
}

export default function ResalesTableRow({
  resale,
  activeCurrency,
  onEdit,
  onManageMedia,
}: ResalesTableRowProps) {
  const deleteMutation = useDeleteResaleMutation();
  const updateStatusMutation = useUpdateResaleStatusMutation();
  const updateFeaturedMutation = useUpdateResaleFeaturedMutation();
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  function handleConfirmDelete() {
    deleteMutation.mutate(resale.id, {
      onSettled: () => setIsConfirmingDelete(false),
    });
  }

  function formatPrice() {
    const matched = resale.prices?.find(
      (p) => p.currency.toUpperCase() === activeCurrency.toUpperCase()
    );
    const amount = matched ? matched.price : resale.prices?.[0]?.price || 0;
    const curr = matched ? matched.currency : activeCurrency;

    return `${curr} ${amount.toLocaleString()}`;
  }

  const primaryImageUrl = resale.imageUrls?.[0];
  const imageCount = resale.imageUrls?.length || 0;

  const propertyTypeNum =
    typeof resale.propertyType === "number"
      ? (resale.propertyType as PropertyType)
      : PropertyType.Apartment;
  const typeLabel =
    typeof resale.propertyType === "string"
      ? resale.propertyType
      : PROPERTY_TYPE_LABELS[propertyTypeNum] || "Resale";

  return (
    <tr className="transition-colors hover:bg-[#F3F5F3]/50">
      {/* 1. Property Name & Thumbnail */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border border-[#DCE2DE] bg-neutral-100">
            {primaryImageUrl ? (
              <Image
                src={getFullResaleMediaUrl(primaryImageUrl)}
                alt={resale.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#0F473A]/10 text-[#0F473A]">
                <FiHome className="h-6 w-6" />
              </div>
            )}
          </div>

          <div>
            <p className="text-[14px] font-bold text-[#202326]">{resale.name}</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#65706B]">
                {resale.markerId || `#${resale.id}`}
              </span>
              <span className="rounded bg-[#145C4B]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[#145C4B]">
                {typeLabel}
              </span>
            </div>
            {resale.view && (
              <p className="mt-1 text-[11px] text-[#5A6561]">
                View: {resale.view}
              </p>
            )}
          </div>
        </div>
      </td>

      {/* 2. Project & Specs */}
      <td className="px-6 py-5">
        <p className="text-[13px] font-semibold text-[#202326]">
          {resale.projectName || resale.project?.name || "Independent"}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-[#65706B]">
          <span>{resale.noBedRoom} Bed</span>
          <span>&bull;</span>
          <span>{resale.noBathRoom} Bath</span>
          <span>&bull;</span>
          <span>{resale.area} m²</span>
          {resale.floorNumber !== undefined && (
            <>
              <span>&bull;</span>
              <span>Floor {resale.floorNumber}</span>
            </>
          )}
        </div>
        {resale.services && resale.services.length > 0 && (
          <p className="mt-1 text-[10px] text-[#145C4B]">
            {resale.services.length} services included
          </p>
        )}
      </td>

      {/* 3. Base Price */}
      <td className="px-6 py-5">
        <p className="text-[14px] font-bold text-[#145C4B]">{formatPrice()}</p>
        <span className="text-[10px] text-[#65706B]">converted price</span>
      </td>

      {/* 4. Status & Badges */}
      <td className="px-6 py-5">
        <div className="flex flex-col gap-2">
          {/* Active Status Toggle */}
          <button
            type="button"
            onClick={() =>
              updateStatusMutation.mutate({
                id: resale.id,
                isActive: !resale.isActive,
              })
            }
            disabled={updateStatusMutation.isPending}
            className={`inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-opacity hover:opacity-80 disabled:opacity-50 ${
              resale.isActive
                ? "bg-[#25D366]/20 text-[#0F473A]"
                : "bg-neutral-200 text-neutral-600"
            }`}
          >
            {resale.isActive ? (
              <FiCheckCircle className="h-3 w-3" />
            ) : (
              <FiXCircle className="h-3 w-3" />
            )}
            <span>{resale.isActive ? "Active" : "Inactive"}</span>
          </button>

          {/* Featured Toggle */}
          <button
            type="button"
            onClick={() =>
              updateFeaturedMutation.mutate({
                id: resale.id,
                isFeatured: !resale.isFeatured,
              })
            }
            disabled={updateFeaturedMutation.isPending}
            className={`inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-opacity hover:opacity-80 disabled:opacity-50 ${
              resale.isFeatured
                ? "bg-amber-100 text-amber-800"
                : "bg-neutral-100 text-neutral-500"
            }`}
          >
            <FiStar className="h-3 w-3" />
            <span>{resale.isFeatured ? "Featured" : "Standard"}</span>
          </button>
        </div>
      </td>

      {/* 5. Actions */}
      <td className="px-6 py-5 text-right">
        {isConfirmingDelete ? (
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleConfirmDelete}
              disabled={deleteMutation.isPending}
              className="rounded-lg bg-red-600 px-3 py-1 text-[11px] font-semibold text-white hover:bg-red-700 disabled:opacity-50"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={() => setIsConfirmingDelete(false)}
              className="rounded-lg border border-[#DCE2DE] bg-white px-3 py-1 text-[11px] font-medium text-[#202326] hover:bg-[#F3F5F3]"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-end gap-1.5">
            <button
              type="button"
              onClick={() => onManageMedia(resale)}
              className="relative rounded-lg p-2 text-[#5A6561] transition-colors hover:bg-[#F3F5F3] hover:text-[#0F473A]"
              title="Manage Photos"
            >
              <FiImage className="h-4 w-4" />
              {imageCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0F473A] text-[9px] font-bold text-white">
                  {imageCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => onEdit(resale)}
              className="rounded-lg p-2 text-[#5A6561] transition-colors hover:bg-[#F3F5F3] hover:text-[#0F473A]"
              title="Edit Property"
            >
              <FiEdit2 className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsConfirmingDelete(true)}
              className="rounded-lg p-2 text-[#5A6561] transition-colors hover:bg-red-50 hover:text-red-600"
              title="Delete Property"
            >
              <FiTrash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

