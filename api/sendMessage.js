const fetch = require('node-fetch');

/**
 * Экранирует специальные HTML-символы.
 * @param {string} str - Входная строка.
 * @returns {string} - Безопасная строка.
 */
function sanitizeHTML(str) {
    if (!str) return '';
    const tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };
    return str.replace(/[&<>"']/g, (tag) => tagsToReplace[tag] || tag);
}

module.exports = async (request, response) => {
    if (request.method !== 'POST') {
        return response.status(405).json({ message: 'Only POST requests are allowed' });
    }

    try {
        const { BOT_TOKEN, CHAT_ID, TOPIC_ID = null } = process.env;

        if (!BOT_TOKEN || !CHAT_ID) {
            console.error("Server config error: BOT_TOKEN or CHAT_ID is missing.");
            return response.status(500).json({ message: 'Server configuration error.' });
        }
        
        const { name, email, phone, message } = request.body;

        if (!name || !message || (!email && !phone)) {
            return response.status(400).json({ message: 'Required fields are missing.' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            return response.status(400).json({ message: 'Invalid email format.' });
        }
        
        const safeName = sanitizeHTML(name);
        const safeMessage = sanitizeHTML(message);
        const safePhone = sanitizeHTML(phone);
        const safeEmail = sanitizeHTML(email);

        let text = `<b>🔥 Новая заявка с сайта AVPdev.com!</b>\n\n`;
        text += `<b>Имя:</b> ${safeName}\n`;
        if (safeEmail) text += `<b>Email:</b> <a href="mailto:${safeEmail}">${safeEmail}</a>\n`;
        if (safePhone) text += `<b>Телефон:</b> <code>${safePhone}</code>\n`;
        text += `\n<b>Сообщение:</b>\n${safeMessage}`;

        const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        
        const payload = {
            chat_id: CHAT_ID,
            text: text,
            parse_mode: 'HTML',
        };

        if (TOPIC_ID) {
            payload.message_thread_id = TOPIC_ID;
        }

        const telegramResponse = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!telegramResponse.ok) {
            const telegramResult = await telegramResponse.json();
            console.error('Telegram API Error:', telegramResult);
            return response.status(502).json({ message: `Telegram API Error: ${telegramResult.description}` });
        }
        
        return response.status(200).json({ message: 'Message sent successfully!' });

    } catch (error) {
        console.error('Critical function error:', error);
        return response.status(500).json({ message: 'An internal server error occurred.' });
    }
};
