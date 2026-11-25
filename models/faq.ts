export type QuestionLanguage = "en" | "ar" | "de" | "ru";

export interface LocalizedText {
  en: string;
  ar: string;
  de: string;
  ru: string;
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

