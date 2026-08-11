/*
 * Prepends the `use client` directive to the bundled output.
 *
 * esbuild deliberately drops module-level directives when bundling (it can't
 * know which of the merged modules the directive belonged to), and rangutopia
 * exposes no banner option. Without this, importing Whale from a React Server
 * Component fails: every export is a forwardRef component, which an RSC may
 * not render, and Radix only ships the directive on some of its own files.
 *
 * Marking the whole bundle is accurate today because everything Whale exports
 * is a client component. If genuinely server-safe exports are added later,
 * they need a separate entry point rather than a relaxation here.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIRECTIVE = "'use client';";

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const bundlePath = join(packageRoot, 'dist', 'mod.js');

const source = readFileSync(bundlePath, 'utf8');

if (/^\s*['"]use client['"]/.test(source)) {
  console.log('USE  dist/mod.js already marked');
} else {
  writeFileSync(bundlePath, `${DIRECTIVE}\n${source}`, 'utf8');
  console.log('USE  dist/mod.js  prepended "use client"');
}
