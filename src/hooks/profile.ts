import { API_ROUTES } from '@/constants/api.routes';
import { getUserProfile } from '@/services/auth.api';
import { useQuery } from '@tanstack/react-query';

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: [API_ROUTES.user.getUserProfile.queryKey],
    queryFn: getUserProfile,
  });
};
