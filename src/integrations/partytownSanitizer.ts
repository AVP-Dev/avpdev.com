
import type { AstroIntegration } from 'astro';

export default function partytownSanitizer(): AstroIntegration {
    return {
        name: 'partytown-sanitizer',
        hooks: {
            'astro:config:setup': ({ injectScript }) => {
                injectScript('head-inline', `
          (function() {
            var props = ['sharedStorage', 'AttributionReporting', 'attributionReporting'];
            function burn(obj) {
              if (!obj) return;
              props.forEach(function(p) {
                try {
                  if (p in obj) {
                    delete obj[p];
                    Object.defineProperty(obj, p, { value: undefined, writable: true, configurable: true, enumerable: false });
                  }
                } catch(e) {}
              });
            }
            burn(window);
            burn(window.constructor.prototype); // Window.prototype
          })();
        `);
            },
        },
    };
}
