import { CryptoToken, Response } from '@/types';
import http from '@/services/http';

type CryptoTokenResponse = {
  data: CryptoToken[];
};

// Fetch all tokens
export const fetchCryptoTokens = async (): Promise<CryptoTokenResponse> => {
  const query = '?sort=symbol,asc';
  const response = await http.get(`/crypto/token${query}`);
  return response.data.data; // Ensure response matches { data: { data: CryptoToken[] } }
};

// Create new token
export const createCryptoToken = async (
  token: Omit<CryptoToken, 'id' | 'createdAt' | 'updatedAt'>
): Promise<CryptoToken> => {
  const response = await http.post('/crypto/token', token);
  return response.data.data;
};

// Update token
export const updateCryptoToken = async (
  tokenId: string,
  token: Omit<CryptoToken, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Response<CryptoToken>> => {
  const response = await http.patch(`/crypto/token/${tokenId}`, token);
  return response.data;
};

// Delete token
export const deleteCryptoToken = async (id: string): Promise<void> => {
  await http.delete(`/crypto/token/${id}`);
};
