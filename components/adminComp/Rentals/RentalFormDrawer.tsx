"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import AdminSlideDrawer from "@/components/adminComp/Common/AdminSlideDrawer";
import {
  PropertyType,
  RentalFormPayload,
  RentalItem,
} from "@/models/rental";
import {
  useCreateRentalMutation,
  useLocalizedRentalQuery,
  useUpdateRentalMutation,
} from "@/features/rentals/useRentalsQueries";
import RentalBasicFields from "./RentalBasicFields";
import RentalLanguageFields from "./RentalLanguageFields";
import RentalPricingViews from "./RentalPricingViews";
import RentalListingDetailsFields from "./RentalListingDetailsFields";
import RentalRelationsFields from "./RentalRelationsFields";

interface RentalFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  rentalToEdit: RentalItem | null;
}

const defaultForm: RentalFormPayload = {
  code: "",
  name: { en: "", ar: "", de: "" },
  description: { en: "", ar: "", de: "" },
  rentalLocationId: 0,
  floor: "",
  bedroomNo: 1,
  bathroomNo: 1,
  capacity: 2,
  size: 80,
  priceUSD: 100,
  propertyType: PropertyType.Apartment,
  isAvailable: true,
  isFeatured: false,
  hasSeaView: false,
  hasPoolView: false,
  hasGardenView: false,
  hasMountainView: false,
  hasCityView: false,
  rulesCancellation: { en: "", ar: "", de: "" },
  notes: "",
  listingDetails: {
    lateCheckIn: "",
    services: [],
    extraPeopleFee: 0,
    familyFriendly: true,
    privateEntrance: true,
    extraPeople: "",
  },
  propertyCategoryItemIds: [],
  infoAreaPlaces: [],
};

