import { API_ROUTES } from '@/constants/api.routes';
import http from './http';
import { TrelloCard } from '@/constants/interface.constant';

export const getTickets = async () => {
  const response = await http.get(API_ROUTES.tickets.getCustomerTickets.url);
  return response.data;
};

export const getTicketById = async (id: string) => {
  const url = API_ROUTES.tickets.getCustomerTicketDetails.url.replace(
    ':id',
    id
  );
  const response = await http.get(url);
  return response.data;
};

export const updateTicketById = async (id: string, data: TrelloCard) => {
  const url = API_ROUTES.tickets.updateCustomerTicket.url.replace(':id', id);
  const response = await http.put(url, data);
  return response.data;
};

export const createCustomerTicket = async (ticketData: TrelloCard) => {
  const response = await http.post(
    API_ROUTES.tickets.createCustomerTicket.url,
    ticketData
  );
  return response.data;
};
