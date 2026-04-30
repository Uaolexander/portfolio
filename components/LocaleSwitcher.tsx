'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useTransition } from 'react';

export function LocaleSwitcher() {
  const t = useTranslations('localeSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const other = locale === 'en' ? 'ua' : 'en';

  function switchLocale() {
    startTransition(() => {
      router.replace(pathname, { locale: other });
    });
  }

  return (
    <button
      onClick={switchLocale}
      disabled={isPending}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border font-mono text-[12px] text-text-dim hover:text-text hover:border-accent/40 transition-all duration-200 disabled:opacity-50"
      style={{ letterSpacing: '0.05em' }}
      aria-label="Switch language"
    >
      <span className="text-text">{t(locale as 'en' | 'ua')}</span>
      <span className="text-text-low">/</span>
      <span>{t(other as 'en' | 'ua')}</span>
    </button>
  );
}
