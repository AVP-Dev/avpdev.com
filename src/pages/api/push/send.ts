import type { APIRoute } from 'astro';
import { Database } from 'bun:sqlite';
import webpush from 'web-push';
import path from 'path';

const dbPath = path.resolve('data/push_subscriptions.db');
const db = new Database(dbPath);

webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || 'mailto:admin@avpdev.com',
    process.env.PUBLIC_VAPID_KEY || '',
    process.env.VAPID_PRIVATE_KEY || ''
);

export const POST: APIRoute = async ({ request }) => {
    try {
        const { title, body, url, icon } = await request.json();
        const authHeader = request.headers.get('Authorization');

        // Simple secret check for security (should be in env)
        if (authHeader !== `Bearer ${process.env.PUSH_SECRET}`) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        const subscriptions = db.query('SELECT subscription FROM subscriptions').all();
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
