"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import AdminSlideDrawer from "@/components/adminComp/Common/AdminSlideDrawer";
import ProjectLocationLanguageFields from "./ProjectLocationLanguageFields";
import {
  LocalizedProjectLocationDetails,
  ProjectLocationFormPayload,
  ProjectLocationItem,
} from "@/models/projectLocation";
import {
  useCreateProjectLocationMutation,
  useLocalizedProjectLocationQuery,
  useUpdateProjectLocationMutation,
} from "@/features/projectLocations/useProjectLocationsQueries";

interface ProjectLocationFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  locationToEdit: ProjectLocationItem | null;
}

const emptyForm: ProjectLocationFormPayload = {
  name: { en: "", ar: "", de: "" },
  description: { en: "", ar: "", de: "" },
};

export default function ProjectLocationFormDrawer({
  isOpen,
  onClose,
  locationToEdit,
}: ProjectLocationFormDrawerProps) {
  const isEditMode = Boolean(locationToEdit);
  const editId = locationToEdit?.id ?? null;

  const { data: detailsData, isLoading: isLoadingDetails } =
    useLocalizedProjectLocationQuery(editId, isOpen);

  const [formData, setFormData] = useState<ProjectLocationFormPayload>(emptyForm);
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

  const createMutation = useCreateProjectLocationMutation(onClose);
  const updateMutation = useUpdateProjectLocationMutation(onClose);

  const isSaving = createMutation.isPending || updateMutation.isPending;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.name.en.trim()) {
      toast.error("English name is required.");
      return;
    }

    if (isEditMode && editId) {
      updateMutation.mutate({
        id: editId,
        payload: {
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
        },
      });
    } else {
      createMutation.mutate({
        payload: {
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
        },
        initialImages: initialImages.length > 0 ? initialImages : undefined,
        initialVideo: initialVideo || undefined,
      });
    }
  }

  return (
    <AdminSlideDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Project Location" : "Add Project Location"}
      subtitle={
        isEditMode
          ? "Update localized details for this project location"
          : "Add a new destination for projects, primary units, and resales"
      }
      maxWidthClass="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {isLoadingDetails && isEditMode && (
          <div className="rounded-xl border border-[#C5D3E8] bg-[#F9F7F4] p-3 text-[12px] text-[#2B5FA6]">
            Loading localized translations for EN, DE, and AR...
          </div>
        )}

        {/* Location Names & Descriptions */}
        <ProjectLocationLanguageFields
          formData={formData}
          onChange={setFormData}
        />

        {/* Media Attachments during Creation */}
        {!isEditMode && (
          <div className="rounded-xl border border-[#E2E8F3] bg-[#F9F7F4] p-4 space-y-4">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#2B5FA6]">
              Optional Initial Media
            </h4>

            <div>
              <label className="block text-[12px] font-medium text-[#202326]">
                Upload Gallery Photos (Multiple)
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = e.target.files ? Array.from(e.target.files) : [];
                  setInitialImages(files);
                }}
                className="mt-1.5 block w-full text-[12px] text-[#65706B] file:mr-3 file:rounded-lg file:border-0 file:bg-[#1B3A6B] file:px-3 file:py-1.5 file:text-[12px] file:font-semibold file:text-white hover:file:bg-[#2B5FA6]"
              />
              {initialImages.length > 0 && (
                <p className="mt-1 text-[11px] text-[#2B5FA6]">
                  {initialImages.length} photo(s) selected
                </p>
              )}
            </div>

            <div>
              <label className="block text-[12px] font-medium text-[#202326]">
                Upload Promotional Video (MP4)
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setInitialVideo(file);
                }}
                className="mt-1.5 block w-full text-[12px] text-[#65706B] file:mr-3 file:rounded-lg file:border-0 file:bg-[#1B3A6B] file:px-3 file:py-1.5 file:text-[12px] file:font-semibold file:text-white hover:file:bg-[#2B5FA6]"
              />
              {initialVideo && (
                <p className="mt-1 text-[11px] text-[#2B5FA6]">
                  Video selected: {initialVideo.name}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E2E8F3]">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#D0D9EA] bg-white px-5 py-2.5 text-[13px] font-medium text-[#65706B] hover:bg-[#F0F3FA]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-xl bg-[#1B3A6B] px-6 py-2.5 text-[13px] font-semibold text-white hover:bg-[#2B5FA6] disabled:opacity-50"
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

