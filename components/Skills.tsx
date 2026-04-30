'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const groups = [
  {
    key: 'web',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    key: 'bots',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a2 2 0 0 1 2 2v1h2a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h2V4a2 2 0 0 1 2-2z" /><circle cx="9" cy="12" r="1" fill="currentColor" /><circle cx="15" cy="12" r="1" fill="currentColor" /><path d="M9 17h6" />
      </svg>
    ),
  },
  {
    key: 'tools',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    key: 'focus',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
] as const;

export function Skills() {
  const t = useTranslations('skills');

  return (
    <section
      id="skills"
      className="py-24 lg:py-32"
      style={{ background: 'rgba(13,13,28,0.3)' }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
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
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {groups.map((group, i) => {
            const items = t.raw(`${group.key}Items`) as string[];
            return (
              <motion.div
                key={group.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl p-6 border border-border"
                style={{ background: 'rgba(13,13,28,0.8)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-accent mb-4" style={{ background: 'rgba(91,127,255,0.1)' }}>
                  {group.icon}
                </div>
                <h3 className="text-text font-semibold text-[14px] mb-4">
                  {t(group.key)}
                </h3>
                <ul className="space-y-2.5">
                  {items.map((skill) => (
                    <li key={skill} className="flex items-center gap-2.5 text-[13px] text-text-dim">
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: '#5b7fff' }}
                      />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
