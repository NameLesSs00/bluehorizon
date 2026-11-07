export interface KeyValueItem {
  id: number;
  key: string;
  value: string;
}

export interface CreateKeyValueRequestDto {
  key: string;
  value: string;
}

export interface UpdateKeyValueRequestDto {
  id: number;
  key: string;
  value: string;
}

