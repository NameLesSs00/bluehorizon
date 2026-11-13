"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FiCheck,
  FiEdit2,
  FiImage,
  FiMapPin,
  FiStar,
  FiTrash2,
} from "react-icons/fi";
import { LuBuilding } from "react-icons/lu";
import { getFullStandaloneUnitMediaUrl } from "@/clientApi/standaloneUnitsApi";
import {
  useDeleteStandaloneUnitMutation,
  useToggleStandaloneUnitFeaturedMutation,
  useToggleStandaloneUnitStatusMutation,
} from "@/features/standaloneUnits/useStandaloneUnitsMutations";
import { StandaloneUnitItem } from "@/models/standaloneUnit";

interface StandaloneUnitsTableRowProps {
  unit: StandaloneUnitItem;
  onEdit: (unit: StandaloneUnitItem) => void;
  onManageImages: (unit: StandaloneUnitItem) => void;
  selectedCurrency: string;
}

export default function StandaloneUnitsTableRow({
  unit,
  onEdit,
  onManageImages,
  selectedCurrency,
}: StandaloneUnitsTableRowProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const deleteMutation = useDeleteStandaloneUnitMutation();
  const toggleStatusMutation = useToggleStandaloneUnitStatusMutation();
  const toggleFeaturedMutation = useToggleStandaloneUnitFeaturedMutation();

  const primaryImage =
    unit.images?.find((img) => img.isPrimary)?.imageUrl ||
    unit.images?.[0]?.imageUrl;
  const imageCount = unit.images?.length || 0;

  const matchedPrice = unit.prices?.find(
    (p) => p.currency.toUpperCase() === selectedCurrency.toUpperCase()
  );
  const displayPrice = matchedPrice
    ? matchedPrice.price
    : unit.price || 0;

  const currencySymbol =
    selectedCurrency === "EUR"
      ? "€"
      : selectedCurrency === "GBP"
      ? "£"
      : selectedCurrency === "EGP"
      ? "EGP "
      : "$";

  return (
    <tr className="transition-colors hover:bg-[#F0F3FA]/50">
      {/* Property Details */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3.5">
          <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border border-[#D0D9EA] bg-neutral-100">
            {primaryImage ? (
              <Image
                src={getFullStandaloneUnitMediaUrl(primaryImage)}
                alt={unit.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#1B3A6B]/10 text-[#1B3A6B]">
                <LuBuilding className="h-6 w-6" />
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-semibold text-[#202326]">
                {unit.name}
              </span>
              {unit.isFeatured && (
                <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                  <FiStar className="h-3 w-3" />
                  <span>Featured</span>
                </span>
              )}
            </div>

            <div className="mt-1 flex items-center gap-1.5 text-[12px] text-[#65706B]">
              <FiMapPin className="h-3.5 w-3.5 text-[#2B5FA6]" />
              <span>
                {[unit.city, unit.district].filter(Boolean).join(", ") ||
                  "Hurghada"}
              </span>
            </div>
          </div>
        </div>
      </td>

      {/* Type & Specs */}
      <td className="px-6 py-4">
        <div className="space-y-1">
          <span className="inline-block rounded-md border border-[#D9E2EE] bg-[#F9F7F4] px-2 py-0.5 text-[11px] font-semibold text-[#2B5FA6]">
            {unit.propertyType || "Villa"}
          </span>
          <p className="text-[12px] text-[#65706B]">
            {unit.area} m² • {unit.noBedRoom || 0} Beds • {unit.noBathRoom || 0} Baths
          </p>
        </div>
      </td>

      {/* Price */}
      <td className="px-6 py-4">
        <p className="text-[14px] font-bold text-[#1B3A6B]">
          {currencySymbol}
          {displayPrice.toLocaleString()}
        </p>
        <span className="text-[11px] text-[#65706B]">
          {unit.prices?.length || 1} currency rates
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={toggleStatusMutation.isPending}
            onClick={() =>
              toggleStatusMutation.mutate({
                id: unit.id,
                isActive: !unit.isActive,
              })
            }
            className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-[11px] font-semibold transition-all ${
              unit.isActive
                ? "border-blue-200 bg-blue-50 text-blue-800"
                : "border-neutral-200 bg-neutral-100 text-neutral-600"
            }`}
          >
            <FiCheck className={`h-3 w-3 ${unit.isActive ? "opacity-100" : "opacity-30"}`} />
            <span>{unit.isActive ? "Active" : "Inactive"}</span>
          </button>

          <button
            type="button"
            disabled={toggleFeaturedMutation.isPending}
            onClick={() =>
              toggleFeaturedMutation.mutate({
                id: unit.id,
                isFeatured: !unit.isFeatured,
              })
            }
            className={`rounded-md p-1.5 transition-colors ${
              unit.isFeatured
                ? "bg-amber-100 text-amber-700"
                : "bg-neutral-100 text-neutral-400 hover:text-amber-600"
            }`}
            title="Toggle Featured"
          >
            <FiStar className="h-4 w-4" />
          </button>
        </div>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-right">
        {confirmDelete ? (
          <div className="inline-flex items-center gap-1.5">
            <button
              type="button"
              disabled={deleteMutation.isPending}
              onClick={() => {
                deleteMutation.mutate(unit.id);
                setConfirmDelete(false);
              }}
              className="rounded-lg bg-red-600 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-red-700 disabled:opacity-50"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={() => setConfirmDelete(false)}
              className="rounded-lg border border-[#D0D9EA] px-2 py-1 text-[11px] font-medium text-[#65706B] hover:bg-[#F0F3FA]"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onManageImages(unit)}
              className="inline-flex items-center gap-1 rounded-lg border border-[#D0D9EA] bg-white px-2.5 py-1.5 text-[12px] font-medium text-[#2B5FA6] hover:bg-[#F9F7F4]"
            >
              <FiImage className="h-3.5 w-3.5" />
              <span>Images ({imageCount})</span>
            </button>
            <button
              type="button"
              onClick={() => onEdit(unit)}
              className="inline-flex items-center gap-1 rounded-lg border border-[#D0D9EA] bg-white px-2.5 py-1.5 text-[12px] font-medium text-[#202326] hover:bg-[#F0F3FA]"
            >
              <FiEdit2 className="h-3.5 w-3.5" />
              <span>Edit</span>
            </button>
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-[12px] font-medium text-red-600 hover:bg-red-50"
            >
              <FiTrash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

