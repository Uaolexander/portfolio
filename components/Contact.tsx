'use client';

import { useState, useRef, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

type FormState = 'idle' | 'sending' | 'sent' | 'error';

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Contact() {
  const t = useTranslations('contact');
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === 'sending') return;

    const data = new FormData(e.currentTarget);
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
    <section id="contact" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-[12px] text-accent uppercase tracking-[0.15em]">
              {t('label')}
            </span>
            <h2
              className="font-sans font-bold text-text mt-3 mb-4 leading-tight"
              style={{ fontSize: 'clamp(28px, 3.5vw, 42px)' }}
            >
              {t('heading')}
            </h2>
            <p className="text-text-dim text-[15px] leading-relaxed mb-10">
              {t('description')}
            </p>

            <div className="space-y-4">
              <p className="font-mono text-[11px] text-text-low uppercase tracking-widest mb-4">
                {t('orWrite')}
              </p>
              <a
                href="https://t.me/alexvdovych"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-accent/40 transition-all duration-200 group"
                style={{ background: 'rgba(13,13,28,0.8)' }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-accent"
                  style={{ background: 'rgba(91,127,255,0.1)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </div>
                <div>
                  <div className="text-text text-[13px] font-medium group-hover:text-accent transition-colors duration-200">{t('telegramBtn')}</div>
                  <div className="text-text-low text-[12px]">@alexvdovych</div>
                </div>
              </a>

              <a
                href="https://wa.me/48791576004"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-accent/40 transition-all duration-200 group"
                style={{ background: 'rgba(13,13,28,0.8)' }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-accent"
                  style={{ background: 'rgba(91,127,255,0.1)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-text text-[13px] font-medium group-hover:text-accent transition-colors duration-200">{t('whatsappBtn')}</div>
                  <div className="text-text-low text-[12px]">+48 791 576 004</div>
                </div>
              </a>

              <a
                href="mailto:uaolexander99@gmail.com"
                className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-accent/40 transition-all duration-200 group"
                style={{ background: 'rgba(13,13,28,0.8)' }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-accent"
                  style={{ background: 'rgba(91,127,255,0.1)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <div className="text-text text-[13px] font-medium group-hover:text-accent transition-colors duration-200">{t('emailBtn')}</div>
                  <div className="text-text-low text-[12px]">uaolexander99@gmail.com</div>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div
              className="rounded-2xl p-6 sm:p-8 border border-border"
              style={{ background: 'rgba(13,13,28,0.8)' }}
            >
              <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Honeypot */}
                <div style={{ position: 'absolute', overflow: 'hidden', clip: 'rect(0 0 0 0)', height: '1px', width: '1px', margin: '-1px' }} aria-hidden="true">
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                <div>
                  <label htmlFor="contact-name" className="block text-[11px] font-mono text-text-low uppercase tracking-widest mb-2">
                    {t('nameLabel')} *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder={t('namePlaceholder')}
                    autoComplete="name"
                    className="form-input"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-[11px] font-mono text-text-low uppercase tracking-widest mb-2">
                    {t('emailLabel')}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    autoComplete="email"
                    className="form-input"
                  />
                </div>

                <div>
                  <label htmlFor="contact-telegram" className="block text-[11px] font-mono text-text-low uppercase tracking-widest mb-2">
                    {t('telegramLabel')}
                  </label>
                  <input
                    id="contact-telegram"
                    name="telegram"
                    type="text"
                    placeholder={t('telegramPlaceholder')}
                    className="form-input"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-[11px] font-mono text-text-low uppercase tracking-widest mb-2">
                    {t('messageLabel')} *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    minLength={10}
                    maxLength={2000}
                    rows={4}
                    placeholder={t('messagePlaceholder')}
                    className="form-input resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={state === 'sending' || state === 'sent'}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-white text-[14px] font-medium rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: state === 'sent' ? 'rgba(34,197,94,0.2)' : 'linear-gradient(135deg, #5b7fff, #7c5fff)',
                    border: state === 'sent' ? '1px solid rgba(34,197,94,0.3)' : 'none',
                    color: state === 'sent' ? '#4ade80' : '#fff',
                    boxShadow: state !== 'sent' ? '0 0 24px rgba(91,127,255,0.3)' : 'none',
                  }}
                >
                  {state === 'sending' ? (
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeOpacity="0.25" /><path d="M12 2a10 10 0 0 1 10 10" /></svg>
                  ) : state === 'sent' ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  ) : (
                    <SendIcon />
                  )}
                  {state === 'sending' ? t('sendingLabel') : state === 'sent' ? t('sentLabel') : t('submitLabel')}
                </button>

                {state === 'error' && (
                  <p className="text-[13px] text-red-400 text-center">{errorMsg}</p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
