import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import type { NextRequest } from 'next/server';

const handler = createMiddleware(routing);

export function proxy(request: NextRequest) {
  return handler(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|api|images|og|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
