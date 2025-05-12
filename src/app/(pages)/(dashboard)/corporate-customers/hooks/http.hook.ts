import { API_ROUTES } from '@/constants/api.routes';
import { getOrganizationById } from '@/services/organization.api';
import { useQuery } from '@tanstack/react-query';

export const useGetOrganizationById = (id: string) => {
  return useQuery({
    queryKey: [
      API_ROUTES.organization.getOrganizationById.queryKey,
      {
        id,
      },
    ],
    queryFn: () => getOrganizationById(id),
    enabled: true,
  });
};
