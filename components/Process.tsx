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

type Step = {
  number: string;
  title: string;
  body: string;
};

export function Process() {
  const t = useTranslations('process');

  const steps: Step[] = [
    {
      number: t('step1Number'),
      title: t('step1Title'),
      body: t('step1Body'),
    },
    {
      number: t('step2Number'),
      title: t('step2Title'),
      body: t('step2Body'),
    },
    {
      number: t('step3Number'),
      title: t('step3Title'),
      body: t('step3Body'),
    },
    {
      number: t('step4Number'),
      title: t('step4Title'),
      body: t('step4Body'),
    },
  ];

  return (
    <section
      id="process"
      className="px-6 pt-12 pb-20 md:px-12 md:py-20 lg:px-16 lg:py-28 border-b border-border"
    >
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        <p className="font-mono text-[11px] text-text-low uppercase tracking-[0.12em] mb-3">
          {t('label')}
        </p>
        <p className="text-[14px] text-text-dim mb-8">{t('subheader')}</p>

        <div className="flex flex-col gap-0" style={{ maxWidth: '640px' }}>
          {steps.map(({ number, title, body }, i) => (
            <div
              key={number}
              className={`flex gap-8 py-7 ${i < steps.length - 1 ? 'border-b border-border' : ''}`}
            >
              <span className="font-mono text-[12px] text-text-low flex-shrink-0 w-6 pt-0.5">
                {number}
              </span>
              <div>
                <h3 className="font-sans font-semibold text-[14px] text-text mb-2">
                  {title}
                </h3>
                <p className="text-[13px] text-text-dim leading-relaxed">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
