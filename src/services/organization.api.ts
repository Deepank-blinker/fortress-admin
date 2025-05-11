import { API_ROUTES } from '@/constants/api.routes';
import http from './http';
import { ORGANIZATION, Response } from '@/types';

export const getAllOrganizations = async (): Promise<
  Response<ORGANIZATION[]>
> => {
  const response = await http.get(
    API_ROUTES.organization.getAllOrganizations.url
  );
  return response.data.data;
};

export const getOrganizationById = async (
  id: string
): Promise<ORGANIZATION | null> => {
  const response = await http.get(
    `${API_ROUTES.organization.getOrganizationById.url}/${id}`
  );
  return response.data.data;
};
