'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const reveal = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function About() {
  const t = useTranslations('about');

  return (
    <section
      id="about"
      className="px-6 pt-10 pb-20 md:px-12 md:pt-20 lg:px-16 lg:py-28 border-b border-border"
    >
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* Section label */}
        <p className="font-mono text-[11px] text-text-low uppercase tracking-[0.12em] mb-8">
          {t('label')}
        </p>

        <div className="flex flex-col sm:flex-row gap-8 sm:items-start">
          {/* Prose */}
          <div className="flex-1 min-w-0">
            <div
              className="text-[15px] text-text-dim leading-[1.75] space-y-5"
              style={{ maxWidth: '62ch' }}
            >
              <p>
                {t.rich('p1', {
                  link: (chunks) => (
                    <a
                      href="https://englishnerd.cc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text font-medium hover:text-text-dim transition-colors duration-150 underline underline-offset-2 decoration-border hover:decoration-text-dim"
                    >
                      {chunks}
                    </a>
                  ),
                })}
              </p>
              <p>{t('p2')}</p>
              <p>{t('p3')}</p>
              <p>
                {t.rich('p4', {
                  telegram: (chunks) => (
                    <a
                      href="https://t.me/EnglishNerd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text font-medium hover:text-text-dim transition-colors duration-150 underline underline-offset-2 decoration-border hover:decoration-text-dim"
                    >
                      {chunks}
                    </a>
                  ),
                  tpt: (chunks) => (
                    <a
                      href="https://www.teacherspayteachers.com/store/english-nerd-ua"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text font-medium hover:text-text-dim transition-colors duration-150 underline underline-offset-2 decoration-border hover:decoration-text-dim"
                    >
                      {chunks}
                    </a>
                  ),
                })}
              </p>
            </div>
          </div>

          {/* Avatar */}
          <div className="flex-shrink-0 sm:self-start">
            <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-lg overflow-hidden relative border border-border">
              <Image
                src="/images/avatar.jpg"
                alt={t('imageAlt')}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 96px, (max-width: 1024px) 128px, 160px"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
