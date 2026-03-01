import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { GoogleGenAI } from '@google/genai';
import * as dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({});
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper function to extract city block from string
const extractCityBlock = (content: string, city: string) => {
    const regex = new RegExp(`('${city}'|"${city}"): \\{([\\s\\S]*?)\\}(,?\\s*'|"?\\w+"?: \\{)`, 'g');
    let block = '';
    content.replace(regex, (match, p1, p2) => {
        block = p2;
        return match;
    });
    return block;
};

const generateContentForCity = async (cityKey: string, lang: 'ru' | 'en') => {
    const prompt = `
    You are an expert SEO copywriter. I need unique, high-quality, non-duplicate content for a web development agency's regional page targeting the city/region: "${cityKey}".
    Language: ${lang === 'ru' ? 'Russian' : 'English'}.
    
    The company is AVPdev. They professionalize in Next.js, Astro, React, robust backend systems (Node.js), custom Telegram Bots, and complex Data Scrapers (parsers).
    CRITICAL: Do NOT mention any specific prices, numbers, or budget estimates in your response.
    
    Return ONLY a valid JSON object with the following keys. DO NOT wrap in markdown \`\`\`json blocks.
    {
      "title": "SEO optimized meta title referencing ${cityKey} (max 60 chars)",
      "description": "SEO optimized meta description (max 160 chars)",
      "h1": "Strong, conversion-focused H1 headline",
      "p": "2-3 engaging sentences specifically referencing ${cityKey} business needs and our complex web app / bot / scraper expertise.",
      "benefits": [
        { "icon": "fa-robot", "title": "Benefit 1 short title", "desc": "Detailed benefit 1 explanation relevant to ${cityKey} and automation" },
        { "icon": "fa-cogs", "title": "Benefit 2 short title", "desc": "Detailed benefit 2 explanation relevant to web apps and performance" }
      ],
      "faq": [
        { "q": "FAQ 1 focused on custom web apps?", "a": "Detailed answer 1 without prices" },
        { "q": "FAQ 2 focused on telegram bots?", "a": "Detailed answer 2 without prices" },
        { "q": "FAQ 3 focused on fast SSG Astro sites?", "a": "Detailed answer 3 without prices" },
        { "q": "Local FAQ 4 referencing ${cityKey}?", "a": "Detailed answer 4 without prices" }
      ]
    }
    
    Make the text sound human, extremely professional, and distinct from generic "we make websites" copy. Mention the city name naturally multiple times.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                temperature: 0.7,
            }
        });

        const text = response.text || '{}';
        // Clean up markdown if model still included it
        const cleanJsonStr = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        return JSON.parse(cleanJsonStr);
    } catch (e) {
        console.error(`Error generating content for ${cityKey} (${lang}):`, e);
        return null;
    }
};

async function main() {
    const geoContentPath = resolve(__dirname, '../src/data/geo-content.ts');
    let content = readFileSync(geoContentPath, 'utf-8');

    const testCities = [
        'grodno', 'brest', 'bobruisk', 'baranovichi', 'polotsk', 'zhlobin',
        'rechitsa', 'svetlogorsk', 'slutsk', 'kobrin', 'slonim', 'volkovysk',
        'zhodino', 'smorgon', 'kalinkovichi', 'rogachev', 'gorki', 'novosibirsk',
        'yekaterinburg', 'kazan', 'krasnodar', 'sochi', 'warsaw', 'krakow',
        'berlin', 'munich', 'prague', 'vilnius', 'riga', 'tallinn', 'amsterdam',
        'almaty', 'astana', 'karaganda', 'shymkent', 'los-angeles', 'chicago',
        'miami', 'austin', 'san-francisco', 'paris', 'madrid', 'rome',
        'abu-dhabi', 'singapore', 'tokyo', 'toronto', 'vancouver', 'sydney',
        'melbourne', 'manchester', 'birmingham', 'edinburgh', 'glasgow', 'lyon',
        'marseille', 'toulouse', 'frankfurt', 'hamburg', 'cologne', 'stuttgart',
        'barcelona', 'valencia', 'seville', 'milan', 'naples', 'turin', 'wroclaw',
        'poznan', 'seattle', 'denver', 'boston', 'houston', 'atlanta', 'las-vegas',
        'washington', 'montreal', 'calgary', 'brisbane', 'perth', 'adelaide'
    ];

    for (const city of testCities) {
        console.log(`Processing ${city}...`);

        const block = extractCityBlock(content, city);
        if (!block) {
            console.log(`Could not find block for ${city}`);
            continue;
        }

        const hasRu = block.includes("'ru': {") || block.includes('"ru": {');
        const hasEn = block.includes("'en': {") || block.includes('"en": {');

        // Skip if already generated (has faq field)
        const isRuDone = block.includes('faq:') && (block.indexOf('faq:') > block.indexOf('ru'));

        if (hasRu && !isRuDone) {
            console.log(`Generating RU for ${city}...`);
            let ruData = null;
            let retries = 0;
            while (!ruData && retries < 3) {
                ruData = await generateContentForCity(city, 'ru');
                if (!ruData) {
                    retries++;
                    console.log(`Retry ${retries} for ${city} (RU) after 30s...`);
                    await new Promise(r => setTimeout(r, 30000));
                }
            }
            if (ruData) {
                // We need to replace the entire RU block for this city
                const fullCityRegex = new RegExp(`('${city}'|"${city}"): \\{([\\s\\S]*?)\\}(,?\\s*'|"?\\w+"?: \\{)`);
                content = content.replace(fullCityRegex, (match, p1, p2, p3) => {
                    let newP2 = p2;
                    const ruRegex = /('ru'|"ru"):\s*{([\s\S]*?)}(\s*,\s*'(en)'|\s*})/g;
                    newP2 = newP2.replace(ruRegex, (ruMatch, ru1, ru2, ru3) => {
                        // serialize the object back to JS code string
                        const stringified = JSON.stringify(ruData, null, 6)
                            .replace(/"([^"]+)":/g, '$1:') // remove quotes from keys
                            .replace(/\n}/g, '\n    }'); // fix indentation
                        return `${ru1}: ${stringified}${ru3}`;
                    });
                    return `${p1}: {${newP2}}${p3}`;
                });
            }
            // To prevent rate limits (5 RPM according to user table), wait 15 seconds between translations
            await new Promise(r => setTimeout(r, 15000));
        }

        const isEnDone = block.indexOf('faq:', block.indexOf('en')) !== -1;

        if (hasEn && !isEnDone) {
            console.log(`Generating EN for ${city}...`);
            let enData = null;
            let retries = 0;
            while (!enData && retries < 3) {
                enData = await generateContentForCity(city, 'en');
                if (!enData) {
                    retries++;
                    console.log(`Retry ${retries} for ${city} (EN) after 30s...`);
                    await new Promise(r => setTimeout(r, 30000));
                }
            }
            if (enData) {
                const fullCityRegex = new RegExp(`('${city}'|"${city}"): \\{([\\s\\S]*?)\\}(,?\\s*'|"?\\w+"?: \\{)`);
                content = content.replace(fullCityRegex, (match, p1, p2, p3) => {
                    let newP2 = p2;
                    const enRegex = /('en'|"en"):\s*{([\s\S]*?)}(\s*,\s*'(ru)'|\s*})/g;
                    newP2 = newP2.replace(enRegex, (enMatch, en1, en2, en3) => {
                        const stringified = JSON.stringify(enData, null, 6)
                            .replace(/"([^"]+)":/g, '$1:')
                            .replace(/\n}/g, '\n    }');
                        return `${en1}: ${stringified}${en3}`;
                    });
                    return `${p1}: {${newP2}}${p3}`;
                });
            }
            await new Promise(r => setTimeout(r, 15000));
        }

        // Save incrementally
        writeFileSync(geoContentPath, content, 'utf-8');
    }
    console.log('Done testing AI generation.');
}

main().catch(console.error);
