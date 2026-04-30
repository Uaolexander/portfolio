import type { Metadata } from 'next';
import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Oleksandr Vdovychenko, Web & Bot Developer',
  description:
    'Web and bot developer based in Poznan. I build websites and Telegram bots for small businesses.',
  metadataBase: new URL('https://alexvdovych.vercel.app'),
  openGraph: {
    type: 'website',
    url: 'https://alexvdovych.vercel.app',
    title: 'Oleksandr Vdovychenko, Web & Bot Developer',
    description:
      'Web and bot developer based in Poznan. I build websites and Telegram bots for small businesses.',
    images: [{ url: '/api/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oleksandr Vdovychenko, Web & Bot Developer',
    description:
      'Web and bot developer based in Poznan. I build websites and Telegram bots for small businesses.',
    images: ['/api/og'],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {/* Runs synchronously before React hydration — prevents browser scroll restoration */}
        <script dangerouslySetInnerHTML={{ __html: "history.scrollRestoration='manual';window.scrollTo(0,0);" }} />
        {children}
      </body>
    </html>
  );
}
