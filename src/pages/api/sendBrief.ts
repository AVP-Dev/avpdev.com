// src/pages/api/sendBrief.ts
import type { APIRoute } from 'astro';

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
    try {
        const data = await request.json();

        if (!data.company_name || !data.contacts) {
            return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
        }

        const shortMessage = `<b>🔥 Новый бриф на разработку!</b>\n\n<b>От:</b> ${sanitizeHTML(data.company_name)}\n<b>Контакт:</b> ${sanitizeHTML(data.contacts)}`;
        const jsonData = JSON.stringify(data, null, 2);
        const jsonBlob = new Blob([jsonData], { type: 'application/json' });

        const tgFormData = new FormData();
        const { BOT_TOKEN, CHAT_ID, TOPIC_ID } = import.meta.env;

        if (!BOT_TOKEN || !CHAT_ID) throw new Error("Переменные окружения Telegram не установлены.");

        tgFormData.append('chat_id', CHAT_ID);
        tgFormData.append('caption', shortMessage);
        tgFormData.append('parse_mode', 'HTML');
        tgFormData.append('document', jsonBlob, `brief-${new Date().toISOString()}.json`);
        if (TOPIC_ID) tgFormData.append('message_thread_id', TOPIC_ID);

        const tgResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
            method: 'POST',
            body: tgFormData,
        });

        if (!tgResponse.ok) {
            const errorBody = await tgResponse.json();
            console.error("Ошибка API Telegram при отправке документа:", JSON.stringify(errorBody, null, 2));
            throw new Error('Не удалось отправить бриф в Telegram.');
        }

        return new Response(JSON.stringify({ message: "Success" }), { status: 200 });

    } catch (error) {
        console.error("Критическая ошибка в /api/sendBrief:", error);
        return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
    }
};

