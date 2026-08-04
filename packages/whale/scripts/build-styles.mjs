/*
 * Copies src/styles.css to dist/styles.css.
 *
 * A step is needed at all because rangutopia's esbuild pass only emits JS —
 * nothing else would place the stylesheet in dist. The file itself just
 * `@import`s the Radix stylesheet, so the consumer's bundler resolves that bare
 * specifier and can dedupe it against a direct Radix import.
 */
import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(packageRoot, 'src', 'styles.css');
const outputDirectory = join(packageRoot, 'dist');

mkdirSync(outputDirectory, { recursive: true });
copyFileSync(source, join(outputDirectory, 'styles.css'));

console.log(`CSS  dist/styles.css  ${statSync(source).size} bytes`);
