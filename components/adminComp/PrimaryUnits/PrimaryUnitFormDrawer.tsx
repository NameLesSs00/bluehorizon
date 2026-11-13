"use client";

import { useEffect, useState } from "react";
import { FiUpload, FiX } from "react-icons/fi";
import { toast } from "sonner";
import AdminSlideDrawer from "@/components/adminComp/Common/AdminSlideDrawer";
import {
  PrimaryUnitFormPayload,
  PrimaryUnitItem,
  PropertyType,
} from "@/models/primaryUnit";
import {
  useCreatePrimaryUnitMutation,
  useLocalizedPrimaryUnitQuery,
  useUpdatePrimaryUnitMutation,
} from "@/features/primaryUnits/usePrimaryUnitsQueries";
import PrimaryUnitBasicFields from "./PrimaryUnitBasicFields";
import PrimaryUnitLanguageFields from "./PrimaryUnitLanguageFields";
import PrimaryUnitPricingServicesFields from "./PrimaryUnitPricingServicesFields";

interface PrimaryUnitFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  unitToEdit: PrimaryUnitItem | null;
}

const defaultForm: PrimaryUnitFormPayload = {
  projectId: undefined,
  name: { en: "", ar: "", de: "" },
  description: { en: "", ar: "", de: "" },
  view: { en: "", ar: "", de: "" },
  floorName: { en: "", ar: "", de: "" },
  area: 120,
  noBathRoom: 2,
  noBedRoom: 2,
  noKitchen: 1,
  propertyType: PropertyType.Apartment,
  floorNumber: 1,
  isFeatured: false,
  priceUSD: 150000,
  serviceIds: [],
};

