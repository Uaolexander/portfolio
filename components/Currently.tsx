'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const reveal = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function Currently() {
  const t = useTranslations('currently');

  const items = [
    { label: t('item1Label'), value: t('item1Value') },
    { label: t('item2Label'), value: t('item2Value') },
    { label: t('item3Label'), value: t('item3Value') },
    { label: t('item4Label'), value: t('item4Value') },
  ];

  return (
    <section
      id="currently"
      className="px-6 py-20 md:px-12 lg:px-16 lg:py-28 border-b border-border"
    >
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        <p className="font-mono text-[11px] text-text-low uppercase tracking-[0.12em] mb-10">
          {t('label')}
        </p>

        <div className="flex flex-col gap-3" style={{ maxWidth: '480px' }}>
          {items.map(({ label, value }) => (
            <div key={label} className="flex items-baseline gap-4">
              <span className="font-mono text-[12px] text-text-low w-20 flex-shrink-0">
                {label}
              </span>
              <span className="font-mono text-[12px] text-text-low mx-1 flex-shrink-0">
                →
              </span>
              <span className="text-[14px] text-text-dim">{value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
