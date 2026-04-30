'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Nav } from './Nav';
import { Socials } from './Socials';
import { LocaleSwitcher } from './LocaleSwitcher';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' as const },
  },
};

export function LeftColumn() {
  const t = useTranslations('hero');

  return (
    <div className="relative flex flex-col lg:h-screen px-6 pt-10 pb-6 md:px-12 lg:px-16 lg:py-16 border-b border-border lg:border-b-0">
      <LocaleSwitcher />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col flex-1"
      >
        {/* Name + tagline */}
        <div className="pt-4 lg:pt-0">
          <motion.h1
            variants={item}
            className="font-serif leading-[1.05] tracking-tight mb-3"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            Oleksandr
            <br />
            Vdovychenko
          </motion.h1>

          <motion.p
            variants={item}
            className="text-[19px] font-sans text-text mb-2 leading-snug"
          >
            {t('tagline')}
          </motion.p>

          <motion.p
            variants={item}
            className="text-[14px] text-text-dim font-sans"
          >
            {t('subline')}
          </motion.p>
        </div>

        {/* Nav */}
        <motion.div variants={item} className="mt-10 lg:mt-12">
          <Nav />
        </motion.div>

        {/* Socials pushed to bottom on desktop, normal flow on mobile */}
        <motion.div variants={item} className="mt-10 lg:mt-auto lg:pb-4">
          <Socials />
        </motion.div>
      </motion.div>
    </div>
  );
}
