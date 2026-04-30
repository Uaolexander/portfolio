'use client';

import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ArrowUpRight, Lock, Circle } from 'lucide-react';
import type { Project } from '@/content/projects';

export function ProjectRow({ project }: { project: Project }) {
  const locale = useLocale() as 'en' | 'uk';
  const t = useTranslations('projects');

  const hasLink = project.links && project.links.length > 0;
  const link = hasLink ? project.links![0] : null;

  const Wrapper = link ? 'a' : 'div';
  const wrapperProps = link
    ? {
        href: link.href,
        target: '_blank' as const,
        rel: 'noopener noreferrer',
      }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="group flex flex-col sm:flex-row gap-5 p-4 -mx-4 rounded-lg transition-colors duration-200"
      style={{
        backgroundColor: 'transparent',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor =
          'rgba(221, 227, 238, 0.06)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
      }}
    >
      {/* Thumbnail */}
      <div className="flex-shrink-0 w-full sm:w-[180px] h-[108px] rounded-md overflow-hidden bg-surface relative border border-border">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title[locale]}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 180px"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <div className="w-8 h-px bg-border" />
            <span className="font-mono text-[9px] text-text-low uppercase tracking-widest text-center px-3 leading-relaxed">
              {project.title[locale]}
            </span>
            <div className="w-8 h-px bg-border" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-between gap-3">
        <div>
          {/* Title row */}
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <h3 className="font-sans font-semibold text-[15px] text-text transition-transform duration-200 group-hover:translate-x-0.5">
              {project.title[locale]}
            </h3>
            <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
              {/* Status badge */}
              <StatusBadge status={project.status} t={t} />
              {/* Arrow for live projects */}
              {hasLink && (
                <ArrowUpRight
                  size={14}
                  className="text-text-low transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                />
              )}
            </div>
          </div>

          {/* One-liner */}
          <p className="text-[13px] text-text-dim leading-relaxed mb-2">
            {project.oneLiner[locale]}
          </p>

          {/* Description (hidden on mobile, visible on hover on desktop) */}
          <p className="text-[12px] text-text-low leading-relaxed hidden sm:block">
            {project.description[locale]}
          </p>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] text-text-low border border-border px-2 py-0.5 rounded-full uppercase tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

function StatusBadge({
  status,
  t,
}: {
  status: Project['status'];
  t: ReturnType<typeof useTranslations<'projects'>>;
}) {
  if (status === 'live') {
    return (
      <span className="font-mono text-[9px] text-text uppercase tracking-widest">
        {t('liveLabel')}
      </span>
    );
  }
  if (status === 'private') {
    return (
      <span className="flex items-center gap-1 font-mono text-[9px] text-text-low uppercase tracking-widest">
        <Lock size={9} strokeWidth={1.5} />
        {t('privateLabel')}
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 font-mono text-[9px] text-text-low uppercase tracking-widest">
      <Circle size={9} strokeWidth={1.5} />
      {t('inProgressLabel')}
    </span>
  );
}
