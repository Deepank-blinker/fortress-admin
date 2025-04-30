import { API_ROUTES } from '@/constants/api.routes';
import http from './http';
import { Response } from '@/types';

export interface WhitelistedCountries {
  country: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export const getWhitelistedCountries = async (): Promise<
  Response<WhitelistedCountries[]>
> => {
  const response = await http.get(
    API_ROUTES.whitelistedCountries.getWhitelistedCountries.url
  );
  return response.data.data;
};

export const addCountryToWhitelist = async (
  country: string
): Promise<Response<WhitelistedCountries>> => {
  const response = await http.post(
    API_ROUTES.whitelistedCountries.whitelistCountry.url,
    {
      country,
    }
  );
  return response.data;
};

export const removeCountryFromWhitelist = async (
  id: string
): Promise<Response<WhitelistedCountries>> => {
  const url = `${API_ROUTES.whitelistedCountries.removeCountryFromWhitelist.url}/${id}`;
  const response = await http.delete(url);
  return response.data;
};
