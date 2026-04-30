export type Project = {
  id: string;
  title: { en: string; uk: string };
  oneLiner: { en: string; uk: string };
  description: { en: string; uk: string };
  tech: string[];
  links?: { label: string; href: string }[];
  image: string | null;
  status: 'live' | 'in-progress' | 'private';
  year: number;
};

export const projects: Project[] = [
  {
    id: 'english-nerd',
    title: { en: 'English Nerd', uk: 'English Nerd' },
    oneLiner: {
      en: 'A free English learning platform I built and teach on.',
      uk: 'Безкоштовна платформа для вивчення англійської, яку я зробив і на якій сам викладаю.',
    },
    description: {
      en: '100+ grammar lessons across A1 to C1, vocabulary by level, listening with audio and transcripts, reading exercises, and three placement tests. Pro tier with progress dashboard and certificates. I built it from zero, content and code.',
      uk: 'Понад 100 уроків граматики від A1 до C1, словниковий запас по рівнях, аудіювання з транскриптами, тексти на читання і три тести на рівень. Pro-підписка з прогресом і сертифікатами. Робив усе сам, від контенту до коду.',
    },
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Stripe'],
    links: [{ label: 'Live', href: 'https://englishnerd.cc' }],
    image: '/images/english-nerd.png',
    status: 'live',
    year: 2026,
  },
  {
    id: 'bella-vita',
    title: { en: 'Bella Vita Tours', uk: 'Bella Vita Tours' },
    oneLiner: {
      en: 'Booking site for a Sardinia tour guide.',
      uk: 'Сайт бронювання для гіда на Сардинії.',
    },
    description: {
      en: "A site for a private tour guide on Sardinia. Bilingual UK/EN, gallery, booking form, reviews. Booking requests go straight to the owner as a Telegram message via a bot. Built end-to-end from the client's brief.",
      uk: 'Сайт для приватного гіда на Сардинії. Дві мови, галерея, форма бронювання, відгуки. Заявки з форми приходять власнику миттєво в Telegram через бота. Зробив повністю по брифу клієнта.',
    },
    tech: ['HTML', 'CSS', 'JavaScript'],
    links: [{ label: 'Live', href: 'https://www.bellavitatours.it' }],
    image: '/images/bella-vita.png',
    status: 'live',
    year: 2025,
  },
  {
    id: 'fan-bud',
    title: { en: 'Fan-Bud', uk: 'Fan-Bud' },
    oneLiner: {
      en: 'Website for a construction company in Poznan.',
      uk: 'Сайт для будівельної компанії в Познані.',
    },
    description: {
      en: 'A site for a Poznan-based construction company offering concrete work, masonry, and demolitions. Services overview, company credentials (10+ years, 150+ projects, ISO certified), quote request form, careers section, and contact. Bilingual PL/UA.',
      uk: 'Сайт для будівельної компанії з Познані: бетонні роботи, мулярство, знос. Опис послуг, дані компанії (10+ років, 150+ об\'єктів, ISO), форма заявки, розділ вакансій і контакти. Двома мовами — польською та українською.',
    },
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    links: [{ label: 'Live', href: 'https://fan-bud.com' }],
    image: '/images/fan-bud.png',
    status: 'live',
    year: 2025,
  },
  {
    id: 'lvl-speaking-club',
    title: { en: 'LVL Speaking Club', uk: 'LVL Speaking Club' },
    oneLiner: {
      en: 'Landing site for an English speaking club in Poland.',
      uk: 'Сайт для клубу розмовної англійської в Польщі.',
    },
    description: {
      en: 'A site for a weekly English speaking club in Poznan. Session schedule, how-it-works section, reviews, FAQ, and a join form. Bilingual PL/EN. Registrations go straight to the organiser as a Telegram notification and are saved to Google Sheets automatically.',
      uk: 'Сайт для щотижневого клубу розмовної англійської в Познані. Розклад сесій, як це працює, відгуки, FAQ і форма запису. Двома мовами — польською та англійською. Реєстрації автоматично надходять організатору в Telegram і зберігаються в Google Sheets.',
    },
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Telegram API', 'Google Sheets API'],
    links: [{ label: 'Live', href: 'https://levelspeaking.club' }],
    image: '/images/lvl-speaking-club.png',
    status: 'live',
    year: 2025,
  },
  {
    id: 'listing-bot',
    title: {
      en: 'Listing-to-Post bot',
      uk: 'Бот-парсер оголошень для ріелторів',
    },
    oneLiner: {
      en: 'A Telegram bot that turns property links into ready-to-send listing cards for real estate agents.',
      uk: 'Telegram-бот, який перетворює посилання на квартири в готові пости для ріелторів.',
    },
    description: {
      en: 'Real estate agents were spending an hour per listing on copy-paste: pulling photos, rewriting the description, formatting it for Telegram. The bot does it in seconds. You drop a link, it scrapes the listing, picks the right photos, and posts a clean card with description and price. Built for one agency, runs in production.',
      uk: 'Ріелтори витрачали по годині на одну квартиру: скопіювати фото, переписати опис, відформатувати під Telegram. Бот робить це за секунду. Кидаєш посилання, він парсить сторінку, бере потрібні фото і публікує охайну картку з описом і ціною. Зроблений для однієї агенції, працює в проді.',
    },
    tech: ['Python', 'aiogram', 'BeautifulSoup', 'OpenAI API'],
    links: [],
    image: '/images/realestate-bot.png',
    status: 'private',
    year: 2025,
  },
  {
    id: 'image-bot',
    title: {
      en: 'Image-formatting bot',
      uk: 'Бот для обробки зображень',
    },
    oneLiner: {
      en: 'A Telegram bot that resizes and formats images on the fly.',
      uk: 'Telegram-бот, який ресайзить і форматує картинки на льоту.',
    },
    description: {
      en: 'Send it an image, get back a properly sized version for whatever platform you need. Built to save a small content team an hour a day on busywork.',
      uk: 'Надсилаєш картинку, отримуєш правильно підготовлену версію під потрібну платформу. Зроблений, щоб маленька контент-команда не витрачала годину в день на ресайз.',
    },
    tech: ['Python', 'aiogram', 'Pillow'],
    links: [],
    image: '/images/image-bot.png',
    status: 'private',
    year: 2025,
  },
  {
    id: 'autoad-bot',
    title: {
      en: 'Auto-ad poster',
      uk: 'Бот для авторозсилки реклами',
    },
    oneLiner: {
      en: 'A bot that posts ads to Telegram chats on a schedule.',
      uk: 'Бот, який публікує рекламу в Telegram-чатах за розкладом.',
    },
    description: {
      en: "From my own account into the chats I'm a member of, with image and text, on a configurable schedule. Replaces the part of my day that used to be 'remember to post in the marketing chats'.",
      uk: "Постить з мого акаунту в чати, де я є, з картинкою і текстом, за налаштованим розкладом. Замінив той шматок дня, де я постійно забував кинути рекламу в маркетингові чати.",
    },
    tech: ['Python', 'Telethon'],
    links: [],
    image: '/images/autoad-bot.png',
    status: 'private',
    year: 2025,
  },
  {
    id: 'monitor-bot',
    title: {
      en: 'Competitor monitor bot',
      uk: 'Бот моніторингу конкурентів',
    },
    oneLiner: {
      en: 'Watches competitors\' sites, Telegram channels, and Instagram accounts for new posts.',
      uk: 'Стежить за сайтами, Telegram-каналами та Instagram конкурентів і сповіщає про нові публікації.',
    },
    description: {
      en: 'An extension of the real estate listing parser, but for competitive intelligence. Point it at a competitor\'s site, Telegram channel, or Instagram account. When something new appears — a post, a promotion, a price change — it sends you a Telegram message. Good for any business that wants to know what the competition is doing without checking manually every day.',
      uk: 'Розширення парсера нерухомості, але для моніторингу конкурентів. Вказуєш на сайт, Telegram-канал або Instagram конкурента. Нова публікація, нова акція, новий пост — і ти отримуєш повідомлення в Telegram. Більше не треба щодня перевіряти руками.',
    },
    tech: ['Python', 'aiogram', 'BeautifulSoup', 'instagrapi'],
    links: [],
    image: '/images/monitor-bot.png',
    status: 'private',
    year: 2025,
  },
  {
    id: 'faq-bot',
    title: {
      en: 'FAQ bot for business',
      uk: 'FAQ-бот для бізнесу',
    },
    oneLiner: {
      en: 'Upload a knowledge base, and the bot answers your customers in Telegram from it.',
      uk: 'Завантажуєш базу знань, і бот відповідає клієнтам у Telegram з цієї бази.',
    },
    description: {
      en: 'You give it a document, a website, or a list of questions and answers. The bot reads it all and handles incoming questions in Telegram. No more answering the same ten questions manually every day. Works for shops, service businesses, clinics, anyone who gets repetitive questions from customers.',
      uk: 'Даєш йому документ, сайт або список питань і відповідей. Бот читає все це і обробляє вхідні питання в Telegram. Більше не треба вручну відповідати на одні й ті самі десять питань щодня. Підходить для магазинів, сервісних бізнесів, клінік — всіх, хто отримує типові питання від клієнтів.',
    },
    tech: ['Python', 'aiogram', 'OpenAI API'],
    links: [],
    image: '/images/faq-bot.png',
    status: 'private',
    year: 2025,
  },
  {
    id: 'ai-assistant-bot',
    title: {
      en: 'AI shop assistant bot',
      uk: 'AI-асистент для магазину',
    },
    oneLiner: {
      en: 'An AI bot trained on your store\'s info that answers customers in Telegram like a real person.',
      uk: 'AI-бот, навчений на інформації про ваш магазин, який відповідає клієнтам у Telegram як жива людина.',
    },
    description: {
      en: 'Connected to an AI and trained on everything about your store: catalog, prices, delivery terms, return policy, FAQ. A customer writes in Telegram — the bot answers immediately, in full, like someone on your team who actually knows the product. Not a script. Not a decision tree. It understands the question and gives a real answer.',
      uk: 'Підключений до ШІ і навчений на всій інформації про ваш магазин: каталог, ціни, умови доставки, повернення, часті питання. Клієнт пише в Telegram — бот відповідає одразу, повно, як людина з команди, яка знає товар. Не скрипт. Не дерево рішень. Розуміє питання і дає реальну відповідь.',
    },
    tech: ['Python', 'aiogram', 'OpenAI API', 'RAG'],
    links: [],
    image: '/images/ai-assistant-bot.png',
    status: 'private',
    year: 2025,
  },
];
