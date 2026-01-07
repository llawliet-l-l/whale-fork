import fs from 'fs-extra';
import path from 'path';
import {
  SEMANTIC_OUTPUT_DIRECTORY,
  COLOR_MODES,
  MEDIA_QUERY_BY_BREAKPOINT,
  TEXT_BREAKPOINTS,
  SEMANTIC_OUTPUT_TEXT_CSS,
  SEMANTIC_OUTPUT_COLOR_CSS,
  SEMANTIC_OUTPUT_HEADING_CSS,
  SEMANTIC_SELECTOR_ROOT,
  SEMANTIC_TEXT_FIXED_FILE,
  COLOR_BY_MODE,
  HEADING_BY_BREAKPOINT,
} from './constants.mjs';

import {
  buildSemanticCss,
  getSemanticSelectorTheme,
  getSemanticTempColorFileName,
  getSemanticTempHeadingFileName,
} from './utils.mjs';
import { concatAndRemove } from '../../common/utils.mjs';
import { prependCssHeader } from '../utils.mjs';

async function buildSemanticText(): Promise<void> {
  await buildSemanticCss({
    destination: SEMANTIC_OUTPUT_TEXT_CSS,
    inputFile: SEMANTIC_TEXT_FIXED_FILE,
    selector: SEMANTIC_SELECTOR_ROOT,
  });
  console.log(`  ✅ Built semantic/${SEMANTIC_OUTPUT_TEXT_CSS}`);
}

async function buildSemanticColors(): Promise<void> {
  const tempFiles: string[] = [];
  for (const mode of COLOR_MODES) {
    const tempFileName = getSemanticTempColorFileName(mode);
    tempFiles.push(path.join(SEMANTIC_OUTPUT_DIRECTORY, tempFileName));
    await buildSemanticCss({
      destination: tempFileName,
      inputFile: COLOR_BY_MODE[mode],
      selector: getSemanticSelectorTheme(mode),
    });
  }
  const final = path.join(SEMANTIC_OUTPUT_DIRECTORY, SEMANTIC_OUTPUT_COLOR_CSS);
  await concatAndRemove(tempFiles, final);
  await prependCssHeader(final);
  console.log(`  ✅ Built semantic/${SEMANTIC_OUTPUT_COLOR_CSS}`);
}

async function buildSemanticHeading(): Promise<void> {
  const tempFiles: string[] = [];
  for (const breakpoint of TEXT_BREAKPOINTS) {
    const mq = MEDIA_QUERY_BY_BREAKPOINT[breakpoint];
    const tempFileName = getSemanticTempHeadingFileName(breakpoint);
    tempFiles.push(path.join(SEMANTIC_OUTPUT_DIRECTORY, tempFileName));
    await buildSemanticCss({
      destination: tempFileName,
      inputFile: HEADING_BY_BREAKPOINT[breakpoint],
      selector: [mq, SEMANTIC_SELECTOR_ROOT],
    });
  }
  const final = path.join(
    SEMANTIC_OUTPUT_DIRECTORY,
    SEMANTIC_OUTPUT_HEADING_CSS,
  );
  await concatAndRemove(tempFiles, final);
  await prependCssHeader(final);
  console.log(`  ✅ Built semantic/${SEMANTIC_OUTPUT_HEADING_CSS}`);
}

export async function buildSemantic(): Promise<void> {
  console.log('\n' + '═'.repeat(60));
  console.log('🏗️  Building semantic tokens...');
  console.log('═'.repeat(60));
  await fs.ensureDir(SEMANTIC_OUTPUT_DIRECTORY);
  await buildSemanticText();
  await buildSemanticColors();
  await buildSemanticHeading();
}
