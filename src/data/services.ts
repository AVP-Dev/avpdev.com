// src/data/services.ts
// ЕДИНЫЙ ИСТОЧНИК данных страниц услуг (ru + en).
// Меняем факт здесь — он обновляется на всех страницах услуг, в schema.org и в навигации.

export type Lang = 'ru' | 'en';

export const FACTS = {
    warranty: {
        ru: 'от 1 месяца после сдачи',
        en: 'from 1 month after delivery',
    } as Record<Lang, string>,
    pricingNote: {
        ru: 'Стартовая цена. Финальная смета — после согласования объёма проекта.',
        en: 'Starting price. The final quote is fixed after we agree on the project scope.',
    } as Record<Lang, string>,
};

export interface ServiceFeature {
    title: string;
    desc: string;
    /** FA-класс целиком: 'fa-solid fa-rocket' или 'fa-brands fa-telegram' */
    icon: string;
}

export interface ServiceFaq {
    q: string;
    a: string;
}

export interface PricingTier {
    value: string;
    label: string;
    note?: string;
}

export interface PricingFact {
    k: string;
    v: string;
}

export interface ServicePricingData {
    tiers: PricingTier[];
    facts: PricingFact[];
}

export interface ServicePageData {
    id: 'websites' | 'shop' | 'tma' | 'ai' | 'bots' | 'saas';
    slug: string;
    seoTitle: Record<Lang, string>;
    seoDescription: Record<Lang, string>;
    hero: Record<Lang, { title: string; subtitle: string }>;
    section: Record<Lang, { label: string; title: string; description: string; icon: string }>;
    features: Record<Lang, ServiceFeature[]>;
    faqs: Record<Lang, ServiceFaq[]>;
    faqHeading: Record<Lang, string>;
    faqSubtitle: Record<Lang, string>;
    pricing: Record<Lang, ServicePricingData>;
    schema: {
        serviceName: Record<Lang, string>;
        catalogName: Record<Lang, string>;
    };
}

