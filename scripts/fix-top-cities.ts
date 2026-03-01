import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const geoContentPath = resolve(__dirname, '../src/data/geo-content.ts');
let content = readFileSync(geoContentPath, 'utf-8');

// MINSK
content = content.replace(/'minsk':\s*\{[\s\S]*?\},?\n  'gomel'/g, 
`'minsk': {
    'ru': {
      title: 'Создание сайтов в Минске | ПРОфессиональная веб-разработка',
      description: 'Заказать разработку сайта в Минске. Быстрые, современные и продающие сайты. AVPdev – ваш надежный ИТ партнер в Беларуси.',
      h1: 'Разработка сайтов и Web-Apps в Минске',
      p: 'Ищете надежного партнера для создания веб-сервиса в столице Беларуси? Мы предлагаем полный спектр услуг: от быстрых лендингов до сложных корпоративных порталов на Astro и Next.js, а также разработку парсеров и ботов.',
      benefits: [
        { icon: 'fa-rocket', title: 'Высокая конверсия и Скорость', desc: 'Проектируем UX/UI с фокусом на продажи и гарантируем мгновенную загрузку благодаря современному стеку.' },
        { icon: 'fa-robot', title: 'Индивидуальные решения', desc: 'Автоматизируем ваш бизнес с помощью нестандартных решений: кастомные Telegram-боты и системы веб-скрапинга.' }
      ],
      faq: [
        { q: 'Возможна ли разработка не просто сайта, а сложного веб-приложения?', a: 'Да, мы специализируемся на высоконагруженных Web-приложениях уровня Enterprise, базах данных и API-интеграциях.' },
        { q: 'Как происходит оценка стоимости разработки?', a: 'Каждый проект уникален. Итоговая стоимость формируется после глубокой оценки технического задания или серии брифингов.' }
      ]
    },
    'en': {
      title: 'Website Development in Minsk | Full-Stack Web Services',
      description: 'Order website development in Minsk. We create fast, modern, and complex web apps for business. Full-cycle services from AVPdev.',
      h1: 'Web & App Development in Minsk',
      p: 'Looking for a reliable tech partner in Belarus? We offer a full range of web development services in Minsk, from fast corporate portals on Astro to complex SaaS platforms on Next.js, including bots and scrapers.',
      benefits: [
        { icon: 'fa-rocket', title: 'High Conversion & Speed', desc: 'We design UX/UI focusing on sales and guarantee instant load times backed by our modern tech stack.' },
        { icon: 'fa-robot', title: 'Custom Automation', desc: 'We automate your business workflows using custom solutions like Telegram bots and advanced web scraping systems.' }
      ],
      faq: [
        { q: 'Do you build complex web applications, not just websites?', a: 'Yes, we specialize in high-load Enterprise Web applications, complex databases, and robust API integrations.' },
        { q: 'How do you estimate development costs?', a: 'Every project is unique. Final pricing is established after a thorough evaluation of your technical specifications and requirements.' }
      ]
    }
  },
  'gomel'`);


// GOMEL
content = content.replace(/'gomel':\s*\{[\s\S]*?\},?\n  'mogilev'/g,
`'gomel': {
    'ru': {
      title: 'Разработка сайтов в Гомеле | Локальное IT-решение для бизнеса',
      description: 'Создание продающих сайтов в Гомеле. Разрабатываем веб-приложения, боты и сложные B2B порталы для предприятий.',
      h1: 'Web-студия AVPdev в Гомеле',
      p: 'Гомельский бизнес требует современных подходов. Мы специализируемся на разработке веб-приложений, парсеров и корпоративных платформ, которые решают сложные технические задачи вашего бизнеса.',
      benefits: [
        { icon: 'fa-cubes', title: 'Широкий технологический стек', desc: 'Мы разрабатываем не только сайты, но и веб-приложения на Next.js, быстрые порталы на Astro, а также ботов и скрипты сбора данных.' },
        { icon: 'fa-industry', title: 'Фокус на В2В и логистику', desc: 'Учитываем специфику промышленного региона, создавая платформы для заводов, логистики и ритейла.' }
      ],
      faq: [
        { q: 'Возможна ли разработка кастомного парсера на заказ?', a: 'Да, мы специализируемся на создании высоконагруженных скриптов и парсеров для автоматического сбора данных из любых источников.' },
        { q: 'Как оценивается бюджет проекта?', a: 'Стоимость зависит исключительно от объема работ и выбранного технологического стека. Мы предоставляем прозрачную смету после изучения задачи.' }
      ]
    },
    'en': {
      title: 'Web Development in Gomel | Custom IT Solutions',
      description: 'Creating high-converting websites in Gomel. We develop web apps, bots, and complex B2B portals for Gomel enterprises.',
      h1: 'AVPdev Web Studio in Gomel',
      p: 'Gomel businesses require modern approaches. We specialize in developing web applications, scrapers, and corporate platforms that solve your difficult technical challenges locally and internationally.',
      benefits: [
        { icon: 'fa-cubes', title: 'Modern Tech Stack', desc: 'We build more than just sites. We engineer complex web applications on Next.js, lightning-fast portals on Astro, along with bots and scrapers.' },
        { icon: 'fa-industry', title: 'B2B & Manufacturing Focus', desc: 'We understand the industrial specificities of the region, creating robust platforms for manufacturing and logistics.' }
      ],
      faq: [
        { q: 'Is it possible to order a custom data scraper?', a: 'Yes, we specialize in creating custom high-load scripts and scrapers for automated data extraction from diverse sources.' },
        { q: 'How is the project budget estimated?', a: 'Pricing depends entirely on the scope of work and the chosen technology stack. We provide a transparent quote after analyzing the task.' }
      ]
    }
  },
  'mogilev'`);


