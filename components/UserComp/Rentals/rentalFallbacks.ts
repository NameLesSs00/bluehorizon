  import { RentalItem } from "@/models/rental";

export const FALLBACK_RENTAL_UNITS: RentalItem[] = [];

export function getFallbackRentalById(_id: number): RentalItem | null {
  return null;
}
