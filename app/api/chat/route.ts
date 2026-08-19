import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const SYSTEM_PROMPT = `You are the personal assistant bot for a freelance web developer and bot creator based in Poznan, Poland.

== IDENTITY ==
Your client's name depends on the user's language:
- If the user writes in UKRAINIAN or RUSSIAN: his name is "Олександр", refer to him as "Олександр"
- For ALL other languages (English, Polish, Spanish, etc.): his name is "Alex", refer to him as "Alex"
You are his virtual assistant. You speak on his behalf but are not him personally.

== ABOUT HIM ==
- Full name: Oleksandr Vdovychenko (Alex / Олександр)
- Location: Poznan, Poland
- Speaks 5 languages: Ukrainian, English, Polish, Russian, Spanish
- Lived in 7 countries
- 25+ projects completed
- Currently available for new projects
- Website: alexvdovych.com

== SERVICES ==
1. Websites & landing pages — Next.js, React, TypeScript, Tailwind CSS. Fast, modern, mobile-first. From simple 1-page sites to full platforms.
2. Web applications — full-stack apps with auth, dashboards, admin panels, payments (Stripe), CMS, databases.
3. Telegram bots — FAQ bots, AI assistants, automation, notification systems, scrapers, schedulers, real estate parsers, image bots.
4. WhatsApp bots — automated responses, lead collection, notifications.
5. API integrations — Telegram, Google Sheets, Stripe, OpenAI, webhooks, REST APIs.
6. Business automation — scheduled posts, data pipelines, form-to-Telegram/Sheets, replacing manual work.
7. Web scraping & monitoring — competitor tracking, price monitoring, data extraction.
8. E-commerce — online shops, product catalogs, order management.
9. Admin dashboards & CRM — custom internal tools.
10. Consulting — code review, architecture advice, tech stack selection.
11. Support & maintenance — updating, fixing, improving existing sites or bots.

== PORTFOLIO ==
- Avenue Estate (avenuest.com) — website for a Poznan real estate agency, trilingual PL/UA/EN, listings sync themselves from the agency's Telegram channel every 3 hours
- Here There Bread (heretherebread.com) — site for a family sourdough starter, activation guide behind the QR code on the jar
- English Nerd (englishnerd.cc) — free English learning platform, 100+ lessons
- Bella Vita Tours (bellavitatours.it) — tour guide booking site
- Fan-Bud (fan-bud.com) — construction company site, bilingual PL/UA
- LVL Speaking Club (levelspeaking.club) — speaking club with Telegram + Sheets integration
- PullVidBot (t.me/PullVidBot) — Telegram bot that downloads video from TikTok, YouTube, Instagram, Twitter
- CirclifyBot (t.me/CirclifyBot) — Telegram bot that turns any video into a round video note
- Private bots: real estate parser, image formatter, competitor monitor, FAQ bot, AI shop assistant

== PRICING ==
NEVER give specific prices. Always say the cost depends on scope. Invite them to share their idea — Alex will send a quote quickly.

== CONTACT ==
- Telegram: @alexvdovych
- Instagram: @alexvdovych
- WhatsApp: +48 791 576 004

== LEAD COLLECTION (CRITICAL) ==
When ANY user shows interest in hiring, getting a quote, ordering a site, bot, or automation:

STEP 1 — Express interest and ask for their CONTACT (Telegram / WhatsApp / phone / email). This is the ONLY required piece of information.

STEP 2 — As soon as you have ANY contact info, call send_to_telegram immediately. Do NOT keep asking questions before sending. Fill in every field with whatever you already know from the conversation; use "Not mentioned" for anything not discussed.

STEP 3 — After sending, you may naturally continue the conversation and ask 1-2 follow-up questions about their project if it feels appropriate. But never gatekeep the notification behind more questions.

IMPORTANT: Fill the tool fields with MAXIMUM detail from the entire conversation:
- "description": write a detailed multi-sentence summary of everything they said about what they need
- "extra": include EVERYTHING: their business, industry, tone, any details they mentioned, what triggered their interest
- All other fields: fill from the conversation, write "Not mentioned" only if truly absent

For JOB OFFERS / partnership proposals:
- Ask for contact, then call send_to_telegram with type "job_offer" as soon as you have it
- Fill in company, role, stack, remote/on-site from whatever was shared

== COMMUNICATION STYLE ==
- Friendly, natural, concise — like a helpful human assistant
- Always match the user's language exactly
- Keep replies to 1-3 sentences unless explaining something
- Be genuinely curious about their project
- If asked something unrelated to Alex's work, politely redirect
- Never make up facts, prices, or timelines`;

async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  });
}

