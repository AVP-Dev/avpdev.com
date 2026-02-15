
import type { AstroIntegration } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

// This integration patches the generated Partytown library files in public/~partytown
// to remove checks for deprecated APIs that cause browser warnings.
export default function partytownSanitizer(): AstroIntegration {
  return {
    name: 'partytown-sanitizer',
    hooks: {
      'astro:server:setup': async () => {
        // Run on dev server start
        patchAllPartytownFiles();
      },
      'astro:build:done': async () => {
        // Run after build
        patchAllPartytownFiles();
      }
    },
  };
}

function patchAllPartytownFiles() {
  try {
    const publicDir = path.resolve('public/~partytown');
    const filesToPatch = [
      path.join(publicDir, 'debug', 'partytown-sandbox-sw.js')
      // Add other files if needed, but the warning comes from sandbox-sw.js
    ];

    filesToPatch.forEach(file => {
      if (fs.existsSync(file)) {
        try {
          let content = fs.readFileSync(file, 'utf-8');

          // Target: || memberName === "SharedStorage" || memberName === "AttributionReporting"
          // We'll use a flexible regex to catch variations in minification/formatting
          const deprecatedCheckPattern = /\|\|\s*memberName\s*===\s*"SharedStorage"\s*\|\|\s*memberName\s*===\s*"AttributionReporting"/g;

          if (deprecatedCheckPattern.test(content)) {
            const newContent = content.replace(deprecatedCheckPattern, '');
            fs.writeFileSync(file, newContent, 'utf-8');
            //console.log(`[partytown-sanitizer] Patched ${file}`);
          }
        } catch (e) {
          //console.error(`[partytown-sanitizer] Failed to patch ${file}`, e);
        }
      }
    });
  } catch (e) { }
}
