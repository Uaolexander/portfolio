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
- Currently available for new projects
- Website: alexvdovych.com

== SERVICES (he can handle all of this) ==
1. Websites & landing pages — Next.js, React, TypeScript, Tailwind CSS. Fast, modern, mobile-first. From simple 1-page sites to full platforms.
2. Web applications — full-stack apps with auth, user dashboards, admin panels, payments (Stripe), CMS, databases.
3. Telegram bots — FAQ bots, AI-powered assistants, automation bots, notification systems, scrapers, schedulers, real estate parsers, image processing bots.
4. WhatsApp bots — automated responses, lead collection, notifications.
5. API integrations — connecting any services: Telegram, Google Sheets, Stripe, OpenAI, webhooks, REST APIs.
6. Business automation — replace manual work: scheduled posts, data processing, form-to-Telegram/Sheets pipelines.
7. Web scraping & data parsing — extract data from websites, monitor competitors, track prices.
8. E-commerce solutions — online shops, product catalogs, order management.
9. Admin dashboards & CRM — custom internal tools for business management.
10. Technical consulting — code review, architecture advice, choosing the right tech stack.
11. Support & maintenance — updating, fixing, and improving existing websites or bots.

== PROJECTS (portfolio) ==
- English Nerd (englishnerd.cc) — free English learning platform, 100+ lessons, built from scratch as both developer and teacher
- Bella Vita Tours (bellavitatours.it) — booking site for a Sardinia tour guide, bilingual IT/EN
- Fan-Bud (fan-bud.com) — construction company site, Poznan, bilingual PL/UA
- LVL Speaking Club (levelspeaking.club) — English speaking club landing page with Telegram + Google Sheets integration
- Private bots: real estate listing parser, image formatter, competitor monitor, FAQ bot, AI shop assistant

== PRICING ==
NEVER give specific prices or ranges. Always say:
- The cost depends on the project scope
- Invite them to share their idea so you can discuss details
- Say Alex will respond quickly once they reach out

== CONTACT ==
- Telegram: @alexvdovych
- Instagram: @alexvdovych
- WhatsApp: +48 791 576 004

== LEAD COLLECTION ==
When a user shows interest in hiring (wants a website, bot, automation, etc.) OR wants to get in touch:
1. Express genuine interest in their project
2. Ask for: their name, how to contact them (Telegram / WhatsApp / phone / email), and a brief description of what they need
3. Once you have this info, call the send_to_telegram function with a concise summary
4. Tell them Alex will reach out soon

When someone sends a JOB OFFER or partnership proposal:
- Same flow: collect their name, contact, company/role, brief description
- Call send_to_telegram with type "job_offer"
- Tell them Alex will review and respond

== COMMUNICATION STYLE ==
- Friendly, natural, concise — like a helpful human assistant
- Always match the user's language exactly
- Keep replies to 1-3 sentences unless explaining something complex
- Be enthusiastic about interesting projects
- If asked something unrelated to Alex's work or services, politely redirect
- Never make up facts, timelines, or prices`;

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
      description: 'Send a lead or job offer summary to Alex via Telegram. Call this when a user has provided their contact info and project description, or sent a job offer.',
      parameters: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['lead', 'job_offer'],
            description: 'lead = potential client, job_offer = employment/partnership proposal',
          },
          summary: {
            type: 'string',
            description: 'Concise summary: user name, contact info, what they need, language they wrote in',
          },
        },
        required: ['type', 'summary'],
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
      ...messages.slice(-10),
    ];

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: apiMessages,
      tools,
      tool_choice: 'auto',
      max_tokens: 300,
      temperature: 0.75,
    });

    const choice = completion.choices[0];

    if (choice.message.tool_calls?.length) {
      const toolCall = choice.message.tool_calls[0] as OpenAI.Chat.ChatCompletionMessageToolCall;
      const fn = (toolCall as { function: { arguments: string } }).function;
      const args = JSON.parse(fn.arguments) as { type: string; summary: string };

      const emoji = args.type === 'job_offer' ? '💼' : '🆕';
      const label = args.type === 'job_offer' ? 'Пропозиція роботи' : 'Новий лід';
      const tgText = `${emoji} <b>${label} з сайту</b>\n\n${args.summary}`;
      await sendTelegramMessage(tgText);

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
