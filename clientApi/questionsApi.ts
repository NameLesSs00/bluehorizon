import { apiClient } from "./apiConfig";
import { ApiResponse } from "@/models/admin";
import {
  CreateQuestionRequestDto,
  LocalizedText,
  QuestionItem,
  QuestionLanguage,
  UpdateQuestionRequestDto,
} from "@/models/faq";

export async function getQuestions(
  language: QuestionLanguage = "en"
): Promise<QuestionItem[]> {
  const response = await apiClient.get<ApiResponse<QuestionItem[]>>(
    "/api/Questions",
    {
      params: { language },
    }
  );

  if (response.data && Array.isArray(response.data.data)) {
    return response.data.data;
  }

  return [];
}

export async function getQuestionById(
  id: number
): Promise<ApiResponse<QuestionItem>> {
  const response = await apiClient.get<ApiResponse<QuestionItem>>(
    `/api/Questions/${id}`
  );
  return response.data;
}

export async function getFullLocalizedQuestion(id: number): Promise<{
  id: number;
  title: LocalizedText;
  description: LocalizedText;
}> {
  const [enRes, arRes, deRes] = await Promise.allSettled([
    getQuestions("en"),
    getQuestions("ar"),
    getQuestions("de"),
  ]);

  const enItem =
    enRes.status === "fulfilled"
      ? enRes.value.find((item) => item.id === id)
      : undefined;
  const arItem =
    arRes.status === "fulfilled"
      ? arRes.value.find((item) => item.id === id)
      : undefined;
  const deItem =
    deRes.status === "fulfilled"
      ? deRes.value.find((item) => item.id === id)
      : undefined;

  return {
    id,
    title: {
      en: enItem?.title || "",
      ar: arItem?.title || "",
      de: deItem?.title || "",
    },
    description: {
      en: enItem?.description || "",
      ar: arItem?.description || "",
      de: deItem?.description || "",
    },
  };
}

export async function createQuestion(
  payload: CreateQuestionRequestDto
): Promise<ApiResponse<QuestionItem>> {
  const response = await apiClient.post<ApiResponse<QuestionItem>>(
    "/api/Questions",
    payload
  );
  return response.data;
}

export async function updateQuestion(
  payload: UpdateQuestionRequestDto
): Promise<ApiResponse<QuestionItem>> {
  const response = await apiClient.put<ApiResponse<QuestionItem>>(
    "/api/Questions",
    payload
  );
  return response.data;
}

export async function deleteQuestion(id: number): Promise<ApiResponse<boolean>> {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    `/api/Questions/${id}`
  );
  return response.data;
}

