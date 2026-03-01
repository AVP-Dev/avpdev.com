import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Parse the current geo-content to extract keys and existing structures
const geoContentPath = resolve(__dirname, '../src/data/geo-content.ts');
let content = readFileSync(geoContentPath, 'utf-8');

const citiesToUpdate = [
  'mogilev', 'vitebsk', 'grodno', 'brest', 'bobruisk', 'baranovichi',
  'polotsk', 'zhlobin', 'rechitsa', 'svetlogorsk', 'slutsk',
  'kobrin', 'slonim', 'volkovysk', 'zhodino', 'smorgon', 'kalinkovichi',
  'rogachev', 'gorki', 'novosibirsk', 'yekaterinburg',
  'kazan', 'krasnodar', 'sochi', 'warsaw', 'krakow', 'berlin', 'munich',
  'prague', 'vilnius', 'riga', 'tallinn', 'amsterdam', 'almaty', 'astana',
  'karaganda', 'shymkent', 'los-angeles', 'chicago', 'miami',
  'austin', 'san-francisco', 'paris', 'madrid', 'rome',
  'abu-dhabi', 'singapore', 'tokyo', 'toronto', 'vancouver', 'sydney',
  'melbourne', 'manchester', 'birmingham', 'edinburgh', 'glasgow', 'lyon',
  'marseille', 'toulouse', 'frankfurt', 'hamburg', 'cologne', 'stuttgart',
  'barcelona', 'valencia', 'seville', 'milan', 'naples', 'turin', 'wroclaw',
  'poznan', 'seattle', 'denver', 'boston', 'houston', 'atlanta', 'las-vegas',
  'washington', 'montreal', 'calgary', 'brisbane', 'perth', 'adelaide'
];

// We create a pool of varied benefits and faqs to mix and match so cities don't look identical
const ruBenefitsPool = [
   { icon: 'fa-cubes', title: 'Широкий Стек', desc: 'Разрабатываем не только сайты, но и сложные SPA на Next.js, Astro, а также ботов и парсеры данных.' },
   { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'Проектируем отказоустойчивые веб-приложения и API любой сложности под потребности вашего бизнеса.' },
   { icon: 'fa-robot', title: 'Автоматизация & Боты', desc: 'Автоматизируем бизнес-процессы через разработку умных Telegram-ботов и систем парсинга.' },
   { icon: 'fa-code', title: 'Современные технологии', desc: 'Используем передовые фреймворки (Astro, React, Vue) для максимальной производительности интерфейсов.' }
];

const ruFaqPool = [
   { q: 'Какие технологии вы используете в разработке?', a: 'Наш стек очень широк: от быстрых SSG сайтов на Astro до мощных enterprise систем на Next.js и Node.js. Мы также разрабатываем парсеры и ботов.' },
   { q: 'Вы делаете только классические сайты?', a: 'Нет, мы специализируемся на веб-приложениях (Web Apps), PWA, Telegram-ботах и сложных скриптах для сбора данных (парсерах).' },
   { q: 'Как происходит оценка стоимости проекта?', a: 'Стоимость формируется индивидуально на основе технического задания. Сложные веб-приложения и простые лендинги оцениваются исходя из затрачиваемых часов.' },
   { q: 'Возможна ли разработка уникального парсера?', a: 'Да, мы создаем кастомные решения для автоматического сбора и обработки данных с любых веб-ресурсов.' }
];

const enBenefitsPool = [
   { icon: 'fa-cubes', title: 'Extensive Tech Stack', desc: 'We build more than just websites: complex SPAs on Next.js, Astro, plus custom bots and web scrapers.' },
   { icon: 'fa-server', title: 'Backend & Web Apps', desc: 'We architect fault-tolerant web applications and complex APIs tailored to your business needs.' },
   { icon: 'fa-robot', title: 'Automation & Bots', desc: 'We automate business processes by developing smart Telegram bots and custom scraping systems.' },
   { icon: 'fa-code', title: 'Modern Technologies', desc: 'We utilize cutting-edge frameworks (Astro, React, Vue) for maximum UI performance.' }
];

