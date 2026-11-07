"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FiSave } from "react-icons/fi";
import { getFullLocalizedProjectType } from "@/clientApi/projectTypesApi";
import {
  useCreateProjectTypeMutation,
  useUpdateProjectTypeMutation,
} from "@/features/projectTypes/useProjectTypesQueries";
import { ProjectTypeItem } from "@/models/projectType";
import AdminSlideDrawer from "@/components/adminComp/Common/AdminSlideDrawer";
import IconPickerField from "@/components/adminComp/Common/IconPickerField";
import {
  EgyptFlag,
  GermanyFlag,
  UkFlag,
} from "@/components/adminComp/Common/LanguageFlags";

interface ProjectTypeFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  projectTypeToEdit: ProjectTypeItem | null;
}

export default function ProjectTypeFormDrawer({
  isOpen,
  onClose,
  projectTypeToEdit,
}: ProjectTypeFormDrawerProps) {
  const isEditing = Boolean(projectTypeToEdit);

  const [nameEn, setNameEn] = useState("");
  const [nameDe, setNameDe] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [icon, setIcon] = useState("");
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  useEffect(() => {
    if (projectTypeToEdit && isOpen) {
      setIsLoadingDetails(true);
      setNameEn(projectTypeToEdit.name || "");
      setIcon(projectTypeToEdit.icon || "");

      getFullLocalizedProjectType(projectTypeToEdit.id)
        .then((data) => {
          setNameEn(data.name.en || projectTypeToEdit.name || "");
          setNameDe(data.name.de || "");
          setNameAr(data.name.ar || "");
          if (data.icon) setIcon(data.icon);
        })
        .catch(() => {
          // Keep existing values on error
        })
        .finally(() => {
          setIsLoadingDetails(false);
        });
    } else if (!projectTypeToEdit && isOpen) {
      setNameEn("");
      setNameDe("");
      setNameAr("");
      setIcon("MdVilla");
    }
  }, [projectTypeToEdit, isOpen]);

  const createMutation = useCreateProjectTypeMutation(() => {
    onClose();
  });

  const updateMutation = useUpdateProjectTypeMutation(() => {
    onClose();
  });

  const isSaving = createMutation.isPending || updateMutation.isPending;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!nameEn.trim()) {
      toast.error("Please enter the project type name in English.");
      return;
    }
    if (!nameDe.trim()) {
      toast.error("Please enter the project type name in German.");
      return;
    }
    if (!nameAr.trim()) {
      toast.error("Please enter the project type name in Arabic.");
      return;
    }
    if (!icon.trim()) {
      toast.error("Please select an icon for this project type.");
      return;
    }

    if (isEditing && projectTypeToEdit) {
      updateMutation.mutate({
        id: projectTypeToEdit.id,
        payload: {
          id: projectTypeToEdit.id,
          name: {
            en: nameEn.trim(),
            de: nameDe.trim(),
            ar: nameAr.trim(),
          },
          icon: icon.trim(),
        },
      });
    } else {
      createMutation.mutate({
        name: {
          en: nameEn.trim(),
          de: nameDe.trim(),
          ar: nameAr.trim(),
        },
        icon: icon.trim(),
      });
    }
  }

  return (
    <AdminSlideDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Project Type" : "Add Project Type"}
      subtitle="Multilingual property categories for Hurghada developments"
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
            {/* Multilingual Name Fields */}
            <div className="rounded-xl border border-[#E6EAE7] bg-[#FAF8F5] p-5 space-y-4">
              <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#145C4B]">
                Project Type Name (Multilingual)
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
                  placeholder="e.g. Standalone Villa, Penthouse, Chalet"
                  className="mt-1.5 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[14px] text-[#202326] outline-none transition-all placeholder:text-[#65706B] focus:border-[#145C4B] focus:ring-2 focus:ring-[#145C4B]/15"
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
                  placeholder="e.g. Freistehende Villa, Dachgeschoss"
                  className="mt-1.5 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[14px] text-[#202326] outline-none transition-all placeholder:text-[#65706B] focus:border-[#145C4B] focus:ring-2 focus:ring-[#145C4B]/15"
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
                  placeholder="مثال: فيلا مستقلة، بنتهاوس، شاليه"
                  className="mt-1.5 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[14px] text-[#202326] outline-none transition-all placeholder:text-[#65706B] focus:border-[#145C4B] focus:ring-2 focus:ring-[#145C4B]/15 text-right"
                />
              </div>
            </div>

            {/* Visual Icon Picker */}
            <div className="rounded-xl border border-[#E6EAE7] bg-[#FAF8F5] p-5">
              <IconPickerField
                value={icon}
                onChange={setIcon}
                defaultCategory="projectType"
                label="Project Type Icon"
                required
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
                  : "Create Project Type"}
              </span>
            </button>
          </div>
        </form>
      )}
    </AdminSlideDrawer>
  );
}

