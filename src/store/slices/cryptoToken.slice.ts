'use client';

import {
  createCryptoToken,
  deleteCryptoToken,
  fetchCryptoTokens,
  updateCryptoToken,
} from '@/services/cryptoToken.api';
import { CryptoToken } from '@/types';
import { getErrorMessage } from '@/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';

// Define initial state
interface CryptoTokenState {
  tokens: CryptoToken[];
  loading: boolean;
  error: string | null;
}

const initialState: CryptoTokenState = {
  tokens: [],
  loading: false,
  error: null,
};

// **🔹 Async Thunks for API Calls**
export const fetchTokens = createAsyncThunk<
  CryptoToken[],
  void,
  { rejectValue: string }
>('cryptoTokens/fetchTokens', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchCryptoTokens();
    return response?.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error as Error) as string);
  }
});

export const addCryptoToken = createAsyncThunk<
  CryptoToken,
  Omit<CryptoToken, 'id' | 'createdAt' | 'updatedAt'>,
  { rejectValue: string }
>('cryptoTokens/addCryptoToken', async (newToken, { rejectWithValue }) => {
  try {
    const response = await createCryptoToken(newToken);
    return response;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error as Error) as string);
  }
});

export const updateCryptoTokenById = createAsyncThunk<
  CryptoToken,
  CryptoToken,
  { rejectValue: string }
>('cryptoTokens/updateCryptoToken', async (tokenData, { rejectWithValue }) => {
  try {
    const { id, ...rest } = tokenData;
    const response = await updateCryptoToken(id as string, rest);
    if (!response?.data) {
      throw new Error('No token data returned from API');
    }

    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error as Error) as string);
  }
});

export const removeCryptoToken = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('cryptoTokens/removeCryptoToken', async (tokenId, { rejectWithValue }) => {
  try {
    await deleteCryptoToken(tokenId);
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
      .addCase(fetchTokens.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTokens.fulfilled, (state, action) => {
        state.loading = false;
        state.tokens = action.payload;
      })
      .addCase(fetchTokens.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch tokens';
      })

      // Add Token
      .addCase(addCryptoToken.fulfilled, (state, action) => {
        state.tokens.push(action.payload);
        toast.success(`Token '${action.payload.symbol}' added successfully!`);
      })
      .addCase(addCryptoToken.rejected, (state, action) => {
        toast.error(action.payload || 'Failed to add token');
      })

      // Update Token
      .addCase(updateCryptoTokenById.fulfilled, (state, action) => {
        state.tokens = state.tokens.map((token) =>
          token.id === action.payload.id ? action.payload : token
        );
        toast.success(`Token '${action.payload.symbol}' updated successfully!`);
      })
      .addCase(updateCryptoTokenById.rejected, (state, action) => {
        toast.error(action.payload || 'Failed to update token');
      })

      // Remove Token
      .addCase(removeCryptoToken.fulfilled, (state, action) => {
        state.tokens = state.tokens.filter(
          (token) => token.id !== action.payload // Remove the token from the array
        );
        toast.success('Token removed successfully!');
      })
      .addCase(removeCryptoToken.rejected, (state, action) => {
        toast.error(action.payload || 'Failed to remove token');
      });
  },
});

export default cryptoTokenSlice.reducer;
