export interface FacilityItem {
  id: number;
  name: string;
  icon: string | null;
}

export interface CreateFacilityRequestDto {
  name: {
    en: string;
    ar: string;
    de: string;
  };
  icon: string;
}

export interface UpdateFacilityRequestDto {
  id: number;
  name: {
    en: string;
    ar: string;
    de: string;
  };
  icon: string;
}

export interface LocalizedFacilityData {
  id: number;
  icon: string;
  name: {
    en: string;
    ar: string;
    de: string;
  };
}

