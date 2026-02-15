import type { AstroIntegration } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Astro integration that patches Partytown library files to remove
 * references to deprecated browser APIs (SharedStorage, AttributionReporting).
 * 
 * These deprecated APIs trigger Lighthouse warnings when Partytown's
 * isValidMemberName() function checks for them during window property scanning.
 * 
 * The fix: remove the specific checks from isValidMemberName() in all
 * Partytown library files (both minified and debug versions).
 * 
 * This must run AFTER @astrojs/partytown in the integrations array,
 * since partytown copies the library files during build.
 */
export default function partytownSanitizer(): AstroIntegration {
  return {
    name: 'partytown-sanitizer',
    hooks: {
      // Dev mode: patch the source files in node_modules so the dev server
      // serves the already-patched versions via its middleware.
      'astro:server:setup': () => {
        try {
          const partytownPkg = import.meta.resolve
            ? fileURLToPath(import.meta.resolve('@qwik.dev/partytown/package.json'))
            : require.resolve('@qwik.dev/partytown/package.json');
          const libDir = path.resolve(path.dirname(partytownPkg), 'lib');
          patchDirectory(libDir);
        } catch (e) {
          console.warn('[partytown-sanitizer] Could not patch dev files:', e);
        }
      },

      // Build mode: patch the output files AFTER @astrojs/partytown copies them.
      'astro:build:done': ({ dir }) => {
        try {
          const outputPartytownDir = fileURLToPath(new URL('~partytown', dir));
          patchDirectory(outputPartytownDir);
        } catch (e) {
          console.warn('[partytown-sanitizer] Could not patch build files:', e);
        }
      },
    },
  };
}

// Pattern that matches the deprecated API checks inside isValidMemberName()
// In minified code: ||"SharedStorage"===e||"AttributionReporting"===e
// In debug code:    || memberName === "SharedStorage" || memberName === "AttributionReporting"
const DEPRECATED_API_PATTERNS = [
  /\|\|"SharedStorage"===\w\|\|"AttributionReporting"===\w/g,
  /\|\|\s*memberName\s*===\s*"SharedStorage"\s*\|\|\s*memberName\s*===\s*"AttributionReporting"/g,
];

function patchFile(filePath: string): void {
  let content = fs.readFileSync(filePath, 'utf-8');
  let patched = false;

  for (const pattern of DEPRECATED_API_PATTERNS) {
    // Reset regex lastIndex for global patterns
    pattern.lastIndex = 0;
    if (pattern.test(content)) {
      pattern.lastIndex = 0;
      content = content.replace(pattern, '');
      patched = true;
    }
  }

  if (patched) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`[partytown-sanitizer] ✓ Patched: ${path.basename(filePath)}`);
  }
}

function patchDirectory(dir: string): void {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      patchDirectory(fullPath);
    } else if (entry.name.endsWith('.js')) {
      patchFile(fullPath);
    }
  }
}
