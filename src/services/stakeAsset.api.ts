import { Response, StakeAsset } from '@/types';
import http from '@/services/http';

type StakeResponse = {
  data: StakeAsset[];
};

// Fetch all stake assets
export const fetchStakeAssets = async (): Promise<StakeResponse> => {
  const query = '?sort=symbol,asc';
  const response = await http.get(`/stake${query}`);
  return response.data.data; // Ensure response matches { data: { data: StakeingReward[] } }
};

// Create new stake asset
export const createStakeAsset = async (
  satkeData: Omit<StakeAsset, 'id' | 'createdAt' | 'updatedAt'>
): Promise<StakeAsset> => {
  const response = await http.post('/stake', satkeData);
  return response.data.data;
};

// Update stake asset
export const updateStakeAsset = async (
  stakeId: string,
  stakeData: Omit<StakeAsset, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Response<StakeAsset>> => {
  const response = await http.patch(`/stake/${stakeId}`, stakeData);
  return response.data;
};

// Delete stake asset
export const deleteStakeAsset = async (id: string): Promise<void> => {
  await http.delete(`/stake/${id}`);
};