const tools: OpenAI.Chat.ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'send_to_telegram',
      description: 'Send a lead or job offer to Alex via Telegram. Call this as soon as you have the user\'s name + contact + basic project idea. Include maximum detail in every field.',
      parameters: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['lead', 'job_offer'],
            description: 'lead = potential client, job_offer = employment or partnership proposal',
          },
          name: {
            type: 'string',
            description: 'User\'s name or username. "Unknown" if not provided.',
          },
          contact: {
            type: 'string',
            description: 'Their Telegram, WhatsApp, phone, or email. "Not provided" if not given.',
          },
          language: {
            type: 'string',
            description: 'Language the user wrote in (e.g. "English", "Ukrainian", "Polish")',
          },
          project_type: {
            type: 'string',
            description: 'Type of project: website / landing page / Telegram bot / web app / automation / e-commerce / consulting / other',
          },
          description: {
            type: 'string',
            description: 'Detailed description of what they need. Include features, integrations, purpose, audience. Write multiple sentences — more detail is better.',
          },
          business: {
            type: 'string',
            description: 'Their business type, industry, niche, or company name. "Not mentioned" if unknown.',
          },
          budget: {
            type: 'string',
            description: 'Budget range if mentioned (e.g. "~500 EUR", "small budget", "flexible"). "Not mentioned" if not discussed.',
          },
          deadline: {
            type: 'string',
            description: 'Desired launch date or urgency (e.g. "end of May", "ASAP", "no rush"). "Not mentioned" if not discussed.',
          },
          extra: {
            type: 'string',
            description: 'Everything else: existing site/branding, examples they liked, special requirements, tone of the conversation, anything notable. Leave empty string if nothing extra.',
          },
        },
        required: ['type', 'contact'],
      },
    },
  },
];

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json() as { messages: ChatMessage[] };

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'No messages' }, { status: 400 });
    }

    const last = messages[messages.length - 1];
    if (!last?.content || last.content.trim().length === 0) {
      return NextResponse.json({ error: 'Empty message' }, { status: 400 });
    }

    if (last.content.length > 1000) {
      return NextResponse.json({ error: 'Message too long' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'AI not configured' }, { status: 503 });
    }

    const client = new OpenAI({ apiKey });

    const apiMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.slice(-12),
    ];

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: apiMessages,
      tools,
      tool_choice: 'auto',
      max_tokens: 400,
      temperature: 0.75,
    });

    const choice = completion.choices[0];

    if (choice.message.tool_calls?.length) {
      const toolCall = choice.message.tool_calls[0] as OpenAI.Chat.ChatCompletionMessageToolCall;
      const fn = (toolCall as { function: { arguments: string } }).function;
      const args = JSON.parse(fn.arguments) as {
        type: string;
        name: string;
        contact: string;
        language: string;
        project_type: string;
        description: string;
        business?: string;
        budget?: string;
        deadline?: string;
        extra?: string;
      };

      const emoji = args.type === 'job_offer' ? '💼' : '🆕';
      const label = args.type === 'job_offer' ? 'Пропозиція роботи' : 'Новий лід';

      const lines = [
        `${emoji} <b>${label} з сайту</b>`,
        '',
        `👤 <b>Ім'я:</b> ${args.name}`,
        `📱 <b>Контакт:</b> ${args.contact}`,
        `🌐 <b>Мова:</b> ${args.language}`,
        `🔧 <b>Тип проєкту:</b> ${args.project_type}`,
        '',
        `📝 <b>Опис:</b>\n${args.description}`,
      ];

      if (args.business && args.business !== 'Not mentioned') {
        lines.push(`\n🏢 <b>Бізнес/ніша:</b> ${args.business}`);
      }
      if (args.budget && args.budget !== 'Not mentioned') {
        lines.push(`💰 <b>Бюджет:</b> ${args.budget}`);
      }
      if (args.deadline && args.deadline !== 'Not mentioned') {
        lines.push(`📅 <b>Дедлайн:</b> ${args.deadline}`);
      }
      if (args.extra && args.extra.trim()) {
        lines.push(`\n💬 <b>Додатково:</b>\n${args.extra}`);
      }

      await sendTelegramMessage(lines.join('\n'));

      const followUp = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          ...apiMessages,
          choice.message,
          {
            role: 'tool' as const,
            tool_call_id: (toolCall as { id: string }).id,
            content: 'Message sent successfully.',
          },
        ],
        max_tokens: 200,
        temperature: 0.75,
      });

      const reply = followUp.choices[0]?.message?.content?.trim() ?? '';
      return NextResponse.json({ reply });
    }

    const reply = choice.message.content?.trim() ?? '';
    return NextResponse.json({ reply });
  } catch (err) {
    console.error('Chat API error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
