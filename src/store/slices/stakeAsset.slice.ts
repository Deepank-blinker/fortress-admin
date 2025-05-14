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

const initialState: StakeAssetState = {
  stakeAssets: [],
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
