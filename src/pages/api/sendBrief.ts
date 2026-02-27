// src/pages/api/sendBrief.ts
import type { APIRoute } from 'astro';
import sanitizeHtml from 'sanitize-html';
import { BriefFormSchema } from '../../lib/schemas';
import { rateLimit } from '../../lib/rateLimit';

function cleanInput(val: any): any {
    if (typeof val === 'string') {
        return sanitizeHtml(val.trim(), {
            allowedTags: [],
            allowedAttributes: {}
        });
    }
    if (Array.isArray(val)) {
        return val.map(cleanInput);
    }
    return val;
}

export const GET: APIRoute = async ({ redirect }) => {
    return redirect('/ru/', 301);
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
    try {
        // Enforce rate limiting
        const ip = clientAddress || request.headers.get('x-forwarded-for') || 'unknown';
        if (!rateLimit.check(ip)) {
            return new Response(JSON.stringify({
                success: false,
                message: "Too many requests. Please try again later."
            }), { status: 429 });
        }

        const data = await request.json();
        const result = BriefFormSchema.safeParse(data);

        if (!result.success) {
            console.error('❌ Brief validation failed:', result.error.issues);
            return new Response(JSON.stringify({
                success: false,
                message: "Validation Error",
                errors: result.error.flatten().fieldErrors,
            }), { status: 400 });
        }

        // Sanitize validated data
        const sanitizedData = Object.fromEntries(
            Object.entries(result.data).map(([key, value]) => [key, cleanInput(value)])
        );

        const shortMessage = `<b>🔥 Новый бриф на разработку!</b>\n\n<b>От:</b> ${sanitizedData.company_name}\n<b>Контакт:</b> ${sanitizedData.contacts}`;

        const jsonData = JSON.stringify(sanitizedData, null, 2);
        const jsonBlob = new Blob([jsonData], { type: 'application/json' });

        const { BOT_TOKEN, CHAT_ID, TOPIC_ID, TURNSTILE_SECRET_KEY } = import.meta.env;
        if (!BOT_TOKEN || !CHAT_ID || !TURNSTILE_SECRET_KEY) {
            throw new Error("Server configuration error: Required credentials missing.");
        }

        // Verify Turnstile Token
        const token = result.data['cf-turnstile-response'];
        const turnstileFormData = new URLSearchParams();
        turnstileFormData.append('secret', TURNSTILE_SECRET_KEY);
        turnstileFormData.append('response', token);

        const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            body: turnstileFormData,
        });

        const turnstileResult = await turnstileResponse.json();

        if (!turnstileResult.success) {
            console.error('Turnstile verification failed:', turnstileResult);
            return new Response(JSON.stringify({
                success: false,
                message: "Cloudflare Turnstile verification failed. Please try again.",
            }), { status: 403 });
        }

        const tgFormData = new FormData();
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
            console.error("Telegram API Error (sendDocument):", errorBody);
            throw new Error('Failed to send brief document to Telegram.');
        }

        return new Response(JSON.stringify({
            success: true,
            message: "Brief sent successfully"
        }), { status: 200 });

    } catch (error: any) {
        console.error("Critical error in /api/sendBrief:", error);
        return new Response(JSON.stringify({
            success: false,
            message: error.message || "Internal Server Error"
        }), { status: 500 });
    }
};