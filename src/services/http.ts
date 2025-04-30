'use client';

import { LOCAL_STORAGE_KEYS } from '@/constants/interface.constant';
import { API_ROUTES } from '@/constants/api.routes';
import { getErrorMessage } from '@/utils';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Logout function that clears tokens and redirects to login
export const logoutUser = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    Cookies.remove(LOCAL_STORAGE_KEYS.ACCESS_TOKEN_KEY);
    Cookies.remove(LOCAL_STORAGE_KEYS.REFRESH_TOKEN_KEY);
    localStorage.clear();
    window.location.href = '/login';
  }
};

// Function to refresh the access token
const refreshAccessToken = async () => {
  const refreshToken = Cookies.get(LOCAL_STORAGE_KEYS.REFRESH_TOKEN_KEY);

  try {
    if (!refreshToken || refreshToken === '' || refreshToken === undefined) {
      return;
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}${API_ROUTES.token.getAccessToken.url}`,
      { refreshToken }
    );

    const { accessToken, expiresIn } = response.data.data;

    const expirationDate = new Date(expiresIn);
    Cookies.set(LOCAL_STORAGE_KEYS.ACCESS_TOKEN_KEY, accessToken, {
      expires: expirationDate,
    });

    return accessToken;
  } catch (error) {
    toast.error(getErrorMessage(error as Error));
    logoutUser();
    throw error;
  }
};

// Request interceptor to add Authorization header with the access token
http.interceptors.request.use(
  (config) => {
    const token = Cookies.get(LOCAL_STORAGE_KEYS.ACCESS_TOKEN_KEY);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors and refresh the access token
http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Skip handling for Next.js internal routes by checking for 'next' or API routes
    const isNextApiRoute =
      originalRequest.url && originalRequest.url.includes('/api/');

    // Only handle 401 for external axios requests (not for Next.js API routes)
    if (
      !isNextApiRoute &&
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // Retry the original request with the new token
        return http(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    // Reject the error for other cases
    return Promise.reject(error);
  }
);

export default http;
