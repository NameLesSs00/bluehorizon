"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import { useServicesQuery } from "@/features/services/useServicesQueries";
import { PropertyServiceItem } from "@/models/service";
import PropertyServicesTable from "./PropertyServicesTable";
import PropertyServiceFormDrawer from "./PropertyServiceFormDrawer";

export default function AdminPropertyServicesPage() {
  const { data: services = [], isLoading } = useServicesQuery("en");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedService, setSelectedService] =
    useState<PropertyServiceItem | null>(null);

  function handleOpenCreate() {
    setSelectedService(null);
    setIsDrawerOpen(true);
  }

  function handleOpenEdit(item: PropertyServiceItem) {
    setSelectedService(item);
    setIsDrawerOpen(true);
  }

  function handleCloseDrawer() {
    setIsDrawerOpen(false);
    setSelectedService(null);
  }

  return (
    <AdminShell>
      <div className="w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p
              className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2B5FA6]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              PROPERTY-LEVEL FEATURES
            </p>
            <h1
              className="mt-1 text-[28px] font-semibold text-[#202326]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Property Services
            </h1>
            <p
              className="mt-1 text-[13px] text-[#65706B]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Configure unit-level services, features, and amenities attached to properties and residential units (not compound projects) across Hurghada.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1B3A6B] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#2B5FA6]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <FiPlus className="h-4 w-4" />
            <span>Add Property Service</span>
          </button>
        </div>

        {/* Full-width Table */}
        <PropertyServicesTable
          services={services}
          isLoading={isLoading}
          onEdit={handleOpenEdit}
        />

        {/* Right-Side Slide Drawer */}
        <PropertyServiceFormDrawer
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          serviceToEdit={selectedService}
        />
      </div>
    </AdminShell>
  );
}

