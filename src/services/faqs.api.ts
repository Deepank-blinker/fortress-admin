import { API_ROUTES } from '@/constants/api.routes';
import { Faqs } from '@/constants/interface.constant';
import http from '@/services/http';
import { PaginationResponse, Response } from '@/types';

// Fetch all faqs
export const fetchFaqs = async (): Promise<
  Response<PaginationResponse<Faqs[]>>
> => {
  const query = '?sort=createdAt,asc';
  const response = await http.get(`${API_ROUTES.faqs.fetchFaqs.url}${query}`);
  return response.data;
};

export interface CreateFAQPayload {
  question: string;
  answer: string;
}
export interface UpdateFaqPayload extends CreateFAQPayload {
  id: string;
}

export const createFaq = async (
  payload: CreateFAQPayload
): Promise<Response<Faqs>> => {
  const response = await http.post(`${API_ROUTES.faqs.createFaq.url}`, payload);
  return response.data;
};

export const updateFaq = async (
  payload: UpdateFaqPayload
): Promise<Response<Faqs>> => {
  const { id, ...rest } = payload;
  const response = await http.patch(
    `${API_ROUTES.faqs.updateFaq.url}/${id}`,
    rest
  );
  return response.data;
};
export const deleteFaq = async (id: string): Promise<Response> => {
  const response = await http.delete(`${API_ROUTES.faqs.updateFaq.url}/${id}`);
  return response.data;
};
