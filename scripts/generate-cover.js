import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const width = 1920;
const height = 1080;

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Gradients -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#07090e" />
      <stop offset="50%" stop-color="#0c1017" />
      <stop offset="100%" stop-color="#05070a" />
    </linearGradient>

    <radialGradient id="leftGlow" cx="20%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00f5a0" stop-opacity="0.18" />
      <stop offset="50%" stop-color="#00c8ff" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="rightGlow" cx="80%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#9333ea" stop-opacity="0.22" />
      <stop offset="50%" stop-color="#ec4899" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="centerGlow" cx="50%" cy="50%" r="40%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>

    <linearGradient id="codeBorder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00f5a0" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#00c8ff" stop-opacity="0.2" />
    </linearGradient>

    <linearGradient id="aiBorder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#c084fc" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#ec4899" stop-opacity="0.2" />
    </linearGradient>

    <linearGradient id="centerBorder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#818cf8" stop-opacity="0.4" />
    </linearGradient>

    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="12" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1e293b" stroke-width="1" stroke-opacity="0.35" />
      <circle cx="60" cy="0" r="1.5" fill="#334155" opacity="0.6" />
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
  <rect width="${width}" height="${height}" fill="url(#grid)" />
  <rect width="${width}" height="${height}" fill="url(#leftGlow)" />
  <rect width="${width}" height="${height}" fill="url(#rightGlow)" />
  <rect width="${width}" height="${height}" fill="url(#centerGlow)" />

  <!-- Background Connecting Circuit Lines -->
  <g opacity="0.4">
    <path d="M 150,250 L 500,250 L 650,400 L 960,400" fill="none" stroke="#00f5a0" stroke-width="2" stroke-dasharray="6,6" />
    <path d="M 150,850 L 500,850 L 680,680 L 960,680" fill="none" stroke="#00c8ff" stroke-width="2" stroke-dasharray="8,8" />
    <path d="M 1770,250 L 1420,250 L 1270,400 L 960,400" fill="none" stroke="#c084fc" stroke-width="2" stroke-dasharray="6,6" />
    <path d="M 1770,850 L 1420,850 L 1240,680 L 960,680" fill="none" stroke="#ec4899" stroke-width="2" stroke-dasharray="8,8" />
    
    <!-- Central Bridge Bus -->
    <line x1="580" y1="540" x2="1340" y2="540" stroke="#38bdf8" stroke-width="3" filter="url(#softGlow)" />
    <line x1="580" y1="540" x2="1340" y2="540" stroke="#ffffff" stroke-width="1" />
  </g>

  <!-- LEFT PANEL: Deterministic Code & Parsers -->
  <g transform="translate(180, 220)">
    <!-- Card Frame -->
    <rect width="460" height="640" rx="24" fill="#0b111e" fill-opacity="0.85" stroke="url(#codeBorder)" stroke-width="2" filter="url(#softGlow)" />
    
    <!-- Header Bar -->
    <rect x="24" y="24" width="412" height="50" rx="12" fill="#131e30" />
    <circle cx="50" cy="49" r="6" fill="#ef4444" opacity="0.8"/>
    <circle cx="70" cy="49" r="6" fill="#f59e0b" opacity="0.8"/>
    <circle cx="90" cy="49" r="6" fill="#10b981" opacity="0.8"/>
    <text x="120" y="55" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="16" letter-spacing="1">DETERMINISTIC_PARSER.TS</text>
    <rect x="330" y="36" width="94" height="26" rx="6" fill="#00f5a0" fill-opacity="0.15" />
    <text x="342" y="53" fill="#00f5a0" font-family="monospace" font-weight="700" font-size="12">100% EXACT</text>

    <!-- Structured Data Stream Blocks -->
    <!-- Block 1 -->
    <g transform="translate(24, 100)">
      <rect width="412" height="105" rx="14" fill="#070d18" stroke="#1e293b" stroke-width="1.5"/>
      <text x="20" y="32" fill="#00f5a0" font-family="monospace" font-size="14" font-weight="bold">📥 RAW INGESTION: GSC &amp; ADS</text>
      <text x="20" y="58" fill="#64748b" font-family="monospace" font-size="13">&gt; Processing 500,000+ records</text>
      <text x="20" y="80" fill="#38bdf8" font-family="monospace" font-size="13">&gt; Latency: 2.4ms | Zero Loss</text>
      <circle cx="380" cy="50" r="14" fill="#00f5a0" fill-opacity="0.1"/>
      <path d="M374 50 L386 50 M380 44 L386 50 L380 56" stroke="#00f5a0" stroke-width="2" fill="none" stroke-linecap="round"/>
    </g>

    <!-- Block 2 -->
    <g transform="translate(24, 225)">
      <rect width="412" height="115" rx="14" fill="#070d18" stroke="#1e293b" stroke-width="1.5"/>
      <text x="20" y="32" fill="#38bdf8" font-family="monospace" font-size="14" font-weight="bold">⚙️ DE-DUPLICATION &amp; NORMALIZATION</text>
      <text x="20" y="58" fill="#cbd5e1" font-family="monospace" font-size="13">normalizeTypos(query);</text>
      <text x="20" y="80" fill="#cbd5e1" font-family="monospace" font-size="13">filterNegativePatterns(regex);</text>
      <text x="20" y="100" fill="#10b981" font-family="monospace" font-size="12">✓ 48,219 unique semantic nodes</text>
    </g>

    <!-- Block 3 -->
    <g transform="translate(24, 360)">
      <rect width="412" height="120" rx="14" fill="#070d18" stroke="#1e293b" stroke-width="1.5"/>
      <text x="20" y="32" fill="#f59e0b" font-family="monospace" font-size="14" font-weight="bold">📊 DELTA CALCULATION</text>
      <text x="20" y="58" fill="#64748b" font-family="monospace" font-size="13">const missingGaps = diff(gsc, activeAds);</text>
      <rect x="20" y="74" width="372" height="30" rx="6" fill="#1e293b" fill-opacity="0.6"/>
      <text x="32" y="94" fill="#fbbf24" font-family="monospace" font-size="12" font-weight="bold">FOUND 420 UNCLAIMED HIGH-INTENT GAPS</text>
    </g>

    <!-- Metrics Footer -->
    <g transform="translate(24, 500)">
      <rect width="195" height="110" rx="14" fill="#0f172a" stroke="#334155" stroke-width="1"/>
      <text x="20" y="35" fill="#94a3b8" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="1">ACCURACY</text>
      <text x="20" y="75" fill="#00f5a0" font-family="sans-serif" font-size="34" font-weight="900">100%</text>
      <text x="20" y="95" fill="#64748b" font-family="sans-serif" font-size="11">Deterministic</text>
    </g>

    <g transform="translate(241, 500)">
      <rect width="195" height="110" rx="14" fill="#0f172a" stroke="#334155" stroke-width="1"/>
      <text x="20" y="35" fill="#94a3b8" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="1">EXECUTION</text>
      <text x="20" y="75" fill="#38bdf8" font-family="sans-serif" font-size="34" font-weight="900">&lt; 5ms</text>
      <text x="20" y="95" fill="#64748b" font-family="sans-serif" font-size="11">Instant Batch</text>
    </g>
  </g>

  <!-- CENTER: HYBRID ARCHITECTURE HUB (THE SANDWICH CORE) -->
  <g transform="translate(770, 310)">
    <!-- Central Glowing Ring -->
    <circle cx="190" cy="230" r="170" fill="#070c18" stroke="url(#centerBorder)" stroke-width="3" filter="url(#glow)" />
    <circle cx="190" cy="230" r="140" fill="#0d1527" stroke="#1e293b" stroke-width="1.5" />
    <circle cx="190" cy="230" r="105" fill="#080e1a" stroke="#38bdf8" stroke-width="2" stroke-dasharray="6,4" />

    <!-- Center Icon / Graphic -->
    <g transform="translate(190, 230)">
      <!-- Pulsing core -->
      <circle cx="0" cy="0" r="45" fill="#38bdf8" fill-opacity="0.15" filter="url(#softGlow)"/>
      <circle cx="0" cy="0" r="28" fill="#38bdf8" fill-opacity="0.8"/>
      <path d="M-14 -10 L14 -10 L0 16 Z" fill="#ffffff"/>
      <path d="M-10 12 L10 12 L0 -14 Z" fill="#080e1a"/>
    </g>

    <!-- Top Badge -->
    <rect x="75" y="45" width="230" height="42" rx="21" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" />
    <text x="190" y="72" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="14" text-anchor="middle" letter-spacing="1.5">HYBRID PIPELINE</text>

    <!-- Bottom Badge -->
    <rect x="65" y="375" width="250" height="42" rx="21" fill="#1e293b" stroke="#a855f7" stroke-width="1.5" />
    <text x="190" y="402" fill="#c084fc" font-family="sans-serif" font-weight="bold" font-size="13" text-anchor="middle" letter-spacing="1">CLEAN DELTA → LLM</text>
  </g>

  <!-- RIGHT PANEL: Semantic AI Synthesis -->
  <g transform="translate(1280, 220)">
    <!-- Card Frame -->
    <rect width="460" height="640" rx="24" fill="#120c1d" fill-opacity="0.85" stroke="url(#aiBorder)" stroke-width="2" filter="url(#softGlow)" />
    
    <!-- Header Bar -->
    <rect x="24" y="24" width="412" height="50" rx="12" fill="#201332" />
    <circle cx="50" cy="49" r="6" fill="#ec4899" opacity="0.8"/>
    <circle cx="70" cy="49" r="6" fill="#a855f7" opacity="0.8"/>
    <circle cx="90" cy="49" r="6" fill="#6366f1" opacity="0.8"/>
    <text x="120" y="55" fill="#d8b4fe" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="16" letter-spacing="1">SEMANTIC_SYNTHESIS.AI</text>
    <rect x="330" y="36" width="94" height="26" rx="6" fill="#a855f7" fill-opacity="0.25" />
    <text x="345" y="53" fill="#e9d5ff" font-family="monospace" font-weight="700" font-size="12">LLM ENGINE</text>

    <!-- AI Task Blocks -->
    <!-- Block 1 -->
    <g transform="translate(24, 100)">
      <rect width="412" height="105" rx="14" fill="#0e0717" stroke="#2e1065" stroke-width="1.5"/>
      <text x="20" y="32" fill="#c084fc" font-family="monospace" font-size="14" font-weight="bold">🧠 CONTEXTUAL REASONING</text>
      <text x="20" y="58" fill="#a855f7" font-family="monospace" font-size="13">&gt; Input: 420 filtered clean gaps</text>
      <text x="20" y="80" fill="#e9d5ff" font-family="monospace" font-size="13">&gt; Analyzing User Intent &amp; Pain Points</text>
      <circle cx="380" cy="50" r="14" fill="#a855f7" fill-opacity="0.2"/>
      <circle cx="380" cy="50" r="5" fill="#f472b6"/>
    </g>

    <!-- Block 2 -->
    <g transform="translate(24, 225)">
      <rect width="412" height="115" rx="14" fill="#0e0717" stroke="#2e1065" stroke-width="1.5"/>
      <text x="20" y="32" fill="#f472b6" font-family="monospace" font-size="14" font-weight="bold">✍️ CREATIVE AD COPY &amp; HEADLINES</text>
      <text x="20" y="58" fill="#fbcfe8" font-family="monospace" font-size="13">"Automate Your Business Flow in Days"</text>
      <text x="20" y="80" fill="#fbcfe8" font-family="monospace" font-size="13">"Custom CRM &amp; AI Integration That Works"</text>
      <text x="20" y="100" fill="#a855f7" font-family="monospace" font-size="12">✓ High-Converting Tone-of-Voice</text>
    </g>

    <!-- Block 3 -->
    <g transform="translate(24, 360)">
      <rect width="412" height="120" rx="14" fill="#0e0717" stroke="#2e1065" stroke-width="1.5"/>
      <text x="20" y="32" fill="#38bdf8" font-family="monospace" font-size="14" font-weight="bold">🛡️ STRICT SCHEMA VALIDATION</text>
      <text x="20" y="58" fill="#64748b" font-family="monospace" font-size="13">validateWithZod(aiOutput, Schema);</text>
      <rect x="20" y="74" width="372" height="30" rx="6" fill="#1e1b4b" fill-opacity="0.8"/>
      <text x="32" y="94" fill="#38bdf8" font-family="monospace" font-size="12" font-weight="bold">✓ HEADLINE &lt; 30 CHARS | EXPORT READY</text>
    </g>

    <!-- Metrics Footer -->
    <g transform="translate(24, 500)">
      <rect width="195" height="110" rx="14" fill="#1e1035" stroke="#4c1d95" stroke-width="1"/>
      <text x="20" y="35" fill="#d8b4fe" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="1">SYNTHESIS</text>
      <text x="20" y="75" fill="#f472b6" font-family="sans-serif" font-size="34" font-weight="900">SEMANTIC</text>
      <text x="20" y="95" fill="#c084fc" font-family="sans-serif" font-size="11">High Quality</text>
    </g>

    <g transform="translate(241, 500)">
      <rect width="195" height="110" rx="14" fill="#1e1035" stroke="#4c1d95" stroke-width="1"/>
      <text x="20" y="35" fill="#d8b4fe" font-family="sans-serif" font-size="12" font-weight="bold" letter-spacing="1">ZERO HALLUCINATION</text>
      <text x="20" y="75" fill="#a855f7" font-family="sans-serif" font-size="34" font-weight="900">SANDWICH</text>
      <text x="20" y="95" fill="#c084fc" font-family="sans-serif" font-size="11">Bounded by Code</text>
    </g>
  </g>

  <!-- Top Title Banner -->
  <g transform="translate(960, 100)">
    <text x="0" y="0" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="44" text-anchor="middle" letter-spacing="2">DETERMINISTIC CODE <tspan fill="#38bdf8">VS</tspan> GENERATIVE AI</text>
    <text x="0" y="36" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="18" text-anchor="middle" letter-spacing="3">ARCHITECTURAL BLUEPRINT FOR HYBRID AUTOMATION</text>
  </g>
</svg>
`;

async function main() {
  const outputPath = path.join(__dirname, '../src/assets/images/blog/ai-vs-scripts.webp');
  await sharp(Buffer.from(svg))
    .webp({ quality: 95, effort: 6 })
    .toFile(outputPath);
  console.log('Cover generated successfully at:', outputPath);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
