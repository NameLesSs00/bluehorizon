export type QuestionLanguage = "en" | "ar" | "de";

export interface LocalizedText {
  en: string;
  ar: string;
  de: string;
}

export interface QuestionItem {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

export interface CreateQuestionRequestDto {
  title: LocalizedText;
  description: LocalizedText;
}

export interface UpdateQuestionRequestDto {
  id: number;
  title: LocalizedText;
  description: LocalizedText;
}

