/*
 * Builds dist/styles.css.
 *
 * Radix Themes ships a fully flattened stylesheet (no @import rules), so we
 * inline it rather than re-exporting it with `@import '@radix-ui/themes/...'`.
 * A bare specifier inside CSS is not portable: Parcel resolves CSS imports
 * relative to the importing file and never falls back to node_modules — it
 * requires its own `npm:` scheme — so a published stylesheet whose first line
 * is a bare @import cannot be bundled by a Parcel app at all, and there is
 * nothing that app can do about it short of patching node_modules. Inlining
 * makes the file work anywhere unchanged.
 *
 * Which Radix version gets baked in is pinned exactly in package.json, since
 * inlining takes a copy: without the pin a later rebuild could quietly ship
 * different CSS than the one this package was tested against.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

const radixRoot = dirname(require.resolve('@radix-ui/themes/package.json'));
const radixVersion = JSON.parse(
  readFileSync(join(radixRoot, 'package.json'), 'utf8'),
).version;

const output = [
  `/* @radix-ui/themes@${radixVersion} — inlined at build time */`,
  readFileSync(join(radixRoot, 'styles.css'), 'utf8'),
  '/* @arthur2079/whale3 — design system styles */',
  readFileSync(join(packageRoot, 'src', 'styles.css'), 'utf8'),
].join('\n');

const outputDirectory = join(packageRoot, 'dist');
mkdirSync(outputDirectory, { recursive: true });
writeFileSync(join(outputDirectory, 'styles.css'), output, 'utf8');

const kilobytes = Math.round(Buffer.byteLength(output) / 1024);
console.log(`CSS  dist/styles.css  ${kilobytes} KB (radix ${radixVersion})`);
