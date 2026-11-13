"use client";

import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { LocalizedText } from "@/models/faq";
import {
  StandaloneUnitFormPayload,
  StandaloneUnitItem,
} from "@/models/standaloneUnit";
import { getFullLocalizedStandaloneUnit } from "@/clientApi/standaloneUnitsApi";
import {
  useCreateStandaloneUnitMutation,
  useUpdateStandaloneUnitMutation,
} from "@/features/standaloneUnits/useStandaloneUnitsMutations";
import AdminSlideDrawer from "@/components/adminComp/Common/AdminSlideDrawer";
import StandaloneUnitBasicFields from "./StandaloneUnitBasicFields";
import StandaloneUnitLanguageFields from "./StandaloneUnitLanguageFields";
import StandaloneUnitLocationFields from "./StandaloneUnitLocationFields";
import StandaloneUnitServicesFields from "./StandaloneUnitServicesFields";

interface StandaloneUnitFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  unitToEdit?: StandaloneUnitItem | null;
}

const emptyLocalizedText: LocalizedText = { en: "", ar: "", de: "" };

export default function StandaloneUnitFormDrawer({
  isOpen,
  onClose,
  unitToEdit,
}: StandaloneUnitFormDrawerProps) {
  const isEditing = Boolean(unitToEdit);

  // Language & Details
  const [name, setName] = useState<LocalizedText>(emptyLocalizedText);
  const [description, setDescription] = useState<LocalizedText>(emptyLocalizedText);
  const [view, setView] = useState<LocalizedText>(emptyLocalizedText);
  const [floorName, setFloorName] = useState<LocalizedText>(emptyLocalizedText);

  // Location
  const [country, setCountry] = useState<LocalizedText>({
    en: "Egypt",
    de: "Ägypten",
    ar: "مصر",
  });
  const [city, setCity] = useState<LocalizedText>({
    en: "Hurghada",
    de: "Hurghada",
    ar: "الغردقة",
  });
  const [district, setDistrict] = useState<LocalizedText>(emptyLocalizedText);
  const [street, setStreet] = useState<LocalizedText>(emptyLocalizedText);
  const [address, setAddress] = useState<LocalizedText>(emptyLocalizedText);
  const [buildingNumber, setBuildingNumber] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [postalCode, setPostalCode] = useState("84511");
  const [latitude, setLatitude] = useState(27.2579);
  const [longitude, setLongitude] = useState(33.8116);

  // Specs & Pricing
  const [propertyType, setPropertyType] = useState("Villa");
  const [priceUSD, setPriceUSD] = useState(0);
  const [area, setArea] = useState(0);
  const [noBedRoom, setNoBedRoom] = useState(2);
  const [noBathRoom, setNoBathRoom] = useState(2);
  const [noKitchen, setNoKitchen] = useState(1);
  const [noFloor, setNoFloor] = useState(2);
  const [floorNumber, setFloorNumber] = useState(0);

  // Services & State
  const [isFeatured, setIsFeatured] = useState(false);
  const [selectedServiceIds, setSelectedServiceIds] = useState<number[]>([]);
  const [initialImages, setInitialImages] = useState<File[]>([]);
  const [isPreloading, setIsPreloading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    if (unitToEdit) {
      setIsPreloading(true);
      getFullLocalizedStandaloneUnit(unitToEdit.id)
        .then((fullData) => {
          setName(fullData.name);
          setDescription(fullData.description);
          setView(fullData.view);
          setFloorName(fullData.floorName);
          setCountry(fullData.country);
          setCity(fullData.city);
          setDistrict(fullData.district);
          setStreet(fullData.street);
          setAddress(fullData.address);
          setBuildingNumber(fullData.buildingNumber);
          setApartmentNumber(fullData.apartmentNumber);
          setPostalCode(fullData.postalCode);
          setLatitude(fullData.latitude);
          setLongitude(fullData.longitude);
          setPropertyType(fullData.propertyType || "Villa");
          setPriceUSD(fullData.priceUSD);
          setArea(fullData.area);
          setNoBedRoom(fullData.noBedRoom);
          setNoBathRoom(fullData.noBathRoom);
          setNoKitchen(fullData.noKitchen);
          setNoFloor(fullData.noFloor);
          setFloorNumber(fullData.floorNumber);
          setIsFeatured(fullData.isFeatured);
          setSelectedServiceIds(fullData.serviceIds || []);
        })
        .catch(() => {
          setName({ en: unitToEdit.name, ar: "", de: "" });
        })
        .finally(() => setIsPreloading(false));
    } else {
      setName({ ...emptyLocalizedText });
      setDescription({ ...emptyLocalizedText });
      setView({ ...emptyLocalizedText });
      setFloorName({ ...emptyLocalizedText });
      setDistrict({ ...emptyLocalizedText });
      setStreet({ ...emptyLocalizedText });
      setAddress({ ...emptyLocalizedText });
      setBuildingNumber("");
      setApartmentNumber("");
      setPropertyType("Villa");
      setPriceUSD(0);
      setArea(0);
      setNoBedRoom(2);
      setNoBathRoom(2);
      setNoKitchen(1);
      setNoFloor(2);
      setFloorNumber(0);
      setIsFeatured(false);
      setSelectedServiceIds([]);
      setInitialImages([]);
    }
  }, [isOpen, unitToEdit]);

  const createMutation = useCreateStandaloneUnitMutation(() => onClose());
  const updateMutation = useUpdateStandaloneUnitMutation(() => onClose());

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.en.trim() || !country.en.trim() || !city.en.trim() || priceUSD <= 0 || area <= 0) {
      toast.error("Please fill in required fields: English Name, Country, City, Price, and Area.");
      return;
    }

    const payload: StandaloneUnitFormPayload = {
      name,
      description,
      view,
      floorName,
      country,
      city,
      district,
      street,
      address,
      buildingNumber,
      apartmentNumber,
      postalCode,
      latitude,
      longitude,
      propertyType,
      floorNumber,
      noFloor,
      area,
      noBedRoom,
      noBathRoom,
      noKitchen,
      isFeatured,
      priceUSD,
      serviceIds: selectedServiceIds,
    };

    if (isEditing && unitToEdit) {
      updateMutation.mutate({ id: unitToEdit.id, payload });
    } else {
      createMutation.mutate({ payload, initialImages });
    }
  }

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <AdminSlideDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Standalone Property" : "Add Standalone Property"}
      subtitle="Standalone villa, townhouse, or private residential unit outside compounds"
      maxWidthClass="max-w-2xl"
    >
      {isPreloading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#1B3A6B] border-t-transparent" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <StandaloneUnitLanguageFields
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            view={view}
            setView={setView}
            floorName={floorName}
            setFloorName={setFloorName}
          />

          <StandaloneUnitBasicFields
            area={area}
            setArea={setArea}
            noBedRoom={noBedRoom}
            setNoBedRoom={setNoBedRoom}
            noBathRoom={noBathRoom}
            setNoBathRoom={setNoBathRoom}
            noKitchen={noKitchen}
            setNoKitchen={setNoKitchen}
            noFloor={noFloor}
            setNoFloor={setNoFloor}
            floorNumber={floorNumber}
            setFloorNumber={setFloorNumber}
            propertyType={propertyType}
            setPropertyType={setPropertyType}
            priceUSD={priceUSD}
            setPriceUSD={setPriceUSD}
            latitude={latitude}
            setLatitude={setLatitude}
            longitude={longitude}
            setLongitude={setLongitude}
            buildingNumber={buildingNumber}
            setBuildingNumber={setBuildingNumber}
            apartmentNumber={apartmentNumber}
            setApartmentNumber={setApartmentNumber}
            postalCode={postalCode}
            setPostalCode={setPostalCode}
          />

          <StandaloneUnitLocationFields
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            district={district}
            setDistrict={setDistrict}
            street={street}
            setStreet={setStreet}
            address={address}
            setAddress={setAddress}
          />

          <StandaloneUnitServicesFields
            selectedServiceIds={selectedServiceIds}
            onChangeServices={setSelectedServiceIds}
            isFeatured={isFeatured}
            setIsFeatured={setIsFeatured}
            isEditing={isEditing}
            onFilesSelected={setInitialImages}
          />

          <div className="flex items-center justify-end gap-3 border-t border-[#E2E8F3] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#D0D9EA] bg-white px-4 py-2.5 text-[13px] font-medium text-[#65706B] hover:bg-[#F0F3FA]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1B3A6B] px-6 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#2B5FA6] disabled:opacity-50"
            >
              {isPending
                ? "Saving..."
                : isEditing
                ? "Save Changes"
                : "Create Property"}
            </button>
          </div>
        </form>
      )}
    </AdminSlideDrawer>
  );
}

