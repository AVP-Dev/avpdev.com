/**
 * Partytown Deprecated API Patcher
 * 
 * Patches the minified isValidMemberName() function inside partytown-sw.js
 * to exclude SharedStorage and AttributionReporting from window property scanning.
 * 
 * Without this patch, Partytown enumerates ALL window properties and Chrome
 * fires deprecation warnings for these APIs.
 * 
 * Runs as a postinstall hook via package.json.
 */
import fs from 'node:fs';
import path from 'node:path';

const PARTYTOWN_LIB_PATHS = [
    'node_modules/@qwik.dev/partytown/lib',
    'node_modules/@builder.io/partytown/lib',
];

// The exact minified isValidMemberName pattern in production partytown-sw.js
const ORIGINAL = 'i(e,"toJSON")||i(e,"constructor")||i(e,"toString")||i(e,"_"))';
const PATCHED = 'i(e,"toJSON")||i(e,"constructor")||i(e,"toString")||i(e,"_")||i(e,"SharedStorage")||i(e,"AttributionReporting")||i(e,"sharedStorage")||i(e,"attributionReporting"))';

let patchedCount = 0;

for (const libPath of PARTYTOWN_LIB_PATHS) {
    const resolvedPath = path.resolve(process.cwd(), libPath);
    if (!fs.existsSync(resolvedPath)) continue;

    // Patch all JS files recursively (production + debug)
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
    if (content.includes(ORIGINAL) && !content.includes('SharedStorage')) {
        content = content.replace(ORIGINAL, PATCHED);
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`[partytown-patch] ✓ Patched: ${path.basename(filePath)}`);
        patchedCount++;
    }
}

if (patchedCount > 0) {
    console.log(`[partytown-patch] Done! Patched ${patchedCount} file(s).`);
} else {
    console.log('[partytown-patch] No files needed patching (already patched or pattern not found).');
}
