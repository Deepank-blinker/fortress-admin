'use client';

import {
  createStakeAsset,
  deleteStakeAsset,
  fetchStakeAssets,
  updateStakeAsset,
} from '@/services/stakeAsset.api';
import { StakeAsset } from '@/types';
import { getErrorMessage } from '@/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';

// Define initial state
interface StakeAssetState {
  stakeAssets: StakeAsset[];
  loading: boolean;
  error: string | null;
}
const stakePrograms = [
  {
    id: '11111111-aaaa-bbbb-cccc-000000000001',
    assetName: 'Bitcoin',
    assetType: 'BTC',
    rewardRate: 4.5,
    logoUrl: 'https://example.com/logos/btc.png',
    activationPeriod: 'Varies',
    unBoundingPeriod: '7 days',
    minimumStakingAmount: 'Varies',
    minimumStake: null,
    createdAt: '2025-05-01T05:35:18.312Z',
    updatedAt: '2025-05-14T03:54:30.618Z',
  },
  {
    id: '11111111-aaaa-bbbb-cccc-000000000002',
    assetName: 'Ethereum',
    assetType: 'ETH',
    rewardRate: 5.2,
    logoUrl: 'https://example.com/logos/eth.png',
    activationPeriod: '14 hrs (min)',
    unBoundingPeriod: '27 hrs (min)',
    minimumStakingAmount: '32 ETH',
    minimumStake: 32,
    createdAt: '2025-05-01T05:46:50.376Z',
    updatedAt: '2025-05-14T03:54:32.318Z',
  },
  {
    id: '11111111-aaaa-bbbb-cccc-000000000003',
    assetName: 'Binance Coin',
    assetType: 'BNB',
    rewardRate: 6.1,
    logoUrl: 'https://example.com/logos/bnb.png',
    activationPeriod: '7 days',
    unBoundingPeriod: '3 days',
    minimumStakingAmount: '1 BNB',
    minimumStake: 1,
    createdAt: '2025-05-01T05:46:51.452Z',
    updatedAt: '2025-05-14T03:54:33.594Z',
  },
  {
    id: '11111111-aaaa-bbbb-cccc-000000000004',
    assetName: 'Cardano',
    assetType: 'ADA',
    rewardRate: 3.8,
    logoUrl: 'https://example.com/logos/ada.png',
    activationPeriod: '5 days',
    unBoundingPeriod: 'None',
    minimumStakingAmount: 'None',
    minimumStake: null,
    createdAt: '2025-05-01T05:46:52.343Z',
    updatedAt: '2025-05-14T03:54:34.612Z',
  },
  {
    id: '11111111-aaaa-bbbb-cccc-000000000005',
    assetName: 'Polkadot',
    assetType: 'DOT',
    rewardRate: 12.3,
    logoUrl: 'https://example.com/logos/dot.png',
    activationPeriod: 'Immediate',
    unBoundingPeriod: '28 days',
    minimumStakingAmount: '250 DOT',
    minimumStake: 250,
    createdAt: '2025-05-01T05:46:57.000Z',
    updatedAt: '2025-05-14T03:54:39.785Z',
  },
  {
    id: '11111111-aaaa-bbbb-cccc-000000000006',
    assetName: 'Avalanche',
    assetType: 'AVAX',
    rewardRate: 7.0,
    logoUrl: 'https://example.com/logos/avax.png',
    activationPeriod: 'Immediate',
    unBoundingPeriod: '14 days',
    minimumStakingAmount: '25 AVAX',
    minimumStake: 25,
    createdAt: '2025-05-01T05:46:55.203Z',
    updatedAt: '2025-05-14T03:54:37.79Z',
  },
  {
    id: '11111111-aaaa-bbbb-cccc-000000000007',
    assetName: 'StarkNet',
    assetType: 'STRK',
    rewardRate: 9.4,
    logoUrl: 'https://example.com/logos/strk.png',
    activationPeriod: 'None',
    unBoundingPeriod: '21 days',
    minimumStakingAmount: 'None',
    minimumStake: null,
    createdAt: '2025-05-01T05:47:19.251Z',
    updatedAt: '2025-05-14T03:54:32.313Z',
  },
  {
    id: '11111111-aaaa-bbbb-cccc-000000000008',
    assetName: 'Tether',
    assetType: 'USDT',
    rewardRate: 2.0,
    logoUrl: 'https://example.com/logos/usdt.png',
    activationPeriod: 'Varies',
    unBoundingPeriod: 'Varies',
    minimumStakingAmount: 'Varies',
    minimumStake: null,
    createdAt: '2025-05-01T05:46:58.973Z',
    updatedAt: '2025-05-14T03:54:41.790Z',
  },
];

