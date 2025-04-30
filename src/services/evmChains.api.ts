import { EvmChains } from '@/types';
import http from '@/services/http';

type EvmChainsResponse = {
  data: EvmChains[];
};

// Fetch all tokens
export const fetchEvmChains = async (): Promise<EvmChainsResponse> => {
  const query = '?sort=name,asc';
  const response = await http.get(`evm-chains${query}`);
  return response.data.data; // Ensure response matches { data: { data: EvmChains[] } }
};

// Create new token
export const createEvmChains = async (
  token: Omit<EvmChains, 'id' | 'createdAt' | 'updatedAt'>
): Promise<EvmChains> => {
  const response = await http.post('evm-chains', token);
  return response.data.data;
};

// Update token
export const updateEvmChains = async (
  tokenId: string,
  token: Omit<EvmChains, 'id' | 'createdAt' | 'updatedAt'>
): Promise<EvmChains> => {
  const response = await http.put(`evm-chains/${tokenId}`, token);
  return response.data;
};

// Delete token
export const deleteEvmChains = async (id: string): Promise<void> => {
  await http.delete(`evm-chains/${id}`);
};
