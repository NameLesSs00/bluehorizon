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
import {
  PrimaryUnitItem,
  PROPERTY_TYPE_LABELS,
  PropertyType,
} from "@/models/primaryUnit";
import { getFullPrimaryUnitMediaUrl } from "@/clientApi/primaryUnitsApi";
import {
  useDeletePrimaryUnitMutation,
  useUpdatePrimaryUnitFeaturedMutation,
  useUpdatePrimaryUnitStatusMutation,
} from "@/features/primaryUnits/usePrimaryUnitsQueries";

interface PrimaryUnitsTableRowProps {
  unit: PrimaryUnitItem;
  activeCurrency: string;
  onEdit: (unit: PrimaryUnitItem) => void;
  onManageMedia: (unit: PrimaryUnitItem) => void;
}

export default function PrimaryUnitsTableRow({
  unit,
  activeCurrency,
  onEdit,
  onManageMedia,
}: PrimaryUnitsTableRowProps) {
  const deleteMutation = useDeletePrimaryUnitMutation();
  const updateStatusMutation = useUpdatePrimaryUnitStatusMutation();
  const updateFeaturedMutation = useUpdatePrimaryUnitFeaturedMutation();
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  function handleConfirmDelete() {
    deleteMutation.mutate(unit.id, {
      onSettled: () => setIsConfirmingDelete(false),
    });
  }

  function formatPrice() {
    const matched = unit.prices?.find(
      (p) => p.currency.toUpperCase() === activeCurrency.toUpperCase()
    );
    const amount = matched ? matched.price : unit.prices?.[0]?.price || 0;
    const curr = matched ? matched.currency : activeCurrency;

    return `${curr} ${amount.toLocaleString()}`;
  }

  const primaryImage =
    unit.images?.find((img) => img.isPrimary) || unit.images?.[0];
  const imageCount = unit.images?.length || 0;

  const propertyTypeNum =
    typeof unit.propertyType === "number"
      ? (unit.propertyType as PropertyType)
      : PropertyType.Apartment;
  const typeLabel =
    typeof unit.propertyType === "string"
      ? unit.propertyType
      : PROPERTY_TYPE_LABELS[propertyTypeNum] || "Unit";

  return (
    <tr className="transition-colors hover:bg-[#F0F3FA]/50">
      {/* 1. Property Name & Thumbnail */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border border-[#D0D9EA] bg-neutral-100">
            {primaryImage?.imageUrl ? (
              <Image
                src={getFullPrimaryUnitMediaUrl(primaryImage.imageUrl)}
                alt={unit.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#1B3A6B]/10 text-[#1B3A6B]">
                <FiHome className="h-6 w-6" />
              </div>
            )}
          </div>

          <div>
            <p className="text-[14px] font-bold text-[#202326]">{unit.name}</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#65706B]">
                {unit.markerId || `#${unit.id}`}
              </span>
              <span className="rounded bg-[#2B5FA6]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[#2B5FA6]">
                {typeLabel}
              </span>
            </div>
            {unit.view && (
              <p className="mt-1 text-[11px] text-[#5A6561]">
                View: {unit.view}
              </p>
            )}
          </div>
        </div>
      </td>

      {/* 2. Project & Specs */}
      <td className="px-6 py-5">
        <p className="text-[13px] font-semibold text-[#202326]">
          {unit.projectName || "Independent Compound"}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-[#65706B]">
          <span>{unit.noBedRoom} Bed</span>
          <span>&bull;</span>
          <span>{unit.noBathRoom} Bath</span>
          <span>&bull;</span>
          <span>{unit.area} m²</span>
          {unit.floorNumber !== undefined && (
            <>
              <span>&bull;</span>
              <span>Floor {unit.floorNumber}</span>
            </>
          )}
        </div>
        {unit.services && unit.services.length > 0 && (
          <p className="mt-1 text-[10px] text-[#2B5FA6]">
            {unit.services.length} services included
          </p>
        )}
      </td>

      {/* 3. Base Price */}
      <td className="px-6 py-5">
        <p className="text-[14px] font-bold text-[#2B5FA6]">{formatPrice()}</p>
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
                id: unit.id,
                isActive: !unit.isActive,
              })
            }
            disabled={updateStatusMutation.isPending}
            className={`inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-opacity hover:opacity-80 disabled:opacity-50 ${
              unit.isActive
                ? "bg-[#25D366]/20 text-[#1B3A6B]"
                : "bg-neutral-200 text-neutral-600"
            }`}
          >
            {unit.isActive ? (
              <FiCheckCircle className="h-3 w-3" />
            ) : (
              <FiXCircle className="h-3 w-3" />
            )}
            <span>{unit.isActive ? "Active" : "Inactive"}</span>
          </button>

          {/* Featured Toggle */}
          <button
            type="button"
            onClick={() =>
              updateFeaturedMutation.mutate({
                id: unit.id,
                isFeatured: !unit.isFeatured,
              })
            }
            disabled={updateFeaturedMutation.isPending}
            className={`inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-opacity hover:opacity-80 disabled:opacity-50 ${
              unit.isFeatured
                ? "bg-amber-100 text-amber-800"
                : "bg-neutral-100 text-neutral-500"
            }`}
          >
            <FiStar className="h-3 w-3" />
            <span>{unit.isFeatured ? "Featured" : "Standard"}</span>
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
              className="rounded-lg border border-[#D0D9EA] bg-white px-3 py-1 text-[11px] font-medium text-[#202326] hover:bg-[#F0F3FA]"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-end gap-1.5">
            <button
              type="button"
              onClick={() => onManageMedia(unit)}
              className="relative rounded-lg p-2 text-[#5A6561] transition-colors hover:bg-[#F0F3FA] hover:text-[#1B3A6B]"
              title="Manage Photos"
            >
              <FiImage className="h-4 w-4" />
              {imageCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#1B3A6B] text-[9px] font-bold text-white">
                  {imageCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => onEdit(unit)}
              className="rounded-lg p-2 text-[#5A6561] transition-colors hover:bg-[#F0F3FA] hover:text-[#1B3A6B]"
              title="Edit Unit"
            >
              <FiEdit2 className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsConfirmingDelete(true)}
              className="rounded-lg p-2 text-[#5A6561] transition-colors hover:bg-red-50 hover:text-red-600"
              title="Delete Unit"
            >
              <FiTrash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

