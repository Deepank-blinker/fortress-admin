import { API_ROUTES } from '@/constants/api.routes';
import { getUserById } from '@/services/user.api';
import { useQuery } from '@tanstack/react-query';

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: [
      API_ROUTES.user.getUserById.queryKey,
      {
        id,
      },
    ],
    queryFn: () => getUserById(id),
    enabled: true,
  });
};