import fs from 'fs-extra';
import {
  COMPONENT_OUTPUT_DIRECTORY,
  COMPONENT_OUTPUT_COLOR_CSS,
  COMPONENT_SELECTOR_THEME,
  COMPONENT_COLORS_FILE,
} from './constants.mjs';
import { buildComponentCss } from './utils.mjs';

async function buildComponentColors(): Promise<void> {
  await buildComponentCss({
    destination: COMPONENT_OUTPUT_COLOR_CSS,
    inputFile: COMPONENT_COLORS_FILE,
    selector: COMPONENT_SELECTOR_THEME,
  });
  console.log(`  ✅ Built component/${COMPONENT_OUTPUT_COLOR_CSS}`);
}

export async function buildComponent(): Promise<void> {
  console.log('\n' + '═'.repeat(60));
  console.log('🏗️  Building component tokens...');
  console.log('═'.repeat(60));
  await fs.ensureDir(COMPONENT_OUTPUT_DIRECTORY);
  await buildComponentColors();
}
