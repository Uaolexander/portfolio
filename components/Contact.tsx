'use client';

import { useState, useRef, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Send, Mail, Loader2, Check } from 'lucide-react';

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

const reveal = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

type FormState = 'idle' | 'sending' | 'sent' | 'error';

export function Contact() {
  const t = useTranslations('contact');

  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === 'sending') return;

    const form = e.currentTarget;
    const data = new FormData(form);

    const body = {
      name: (data.get('name') as string).trim(),
      email: (data.get('email') as string).trim(),
      telegram: (data.get('telegram') as string).trim(),
      message: (data.get('message') as string).trim(),
      website: (data.get('website') as string).trim(),
    };

    setState('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const json = await res.json();

      if (json.ok) {
        setState('sent');
        formRef.current?.reset();
        setTimeout(() => setState('idle'), 5000);
      } else {
        setErrorMsg(json.error || t('errorLabel'));
        setState('error');
        setTimeout(() => setState('idle'), 5000);
      }
    } catch {
      setErrorMsg(t('errorLabel'));
      setState('error');
      setTimeout(() => setState('idle'), 5000);
    }
  }

  return (
    <section
      id="contact"
      className="px-6 pt-12 pb-20 md:px-12 md:py-20 lg:px-16 lg:py-28 border-b border-border"
    >
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        <p className="font-mono text-[11px] text-text-low uppercase tracking-[0.12em] mb-8">
          {t('label')}
        </p>

        <h2
          className="font-serif text-text leading-tight tracking-tight mb-8"
          style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}
        >
          {t('heading')}
        </h2>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-7"
          style={{ maxWidth: '560px' }}
          noValidate
        >
          {/* Honeypot - hidden from humans */}
          <div
            style={{
              position: 'absolute',
              overflow: 'hidden',
              clip: 'rect(0 0 0 0)',
              height: '1px',
              width: '1px',
              margin: '-1px',
              padding: '0',
              border: '0',
            }}
            aria-hidden="true"
          >
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block font-mono text-[10px] text-text-low uppercase tracking-widest mb-2"
            >
              {t('nameLabel')} *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="form-input"
              placeholder={t('namePlaceholder')}
              autoComplete="name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block font-mono text-[10px] text-text-low uppercase tracking-widest mb-2"
            >
              {t('emailLabel')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-input"
              placeholder={t('emailPlaceholder')}
              autoComplete="email"
            />
          </div>

          <div>
            <label
              htmlFor="telegram"
              className="block font-mono text-[10px] text-text-low uppercase tracking-widest mb-2"
            >
              {t('telegramLabel')}
            </label>
            <input
              id="telegram"
              name="telegram"
              type="text"
              className="form-input"
              placeholder={t('telegramPlaceholder')}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block font-mono text-[10px] text-text-low uppercase tracking-widest mb-2"
            >
              {t('messageLabel')} *
            </label>
            <textarea
              id="message"
              name="message"
              required
              minLength={10}
              maxLength={2000}
              rows={5}
              className="form-input resize-none"
              placeholder={t('messagePlaceholder')}
            />
          </div>

          <button
            type="submit"
            disabled={state === 'sending' || state === 'sent'}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 font-mono text-[12px] uppercase tracking-widest border border-border text-text-dim hover:text-text hover:border-text-dim transition-all duration-200 rounded disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {state === 'sending' && (
              <Loader2 size={13} className="animate-spin" />
            )}
            {state === 'sent' && <Check size={13} />}
            {state === 'sending'
              ? t('sendingLabel')
              : state === 'sent'
                ? t('sentLabel')
                : t('submitLabel')}
            {state === 'idle' && (
              <span className="ml-1 opacity-60">→</span>
            )}
          </button>

          {state === 'error' && (
            <p className="text-[12px] text-text-dim text-center">{errorMsg}</p>
          )}
        </form>

        {/* Fallback buttons */}
        <div className="mt-10">
          <p className="font-mono text-[11px] text-text-low uppercase tracking-widest mb-4">
            {t('orWrite')}
          </p>
          <div className="flex gap-3 flex-wrap">
            <a
              href="https://t.me/alexvdovych"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-2.5 px-5 font-mono text-[11px] uppercase tracking-widest border border-border text-text-dim hover:text-text hover:border-text-dim transition-all duration-200 rounded"
            >
              <Send size={12} strokeWidth={1.5} />
              {t('telegramBtn')}
            </a>
            <a
              href="https://wa.me/48791576004"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-2.5 px-5 font-mono text-[11px] uppercase tracking-widest border border-border text-text-dim hover:text-text hover:border-text-dim transition-all duration-200 rounded"
            >
              <WhatsAppIcon size={12} />
              {t('whatsappBtn')}
            </a>
            <a
              href="mailto:uaolexander99@gmail.com"
              className="flex items-center gap-2 py-2.5 px-5 font-mono text-[11px] uppercase tracking-widest border border-border text-text-dim hover:text-text hover:border-text-dim transition-all duration-200 rounded"
            >
              <Mail size={12} strokeWidth={1.5} />
              {t('emailBtn')}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
