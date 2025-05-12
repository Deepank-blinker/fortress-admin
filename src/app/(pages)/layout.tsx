'use client';
import Spinner from '@/components/custom/spinner';
import { ROUTES } from '@/constants/route';
import { fetchUserProfile } from '@/store/slices/auth.slice';
import { fetchTokens } from '@/store/slices/cryptoToken.slice';
import { fetchEvmChainsThunk } from '@/store/slices/evmChains.slice';
import { fetchIndividualCustomerThunk } from '@/store/slices/individualCustomers.slice';
import { fetchOrganizationThunk } from '@/store/slices/organizations.slice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { usePathname, useRouter } from 'next/navigation';
import React, { ReactNode, Suspense, useEffect } from 'react';
interface LayoutProps {
  children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const path = usePathname();

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (
      isAuthenticated &&
      Object.keys(ROUTES).map(
        (key) => path === ROUTES[key].path && ROUTES[key].isAuthenticationRoute
      )
    ) {
      router.push(ROUTES.WHITELISTED_IPS.path);
    }
  }, []);

  //   Fetch user stats

  useEffect(() => {
    dispatch(fetchTokens());
    dispatch(fetchEvmChainsThunk());
    if (isAuthenticated) {
      dispatch(fetchUserProfile());
      dispatch(fetchIndividualCustomerThunk());
      dispatch(fetchOrganizationThunk());
    }
  }, []);

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};
export default Layout;
