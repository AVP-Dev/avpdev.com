import type { APIRoute } from 'astro';
import { Database } from 'bun:sqlite';
import webpush from 'web-push';
import path from 'path';

import fs from 'fs';

const dbPath = path.resolve('data/push_subscriptions.db');
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}
const db = new Database(dbPath, { create: true });

// Ensure table exists just in case NO ONE has subscribed yet,
// so the select query doesn't crash throwing "no such table".
db.run(`
  CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subscription TEXT UNIQUE NOT NULL,
    lang TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || 'mailto:admin@avpdev.com',
    process.env.PUBLIC_VAPID_KEY || '',
    process.env.VAPID_PRIVATE_KEY || ''
);

export const POST: APIRoute = async ({ request }) => {
    try {
        const payload = await request.json();
        console.log('Incoming push payload:', JSON.stringify(payload));
        
        let { title, body, url, icon } = payload;
        
        // Handle Sanity webhook projection if flat variables were not provided
        if (!title && payload._type === 'post') {
            title = 'Новая статья в блоге!';
            body = payload.title?.ru || payload.title?.en || payload.title || 'Мы опубликовали новый материал.';
            url = `/blog/${payload.slug?.current || payload.slug}`;
        } else if (!title && payload._type === 'caseStudy') {
            title = 'Новый кейс в портфолио!';
            body = payload.title?.ru || payload.title?.en || payload.title || 'Посмотрите наш новый проект.';
            url = `/project/${payload.slug?.current || payload.slug}`;
        }

        // 2. Auth Check: Support header "Authorization: Bearer SECRET" OR query param "?secret=SECRET"
        const authHeader = request.headers.get('Authorization');
        const urlObj = new URL(request.url);
        const secretParam = urlObj.searchParams.get('secret');

        const expectedSecret = process.env.PUSH_SECRET;
        const isHeaderValid = authHeader === `Bearer ${expectedSecret}`;
        const isParamValid = secretParam === expectedSecret;

        if (!expectedSecret || (!isHeaderValid && !isParamValid)) {
            console.error('Push unauthorized. Header:', authHeader, 'Param:', secretParam);
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        const subscriptions = db.query('SELECT subscription FROM subscriptions').all();
        console.log(`Found ${subscriptions.length} subscriptions in DB.`);

        const notificationPayload = JSON.stringify({ title, body, url, icon });

        const pushPromises = subscriptions.map((row: any) => {
            const subscription = JSON.parse(row.subscription);
            return webpush.sendNotification(subscription, notificationPayload)
                .catch(err => {
                    if (err.statusCode === 404 || err.statusCode === 410) {
                        // Remove expired subscriptions
                        db.run('DELETE FROM subscriptions WHERE subscription = ?', row.subscription);
                    }
                    console.error('Push error:', err);
                });
        });

        await Promise.all(pushPromises);

        return new Response(JSON.stringify({ success: true, count: pushPromises.length }), { status: 200 });
    } catch (error) {
        console.error('Send push error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
};
