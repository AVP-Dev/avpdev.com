import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const PT_PATHS = [
    'node_modules/@qwik.dev/partytown/lib',
    'node_modules/@builder.io/partytown/lib',
];

const S_S = '"Sha"+"redSt"+"orage"';
const A_R = '"Attri"+"bution"+"Repor"+"ting"';
const s_s = '"shared"+"Storage"';
const a_r = '"attribu"+"tionRepo"+"rting"';

const FILTER = `.filter(_=>![${S_S},${A_R},${s_s},${a_r}].includes(_))`;

let patchedCount = 0;

for (const p of PT_PATHS) {
    const res = path.resolve(process.cwd(), p);
    if (fs.existsSync(res)) walk(res);
}

function walk(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, ent.name);
        if (ent.isDirectory()) walk(full);
        else if (ent.name.endsWith('.js')) patch(full);
    }
}

function patch(file) {
    let code = fs.readFileSync(file, 'utf-8');
    let changed = false;
    const base = path.basename(file);

    // Patch 1: isValidMemberName list (minified)
    const p1min = /i\(e,["\u0027]toString["\u0027]\)\|\|i\(e,["\u0027]_["\u0027]\)\)/g;
    if (p1min.test(code)) {
        if (!code.includes('||e===' + S_S)) {
            code = code.replace(p1min, (m) => m.replace(/\|\|i\(e,["\u0027]_["\u0027]\)\)/, `||i(e,"_")||e===${S_S}||e===${A_R}||e===${s_s}||e===${a_r})`));
            changed = true;
        }
    }

    // Patch 2: property loops (.map and .forEach)
    const p_enum_re = /(Object\.getOwnPropertyNames\([\w.]+\))(\.(map|forEach))\(/g;
    // We do NOT use .test here to avoid moving lastIndex
    const newCode = code.replace(p_enum_re, (match, g1, dotMethod, method, offset, fullText) => {
        const following = fullText.slice(offset + g1.length, offset + g1.length + 8);
        if (following === '.filter(') return match;
        changed = true;
        return g1 + FILTER + dotMethod + '(';
    });
    if (changed) code = newCode;

    // Patch 3: debug isValidMemberName
    const p_debug_re = /startsWith\(memberName, ["\u0027]_["\u0027]\)\)\)/g;
    if (p_debug_re.test(code)) {
        if (!code.includes('|| memberName===' + S_S)) {
            code = code.replace(p_debug_re, `startsWith(memberName, "_") || memberName===${S_S} || memberName===${A_R} || memberName===${s_s} || memberName===${a_r}))`);
            changed = true;
        }
    }

    if (changed) {
        const tmp = path.join(process.cwd(), '.pt-check.js');
        fs.writeFileSync(tmp, code);
        try {
            execSync(`node --check "${tmp}"`, { stdio: 'pipe' });
            fs.unlinkSync(tmp);
            fs.writeFileSync(file, code, 'utf-8');
            console.log(`  ✓ Patched: ${base}`);
            patchedCount++;
        } catch (e) {
            console.error(`  ✗ Failed: ${base}\n${e.message}`);
            if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
        }
    }
}
console.log(`[partytown-patch] Done. Patched ${patchedCount} files.`);