export const services: ServicePageData[] = [
    // ─── Разработка сайтов ───────────────────────────────────────────────
    {
        id: 'websites',
        slug: 'razrabotka-saitov',
        seoTitle: {
            ru: 'Разработка сайтов под ключ: Лендинги, Магазины, Порталы | AVPdev',
            en: 'Custom Website Development: Landings, Shops, Portals | AVPdev',
        },
        seoDescription: {
            ru: 'Разрабатываем сайты на Astro, Next.js и React: от лендингов под рекламу до интернет-магазинов и корпоративных порталов.',
            en: 'We build websites on Astro, Next.js, and React: from ad-driven landing pages to online stores and corporate portals.',
        },
        hero: {
            ru: { title: 'Сайты, которые <span class="gradient-text">приносят заявки</span>', subtitle: 'Быстрые адаптивные сайты на Astro и Next.js: от лендинга под рекламу до корпоративного портала с интеграциями.' },
            en: { title: 'Websites That <span class="gradient-text">Bring Leads</span>', subtitle: 'Fast, responsive websites on Astro and Next.js: from ad landing pages to corporate portals with integrations.' },
        },
        section: {
            ru: { label: 'Web Solutions', title: 'Сайт как рабочий инструмент', description: 'Мы не используем конструкторы вроде Tilda или Wix. Вы получаете чистый, оптимизированный код, который принадлежит полностью вам.', icon: 'fa-solid fa-laptop-code' },
            en: { label: 'Web Solutions', title: 'A Website as a Working Tool', description: "We don't use builders like Tilda or Wix. You get clean, optimized code that belongs entirely to you.", icon: 'fa-solid fa-laptop-code' },
        },
        features: {
            ru: [
                { title: 'Лендинги и Промо-сайты', desc: 'Быстрая загрузка и структура под целевое действие — для запуска рекламы и презентации продукта.', icon: 'fa-solid fa-rocket' },
                { title: 'Корпоративные сайты', desc: 'Структура разделов под задачи компании, интеграция с CRM и дизайн под ваш бренд.', icon: 'fa-solid fa-building' },
                { title: 'Интернет-магазины', desc: 'Каталоги, корзины, платёжные системы и учёт остатков — на Astro или Next.js.', icon: 'fa-solid fa-cart-shopping' },
                { title: 'Блоги и Медиа-порталы', desc: 'Управление контентом и базовая SEO-оптимизация: скорость, семантическая разметка, sitemap.', icon: 'fa-solid fa-newspaper' },
            ],
            en: [
                { title: 'Landings & Promo Sites', desc: 'Maximum conversion and loading speed. Perfect for ad launches and product presentations.', icon: 'fa-solid fa-rocket' },
                { title: 'Corporate Websites', desc: 'Your digital representation. Complex structure, CRM integration, and unique design.', icon: 'fa-solid fa-building' },
                { title: 'Online Stores', desc: 'Scalable solutions for E-commerce. Catalogs, carts, payment systems, and inventory management.', icon: 'fa-solid fa-cart-shopping' },
                { title: 'Blogs & Media Portals', desc: "User-friendly content management systems and SEO optimization 'out of the box' for high rankings.", icon: 'fa-solid fa-newspaper' },
            ],
        },
        faqs: {
            ru: [
                { q: 'На каком стеке вы разрабатываете сайты?', a: 'Мы предпочитаем современный стек: Next.js или Astro для фронтенда (это дает топовую скорость загрузки и SEO) и Node.js для серверной части.' },
                { q: 'Сколько времени занимает разработка?', a: 'Экспресс-лендинг под срочный запуск — за 24 часа. Типовой сайт — 5–7 дней, срок зависит от задачи: объём страниц, интеграции, готовность контента. Сложный корпоративный сайт, портал или интернет-магазин — от 3 до 6 недель.' },
                { q: 'Будет ли сайт адаптирован под мобильные устройства?', a: 'Да. Мобильный трафик преобладает, поэтому все наши сайты делаем по принципу Mobile First: адаптивная вёрстка и корректное отображение на смартфонах, планшетах и десктопах.' },
                { q: 'Предоставляете ли вы домен и хостинг?', a: 'Мы помогаем клиентам с выбором и регистрацией доменного имени, а также настраиваем надёжный и быстрый хостинг или VPS под ключ, чтобы вам не пришлось разбираться в технических деталях.' },
                { q: 'Занимаетесь ли вы SEO-продвижением?', a: 'Все наши сайты разрабатываются с учетом базовой SEO-оптимизации (скорость, семантическая разметка, мета-теги). Это дает отличный старт для дальнейшего глубокого SEO-продвижения в Google и Яндекс.' },
                { q: 'Можно ли будет редактировать контент самостоятельно?', a: 'Да, мы интегрируем удобные и современные системы управления контентом (CMS или Headless CMS), которые позволяют вам легко менять тексты, фото и добавлять новые страницы без знания кода.' },
                { q: 'Что происходит после запуска проекта?', a: 'Мы не бросаем проекты после релиза. Мы предлагаем техническую поддержку, гарантийное обслуживание и помощь в дальнейшем развитии функционала вашего сайта по мере роста вашего бизнеса.' },
            ],
            en: [
                { q: 'What tech stack do you use for website development?', a: 'We prefer a modern stack: Next.js or Astro for the frontend (which gives top speed and SEO) and Node.js for the backend.' },
                { q: 'How long does development take?', a: 'Express landing page for an urgent launch: 24 hours. A typical site takes 5–7 days depending on scope: number of pages, integrations, content readiness. Complex corporate sites, portals, or stores take 3–6 weeks.' },
                { q: 'Will the site be mobile-friendly?', a: "Yes, 100% of our sites have high responsive design and pass Google Core Web Vitals tests with 'Excellent'." },
                { q: 'Do you provide domain and hosting services?', a: "We assist clients with choosing and registering a domain name, and we configure reliable server hosting (VPS) so you don't have to deal with technical nuances." },
                { q: 'Does your development include SEO optimization?', a: 'All of our websites are developed with baseline SEO in mind (fast load times, semantic HTML, meta tags), which gives an excellent foundation for future Google search ranking.' },
                { q: 'Will I be able to edit the content myself?', a: 'Yes, we integrate modern, user-friendly Content Management Systems (CMS or Headless CMS) that allow you to easily modify texts and images without touching code.' },
                { q: 'What happens after the project goes live?', a: 'We provide technical support, warranty maintenance, and scaling assistance so your website can grow together with your business.' },
            ],
        },
        faqHeading: { ru: 'Вопросы и ответы', en: 'Common Questions' },
        faqSubtitle: { ru: 'О процессе разработки сайтов', en: 'About the website development process' },
        pricing: {
            ru: {
                tiers: [
                    { value: 'от $400', label: 'Сайт на Astro', note: 'быстрый статический сайт, блог, лендинг' },
                    { value: 'от $600', label: 'Сайт на Next.js', note: 'динамика, интеграции, сложная логика' },
                ],
                facts: [
                    { k: 'Срок', v: 'экспресс-лендинг — 24 часа; типовой сайт — 5–7 дней' },
                    { k: 'SEO-база', v: 'скорость, семантика, sitemap, микроразметка' },
                    { k: 'Гарантия', v: FACTS.warranty.ru },
                ],
            },
            en: {
                tiers: [
                    { value: 'from $400', label: 'Astro website', note: 'fast static site, blog, landing page' },
                    { value: 'from $600', label: 'Next.js website', note: 'dynamic content, integrations, complex logic' },
                ],
                facts: [
                    { k: 'Timeline', v: 'express landing — 24h; typical site — 5–7 days' },
                    { k: 'SEO base', v: 'speed, semantics, sitemap, structured data' },
                    { k: 'Warranty', v: FACTS.warranty.en },
                ],
            },
        },
        schema: {
            serviceName: { ru: 'Разработка сайтов под ключ', en: 'Custom Website Development' },
            catalogName: { ru: 'Типы сайтов', en: 'Website Types' },
        },
    },
    // ─── Боты и парсеры ──────────────────────────────────────────────────
    {
        id: 'bots',
        slug: 'razrabotka-botov-i-parserov',
        seoTitle: {
            ru: 'Разработка ботов и парсеров | AVPdev',
            en: 'Bot and Scraper Development | AVPdev',
        },
        seoDescription: {
            ru: 'Автоматизация сбора данных и создание Telegram-ботов любой сложности. Парсинг сайтов, мониторинг цен и интеграция с внешними сервисами.',
            en: 'Automation of data collection and Telegram bot development of any complexity. Web scraping, price monitoring, and integration with external services.',
        },
        hero: {
            ru: { title: 'Боты и автоматизация, которые <span class="gradient-text">экономят часы</span>', subtitle: 'Заявки, отчёты, парсинг и связка CRM с мессенджерами — под ключ. Ваша команда занимается делом, а не рутиной.' },
            en: { title: 'Bots & Automation That <span class="gradient-text">Save Hours</span>', subtitle: 'Lead routing, reports, scraping and CRM-to-messenger integrations — turnkey. Your team does the real work, not the busywork.' },
        },
        section: {
            ru: { label: 'Automation', title: 'Скрипты, которые работают за вас', description: 'Автоматизируем сбор данных, мониторинг цен и рутинные действия. Освободите свою команду для творческих задач.', icon: 'fa-solid fa-robot' },
            en: { label: 'Automation', title: 'Scripts That Work for You', description: 'We automate data collection, price monitoring, and routine actions. Free up your team for creative tasks.', icon: 'fa-solid fa-robot' },
        },
        features: {
            ru: [
                { title: 'Telegram Боты', desc: 'От простых автоответчиков до сложных систем управления бизнесом внутри мессенджера с кнопками, оплатами и интеграциями.', icon: 'fa-solid fa-robot' },
                { title: 'Парсинг Данных', desc: 'Ежедневный сбор цен конкурентов, новостей или товаров из маркетплейсов (Amazon, Wildberries, Ozon) в удобный формат (XLSX, JSON, DB).', icon: 'fa-solid fa-database' },
                { title: 'Автоматизация Бизнеса', desc: 'Связываем разные сервисы между собой. Автоматический перенос лидов из форм в CRM, уведомления о заказах и генерация документов.', icon: 'fa-solid fa-gears' },
            ],
            en: [
                { title: 'Telegram Bots', desc: 'From simple auto-responders to complex business management systems within the messenger with buttons, payments, and integrations.', icon: 'fa-solid fa-robot' },
                { title: 'Data Scraping', desc: 'Daily collection of competitor prices, news, or products from marketplaces (Amazon, Wildberries, Ozon) in a convenient format (XLSX, JSON, DB).', icon: 'fa-solid fa-database' },
                { title: 'Business Automation', desc: 'Connecting different services. Automatic lead transfer from forms to CRM, order notifications, and document generation.', icon: 'fa-solid fa-gears' },
            ],
        },
        faqs: {
            ru: [
                { q: 'Можете ли вы обойти защиту от парсинга?', a: 'Да, мы используем ротацию прокси, эмуляцию поведения реального пользователя и современные библиотеки (Playwright, Puppeteer) для обхода Cloudflare и других защит.' },
                { q: 'На каких языках вы пишете ботов?', a: 'Основной стек — Node.js (TypeScript) или Python. Это обеспечивает высокую скорость работы и легкость поддержки.' },
                { q: 'Где будет работать бот?', a: 'Помогаем с настройкой и деплоем на VPS/VDS сервер (Linux), чтобы бот работал круглосуточно.' },
                { q: 'Законно ли парсить чужие сайты?', a: 'Парсинг публично доступных данных (цены, открытые контакты) легален, если он не нарушает лицензионное соглашение сайта или не вызывает отказ в обслуживании (DDoS).' },
                { q: 'В каком виде я буду получать собранные данные?', a: 'Мы можем выгружать данные напрямую в вашу базу данных, отправлять Excel/CSV отчеты вам в Telegram, Google Таблицы или загружать прямо в вашу CRM систему.' },
                { q: 'Может ли бот обрабатывать платежи?', a: 'Да, Telegram бот отлично интегрируется с ЮKassa, Stripe, Crypto Pay, и платежи проходят без комиссий от самого Telegram.' },
                { q: 'Что если дизайн целевого сайта изменится?', a: 'Парсеры могут сломаться при изменении верстки сайта-источника. Мы предлагаем услугу поддержки, в рамках которой оперативно (обычно в течение 24 часов) чиним селекторы.' },
            ],
            en: [
                { q: 'Can you bypass anti-scraping protection?', a: 'Yes, we use proxy rotation, real user behavior emulation, and modern libraries (Playwright, Puppeteer) to bypass Cloudflare and other protections.' },
                { q: 'What languages do you use for bots?', a: 'Our main stack is Node.js (TypeScript) or Python. This ensures high speed and ease of maintenance.' },
                { q: 'Where will the bot run?', a: 'We help with setup and deployment on a VPS/VDS server (Linux) so your bot runs around the clock.' },
                { q: 'Is it legal to scrape data from websites?', a: "Scraping publicly available data (prices, public contacts) is generally legal, provided it doesn't violate specific Terms of Service or cause a Denial of Service (DDoS)." },
                { q: 'In what format will I receive the scraped data?', a: 'We can push data directly to your database, send Excel/CSV reports to your Telegram, Google Sheets, or integrate directly with your CRM.' },
                { q: 'Can the Telegram bot accept payments?', a: "Yes, Telegram bots perfectly integrate with Stripe, Crypto Pay, and others, passing payments without Telegram's commission." },
                { q: 'What happens if the target website changes design?', a: "Scrapers may break when the source website's layout changes. We offer support packages where we quickly fix broken selectors (usually within 24 hours)." },
            ],
        },
        faqHeading: { ru: 'Вопросы и ответы', en: 'Common Questions' },
        faqSubtitle: { ru: 'О парсинге и автоматизации', en: 'About parsing and automation' },
        pricing: {
            ru: {
                tiers: [
                    { value: 'от $150', label: 'Telegram-бот', note: 'автоответы, приём заявок, оплаты' },
                    { value: 'от $600', label: 'Автоматизация и парсеры', note: 'интеграции сервисов, сбор данных, отчёты' },
                ],
                facts: [
                    { k: 'Срок', v: 'бот — 7–14 дней; связка систем — 2–6 недель' },
                    { k: 'Гарантия', v: FACTS.warranty.ru },
                    { k: 'Передача', v: 'код и документация остаются у вас' },
                ],
            },
            en: {
                tiers: [
                    { value: 'from $150', label: 'Telegram bot', note: 'auto-replies, lead capture, payments' },
                    { value: 'from $600', label: 'Automation & scrapers', note: 'service integrations, data collection, reports' },
                ],
                facts: [
                    { k: 'Timeline', v: 'bot — 7–14 days; multi-system setup — 2–6 weeks' },
                    { k: 'Warranty', v: FACTS.warranty.en },
                    { k: 'Handover', v: 'code and docs stay with you' },
                ],
            },
        },
        schema: {
            serviceName: { ru: 'Разработка ботов и парсеров', en: 'Bot & Scraper Development' },
            catalogName: { ru: 'Автоматизация', en: 'Automation Services' },
        },
    },
    // ─── AI-интеграции ───────────────────────────────────────────────────
    {
        id: 'ai',
        slug: 'ai-integracii',
        seoTitle: {
            ru: 'Внедрение ИИ и нейросетей в бизнес | AVPdev',
            en: 'AI & Neural Network Integration for Business | AVPdev',
        },
        seoDescription: {
            ru: 'Интеграция GPT (OpenAI), Claude (Anthropic) и Gemini (Google), а также self-hosted open-source моделей. Автоматизация поддержки, RAG-системы и генерация контента.',
            en: 'GPT (OpenAI), Claude (Anthropic), and Gemini (Google) integration, plus self-hosted open-source models. Support automation, RAG systems, and AI-powered content generation.',
        },
        hero: {
            ru: { title: 'Интеграция <span class="gradient-text">ИИ в бизнес</span>', subtitle: 'Внедряем ИИ в рабочие процессы: боты поддержки, поиск по базам знаний, автоматизация рутины — на GPT, Claude и открытых моделях.' },
            en: { title: 'AI <span class="gradient-text">Business Integration</span>', subtitle: 'We bring AI into your workflows: support bots, knowledge-base search, routine automation — on GPT, Claude, and open models.' },
        },
        section: {
            ru: { label: 'Expertise', title: 'Нейросети для вашего бизнеса', description: 'Мы строим кастомные системы, которые знают всё о вашей компании, продуктах и правилах. Превратите хаос в упорядоченную базу знаний.', icon: 'fa-solid fa-brain' },
            en: { label: 'Expertise', title: 'AI for Your Business', description: 'We build custom systems that know everything about your company, products, and rules. Turn chaos into an organized knowledge base.', icon: 'fa-solid fa-brain' },
        },
        features: {
            ru: [
                { title: 'Умная Поддержка (AI Support)', desc: 'ИИ отвечает на 75–85% типовых вопросов клиентов в чатах (Telegram, WhatsApp, на сайте), разгружая менеджеров и работая без выходных.', icon: 'fa-solid fa-headset' },
                { title: 'Анализ Данных и RAG-системы', desc: 'Создаем внутренние поисковики для сотрудников. ИИ мгновенно находит нужный ответ в терабайтах вашей корпоративной документации.', icon: 'fa-solid fa-magnifying-glass-chart' },
                { title: 'Генерация Контента (Auto-Blogging)', desc: 'Автоматизируем SEO. Боты сами пишут уникальные статьи по вашему семантическому ядру и публикуют их на сайт (Astro/Next.js/WordPress).', icon: 'fa-solid fa-pen-nib' },
            ],
            en: [
                { title: 'AI Support', desc: 'AI answers 75–85% of routine customer questions in chats (Telegram, WhatsApp, website), freeing up your managers around the clock.', icon: 'fa-solid fa-headset' },
                { title: 'Data Analysis & RAG Systems', desc: 'We build internal search engines for employees. AI instantly finds the right answer in terabytes of your corporate documentation.', icon: 'fa-solid fa-magnifying-glass-chart' },
                { title: 'Auto-Blogging & Content', desc: 'Automate your SEO. Bots write unique articles based on your semantic core and publish them directly to your site.', icon: 'fa-solid fa-pen-nib' },
            ],
        },
        faqs: {
            ru: [
                { q: 'Как ИИ узнает подробности моей компании?', a: 'Мы используем технологию RAG (Retrieval-Augmented Generation). Мы создаем векторную базу данных из ваших документов, и ИИ обращается к ней перед ответом. Он не «галлюцинирует», а использует ваши факты.' },
                { q: 'Безопасно ли передавать наши данные в OpenAI?', a: 'Да. Работаем с GPT (OpenAI), Claude (Anthropic) и Gemini (Google). Для чувствительных данных — Enterprise API или self-hosted open-source модели (Llama, Qwen, Mistral): они гарантируют, что ваши данные не будут использованы для обучения общих моделей.' },
                { q: 'Сколько времени занимает внедрение?', a: 'Простой чат-бот суппорт — от 2 недель. Сложная RAG-система с интеграцией в CRM — от 1 месяца.' },
                { q: 'С какими мессенджерами вы работаете?', a: 'С любыми, у которых есть открытое API. Чаще всего мы интегрируем AI-ботов в Telegram, WhatsApp, Viber, Instagram Direct и виджеты на самом сайте.' },
                { q: 'Способна ли нейросеть оформлять заказы?', a: 'Да. Искусственный интеллект не только общается, но и вызывает функции (Function Calling) — например, записывает клиента на приём, проверяет остатки товара и создаёт платёжную ссылку.' },
                { q: 'Нужно ли мне нанимать новых сотрудников для работы с ИИ?', a: 'Наоборот! Задача наших ИИ-решений — разгрузить вашу текущую команду. Управление моделями происходит через простую панель, с которой справится любой маркетолог.' },
                { q: 'Как измеряется эффективность ИИ-бота?', a: 'Мы отслеживаем долю автономных ответов без участия человека (в среднем 75-85%), время ответа на сообщение клиента (моментально) и процент успешных закрытий обращений.' },
            ],
            en: [
                { q: 'How does AI learn about my company details?', a: "We use RAG (Retrieval-Augmented Generation). We create a vector database from your documents, which the AI consults before answering. It doesn't 'hallucinate' but uses your specific facts." },
                { q: 'Is it safe to share our data with OpenAI?', a: 'Yes. We work with GPT (OpenAI), Claude (Anthropic), and Gemini (Google). For sensitive data, we use Enterprise APIs or self-hosted open-source models (Llama, Qwen, Mistral) to ensure your data is never used to train public models.' },
                { q: 'How long does implementation take?', a: 'A simple support chatbot — from 2 weeks. A complex RAG system integrated with CRM — from 1 month.' },
                { q: 'Which messaging platforms do you work with?', a: 'We can integrate bots into any platform with an open API. Most commonly: Telegram, WhatsApp, Viber, Instagram Direct, and website widgets.' },
                { q: 'Can the neural network process actual orders?', a: 'Yes. Modern AI can execute functions (Function Calling). For instance, it can book client appointments, check stock availability, and issue payment links.' },
                { q: 'Will we need to hire data scientists?', a: 'Not at all. We build tools to reduce human load, not increase it. Everything is managed through a simple interface any marketer or manager can handle.' },
                { q: "How do you measure an AI bot's success?", a: 'We measure the deflection rate (percentage of queries resolved autonomously, typically 75-85%), response time reduction, and successful conversion rates.' },
            ],
        },
        faqHeading: { ru: 'Вопросы и ответы', en: 'Common Questions' },
        faqSubtitle: { ru: 'Всё, что вам нужно знать перед стартом проекта', en: 'Everything you need to know about AI integration' },
        pricing: {
            ru: {
                tiers: [
                    { value: 'от $600', label: 'Точечная интеграция', note: 'чат-бот поддержки, суммаризация, классификация' },
                    { value: 'по объёму', label: 'RAG и AI-агенты', note: 'базы знаний, оркестрация, внутренние процессы' },
                ],
                facts: [
                    { k: 'Срок', v: '2–6 недель' },
                    { k: 'Подход', v: 'пилот на ваших данных до полного внедрения' },
                    { k: 'Гарантия', v: FACTS.warranty.ru },
                ],
            },
            en: {
                tiers: [
                    { value: 'from $600', label: 'Targeted integration', note: 'support chatbot, summarization, classification' },
                    { value: 'scope-based', label: 'RAG & AI agents', note: 'knowledge bases, orchestration, internal processes' },
                ],
                facts: [
                    { k: 'Timeline', v: '2–6 weeks' },
                    { k: 'Approach', v: 'a pilot on your data before full rollout' },
                    { k: 'Warranty', v: FACTS.warranty.en },
                ],
            },
        },
        schema: {
            serviceName: { ru: 'Внедрение ИИ и нейросетей', en: 'AI & Business Automation' },
            catalogName: { ru: 'AI Решения', en: 'AI Services' },
        },
    },
    // ─── SaaS и MVP ──────────────────────────────────────────────────────
    {
        id: 'saas',
        slug: 'saas-mvp',
        seoTitle: {
            ru: 'Разработка SaaS и MVP для стартапов | AVPdev',
            en: 'SaaS & MVP Development for Startups | AVPdev',
        },
        seoDescription: {
            ru: 'Быстрый запуск MVP для стартапов и масштабируемая разработка SaaS-платформ на Next.js, Node.js и Astro. MVP — как правило до 14 дней, дальше рост в полноценный продукт.',
            en: 'Quick MVP launch for startups and scalable SaaS platform development on Next.js, Node.js, and Astro. MVPs typically launch within 14 days, then grow into a full product.',
        },
        hero: {
            ru: { title: 'От идеи до <span class="gradient-text">работающего продукта</span> за недели', subtitle: 'MVP запускаем как правило до 14 дней — на архитектуре, которая готова к росту, а не потребует переписывания.' },
            en: { title: 'SaaS & <span class="gradient-text">MVP Development</span>', subtitle: 'MVPs typically launch within 14 days — on architecture ready to grow with you, not demand a rewrite.' },
        },
        section: {
            ru: { label: 'Development', title: 'MVP — как правило до 14 дней', description: 'Мы помогаем стартапам и бизнесу быстро проверять гипотезы. Создаем масштабируемые MVP, которые не нужно переписывать после роста.', icon: 'fa-solid fa-rocket' },
            en: { label: 'Development', title: 'MVP — Typically Within 14 Days', description: "We help startups and businesses test hypotheses quickly. We create scalable MVPs that don't need to be rewritten after growth.", icon: 'fa-solid fa-rocket' },
        },
        features: {
            ru: [
                { title: 'Мощный Backend и API', desc: 'Разрабатываем надежную микросервисную или монолитную архитектуру (Node.js, Go, Python). Строим REST/GraphQL API для ваших мобильных и веб-приложений.', icon: 'fa-solid fa-server' },
                { title: 'Современный Frontend (Next.js)', desc: 'Создаем реактивные, быстрые и SEO-оптимизированные интерфейсы на React и Next.js, которые работают мгновенно.', icon: 'fa-solid fa-gauge-high' },
                { title: 'Безопасность и DevOps', desc: 'Настраиваем CI/CD пайплайны, контейнеризацию (Docker, Coolify), автоматические бэкапы и защиту данных пользователей.', icon: 'fa-solid fa-shield-halved' },
            ],
            en: [
                { title: 'Powerful Backend & API', desc: 'We develop reliable microservice or monolithic architectures (Node.js, Go, Python). Build REST/GraphQL APIs for your mobile and web applications.', icon: 'fa-solid fa-server' },
                { title: 'Modern Frontend (Next.js)', desc: 'We create reactive, fast, and SEO-optimized interfaces on React and Next.js that work instantly.', icon: 'fa-solid fa-gauge-high' },
                { title: 'Security & DevOps', desc: "We set up CI/CD pipelines, containerization (Docker, Coolify), automated backups, and protection of your users' data.", icon: 'fa-solid fa-shield-halved' },
            ],
        },
        faqs: {
            ru: [
                { q: 'Что такое MVP и зачем он нужен?', a: 'MVP (Minimum Viable Product) — это минимально жизнеспособный продукт: только ключевой функционал. Мы запускаем MVP как правило до 14 дней, чтобы вы быстро проверили спрос и получили первых пользователей или инвестиции, не тратя месяцы и огромные бюджеты.' },
                { q: 'Подходит ли ваш стек для высоконагруженных SaaS?', a: 'Да. Фронтенд — Next.js с серверным рендерингом, бэкенд — Node.js/Bun или Go, база — PostgreSQL. Архитектуру выбираем под ожидаемую нагрузку: монолит для старта или микросервисы, если нагрузка уже известна и распределена.' },
                { q: 'Можете ли вы взять проект на дальнейшую поддержку?', a: 'Да, MVP — это только начало. После релиза мы обеспечиваем SLA (соглашение об уровне сервиса), багфиксинг и постепенное наращивание новых фич (Agile/Scrum).' },
                { q: 'Как обеспечивается безопасность данных?', a: 'Мы используем современные стандарты шифрования, токены доступа (JWT/OAuth), защиту от DDoS, а также настраиваем автоматические регулярные бэкапы баз данных.' },
                { q: 'Что входит в этап проектирования архитектуры?', a: 'Мы проектируем структуру базы данных, описываем логику работы сервисов, выбираем необходимые интеграции и создаем детальную схему взаимодействия (API контракты) еще до написания первой строчки кода.' },
                { q: 'Можем ли мы потом нанять свою In-House команду?', a: 'Конечно. Вы получаете задокументированный код, инфраструктуру и документацию. Квалифицированная команда разработчиков и DevOps сможет принять проект и развивать его дальше.' },
                { q: 'Интегрируете ли вы платежи по подписке?', a: 'Да, у нас есть богатый опыт настройки рекуррентных платежей через Stripe, Braintree, ЮKassa и интеграции с системами управления подписками.' },
            ],
            en: [
                { q: 'What is an MVP and why do I need it?', a: 'An MVP (Minimum Viable Product) is the smallest version of your product: core features only. We typically launch MVPs within 14 days, so you can test demand and get your first users or investment quickly — without spending months and huge budgets.' },
                { q: 'Is your stack suitable for high-load SaaS?', a: 'Yes. Frontend is Next.js with server-side rendering, backend is Node.js/Bun or Go, database is PostgreSQL. We choose the architecture based on expected load: a monolith to start, or microservices when the load is known and distributed.' },
                { q: 'Can you provide ongoing support?', a: 'Yes, an MVP is just the beginning. After release, we provide SLA, bug fixing, and gradual feature rollouts (Agile/Scrum).' },
                { q: 'How do you ensure data security?', a: 'We implement modern encryption protocols, access tokens (JWT), DDoS protection, and we configure automated database backups from day one.' },
                { q: 'Do you design the system architecture?', a: 'Yes, before writing any code we design the database schemas, API contracts, microservices layout, and cloud infrastructure.' },
                { q: 'Can my own team eventually take over?', a: 'Yes. You get documented source code, infrastructure, and documentation. Any skilled team of developers and DevOps can take the project over and keep building on it.' },
                { q: 'Do you configure subscription payments?', a: 'Yes, we integrate Stripe, Braintree, and other providers with automated webhook handling for complex subscription tiers.' },
            ],
        },
        faqHeading: { ru: 'Вопросы и ответы', en: 'Common Questions' },
        faqSubtitle: { ru: 'О запуске новых продуктов', en: 'About launching new products' },
        pricing: {
            ru: {
                tiers: [
                    { value: 'от $1 500', label: 'MVP', note: 'один ключевой сценарий, без лишних фич' },
                    { value: 'по объёму', label: 'SaaS-платформа', note: 'архитектура под рост нагрузки и команды' },
                ],
                facts: [
                    { k: 'Срок', v: 'MVP — как правило до 14 дней; SaaS — по объёму' },
                    { k: 'Стек', v: 'Next.js · Node.js/Bun · PostgreSQL' },
                    { k: 'Передача', v: 'код, инфраструктура и документация — ваши' },
                ],
            },
            en: {
                tiers: [
                    { value: 'from $1,500', label: 'MVP', note: 'one core scenario, no extra features' },
                    { value: 'scope-based', label: 'SaaS platform', note: 'architecture ready for load and team growth' },
                ],
                facts: [
                    { k: 'Timeline', v: 'MVP — typically within 14 days; SaaS — scope-based' },
                    { k: 'Stack', v: 'Next.js · Node.js/Bun · PostgreSQL' },
                    { k: 'Handover', v: 'code, infrastructure and docs stay with you' },
                ],
            },
        },
        schema: {
            serviceName: { ru: 'Разработка SaaS и MVP', en: 'SaaS & MVP Development' },
            catalogName: { ru: 'SaaS Услуги', en: 'SaaS Services' },
        },
    },
    // ─── Интернет-магазины ───────────────────────────────────────────────
    {
        id: 'shop',
        slug: 'internet-magaziny',
        seoTitle: {
            ru: 'Разработка интернет-магазинов под ключ: каталог, корзина, оплата | AVPdev',
            en: 'E-commerce Development: Storefront, Cart, Payments | AVPdev',
        },
        seoDescription: {
            ru: 'Создаем быстрые интернет-магазины на Astro и Next.js: витрины, каталоги, онлайн-оплата, учет остатков и админка с автосжатием изображений. Уведомления о заказах в Telegram.',
            en: 'We build fast online stores on Astro and Next.js: storefronts, catalogs, online payments, stock management and an admin panel with automatic image compression. Order notifications in Telegram.',
        },
        hero: {
            ru: { title: 'Интернет-магазины, которые <span class="gradient-text">продают</span>', subtitle: 'Быстрые витрины, удобная корзина, онлайн-оплата и заказы сразу в Telegram. От идеи до первой продажи.' },
            en: { title: 'Online Stores That <span class="gradient-text">Sell</span>', subtitle: 'Fast storefronts, smooth checkout, online payments and orders straight into Telegram. From idea to first sale.' },
        },
        section: {
            ru: { label: 'E-commerce', title: 'Магазин как инструмент продаж, а не витрина ради витрины', description: 'Никаких тяжеловесных CMS и шаблонов, которые тормозят при первом же наплыве покупателей. Чистый быстрый код, который принадлежит вам полностью.', icon: 'fa-solid fa-cart-shopping' },
            en: { label: 'E-commerce', title: 'A store as a sales tool, not a showcase for show', description: 'No heavyweight CMS or templates that choke at the first traffic spike. Clean, fast code that belongs entirely to you.', icon: 'fa-solid fa-cart-shopping' },
        },
        features: {
            ru: [
                { title: 'Витрины и каталоги', desc: 'Быстрая загрузка карточек товаров за счет предгенерации (SSG/ISR). Фильтры, варианты товара, поиск — без тяжёлых конструкторов.', icon: 'fa-solid fa-box-open' },
                { title: 'Корзина и онлайн-оплата', desc: 'Платежные системы под ваш регион: Stripe, ЮKassa, WebPay, криптовалюта. Промокоды и оформление заказа в один шаг.', icon: 'fa-solid fa-credit-card' },
                { title: 'Админка без лишнего', desc: 'Управление товарами, ценами и заказами в простой панели. Автоматическое сжатие изображений при загрузке — скорость не страдает.', icon: 'fa-solid fa-gauge-high' },
                { title: 'Заказы в Telegram', desc: 'Мгновенные уведомления менеджеру о новых заказах и смена статусов прямо в мессенджере — без почты и лишних программ.', icon: 'fa-solid fa-bell' },
                { title: 'Интеграция с CRM', desc: 'Заказы и клиенты автоматически попадают в вашу CRM (Bitrix24, amoCRM, Мой Склад) — без ручного переноса и потерь заявок.', icon: 'fa-solid fa-diagram-project' },
            ],
            en: [
                { title: 'Storefronts & Catalogs', desc: 'Instant product page loads via pre-generation (SSG/ISR). Filters, product variants, search — no heavy page builders.', icon: 'fa-solid fa-box-open' },
                { title: 'Cart & Online Payments', desc: 'Payment providers for your region: Stripe, local gateways, crypto. Promo codes and a one-step checkout flow.', icon: 'fa-solid fa-credit-card' },
                { title: 'Admin Panel Without the Bloat', desc: 'Manage products, prices and orders in a simple dashboard. Images are compressed automatically on upload — speed stays intact.', icon: 'fa-solid fa-gauge-high' },
                { title: 'Orders in Telegram', desc: 'Instant notifications to your manager about new orders and status updates right in the messenger — no email chains, no extra tools.', icon: 'fa-solid fa-bell' },
                { title: 'CRM Integration', desc: 'Orders and customers flow into your CRM automatically (Bitrix24, amoCRM, Zoho) — no manual copying, no lost leads.', icon: 'fa-solid fa-diagram-project' },
            ],
        },
        faqs: {
            ru: [
                { q: 'На каком стеке вы разрабатываете магазины?', a: 'Astro или Next.js для витрины — это дает топовую скорость загрузки и SEO. Бэкенд — Node.js/Bun, база — PostgreSQL или SQLite для небольших магазинов. Платежный шлюз подбираем под регион продаж.' },
                { q: 'Сколько стоит интернет-магазин?', a: 'Индивидуально, ориентир — от $1500. Итоговая цена зависит от размера каталога, платежных интеграций, учета склада и админки. Точная оценка — после брифа.' },
                { q: 'Какие сроки разработки?', a: 'Простой магазин с каталогом и оплатой — 3–4 недели. С интеграцией склада, CRM или кастомной логикой ценообразования — от 4 до 8 недель.' },
                { q: 'Можно ли принимать оплату онлайн?', a: 'Да. Подключаем Stripe, ЮKassa, WebPay, криптоплатежи (USDT) и Telegram Payments — под вашу юрисдикцию и аудиторию.' },
                { q: 'Как быть с остатками и складом?', a: 'Либо встроенный учет в админке (для небольшого ассортимента), либо интеграция с вашей системой — ERP, таблицы, 1С. Данные синхронизируются автоматически.' },
                { q: 'Что происходит после запуска магазина?', a: 'Гарантия — от 1 месяца после релиза (точный срок зависит от объема проекта): исправление багов в сданном функционале. Дальше — техническая поддержка и развитие на отдельных условиях.' },
            ],
            en: [
                { q: 'What stack do you use for online stores?', a: 'Astro or Next.js for the storefront — this delivers top load speed and SEO. Backend runs on Node.js/Bun with PostgreSQL or SQLite for smaller catalogs. The payment gateway is chosen based on your sales region.' },
                { q: 'How much does an online store cost?', a: 'Priced individually, starting around $1500. The final figure depends on catalog size, payment integrations, stock management and the admin panel. Exact estimate after a brief.' },
                { q: 'What is the development timeline?', a: 'A simple store with a catalog and payments takes 3–4 weeks. With warehouse, CRM or custom pricing logic integrations — 4 to 8 weeks.' },
                { q: 'Can customers pay online?', a: 'Yes. We integrate Stripe, regional payment providers, crypto (USDT) and Telegram Payments — matched to your jurisdiction and audience.' },
                { q: 'What about stock and inventory?', a: 'Either built-in accounting in the admin panel (for smaller ranges) or integration with your existing system — ERP, spreadsheets, custom tools. Data syncs automatically.' },
                { q: 'What happens after the store launches?', a: 'The warranty starts at 1 month after launch (exact term depends on project scope) covering bug fixes in delivered functionality. Beyond that, ongoing support and development are available on separate terms.' },
            ],
        },
        faqHeading: { ru: 'Вопросы и ответы', en: 'Вопросы и ответы' },
        faqSubtitle: { ru: 'О разработке интернет-магазинов', en: 'About online store development' },
        pricing: {
            ru: {
                tiers: [
                    { value: 'от $1 500', label: 'Интернет-магазин', note: 'каталог, корзина, оплата, админка' },
                    { value: 'по объёму', label: 'Нестандартная логика', note: 'маркетплейс, подписки, интеграции склада' },
                ],
                facts: [
                    { k: 'Срок', v: '3–6 недель' },
                    { k: 'Платежи', v: 'ЮKassa, ExpressPay, Stripe, крипта' },
                    { k: 'Гарантия', v: FACTS.warranty.ru },
                ],
            },
            en: {
                tiers: [
                    { value: 'from $1,500', label: 'Online store', note: 'catalog, cart, payments, admin panel' },
                    { value: 'scope-based', label: 'Custom logic', note: 'marketplace, subscriptions, warehouse sync' },
                ],
                facts: [
                    { k: 'Timeline', v: '3–6 weeks' },
                    { k: 'Payments', v: 'Yookassa, ExpressPay, Stripe, crypto' },
                    { k: 'Warranty', v: FACTS.warranty.en },
                ],
            },
        },
        schema: {
            serviceName: { ru: 'Разработка интернет-магазинов под ключ', en: 'E-commerce Development Turnkey' },
            catalogName: { ru: 'Возможности магазина', en: 'Store Capabilities' },
        },
    },
    // ─── Telegram Mini Apps ──────────────────────────────────────────────
    {
        id: 'tma',
        slug: 'telegram-mini-apps',
        seoTitle: {
            ru: 'Разработка Telegram Mini Apps (WebApps) | AVPdev',
            en: 'Telegram Mini Apps (WebApps) Development | AVPdev',
        },
        seoDescription: {
            ru: 'Профессиональная разработка Telegram Mini Apps (WebApps) для e-commerce, криптопроектов и бизнеса. Интеграция с TON, смарт-контрактами и платежными системами.',
            en: 'Professional Telegram Mini Apps (WebApps) development for e-commerce, crypto projects, and business. Integration with TON, smart contracts, and payment systems.',
        },
        hero: {
            ru: { title: 'Telegram <span class="gradient-text">Mini Apps</span>', subtitle: 'Магазины, записи, крипто-приложения и CRM прямо в мессенджере — без установки приложения, с мгновенным входом через Telegram.' },
            en: { title: 'Telegram <span class="gradient-text">Mini Apps</span>', subtitle: 'Stores, bookings, crypto apps, and CRMs inside the messenger — no app install, instant login via Telegram.' },
        },
        section: {
            ru: { label: 'Telegram Apps', title: 'Ваш бизнес в кармане пользователя', description: 'Telegram Mini Apps (WebApps) — это полноценные веб-приложения внутри мессенджера: без публикации в App Store и Google Play и без их комиссий с продаж.', icon: 'fa-brands fa-telegram' },
            en: { label: 'Telegram Apps', title: "Your Business in Your User's Pocket", description: 'Telegram Mini Apps (WebApps) are full-featured web applications inside the messenger: no App Store or Google Play listing, and none of their sales commissions.', icon: 'fa-brands fa-telegram' },
        },
        features: {
            ru: [
                { title: 'Web3 & Крипта (TON Connect)', desc: 'Интегрируем криптокошельки (Tonkeeper), создаем тапалки, обменники и NFT-маркетплейсы прямо в Telegram.', icon: 'fa-brands fa-ethereum' },
                { title: 'Магазины внутри Telegram', desc: 'Полноценные интернет-магазины с каталогом, корзиной и онлайн-оплатой (ЮKassa, Stripe, CryptoPay) в один клик без перехода на внешний сайт.', icon: 'fa-solid fa-store' },
                { title: 'Кастомные CRM и Дашборды', desc: 'Разрабатываем интерфейсы для сотрудников: учет задач, управление заказами и аналитика, доступ к которой есть только в защищенном боте.', icon: 'fa-solid fa-users' },
            ],
            en: [
                { title: 'Web3 & Crypto (TON Connect)', desc: 'We integrate crypto wallets (Tonkeeper), create clickers, exchanges, and NFT marketplaces directly within Telegram.', icon: 'fa-brands fa-ethereum' },
                { title: 'Stores inside Telegram', desc: 'Full-fledged online stores with catalogs, carts, and one-click payments (Stripe, CryptoPay) without leaving the app.', icon: 'fa-solid fa-store' },
                { title: 'Custom CRMs & Dashboards', desc: 'We develop employee interfaces for task management, order control, and analytics accessible only within a secure bot.', icon: 'fa-solid fa-users' },
            ],
        },
        faqs: {
            ru: [
                { q: 'Что такое Telegram Mini Apps (TMA)?', a: 'Это полноценные веб-приложения, которые открываются прямо внутри Telegram. Пользователю не нужно ничего скачивать, авторизация происходит моментально через его Telegram-аккаунт.' },
                { q: 'Можно ли принимать платежи в TMA?', a: 'Да. Мы интегрируем как фиатные платежи (Stars, Stripe, ЮKassa), так и крипту (TON Connect, USDT).' },
                { q: 'Можете ли вы сделать крипто-игру (Tap to Earn)?', a: 'Да, мы разрабатываем высоконагруженные Clicker/Tap2Earn механики с защитой от ботов и интеграцией с блокчейном TON.' },
                { q: 'Насколько безопасны такие приложения?', a: 'TMA работают под той же защитой, что и сам Telegram. Технология обеспечивает надежное шифрование данных и сессий.' },
                { q: 'Как мне продвигать свое Mini App?', a: 'Основной инструмент продвижения — Telegram Ads, посевы в других Telegram-каналах и реферальные механики внутри самого приложения, которые обеспечивают виральный рост.' },
                { q: 'Будет ли приложение работать на мобильном телефоне и ПК?', a: 'Да. Интерфейс адаптируется под мобильную версию Telegram, а также под планшеты и десктоп (Telegram Desktop).' },
                { q: 'Сроки разработки Telegram WebApp?', a: 'Базовое приложение с формой заявки или каталогом-визиткой — от 1-2 недель. Полноценный магазин или сложная игра Tap2Earn — от 1-2 месяцев.' },
            ],
            en: [
                { q: 'What are Telegram Mini Apps (TMA)?', a: "They are full web applications that open directly inside Telegram. Users don't need to download anything; authorization is instant through their Telegram account." },
                { q: 'Can I accept payments in TMA?', a: 'Yes. We integrate fiat payments (Stars, Stripe) as well as crypto (TON Connect, USDT).' },
                { q: 'Can you build a crypto game (Tap to Earn)?', a: 'Yes, we develop high-load Clicker/Tap2Earn mechanics with anti-bot protection and TON blockchain integration.' },
                { q: 'How secure are these applications?', a: 'TMA operates under the same security standards as Telegram itself. The technology ensures reliable encryption of data.' },
                { q: 'How can I promote my Mini App?', a: 'The main promotion channels are Telegram Ads, advertising in large channels, and building in viral referral loops.' },
                { q: 'Will the app work on both phones and computers?', a: 'Yes. The layout adapts to Telegram on mobile as well as tablets and Telegram Desktop.' },
                { q: 'What is the development timeline for a TMA?', a: 'A basic lead generation app or catalog takes around 1-2 weeks. Complex stores or Tap-to-Earn games take around 1-2 months.' },
            ],
        },
        faqHeading: { ru: 'Вопросы и ответы', en: 'Common Questions' },
        faqSubtitle: { ru: 'Всё о разработке Mini Apps', en: 'Everything about Mini Apps development' },
        pricing: {
            ru: {
                tiers: [
                    { value: 'от $600', label: 'Mini App', note: 'витрина, запись, формы внутри Telegram' },
                    { value: 'от $1 500', label: 'Mini App с оплатой', note: 'каталог, корзина, платёжные системы' },
                ],
                facts: [
                    { k: 'Срок', v: '2–4 недели' },
                    { k: 'Платежи', v: 'ЮKassa, Stripe, CryptoPay' },
                    { k: 'Гарантия', v: FACTS.warranty.ru },
                ],
            },
            en: {
                tiers: [
                    { value: 'from $600', label: 'Mini App', note: 'storefront, booking, forms inside Telegram' },
                    { value: 'from $1,500', label: 'Mini App with payments', note: 'catalog, cart, payment providers' },
                ],
                facts: [
                    { k: 'Timeline', v: '2–4 weeks' },
                    { k: 'Payments', v: 'Yookassa, Stripe, CryptoPay' },
                    { k: 'Warranty', v: FACTS.warranty.en },
                ],
            },
        },
        schema: {
            serviceName: { ru: 'Разработка Telegram Mini Apps', en: 'Telegram Mini Apps Development' },
            catalogName: { ru: 'TMA Решения', en: 'TMA Services' },
        },
    },
];

