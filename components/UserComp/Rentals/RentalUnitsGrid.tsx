"use client";

import { FiChevronRight, FiInbox } from "react-icons/fi";
import { RentalItem, PropertyType } from "@/models/rental";
import RentalUnitCard from "./RentalUnitCard";

const FALLBACK_RENTAL_UNITS: RentalItem[] = [
  {
    id: 1,
    code: "RNT-101",
    name: "Luxury Sea-View Apartment",
    description: "Panoramic sea view with spacious balcony and sunlit living room.",
    rentalLocation: { id: 1, name: "Maadi · Degla" },
    floor: "3rd",
    bedroomNo: 2,
    bathroomNo: 2,
    capacity: 4,
    size: 125,
    prices: [{ id: 1, currency: "EGP", price: 4500000 }],
    propertyType: PropertyType.Apartment,
    isAvailable: true,
    isFeatured: true,
    hasSeaView: true,
    hasPoolView: false,
    hasGardenView: false,
    hasMountainView: false,
    hasCityView: true,
    rulesCancellation: "Standard",
    notes: "",
    listingDetails: {
      lateCheckIn: "Yes",
      services: [],
      extraPeopleFee: 0,
      familyFriendly: true,
      privateEntrance: false,
      extraPeople: "No",
    },
    categoryItems: [{ id: 1, name: "Home" }],
    images: [{ id: 1, imageUrl: "/rental/heroRental.jpg", isPrimary: true, sortOrder: 1 }],
  },
  {
    id: 2,
    code: "RNT-102",
    name: "Luxury Sea-View Apartment",
    description: "Panoramic sea view with spacious balcony and premium finishes.",
    rentalLocation: { id: 2, name: "Maadi · Degla" },
    floor: "2nd",
    bedroomNo: 2,
    bathroomNo: 2,
    capacity: 4,
    size: 125,
    prices: [{ id: 2, currency: "EGP", price: 4500000 }],
    propertyType: PropertyType.Apartment,
    isAvailable: true,
    isFeatured: true,
    hasSeaView: true,
    hasPoolView: true,
    hasGardenView: false,
    hasMountainView: false,
    hasCityView: false,
    rulesCancellation: "Flexible",
    notes: "",
    listingDetails: {
      lateCheckIn: "Yes",
      services: [],
      extraPeopleFee: 0,
      familyFriendly: true,
      privateEntrance: false,
      extraPeople: "No",
    },
    categoryItems: [{ id: 2, name: "Apartment" }],
    images: [{ id: 2, imageUrl: "/HomePage/hero/homeImage.jpg", isPrimary: true, sortOrder: 1 }],
  },
  {
    id: 3,
    code: "RNT-103",
    name: "Luxury Sea-View Apartment",
    description: "Panoramic sea view with spacious designer suite.",
    rentalLocation: { id: 3, name: "Hurghada" },
    floor: "1st",
    bedroomNo: 2,
    bathroomNo: 2,
    capacity: 4,
    size: 125,
    prices: [{ id: 3, currency: "EGP", price: 4500000 }],
    propertyType: PropertyType.Studio,
    isAvailable: true,
    isFeatured: true,
    hasSeaView: true,
    hasPoolView: false,
    hasGardenView: true,
    hasMountainView: false,
    hasCityView: false,
    rulesCancellation: "Standard",
    notes: "",
    listingDetails: {
      lateCheckIn: "Yes",
      services: [],
      extraPeopleFee: 0,
      familyFriendly: true,
      privateEntrance: false,
      extraPeople: "No",
    },
    categoryItems: [{ id: 3, name: "Studio" }],
    images: [{ id: 3, imageUrl: "/Locations/hero.png", isPrimary: true, sortOrder: 1 }],
  },
  {
    id: 4,
    code: "RNT-104",
    name: "Luxury Sea-View Apartment",
    description: "Panoramic sea view with spacious balcony and private terrace.",
    rentalLocation: { id: 4, name: "Maadi · Degla" },
    floor: "4th",
    bedroomNo: 2,
    bathroomNo: 2,
    capacity: 4,
    size: 125,
    prices: [{ id: 4, currency: "EGP", price: 4500000 }],
    propertyType: PropertyType.Apartment,
    isAvailable: true,
    isFeatured: true,
    hasSeaView: true,
    hasPoolView: false,
    hasGardenView: false,
    hasMountainView: false,
    hasCityView: true,
    rulesCancellation: "Standard",
    notes: "",
    listingDetails: {
      lateCheckIn: "Yes",
      services: [],
      extraPeopleFee: 0,
      familyFriendly: true,
      privateEntrance: false,
      extraPeople: "No",
    },
    categoryItems: [{ id: 4, name: "Home" }],
    images: [{ id: 4, imageUrl: "/Blogs/hero.png", isPrimary: true, sortOrder: 1 }],
  },
  {
    id: 5,
    code: "RNT-105",
    name: "Luxury Sea-View Apartment",
    description: "Panoramic sea view with spacious open layout.",
    rentalLocation: { id: 5, name: "Maadi · Degla" },
    floor: "2nd",
    bedroomNo: 2,
    bathroomNo: 2,
    capacity: 4,
    size: 125,
    prices: [{ id: 5, currency: "EGP", price: 4500000 }],
    propertyType: PropertyType.Apartment,
    isAvailable: true,
    isFeatured: true,
    hasSeaView: true,
    hasPoolView: true,
    hasGardenView: false,
    hasMountainView: false,
    hasCityView: false,
    rulesCancellation: "Standard",
    notes: "",
    listingDetails: {
      lateCheckIn: "Yes",
      services: [],
      extraPeopleFee: 0,
      familyFriendly: true,
      privateEntrance: false,
      extraPeople: "No",
    },
    categoryItems: [{ id: 5, name: "Apartment" }],
    images: [{ id: 5, imageUrl: "/Locations/ctaBackGound.png", isPrimary: true, sortOrder: 1 }],
  },
  {
    id: 6,
    code: "RNT-106",
    name: "Luxury Sea-View Apartment",
    description: "Panoramic sea view with spacious modern furnishings.",
    rentalLocation: { id: 6, name: "Hurghada" },
    floor: "G",
    bedroomNo: 2,
    bathroomNo: 2,
    capacity: 4,
    size: 125,
    prices: [{ id: 6, currency: "EGP", price: 4500000 }],
    propertyType: PropertyType.Studio,
    isAvailable: true,
    isFeatured: true,
    hasSeaView: true,
    hasPoolView: false,
    hasGardenView: false,
    hasMountainView: true,
    hasCityView: false,
    rulesCancellation: "Standard",
    notes: "",
    listingDetails: {
      lateCheckIn: "Yes",
      services: [],
      extraPeopleFee: 0,
      familyFriendly: true,
      privateEntrance: true,
      extraPeople: "No",
    },
    categoryItems: [{ id: 6, name: "Studio" }],
    images: [{ id: 6, imageUrl: "/rental/heroRental.jpg", isPrimary: true, sortOrder: 1 }],
  },
];

