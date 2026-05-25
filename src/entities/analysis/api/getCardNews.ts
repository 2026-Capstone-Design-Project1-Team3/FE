import type {
  CardNewsQuery,
  CardNewsResponse,
} from "@/entities/analysis/model/types";
import { apiClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

export const getCardNews = (params?: CardNewsQuery) => {
  return apiClient.get<CardNewsResponse>(API_ENDPOINTS.analysis.cardNews, {
    params,
  });
};
