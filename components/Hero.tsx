'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const codeLines = [
  { tokens: [{ t: 'const ', c: '#a855f7' }, { t: 'developer', c: '#eef0ff' }, { t: ' = {', c: '#8892b0' }] },
  { tokens: [{ t: '  name', c: '#5b7fff' }, { t: ': ', c: '#8892b0' }, { t: "'Alex Vdovych'", c: '#4ade80' }, { t: ',', c: '#8892b0' }] },
  { tokens: [{ t: '  role', c: '#5b7fff' }, { t: ': ', c: '#8892b0' }, { t: "'Web Dev & Bot Creator'", c: '#4ade80' }, { t: ',', c: '#8892b0' }] },
  { tokens: [{ t: '  skills', c: '#5b7fff' }, { t: ': ', c: '#8892b0' }, { t: '[', c: '#eef0ff' }, { t: "'Next.js'", c: '#4ade80' }, { t: ', ', c: '#8892b0' }, { t: "'TypeScript'", c: '#4ade80' }, { t: ', ', c: '#8892b0' }, { t: "'Python'", c: '#4ade80' }, { t: ']', c: '#eef0ff' }] },
  { tokens: [{ t: '}', c: '#8892b0' }] },
  { tokens: [] },
  { tokens: [{ t: 'function ', c: '#a855f7' }, { t: 'solveProblem', c: '#5b7fff' }, { t: '(', c: '#8892b0' }, { t: 'problem', c: '#fb923c' }, { t: ': ', c: '#8892b0' }, { t: 'string', c: '#4ade80' }, { t: ') {', c: '#8892b0' }] },
  { tokens: [{ t: '  const ', c: '#a855f7' }, { t: 'solution', c: '#eef0ff' }, { t: ' = ', c: '#8892b0' }, { t: "'Automation'", c: '#4ade80' }, { t: ';', c: '#8892b0' }] },
  { tokens: [{ t: '  return ', c: '#a855f7' }, { t: 'solution', c: '#eef0ff' }, { t: ';', c: '#8892b0' }] },
  { tokens: [{ t: '}', c: '#8892b0' }] },
  { tokens: [] },
  { tokens: [{ t: 'console', c: '#eef0ff' }, { t: '.', c: '#8892b0' }, { t: 'log', c: '#5b7fff' }, { t: '(', c: '#8892b0' }, { t: "'Let's build together!'", c: '#4ade80' }, { t: ')', c: '#8892b0' }] },
];

export function Hero() {
  const t = useTranslations('hero');
  const words = [t('word1'), t('word2'), t('word3')];
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= word.length) {
      setDisplayed(word.slice(0, charIdx));
      timeout = setTimeout(() => setCharIdx((c) => c + 1), 80);
    } else if (!deleting && charIdx > word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIdx > 0) {
      setDisplayed(word.slice(0, charIdx - 1));
      timeout = setTimeout(() => setCharIdx((c) => c - 1), 45);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: '80px' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(91,127,255,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 w-full py-16 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[12px] font-mono text-accent" style={{ letterSpacing: '0.06em' }}>
                {t('badge')}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-sans font-bold leading-[1.1] tracking-tight mb-6" style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}>
              <span className="text-text">{t('headline')} </span>
              <span
                className="inline-block min-w-[4px]"
                style={{
                  background: 'linear-gradient(135deg, #5b7fff 0%, #a855f7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {displayed}
                <span
                  className="inline-block w-[3px] h-[0.9em] ml-0.5 align-middle rounded-sm animate-blink"
                  style={{ background: '#5b7fff', verticalAlign: '-0.1em' }}
                />
              </span>
              <br />
              <span className="text-text">{t('headline2')}</span>
            </h1>

            {/* Description */}
            <p className="text-text-dim text-[16px] leading-relaxed mb-8 max-w-[48ch]">
              {t('description')}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo('projects')}
                className="flex items-center gap-2 px-6 py-3 text-white text-[14px] font-medium rounded-xl transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #5b7fff, #7c5fff)',
                  boxShadow: '0 0 24px rgba(91,127,255,0.35)',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 36px rgba(91,127,255,0.55)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(91,127,255,0.35)'; }}
              >
                {t('viewProjects')}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="flex items-center gap-2 px-6 py-3 text-text-dim text-[14px] font-medium rounded-xl border border-border hover:border-accent/40 hover:text-text transition-all duration-200"
              >
                {t('contactMe')}
              </button>
            </div>
          </motion.div>

          {/* Right: Code card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="hidden lg:block"
          >
            <div
              className="animate-float relative rounded-2xl overflow-hidden border border-border"
              style={{
                background: 'rgba(13,13,28,0.9)',
                boxShadow: '0 0 60px rgba(91,127,255,0.12), 0 24px 80px rgba(0,0,0,0.5)',
              }}
            >
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border" style={{ background: 'rgba(19,19,37,0.8)' }}>
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 font-mono text-[11px] text-text-low">index.ts</span>
              </div>

              {/* Code */}
              <div className="px-6 pt-6 pb-16 font-mono text-[13px] leading-[1.8]">
                {codeLines.map((line, i) => (
                  <div key={i}>
                    {line.tokens.length === 0 ? (
                      <span>&nbsp;</span>
                    ) : (
                      line.tokens.map((tok, j) => (
                        <span key={j} style={{ color: tok.c }}>{tok.t}</span>
                      ))
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom badge */}
              <div
                className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 rounded-xl border border-accent/20"
                style={{ background: 'rgba(91,127,255,0.08)', backdropFilter: 'blur(8px)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5b7fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <span className="font-mono text-[11px] text-accent">Fast · Reliable · Scalable</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
