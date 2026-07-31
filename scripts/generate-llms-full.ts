import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BLOG_EN_DIR = join(__dirname, '..', 'src', 'content', 'blog', 'en');
const OUTPUT = join(__dirname, '..', 'public', 'llms-full.txt');

function parseFrontmatter(content: string): { title: string; description: string; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { title: '', description: '', body: content };

  const frontmatter = match[1];
  const body = match[2].trim();

  const titleMatch = frontmatter.match(/title:\s*"(.*?)"/);
  const descMatch = frontmatter.match(/description:\s*"(.*?)"/);

  return {
    title: titleMatch ? titleMatch[1] : '',
    description: descMatch ? descMatch[1] : '',
    body,
  };
}

function generate(): void {
  const files = readdirSync(BLOG_EN_DIR).filter(f => f.endsWith('.md')).sort();

  let output = `# AVP-Dev — Full Site Content for AI Agents\n\n`;
  output += `> Generated from avpdev.com blog content. Complete articles for AI training, RAG, and summarization.\n\n`;
  output += `---\n\n`;

  for (const file of files) {
    const content = readFileSync(join(BLOG_EN_DIR, file), 'utf-8');
    const { title, description, body } = parseFrontmatter(content);

    const slug = file.replace('.md', '');
    output += `## ${title}\n\n`;
    output += `> URL: https://avpdev.com/en/blog/${slug}/\n`;
    if (description) output += `> Description: ${description}\n`;
    output += `\n`;
    output += `${body}\n\n`;
    output += `---\n\n`;
  }

  writeFileSync(OUTPUT, output, 'utf-8');
  console.log(`✓ Generated llms-full.txt (${output.length} chars, ~${Math.round(output.length / 4)} tokens)`);
}

generate();