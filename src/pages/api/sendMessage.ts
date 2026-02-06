// src/pages/api/sendMessage.ts
import type { APIRoute } from 'astro';
import sanitizeHtml from 'sanitize-html';
import { ContactFormSchema } from '../../lib/schemas';

function cleanInput(str: string | undefined | null): string {
    if (!str) return '';
    return sanitizeHtml(String(str).trim(), {
        allowedTags: [],
        allowedAttributes: {}
    });
}

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();
        const result = ContactFormSchema.safeParse(data);

        if (!result.success) {
            console.error('❌ Validation failed:', result.error.issues);
            return new Response(JSON.stringify({
                success: false,
                message: "Validation Error",
                errors: result.error.flatten().fieldErrors
            }), { status: 400 });
        }

        const { name, contact, message } = result.data;

        const tgMessage = [
            `<b>🔥 Новая заявка с сайта!</b>`,
            `<b>Имя:</b> ${cleanInput(name)}`,
            `<b>Контакты:</b> ${cleanInput(contact)}`,
            `\n<b>Сообщение:</b>\n${cleanInput(message)}`
        ].join('\n');

        const { BOT_TOKEN, CHAT_ID, TOPIC_ID } = import.meta.env;

        if (!BOT_TOKEN || !CHAT_ID) {
            throw new Error("Server configuration error: Telegram credentials missing.");
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
            console.error("Telegram API Error:", errorBody);
            throw new Error('Failed to send message to Telegram.');
        }

        return new Response(JSON.stringify({
            success: true,
            message: "Message sent successfully"
        }), { status: 200 });

    } catch (error: any) {
        console.error("Critical error in /api/sendMessage:", error);
        return new Response(JSON.stringify({
            success: false,
            message: error.message || "Internal Server Error"
        }), { status: 500 });
    }
};