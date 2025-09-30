// src/pages/api/sendBrief.ts
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
    if (!request.headers.get("Content-Type")?.includes("application/json")) {
        return new Response(JSON.stringify({ message: "Unsupported media type" }), { status: 415 });
    }

    try {
        const data = await request.json();

        // 1. Подготовка короткого сообщения для Telegram
        const { company_name, contacts, preferred_contact } = data;
        const shortMessage = `<b>🔥 Новый бриф на разработку!</b>\n\n<b>От:</b> ${company_name || 'Не указано'}\n<b>Контакт:</b> ${contacts || 'Не указан'}\n<b>Способ связи:</b> ${preferred_contact || 'Не указан'}`;

        // 2. Создание JSON файла в памяти из всех данных брифа
        const jsonData = JSON.stringify(data, null, 2);
        const jsonBlob = new Blob([jsonData], { type: 'application/json' });

        // 3. Подготовка FormData для отправки файла в Telegram
        const formData = new FormData();
        const { BOT_TOKEN, CHAT_ID, TOPIC_ID } = import.meta.env;

        if (!BOT_TOKEN || !CHAT_ID) {
            throw new Error("Переменные окружения Telegram (BOT_TOKEN или CHAT_ID) не установлены.");
        }

        formData.append('chat_id', CHAT_ID);
        formData.append('caption', shortMessage);
        formData.append('parse_mode', 'HTML');
        // Прикрепляем Blob как файл
        formData.append('document', jsonBlob, `brief-${new Date().toISOString()}.json`);

        if (TOPIC_ID) {
            formData.append('message_thread_id', TOPIC_ID);
        }

        // 4. Отправка документа в Telegram
        const tgResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
            method: 'POST',
            body: formData, // fetch автоматически установит правильный Content-Type для FormData
        });

        if (!tgResponse.ok) {
            const errorText = await tgResponse.text();
            console.error("Ошибка от API Telegram:", errorText);
            throw new Error(`Не удалось отправить документ в Telegram. Статус: ${tgResponse.status}`);
        }

        return new Response(JSON.stringify({ message: 'Brief sent successfully!' }), { status: 200 });

    } catch (error) {
        console.error('Критическая ошибка при обработке брифа:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
};
