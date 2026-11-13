"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import AdminSlideDrawer from "@/components/adminComp/Common/AdminSlideDrawer";
import {
  RentalLocationFormPayload,
  RentalLocationItem,
} from "@/models/rentalLocation";
import {
  useCreateRentalLocationMutation,
  useLocalizedRentalLocationQuery,
  useUpdateRentalLocationMutation,
} from "@/features/rentalLocations/useRentalLocationsQueries";
import RentalLocationLanguageFields from "./RentalLocationLanguageFields";
import RentalLocationInitialMedia from "./RentalLocationInitialMedia";

interface RentalLocationFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  locationToEdit: RentalLocationItem | null;
}

const emptyForm: RentalLocationFormPayload = {
  name: { en: "", ar: "", de: "" },
  description: { en: "", ar: "", de: "" },
};

export default function RentalLocationFormDrawer({
  isOpen,
  onClose,
  locationToEdit,
}: RentalLocationFormDrawerProps) {
  const isEditMode = Boolean(locationToEdit);
  const editId = locationToEdit?.id ?? null;

  const { data: detailsData, isLoading: isLoadingDetails } =
    useLocalizedRentalLocationQuery(editId, isOpen);

  const [formData, setFormData] = useState<RentalLocationFormPayload>(emptyForm);
  const [initialImages, setInitialImages] = useState<File[]>([]);
  const [initialVideo, setInitialVideo] = useState<File | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setFormData(emptyForm);
      setInitialImages([]);
      setInitialVideo(null);
      return;
    }

    if (locationToEdit) {
      if (detailsData) {
        setFormData({
          name: {
            en: detailsData.name.en || "",
            ar: detailsData.name.ar || "",
            de: detailsData.name.de || "",
          },
          description: {
            en: detailsData.description.en || "",
            ar: detailsData.description.ar || "",
            de: detailsData.description.de || "",
          },
        });
      } else {
        setFormData({
          name: { en: locationToEdit.name, ar: "", de: "" },
          description: { en: locationToEdit.description, ar: "", de: "" },
        });
      }
    } else {
      setFormData(emptyForm);
    }
  }, [isOpen, locationToEdit, detailsData]);

  const createMutation = useCreateRentalLocationMutation(onClose);
  const updateMutation = useUpdateRentalLocationMutation(onClose);

  const isSaving = createMutation.isPending || updateMutation.isPending;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.name.en.trim()) {
      toast.error("English name is required.");
      return;
    }

    const payload: RentalLocationFormPayload = {
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
    };

    if (isEditMode && editId) {
      updateMutation.mutate({ id: editId, payload });
    } else {
      createMutation.mutate({
        payload,
        initialImages: initialImages.length > 0 ? initialImages : undefined,
        initialVideo: initialVideo || undefined,
      });
    }
  }

  return (
    <AdminSlideDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Rental Location" : "Add Rental Location"}
      subtitle={
        isEditMode
          ? "Update localized details for this rental location"
          : "Add a new destination for long-term and short-term rentals"
      }
      maxWidthClass="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {isLoadingDetails && isEditMode && (
          <div className="rounded-xl border border-[#C5D3E8] bg-[#F9F7F4] p-3 text-[12px] text-[#2B5FA6]">
            Loading localized translations for EN, DE, and AR...
          </div>
        )}

        {/* Location Names & Descriptions in all languages side-by-side */}
        <RentalLocationLanguageFields
          formData={formData}
          onChange={setFormData}
        />

        {/* Initial Media on Create */}
        {!isEditMode && (
          <RentalLocationInitialMedia
            initialImages={initialImages}
            setInitialImages={setInitialImages}
            initialVideo={initialVideo}
            setInitialVideo={setInitialVideo}
          />
        )}

        {/* Actions */}
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
              ? "Update Location"
              : "Create Location"}
          </button>
        </div>
      </form>
    </AdminSlideDrawer>
  );
}