export function getService(id: ServicePageData['id']): ServicePageData {
    const svc = services.find((s) => s.id === id);
    if (!svc) throw new Error(`Unknown service: ${id}`);
    return svc;
}

export function getServiceBySlug(slug: string): ServicePageData {
    const svc = services.find((s) => s.slug === slug);
    if (!svc) throw new Error(`Unknown service slug: ${slug}`);
    return svc;
}

/**
 * Порядок услуг в навигации (Header, Services.astro) и их подписи.
 * Подписи остаются в ui.ts (nav_service_*), здесь — только порядок и slugs.
 */
export const NAV_ORDER: ServicePageData['id'][] = ['websites', 'shop', 'tma', 'ai', 'bots', 'saas'];

/**
 * Слаг страницы услуги по локали. ЕДИНЫЙ источник для:
 * навигации (Header), карточек (Services), переключателя языков
 * (LanguageSwitcher) и hreflang (BaseLayout).
 * Файлы страниц: ru → src/pages/ru/uslugi/<ru>/, en → src/pages/en/services/<en>/
 */
export const SERVICE_SLUGS: Record<ServicePageData['id'], Record<Lang, string>> = {
    websites: { ru: 'razrabotka-saitov', en: 'website-development' },
    shop: { ru: 'internet-magaziny', en: 'ecommerce-development' },
    tma: { ru: 'telegram-mini-apps', en: 'telegram-mini-apps' },
    ai: { ru: 'ai-integracii', en: 'ai-integration' },
    bots: { ru: 'razrabotka-botov-i-parserov', en: 'bot-and-scraper-development' },
    saas: { ru: 'saas-mvp', en: 'saas-mvp' },
};

