'use client';

import { useTranslations } from 'next-intl';

const navLinks = ['projects', 'about', 'skills', 'contact'] as const;

export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  return (
    <footer
      className="border-t border-border"
      style={{ background: 'rgba(7,7,15,0.95)' }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Logo + copyright */}
          <div>
            <div
              className="font-mono font-bold text-[14px] text-accent border border-accent/30 px-3 py-1.5 rounded-lg inline-block mb-3"
              style={{ letterSpacing: '0.05em' }}
            >
              AV
            </div>
            <p className="text-text-low text-[12px] font-mono">
              {t('copy')}. {t('rights')}
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-5">
            {navLinks.map((s) => (
              <a
                key={s}
                href={`#${s}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(s)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-text-low text-[13px] hover:text-text-dim transition-colors duration-150 cursor-pointer"
              >
                {nav(s)}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            <a
              href="https://t.me/alexvdovych"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg flex items-center justify-center border border-border text-text-low hover:text-accent hover:border-accent/40 transition-all duration-200"
              aria-label="Telegram"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </a>
            <a
              href="https://github.com/alexvdovych"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg flex items-center justify-center border border-border text-text-low hover:text-accent hover:border-accent/40 transition-all duration-200"
              aria-label="GitHub"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
