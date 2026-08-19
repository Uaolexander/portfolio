'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { projects } from '@/content/projects';

type Locale = 'en' | 'ua' | 'pl';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const card = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export function Projects() {
  const t = useTranslations('projects');
  const locale = useLocale() as Locale;

  const featured = projects.filter((p) => p.image && p.status !== 'private');
  const bots = projects.filter((p) => p.status === 'private');

  // An odd count would leave the last row half empty, so the newest project
  // takes the full width and the rest pair up behind it.
  const wideFirst = featured.length % 2 === 1;

  return (
    <section id="projects" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-[12px] text-accent uppercase tracking-[0.15em]">
            {t('label')}
          </span>
          <h2
            className="font-sans font-bold text-text mt-3 leading-tight"
            style={{ fontSize: 'clamp(28px, 3.5vw, 42px)' }}
          >
            {t('heading')}
          </h2>
          <p className="text-text-dim mt-3 text-[15px]">{t('subheader')}</p>
        </motion.div>

        {/* Featured website projects */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid sm:grid-cols-2 gap-5 mb-5"
        >
          {featured.map((p, i) => {
            const href = p.links && p.links.length > 0 ? p.links[0].href : null;
            const isWide = wideFirst && i === 0;
            const Inner = (
              <>
                <div className={`relative overflow-hidden ${isWide ? 'h-[220px] sm:h-[300px] lg:h-[380px]' : 'h-[220px]'}`}>
                  <Image
                    src={p.image!}
                    alt={p.title[locale]}
                    fill
                    priority={i === 0}
                    className={`object-cover transition-transform duration-500 group-hover:scale-105 ${p.imagePosition === 'center' ? 'object-center' : 'object-top'}`}
                    sizes={isWide ? '(max-width: 1200px) 100vw, 1152px' : '(max-width: 640px) 100vw, 50vw'}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      // Top scrim keeps the status badge readable on light screenshots.
                      background:
                        'linear-gradient(to bottom, rgba(13,13,28,0.6) 0%, transparent 18%, transparent 40%, rgba(13,13,28,0.95) 100%)',
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-mono ${
                        p.status === 'live'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : p.status === 'in-progress'
                            ? 'bg-accent/20 text-accent border border-accent/30'
                            : 'bg-white/5 text-text-dim border border-border'
                      }`}
                    >
                      {p.status === 'live'
                        ? t('liveLabel')
                        : p.status === 'in-progress'
                          ? t('inProgressLabel')
                          : t('privateLabel')}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-text font-semibold text-[17px] mb-1.5">{p.title[locale]}</h3>
                  <p className="text-text-dim text-[13px] mb-4 leading-relaxed">{p.oneLiner[locale]}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono text-text-low border border-border"
                        style={{ background: 'rgba(26,26,53,0.5)' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {href && (
                    <span className="inline-flex items-center gap-1.5 text-accent text-[13px] font-medium transition-all duration-200 group-hover:gap-3">
                      {t('visitLabel')}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                      </svg>
                    </span>
                  )}
                </div>
              </>
            );

            return (
              <motion.div key={p.id} variants={card} className={isWide ? 'sm:col-span-2' : undefined}>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-2xl overflow-hidden border border-border cursor-pointer hover:border-accent/40 transition-colors duration-300"
                    style={{ background: 'rgba(13,13,28,0.8)' }}
                  >
                    {Inner}
                  </a>
                ) : (
                  <div
                    className="group rounded-2xl overflow-hidden border border-border"
                    style={{ background: 'rgba(13,13,28,0.8)' }}
                  >
                    {Inner}
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Private bot projects */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {bots.map((p) => (
            <motion.div
              key={p.id}
              variants={card}
              className="rounded-2xl p-5 border border-border hover:border-accent/30 transition-colors duration-300"
              style={{ background: 'rgba(13,13,28,0.8)' }}
            >
              <div className="flex items-start justify-between mb-3">
                <span
                  className="px-2.5 py-1 rounded-full text-[11px] font-mono text-text-low border border-border"
                  style={{ background: 'rgba(26,26,53,0.4)' }}
                >
                  {t('privateLabel')}
                </span>
                <span className="text-[11px] font-mono text-text-low">{p.year}</span>
              </div>
              <h3 className="text-text font-semibold text-[15px] mb-1.5">{p.title[locale]}</h3>
              <p className="text-text-dim text-[12px] leading-relaxed mb-3">{p.oneLiner[locale]}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {p.tech.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md text-[11px] font-mono text-text-low border border-border"
                    style={{ background: 'rgba(26,26,53,0.5)' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-text-low font-mono">{t('ndaNote')}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