const enFaqPool = [
   { q: 'What technologies do you use in development?', a: 'Our stack encompasses fast SSG sites on Astro to robust enterprise systems on Next.js. We also develop parsers and bots.' },
   { q: 'Do you only build traditional websites?', a: 'No, we specialize in high-load Web Apps, PWAs, Telegram bots, and complex data collection scripts (scrapers).' },
   { q: 'How is the project cost estimated?', a: 'Pricing is calculated individually based on the technical specification. Effort varies greatly between a simple landing page and a complex web app.' },
   { q: 'Is it possible to develop a custom data scraper?', a: 'Yes, we create tailored solutions for automated data extraction and processing from diverse internet resources.' }
];

function getRandomItems(arr: any[], count: number) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

citiesToUpdate.forEach(city => {
  const cityRegex = new RegExp(`('${city}'|"${city}"): \\{([\\s\\S]*?)\\}(,?\\s*'|"?\\w+"?: \\{)`, 'g');
  
  content = content.replace(cityRegex, (match, p1, p2, p3) => {
    let modifiedP2 = p2;

    modifiedP2 = modifiedP2.replace(/('ru'|"ru"):\s*{([\s\S]*?)}/g, (ruMatch, ru1, ru2) => {
      // Always replace existing benefits and faqs to apply the new varied content 
      // First strip old ones
      let cleanedRu2 = ru2.replace(/,\s*benefits:\s*\[[\s\S]*?\],\s*faq:\s*\[[\s\S]*?\]/g, '');
      cleanedRu2 = cleanedRu2.replace(/,\s*benefits:\s*\[[\s\S]*?\]/g, '');
      cleanedRu2 = cleanedRu2.replace(/,\s*faq:\s*\[[\s\S]*?\]/g, '');

      const selBenefits = getRandomItems(ruBenefitsPool, 2);
      const selFaqs = getRandomItems(ruFaqPool, 2);
      
      const ruAdditions = `,\n        benefits: [\n          { icon: '${selBenefits[0].icon}', title: '${selBenefits[0].title}', desc: '${selBenefits[0].desc}' },\n          { icon: '${selBenefits[1].icon}', title: '${selBenefits[1].title}', desc: '${selBenefits[1].desc}' }\n        ],\n        faq: [\n          { q: '${selFaqs[0].q}', a: '${selFaqs[0].a}' },\n          { q: '${selFaqs[1].q}', a: '${selFaqs[1].a}' }\n        ]`;
      
      return `${ru1}: {${cleanedRu2.replace(/\n\s*$/, '')}${ruAdditions}\n      }`;
    });

    modifiedP2 = modifiedP2.replace(/('en'|"en"):\s*{([\s\S]*?)}/g, (enMatch, en1, en2) => {
      let cleanedEn2 = en2.replace(/,\s*benefits:\s*\[[\s\S]*?\],\s*faq:\s*\[[\s\S]*?\]/g, '');
      cleanedEn2 = cleanedEn2.replace(/,\s*benefits:\s*\[[\s\S]*?\]/g, '');
      cleanedEn2 = cleanedEn2.replace(/,\s*faq:\s*\[[\s\S]*?\]/g, '');

      const selBenefits = getRandomItems(enBenefitsPool, 2);
      const selFaqs = getRandomItems(enFaqPool, 2);
      
      const enAdditions = `,\n        benefits: [\n          { icon: '${selBenefits[0].icon}', title: '${selBenefits[0].title}', desc: '${selBenefits[0].desc}' },\n          { icon: '${selBenefits[1].icon}', title: '${selBenefits[1].title}', desc: '${selBenefits[1].desc}' }\n        ],\n        faq: [\n          { q: '${selFaqs[0].q}', a: '${selFaqs[0].a}' },\n          { q: '${selFaqs[1].q}', a: '${selFaqs[1].a}' }\n        ]`;

      return `${en1}: {${cleanedEn2.replace(/\n\s*$/, '')}${enAdditions}\n      }`;
    });

    return `${p1}: {${modifiedP2}}${p3}`;
  });
});

writeFileSync(geoContentPath, content, 'utf-8');
console.log('Successfully applied varied static unique content, stripped prices, added stack info.');