// MOSCOW
content = content.replace(/'moscow':\s*\{[\s\S]*?\},?\n  'saint-petersburg'/g,
`'moscow': {
    'ru': {
      title: 'Разработка сайтов в Москве | Веб-разработка полного цикла',
      description: 'Разработка масштабируемых веб-решений, ботов и парсеров для бизнеса в Москве. Индивидуальный стек (Astro/Next.js).',
      h1: 'Создание сайтов и Web-App в Москве',
      p: 'Завоевывайте столичный рынок вместе с AVPdev. Мы предлагаем высококлассные услуги по разработке сложных решений в Москве: от интеграции Telegram-ботов до масштабируемых PWA и SPA-платформ.',
      benefits: [
        { icon: 'fa-robot', title: 'Автоматизация бизнес-процессов', desc: 'Мы разрабатываем сложные парсеры данных и многоуровневых Telegram-ботов для нужд московского рынка.' },
        { icon: 'fa-cogs', title: 'Топовые фреймворки', desc: 'Работаем с лучшими из лучших — Next.js для динамики и масштаба, Astro для феноменальной скорости загрузки в SEO.' }
      ],
      faq: [
        { q: 'В чем ваше отличие от обычных веб-студий?', a: 'Наш спектр услуг шире. Помимо сайтов, мы с нуля пишем сложные веб-приложения, API, ботов и интеграционные шлюзы.' },
        { q: 'Как происходит ценообразование?', a: 'Мы работаем с прозрачными сметами. Цена зависит от требуемого стека, затрачиваемых часов и сложности бизнес-логики.' }
      ]
    },
    'en': {
      title: 'Website Development in Moscow | Full-Cycle Web Services',
      description: 'Order scalable web solutions, bots, and scrapers in Moscow. Professional business development using custom stacks (Astro/Next.js).',
      h1: 'Web & App Creation in Moscow',
      p: 'Conquer the capital\\'s market with AVPdev. We offer high-class services for developing complex solutions in Moscow: from integrating customized Telegram bots to massive scalable PWA and SPA platforms.',
      benefits: [
        { icon: 'fa-robot', title: 'Business Process Automation', desc: 'We develop complex data scrapers and multi-level Telegram bots to meet the sophisticated demands of the Moscow market.' },
        { icon: 'fa-cogs', title: 'Top-tier Frameworks', desc: 'We utilize the best: Next.js for dynamism and limitless scale, Astro for phenomenal loading speed and SEO.' }
      ],
      faq: [
        { q: 'What makes you different from regular web studios?', a: 'Our service range is broader. Besides traditional sites, we build complex web applications, APIs, bots, and integration gateways from scratch.' },
        { q: 'How does pricing work?', a: 'We provide transparent estimates. The price depends on the required tech stack, estimated hours, and the complexity of the business logic.' }
      ]
    }
  },
  'saint-petersburg'`);

writeFileSync(geoContentPath, content, 'utf-8');
console.log('Successfully updated Minsk, Moscow, Gomel with modified scope and hidden prices.');
