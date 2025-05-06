type Route = {
  path: string;
  isAuthenticationRoute?: boolean;
  isProtectedRoute?: boolean;
};

type Routes = Record<string, Route>;

export const ROUTES: Routes = {
  HOME: {
    path: '/',
    isProtectedRoute: true,
  },
  LOGIN: {
    path: '/login',
    isAuthenticationRoute: true,
  },
  DASHBOARD: {
    path: '/dashboard',
    isProtectedRoute: true,
  },
  WHITELISTED_IPS: {
    path: '/whitelisted-ips',
    isProtectedRoute: true,
  },
  CRYPTO_TOKENS: {
    path: '/crypto-tokens',
    isProtectedRoute: true,
  },
  CUSTOMER_TICKETS: {
    path: '/customer-tickets',
    isProtectedRoute: true,
  },
};
