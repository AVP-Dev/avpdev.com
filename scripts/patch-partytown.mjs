/**
 * Partytown Deprecated API Patcher
 * 
 * Patches TWO code paths in Partytown's minified production code:
 * 
 * 1. isValidMemberName() — the filter that decides which window properties
 *    to scan. We add SharedStorage/AttributionReporting to the exclusion list.
 * 
 * 2. readMainInterfaces() — uses Object.getOwnPropertyNames(mainWindow)
 *    which triggers Chrome deprecation warnings just by enumerating window
 *    properties. We wrap it with a .filter() to skip deprecated API names.
 *
 * Runs as a postinstall hook via package.json.
 */
import fs from 'node:fs';
import path from 'node:path';

const PARTYTOWN_LIB_PATHS = [
    'node_modules/@qwik.dev/partytown/lib',
    'node_modules/@builder.io/partytown/lib',
];

// Deprecated API names to exclude from Partytown's window scanning 
const DEPRECATED_APIS = [
    'SharedStorage',
    'AttributionReporting',
    'sharedStorage',
    'attributionReporting',
];

// --- Patch 1: isValidMemberName exclusion list ---
const PATCH1_FIND = 'i(e,"toJSON")||i(e,"constructor")||i(e,"toString")||i(e,"_"))';
const PATCH1_REPLACE = PATCH1_FIND.replace(
    '||i(e,"_"))',
    `||i(e,"_")||${DEPRECATED_APIS.map(n => `e==="${n}"`).join('||')})`
);

// --- Patch 2: Object.getOwnPropertyNames(mainWindow).map(  →  .filter().map( ---
// In minified code: Object.getOwnPropertyNames(x).map(
// The variable name for mainWindow varies, so we use a regex
const PATCH2_REGEX = /Object\.getOwnPropertyNames\((\w+)\)\.map\(\((\w+)=>\(\((\w+),(\w+),(\w+),(\w+)\)=>\{if\((\w+)=(\w+)\.match\(\/\^\(HTML\|SVG\)/;
const PATCH2_REPLACEMENT = (match, mainWinVar, eVar) => {
    const filterList = JSON.stringify(DEPRECATED_APIS);
    return match.replace(
        `Object.getOwnPropertyNames(${mainWinVar}).map(`,
        `Object.getOwnPropertyNames(${mainWinVar}).filter(n=>!${filterList}.includes(n)).map(`
    );
};

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

    // Patch 1: isValidMemberName
    if (content.includes(PATCH1_FIND)) {
        content = content.replace(PATCH1_FIND, PATCH1_REPLACE);
        console.log(`[partytown-patch] ✓ Patch 1 (isValidMemberName): ${path.basename(filePath)}`);
        changed = true;
    }

    // Patch 2: getOwnPropertyNames(mainWindow).map → .filter().map  
    if (PATCH2_REGEX.test(content)) {
        content = content.replace(PATCH2_REGEX, PATCH2_REPLACEMENT);
        console.log(`[partytown-patch] ✓ Patch 2 (getOwnPropertyNames): ${path.basename(filePath)}`);
        changed = true;
    }

    // Patch 2b: simpler approach — just filter any getOwnPropertyNames that feeds to HTML/SVG element matching
    // Find the pattern: getOwnPropertyNames(VAR).map((VAR=>((VAR,VAR,VAR,VAR)=>{if(VAR=VAR.match(/^(HTML|SVG)
    const simpleRegex = /(Object\.getOwnPropertyNames\(\w+\))\.map\(\(\w+=>\(\(\w+,\w+,\w+,\w+\)=>\{if\(\w+=\w+\.match\(\/\^\(HTML\|SVG\)/;
    if (!changed || simpleRegex.test(content)) {
        const filterExpr = `.filter(n=>!${JSON.stringify(DEPRECATED_APIS)}.includes(n))`;
        if (!content.includes(filterExpr)) {
            content = content.replace(
                simpleRegex,
                (match, getOwnPart) => match.replace(getOwnPart + '.map(', getOwnPart + filterExpr + '.map(')
            );
            if (simpleRegex.test(content) === false && content.includes(filterExpr)) {
                console.log(`[partytown-patch] ✓ Patch 2 (getOwnPropertyNames filter): ${path.basename(filePath)}`);
                changed = true;
            }
        }
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf-8');
        patchedCount++;
    }
}

if (patchedCount > 0) {
    console.log(`[partytown-patch] Done! Patched ${patchedCount} file(s).`);
} else {
    console.log('[partytown-patch] No files needed patching (already patched or pattern not found).');
}
