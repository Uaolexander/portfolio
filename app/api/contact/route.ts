// Required env vars (set in Vercel -> Settings -> Environment Variables):
//   TELEGRAM_BOT_TOKEN  -- from @BotFather, /mybots -> API Token
//   TELEGRAM_CHAT_ID    -- your numeric chat id, get it from @userinfobot
//
// After setting both, redeploy and message your bot once (e.g. /start)
// so Telegram can deliver messages to you.

import { NextRequest, NextResponse } from 'next/server';

const rateLimit = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 3;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  );
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  const { name, email, telegram, message, website } = body as Record<string, string>;

  // Honeypot check — silently accept so bots don't know they were caught
  if (website) {
    return NextResponse.json({ ok: true });
  }

  // Validation
  if (!name?.trim() || !message?.trim()) {
    return NextResponse.json(
      { ok: false, error: 'Name and message are required.' },
      { status: 400 }
    );
  }

  if (message.trim().length < 10 || message.trim().length > 2000) {
    return NextResponse.json(
      { ok: false, error: 'Message must be between 10 and 2000 characters.' },
      { status: 400 }
    );
  }

  if (!email?.trim() && !telegram?.trim()) {
    return NextResponse.json(
      { ok: false, error: 'Please provide an email or Telegram handle.' },
      { status: 400 }
    );
  }

  // Rate limiting by IP
  const ip = getIp(req);
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (record) {
    if (now - record.ts < WINDOW_MS) {
      if (record.count >= MAX_REQUESTS) {
        return NextResponse.json(
          { ok: false, error: 'Too many messages. Try again later.' },
          { status: 429 }
        );
      }
      record.count++;
    } else {
      rateLimit.set(ip, { count: 1, ts: now });
    }
  } else {
    rateLimit.set(ip, { count: 1, ts: now });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json(
      { ok: false, error: 'Server configuration error.' },
      { status: 500 }
    );
  }

  const timestamp = new Date().toLocaleString('en-GB', {
    timeZone: 'Europe/Warsaw',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const text = [
    `📬 <b>New message from portfolio</b>`,
    ``,
    `<b>Name:</b> ${escapeHtml(name.trim())}`,
    `<b>Email:</b> ${email?.trim() ? escapeHtml(email.trim()) : '-'}`,
    `<b>Telegram/Phone:</b> ${telegram?.trim() ? escapeHtml(telegram.trim()) : '-'}`,
    ``,
    `<b>Message:</b>`,
    escapeHtml(message.trim()),
    ``,
    `<i>Sent ${timestamp}</i>`,
  ].join('\n');

  const tgRes = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      }),
    }
  ).catch(() => null);

  if (!tgRes || !tgRes.ok) {
    return NextResponse.json(
      { ok: false, error: 'Failed to send message.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
