import { NextRequest, NextResponse } from 'next/server';
import { ROUTES } from './constants/route';
import { LOCAL_STORAGE_KEYS } from './constants/interface.constant';

// Predefined route sets
const AUTH_ROUTES = new Set([ROUTES.LOGIN.path]);

const PROTECTED_ROUTES = Object.values(ROUTES)
  .filter((route) => route.isProtectedRoute)
  .map((route) => route.path);

// Helpers
const getRootRoute = (path: string) => `/${path.split('/')[1]}`;

const redirectTo = (
  req: NextRequest,
  path: string,
  ignorePaths: string[] = []
) => {
  const rootRoute = getRootRoute(req.nextUrl.pathname);
  if (!ignorePaths.includes(rootRoute) && rootRoute !== path) {
    return NextResponse.redirect(new URL(path, req.url));
  }
  return NextResponse.next();
};

const handleAuthRoutes = (req: NextRequest, isAuthenticated: boolean) => {
  if (AUTH_ROUTES.has(getRootRoute(req.nextUrl.pathname))) {
    return isAuthenticated
      ? redirectTo(req, ROUTES.WHITELISTED_IPS.path)
      : NextResponse.next();
  }
  return null;
};

const handleProtectedRoutes = (req: NextRequest, isAuthenticated: boolean) => {
  if (!isAuthenticated && PROTECTED_ROUTES.includes(req.nextUrl.pathname)) {
    return redirectTo(req, ROUTES.LOGIN.path);
  }
  return null;
};

const handleHomeRoute = (req: NextRequest, isAuthenticated: boolean) => {
  if (req.nextUrl.pathname === ROUTES.HOME.path) {
    return NextResponse.redirect(
      new URL(
        isAuthenticated ? ROUTES.WHITELISTED_IPS.path : ROUTES.LOGIN.path,
        req.url
      )
    );
  }
  return null;
};

export async function middleware(req: NextRequest) {
  // const { pathname } = new URL(req.url);
  // const route = ROUTES.INDIVIDUAL.path;
  // const actualPath = `${ROUTES.INDIVIDUAL.path}/jsbfjksdknf?currency=USD&token=BTC&chain=UTXO&step=1`;
  // if (!pathname.startsWith(route)) {
  //   return NextResponse.redirect(new URL(actualPath, req.url));
  // }
  // return NextResponse.next();
  const token = req.cookies.get(LOCAL_STORAGE_KEYS.REFRESH_TOKEN_KEY)?.value;
  const isAuthenticated = Boolean(token);

  const authResponse = handleAuthRoutes(req, isAuthenticated);
  if (authResponse) return authResponse;

  const protectedResponse = handleProtectedRoutes(req, isAuthenticated);
  if (protectedResponse) return protectedResponse;

  const homeResponse = handleHomeRoute(req, isAuthenticated);
  if (homeResponse) return homeResponse;

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!_next|static|favicon.ico|public).*)'],
};
