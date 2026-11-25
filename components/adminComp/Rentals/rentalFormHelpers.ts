import { LocalizedText } from "@/models/faq";
import {
  PropertyType,
  RentalFormPayload,
  RentalItem,
  LocalizedRentalDetails,
} from "@/models/rental";

export const DEFAULT_RENTAL_FORM: RentalFormPayload = {
  code: "",
  name: { en: "", ar: "", de: "", ru: "" },
  description: { en: "", ar: "", de: "", ru: "" },
  rentalLocationId: 0,
  floor: { en: "", ar: "", de: "", ru: "" },
  bedroomNo: 1,
  bathroomNo: 1,
  capacity: 2,
  size: 80,
  priceUSD: 100,
  propertyType: PropertyType.Apartment,
  isAvailable: true,
  isFeatured: false,
  hasSeaView: false,
  hasPoolView: false,
  hasGardenView: false,
  hasMountainView: false,
  hasCityView: false,
  rulesCancellation: { en: "", ar: "", de: "", ru: "" },
  notes: { en: "", ar: "", de: "", ru: "" },
  listingDetails: {
    lateCheckIn: { en: "", ar: "", de: "", ru: "" },
    services: [],
    extraPeopleFee: 0,
    familyFriendly: true,
    privateEntrance: true,
    extraPeople: { en: "", ar: "", de: "", ru: "" },
  },
  propertyCategoryItemIds: [],
  infoAreaPlaces: [],
};

export function sanitizeLocalized(
  val?: LocalizedText | null,
  fallback = ""
): LocalizedText {
  const en = (val?.en || fallback).trim();
  const ar = (val?.ar || "").trim() || en;
  const de = (val?.de || "").trim() || en;
  const ru = (val?.ru || "").trim() || en;
  return { en, ar, de, ru };
}

export function buildInitialRentalForm(
  rentalToEdit: RentalItem | null,
  detailsData?: LocalizedRentalDetails | null
): RentalFormPayload {
  if (!rentalToEdit) return DEFAULT_RENTAL_FORM;

  if (detailsData) {
    return {
      id: detailsData.id,
      code: detailsData.code,
      name: detailsData.name,
      description: detailsData.description,
      rentalLocationId: detailsData.rentalLocationId,
      floor: detailsData.floor,
      bedroomNo: detailsData.bedroomNo,
      bathroomNo: detailsData.bathroomNo,
      capacity: detailsData.capacity,
      size: detailsData.size,
      priceUSD: detailsData.priceUSD,
      propertyType: detailsData.propertyType,
      isAvailable: detailsData.isAvailable,
      isFeatured: detailsData.isFeatured,
      hasSeaView: detailsData.hasSeaView,
      hasPoolView: detailsData.hasPoolView,
      hasGardenView: detailsData.hasGardenView,
      hasMountainView: detailsData.hasMountainView,
      hasCityView: detailsData.hasCityView,
      rulesCancellation: detailsData.rulesCancellation,
      notes: detailsData.notes,
      listingDetails: detailsData.listingDetails,
      propertyCategoryItemIds: detailsData.propertyCategoryItemIds,
      infoAreaPlaces: detailsData.infoAreaPlaces,
    };
  }

  const usdPrice =
    rentalToEdit.prices.find((p) => p.currency === "USD")?.price || 100;

  return {
    id: rentalToEdit.id,
    code: rentalToEdit.code,
    name: sanitizeLocalized({ en: rentalToEdit.name, ar: "", de: "", ru: "" }),
    description: sanitizeLocalized({
      en: rentalToEdit.description,
      ar: "",
      de: "",
      ru: "",
    }),
    rentalLocationId: rentalToEdit.rentalLocation?.id || 0,
    floor: sanitizeLocalized({ en: rentalToEdit.floor, ar: "", de: "", ru: "" }),
    bedroomNo: rentalToEdit.bedroomNo,
    bathroomNo: rentalToEdit.bathroomNo,
    capacity: rentalToEdit.capacity,
    size: rentalToEdit.size,
    priceUSD: usdPrice,
    propertyType: rentalToEdit.propertyType,
    isAvailable: rentalToEdit.isAvailable,
    isFeatured: rentalToEdit.isFeatured,
    hasSeaView: rentalToEdit.hasSeaView,
    hasPoolView: rentalToEdit.hasPoolView,
    hasGardenView: rentalToEdit.hasGardenView,
    hasMountainView: rentalToEdit.hasMountainView,
    hasCityView: rentalToEdit.hasCityView,
    rulesCancellation: sanitizeLocalized({
      en: rentalToEdit.rulesCancellation,
      ar: "",
      de: "",
      ru: "",
    }),
    notes: sanitizeLocalized({ en: rentalToEdit.notes, ar: "", de: "", ru: "" }),
    listingDetails: {
      lateCheckIn: sanitizeLocalized({
        en: rentalToEdit.listingDetails?.lateCheckIn,
        ar: "",
        de: "",
        ru: "",
      }),
      services: (rentalToEdit.listingDetails?.services || []).map((s) =>
        sanitizeLocalized({ en: s, ar: s, de: s, ru: s })
      ),
      extraPeopleFee: rentalToEdit.listingDetails?.extraPeopleFee || 0,
      familyFriendly: rentalToEdit.listingDetails?.familyFriendly ?? true,
      privateEntrance: rentalToEdit.listingDetails?.privateEntrance ?? true,
      extraPeople: sanitizeLocalized({
        en: rentalToEdit.listingDetails?.extraPeople,
        ar: "",
        de: "",
        ru: "",
      }),
    },
    propertyCategoryItemIds:
      rentalToEdit.categoryItems?.map((c) => c.id) || [],
    infoAreaPlaces:
      rentalToEdit.infoAreaPlaces?.map((iap) => ({
        infoAreaPlaceId: iap.id,
        distance: iap.distance,
      })) || [],
  };
}

export function prepareRentalPayload(
  formData: RentalFormPayload
): RentalFormPayload {
  return {
    ...formData,
    code: formData.code.trim(),
    name: sanitizeLocalized(formData.name),
    description: sanitizeLocalized(formData.description),
    floor: sanitizeLocalized(formData.floor),
    rulesCancellation: sanitizeLocalized(formData.rulesCancellation),
    notes: sanitizeLocalized(formData.notes),
    listingDetails: {
      ...formData.listingDetails,
      lateCheckIn: sanitizeLocalized(formData.listingDetails.lateCheckIn),
      extraPeople: sanitizeLocalized(formData.listingDetails.extraPeople),
      services: formData.listingDetails.services.map((s) =>
        sanitizeLocalized(s)
      ),
    },
  };
}
