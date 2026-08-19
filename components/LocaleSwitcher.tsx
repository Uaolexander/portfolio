'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useTransition } from 'react';

const LOCALES = ['en', 'ua', 'pl'] as const;
type Locale = (typeof LOCALES)[number];

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: Locale) {
    if (next === locale || isPending) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div className="flex items-center">
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && (
            <span className="text-text-low font-mono text-[11px] select-none">/</span>
          )}
          <button
            onClick={() => switchTo(l)}
            disabled={isPending}
            className={`font-mono text-[12px] px-1.5 py-1 rounded transition-colors duration-200 disabled:opacity-50 ${
              l === locale
                ? 'text-text'
                : 'text-text-low hover:text-text-dim'
            }`}
            style={{ letterSpacing: '0.05em' }}
            aria-label={`Switch to ${l.toUpperCase()}`}
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
