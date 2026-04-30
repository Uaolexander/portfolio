'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

function parseValue(val: string): { num: number; suffix: string } {
  const match = val.match(/^(\d+)(.*)$/);
  if (!match) return { num: 0, suffix: val };
  return { num: parseInt(match[1], 10), suffix: match[2] };
}

function AnimatedNumber({ value, started }: { value: string; started: boolean }) {
  const { num, suffix } = parseValue(value);
  const [count, setCount] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!started) return;
    const duration = 1600;
    const startTime = performance.now();

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * num));
      if (progress < 1) {
        raf.current = requestAnimationFrame(step);
      }
    }

    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [started, num]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { valueKey: 's1value', labelKey: 's1label' },
  { valueKey: 's2value', labelKey: 's2label' },
  { valueKey: 's3value', labelKey: 's3label' },
  { valueKey: 's4value', labelKey: 's4label' },
] as const;

export function Stats() {
  const t = useTranslations('stats');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-[12px] text-accent uppercase tracking-[0.15em]">
            {t('label')}
          </span>
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {stats.map(({ valueKey, labelKey }, i) => (
            <motion.div
              key={valueKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl p-6 text-center border border-border"
              style={{ background: 'rgba(13,13,28,0.8)' }}
            >
              <div
                className="font-sans font-bold mb-2"
                style={{
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  background: 'linear-gradient(135deg, #5b7fff 0%, #a855f7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                <AnimatedNumber value={t(valueKey)} started={inView} />
              </div>
              <div className="text-text-dim text-[13px]">{t(labelKey)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
