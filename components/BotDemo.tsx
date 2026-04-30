'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

type Message = { role: 'user' | 'bot'; text: string; id: number };

export function BotDemo() {
  const t = useTranslations('botDemo');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: '', id: 0 },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);
  const welcomeSet = useRef(false);

  useEffect(() => {
    if (!welcomeSet.current) {
      setMessages([{ role: 'bot', text: t('welcomeMsg'), id: 0 }]);
      welcomeSet.current = true;
    }
  }, [t]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  async function send() {
    const text = input.trim();
    if (!text || typing) return;

    const userMsg: Message = { role: 'user', text, id: idRef.current++ };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      const reply = data.reply || t('responseDefault');
      setMessages((prev) => [...prev, { role: 'bot', text: reply, id: idRef.current++ }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'bot', text: t('responseDefault'), id: idRef.current++ }]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: text */}
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
            <p className="text-text-dim text-[15px] leading-relaxed mb-8">
              {t('subheading')}
            </p>

            {/* Feature bullets */}
            {[
              'FAQ automation',
              'AI-powered answers',
              'Telegram integration',
            ].map((feat) => (
              <div key={feat} className="flex items-center gap-3 mb-3">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(91,127,255,0.15)' }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5b7fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="text-text-dim text-[14px]">{feat}</span>
              </div>
            ))}
          </motion.div>

          {/* Right: chat widget */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div
              className="rounded-2xl border border-border overflow-hidden"
              style={{
                background: 'rgba(13,13,28,0.95)',
                boxShadow: '0 0 60px rgba(91,127,255,0.08), 0 24px 80px rgba(0,0,0,0.4)',
              }}
            >
              {/* Chat header */}
              <div
                className="flex items-center gap-3 px-5 py-4 border-b border-border"
                style={{ background: 'rgba(19,19,37,0.9)' }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #5b7fff, #a855f7)' }}
                >
                  A
                </div>
                <div>
                  <div className="text-text text-[13px] font-medium">Alex&apos;s Bot</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span className="text-text-dim text-[11px]">Online</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-[240px] overflow-y-auto p-4 space-y-3 flex flex-col">
                {messages.map((msg) => (
                  <AnimatePresence key={msg.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className="max-w-[80%] px-4 py-2.5 text-[13px] leading-relaxed"
                        style={
                          msg.role === 'user'
                            ? {
                                background: 'linear-gradient(135deg, #5b7fff, #7c5fff)',
                                color: '#fff',
                                borderRadius: '18px 18px 4px 18px',
                              }
                            : {
                                background: 'rgba(26,26,53,0.8)',
                                color: '#8892b0',
                                border: '1px solid #1a1a35',
                                borderRadius: '18px 18px 18px 4px',
                              }
                        }
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                ))}

                {typing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div
                      className="flex items-center gap-1 px-4 py-3"
                      style={{
                        background: 'rgba(26,26,53,0.8)',
                        border: '1px solid #1a1a35',
                        borderRadius: '18px 18px 18px 4px',
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-text-low"
                          style={{
                            animation: 'bounce 1s infinite',
                            animationDelay: `${i * 0.2}s`,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                <div ref={endRef} />
              </div>

              {/* Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-t border-border">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                  placeholder={t('placeholder')}
                  className="flex-1 bg-transparent text-text text-[13px] placeholder-text-low outline-none"
                  style={{ color: '#eef0ff' }}
                />
                <button
                  onClick={send}
                  disabled={!input.trim() || typing}
                  className="flex-shrink-0 px-4 py-2 rounded-lg text-[12px] font-medium text-white transition-all duration-200 disabled:opacity-40"
                  style={{ background: 'linear-gradient(135deg, #5b7fff, #7c5fff)' }}
                >
                  {t('send')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
