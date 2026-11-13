"use client";

import { FiDollarSign } from "react-icons/fi";

const PROPERTY_TYPES = [
  "Villa",
  "Apartment",
  "Chalet",
  "Townhouse",
  "Duplex",
  "Penthouse",
  "Studio",
];

interface StandaloneUnitBasicFieldsProps {
  area: number;
  setArea: (val: number) => void;
  noBedRoom: number;
  setNoBedRoom: (val: number) => void;
  noBathRoom: number;
  setNoBathRoom: (val: number) => void;
  noKitchen: number;
  setNoKitchen: (val: number) => void;
  noFloor: number;
  setNoFloor: (val: number) => void;
  floorNumber: number;
  setFloorNumber: (val: number) => void;
  propertyType: string;
  setPropertyType: (val: string) => void;
  priceUSD: number;
  setPriceUSD: (val: number) => void;
  latitude: number;
  setLatitude: (val: number) => void;
  longitude: number;
  setLongitude: (val: number) => void;
  buildingNumber: string;
  setBuildingNumber: (val: string) => void;
  apartmentNumber: string;
  setApartmentNumber: (val: string) => void;
  postalCode: string;
  setPostalCode: (val: string) => void;
}

export default function StandaloneUnitBasicFields({
  area,
  setArea,
  noBedRoom,
  setNoBedRoom,
  noBathRoom,
  setNoBathRoom,
  noKitchen,
  setNoKitchen,
  noFloor,
  setNoFloor,
  floorNumber,
  setFloorNumber,
  propertyType,
  setPropertyType,
  priceUSD,
  setPriceUSD,
  latitude,
  setLatitude,
  longitude,
  setLongitude,
  buildingNumber,
  setBuildingNumber,
  apartmentNumber,
  setApartmentNumber,
  postalCode,
  setPostalCode,
}: StandaloneUnitBasicFieldsProps) {
  return (
    <div className="space-y-4 rounded-xl border border-[#E2E8F3] bg-[#F9F7F4] p-5">
      <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#2B5FA6]">
        Property Specifications &amp; Pricing
      </h4>

      {/* Property Type & Price USD */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-[12px] font-medium text-[#202326]">
            Property Type *
          </label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3.5 py-2.5 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
          >
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-[12px] font-medium text-[#202326]">
            Price (USD) *
          </label>
          <div className="relative">
            <FiDollarSign className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#9BA5A0]" />
            <input
              type="number"
              min="0"
              required
              value={priceUSD || ""}
              onChange={(e) => setPriceUSD(parseFloat(e.target.value) || 0)}
              placeholder="e.g. 250000"
              className="w-full rounded-xl border border-[#D0D9EA] bg-white py-2.5 pr-3 pl-9 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Specs Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div>
          <label className="mb-1 block text-[12px] font-medium text-[#202326]">
            Area (m²) *
          </label>
          <input
            type="number"
            min="1"
            required
            value={area || ""}
            onChange={(e) => setArea(parseFloat(e.target.value) || 0)}
            placeholder="120"
            className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-[12px] font-medium text-[#202326]">
            Bedrooms
          </label>
          <input
            type="number"
            min="0"
            value={noBedRoom}
            onChange={(e) => setNoBedRoom(parseInt(e.target.value, 10) || 0)}
            className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-[12px] font-medium text-[#202326]">
            Bathrooms
          </label>
          <input
            type="number"
            min="0"
            value={noBathRoom}
            onChange={(e) => setNoBathRoom(parseInt(e.target.value, 10) || 0)}
            className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-[12px] font-medium text-[#202326]">
            Kitchens
          </label>
          <input
            type="number"
            min="0"
            value={noKitchen}
            onChange={(e) => setNoKitchen(parseInt(e.target.value, 10) || 0)}
            className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
          />
        </div>
      </div>

      {/* Floors and Units */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div>
          <label className="mb-1 block text-[12px] font-medium text-[#202326]">
            Floor Number
          </label>
          <input
            type="number"
            min="0"
            value={floorNumber}
            onChange={(e) => setFloorNumber(parseInt(e.target.value, 10) || 0)}
            className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-[12px] font-medium text-[#202326]">
            Total Floors
          </label>
          <input
            type="number"
            min="1"
            value={noFloor}
            onChange={(e) => setNoFloor(parseInt(e.target.value, 10) || 1)}
            className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-[12px] font-medium text-[#202326]">
            Building No
          </label>
          <input
            type="text"
            value={buildingNumber}
            onChange={(e) => setBuildingNumber(e.target.value)}
            placeholder="e.g. 12"
            className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-[12px] font-medium text-[#202326]">
            Unit / Apt No
          </label>
          <input
            type="text"
            value={apartmentNumber}
            onChange={(e) => setApartmentNumber(e.target.value)}
            placeholder="e.g. 302"
            className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
          />
        </div>
      </div>

      {/* Map Coordinates & Postal Code */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-[12px] font-medium text-[#202326]">
            Postal Code
          </label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="e.g. 84511"
            className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-[12px] font-medium text-[#202326]">
            Latitude
          </label>
          <input
            type="number"
            step="0.000001"
            value={latitude || ""}
            onChange={(e) => setLatitude(parseFloat(e.target.value) || 0)}
            placeholder="27.2579"
            className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-[12px] font-medium text-[#202326]">
            Longitude
          </label>
          <input
            type="number"
            step="0.000001"
            value={longitude || ""}
            onChange={(e) => setLongitude(parseFloat(e.target.value) || 0)}
            placeholder="33.8116"
            className="w-full rounded-xl border border-[#D0D9EA] bg-white px-3 py-2 text-[13px] text-[#202326] focus:border-[#1B3A6B] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

