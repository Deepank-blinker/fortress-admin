'use client';

import { getAllOrganizations } from '@/services/organization.api';
import { ORGANIZATION } from '@/types';
import { getErrorMessage } from '@/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Define initial state
interface OrganizationState {
  organizations: ORGANIZATION[];
  loading: boolean;
  error: string | null;
}

const initialState: OrganizationState = {
  organizations: [],
  loading: false,
  error: null,
};

// **🔹 Async Thunks for API Calls**
export const fetchOrganizationThunk = createAsyncThunk<
  ORGANIZATION[],
  void,
  { rejectValue: string }
>('organizations/fetchOrganizationThunk', async (_, { rejectWithValue }) => {
  try {
    const response = await getAllOrganizations();
    return response?.data ?? [];
  } catch (error) {
    return rejectWithValue(getErrorMessage(error as Error) as string);
  }
});

// **🔹 Redux Slice**
const organizationsSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Tokens
      .addCase(fetchOrganizationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrganizationThunk.fulfilled, (state, action) => {
        state.organizations = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrganizationThunk.rejected, (state, _action) => {
        state.loading = false;
      });
  },
});

export default organizationsSlice.reducer;
