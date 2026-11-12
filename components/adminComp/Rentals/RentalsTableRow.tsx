"use client";

import { useState } from "react";
import Image from "next/image";
import { FiEdit2, FiHome, FiImage, FiTrash2, FiUsers } from "react-icons/fi";
import { PROPERTY_TYPE_LABELS, RentalItem } from "@/models/rental";
import { getFullRentalMediaUrl } from "@/clientApi/rentalsApi";
import { useDeleteRentalMutation } from "@/features/rentals/useRentalsQueries";

interface RentalsTableRowProps {
  rental: RentalItem;
  activeCurrency: string;
  onEdit: (rental: RentalItem) => void;
  onManageMedia: (rental: RentalItem) => void;
}

export default function RentalsTableRow({
  rental,
  activeCurrency,
  onEdit,
  onManageMedia,
}: RentalsTableRowProps) {
  const deleteMutation = useDeleteRentalMutation();
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  function handleConfirmDelete() {
    deleteMutation.mutate(rental.id, {
      onSettled: () => setIsConfirmingDelete(false),
    });
  }

  function formatPrice() {
    const matched = rental.prices?.find(
      (p) => p.currency.toUpperCase() === activeCurrency.toUpperCase()
    );
    const amount = matched ? matched.price : rental.prices?.[0]?.price || 0;
    const curr = matched ? matched.currency : activeCurrency;

    return `${curr} ${amount.toLocaleString()}`;
  }

  const primaryImage =
    rental.images?.find((img) => img.isPrimary) || rental.images?.[0];
  const imageCount = rental.images?.length || 0;
  const typeLabel = PROPERTY_TYPE_LABELS[rental.propertyType] || "Rental";

  return (
    <tr className="transition-colors hover:bg-[#F3F5F3]/50">
      {/* 1. Property Name & Thumbnail */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border border-[#DCE2DE] bg-neutral-100">
            {primaryImage?.imageUrl ? (
              <Image
                src={getFullRentalMediaUrl(primaryImage.imageUrl)}
                alt={rental.name}
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
            <p className="text-[14px] font-bold text-[#202326]">{rental.name}</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#65706B]">
                {rental.code}
              </span>
              <span className="rounded bg-[#145C4B]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[#145C4B]">
                {typeLabel}
              </span>
            </div>
          </div>
        </div>
      </td>

      {/* 2. Location & Specs */}
      <td className="px-6 py-5">
        <p className="text-[13px] font-semibold text-[#202326]">
          {rental.rentalLocation?.name || "Unassigned Area"}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-[#65706B]">
          <span>{rental.bedroomNo} Bed</span>
          <span>&bull;</span>
          <span>{rental.bathroomNo} Bath</span>
          <span>&bull;</span>
          <span className="inline-flex items-center gap-1">
            <FiUsers className="h-3 w-3" />
            <span>{rental.capacity} guests</span>
          </span>
          {rental.size > 0 && (
            <>
              <span>&bull;</span>
              <span>{rental.size} sqm</span>
            </>
          )}
        </div>
      </td>

      {/* 3. Nightly Rate */}
      <td className="px-6 py-5">
        <p className="text-[14px] font-bold text-[#145C4B]">{formatPrice()}</p>
        <span className="text-[10px] text-[#65706B]">per night</span>
      </td>

      {/* 4. Status & Views */}
      <td className="px-6 py-5">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                rental.isAvailable
                  ? "bg-[#25D366]/20 text-[#0F473A]"
                  : "bg-neutral-200 text-neutral-600"
              }`}
            >
              {rental.isAvailable ? "Available" : "Unavailable"}
            </span>

            {rental.isFeatured && (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-800">
                Featured
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-1">
            {rental.hasSeaView && (
              <span className="rounded bg-sky-50 px-1.5 py-0.5 text-[9px] font-medium text-sky-700">
                Sea
              </span>
            )}
            {rental.hasPoolView && (
              <span className="rounded bg-teal-50 px-1.5 py-0.5 text-[9px] font-medium text-teal-700">
                Pool
              </span>
            )}
            {rental.hasGardenView && (
              <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[9px] font-medium text-emerald-700">
                Garden
              </span>
            )}
          </div>
        </div>
      </td>

      {/* 5. Actions */}
      <td className="px-6 py-5 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => onManageMedia(rental)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCE2DE] bg-white px-2.5 py-1.5 text-[12px] font-medium text-[#145C4B] transition-colors hover:bg-[#FAF8F5]"
            title="Manage Photos"
          >
            <FiImage className="h-3.5 w-3.5" />
            <span>{imageCount}</span>
          </button>

          <button
            type="button"
            onClick={() => onEdit(rental)}
            className="inline-flex items-center gap-1 rounded-lg border border-[#DCE2DE] bg-white p-2 text-[#202326] transition-colors hover:bg-[#FAF8F5]"
            title="Edit Rental Details"
          >
            <FiEdit2 className="h-3.5 w-3.5" />
          </button>

          {isConfirmingDelete ? (
            <div className="inline-flex items-center gap-1">
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deleteMutation.isPending}
                className="rounded-lg bg-red-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-red-700 disabled:opacity-50"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => setIsConfirmingDelete(false)}
                className="rounded-lg border border-[#DCE2DE] bg-white px-2 py-1 text-[11px] text-[#65706B] hover:bg-neutral-100"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsConfirmingDelete(true)}
              className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 p-2 text-red-600 transition-colors hover:bg-red-100"
              title="Delete Rental"
            >
              <FiTrash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

