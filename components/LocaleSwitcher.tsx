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

  const other = locale === 'en' ? 'uk' : 'en';

  function switchLocale() {
    startTransition(() => {
      router.replace(pathname, { locale: other });
    });
  }

  return (
    <div
      className="absolute top-6 right-6 flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase"
      aria-label="Switch language"
    >
      <span className="text-text">{t(locale as 'en' | 'uk')}</span>
      <span className="text-text-low">/</span>
      <button
        onClick={switchLocale}
        disabled={isPending}
        className="text-text-low hover:text-text-dim transition-colors duration-150 disabled:opacity-50"
      >
        {t(other as 'en' | 'uk')}
      </button>
    </div>
  );
}
