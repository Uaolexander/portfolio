'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from './LocaleSwitcher';

const SECTIONS = ['home', 'projects', 'about', 'skills', 'contact'] as const;
const NAV_SECTIONS = ['projects', 'about', 'skills', 'contact'] as const;

export function Navbar() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { rootMargin: '-35% 0% -35% 0%' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(7,7,15,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(26,26,53,0.8)' : 'none',
      }}
    >
      {/* Progress bar */}
      <div
        className="absolute top-0 left-0 h-[2px] transition-all duration-150"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #5b7fff, #a855f7)',
        }}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="font-mono font-bold text-[14px] text-accent border border-accent/30 px-3 py-1.5 rounded-lg hover:bg-accent/10 transition-all duration-200"
          style={{ letterSpacing: '0.05em' }}
        >
          AV
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className="px-4 py-2 text-[13px] rounded-lg transition-all duration-150"
              style={{
                color: active === s ? '#eef0ff' : '#8892b0',
                background: active === s ? 'rgba(91,127,255,0.1)' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (active !== s) (e.currentTarget as HTMLElement).style.color = '#eef0ff';
              }}
              onMouseLeave={(e) => {
                if (active !== s) (e.currentTarget as HTMLElement).style.color = '#8892b0';
              }}
            >
              {t(s)}
            </button>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <button
            onClick={() => scrollTo('contact')}
            className="hidden sm:flex items-center gap-2 px-4 py-2 text-white text-[13px] font-medium rounded-lg transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #5b7fff, #7c5fff)',
              boxShadow: '0 0 20px rgba(91,127,255,0.3)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(91,127,255,0.5)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(91,127,255,0.3)';
            }}
          >
            {t('letsTalk')}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-text-dim"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className="block h-px bg-current transition-all" style={{ transform: menuOpen ? 'rotate(45deg) translate(3px, 3px)' : '' }} />
              <span className="block h-px bg-current transition-all" style={{ opacity: menuOpen ? 0 : 1 }} />
              <span className="block h-px bg-current transition-all" style={{ transform: menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : '' }} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border" style={{ background: 'rgba(7,7,15,0.95)', backdropFilter: 'blur(12px)' }}>
          <div className="px-5 py-4 flex flex-col gap-1">
            {NAV_SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className="text-left px-4 py-3 text-[14px] rounded-lg transition-colors"
                style={{ color: active === s ? '#eef0ff' : '#8892b0' }}
              >
                {t(s)}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contact')}
              className="mt-2 px-4 py-3 text-white text-[14px] font-medium rounded-lg text-center"
              style={{ background: 'linear-gradient(135deg, #5b7fff, #7c5fff)' }}
            >
              {t('letsTalk')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
