import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

console.log('--- Running Partytown Global Sandbox Sanitizer ---');

const DEPRECATED_API_PATTERNS = [
    /\|\|"SharedStorage"===\w\|\|"AttributionReporting"===\w/g,
    /\|\|\s*memberName\s*===\s*"SharedStorage"\s*\|\|\s*memberName\s*===\s*"AttributionReporting"/g,
    /\|\|"SharedStorage"===.*?\|\|"AttributionReporting"===.*?/g,
    /"SharedStorage"/g,
    /'SharedStorage'/g,
    /"AttributionReporting"/g,
    /'AttributionReporting'/g,
    /"attributionReporting"/g,
    /'attributionReporting'/g,
    /"sharedStorage"/g,
    /'sharedStorage'/g
];

function patchFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let patched = false;

    for (const pattern of DEPRECATED_API_PATTERNS) {
        pattern.lastIndex = 0;
        if (pattern.test(content)) {
            pattern.lastIndex = 0;
            content = content.replace(pattern, '"_patched_"');
            patched = true;
        }
    }

    if (patched) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`[partytown-sanitizer] Patched: ${path.basename(filePath)}`);
    }
}

function patchDirectory(dir) {
    if (!fs.existsSync(dir)) return;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            patchDirectory(fullPath);
        } else if (entry.name.endsWith('.js') || entry.name.endsWith('.html')) {
            patchFile(fullPath);
        }
    }
}

try {
    const partytownPkg = import.meta.resolve
        ? fileURLToPath(import.meta.resolve('@qwik.dev/partytown/package.json'))
        : require.resolve('@qwik.dev/partytown/package.json');
    const libDir = path.resolve(path.dirname(partytownPkg), 'lib');

    patchDirectory(libDir);
    console.log('--- Partytown Sanitization Complete ---');
} catch (e) {
    console.warn('Could not locate @qwik.dev/partytown. Is it installed?', e);
}
