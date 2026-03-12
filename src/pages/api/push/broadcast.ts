import type { APIRoute } from 'astro';
import { Database } from 'bun:sqlite';
import webpush from 'web-push';
import path from 'path';
import fs from 'fs';
import { getCollection } from 'astro:content';

const dbPath = path.resolve('data/push_subscriptions.db');
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}
const db = new Database(dbPath, { create: true });

// We need a table to track which items have already been broadcasted
db.run(`
  CREATE TABLE IF NOT EXISTS sent_broadcasts (
    id TEXT PRIMARY KEY,
    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || 'mailto:admin@avpdev.com',
    process.env.PUBLIC_VAPID_KEY || '',
    process.env.VAPID_PRIVATE_KEY || ''
);

export const GET: APIRoute = async ({ request }) => {
    try {
        const urlObj = new URL(request.url);
        const secretParam = urlObj.searchParams.get('secret');
        const expectedSecret = process.env.PUSH_SECRET;

        if (!expectedSecret || secretParam !== expectedSecret) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        // Get all EN and RU posts, sort them by date descending
        const allPosts = await getCollection('blog');

        const combined = [
            ...allPosts.map((p: any) => ({ 
                id: p.id, 
                slug: p.slug.replace('ru/', '').replace('en/', ''), 
                title: p.data.title, 
                desc: p.data.description, 
                date: new Date(p.data.pubDate).getTime(),
                type: 'blog'
            })),
        ].sort((a, b) => b.date - a.date);

        // We only care about the absolute most recent one to potentially send.
        const mostRecent = combined[0];

        if (!mostRecent) {
             return new Response(JSON.stringify({ message: 'No content found' }), { status: 200 });
        }

        // Check if we already sent this
        const alreadySent = db.query('SELECT id FROM sent_broadcasts WHERE id = ?').get(mostRecent.id);

        if (alreadySent) {
            return new Response(JSON.stringify({ message: 'Already broadcasted recently', item: mostRecent.title }), { status: 200 });
        }

        // Prepare push payload based on the content
        let url = mostRecent.type === 'blog' ? `/blog/${mostRecent.slug}` : `/project/${mostRecent.slug}`;
        
        let prefix = mostRecent.id.startsWith('ru/') ? 'Новая статья в блоге!' : 'New article published!';

        const notificationPayload = JSON.stringify({
            title: prefix,
            body: mostRecent.title,
            url: url,
            icon: '/favicon-96x96.png'
        });

        // 1. Fetch subscriptions
        const subscriptions = db.query('SELECT subscription FROM subscriptions').all();
        console.log(`Sending broadcast to ${subscriptions.length} users...`);

        // 2. Send using Promise.all
        const pushPromises = subscriptions.map((row: any) => {
            const subscription = JSON.parse(row.subscription);
            return webpush.sendNotification(subscription, notificationPayload)
                .catch(err => {
                    if (err.statusCode === 404 || err.statusCode === 410) {
                        db.run('DELETE FROM subscriptions WHERE subscription = ?', row.subscription);
                    }
                });
        });

        await Promise.all(pushPromises);

        // 3. Mark as sent
        const stmt = db.prepare('INSERT INTO sent_broadcasts (id) VALUES (?)');
        stmt.run(mostRecent.id);

        return new Response(JSON.stringify({ 
            success: true, 
            sent_to: subscriptions.length,
            item: mostRecent.title 
        }), { status: 200 });

    } catch (error) {
        console.error('Broadcast error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
};
