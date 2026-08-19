export type Project = {
  id: string;
  title: { en: string; ua: string; pl: string };
  oneLiner: { en: string; ua: string; pl: string };
  description: { en: string; ua: string; pl: string };
  tech: string[];
  links?: { label: string; href: string }[];
  image: string | null;
  imagePosition?: 'top' | 'center';
  status: 'live' | 'in-progress' | 'private';
  year: number;
};

export const projects: Project[] = [
  {
    id: 'avenue-estate',
    title: { en: 'Avenue Estate', ua: 'Avenue Estate', pl: 'Avenue Estate' },
    oneLiner: {
      en: 'Site for a real estate agency in Poznan, with listings that update themselves.',
      ua: 'Сайт агенції нерухомості в Познані, де оголошення оновлюються самі.',
      pl: 'Strona agencji nieruchomości w Poznaniu, w której oferty aktualizują się same.',
    },
    description: {
      en: 'The agency already posted its flats to a Telegram channel, so the site reads that channel every three hours and rebuilds itself. New listings appear without anyone touching the code and anything older than a month drops off. Requests from the contact form go to the owner as an email and land in a Google Sheet at the same time. Three languages, PL, UA and EN, written by hand without an i18n library. The globe in the section on property abroad is not a map widget either: the continent outlines are projected in Node during the build, so the browser gets finished geometry and calls no one else.',
      ua: 'Агенція і так публікувала квартири в Telegram-каналі, тому сайт читає цей канал кожні три години і перезбирається сам. Нові оголошення зʼявляються без жодного дотику до коду, а старші за місяць зникають. Заявки з форми одночасно йдуть власниці на пошту і лягають рядком у Google-таблицю. Три мови, PL, UA та EN, зроблені руками, без i18n-бібліотеки. Глобус у блоці про закордонну нерухомість теж не віджет: обриси материків прораховуються в Node під час збірки, тому браузер отримує готову геометрію і нікуди більше не звертається.',
      pl: 'Agencja i tak wrzucała mieszkania na kanał Telegram, więc strona czyta ten kanał co trzy godziny i przebudowuje się sama. Nowe oferty pojawiają się bez ruszania kodu, a starsze niż miesiąc znikają. Zgłoszenia z formularza trafiają jednocześnie na skrzynkę właścicielki i do arkusza Google. Trzy języki, PL, UA i EN, napisane ręcznie, bez biblioteki i18n. Globus w sekcji o nieruchomościach za granicą też nie jest widżetem: kontury kontynentów są liczone w Node podczas budowania, więc przeglądarka dostaje gotową geometrię i nie odpytuje nikogo więcej.',
    },
    tech: ['React', 'Vite', 'JavaScript', 'GitHub Actions', 'GitHub Pages'],
    links: [{ label: 'Live', href: 'http://avenuest.com' }],
    image: '/images/avenue-estate.jpg',
    status: 'live',
    year: 2026,
  },
  {
    id: 'here-there-bread',
    title: { en: 'Here There Bread', ua: 'Here There Bread', pl: 'Here There Bread' },
    oneLiner: {
      en: 'A site for a family sourdough starter, opened by the QR code on the jar.',
      ua: 'Сайт родинної закваски, який відкривається з QR-коду на банці.',
      pl: 'Strona rodzinnego zakwasu, otwierana kodem QR ze słoika.',
    },
    description: {
      en: 'A landing page and an activation guide for a sourdough starter sold in jars. The QR code printed on the label opens the guide: the activation film, recut from 4K down to a size a phone will actually load, and the full day by day feeding schedule. No stock photography and no framework. Every illustration is drawn parametrically in Python and inlined as SVG, so the engraved lines draw themselves in stroke by stroke.',
      ua: 'Лендінг і гайд активації для закваски, яку продають у банках. QR-код на етикетці відкриває гайд: відео активації, перезібране з 4K у розмір, який телефон реально завантажить, і повний графік підгодовування по днях. Жодного стокового фото і жодного фреймворку. Кожна ілюстрація намальована параметрично на Python і вбудована як SVG, тому гравіровані лінії малюють себе штрих за штрихом.',
      pl: 'Landing page i przewodnik aktywacji dla zakwasu sprzedawanego w słoikach. Kod QR na etykiecie otwiera przewodnik: film aktywacyjny, przycięty z 4K do rozmiaru, który telefon naprawdę wczyta, oraz pełny harmonogram dokarmiania dzień po dniu. Zero zdjęć stockowych i zero frameworka. Każda ilustracja jest rysowana parametrycznie w Pythonie i osadzona jako SVG, dzięki czemu grawerowane linie rysują się kreska po kresce.',
    },
    tech: ['HTML', 'CSS', 'JavaScript', 'Python', 'SVG'],
    links: [{ label: 'Live', href: 'https://heretherebread.com' }],
    image: '/images/here-there-bread.jpg',
    imagePosition: 'center',
    status: 'live',
    year: 2026,
  },
  {
    id: 'english-nerd',
    title: { en: 'English Nerd', ua: 'English Nerd', pl: 'English Nerd' },
    oneLiner: {
      en: 'A free English learning platform I built and teach on.',
      ua: 'Безкоштовна платформа для вивчення англійської, яку я зробив і на якій сам викладаю.',
      pl: 'Bezpłatna platforma do nauki angielskiego, którą zbudowałem i na której uczę.',
    },
    description: {
      en: '100+ grammar lessons across A1 to C1, vocabulary by level, listening with audio and transcripts, reading exercises, and three placement tests. Pro tier with progress dashboard and certificates. I built it from zero, content and code.',
      ua: 'Понад 100 уроків граматики від A1 до C1, словниковий запас по рівнях, аудіювання з транскриптами, тексти на читання і три тести на рівень. Pro-підписка з прогресом і сертифікатами. Робив усе сам, від контенту до коду.',
      pl: 'Ponad 100 lekcji gramatyki od A1 do C1, słownictwo według poziomów, słuchanie z nagraniami i transkrypcjami, ćwiczenia z czytania oraz trzy testy poziomujące. Plan Pro z dashboardem postępów i certyfikatami. Zbudowałem wszystko od zera, zarówno treści, jak i kod.',
    },
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Stripe'],
    links: [{ label: 'Live', href: 'https://englishnerd.cc' }],
    image: '/images/english-nerd.png',
    status: 'live',
    year: 2026,
  },
  {
    id: 'bella-vita',
    title: { en: 'Bella Vita Tours', ua: 'Bella Vita Tours', pl: 'Bella Vita Tours' },
    oneLiner: {
      en: 'Booking site for a Sardinia tour guide.',
      ua: 'Сайт бронювання для гіда на Сардинії.',
      pl: 'Strona rezerwacji dla przewodnika turystycznego na Sardynii.',
    },
    description: {
      en: "A site for a private tour guide on Sardinia. Bilingual UK/EN, gallery, booking form, reviews. Booking requests go straight to the owner as a Telegram message via a bot. Built end-to-end from the client's brief.",
      ua: 'Сайт для приватного гіда на Сардинії. Дві мови, галерея, форма бронювання, відгуки. Заявки з форми приходять власнику миттєво в Telegram через бота. Зробив повністю по брифу клієнта.',
      pl: 'Strona dla prywatnego przewodnika na Sardynii. Dwujęzyczna IT/EN, galeria, formularz rezerwacji, opinie. Zamówienia trafiają bezpośrednio do właściciela jako wiadomość Telegram przez bota. Zbudowana od A do Z na podstawie briefu klienta.',
    },
    tech: ['HTML', 'CSS', 'JavaScript'],
    links: [{ label: 'Live', href: 'https://www.bellavitatours.it' }],
    image: '/images/bella-vita.png',
    status: 'live',
    year: 2025,
  },
  {
    id: 'fan-bud',
    title: { en: 'Fan-Bud', ua: 'Fan-Bud', pl: 'Fan-Bud' },
    oneLiner: {
      en: 'Website for a construction company in Poznan.',
      ua: 'Сайт для будівельної компанії в Познані.',
      pl: 'Strona dla firmy budowlanej w Poznaniu.',
    },
    description: {
      en: 'A site for a Poznan-based construction company offering concrete work, masonry, and demolitions. Services overview, company credentials (10+ years, 150+ projects, ISO certified), quote request form, careers section, and contact. Bilingual PL/UA.',
      ua: 'Сайт для будівельної компанії з Познані: бетонні роботи, мулярство, знос. Опис послуг, дані компанії (10+ років, 150+ об\'єктів, ISO), форма заявки, розділ вакансій і контакти. Двома мовами — польською та українською.',
      pl: 'Strona dla firmy budowlanej z Poznania: prace betonowe, murarstwo, rozbiórki. Opis usług, dane firmy (10+ lat, 150+ projektów, certyfikat ISO), formularz zapytania, sekcja kariery i kontakt. Dwujęzyczna PL/UA.',
    },
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    links: [{ label: 'Live', href: 'https://fan-bud.com' }],
    image: '/images/fan-bud.png',
    status: 'live',
    year: 2025,
  },
  {
    id: 'lvl-speaking-club',
    title: { en: 'LVL Speaking Club', ua: 'LVL Speaking Club', pl: 'LVL Speaking Club' },
    oneLiner: {
      en: 'Landing site for an English speaking club in Poland.',
      ua: 'Сайт для клубу розмовної англійської в Польщі.',
      pl: 'Strona dla angielskiego klubu konwersacyjnego w Polsce.',
    },
    description: {
      en: 'A site for a weekly English speaking club in Poznan. Session schedule, how-it-works section, reviews, FAQ, and a join form. Bilingual PL/EN. Registrations go straight to the organiser as a Telegram notification and are saved to Google Sheets automatically.',
      ua: 'Сайт для щотижневого клубу розмовної англійської в Познані. Розклад сесій, як це працює, відгуки, FAQ і форма запису. Двома мовами — польською та англійською. Реєстрації автоматично надходять організатору в Telegram і зберігаються в Google Sheets.',
      pl: 'Strona dla tygodniowego klubu konwersacji po angielsku w Poznaniu. Harmonogram spotkań, jak to działa, opinie, FAQ i formularz zapisu. Dwujęzyczna PL/EN. Rejestracje trafiają automatycznie do organizatora przez Telegram i są zapisywane w Google Sheets.',
    },
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Telegram API', 'Google Sheets API'],
    links: [{ label: 'Live', href: 'https://levelspeaking.club' }],
    image: '/images/lvl-speaking-club.png',
    status: 'live',
    year: 2025,
  },
  {
    id: 'pullvid-bot',
    title: { en: 'PullVidBot', ua: 'PullVidBot', pl: 'PullVidBot' },
    oneLiner: {
      en: 'Telegram bot that downloads videos from TikTok, YouTube, Instagram, Twitter and more.',
      ua: 'Telegram-бот для завантаження відео з TikTok, YouTube, Instagram, Twitter та інших платформ.',
      pl: 'Bot Telegram do pobierania filmów z TikToka, YouTube, Instagrama, Twittera i innych platform.',
    },
    description: {
      en: 'Supports TikTok (no watermark), YouTube (4K/1080p/720p/MP3), Instagram Reels, Twitter/X, Facebook. Automatically converts VP9/AV1 to H.264 for Telegram compatibility and compresses files over 50 MB via FFmpeg. Quality selection via inline buttons, MP4 or MP3 output for all platforms. Access controlled by channel subscription check middleware. Multilingual: EN/UA/ES. Deployed on Railway as a worker process.',
      ua: 'TikTok (без водяного знаку), YouTube (4K/1080p/720p/MP3), Instagram Reels, Twitter/X, Facebook. Автоматична конвертація VP9/AV1 у H.264 для Telegram і стиснення файлів понад 50 МБ через FFmpeg. Вибір якості через інлайн-кнопки, MP4 або MP3 для всіх платформ. Middleware перевірки підписки на канал перед кожним запитом. Три мови: EN/UA/ES. Задеплоєно на Railway як worker-процес.',
      pl: 'TikTok (bez znaku wodnego), YouTube (4K/1080p/720p/MP3), Instagram Reels, Twitter/X, Facebook. Automatyczna konwersja VP9/AV1 do H.264 dla Telegrama i kompresja plików powyżej 50 MB przez FFmpeg. Wybór jakości przez przyciski inline, MP4 lub MP3 dla wszystkich platform. Middleware weryfikacji subskrypcji kanału przed każdym żądaniem. Trzy języki: EN/UA/ES. Wdrożony na Railway jako proces worker.',
    },
    tech: ['Python', 'aiogram 3', 'yt-dlp', 'FFmpeg', 'Railway'],
    links: [{ label: 'Telegram', href: 'https://t.me/PullVidBot' }],
    image: '/images/pullvidbot.png',
    imagePosition: 'center',
    status: 'live',
    year: 2025,
  },
  {
    id: 'circlify-bot',
    title: { en: 'CirclifyBot', ua: 'CirclifyBot', pl: 'CirclifyBot' },
    oneLiner: {
      en: 'Telegram bot that converts any video into a circular video note.',
      ua: 'Telegram-бот, який конвертує будь-яке відео у кругове повідомлення.',
      pl: 'Bot Telegram, który konwertuje dowolne wideo w okrągłą wiadomość wideo.',
    },
    description: {
      en: 'Handles files up to 2 GB via Telethon MTProto API, bypassing the Bot API 20 MB limit. FFmpeg pipeline with circular mask, resize, and dynamic bitrate compression to stay under 8 MB. Access control via channel subscription check. Multilingual (UA/EN/ES), SQLite stats database, video processing queue. Deployed on Railway via Docker with auto-restart.',
      ua: 'Підтримує файли до 2 ГБ через Telethon MTProto API, обходячи обмеження Bot API у 20 МБ. FFmpeg-пайплайн: кругова маска, ресайз, динамічне стиснення бітрейту до 8 МБ. Контроль доступу через підписку на канал. Три мови (UA/EN/ES), SQLite статистика, черга обробки відео. Задеплоєно на Railway через Docker з автоперезапуском.',
      pl: 'Obsługuje pliki do 2 GB przez Telethon MTProto API, omijając limit 20 MB Bot API. Potok FFmpeg z okrągłą maską, zmianą rozmiaru i dynamiczną kompresją bitrate do 8 MB. Kontrola dostępu przez subskrypcję kanału. Trzy języki (UA/EN/ES), statystyki SQLite, kolejka przetwarzania wideo. Wdrożony na Railway przez Docker z automatycznym restartem.',
    },
    tech: ['Python', 'aiogram 3', 'Telethon', 'FFmpeg', 'SQLite', 'Docker', 'Railway'],
    links: [{ label: 'Telegram', href: 'https://t.me/CirclifyBot' }],
    image: '/images/circlify-bot.png',
    imagePosition: 'center',
    status: 'live',
    year: 2025,
  },
  {
    id: 'listing-bot',
    title: {
      en: 'Listing-to-Post bot',
      ua: 'Бот-парсер оголошень для ріелторів',
      pl: 'Bot do ogłoszeń nieruchomości',
    },
    oneLiner: {
      en: 'A Telegram bot that turns property links into ready-to-send listing cards for real estate agents.',
      ua: 'Telegram-бот, який перетворює посилання на квартири в готові пости для ріелторів.',
      pl: 'Bot Telegram, który zamienia linki do nieruchomości w gotowe karty dla agentów.',
    },
    description: {
      en: 'Real estate agents were spending an hour per listing on copy-paste: pulling photos, rewriting the description, formatting it for Telegram. The bot does it in seconds. You drop a link, it scrapes the listing, picks the right photos, and posts a clean card with description and price. Built for one agency, runs in production.',
      ua: 'Ріелтори витрачали по годині на одну квартиру: скопіювати фото, переписати опис, відформатувати під Telegram. Бот робить це за секунду. Кидаєш посилання, він парсить сторінку, бере потрібні фото і публікує охайну картку з описом і ціною. Зроблений для однієї агенції, працює в проді.',
      pl: 'Agenci nieruchomości tracili godzinę na każdą ofertę: kopiowanie zdjęć, przepisywanie opisu, formatowanie do Telegrama. Bot robi to w sekundy. Wrzucasz link, bot scrapeuje ogłoszenie, wybiera zdjęcia i publikuje czystą kartę z opisem i ceną. Zbudowany dla jednej agencji, działa w produkcji.',
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
      ua: 'Бот для обробки зображень',
      pl: 'Bot do obróbki zdjęć',
    },
    oneLiner: {
      en: 'A Telegram bot that resizes and formats images on the fly.',
      ua: 'Telegram-бот, який ресайзить і форматує картинки на льоту.',
      pl: 'Bot Telegram, który zmienia rozmiar i formatuje zdjęcia na bieżąco.',
    },
    description: {
      en: 'Send it an image, get back a properly sized version for whatever platform you need. Built to save a small content team an hour a day on busywork.',
      ua: 'Надсилаєш картинку, отримуєш правильно підготовлену версію під потрібну платформу. Зроблений, щоб маленька контент-команда не витрачала годину в день на ресайз.',
      pl: 'Wyślij zdjęcie, otrzymaj odpowiednio przeskalowaną wersję na wybraną platformę. Zbudowany, aby zaoszczędzić małemu zespołowi contentowemu godzinę dziennie.',
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
      ua: 'Бот для авторозсилки реклами',
      pl: 'Bot do automatycznego postowania reklam',
    },
    oneLiner: {
      en: 'A bot that posts ads to Telegram chats on a schedule.',
      ua: 'Бот, який публікує рекламу в Telegram-чатах за розкладом.',
      pl: 'Bot, który publikuje reklamy w czatach Telegram zgodnie z harmonogramem.',
    },
    description: {
      en: "From my own account into the chats I'm a member of, with image and text, on a configurable schedule. Replaces the part of my day that used to be 'remember to post in the marketing chats'.",
      ua: "Постить з мого акаунту в чати, де я є, з картинкою і текстом, за налаштованим розкладом. Замінив той шматок дня, де я постійно забував кинути рекламу в маркетингові чати.",
      pl: "Publikuje z mojego konta do czatów, w których jestem, ze zdjęciem i tekstem, według konfigurowalnego harmonogramu. Zastępuje tę część dnia, która polegała na pamiętaniu o poście w czatach marketingowych.",
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
      ua: 'Бот моніторингу конкурентів',
      pl: 'Bot do monitorowania konkurencji',
    },
    oneLiner: {
      en: 'Watches competitors\' sites, Telegram channels, and Instagram accounts for new posts.',
      ua: 'Стежить за сайтами, Telegram-каналами та Instagram конкурентів і сповіщає про нові публікації.',
      pl: 'Śledzi strony, kanały Telegram i konta Instagram konkurencji w poszukiwaniu nowych postów.',
    },
    description: {
      en: 'An extension of the real estate listing parser, but for competitive intelligence. Point it at a competitor\'s site, Telegram channel, or Instagram account. When something new appears — a post, a promotion, a price change — it sends you a Telegram message. Good for any business that wants to know what the competition is doing without checking manually every day.',
      ua: 'Розширення парсера нерухомості, але для моніторингу конкурентів. Вказуєш на сайт, Telegram-канал або Instagram конкурента. Нова публікація, нова акція, новий пост — і ти отримуєш повідомлення в Telegram. Більше не треба щодня перевіряти руками.',
      pl: 'Wskazujesz na stronę, kanał Telegram lub konto Instagram konkurenta. Gdy pojawi się coś nowego — post, promocja, zmiana ceny — otrzymujesz wiadomość na Telegram. Idealne dla firm, które chcą wiedzieć, co robi konkurencja, bez codziennego ręcznego sprawdzania.',
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
      ua: 'FAQ-бот для бізнесу',
      pl: 'Bot FAQ dla firm',
    },
    oneLiner: {
      en: 'Upload a knowledge base, and the bot answers your customers in Telegram from it.',
      ua: 'Завантажуєш базу знань, і бот відповідає клієнтам у Telegram з цієї бази.',
      pl: 'Załaduj bazę wiedzy, a bot odpowiada klientom na Telegram z tej bazy.',
    },
    description: {
      en: 'You give it a document, a website, or a list of questions and answers. The bot reads it all and handles incoming questions in Telegram. No more answering the same ten questions manually every day. Works for shops, service businesses, clinics, anyone who gets repetitive questions from customers.',
      ua: 'Даєш йому документ, сайт або список питань і відповідей. Бот читає все це і обробляє вхідні питання в Telegram. Більше не треба вручну відповідати на одні й ті самі десять питань щодня. Підходить для магазинів, сервісних бізнесів, клінік — всіх, хто отримує типові питання від клієнтів.',
      pl: 'Dajesz mu dokument, stronę internetową lub listę pytań i odpowiedzi. Bot czyta wszystko i obsługuje pytania przychodzące na Telegram. Koniec z ręcznym odpowiadaniem na te same pytania każdego dnia. Działa dla sklepów, firm usługowych, klinik — wszystkich, którzy dostają powtarzające się pytania od klientów.',
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
      ua: 'AI-асистент для магазину',
      pl: 'Asystent AI dla sklepu',
    },
    oneLiner: {
      en: 'An AI bot trained on your store\'s info that answers customers in Telegram like a real person.',
      ua: 'AI-бот, навчений на інформації про ваш магазин, який відповідає клієнтам у Telegram як жива людина.',
      pl: 'Bot AI wytrenowany na informacjach o Twoim sklepie, który odpowiada klientom na Telegram jak prawdziwa osoba.',
    },
    description: {
      en: 'Connected to an AI and trained on everything about your store: catalog, prices, delivery terms, return policy, FAQ. A customer writes in Telegram — the bot answers immediately, in full, like someone on your team who actually knows the product. Not a script. Not a decision tree. It understands the question and gives a real answer.',
      ua: 'Підключений до ШІ і навчений на всій інформації про ваш магазин: каталог, ціни, умови доставки, повернення, часті питання. Клієнт пише в Telegram — бот відповідає одразу, повно, як людина з команди, яка знає товар. Не скрипт. Не дерево рішень. Розуміє питання і дає реальну відповідь.',
      pl: 'Połączony z AI i wytrenowany na wszystkim o Twoim sklepie: katalog, ceny, warunki dostawy, polityka zwrotów, FAQ. Klient pisze na Telegram — bot odpowiada natychmiast, wyczerpująco, jak ktoś z Twojego zespołu, kto naprawdę zna produkt. Nie skrypt. Nie drzewo decyzji. Rozumie pytanie i daje prawdziwą odpowiedź.',
    },
    tech: ['Python', 'aiogram', 'OpenAI API', 'RAG'],
    links: [],
    image: '/images/ai-assistant-bot.png',
    status: 'private',
    year: 2025,
  },
];
