import type { APIRoute } from 'astro';
import { Database } from 'bun:sqlite';
import path from 'path';

const dbPath = path.resolve('data/push_subscriptions.db');
const db = new Database(dbPath, { create: true });

// Initialize DB table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subscription TEXT UNIQUE NOT NULL,
    lang TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export const POST: APIRoute = async ({ request }) => {
  try {
    const { subscription, lang } = await request.json();

    if (!subscription) {
      return new Response(JSON.stringify({ error: 'Subscription is required' }), { status: 400 });
    }

    const stmt = db.prepare('INSERT OR IGNORE INTO subscriptions (subscription, lang) VALUES (?, ?)');
    stmt.run(JSON.stringify(subscription), lang);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Subscription error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};
