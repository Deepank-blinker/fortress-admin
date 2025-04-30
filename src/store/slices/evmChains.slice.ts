'use client';

import { createEvmChains, fetchEvmChains } from '@/services/evmChains.api';
import { EvmChains } from '@/types';
import { getErrorMessage } from '@/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';

// Define initial state
interface EvmChainsState {
  evmChains: EvmChains[];
  loading: boolean;
  error: string | null;
}

const initialState: EvmChainsState = {
  evmChains: [],
  loading: false,
  error: null,
};

// **🔹 Async Thunks for API Calls**
export const fetchEvmChainsThunk = createAsyncThunk<
  EvmChains[],
  void,
  { rejectValue: string }
>('evmChains/fetchEvmChainsThunk', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchEvmChains();
    return response?.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error as Error) as string);
  }
});

export const addEvmChains = createAsyncThunk<
  EvmChains,
  Omit<EvmChains, 'id' | 'createdAt' | 'updatedAt'>,
  { rejectValue: string }
>('evmChains/addEvmChains', async (newToken, { rejectWithValue }) => {
  try {
    const response = await createEvmChains(newToken);
    return response;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error as Error) as string);
  }
});

// **🔹 Redux Slice**
const evmChainsSlice = createSlice({
  name: 'evmChains',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Tokens
      .addCase(fetchEvmChainsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvmChainsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.evmChains = action.payload;
      })
      .addCase(fetchEvmChainsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch evmChains';
      })

      // Add Token
      .addCase(addEvmChains.fulfilled, (state, action) => {
        state.evmChains.push(action.payload);
        toast.success(`Token '${action.payload.name}' added successfully!`);
      })
      .addCase(addEvmChains.rejected, (state, action) => {
        toast.error(action.payload || 'Failed to add token');
      });
  },
});

export default evmChainsSlice.reducer;
