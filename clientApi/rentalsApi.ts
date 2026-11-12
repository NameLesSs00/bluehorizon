import { apiClient, API_BASE_URL } from "./apiConfig";
import { ApiResponse } from "@/models/admin";
import {
  LocalizedRentalDetails,
  PaginatedRentalsData,
  RentalFormPayload,
  RentalItem,
  RentalsQueryParams,
} from "@/models/rental";

export function getFullRentalMediaUrl(
  relativeOrAbsoluteUrl?: string | null
): string {
  if (!relativeOrAbsoluteUrl) return "";
  if (
    relativeOrAbsoluteUrl.startsWith("http://") ||
    relativeOrAbsoluteUrl.startsWith("https://")
  ) {
    return relativeOrAbsoluteUrl;
  }
  const cleanPath = relativeOrAbsoluteUrl.startsWith("/")
    ? relativeOrAbsoluteUrl
    : `/${relativeOrAbsoluteUrl}`;
  return `${API_BASE_URL}${cleanPath}`;
}

export async function getRentals(
  params?: RentalsQueryParams
): Promise<PaginatedRentalsData> {
  const lang = params?.Language || "en";
  const currency = params?.Currency || "USD";

  const response = await apiClient.get<ApiResponse<PaginatedRentalsData>>(
    "/api/rentals",
    {
      params: {
        Language: lang,
        Currency: currency,
        PageNumber: params?.PageNumber || 1,
        PageSize: params?.PageSize || 10,
      },
      headers: {
        "Accept-Language": lang,
      },
    }
  );

  if (response.data && response.data.data) {
    return response.data.data;
  }

  return {
    items: [],
    pageNumber: 1,
    totalPages: 1,
    totalCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  };
}

export async function getRentalById(
  id: number,
  language: string = "en",
  currency: string = "USD"
): Promise<ApiResponse<RentalItem>> {
  const response = await apiClient.get<ApiResponse<RentalItem>>(
    `/api/rentals/${id}`,
    {
      params: { language, currency },
      headers: { "Accept-Language": language },
    }
  );
  return response.data;
}

export async function getFullLocalizedRental(
  id: number
): Promise<LocalizedRentalDetails> {
  const [enRes, arRes, deRes] = await Promise.allSettled([
    getRentalById(id, "en", "USD"),
    getRentalById(id, "ar", "USD"),
    getRentalById(id, "de", "USD"),
  ]);

  const enItem = enRes.status === "fulfilled" ? enRes.value.data : null;
  const arItem = arRes.status === "fulfilled" ? arRes.value.data : null;
  const deItem = deRes.status === "fulfilled" ? deRes.value.data : null;

  const baseItem = enItem || arItem || deItem;

  const priceUSD =
    baseItem?.prices?.find((p) => p.currency === "USD")?.price || 0;

  return {
    id,
    code: baseItem?.code || "",
    name: {
      en: enItem?.name || "",
      ar: arItem?.name || "",
      de: deItem?.name || "",
    },
    description: {
      en: enItem?.description || "",
      ar: arItem?.description || "",
      de: deItem?.description || "",
    },
    rulesCancellation: {
      en: enItem?.rulesCancellation || "",
      ar: arItem?.rulesCancellation || "",
      de: deItem?.rulesCancellation || "",
    },
    rentalLocationId: baseItem?.rentalLocation?.id || 0,
    floor: baseItem?.floor || "",
    bedroomNo: baseItem?.bedroomNo || 0,
    bathroomNo: baseItem?.bathroomNo || 0,
    capacity: baseItem?.capacity || 0,
    size: baseItem?.size || 0,
    priceUSD,
    propertyType: baseItem?.propertyType ?? 0,
    isAvailable: baseItem?.isAvailable ?? true,
    isFeatured: baseItem?.isFeatured ?? false,
    hasSeaView: baseItem?.hasSeaView ?? false,
    hasPoolView: baseItem?.hasPoolView ?? false,
    hasGardenView: baseItem?.hasGardenView ?? false,
    hasMountainView: baseItem?.hasMountainView ?? false,
    hasCityView: baseItem?.hasCityView ?? false,
    notes: baseItem?.notes || "",
    listingDetails: baseItem?.listingDetails || {
      lateCheckIn: "",
      services: [],
      extraPeopleFee: 0,
      familyFriendly: false,
      privateEntrance: false,
      extraPeople: "",
    },
    propertyCategoryItemIds:
      baseItem?.categoryItems?.map((c) => c.id) || [],
    infoAreaPlaces:
      baseItem?.infoAreaPlaces?.map((iap) => ({
        infoAreaPlaceId: iap.id,
        distance: iap.distance,
      })) || [],
    images: baseItem?.images || [],
  };
}

export async function createRental(
  payload: RentalFormPayload
): Promise<ApiResponse<{ id: number; message?: string }>> {
  const response = await apiClient.post<ApiResponse<{ id: number; message?: string }>>(
    "/api/rentals",
    payload
  );
  return response.data;
}

export async function updateRental(
  id: number,
  payload: RentalFormPayload
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.put<ApiResponse<boolean>>(
    `/api/rentals/${id}`,
    {
      ...payload,
      id,
    }
  );
  return response.data;
}

export async function deleteRental(
  id: number
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    `/api/rentals/${id}`
  );
  return response.data;
}

export async function uploadRentalImages(
  rentalId: number,
  files: File[]
): Promise<ApiResponse<boolean>> {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("images", file);
  });

  const response = await apiClient.post<ApiResponse<boolean>>(
    `/api/rentals/${rentalId}/images`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

export async function setPrimaryRentalImage(
  rentalId: number,
  imageId: number
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.put<ApiResponse<boolean>>(
    `/api/rentals/${rentalId}/images/${imageId}/primary`,
    {
      isPrimary: true,
    }
  );
  return response.data;
}

export async function deleteRentalImage(
  rentalId: number,
  imageId: number
): Promise<ApiResponse<boolean>> {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    `/api/rentals/${rentalId}/images`,
    {
      params: { imageId },
    }
  );
  return response.data;
}

