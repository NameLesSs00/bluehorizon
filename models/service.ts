export interface PropertyServiceItem {
  id: number;
  name: string;
  icon: string | null;
}

export interface CreateServiceRequestDto {
  name: {
    en: string;
    ar: string;
    de: string;
  };
  icon?: string;
}

export interface UpdateServiceRequestDto {
  id: number;
  name: {
    en: string;
    ar: string;
    de: string;
  };
  icon?: string;
}

export interface LocalizedServiceData {
  id: number;
  icon: string;
  name: {
    en: string;
    ar: string;
    de: string;
  };
}

