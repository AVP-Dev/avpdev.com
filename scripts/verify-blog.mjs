// scripts/verify-blog.mjs
// Invariant test for blog content: validates frontmatter, RU<->EN parity, and internal blog links.

import fs from 'node:fs';
import path from 'node:path';

const BLOG_DIR = path.resolve('src/content/blog');
const RU_DIR = path.join(BLOG_DIR, 'ru');
const EN_DIR = path.join(BLOG_DIR, 'en');

function parseFrontmatter(content, filePath) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    throw new Error(`Missing frontmatter in ${filePath}`);
  }
  const lines = match[1].split(/\r?\n/);
  const data = {};
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.slice(1, -1);
    } else if (val.startsWith("'") && val.endsWith("'")) {
      val = val.slice(1, -1);
    }
    data[key] = val;
  }
  return { frontmatter: data, body: content.slice(match[0].length) };
}

function getArticles(dir, lang) {
  if (!fs.existsSync(dir)) return new Map();
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  const articles = new Map();
  for (const f of files) {
    const slug = f.replace(/\.(md|mdx)$/, '');
    const fullPath = path.join(dir, f);
    const content = fs.readFileSync(fullPath, 'utf8');
    const parsed = parseFrontmatter(content, fullPath);
    articles.set(slug, { slug, lang, fullPath, ...parsed });
  }
  return articles;
}

const ruArticles = getArticles(RU_DIR, 'ru');
const enArticles = getArticles(EN_DIR, 'en');
const allArticles = new Map([
  ...Array.from(ruArticles.entries()).map(([slug, item]) => [`ru/${slug}`, item]),
  ...Array.from(enArticles.entries()).map(([slug, item]) => [`en/${slug}`, item]),
]);

let errors = 0;
let totalCheckedLinks = 0;

console.log(`Verifying blog articles: RU=${ruArticles.size}, EN=${enArticles.size}`);

// 1. Validate frontmatter
for (const [slug, item] of allArticles.entries()) {
  const { frontmatter, fullPath, lang } = item;
  if (!frontmatter.title) {
    console.error(`[ERROR] ${lang}/${slug}: Missing title`);
    errors++;
  }
  if (!frontmatter.description) {
    console.error(`[ERROR] ${lang}/${slug}: Missing description`);
    errors++;
  } else if (frontmatter.description.length > 160) {
    console.error(`[ERROR] ${lang}/${slug}: Description exceeds 160 chars (${frontmatter.description.length})`);
    errors++;
  }
  if (!frontmatter.pubDate) {
    console.error(`[ERROR] ${lang}/${slug}: Missing pubDate`);
    errors++;
  }
}

// 2. Validate translation pairs
for (const [slug, item] of ruArticles.entries()) {
  const targetSlug = item.frontmatter.translationSlug || slug;
  if (!enArticles.has(targetSlug)) {
    console.error(`[ERROR] RU/${slug}: No EN counterpart found for target slug "${targetSlug}"`);
    errors++;
  }
}

for (const [slug, item] of enArticles.entries()) {
  const targetSlug = item.frontmatter.translationSlug || slug;
  if (!ruArticles.has(targetSlug)) {
    console.error(`[ERROR] EN/${slug}: No RU counterpart found for target slug "${targetSlug}"`);
    errors++;
  }
}

// 3. Validate internal blog links inside markdown
const linkRegex = /\]\(((?:\/(?:ru|en)\/blog\/[^)#\s]+)(?:#[^)]*)?)\)/g;

for (const [slug, item] of allArticles.entries()) {
  const { body, fullPath, lang } = item;
  let match;
  while ((match = linkRegex.exec(body)) !== null) {
    totalCheckedLinks++;
    const rawUrl = match[1];
    const pathOnly = rawUrl.split('#')[0].replace(/\/$/, '');
    const parts = pathOnly.split('/');
    // Expected format: ['', 'ru'|'en', 'blog', '<target-slug>']
    const targetLang = parts[1];
    const targetSlug = parts[3];

    const targetMap = targetLang === 'ru' ? ruArticles : enArticles;
    if (!targetMap.has(targetSlug)) {
      console.error(`[ERROR] ${lang}/${slug}: Broken internal link to ${rawUrl} (target slug "${targetSlug}" does not exist in ${targetLang})`);
      errors++;
    }
  }
}

console.log(`\nVerification summary:`);
console.log(`- Articles checked: ${allArticles.size}`);
console.log(`- Internal blog links checked: ${totalCheckedLinks}`);
console.log(`- Errors: ${errors}`);

if (errors > 0) {
  process.exit(1);
} else {
  console.log('All blog invariant checks passed successfully.');
  process.exit(0);
}