interface RentalUnitsGridProps {
  units: RentalItem[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onResetFilters: () => void;
}

export default function RentalUnitsGrid({
  units,
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
  onResetFilters,
}: RentalUnitsGridProps) {
  const displayUnits = units.length > 0 ? units : FALLBACK_RENTAL_UNITS;

  return (
    <div className="flex-1">
      {/* Section Header */}
      <div className="mb-6 sm:mb-8">
        <h2
          className="text-2xl sm:text-3xl font-bold text-[#202326]"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          Available Units
        </h2>
        <p
          className="mt-1.5 text-xs sm:text-sm text-[#65706B]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Explore top-tier residential units ready for immediate rent.
        </p>
      </div>

      {/* Grid or Skeletons */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="overflow-hidden rounded-[20px] border border-[#E1E7E3] bg-white p-4"
            >
              <div className="h-48 w-full animate-pulse rounded-[16px] bg-[#E8F1EC]" />
              <div className="mt-4 h-5 w-3/4 animate-pulse rounded bg-[#E1E7E3]" />
              <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-[#F3F5F3]" />
              <div className="mt-4 h-9 w-full animate-pulse rounded-[10px] bg-[#F3F5F3]" />
            </div>
          ))}
        </div>
      ) : displayUnits.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[24px] border border-[#E1E7E3] bg-white px-6 py-16 text-center">
          <FiInbox className="h-10 w-10 text-[#9CA3AF]" />
          <h3
            className="mt-3 text-lg font-bold text-[#202326]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            No Rental Units Match Your Criteria
          </h3>
          <p
            className="mt-1 text-xs text-[#65706B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Try adjusting your search filters to find available properties.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-5 rounded-full bg-[#0F473A] px-6 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#145C4B]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayUnits.map((unit) => (
            <RentalUnitCard key={unit.id} unit={unit} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={`flex h-9 w-9 items-center justify-center rounded-[10px] text-xs font-semibold transition-all ${
                currentPage === p
                  ? "bg-[#0F473A] text-white shadow-xs"
                  : "border border-[#E1E7E3] bg-white text-[#202326] hover:bg-[#FAF8F5]"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {p}
            </button>
          ))}

          {currentPage < totalPages && (
            <button
              type="button"
              onClick={() => onPageChange(currentPage + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#E1E7E3] bg-white text-[#202326] transition-all hover:bg-[#FAF8F5]"
              aria-label="Next page"
            >
              <FiChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

