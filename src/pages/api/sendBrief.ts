// src/pages/api/sendBrief.ts
import type { APIRoute } from 'astro';
import { z } from 'zod';

// ИСПРАВЛЕННАЯ Zod-схема для валидации данных брифа
const briefSchema = z.object({
  // --- Контактные данные ---
  company_name: z.string().min(1, { message: 'Название компании обязательно' }),
  contacts: z.string().min(1, { message: 'Контактные данные обязательны' }),
  preferred_contact: z.enum(['Telegram', 'WhatsApp', 'Email', 'Звонок', 'Phone Call']),

  // --- О компании и проекте ---
  business_sphere: z.string().min(1, { message: 'Описание сферы деятельности обязательно' }),
  current_site: z.string().url({ message: 'Неверный URL текущего сайта' }).optional().or(z.literal('')),
  competitors: z.string().optional(),

  // --- Цели и задачи ---
  project_goal: z.string(), 
  success_metrics: z.string().optional(),

  // --- Целевая аудитория ---
  target_audience: z.string().optional(),
  user_action: z.string().optional(),

  // --- Тип и функционал ---
  site_type: z.string(), 
  features: z.union([z.array(z.string()), z.string()]).optional(), 
  features_other: z.string().optional(),

  // --- Дизайн и контент ---
  brand_identity: z.string().optional(),
  design_examples: z.string().optional(), 
  content_provider: z.string().optional(), 

  // --- Технические вопросы ---
  hosting_domain: z.string().optional(),
  integrations: z.string().optional(),

  // --- Бюджет и сроки ---
  budget: z.string().optional(),
  deadline: z.string().optional(),

  // --- Дополнительно ---
  additional_info: z.string().optional(),
  support: z.union([z.array(z.string()), z.string()]).optional(),
});


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

        // Валидация с помощью Zod
        const validationResult = briefSchema.safeParse(data);

        if (!validationResult.success) {
            return new Response(JSON.stringify({
                message: "Ошибка валидации",
                errors: validationResult.error.flatten().fieldErrors,
            }), { status: 400 });
        }

        const validatedData = validationResult.data;

        // Санитизация всех строковых полей перед отправкой
        const sanitizedData = Object.fromEntries(
            Object.entries(validatedData).map(([key, value]) => {
                if (typeof value === 'string') {
                    return [key, sanitizeHTML(value)];
                }
                // Для массивов строк (например, 'features')
                if (Array.isArray(value) && value.every(item => typeof item === 'string')) {
                    return [key, value.map(item => sanitizeHTML(item))];
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

        return new Response(JSON.stringify({ message: "Success" }), { status: 200 });

    } catch (error) {
        console.error("Критическая ошибка в /api/sendBrief:", error);
        return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
    }
};