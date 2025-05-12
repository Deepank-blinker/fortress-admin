import { API_ROUTES } from '@/constants/api.routes';
import {
  addCountryToWhitelist,
  getWhitelistedCountries,
  removeCountryFromWhitelist,
} from '@/services/whitelistedCountries.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useWhitelistedCountries = () => {
  return useQuery({
    queryKey: [
      API_ROUTES.whitelistedCountries.getWhitelistedCountries.queryKey,
    ],
    queryFn: () => getWhitelistedCountries(),
    enabled: true,
  });
};

export const useAddCountryToWhitelist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (country: string) => addCountryToWhitelist(country),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          API_ROUTES.whitelistedCountries.getWhitelistedCountries.queryKey,
        ],
      });
    },
  });
};

export const useRemoveCountryFromWhitelist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (country: string) => removeCountryFromWhitelist(country),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          API_ROUTES.whitelistedCountries.getWhitelistedCountries.queryKey,
        ],
      });
    },
  });
};
