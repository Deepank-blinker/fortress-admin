'use client';

import { LOCAL_STORAGE_KEYS, Tokens } from '@/constants/interface.constant';
import { getUserProfile } from '@/services/auth.api';
import { MEMBER, ORGANIZATION, USER_PROFILE } from '@/types';
import { getErrorMessage } from '@/utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const saveToLocalStorage = <T>(key: string, data: T) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

const clearLocalStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.clear();
  }
};
const clearCookies = () => {
  // Clear cookies
  document.cookie = `${LOCAL_STORAGE_KEYS.ACCESS_TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
  document.cookie = `${LOCAL_STORAGE_KEYS.REFRESH_TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
};

const getFromLocalStorage = (): {
  accessToken: Tokens['access']['token'] | null;
  refreshToken: Tokens['refresh']['token'] | null;
  user: USER_PROFILE | null;
} => {
  if (typeof window === 'undefined') {
    return { accessToken: null, refreshToken: null, user: null };
  }

  const tokens = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKENS)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.TOKENS)!)
    : null;

  const user = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_KEY)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USER_KEY)!)
    : null;

  return {
    accessToken: tokens?.access?.token,
    refreshToken: tokens?.refresh?.token,
    user,
  };
};

const { accessToken, refreshToken, user } = getFromLocalStorage();

const initialState = {
  user: user || null,
  accessToken: accessToken || null,
  refreshToken: refreshToken || null,
  isAuthenticated: !!accessToken && !!refreshToken && !!user,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { tokens, user } = action.payload;
      saveToLocalStorage(
        LOCAL_STORAGE_KEYS.ACCESS_TOKEN_KEY,
        tokens.access.token
      );
      saveToLocalStorage(LOCAL_STORAGE_KEYS.TOKENS, tokens);
      saveToLocalStorage(
        LOCAL_STORAGE_KEYS.REFRESH_TOKEN_KEY,
        tokens.refresh.token
      );
      saveToLocalStorage(LOCAL_STORAGE_KEYS.USER_KEY, user);
      document.cookie = `${LOCAL_STORAGE_KEYS.ACCESS_TOKEN_KEY}=${tokens.access.token}; expires=${new Date(tokens.access.expires).toUTCString()}; path=/; SameSite=Strict`;
      document.cookie = `${LOCAL_STORAGE_KEYS.REFRESH_TOKEN_KEY}=${tokens.refresh.token}; expires=${new Date(tokens.refresh.expires).toUTCString()}; path=/; SameSite=Strict`;

      state.user = user;
      state.accessToken = tokens.access.token;
      state.refreshToken = tokens.refresh.token;
      state.isAuthenticated = true;
    },
    setUser: (state, action) => {
      const user = action.payload;

      // Save the user to localStorage
      saveToLocalStorage(LOCAL_STORAGE_KEYS.USER_KEY, user);

      // Update the state with the new user data
      state.user = user;
    },
    updateUserRedux: (state, action: PayloadAction<USER_PROFILE>) => {
      const userPayload = action.payload;
      const { user } = getFromLocalStorage();
      const updatedUser = { ...user, ...userPayload };
      saveToLocalStorage(LOCAL_STORAGE_KEYS.USER_KEY, updatedUser);
      state.user = updatedUser;
    },
    updateOrganizationMemberRedux: (
      state,
      action: PayloadAction<USER_PROFILE[]>
    ) => {
      const organizationMembers = action.payload;
      const { user } = getFromLocalStorage();
      const updatedUser: MEMBER = {
        ...user,
        organization: {
          ...user?.organization,
          members: organizationMembers,
        } as ORGANIZATION,
      };
      saveToLocalStorage(LOCAL_STORAGE_KEYS.USER_KEY, updatedUser);
      state.user = updatedUser as USER_PROFILE;
    },
    logout: (state) => {
      clearLocalStorage();
      clearCookies();

      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

      window.location.href = '/login';
    },
  },
});

export const fetchUserProfile = createAsyncThunk<
  USER_PROFILE,
  void,
  { rejectValue: string }
>('auth/fetchUserProfile', async (_, { dispatch, rejectWithValue }) => {
  try {
    const response = await getUserProfile();

    if (!response?.data) {
      return rejectWithValue('No user profile returned');
    }

    dispatch(setUser(response.data)); // ✅ Store user profile in Redux
    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error as Error) as string);
  }
});

export const {
  login,
  logout,
  setUser,
  updateUserRedux,
  updateOrganizationMemberRedux,
} = authSlice.actions;
export default authSlice.reducer;