const initialState: StakeAssetState = {
  stakeAssets: stakePrograms,
  loading: false,
  error: null,
};

// **🔹 Async Thunks for API Calls**
export const fetchStakeAssetsThunk = createAsyncThunk<
  StakeAsset[],
  void,
  { rejectValue: string }
>('cryptoTokens/fetchStakeAssetsThunk', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchStakeAssets();
    return response?.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error as Error) as string);
  }
});

export const addStakeAsset = createAsyncThunk<
  StakeAsset,
  Omit<StakeAsset, 'id' | 'createdAt' | 'updatedAt'>,
  { rejectValue: string }
>('cryptoTokens/addStakeAsset', async (newToken, { rejectWithValue }) => {
  try {
    const response = await createStakeAsset(newToken);
    return response;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error as Error) as string);
  }
});

export const updateStakeAssetById = createAsyncThunk<
  StakeAsset,
  StakeAsset,
  { rejectValue: string }
>('cryptoTokens/updateStakeAsset', async (tokenData, { rejectWithValue }) => {
  try {
    const { id, ...rest } = tokenData;
    const response = await updateStakeAsset(id as string, rest);
    if (!response?.data) {
      throw new Error('No token data returned from API');
    }

    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error as Error) as string);
  }
});

export const removeStakeAsset = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('cryptoTokens/removeStakeAsset', async (tokenId, { rejectWithValue }) => {
  try {
    await deleteStakeAsset(tokenId);
    return tokenId;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error as Error) as string);
  }
});

// **🔹 Redux Slice**
const cryptoTokenSlice = createSlice({
  name: 'cryptoTokens',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Tokens
      .addCase(fetchStakeAssetsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStakeAssetsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.stakeAssets = action.payload;
      })
      .addCase(fetchStakeAssetsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch stakeAssets';
      })

      // Add Token
      .addCase(addStakeAsset.fulfilled, (state, action) => {
        state.stakeAssets.push(action.payload);
        toast.success(
          `Token '${action.payload.assetType}' added successfully!`
        );
      })
      .addCase(addStakeAsset.rejected, (state, action) => {
        toast.error(action.payload || 'Failed to add token');
      })

      // Update Token
      .addCase(updateStakeAssetById.fulfilled, (state, action) => {
        state.stakeAssets = state.stakeAssets.map((token) =>
          token.id === action.payload.id ? action.payload : token
        );
        toast.success(
          `Token '${action.payload.assetType}' updated successfully!`
        );
      })
      .addCase(updateStakeAssetById.rejected, (state, action) => {
        toast.error(action.payload || 'Failed to update token');
      })

      // Remove Token
      .addCase(removeStakeAsset.fulfilled, (state, action) => {
        state.stakeAssets = state.stakeAssets.filter(
          (token) => token.id !== action.payload // Remove the token from the array
        );
        toast.success('Token removed successfully!');
      })
      .addCase(removeStakeAsset.rejected, (state, action) => {
        toast.error(action.payload || 'Failed to remove token');
      });
  },
});

export default cryptoTokenSlice.reducer;
