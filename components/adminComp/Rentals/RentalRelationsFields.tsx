"use client";

import { usePropertyCategoryItemsQuery } from "@/features/propertyCategoryItems/usePropertyCategoryItemsQueries";
import { useInfoAreaPlacesQuery } from "@/features/infoAreaPlaces/useInfoAreaPlacesQueries";
import { RentalFormPayload } from "@/models/rental";

interface RentalRelationsFieldsProps {
  formData: RentalFormPayload;
  onChange: (
    updater: (prev: RentalFormPayload) => RentalFormPayload
  ) => void;
}

export default function RentalRelationsFields({
  formData,
  onChange,
}: RentalRelationsFieldsProps) {
  const { data: categoryItemsData } = usePropertyCategoryItemsQuery({
    Language: "en",
    PageSize: 100,
  });
  const { data: areaPlacesData } = useInfoAreaPlacesQuery({
    Language: "en",
    PageSize: 100,
  });

  const categoryItems = categoryItemsData?.items || [];
  const areaPlaces = areaPlacesData?.items || [];

  function handleToggleCategoryItem(id: number) {
    const isSelected = formData.propertyCategoryItemIds.includes(id);
    onChange((prev) => ({
      ...prev,
      propertyCategoryItemIds: isSelected
        ? prev.propertyCategoryItemIds.filter((itemId) => itemId !== id)
        : [...prev.propertyCategoryItemIds, id],
    }));
  }

  function handleTogglePlace(placeId: number) {
    const existingIndex = formData.infoAreaPlaces.findIndex(
      (p) => p.infoAreaPlaceId === placeId
    );

    if (existingIndex >= 0) {
      onChange((prev) => ({
        ...prev,
        infoAreaPlaces: prev.infoAreaPlaces.filter(
          (p) => p.infoAreaPlaceId !== placeId
        ),
      }));
    } else {
      onChange((prev) => ({
        ...prev,
        infoAreaPlaces: [
          ...prev.infoAreaPlaces,
          { infoAreaPlaceId: placeId, distance: "500 meters" },
        ],
      }));
    }
  }

  function handleUpdateDistance(placeId: number, distance: string) {
    onChange((prev) => ({
      ...prev,
      infoAreaPlaces: prev.infoAreaPlaces.map((p) =>
        p.infoAreaPlaceId === placeId ? { ...p, distance } : p
      ),
    }));
  }

  return (
    <div className="space-y-6">
      {/* Category / Amenities Items */}
      <div className="space-y-3 rounded-xl border border-[#E6EAE7] bg-[#FAF8F5] p-4">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-bold uppercase tracking-wider text-[#145C4B]">
            Rental Amenities &amp; Features ({formData.propertyCategoryItemIds.length})
          </p>
          <span className="text-[11px] text-[#65706B]">
            Click to select/deselect
          </span>
        </div>

        {categoryItems.length === 0 ? (
          <p className="text-[12px] text-[#65706B]">
            No amenities defined. Create items in Rental Items management.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {categoryItems.map((item) => {
              const isSelected = formData.propertyCategoryItemIds.includes(
                item.id
              );
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleToggleCategoryItem(item.id)}
                  className={`rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-all ${
                    isSelected
                      ? "bg-[#145C4B] text-white shadow-sm"
                      : "border border-[#DCE2DE] bg-white text-[#202326] hover:bg-[#FAF8F5]"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Nearby Places / Landmarks */}
      <div className="space-y-3 rounded-xl border border-[#E6EAE7] bg-[#FAF8F5] p-4">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-bold uppercase tracking-wider text-[#145C4B]">
            Nearby Places &amp; Distances ({formData.infoAreaPlaces.length})
          </p>
          <span className="text-[11px] text-[#65706B]">
            Select landmarks &amp; enter distance
          </span>
        </div>

        {areaPlaces.length === 0 ? (
          <p className="text-[12px] text-[#65706B]">
            No places found. Create landmarks in Rental Area Places.
          </p>
        ) : (
          <div className="space-y-2">
            {areaPlaces.map((place) => {
              const selectedEntry = formData.infoAreaPlaces.find(
                (p) => p.infoAreaPlaceId === place.id
              );
              const isSelected = Boolean(selectedEntry);

              return (
                <div
                  key={place.id}
                  className={`flex flex-col gap-2 rounded-xl border p-3 transition-colors sm:flex-row sm:items-center sm:justify-between ${
                    isSelected
                      ? "border-[#145C4B] bg-white"
                      : "border-[#E6EAE7] bg-white/70"
                  }`}
                >
                  <label className="flex cursor-pointer items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleTogglePlace(place.id)}
                      className="h-4 w-4 rounded border-gray-300 text-[#145C4B] focus:ring-[#145C4B]"
                    />
                    <span className="text-[13px] font-semibold text-[#202326]">
                      {place.name}
                    </span>
                  </label>

                  {isSelected && (
                    <div className="flex items-center gap-2 pl-6 sm:pl-0">
                      <span className="text-[11px] text-[#65706B]">
                        Distance:
                      </span>
                      <input
                        type="text"
                        value={selectedEntry?.distance || ""}
                        onChange={(e) =>
                          handleUpdateDistance(place.id, e.target.value)
                        }
                        placeholder="e.g. 500 meters or 5 min drive"
                        className="rounded-lg border border-[#DCE2DE] bg-neutral-50 px-2.5 py-1 text-[12px] text-[#202326] focus:border-[#145C4B] focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
