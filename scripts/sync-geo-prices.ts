import { locations } from '../src/data/locations';
import { BASE_PRICES } from '../src/data/services';
import { writeFileSync, readFileSync, readdirSync } from 'fs';
import path from 'path';

async function getExchangeRates() {
    try {
        const usdRes = await fetch('https://api.nbrb.by/exrates/rates/431');
        if (!usdRes.ok) throw new Error(`NBRB USD fetch failed: ${usdRes.status}`);
        const usd = await usdRes.json() as any;
        const rubRes = await fetch('https://api.nbrb.by/exrates/rates/456');
        if (!rubRes.ok) throw new Error(`NBRB RUB fetch failed: ${rubRes.status}`);
        const rub = await rubRes.json() as any;
        const kztRes = await fetch('https://api.nbrb.by/exrates/rates/459');
        if (!kztRes.ok) throw new Error(`NBRB KZT fetch failed: ${kztRes.status}`);
        const kzt = await kztRes.json() as any;
        if (typeof usd.Cur_OfficialRate !== 'number' || typeof rub.Cur_OfficialRate !== 'number' || typeof kzt.Cur_OfficialRate !== 'number') {
            throw new Error('Invalid Cur_OfficialRate type from NBRB');
        }
        if (isNaN(usd.Cur_OfficialRate) || isNaN(rub.Cur_OfficialRate) || isNaN(kzt.Cur_OfficialRate)) {
            throw new Error('NaN rate from NBRB');
        }
        return { BYN: usd.Cur_OfficialRate, RUB: rub.Cur_OfficialRate / 100, KZT: kzt.Cur_OfficialRate / 1000 };
    } catch (e) {
        console.warn('⚠️  NBRB fetch failed, using fallback rates:', (e as Error).message);
        return { BYN: 3.0, RUB: 0.036, KZT: 0.0065 };
    }
}

function roundPrice(val: number, step: number) {
    return Math.round(val / step) * step || step;
}

function getPriceDetails(type: 'astro' | 'next' | 'app' | 'bot', country: string, rates: any) {
    const usdPrice = BASE_PRICES[type];
    if (country === 'GB') return { val: usdPrice, sym: '£' };
    if (country === 'PL') return { val: usdPrice, sym: 'zł' };
    if (country === 'CZ') return { val: usdPrice, sym: 'Kč' };
    if (['DE', 'FR', 'ES', 'IT', 'NL', 'LT', 'LV', 'EE'].includes(country)) return { val: usdPrice, sym: '€' };
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
            { q: `Сколько стоит разработка сайта в ${loc.name_ru || loc.name_en}?`, a: `Цены начинаются от ${p.astro} за лэндинг на Astro и от ${p.next} за сайт на Next.js. Сложные системы (CRM, ERP) — от ${p.app} и выше.` },
            { q: "Как быстро вы запускаете проекты?", a: `Лэндинг на Astro мы запускаем за 7–14 дней. Полноценный сайт на Next.js занимает 2–4 недели, а сложные решения — от 1 месяца.` },
            { q: "Разрабатываете ли вы Telegram-ботов?", a: `Да, мы создаем умных ботов для автоматизации бизнеса и Mini Apps. Стоимость — от ${p.bot} в зависимости от сложности.` },
            { q: "Вы предоставляете поддержку после запуска?", a: "Да. Гарантия начинается от 1 месяца после запуска — точный срок зависит от объёма и стоимости проекта: чем крупнее проект, тем длиннее гарантия. В гарантию входит исправление багов в сданном функционале. Дальше — техническая поддержка и развитие на отдельных условиях: мониторинг доступности, обновления безопасности и новые доработки." },
            { q: "Какой технологический стек вы используете?", a: "Фронтенд: Astro и Next.js на React с TypeScript и Tailwind CSS. Бэкенд и автоматизация: Node.js и Bun; Python — для парсеров и скриптов; Go — для высоконагруженных систем. Данные: PostgreSQL, Redis, Drizzle ORM, развёртывание в Docker. Стек подбираем под задачу, а не наоборот." }
        ];
    } else {
        return [
            { q: `What is the cost of web development in ${loc.name_en}?`, a: `Pricing starts from ${p.astro} for Astro landing pages and ${p.next} for Next.js websites. Custom web applications start from ${p.app}.` },
            { q: "What is your project timeline?", a: "Astro landing pages take 7–14 days. Full Next.js websites take 2–4 weeks, and complex custom systems take 4–12 weeks." },
            { q: "Do you develop Telegram bots and Mini Apps?", a: `Yes, we build intelligent bots for business automation. Prices start from ${p.bot} depending on the requirements.` },
            { q: "Do you provide post-launch support?", a: "Yes. The warranty starts at 1 month after launch — the exact term depends on the project's scope and budget: larger projects come with a longer warranty period. It covers bug fixes in delivered functionality. Beyond that, ongoing technical support and development are available on separate terms: uptime monitoring, security updates, and new features." },
            { q: "What tech stack do you use?", a: "Frontend: Astro and Next.js built on React with TypeScript and Tailwind CSS. Backend and automation: Node.js and Bun; Python for parsers and scripts; Go for high-load systems. Data: PostgreSQL, Redis, Drizzle ORM, deployed in Docker. We pick the stack for the task, not the other way around." }
        ];
    }
}

