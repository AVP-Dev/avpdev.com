// src/pages/api/sendBrief.ts
import type { APIRoute } from 'astro';
import sanitizeHtml from 'sanitize-html';
import { BriefFormSchema } from '../../lib/schemas';

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
        console.log('📨 Brief form received:', JSON.stringify(data, null, 2));

        // Валидация с помощью Zod
        const validationResult = BriefFormSchema.safeParse(data);

        if (!validationResult.success) {
            console.error('❌ Validation failed:', validationResult.error.issues);
            return new Response(JSON.stringify({
                success: false,
                message: "Ошибка валидации",
                errors: validationResult.error.issues,
            }), { status: 400 });
        }

        const validatedData = validationResult.data;

        // Log that consent was given
        console.log(`Brief form submission - Consent: ${validatedData.consent}`);

        // Санитизация всех строковых полей перед отправкой
        const sanitizedData = Object.fromEntries(
            Object.entries(validatedData).map(([key, value]) => {
                if (typeof value === 'string') {
                    return [key, cleanInput(value)];
                }
                // Для массивов строк (например, 'features')
                if (Array.isArray(value) && value.every(item => typeof item === 'string')) {
                    return [key, value.map(item => cleanInput(item))];
                }
                return [key, value];
            })
        );


        const shortMessage = `<b>🔥 Новый бриф на разработку!</b>\n\n<b>От:</b> ${sanitizedData.company_name}\n<b>Контакт:</b> ${sanitizedData.contacts}`;
        const jsonData = JSON.stringify(sanitizedData, null, 2);
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

        return new Response(JSON.stringify({
            success: true,
            message: "Success"
        }), { status: 200 });

    } catch (error) {
        console.error("Критическая ошибка в /api/sendBrief:", error);
        return new Response(JSON.stringify({
            success: false,
            message: "Server error"
        }), { status: 500 });
    }
};