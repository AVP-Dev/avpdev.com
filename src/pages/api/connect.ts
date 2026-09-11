// src/pages/api/connect.ts
import type { APIRoute } from 'astro';

export const prerender = false;

// ANSI escape codes for formatted terminal output in curl
const ANSI = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  magenta: '\x1b[35m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
  white: '\x1b[97m',
};

function formatUptime(seconds: number): string {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const parts: string[] = [];
  if (d > 0) parts.push(`${d}d`);
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);
  return parts.join(' ');
}

export const ALL: APIRoute = async (context) => {
  if (context.request.method !== 'GET' && context.request.method !== 'HEAD') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed', allowed: ['GET', 'HEAD'] }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Allow': 'GET, HEAD',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
  return GET(context);
};

export const GET: APIRoute = async ({ request, url }) => {
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();
  const accept = (request.headers.get('accept') || '').toLowerCase();
  const isCli = userAgent.includes('curl') || userAgent.includes('httpie') || userAgent.includes('wget');
  const formatQuery = url.searchParams.get('format');
  const action = url.searchParams.get('action');
  const rawParam = url.searchParams.get('raw');

  const uptimeSec = Math.floor(process.uptime());

  const profile = {
    status: "🟢 Available for AI Architecture & High-Load Agentic Systems",
    availability: "Available for Q2/Q3 2026",
    role: "Lead AI Solutions Architect & Systems Engineer",
    author: "Aliaksei Patskevich (AVPDev)",
    location: "Warsaw (UTC+1 / UTC+2) • Remote Worldwide",
    focus: [
      "Multi-Agent Orchestration (LangGraph / Custom Autonomous Loops / MCP)",
      "Production Vector RAG & Hybrid Retrieval (pgvector / HNSW / Cohere Rerank)",
      "Zero Vibe Coding Standards (Strict Architecture, TDD, Clean Core)",
      "High-Performance Web Platforms & Resilient Distributed Systems"
    ],
    contacts: {
      telegram: "https://t.me/AVP_Dev",
      site: "https://avpdev.com",
      github: "https://github.com/AVP-Dev",
      email: "contact@avpdev.com"
    },
    meta: {
      server_uptime: formatUptime(uptimeSec),
      server_uptime_seconds: uptimeSec,
      timestamp: new Date().toISOString(),
      node_version: process.version,
      engine: "Astro 5 (SSR Node Engine)"
    }
  };

  // 1. Raw field output (e.g., ?raw=status, ?raw=telegram)
  if (rawParam) {
    if (rawParam in profile) {
      const val = (profile as Record<string, any>)[rawParam];
      return new Response(typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val), {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      });
    }
    if (rawParam in profile.contacts) {
      return new Response(profile.contacts[rawParam as keyof typeof profile.contacts], {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      });
    }
    return new Response(`Field "${rawParam}" not found. Available: ${Object.keys(profile).join(', ')}`, {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }

  // 2. Action query: ?action=hire
  if (action === 'hire') {
    const hireText = [
      "================================================================",
      "             🤝 INITIATE ENGINEERING COLLABORATION              ",
      "================================================================",
      `Direct Telegram: ${profile.contacts.telegram}`,
      `Email:           ${profile.contacts.email}`,
      `Portfolio/Brief: ${profile.contacts.site}/ru/brief/`,
      "================================================================",
      "Send your RFC, architecture challenge, or project proposal."
    ].join('\n');

    return new Response(hireText + '\n', {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  }

  // 3. Action query: ?action=skills
  if (action === 'skills') {
    const skillsText = [
      "================================================================",
      "             ⚡ CORE ARCHITECTURE & TECH MATRIX                 ",
      "================================================================",
      ...profile.focus.map((f, i) => ` [${i + 1}] ${f}`),
      "================================================================",
      `Full dossier & projects: ${profile.contacts.site}`
    ].join('\n');

    return new Response(skillsText + '\n', {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  }

  // 4. Determine response format:
  // If ?format=json OR Accept includes application/json OR NOT curl/CLI => Return JSON
  const wantsJson = formatQuery === 'json' || accept.includes('application/json') || (!isCli && formatQuery !== 'text');

  if (wantsJson) {
    return new Response(JSON.stringify(profile, null, 2) + '\n', {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  }

  // 5. Rich ANSI-colored CLI terminal card for raw curl / httpie
  const banner = `
${ANSI.cyan}${ANSI.bold}================================================================${ANSI.reset}
${ANSI.green}${ANSI.bold}           AVP-DEV // CYBERNETIC ARCHITECTURE TELEMETRY         ${ANSI.reset}
${ANSI.cyan}================================================================${ANSI.reset}
${ANSI.bold}Status:${ANSI.reset}       ${ANSI.green}${profile.status}${ANSI.reset}
${ANSI.bold}Architect:${ANSI.reset}    ${ANSI.white}${profile.author}${ANSI.reset}
${ANSI.bold}Role:${ANSI.reset}         ${profile.role}
${ANSI.bold}Location:${ANSI.reset}     ${profile.location}

${ANSI.yellow}${ANSI.bold}Core Focus & Architecture:${ANSI.reset}
${profile.focus.map(f => `  ${ANSI.cyan}▸${ANSI.reset} ${f}`).join('\n')}

${ANSI.magenta}${ANSI.bold}Direct Uplinks:${ANSI.reset}
  ${ANSI.bold}Telegram:${ANSI.reset}   ${ANSI.bold}${profile.contacts.telegram}${ANSI.reset}
  ${ANSI.bold}Portfolio:${ANSI.reset}  ${profile.contacts.site}
  ${ANSI.bold}GitHub:${ANSI.reset}     ${profile.contacts.github}

${ANSI.gray}${ANSI.dim}Uptime: ${profile.meta.server_uptime} | Node: ${profile.meta.node_version} | UTC: ${profile.meta.timestamp}${ANSI.reset}
${ANSI.cyan}================================================================${ANSI.reset}
${ANSI.dim}Hints:
  • curl -s https://avpdev.com/api/connect | jq '.status'
  • curl -s https://avpdev.com/api/connect?raw=status
  • curl -s https://avpdev.com/api/connect?action=hire${ANSI.reset}
`;

  return new Response(banner + '\n', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    }
  });
};
