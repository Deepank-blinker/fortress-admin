import { API_ROUTES } from '@/constants/api.routes';
import { Faqs } from '@/constants/interface.constant';
import http from '@/services/http';
import { Response } from '@/types';

type fetchFaqsResponse = {
  data: Faqs[];
};

// Fetch all faqs
export const fetchFaqs = async (): Promise<Response<fetchFaqsResponse>> => {
  const response = await http.get(`${API_ROUTES.faqs.fetchFaqs.url}`);
  return response.data;
};

export interface CretaeFaqPayload {
  question: string;
  answer: string;
}

export const createFaq = async (
  payload: CretaeFaqPayload
): Promise<Response<fetchFaqsResponse>> => {
  const response = await http.post(`${API_ROUTES.faqs.createFaq.url}`, payload);
  return response.data;
};

export interface UpdateFaqPayload extends CretaeFaqPayload {
  id: string;
}

export const updateFaq = async (
  payload: UpdateFaqPayload
): Promise<Response<fetchFaqsResponse>> => {
  const { id, ...rest } = payload;
  const response = await http.patch(
    `${API_ROUTES.faqs.updateFaq.url}/${id}`,
    rest
  );
  return response.data;
};
