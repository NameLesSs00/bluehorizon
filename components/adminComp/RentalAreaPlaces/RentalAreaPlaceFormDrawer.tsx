"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FiSave } from "react-icons/fi";
import { getFullLocalizedInfoAreaPlace } from "@/clientApi/infoAreaPlacesApi";
import {
  useCreateInfoAreaPlaceMutation,
  useUpdateInfoAreaPlaceMutation,
} from "@/features/infoAreaPlaces/useInfoAreaPlacesQueries";
import { InfoAreaPlaceItem } from "@/models/infoAreaPlace";
import AdminSlideDrawer from "@/components/adminComp/Common/AdminSlideDrawer";
import {
  EgyptFlag,
  GermanyFlag,
  UkFlag,
} from "@/components/adminComp/Common/LanguageFlags";

interface RentalAreaPlaceFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  placeToEdit: InfoAreaPlaceItem | null;
}

export default function RentalAreaPlaceFormDrawer({
  isOpen,
  onClose,
  placeToEdit,
}: RentalAreaPlaceFormDrawerProps) {
  const isEditing = Boolean(placeToEdit);

  const [nameEn, setNameEn] = useState("");
  const [nameDe, setNameDe] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  useEffect(() => {
    if (placeToEdit && isOpen) {
      setIsLoadingDetails(true);
      setNameEn(placeToEdit.name || "");

      getFullLocalizedInfoAreaPlace(placeToEdit.id)
        .then((data) => {
          setNameEn(data.name.en || placeToEdit.name || "");
          setNameDe(data.name.de || "");
          setNameAr(data.name.ar || "");
        })
        .catch(() => {
          // Keep current values
        })
        .finally(() => {
          setIsLoadingDetails(false);
        });
    } else if (!placeToEdit && isOpen) {
      setNameEn("");
      setNameDe("");
      setNameAr("");
    }
  }, [placeToEdit, isOpen]);

  const createMutation = useCreateInfoAreaPlaceMutation(() => {
    onClose();
  });

  const updateMutation = useUpdateInfoAreaPlaceMutation(() => {
    onClose();
  });

  const isSaving = createMutation.isPending || updateMutation.isPending;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!nameEn.trim()) {
      toast.error("Please enter the place name in English.");
      return;
    }
    if (!nameDe.trim()) {
      toast.error("Please enter the place name in German.");
      return;
    }
    if (!nameAr.trim()) {
      toast.error("Please enter the place name in Arabic.");
      return;
    }

    if (isEditing && placeToEdit) {
      updateMutation.mutate({
        id: placeToEdit.id,
        payload: {
          id: placeToEdit.id,
          name: {
            en: nameEn.trim(),
            de: nameDe.trim(),
            ar: nameAr.trim(),
          },
        },
      });
    } else {
      createMutation.mutate({
        name: {
          en: nameEn.trim(),
          de: nameDe.trim(),
          ar: nameAr.trim(),
        },
      });
    }
  }

  return (
    <AdminSlideDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Rental Area Place" : "Add Rental Area Place"}
      subtitle="Nearby landmarks and points of interest attached to rental units"
      maxWidthClass="max-w-xl"
    >
      {isLoadingDetails ? (
        <div className="flex h-72 w-full items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#1B3A6B] border-t-transparent" />
            <p className="text-[13px] text-[#65706B]">
              Fetching translations...
            </p>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex h-full flex-col justify-between space-y-6"
          noValidate
        >
          <div className="space-y-6">
            {/* Multilingual Name Fields */}
            <div className="rounded-xl border border-[#E2E8F3] bg-[#F9F7F4] p-5 space-y-4">
              <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#2B5FA6]">
                Landmark / Area Place Name (Multilingual)
              </h4>

              {/* English */}
              <div>
                <label className="flex items-center gap-2 text-[12px] font-semibold text-[#202326]">
                  <UkFlag className="h-3.5 w-5 rounded-xs shadow-xs" />
                  <span>English Name (UK)</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  placeholder="e.g. Hurghada International Airport, New Marina"
                  className="mt-1.5 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2.5 text-[14px] text-[#202326] outline-none transition-all placeholder:text-[#65706B] focus:border-[#2B5FA6] focus:ring-2 focus:ring-[#2B5FA6]/15"
                />
              </div>

              {/* German */}
              <div>
                <label className="flex items-center gap-2 text-[12px] font-semibold text-[#202326]">
                  <GermanyFlag className="h-3.5 w-5 rounded-xs shadow-xs" />
                  <span>German Name (DE)</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={nameDe}
                  onChange={(e) => setNameDe(e.target.value)}
                  placeholder="e.g. Flughafen Hurghada, New Marina"
                  className="mt-1.5 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2.5 text-[14px] text-[#202326] outline-none transition-all placeholder:text-[#65706B] focus:border-[#2B5FA6] focus:ring-2 focus:ring-[#2B5FA6]/15"
                />
              </div>

              {/* Arabic */}
              <div>
                <label className="flex items-center gap-2 text-[12px] font-semibold text-[#202326]">
                  <EgyptFlag className="h-3.5 w-5 rounded-xs shadow-xs" />
                  <span>Arabic Name (EG)</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={nameAr}
                  dir="rtl"
                  onChange={(e) => setNameAr(e.target.value)}
                  placeholder="مثال: مطار الغردقة الدولي، المارينا الجديدة"
                  className="mt-1.5 w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2.5 text-[14px] text-[#202326] outline-none transition-all placeholder:text-[#65706B] focus:border-[#2B5FA6] focus:ring-2 focus:ring-[#2B5FA6]/15 text-right"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-[#E2E8F3] bg-white pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="rounded-xl border border-[#D0D9EA] px-4 py-2 text-[13px] font-medium text-[#202326] transition-colors hover:bg-[#F0F3FA]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-xl bg-[#2B5FA6] px-5 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#1B3A6B] disabled:opacity-50"
            >
              <FiSave className="h-4 w-4" />
              <span>
                {isSaving
                  ? "Saving..."
                  : isEditing
                  ? "Save Changes"
                  : "Create Place"}
              </span>
            </button>
          </div>
        </form>
      )}
    </AdminSlideDrawer>
  );
}

