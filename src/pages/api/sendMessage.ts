// src/pages/api/sendMessage.ts
import type { APIRoute } from 'astro';
import sanitizeHtml from 'sanitize-html';
import { ContactFormSchema } from '../../lib/schemas';

function cleanInput(str: string | undefined | null): string {
    if (!str) return '';
    return sanitizeHtml(String(str), {
        allowedTags: [],
        allowedAttributes: {}
    });
}

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();
        console.log('📨 Contact form received:', JSON.stringify(data, null, 2));

        const result = ContactFormSchema.safeParse(data);

        if (!result.success) {
            console.error('❌ Validation failed:', result.error.issues);
            // Return standardized error response
            return new Response(JSON.stringify({
                success: false,
                message: "Validation Error",
                errors: result.error.issues
            }), { status: 400 });
        }

        const { name, email, phone, message, consent } = result.data;

        // Log that consent was given
        console.log(`Contact form submission - Consent: ${consent}`);

        const tgMessage = `<b>🔥 Новая заявка с сайта!</b>\n\n<b>Имя:</b> ${cleanInput(name)}\n<b>Email:</b> ${cleanInput(email)}\n<b>Телефон:</b> ${cleanInput(phone)}\n\n<b>Сообщение:</b>\n${cleanInput(message)}`;
        const { BOT_TOKEN, CHAT_ID, TOPIC_ID } = import.meta.env;

        if (!BOT_TOKEN || !CHAT_ID) {
            throw new Error("Переменные окружения Telegram не установлены.");
        }

        const tgResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: tgMessage,
                parse_mode: 'HTML',
                ...(TOPIC_ID && { message_thread_id: TOPIC_ID })
            }),
        });

        if (!tgResponse.ok) {
            const errorBody = await tgResponse.json();
            console.error("Ошибка API Telegram:", JSON.stringify(errorBody, null, 2));
            throw new Error('Не удалось отправить сообщение в Telegram.');
        }

        return new Response(JSON.stringify({
            success: true,
            message: "Success"
        }), { status: 200 });

    } catch (error) {
        console.error("Критическая ошибка в /api/sendMessage:", error);
        return new Response(JSON.stringify({
            success: false,
            message: "Server error"
        }), { status: 500 });
    }
};