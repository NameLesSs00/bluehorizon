"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import AdminSlideDrawer from "@/components/adminComp/Common/AdminSlideDrawer";
import { FlagEgypt, FlagGermany, FlagUK } from "@/components/adminComp/Common/LanguageFlags";
import {
  FurnitureTypeEnum,
  LocalizedProjectDetails,
  ProjectItem,
  ProjectPriceDto,
  SUPPORTED_PROJECT_CURRENCIES,
} from "@/models/project";
import {
  useCreateProjectMutation,
  useLocalizedProjectQuery,
  useUpdateProjectMutation,
} from "@/features/projects/useProjectsQueries";
import ProjectPricesFields from "./ProjectPricesFields";
import ProjectRelationsFields from "./ProjectRelationsFields";

interface ProjectFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  projectToEdit: ProjectItem | null;
}

const defaultPrices: ProjectPriceDto[] = SUPPORTED_PROJECT_CURRENCIES.map(
  (curr) => ({ currency: curr, minimumPrice: 0, maximumPrice: 0 })
);

export default function ProjectFormDrawer({
  isOpen,
  onClose,
  projectToEdit,
}: ProjectFormDrawerProps) {
  const isEditMode = Boolean(projectToEdit);
  const editId = projectToEdit?.id ?? null;

  const { data: detailsData, isLoading: isLoadingDetails } =
    useLocalizedProjectQuery(editId, isOpen);

  const [nameEn, setNameEn] = useState("");
  const [nameDe, setNameDe] = useState("");
  const [nameAr, setNameAr] = useState("");

  const [descEn, setDescEn] = useState("");
  const [descDe, setDescDe] = useState("");
  const [descAr, setDescAr] = useState("");

  const [locationId, setLocationId] = useState<number | null>(null);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [isFurniture, setIsFurniture] = useState(false);
  const [furnitureType, setFurnitureType] = useState<FurnitureTypeEnum>(FurnitureTypeEnum.None);
  const [isFeature, setIsFeature] = useState(false);

  const [projectTypeIds, setProjectTypeIds] = useState<number[]>([]);
  const [facilityIds, setFacilityIds] = useState<number[]>([]);
  const [initialFacilityIds, setInitialFacilityIds] = useState<number[]>([]);

  const [prices, setPrices] = useState<ProjectPriceDto[]>(defaultPrices);
  const [initialImages, setInitialImages] = useState<File[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setNameEn("");
      setNameDe("");
      setNameAr("");
      setDescEn("");
      setDescDe("");
      setDescAr("");
      setLocationId(null);
      setDeliveryDate("");
      setIsFurniture(false);
      setFurnitureType(FurnitureTypeEnum.None);
      setIsFeature(false);
      setProjectTypeIds([]);
      setFacilityIds([]);
      setInitialFacilityIds([]);
      setPrices(defaultPrices);
      setInitialImages([]);
      return;
    }

    if (projectToEdit) {
      if (detailsData) {
        setNameEn(detailsData.name.en || "");
        setNameDe(detailsData.name.de || "");
        setNameAr(detailsData.name.ar || "");
        setDescEn(detailsData.description.en || "");
        setDescDe(detailsData.description.de || "");
        setDescAr(detailsData.description.ar || "");
        setLocationId(detailsData.locationId);
        setDeliveryDate(
          detailsData.deliveryDate ? detailsData.deliveryDate.substring(0, 10) : ""
        );
        setIsFurniture(detailsData.isFurniture);
        setFurnitureType(detailsData.furnitureType);
        setIsFeature(detailsData.isFeature);
        setProjectTypeIds(detailsData.projectTypeIds || []);
        setFacilityIds(detailsData.facilityIds || []);
        setInitialFacilityIds(detailsData.facilityIds || []);
        setPrices(detailsData.prices?.length ? detailsData.prices : defaultPrices);
      } else {
        setNameEn(projectToEdit.name || "");
        setDescEn(projectToEdit.description || "");
        setLocationId(projectToEdit.locationId);
        setDeliveryDate(
          projectToEdit.deliveryDate ? projectToEdit.deliveryDate.substring(0, 10) : ""
        );
        setIsFurniture(Boolean(projectToEdit.isFurniture));
        setIsFeature(Boolean(projectToEdit.isFeature));
        setProjectTypeIds(projectToEdit.projectTypes?.map((t) => t.id) || []);
        const facIds = projectToEdit.facilities?.map((f) => f.id) || [];
        setFacilityIds(facIds);
        setInitialFacilityIds(facIds);
      }
    }
  }, [isOpen, projectToEdit, detailsData]);

  const createMutation = useCreateProjectMutation(onClose);
  const updateMutation = useUpdateProjectMutation(onClose);

  const isSaving = createMutation.isPending || updateMutation.isPending;

  function handleToggleProjectType(id: number) {
    setProjectTypeIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function handleToggleFacility(id: number) {
    setFacilityIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!nameEn.trim()) {
      toast.error("English project name is required.");
      return;
    }

    const payloadName = {
      en: nameEn.trim(),
      ar: nameAr.trim() || nameEn.trim(),
      de: nameDe.trim() || nameEn.trim(),
    };

    const payloadDesc = {
      en: descEn.trim(),
      ar: descAr.trim() || descEn.trim(),
      de: descDe.trim() || descEn.trim(),
    };

    const formattedDeliveryDate = deliveryDate
      ? new Date(deliveryDate).toISOString()
      : null;

    if (isEditMode && editId) {
      const removedFacilityIds = initialFacilityIds.filter(
        (id) => !facilityIds.includes(id)
      );

      updateMutation.mutate({
        payload: {
          id: editId,
          name: payloadName,
          description: payloadDesc,
          locationId,
          deliveryDate: formattedDeliveryDate,
          isFurniture,
          furnitureType,
          isFeature,
          projectTypeIds,
          facilityIds,
          prices,
        },
        removedFacilityIds,
      });
    } else {
      createMutation.mutate({
        payload: {
          name: payloadName,
          description: payloadDesc,
          locationId,
          deliveryDate: formattedDeliveryDate,
          isFurniture,
          furnitureType,
          isFeature,
          projectTypeIds,
          facilityIds,
          prices,
        },
        initialImages: initialImages.length > 0 ? initialImages : undefined,
      });
    }
  }

  return (
    <AdminSlideDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Project" : "Add New Project"}
      subtitle={
        isEditMode
          ? "Update details, pricing, types, and amenities"
          : "Create a premier residential development or compound"
      }
      maxWidthClass="max-w-3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {isLoadingDetails && isEditMode && (
          <div className="rounded-xl border border-[#CBDFD5] bg-[#FAF8F5] p-3 text-[12px] text-[#145C4B]">
            Loading localized translations and multi-currency prices...
          </div>
        )}

        {/* Multilingual Names */}
        <div className="space-y-3">
          <label className="block text-[13px] font-bold text-[#202326]">
            Project Name (Multilingual) *
          </label>
          <div className="grid grid-cols-1 gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#145C4B]">
                <FlagUK />
                <span>English *</span>
              </div>
              <input
                type="text"
                required
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="e.g. Modern Sunset Residence"
                className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#0F473A] focus:outline-none"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#145C4B]">
                <FlagGermany />
                <span>German (Deutsch)</span>
              </div>
              <input
                type="text"
                value={nameDe}
                onChange={(e) => setNameDe(e.target.value)}
                placeholder="Deutsche Projektbezeichnung..."
                className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#0F473A] focus:outline-none"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#145C4B]">
                <FlagEgypt />
                <span>Arabic (العربية)</span>
              </div>
              <input
                type="text"
                dir="rtl"
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                placeholder="اسم المشروع بالعربية..."
                className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#0F473A] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Multilingual Descriptions */}
        <div className="space-y-3">
          <label className="block text-[13px] font-bold text-[#202326]">
            Project Description (Multilingual)
          </label>
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#145C4B]">
                <FlagUK />
                <span>English Description</span>
              </div>
              <textarea
                rows={3}
                value={descEn}
                onChange={(e) => setDescEn(e.target.value)}
                placeholder="Describe master plan, lifestyle, architecture, and sea proximity..."
                className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#0F473A] focus:outline-none"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#145C4B]">
                <FlagGermany />
                <span>German Description</span>
              </div>
              <textarea
                rows={3}
                value={descDe}
                onChange={(e) => setDescDe(e.target.value)}
                placeholder="Deutsche Beschreibung..."
                className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#0F473A] focus:outline-none"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#145C4B]">
                <FlagEgypt />
                <span>Arabic Description</span>
              </div>
              <textarea
                rows={3}
                dir="rtl"
                value={descAr}
                onChange={(e) => setDescAr(e.target.value)}
                placeholder="وصف المشروع المعماري والموقع والإطلالة..."
                className="mt-1 w-full rounded-xl border border-[#DCE2DE] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] placeholder-[#9BA5A0] focus:border-[#0F473A] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Multi-Currency Prices */}
        <ProjectPricesFields prices={prices} onChange={setPrices} />

        {/* Relations & Specifications */}
        <ProjectRelationsFields
          locationId={locationId}
          onLocationChange={setLocationId}
          deliveryDate={deliveryDate}
          onDeliveryDateChange={setDeliveryDate}
          isFurniture={isFurniture}
          onIsFurnitureChange={setIsFurniture}
          furnitureType={furnitureType}
          onFurnitureTypeChange={setFurnitureType}
          isFeature={isFeature}
          onIsFeatureChange={setIsFeature}
          selectedProjectTypeIds={projectTypeIds}
          onToggleProjectType={handleToggleProjectType}
          selectedFacilityIds={facilityIds}
          onToggleFacility={handleToggleFacility}
        />

        {/* Initial Photos during Creation */}
        {!isEditMode && (
          <div className="rounded-xl border border-[#E6EAE7] bg-[#FAF8F5] p-4">
            <label className="block text-[12px] font-bold uppercase tracking-wider text-[#145C4B]">
              Optional Initial Render Photos (Multiple)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                const files = e.target.files ? Array.from(e.target.files) : [];
                setInitialImages(files);
              }}
              className="mt-2 block w-full text-[12px] text-[#65706B] file:mr-3 file:rounded-lg file:border-0 file:bg-[#0F473A] file:px-3 file:py-1.5 file:text-[12px] file:font-semibold file:text-white hover:file:bg-[#145C4B]"
            />
            {initialImages.length > 0 && (
              <p className="mt-1 text-[11px] text-[#145C4B]">
                {initialImages.length} image(s) selected
              </p>
            )}
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E6EAE7]">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#DCE2DE] bg-white px-5 py-2.5 text-[13px] font-medium text-[#65706B] hover:bg-[#F3F5F3]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-xl bg-[#0F473A] px-6 py-2.5 text-[13px] font-semibold text-white hover:bg-[#145C4B] disabled:opacity-50"
          >
            {isSaving
              ? "Saving..."
              : isEditMode
              ? "Update Project"
              : "Create Project"}
          </button>
        </div>
      </form>
    </AdminSlideDrawer>
  );
}

