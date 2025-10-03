// src/pages/api/sendMessage.ts
import type { APIRoute } from 'astro';

// Простая функция для экранирования HTML-тегов
function sanitizeHTML(str: string | undefined | null): string {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

export const POST: APIRoute = async ({ request }) => {
    if (request.headers.get("Content-Type") !== "application/json") {
        return new Response(JSON.stringify({ message: "Unsupported media type" }), { status: 415 });
    }

    try {
        const data = await request.json();

        // Валидация на сервере
        if (!data.name || (!data.email && !data.phone) || !data.message) {
            return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
        }

        const name = sanitizeHTML(data.name);
        const email = sanitizeHTML(data.email);
        const phone = sanitizeHTML(data.phone);
        const message = sanitizeHTML(data.message);

        let tgMessage = `<b>🔥 Новая заявка с сайта!</b>\n\n`;
        tgMessage += `<b>Имя:</b> ${name}\n`;
        if (email) tgMessage += `<b>Email:</b> ${email}\n`;
        if (phone) tgMessage += `<b>Телефон:</b> ${phone}\n`;
        tgMessage += `\n<b>Сообщение:</b>\n${message}`;

        const { BOT_TOKEN, CHAT_ID, TOPIC_ID } = import.meta.env;

        if (!BOT_TOKEN || !CHAT_ID) {
            throw new Error("Telegram environment variables are not set.");
        }

        const tgPayload = {
            chat_id: CHAT_ID,
            text: tgMessage,
            parse_mode: 'HTML',
            ...(TOPIC_ID && { message_thread_id: TOPIC_ID })
        };

        const tgResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tgPayload),
        });

        if (!tgResponse.ok) {
            console.error("Telegram API response error:", await tgResponse.text());
            throw new Error('Failed to send message to Telegram.');
        }

        return new Response(JSON.stringify({ message: 'Message sent successfully!' }), { status: 200 });

    } catch (error) {
        console.error('Error processing /api/sendMessage:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
};
