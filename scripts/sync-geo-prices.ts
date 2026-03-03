import { locations } from '../src/data/locations';
import { geoContent } from '../src/data/geo-content';
import { writeFileSync, readFileSync } from 'fs';
import path from 'path';

const BASE_PRICES = { astro: 250, next: 300, app: 750, bot: 50 };

async function getExchangeRates() {
    try {
        const usd = await fetch('https://api.nbrb.by/exrates/rates/431').then(res => res.json());
        const rub = await fetch('https://api.nbrb.by/exrates/rates/451').then(res => res.json());
        const kzt = await fetch('https://api.nbrb.by/exrates/rates/456').then(res => res.json());
        return { BYN: usd.Cur_OfficialRate, RUB: rub.Cur_OfficialRate / 100, KZT: kzt.Cur_OfficialRate / 1000 };
    } catch (e) { return { BYN: 2.87, RUB: 0.033, KZT: 0.0037 }; }
}

function roundPrice(val: number, step: number) {
    return Math.round(val / step) * step || step;
}

function getPriceDetails(type: 'astro' | 'next' | 'app' | 'bot', country: string, rates: any) {
    const usdPrice = BASE_PRICES[type];
    if (country === 'GB') return { val: usdPrice, sym: '£' };
    if (['DE', 'FR', 'ES', 'IT', 'PL', 'CZ', 'NL', 'LT', 'LV', 'EE'].includes(country)) return { val: usdPrice, sym: '€' };
    if (country === 'BY') return { val: roundPrice(usdPrice * rates.BYN, 10), sym: 'BYN' };
    if (country === 'RU') return { val: roundPrice((usdPrice * rates.BYN) / rates.RUB, 500), sym: 'руб.' };
    if (country === 'KZ') return { val: roundPrice((usdPrice * rates.BYN) / rates.KZT, 1000), sym: '₸' };
    return { val: usdPrice, sym: '$' };
}

function formatPrice(details: { val: number, sym: string }) {
    return ['$', '€', '£'].includes(details.sym) ? `${details.sym}${details.val}` : `${details.val} ${details.sym}`;
}

function generateFaq(loc: any, lang: 'ru' | 'en', rates: any) {
    const p = {
        astro: formatPrice(getPriceDetails('astro', loc.country, rates)),
        next: formatPrice(getPriceDetails('next', loc.country, rates)),
        app: formatPrice(getPriceDetails('app', loc.country, rates)),
        bot: formatPrice(getPriceDetails('bot', loc.country, rates))
    };

    if (lang === 'ru') {
        return [
            { q: `Сколько стоит разработка сайта в ${loc.name_ru || loc.name_en}?`, a: `Цены начинаются от ${p.astro} за лэндинг на Astro и от ${p.next} за сайт на Next.js. Сложные системы (CRM, ERP) — от ${p.app}.` },
            { q: "Как быстро вы запускаете проекты?", a: `Лэндинг на Astro мы запускаем за 7–14 дней. Полноценный сайт на Next.js занимает 2–4 недели, а сложные решения — от 1 месяца.` },
            { q: "Разрабатываете ли вы Telegram-ботов?", a: `Да, мы создаем умных ботов для автоматизации бизнеса и Mini Apps. Стоимость — от ${p.bot} в зависимости от сложности.` },
            { q: "Вы предоставляете поддержку после запуска?", a: "Да, каждый проект включает 12 месяцев технической поддержки, мониторинг доступности и консультации специалистов." },
            { q: "Какой технологический стек вы используете?", a: "Наш стек: Next.js и React для приложений, Astro для быстрых сайтов и Node.js для бэкенда. Это гарантирует максимальную производительность." }
        ];
    } else {
        return [
            { q: `What is the cost of web development in ${loc.name_en}?`, a: `Pricing starts from ${p.astro} for Astro landing pages and ${p.next} for Next.js websites. Custom web applications start from ${p.app}.` },
            { q: "What is your project timeline?", a: "Astro landing pages take 7–14 days. Full Next.js websites take 2–4 weeks, and complex custom systems take 4–12 weeks." },
            { q: "Do you develop Telegram bots and Mini Apps?", a: `Yes, we build intelligent bots for business automation. Prices start from ${p.bot} depending on the requirements.` },
            { q: "Do you provide post-launch support?", a: "Yes, we offer 12 months of technical support after launch, including bug fixes, uptime monitoring, and consultations." },
            { q: "What tech stack do you use?", a: "We specialize in Next.js, React, Node.js, and Astro. This stack ensures the best performance, scalability, and SEO results." }
        ];
    }
}