async function sendTelegramNotification(rates: any) {
    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;
    const TOPIC_ID = process.env.TOPIC_ID;

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
        next: formatPrice(getPriceDetails('next', 'RU', rates)),
        app: formatPrice(getPriceDetails('app', 'RU', rates)),
        bot: formatPrice(getPriceDetails('bot', 'RU', rates)),
    };
    const kzPrices = {
        astro: formatPrice(getPriceDetails('astro', 'KZ', rates)),
        next: formatPrice(getPriceDetails('next', 'KZ', rates)),
        app: formatPrice(getPriceDetails('app', 'KZ', rates)),
        bot: formatPrice(getPriceDetails('bot', 'KZ', rates)),
    };
    const gbPrices = {
        astro: formatPrice(getPriceDetails('astro', 'GB', rates)),
        next: formatPrice(getPriceDetails('next', 'GB', rates)),
        app: formatPrice(getPriceDetails('app', 'GB', rates)),
        bot: formatPrice(getPriceDetails('bot', 'GB', rates)),
    };
    const euPrices = {
        astro: formatPrice(getPriceDetails('astro', 'DE', rates)),
        next: formatPrice(getPriceDetails('next', 'DE', rates)),
        app: formatPrice(getPriceDetails('app', 'DE', rates)),
        bot: formatPrice(getPriceDetails('bot', 'DE', rates)),
    };
    const usPrices = {
        astro: formatPrice(getPriceDetails('astro', 'US', rates)),
        next: formatPrice(getPriceDetails('next', 'US', rates)),
        app: formatPrice(getPriceDetails('app', 'US', rates)),
        bot: formatPrice(getPriceDetails('bot', 'US', rates)),
    };
    const plPrice = formatPrice(getPriceDetails('astro', 'PL', rates));
    const czPrice = formatPrice(getPriceDetails('astro', 'CZ', rates));

    const msg = [
        `<b>💰 Гео-цены обновлены (Astro Collections)</b>`,
        `🕒 <i>Дата обновления: ${now}</i>`,
        ``,
        `<b>Курсы:</b>`,
        `USD/BYN: ${rates.BYN.toFixed(4)}`,
        `BYN/100RUB: ${(rates.RUB * 100).toFixed(4)}`,
        `BYN/1000KZT: ${(rates.KZT * 1000).toFixed(4)}`,
        ``,
        `<b>Пример цен на сайте:</b>`,
        `🇧🇾 BY: Astro ${byPrices.astro} | Next ${byPrices.next} | App ${byPrices.app} | Bot ${byPrices.bot}`,
        `🇷🇺 RU: Astro ${ruPrices.astro} | Next ${ruPrices.next} | App ${ruPrices.app} | Bot ${ruPrices.bot}`,
        `🇰🇿 KZ: Astro ${kzPrices.astro} | Next ${kzPrices.next} | App ${kzPrices.app} | Bot ${kzPrices.bot}`,
        `🇬🇧 UK: Astro ${gbPrices.astro} | Next ${gbPrices.next} | App ${gbPrices.app} | Bot ${gbPrices.bot}`,
        `🇪🇺 EU: Astro ${euPrices.astro} | Next ${euPrices.next} | App ${euPrices.app} | Bot ${euPrices.bot} (PL ${plPrice} / CZ ${czPrice})`,
        `🇺🇸 US: Astro ${usPrices.astro} | Next ${usPrices.next} | App ${usPrices.app} | Bot ${usPrices.bot}`,
        ``,
        `Обновлено ${locations.length} городов ✅`,
    ].join('\n');

    // Тестовый вывод для аудита — всегда показываем сгенерированное TG-сообщение
    console.log('--- TG MESSAGE PREVIEW ---');
    console.log(msg);
    console.log('--- END TG PREVIEW ---');

    if (!BOT_TOKEN || !CHAT_ID) {
        console.log('⚠️  TG notification skipped (no BOT_TOKEN/CHAT_ID in env)');
        return;
    }

    try {
        const chatRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getChat?chat_id=${CHAT_ID}`).then(r => r.json());
        const pinnedId = chatRes?.result?.pinned_message?.message_id;

        let editSuccess = false;
        if (pinnedId) {
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
                await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/pinChatMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: CHAT_ID,
                        message_id: messageId,
                        disable_notification: true
                    }),
                });
            }
        }
    } catch (e) {
        console.error('TG communication failed:', e);
    }
}

async function run() {
    const GEO_DIR = path.join(process.cwd(), 'src/content/geo');
    const rates = await getExchangeRates();
    let updatedCount = 0;

    const files = readdirSync(GEO_DIR).filter(f => f.endsWith('.json'));

    for (const file of files) {
        const slug = file.replace('.json', '');
        const loc = locations.find(l => l.slug === slug);
        if (!loc) continue;

        const filePath = path.join(GEO_DIR, file);
        const content = JSON.parse(readFileSync(filePath, 'utf-8'));
        let changed = false;

        if (content.ru) {
            content.ru.faq = generateFaq(loc, 'ru', rates);
            changed = true;
        }
        if (content.en) {
            content.en.faq = generateFaq(loc, 'en', rates);
            changed = true;
        }

        if (changed) {
            writeFileSync(filePath, JSON.stringify(content, null, 2));
            updatedCount++;
        }
    }

    console.log(`✅ Prices updated for ${updatedCount} geo files.`);
    await sendTelegramNotification(rates);
}

run();
