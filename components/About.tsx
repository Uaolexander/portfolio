'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const highlights = ['highlight1', 'highlight2', 'highlight3', 'highlight4'] as const;

const highlightIcons = [
  <svg key="1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  <svg key="2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  <svg key="3" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  <svg key="4" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
];

export function About() {
  const t = useTranslations('about');

  return (
    <section
      id="about"
      className="py-24 lg:py-32"
      style={{ background: 'rgba(13,13,28,0.3)' }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-[12px] text-accent uppercase tracking-[0.15em]">
              {t('label')}
            </span>
            <h2
              className="font-sans font-bold text-text mt-3 mb-6 leading-tight"
              style={{ fontSize: 'clamp(28px, 3.5vw, 42px)' }}
            >
              {t('heading')}
            </h2>

            <div className="space-y-4 text-text-dim text-[15px] leading-[1.8] mb-8" style={{ maxWidth: '56ch' }}>
              <p>
                {t.rich('p1', {
                  link: (chunks) => (
                    <a
                      href="https://englishnerd.cc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent/80 transition-colors duration-150 underline underline-offset-2 decoration-accent/40"
                    >
                      {chunks}
                    </a>
                  ),
                })}
              </p>
              <p>{t('p2')}</p>
              <p>{t('p3')}</p>
            </div>

            {/* Photo */}
            <div className="flex items-center gap-4">
              <div
                className="relative w-14 h-14 rounded-full overflow-hidden border-2 flex-shrink-0"
                style={{ borderColor: 'rgba(91,127,255,0.3)' }}
              >
                <Image
                  src="/images/avatar.jpg"
                  alt={t('imageAlt')}
                  fill
                  className="object-cover object-top"
                  sizes="56px"
                />
              </div>
              <div>
                <div className="text-text text-[14px] font-medium">Oleksandr Vdovychenko</div>
                <div className="text-text-dim text-[13px]">Web Dev & Bot Creator · Poznan, PL</div>
              </div>
            </div>
          </motion.div>

          {/* Right: highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                className="rounded-2xl p-5 border border-border"
                style={{ background: 'rgba(13,13,28,0.8)' }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-accent mb-3"
                  style={{ background: 'rgba(91,127,255,0.1)' }}
                >
                  {highlightIcons[i]}
                </div>
                <div className="text-text text-[13px] font-semibold mb-1">{t(key)}</div>
                <div className="text-text-low text-[12px] leading-relaxed">{t(`${key}sub`)}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