async function sendTelegramNotification(rates: any, isInitial: boolean) {
    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;
    const TOPIC_ID = process.env.TOPIC_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
        console.log('⚠️  TG notification skipped (no BOT_TOKEN/CHAT_ID in env)');
        return;
    }

    const now = new Date().toLocaleString('ru-RU', {
        timeZone: 'Europe/Minsk',
        day: '2-digit', month: '2-digit', year: '2-digit',
        hour: '2-digit', minute: '2-digit'
    });

    const byPrices = {
        astro: formatPrice(getPriceDetails('astro', 'BY', rates)),
        next: formatPrice(getPriceDetails('next', 'BY', rates)),
        app: formatPrice(getPriceDetails('app', 'BY', rates)),
        bot: formatPrice(getPriceDetails('bot', 'BY', rates)),
    };
    const ruPrices = {
        astro: formatPrice(getPriceDetails('astro', 'RU', rates)),
        app: formatPrice(getPriceDetails('app', 'RU', rates)),
    };
    const kzPrices = {
        astro: formatPrice(getPriceDetails('astro', 'KZ', rates)),
        app: formatPrice(getPriceDetails('app', 'KZ', rates)),
    };

    const msg = [
        `<b>💰 Гео-цены обновлены (НБРБ)</b>`,
        `🕒 <i>Дата обновления: ${now}</i>`,
        ``,
        `<b>Курсы:</b>`,
        `USD/BYN: ${rates.BYN}`,
        `BYN/100RUB: ${(rates.RUB * 100).toFixed(4)}`,
        `BYN/1000KZT: ${(rates.KZT * 1000).toFixed(4)}`,
        ``,
        `<b>Пример цен на сайте:</b>`,
        `🇧🇾 BY: Astro ${byPrices.astro} | Next ${byPrices.next} | App ${byPrices.app} | Bot ${byPrices.bot}`,
        `🇷🇺 RU: Astro ${ruPrices.astro} | App ${ruPrices.app}`,
        `🇰🇿 KZ: Astro ${kzPrices.astro} | App ${kzPrices.app}`,
        `🇬🇧 UK: £250 | 🇪🇺 EU: €250 | 🇺🇸 US: $250`,
        ``,
        `Обновлено ${locations.length} городов ✅`,
    ].join('\n');

    try {
        // 1. Try to find if there is a pinned message by checking chat info
        const chatRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getChat?chat_id=${CHAT_ID}`).then(r => r.json());
        const pinnedId = chatRes?.result?.pinned_message?.message_id;

        let editSuccess = false;
        if (pinnedId) {
            // Try to edit the pinned message
            const editRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/editMessageText`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    message_id: pinnedId,
                    text: msg,
                    parse_mode: 'HTML'
                }),
            }).then(r => r.json());

            if (editRes.ok) {
                console.log('📩 TG message updated (Edited pinned message)');
                editSuccess = true;
            }
        }

        if (!editSuccess) {
            // 2. If no pinned message or edit failed (e.g. pinned message isn't ours), send NEW and PIN
            const sendRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: msg,
                    parse_mode: 'HTML',
                    ...(TOPIC_ID && { message_thread_id: TOPIC_ID })
                }),
            }).then(r => r.json());

            if (sendRes.ok) {
                const messageId = sendRes.result.message_id;
                console.log('📩 TG new message sent');

                // Pin the new message
                await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/pinChatMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: CHAT_ID,
                        message_id: messageId,
                        disable_notification: true
                    }),
                });
            } else {
                console.error('TG send error:', sendRes);
            }
        }
    } catch (e) {
        console.error('TG communication failed:', e);
    }
}

async function run() {
    const geoPath = path.join(process.cwd(), 'src/data/geo-content.ts');
    let oldContent = "";
    try { oldContent = readFileSync(geoPath, 'utf-8'); } catch (e) { }

    const rates = await getExchangeRates();
    const newContentObj: Record<string, any> = {};

    for (const loc of locations) {
        const existing = geoContent[loc.slug] || {};
        newContentObj[loc.slug] = {};

        if (existing.ru || loc.name_ru) {
            newContentObj[loc.slug].ru = {
                ...existing.ru,
                faq: generateFaq(loc, 'ru', rates)
            };
        }
        if (existing.en) {
            newContentObj[loc.slug].en = {
                ...existing.en,
                faq: generateFaq(loc, 'en', rates)
            };
        }
    }

    const output = `/**
 * ТИПИЗИРОВАННЫЙ КОНТЕНТ ДЛЯ ГЕО-СТРАНИЦ 
 * (Автогенерируемый файл, не редактируйте вручную!)
 */
export const geoContent: Record<string, any> = ${JSON.stringify(newContentObj, null, 2)};`;

    // Only update and notify if content HAS CHANGED
    // We compare without indentation/spaces to be sure
    const isDifferent = output.replace(/\s/g, '') !== oldContent.replace(/\s/g, '');

    console.log(`Checking env: BOT_TOKEN=${!!process.env.BOT_TOKEN}, CHAT_ID=${!!process.env.CHAT_ID}`);

    if (isDifferent || true) { // FORCE UPDATE FOR TESTING
        writeFileSync(geoPath, output);
        console.log('✅ REGENERATION COMPLETE: Prices updated.');
        await sendTelegramNotification(rates, false);
    } else {
        console.log('ℹ️  No price changes detected. Skipping file update and TG notification.');
    }
}
run();
