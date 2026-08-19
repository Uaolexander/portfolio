import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

function detectLocale(request: NextRequest): 'en' | 'ua' | 'pl' {
  const acceptLanguage = request.headers.get('accept-language') ?? '';
  const langs = acceptLanguage
    .split(',')
    .map((l) => l.split(';')[0].trim().toLowerCase());

  for (const lang of langs) {
    if (lang === 'uk' || lang.startsWith('uk-') || lang.startsWith('ua')) return 'ua';
    if (lang === 'pl' || lang.startsWith('pl-')) return 'pl';
    if (lang === 'en' || lang.startsWith('en-')) return 'en';
  }
  return 'en';
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === '/') {
    const locale = detectLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url, { status: 307 });
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|api|images|og|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
