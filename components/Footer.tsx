import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="px-6 py-10 md:px-12 lg:px-16">
      <p className="font-mono text-[11px] text-text-low">
        {t('builtBy')}
      </p>
    </footer>
  );
}