/** Путь страницы услуги для локали: ru → /ru/uslugi/<slug>/, en → /en/services/<slug>/ */
export function servicePath(idOrSlug: string, lang: Lang): string {
    const svc = services.find((s) => s.id === idOrSlug || s.slug === idOrSlug);
    if (!svc) throw new Error(`Unknown service: ${idOrSlug}`);
    return lang === 'ru'
        ? `/ru/uslugi/${SERVICE_SLUGS[svc.id].ru}/`
        : `/en/services/${SERVICE_SLUGS[svc.id].en}/`;
}

/**
 * Пары слагов ru ↔ en для перекрёстных ссылок (переключатель языков, hreflang).
 */
export const SERVICE_SLUG_PAIRS: Record<string, string> = Object.fromEntries(
    Object.entries(SERVICE_SLUGS).map(([, slugs]) => [slugs.ru, slugs.en]),
);

/**
 * Ключи подписей услуг в шапке (src/i18n/ui.ts: nav_service_*).
 */
export const NAV_LABEL_KEYS: Record<ServicePageData['id'], string> = {
    websites: 'nav_service_web',
    shop: 'nav_service_shop',
    tma: 'nav_service_tma',
    ai: 'nav_service_ai',
    bots: 'nav_service_bots',
    saas: 'nav_service_saas',
};

/**
 * Ключи карточек услуг на главной (src/i18n/ui.ts).
 * Исторические имена (card1..card5, card_shop) сохранены для совместимости.
 */
export const CARD_UI_KEYS: Record<ServicePageData['id'], { h3: string; p: string }> = {
    bots: { h3: 'services_card2_h3', p: 'services_card2_p' },
    ai: { h3: 'services_card4_h3', p: 'services_card4_p' },
    saas: { h3: 'services_card3_h3', p: 'services_card3_p' },
    shop: { h3: 'services_card_shop_h3', p: 'services_card_shop_p' },
    websites: { h3: 'services_card1_h3', p: 'services_card1_p' },
    tma: { h3: 'services_card5_h3', p: 'services_card5_p' },
};
