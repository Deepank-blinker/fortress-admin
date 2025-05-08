// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import authReducer from './slices/auth.slice';
import cryptoTokenReducer from './slices/cryptoToken.slice';
import individualCustomerReducer from './slices/individualCustomers.slice';
import organizationsReducer from './slices/organizations.slice';

import evmChainsReducer from './slices/evmChains.slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cryptoTokens: cryptoTokenReducer,
    evmChains: evmChainsReducer,
    individualCustomer: individualCustomerReducer,
    organizations: organizationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
