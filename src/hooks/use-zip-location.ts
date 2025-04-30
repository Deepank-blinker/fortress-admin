// hooks/useZipLocation.ts
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { getErrorMessage } from '@/utils';

export const fetchLocationFromZip = async ({
  zip,
  countryCode,
}: {
  zip: string;
  countryCode: string;
}) => {
  try {
    const res = await axios.get(
      `https://api.zippopotam.us/${countryCode}/${zip}`
    );
    return res.data;
  } catch (error) {
    throw new Error(getErrorMessage(error as Error));
  }
};

export const useZipLocation = (
  zip: string,
  countryCode: string,
  enabled: boolean
) => {
  return useQuery({
    queryKey: ['zipLocation', countryCode, zip],
    queryFn: () => fetchLocationFromZip({ zip, countryCode }),
    enabled,
    staleTime: 0,
    retry: 1,
  });
};
