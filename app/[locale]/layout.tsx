import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === 'ua') {
    return {
      title: 'Олександр Вдовиченко | Веб-розробник та розробник ботів',
      description:
        'Веб-розробник та розробник ботів з Познані. Роблю сайти та Telegram-боти для малого бізнесу.',
      openGraph: {
        title: 'Олександр Вдовиченко | Веб-розробник та розробник ботів',
        description:
          'Веб-розробник та розробник ботів з Познані. Роблю сайти та Telegram-боти для малого бізнесу.',
      },
    };
  }

  if (locale === 'pl') {
    return {
      title: 'Oleksandr Vdovychenko | Programista stron i botów',
      description:
        'Programista stron internetowych i botów z Poznania. Tworzę strony i boty Telegram dla małych firm.',
      openGraph: {
        title: 'Oleksandr Vdovychenko | Programista stron i botów',
        description:
          'Programista stron internetowych i botów z Poznania. Tworzę strony i boty Telegram dla małych firm.',
      },
    };
  }

  return {};
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'ua' | 'pl')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