export default function RentalFormDrawer({
  isOpen,
  onClose,
  rentalToEdit,
}: RentalFormDrawerProps) {
  const isEditMode = Boolean(rentalToEdit);
  const editId = rentalToEdit?.id ?? null;

  const { data: detailsData, isLoading: isLoadingDetails } =
    useLocalizedRentalQuery(editId, isOpen);

  const [formData, setFormData] = useState<RentalFormPayload>(defaultForm);
  const [initialImages, setInitialImages] = useState<File[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setFormData(defaultForm);
      setInitialImages([]);
      return;
    }

    if (rentalToEdit) {
      if (detailsData) {
        setFormData({
          id: detailsData.id,
          code: detailsData.code,
          name: detailsData.name,
          description: detailsData.description,
          rentalLocationId: detailsData.rentalLocationId,
          floor: detailsData.floor,
          bedroomNo: detailsData.bedroomNo,
          bathroomNo: detailsData.bathroomNo,
          capacity: detailsData.capacity,
          size: detailsData.size,
          priceUSD: detailsData.priceUSD,
          propertyType: detailsData.propertyType,
          isAvailable: detailsData.isAvailable,
          isFeatured: detailsData.isFeatured,
          hasSeaView: detailsData.hasSeaView,
          hasPoolView: detailsData.hasPoolView,
          hasGardenView: detailsData.hasGardenView,
          hasMountainView: detailsData.hasMountainView,
          hasCityView: detailsData.hasCityView,
          rulesCancellation: detailsData.rulesCancellation,
          notes: detailsData.notes,
          listingDetails: detailsData.listingDetails,
          propertyCategoryItemIds: detailsData.propertyCategoryItemIds,
          infoAreaPlaces: detailsData.infoAreaPlaces,
        });
      } else {
        const usdPrice =
          rentalToEdit.prices.find((p) => p.currency === "USD")?.price || 100;

        setFormData({
          id: rentalToEdit.id,
          code: rentalToEdit.code,
          name: { en: rentalToEdit.name, ar: "", de: "" },
          description: { en: rentalToEdit.description, ar: "", de: "" },
          rentalLocationId: rentalToEdit.rentalLocation?.id || 0,
          floor: rentalToEdit.floor,
          bedroomNo: rentalToEdit.bedroomNo,
          bathroomNo: rentalToEdit.bathroomNo,
          capacity: rentalToEdit.capacity,
          size: rentalToEdit.size,
          priceUSD: usdPrice,
          propertyType: rentalToEdit.propertyType,
          isAvailable: rentalToEdit.isAvailable,
          isFeatured: rentalToEdit.isFeatured,
          hasSeaView: rentalToEdit.hasSeaView,
          hasPoolView: rentalToEdit.hasPoolView,
          hasGardenView: rentalToEdit.hasGardenView,
          hasMountainView: rentalToEdit.hasMountainView,
          hasCityView: rentalToEdit.hasCityView,
          rulesCancellation: {
            en: rentalToEdit.rulesCancellation,
            ar: "",
            de: "",
          },
          notes: rentalToEdit.notes,
          listingDetails: rentalToEdit.listingDetails,
          propertyCategoryItemIds:
            rentalToEdit.categoryItems?.map((c) => c.id) || [],
          infoAreaPlaces:
            rentalToEdit.infoAreaPlaces?.map((iap) => ({
              infoAreaPlaceId: iap.id,
              distance: iap.distance,
            })) || [],
        });
      }
    } else {
      setFormData(defaultForm);
    }
  }, [isOpen, rentalToEdit, detailsData]);

  const createMutation = useCreateRentalMutation(onClose);
  const updateMutation = useUpdateRentalMutation(onClose);

  const isSaving = createMutation.isPending || updateMutation.isPending;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.code.trim()) {
      toast.error("Property code is required.");
      return;
    }
    if (!formData.name.en.trim()) {
      toast.error("English property title is required.");
      return;
    }
    if (!formData.rentalLocationId) {
      toast.error("Please select a Rental Location.");
      return;
    }

    const payload: RentalFormPayload = {
      ...formData,
      code: formData.code.trim(),
      name: {
        en: formData.name.en.trim(),
        ar: formData.name.ar.trim() || formData.name.en.trim(),
        de: formData.name.de.trim() || formData.name.en.trim(),
      },
      description: {
        en: formData.description.en.trim(),
        ar: formData.description.ar.trim() || formData.description.en.trim(),
        de: formData.description.de.trim() || formData.description.en.trim(),
      },
      rulesCancellation: {
        en: formData.rulesCancellation.en.trim(),
        ar:
          formData.rulesCancellation.ar.trim() ||
          formData.rulesCancellation.en.trim(),
        de:
          formData.rulesCancellation.de.trim() ||
          formData.rulesCancellation.en.trim(),
      },
    };

    if (isEditMode && editId) {
      updateMutation.mutate({ id: editId, payload });
    } else {
      createMutation.mutate({
        payload,
        initialImages: initialImages.length > 0 ? initialImages : undefined,
      });
    }
  }

  return (
    <AdminSlideDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Rental Property" : "Add Rental Property"}
      subtitle={
        isEditMode
          ? "Update rental specifications, pricing, amenities, and localization"
          : "Create a new rental accommodation unit for guests and tenants"
      }
      maxWidthClass="max-w-3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {isLoadingDetails && isEditMode && (
          <div className="rounded-xl border border-[#C5D3E8] bg-[#F9F7F4] p-3 text-[12px] text-[#2B5FA6]">
            Loading localized translations for EN, DE, and AR...
          </div>
        )}

        {/* 1. Basic Specifications */}
        <RentalBasicFields formData={formData} onChange={setFormData} />

        {/* 2. Multilingual Names, Descriptions, and Policies */}
        <RentalLanguageFields formData={formData} onChange={setFormData} />

        {/* 3. Pricing & Views */}
        <RentalPricingViews formData={formData} onChange={setFormData} />

        {/* 4. Hospitality Details & Rules */}
        <RentalListingDetailsFields
          formData={formData}
          onChange={setFormData}
        />

        {/* 5. Connected Amenities & Landmark Distances */}
        <RentalRelationsFields formData={formData} onChange={setFormData} />

        {/* 6. Initial Images on Create */}
        {!isEditMode && (
          <div className="rounded-xl border border-[#E2E8F3] bg-[#F9F7F4] p-4">
            <p className="text-[12px] font-bold uppercase tracking-wider text-[#2B5FA6]">
              Initial Photos (Optional)
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) {
                  setInitialImages(Array.from(e.target.files));
                }
              }}
              className="mt-2 block w-full text-[12px] text-[#65706B] file:mr-3 file:rounded-lg file:border-0 file:bg-[#2B5FA6] file:px-3 file:py-1.5 file:text-[12px] file:font-semibold file:text-white hover:file:bg-[#1B3A6B]"
            />
            {initialImages.length > 0 && (
              <p className="mt-1.5 text-[11px] text-[#2B5FA6]">
                {initialImages.length} photo(s) selected
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 border-t border-[#E2E8F3] pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#D0D9EA] bg-white px-4 py-2.5 text-[13px] font-medium text-[#202326] transition-colors hover:bg-[#F9F7F4]"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="rounded-xl bg-[#2B5FA6] px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#1B3A6B] disabled:opacity-50"
          >
            {isSaving
              ? "Saving..."
              : isEditMode
              ? "Update Rental"
              : "Create Rental"}
          </button>
        </div>
      </form>
    </AdminSlideDrawer>
  );
}

