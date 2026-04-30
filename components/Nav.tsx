'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

const SECTIONS = [
  { id: 'about', key: 'about' },
  { id: 'projects', key: 'projects' },
  { id: 'services', key: 'services' },
  { id: 'process', key: 'process' },
  { id: 'contact', key: 'contact' },
] as const;

export function Nav() {
  const t = useTranslations('nav');
  const [active, setActive] = useState<string>('about');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: '-40% 0% -40% 0%' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav aria-label="Page sections">
      <ul className="flex flex-col gap-1">
        {SECTIONS.map(({ id, key }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`group flex items-center gap-4 py-1 transition-colors duration-150 ${
                  isActive
                    ? 'text-text'
                    : 'text-text-low hover:text-text-dim'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(id)
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span
                  className="block h-px bg-current transition-all duration-300 ease-out flex-shrink-0"
                  style={{ width: isActive ? '64px' : '8px' }}
                />
                <span className="font-mono text-[11px] uppercase tracking-[0.12em]">
                  {t(key)}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
