import fs from 'node:fs';
import path from 'node:path';

// Simplified and non-recursive patch script for performance
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

    // Only target files known to cause issues
    const files = [
        'partytown.js',
        'partytown-sw.js',
        'partytown-sandbox-sw.js',
        'debug/partytown.js',
        'debug/partytown-sw.js',
        'debug/partytown-sandbox-sw.js'
    ];

    for (const file of files) {
        const fullPath = path.join(res, file);
        if (!fs.existsSync(fullPath)) continue;

        let code = fs.readFileSync(fullPath, 'utf-8');
        let changed = false;

        // Optimized Regex for property loops
        const p_enum_re = /(Object\.getOwnPropertyNames\([\w.]+\))(\.(map|forEach))\(/g;
        if (p_enum_re.test(code)) {
            if (!code.includes('.filter(')) {
                code = code.replace(p_enum_re, `$1${FILTER}$2(`);
                changed = true;
            }
        }

        if (changed) {
            fs.writeFileSync(fullPath, code, 'utf-8');
            console.log(`  ✓ Patched: ${file}`);
            patchedCount++;
        }
    }
}

console.log(`[partytown-patch] Done. Patched ${patchedCount} files.`);
