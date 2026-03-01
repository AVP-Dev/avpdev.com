import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Parse the current geo-content to extract keys and existing structures
const geoContentPath = resolve(__dirname, '../src/data/geo-content.ts');
let content = readFileSync(geoContentPath, 'utf-8');

// A list of cities that might be missing the new arrays
const citiesToUpdate = [
  'gomel', 'mogilev', 'vitebsk', 'grodno', 'brest', 'bobruisk', 'baranovichi',
  'borisov', 'pinsk', 'orsha', 'mozyr', 'lida', 'soligorsk', 'novopolotsk',
  'molodechno', 'polotsk', 'zhlobin', 'rechitsa', 'svetlogorsk', 'slutsk',
  'kobrin', 'slonim', 'volkovysk', 'zhodino', 'smorgon', 'kalinkovichi',
  'rogachev', 'gorki', 'saint-petersburg', 'novosibirsk', 'yekaterinburg',
  'kazan', 'krasnodar', 'sochi', 'warsaw', 'krakow', 'berlin', 'munich',
  'prague', 'vilnius', 'riga', 'tallinn', 'amsterdam', 'almaty', 'astana',
  'karaganda', 'shymkent', 'new-york', 'los-angeles', 'chicago', 'miami',
  'austin', 'san-francisco', 'london', 'paris', 'madrid', 'rome', 'dubai',
  'abu-dhabi', 'singapore', 'tokyo', 'toronto', 'vancouver', 'sydney',
  'melbourne', 'manchester', 'birmingham', 'edinburgh', 'glasgow', 'lyon',
  'marseille', 'toulouse', 'frankfurt', 'hamburg', 'cologne', 'stuttgart',
  'barcelona', 'valencia', 'seville', 'milan', 'naples', 'turin', 'wroclaw',
  'poznan', 'seattle', 'denver', 'boston', 'houston', 'atlanta', 'las-vegas',
  'washington', 'montreal', 'calgary', 'brisbane', 'perth', 'adelaide'
];

citiesToUpdate.forEach(city => {
  // Regex to find the city block
  const cityRegex = new RegExp(`('${city}'|"${city}"): \\{([\\s\\S]*?)\\}(,?\\s*'|"?\\w+"?: \\{)`, 'g');

  content = content.replace(cityRegex, (match, p1, p2, p3) => {
    // If it already has benefits or faq, skip
    if (p2.includes('benefits:') || p2.includes('faq:')) return match;

    let modifiedP2 = p2;

    const ruAdditions = `,\n        benefits: [\n          { icon: 'fa-rocket', title: 'Быстрый запуск', desc: 'Запускаем MVP проекты в кратчайшие сроки, экономя ваше время и бюджет.' },\n          { icon: 'fa-search', title: 'SEO Оптимизация', desc: 'Все сайты разрабатываются с учетом актуальных алгоритмов поисковых систем Google и Яндекс.' }\n        ],\n        faq: [\n          { q: 'Сколько времени занимает создание сайта?', a: 'В среднем от 2 до 6 недель в зависимости от сложности, дизайна и объема контента.' },\n          { q: 'Вы предоставляете поддержку после разработки?', a: 'Да, после запуска сайта мы берем проект на техническое обслуживание и гарантируем его бесперебойную работу.' }\n        ]`;

    const enAdditions = `,\n        benefits: [\n          { icon: 'fa-rocket', title: 'Fast Launch', desc: 'We launch MVP projects in the shortest possible time, saving your budget.' },\n          { icon: 'fa-search', title: 'SEO Optimization', desc: 'All websites are developed taking into account current search engine algorithms for better ranking.' }\n        ],\n        faq: [\n          { q: 'How long does it take to build a website?', a: 'On average from 2 to 6 weeks depending on complexity, design and content.' },\n          { q: 'Do you provide support after launch?', a: 'Yes, we offer technical maintenance to guarantee smooth and continuous operation of all our projects.' }\n        ]`;

    modifiedP2 = modifiedP2.replace(/('ru'|"ru"):\s*{([\s\S]*?)}/g, (ruMatch, ru1, ru2) => {
      // Don't add twice
      if (ru2.includes('benefits:')) return ruMatch;
      return `${ru1}: {${ru2.replace(/\n\s*$/, '')}${ruAdditions}\n      }`;
    });

    modifiedP2 = modifiedP2.replace(/('en'|"en"):\s*{([\s\S]*?)}/g, (enMatch, en1, en2) => {
      if (en2.includes('benefits:')) return enMatch;
      return `${en1}: {${en2.replace(/\n\s*$/, '')}${enAdditions}\n      }`;
    });

    return `${p1}: {${modifiedP2}}${p3}`;
  });
});

writeFileSync(geoContentPath, content, 'utf-8');
console.log('Successfully updated geo-content.ts with generic SEO data for remaining cities.');
