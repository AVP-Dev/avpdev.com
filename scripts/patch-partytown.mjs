import fs from 'node:fs';
import path from 'node:path';

// Improved patch script to silence SharedStorage and AttributionReporting
const PT_PATHS = [
    'node_modules/@qwik.dev/partytown/lib',
    'node_modules/@builder.io/partytown/lib',
];

const S_S = '"Sha"+"redSt"+"orage"';
const A_R = '"Attri"+"bution"+"Repor"+"ting"';
const s_s = '"shared"+"Storage"';
const a_r = '"attribu"+"tionRepo"+"rting"';

const FILTER = `.filter(_=>![${S_S},${A_R},${s_s},${a_r}].includes(_))`;

console.log('[partytown-patch] Starting...');

let patchedCount = 0;

for (const p of PT_PATHS) {
    const res = path.resolve(process.cwd(), p);
    if (!fs.existsSync(res)) continue;

    // Scan all .js and .html files (for sandbox)
    function walk(dir) {
        for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
            const full = path.join(dir, ent.name);
            if (ent.isDirectory()) walk(full);
            else if (ent.name.endsWith('.js') || ent.name.endsWith('.html')) patch(full);
        }
    }

    walk(res);
}

function patch(fullPath) {
    let code = fs.readFileSync(fullPath, 'utf-8');
    let changed = false;
    const isJS = fullPath.endsWith('.js');

    // 1. JS: Optimized Regex for property loops
    if (isJS) {
        const p_enum_re = /(Object\.getOwnPropertyNames\([\w.]+\))(\.(map|forEach))\(/g;
        if (p_enum_re.test(code)) {
            if (!code.includes('.filter(')) {
                code = code.replace(p_enum_re, `$1${FILTER}$2(`);
                changed = true;
            }
        }
    }

    // 2. Global: String replacement for common warning triggers
    // Direct replacement of problematic strings in code/html
    const targets = [
        ['sharedStorage', '""'],
        ['attributionReporting', '""']
    ];

    for (const [target, replacement] of targets) {
        if (code.includes(target) && !code.includes('/*patched*/')) {
            // Be careful not to break paths or valid logic, but in PT sandbox these are usually property lookups
            // We'll target them if they look like standalone property strings
            const re = new RegExp(`['"]${target}['"]`, 'g');
            if (re.test(code)) {
                code = code.replace(re, replacement);
                changed = true;
            }
        }
    }

    if (changed) {
        fs.writeFileSync(fullPath, code + (isJS ? '\n/*patched*/' : '<!--patched-->'), 'utf-8');
        console.log(`  ✓ Patched: ${path.basename(fullPath)}`);
        patchedCount++;
    }
}

console.log(`[partytown-patch] Done. Patched ${patchedCount} files.`);
