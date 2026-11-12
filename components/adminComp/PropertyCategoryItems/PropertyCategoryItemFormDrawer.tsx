"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FiSave } from "react-icons/fi";
import { getFullLocalizedPropertyCategoryItem } from "@/clientApi/propertyCategoryItemsApi";
import { usePropertyCategoriesQuery } from "@/features/propertyCategories/usePropertyCategoriesQueries";
import {
  useCreatePropertyCategoryItemMutation,
  useUpdatePropertyCategoryItemMutation,
} from "@/features/propertyCategoryItems/usePropertyCategoryItemsQueries";
import { PropertyCategoryDetailItem } from "@/models/propertyCategoryItem";
import AdminSlideDrawer from "@/components/adminComp/Common/AdminSlideDrawer";
import IconPickerField from "@/components/adminComp/Common/IconPickerField";
import PropertyCategoryItemLanguageFields from "./PropertyCategoryItemLanguageFields";

interface PropertyCategoryItemFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  itemToEdit: PropertyCategoryDetailItem | null;
  defaultCategoryId?: number;
}

export default function PropertyCategoryItemFormDrawer({
  isOpen,
  onClose,
  itemToEdit,
  defaultCategoryId,
}: PropertyCategoryItemFormDrawerProps) {
  const isEditing = Boolean(itemToEdit);

  // Fetch all parent categories for selection dropdown
  const { data: categoriesData } = usePropertyCategoriesQuery({
    Language: "en",
    PageNumber: 1,
    PageSize: 100,
  });
  const categories = categoriesData?.items ?? [];

  const [categoryId, setCategoryId] = useState<number>(0);
  const [nameEn, setNameEn] = useState("");
  const [nameDe, setNameDe] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [icon, setIcon] = useState("");
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  useEffect(() => {
    if (itemToEdit && isOpen) {
      setIsLoadingDetails(true);
      setCategoryId(itemToEdit.propertyCategoryId);
      setNameEn(itemToEdit.name || "");
      setIcon(itemToEdit.icon || "");
      setDisplayOrder(itemToEdit.displayOrder ?? 1);

      getFullLocalizedPropertyCategoryItem(itemToEdit.id)
        .then((data) => {
          if (data.propertyCategoryId) setCategoryId(data.propertyCategoryId);
          setNameEn(data.name.en || itemToEdit.name || "");
          setNameDe(data.name.de || "");
          setNameAr(data.name.ar || "");
          if (data.icon) setIcon(data.icon);
          if (data.displayOrder) setDisplayOrder(data.displayOrder);
        })
        .catch(() => {
          // Keep current values
        })
        .finally(() => {
          setIsLoadingDetails(false);
        });
    } else if (!itemToEdit && isOpen) {
      const initialCatId =
        defaultCategoryId || (categories.length > 0 ? categories[0].id : 0);
      setCategoryId(initialCatId);
      setNameEn("");
      setNameDe("");
      setNameAr("");
      setIcon("TbCoffee");
      setDisplayOrder(1);
    }
  }, [itemToEdit, isOpen, defaultCategoryId, categories]);

  const createMutation = useCreatePropertyCategoryItemMutation(() => {
    onClose();
  });

  const updateMutation = useUpdatePropertyCategoryItemMutation(() => {
    onClose();
  });

  const isSaving = createMutation.isPending || updateMutation.isPending;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!categoryId || categoryId <= 0) {
      toast.error("Please select a parent property category.");
      return;
    }
    if (!nameEn.trim()) {
      toast.error("Please enter the item name in English.");
      return;
    }
    if (!nameDe.trim()) {
      toast.error("Please enter the item name in German.");
      return;
    }
    if (!nameAr.trim()) {
      toast.error("Please enter the item name in Arabic.");
      return;
    }

    if (isEditing && itemToEdit) {
      updateMutation.mutate({
        id: itemToEdit.id,
        payload: {
          id: itemToEdit.id,
          propertyCategoryId: Number(categoryId),
          name: {
            en: nameEn.trim(),
            de: nameDe.trim(),
            ar: nameAr.trim(),
          },
          icon: icon.trim() || undefined,
          displayOrder: Number(displayOrder) || 1,
        },
      });
    } else {
      createMutation.mutate({
        propertyCategoryId: Number(categoryId),
        name: {
          en: nameEn.trim(),
          de: nameDe.trim(),
          ar: nameAr.trim(),
        },
        icon: icon.trim() || undefined,
        displayOrder: Number(displayOrder) || 1,
      });
    }
  }

  return (
    <AdminSlideDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Rental Item" : "Add Rental Item"}
      subtitle="Rental equipment, appliance, or amenity item"
      maxWidthClass="max-w-xl"
    >
      {isLoadingDetails ? (
        <div className="flex h-72 w-full items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0F473A] border-t-transparent" />
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
            {/* Parent Category Selector */}
            <div className="rounded-xl border border-[#E6EAE7] bg-[#FAF8F5] p-5">
              <label className="block text-[12px] font-semibold text-[#202326]">
                Parent Property Category <span className="text-red-500">*</span>
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(parseInt(e.target.value) || 0)}
                className="mt-1.5 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[14px] text-[#202326] outline-none transition-all focus:border-[#145C4B] focus:ring-2 focus:ring-[#145C4B]/15"
              >
                <option value={0} disabled>
                  Select a parent category...
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Multilingual Name Fields */}
            <PropertyCategoryItemLanguageFields
              nameEn={nameEn}
              setNameEn={setNameEn}
              nameDe={nameDe}
              setNameDe={setNameDe}
              nameAr={nameAr}
              setNameAr={setNameAr}
            />

            {/* Display Order & Icon Picker */}
            <div className="rounded-xl border border-[#E6EAE7] bg-[#FAF8F5] p-5 space-y-4">
              <div>
                <label className="block text-[12px] font-semibold text-[#202326]">
                  Display Order
                </label>
                <input
                  type="number"
                  min={1}
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 1)}
                  className="mt-1.5 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[14px] text-[#202326] outline-none transition-all focus:border-[#145C4B] focus:ring-2 focus:ring-[#145C4B]/15"
                />
              </div>

              <IconPickerField
                value={icon}
                onChange={setIcon}
                defaultCategory="rentalAmenity"
                label="Rental Item Icon"
                modalTitle="Choose Rental Item Icon"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-[#E6EAE7] bg-white pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="rounded-xl border border-[#DCE2DE] px-4 py-2 text-[13px] font-medium text-[#202326] transition-colors hover:bg-[#F3F5F3]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-xl bg-[#145C4B] px-5 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#0F473A] disabled:opacity-50"
            >
              <FiSave className="h-4 w-4" />
              <span>
                {isSaving
                  ? "Saving..."
                  : isEditing
                  ? "Save Changes"
                  : "Create Item"}
              </span>
            </button>
          </div>
        </form>
      )}
    </AdminSlideDrawer>
  );
}

