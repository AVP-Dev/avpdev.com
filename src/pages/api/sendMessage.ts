// src/pages/api/sendMessage.ts
import type { APIRoute } from 'astro';
import { z } from 'zod';

function sanitizeHTML(str: string | undefined | null): string {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

const contactSchema = z.object({
    name: z.string().min(1),
    email: z.string().email().optional().or(z.literal('')),
    phone: z.string().optional(),
    message: z.string().min(1),
}).refine(data => data.email || data.phone, {
    message: "Email or phone is required",
});

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();
        const result = contactSchema.safeParse(data);

        if (!result.success) {
            // Возвращаем ошибку валидации
            return new Response(JSON.stringify({ message: "Invalid input" }), { status: 400 });
        }

        const { name, email, phone, message } = result.data;

        const tgMessage = `<b>🔥 Новая заявка с сайта!</b>\n\n<b>Имя:</b> ${sanitizeHTML(name)}\n<b>Email:</b> ${sanitizeHTML(email)}\n<b>Телефон:</b> ${sanitizeHTML(phone)}\n\n<b>Сообщение:</b>\n${sanitizeHTML(message)}`;
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

        return new Response(JSON.stringify({ message: "Success" }), { status: 200 });

    } catch (error) {
        console.error("Критическая ошибка в /api/sendMessage:", error);
        return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
    }
};

