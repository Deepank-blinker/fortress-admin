import { API_ROUTES } from '@/constants/api.routes';
import {
  createCustomerTicket,
  getTicketById,
  getTickets,
  updateTicketById,
} from '@/services/tickets.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CustomerTicket } from '@/constants/interface.constant';

export const useGetCustomerTickets = () => {
  return useQuery({
    queryKey: [API_ROUTES.tickets.getCustomerTickets.queryKey],
    queryFn: getTickets,
  });
};

export const useGetCustomerTicketById = (id: string) => {
  return useQuery({
    queryKey: [API_ROUTES.tickets.getCustomerTicketDetails.queryKey, id],
    queryFn: () => getTicketById(id),
  });
};

export const useEditCustomerTicketById = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedTicket: CustomerTicket) =>
      updateTicketById(id, updatedTicket),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.tickets.getCustomerTickets.queryKey],
      });
    },
  });
};

export const useCreateCustomerTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTicket: CustomerTicket) => createCustomerTicket(newTicket),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.tickets.getCustomerTickets.queryKey],
      });
    },
  });
};
