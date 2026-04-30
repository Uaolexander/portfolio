'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { projects } from '@/content/projects';
import { ProjectRow } from './ProjectRow';

const reveal = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function Projects() {
  const t = useTranslations('projects');

  return (
    <section
      id="projects"
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

        <div className="flex flex-col gap-2" style={{ maxWidth: '680px' }}>
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
