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

type CardProps = {
  number: string;
  title: string;
  desc: string;
  deliverables: string[];
};

function ServiceCard({ number, title, desc, deliverables }: CardProps) {
  return (
    <div className="border border-border rounded-lg p-6 flex flex-col gap-5 hover:border-text-low transition-colors duration-200">
      <span className="font-mono text-[10px] text-text-low uppercase tracking-[0.14em]">
        {number}
      </span>
      <div className="flex-1">
        <h3 className="font-serif text-[22px] text-text mb-3 leading-tight">
          {title}
        </h3>
        <p className="text-[13px] text-text-dim leading-relaxed">{desc}</p>
      </div>
      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border">
        {deliverables.map((d) => (
          <span
            key={d}
            className="font-mono text-[10px] text-text-low uppercase tracking-wide"
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Services() {
  const t = useTranslations('services');

  const cards: CardProps[] = [
    {
      number: t('card1Number'),
      title: t('card1Title'),
      desc: t('card1Desc'),
      deliverables: [t('card1D1'), t('card1D2'), t('card1D3'), t('card1D4')],
    },
    {
      number: t('card2Number'),
      title: t('card2Title'),
      desc: t('card2Desc'),
      deliverables: [t('card2D1'), t('card2D2'), t('card2D3'), t('card2D4')],
    },
    {
      number: t('card3Number'),
      title: t('card3Title'),
      desc: t('card3Desc'),
      deliverables: [t('card3D1'), t('card3D2'), t('card3D3')],
    },
  ];

  return (
    <section
      id="services"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {cards.map((card) => (
            <ServiceCard key={card.number} {...card} />
          ))}
        </div>

        <p className="text-[13px] text-text-dim">{t('pricing')}</p>
      </motion.div>
    </section>
  );
}