export default function PrimaryUnitFormDrawer({
  isOpen,
  onClose,
  unitToEdit,
}: PrimaryUnitFormDrawerProps) {
  const isEditMode = Boolean(unitToEdit);
  const editId = unitToEdit?.id ?? null;

  const { data: detailsData, isLoading: isLoadingDetails } =
    useLocalizedPrimaryUnitQuery(editId, isOpen);

  const [formData, setFormData] = useState<PrimaryUnitFormPayload>(defaultForm);
  const [initialImages, setInitialImages] = useState<File[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setFormData(defaultForm);
      setInitialImages([]);
      return;
    }

    if (unitToEdit) {
      if (detailsData) {
        setFormData({
          projectId: detailsData.projectId,
          name: detailsData.name,
          description: detailsData.description,
          view: detailsData.view,
          floorName: detailsData.floorName,
          area: detailsData.area,
          noBathRoom: detailsData.noBathRoom,
          noBedRoom: detailsData.noBedRoom,
          noKitchen: detailsData.noKitchen,
          propertyType: detailsData.propertyType,
          floorNumber: detailsData.floorNumber,
          isFeatured: detailsData.isFeatured,
          priceUSD: detailsData.priceUSD,
          serviceIds: detailsData.serviceIds,
        });
      } else {
        const usdPrice =
          unitToEdit.prices.find((p) => p.currency === "USD")?.price || 150000;

        setFormData({
          projectId: unitToEdit.projectId,
          name: { en: unitToEdit.name, ar: "", de: "" },
          description: { en: unitToEdit.description, ar: "", de: "" },
          view: { en: unitToEdit.view || "", ar: "", de: "" },
          floorName: { en: unitToEdit.floorName || "", ar: "", de: "" },
          area: unitToEdit.area || 120,
          noBathRoom: unitToEdit.noBathRoom || 2,
          noBedRoom: unitToEdit.noBedRoom || 2,
          noKitchen: unitToEdit.noKitchen || 1,
          propertyType: (typeof unitToEdit.propertyType === "number"
            ? unitToEdit.propertyType
            : PropertyType.Apartment) as PropertyType,
          floorNumber: unitToEdit.floorNumber || 1,
          isFeatured: unitToEdit.isFeatured ?? false,
          priceUSD: usdPrice,
          serviceIds: unitToEdit.services?.map((s) => s.id) || [],
        });
      }
    } else {
      setFormData(defaultForm);
      setInitialImages([]);
    }
  }, [isOpen, unitToEdit, detailsData]);

  const createMutation = useCreatePrimaryUnitMutation(onClose);
  const updateMutation = useUpdatePrimaryUnitMutation(onClose);
  const isPending = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.en.trim()) {
      toast.error("English unit title is required");
      return;
    }
    if (!formData.description.en.trim()) {
      toast.error("English unit description is required");
      return;
    }
    if (formData.priceUSD <= 0) {
      toast.error("Base price (USD) must be greater than zero");
      return;
    }
    if (formData.area <= 0) {
      toast.error("Unit area must be greater than zero");
      return;
    }

    if (isEditMode && editId) {
      updateMutation.mutate({ id: editId, payload: formData });
    } else {
      createMutation.mutate({ payload: formData, initialImages });
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setInitialImages((prev) => [...prev, ...filesArray]);
    }
  };

  const removeSelectedFile = (idx: number) => {
    setInitialImages((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <AdminSlideDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Primary Unit" : "Add Primary Unit"}
      subtitle={
        isEditMode
          ? `Editing unit: ${formData.name.en || unitToEdit?.name || ""}`
          : "Create a new developer off-plan unit associated with a compound project"
      }
      maxWidthClass="max-w-3xl"
    >
      {isLoadingDetails && isEditMode ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#2B5FA6] border-t-transparent" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 pb-12">
          {/* Section 1: Basic Specifications & Project */}
          <PrimaryUnitBasicFields formData={formData} onChange={setFormData} />

          {/* Section 2: Multilingual Language Fields */}
          <PrimaryUnitLanguageFields formData={formData} onChange={setFormData} />

          {/* Section 3: Pricing & Services */}
          <PrimaryUnitPricingServicesFields formData={formData} onChange={setFormData} />

          {/* Section 4: Initial Photo Upload (Create mode) */}
          {!isEditMode && (
            <div className="space-y-3">
              <h3 className="border-b border-[#E2E8F3] pb-2 text-[14px] font-bold text-[#2B5FA6]">
                Unit Photos (Initial Upload)
              </h3>
              <p className="text-[11px] text-[#5A6561]">
                Upload unit gallery images directly upon listing creation:
              </p>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#D0D9EA] bg-[#F7F9F8] p-6 text-center transition-colors hover:border-[#2B5FA6] hover:bg-[#F0F4F2]">
                <FiUpload className="h-6 w-6 text-[#2B5FA6]" />
                <span className="mt-2 text-[12px] font-semibold text-[#202326]">
                  Click to select photos
                </span>
                <span className="text-[11px] text-[#5A6561]">
                  WebP, PNG, JPG supported (select multiple)
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </label>

              {initialImages.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {initialImages.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 rounded-lg border border-[#D0D9EA] bg-white px-2.5 py-1 text-[11px] text-[#202326]"
                    >
                      <span className="max-w-[140px] truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeSelectedFile(idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiX className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Footer Actions */}
          <div className="sticky bottom-0 -mx-6 -mb-12 flex items-center justify-end gap-3 border-t border-[#E2E8F3] bg-white p-4">
            <button
              type="button"
              disabled={isPending}
              onClick={onClose}
              className="rounded-xl border border-[#D0D9EA] px-4 py-2.5 text-[13px] font-semibold text-[#5A6561] hover:bg-[#F7F9F8]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 rounded-xl bg-[#2B5FA6] px-5 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:bg-[#1B3A6B] disabled:opacity-50"
            >
              {isPending
                ? "Saving..."
                : isEditMode
                ? "Update Primary Unit"
                : "Create Primary Unit"}
            </button>
          </div>
        </form>
      )}
    </AdminSlideDrawer>
  );
}

