export interface NormalizedUnitImage {
  id?: number;
  url: string;
  isPrimary?: boolean;
}

export interface NormalizedUnitService {
  id: number;
  name: string;
  icon?: string;
}

export interface NormalizedUnitReview {
  id: number;
  fullName: string;
  comment: string;
  rate: number;
  createdAt: string;
}

export interface NormalizedUnitDetails {
  id: number;
  type: "primary" | "resale";
  title: string;
  description: string;
  priceFormatted: string;
  rawPrice?: number;
  currency: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  kitchens: number;
  floorNumber?: number;
  floorName?: string;
  view?: string;
  markerId?: string;
  propertyType?: string;
  projectId?: number;
  projectName?: string;
  projectLocation?: string;
  images: NormalizedUnitImage[];
  services: NormalizedUnitService[];
  reviews?: NormalizedUnitReview[];
}

