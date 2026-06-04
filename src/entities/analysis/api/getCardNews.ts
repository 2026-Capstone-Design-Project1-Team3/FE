import type {
  CardNewsQuery,
  CardNewsResponse,
} from "@/entities/analysis/model/types";
import { apiClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

type CardNewsApiResponse = CardNewsResponse & {
  cardNews?: CardNewsResponse["cardnews"];
};

export const getCardNews = async (params?: CardNewsQuery) => {
  const response = await apiClient.get<CardNewsApiResponse>(
    API_ENDPOINTS.analysis.cardNews,
    {
      params,
    },
  );

  return {
    ...response,
    cardnews: response.cardnews ?? response.cardNews ?? [],
  };
};
