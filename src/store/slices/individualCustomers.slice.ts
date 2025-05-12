'use client';

import { getAllIndividualCustomers } from '@/services/user.api';
import { USER } from '@/types';
import { getErrorMessage } from '@/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Define initial state
interface IndividualCustomerState {
  customers: USER[];
  loading: boolean;
  error: string | null;
}

const initialState: IndividualCustomerState = {
  customers: [],
  loading: false,
  error: null,
};

// **🔹 Async Thunks for API Calls**
export const fetchIndividualCustomerThunk = createAsyncThunk<
  USER[],
  void,
  { rejectValue: string }
>(
  'individualCustomer/fetchIndividualCustomerThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllIndividualCustomers();
      return response?.data ?? [];
    } catch (error) {
      return rejectWithValue(getErrorMessage(error as Error) as string);
    }
  }
);

// **🔹 Redux Slice**
const individualCustomerSlice = createSlice({
  name: 'individualCustomer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Tokens
      .addCase(fetchIndividualCustomerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIndividualCustomerThunk.fulfilled, (state, action) => {
        state.customers = action.payload;
        state.loading = false;
      })
      .addCase(fetchIndividualCustomerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch evmChains';
      });
  },
});

export default individualCustomerSlice.reducer;
