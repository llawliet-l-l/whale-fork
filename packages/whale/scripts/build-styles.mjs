/*
 * Builds dist/styles.css.
 *
 * Radix Themes ships a fully flattened stylesheet (no @import rules), so we
 * inline it rather than re-exporting it with `@import '@radix-ui/themes/...'`.
 * A bare specifier inside CSS has to be resolved by the consumer's bundler,
 * which is exactly the kind of thing that works in Vite and then surprises
 * someone in Next.js. Inlining makes the file work anywhere unchanged.
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
  '/* @rango/whale — design system styles */',
  readFileSync(join(packageRoot, 'src', 'styles.css'), 'utf8'),
].join('\n');

const outputDirectory = join(packageRoot, 'dist');
mkdirSync(outputDirectory, { recursive: true });
writeFileSync(join(outputDirectory, 'styles.css'), output, 'utf8');

const kilobytes = Math.round(Buffer.byteLength(output) / 1024);
console.log(`CSS  dist/styles.css  ${kilobytes} KB (radix ${radixVersion})`);
