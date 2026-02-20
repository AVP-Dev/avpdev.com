/**
 * Partytown Deprecated API Patcher
 * 
 * Patches THREE code paths in Partytown's minified production code that
 * enumerate window properties and trigger Chrome deprecation warnings:
 * 
 * 1. isValidMemberName() — the filter for property scanning loops.
 * 2. readMainInterfaces() — Object.getOwnPropertyNames(mainWindow)
 * 3. Window property copy loop — Object.getOwnPropertyNames(e).map(t=>{t in p||(p[t]=e[t])})
 *
 * Runs as a postinstall hook via package.json.
 */
import fs from 'node:fs';
import path from 'node:path';

const PARTYTOWN_LIB_PATHS = [
    'node_modules/@qwik.dev/partytown/lib',
    'node_modules/@builder.io/partytown/lib',
];

const DEPRECATED_APIS = [
    'SharedStorage',
    'AttributionReporting',
    'sharedStorage',
    'attributionReporting',
];

const FILTER_EXPR = `.filter(n=>!${JSON.stringify(DEPRECATED_APIS)}.includes(n))`;

let patchedCount = 0;

for (const libPath of PARTYTOWN_LIB_PATHS) {
    const resolvedPath = path.resolve(process.cwd(), libPath);
    if (!fs.existsSync(resolvedPath)) continue;
    patchDir(resolvedPath);
}

function patchDir(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            patchDir(full);
        } else if (entry.name.endsWith('.js')) {
            patchFile(full);
        }
    }
}

function patchFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let changed = false;
    const basename = path.basename(filePath);

    // Skip already-patched files
    if (content.includes(FILTER_EXPR)) {
        return;
    }

    // --- PATCH 1: isValidMemberName exclusion list ---
    const P1_FIND = 'i(e,"toJSON")||i(e,"constructor")||i(e,"toString")||i(e,"_"))';
    const P1_REPLACE = P1_FIND.replace(
        '||i(e,"_"))',
        `||i(e,"_")||${DEPRECATED_APIS.map(n => `e==="${n}"`).join('||')})`
    );
    if (content.includes(P1_FIND)) {
        content = content.replaceAll(P1_FIND, P1_REPLACE);
        console.log(`  ✓ Patch 1 (isValidMemberName): ${basename}`);
        changed = true;
    }

    // --- PATCH 2: readMainInterfaces — getOwnPropertyNames(x).map for HTML/SVG elements ---
    // Pattern: Object.getOwnPropertyNames(VAR).map((VAR=>((VAR,VAR,VAR,VAR)=>{if(VAR=VAR.match(/^(HTML|SVG)
    const p2regex = /(Object\.getOwnPropertyNames\(\w+\))\.map\(\(\w+=>\(\(\w+,\w+,\w+,\w+\)=>\{if\(\w+=\w+\.match\(\/\^\(HTML\|SVG\)/;
    if (p2regex.test(content)) {
        content = content.replace(p2regex, (match, gopn) => {
            return match.replace(gopn + '.map(', gopn + FILTER_EXPR + '.map(');
        });
        console.log(`  ✓ Patch 2 (readMainInterfaces): ${basename}`);
        changed = true;
    }

    // --- PATCH 3: Window property copy loop ---
    // Pattern: Object.getOwnPropertyNames(e).map((t=>{t in p||(p[t]=e[t])}))
    const P3_FIND = 'Object.getOwnPropertyNames(e).map((t=>{t in p||(p[t]=e[t])}))';
    const P3_REPLACE = `Object.getOwnPropertyNames(e)${FILTER_EXPR}.map((t=>{t in p||(p[t]=e[t])}))`;
    if (content.includes(P3_FIND)) {
        content = content.replaceAll(P3_FIND, P3_REPLACE);
        console.log(`  ✓ Patch 3 (window property copy): ${basename}`);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf-8');
        patchedCount++;
    }
}

console.log(patchedCount > 0
    ? `[partytown-patch] Done! Patched ${patchedCount} file(s).`
    : '[partytown-patch] No files needed patching.'
);
