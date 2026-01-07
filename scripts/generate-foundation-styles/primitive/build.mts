import path from 'path';
import StyleDictionary from 'style-dictionary';
import 'style-dictionary-utils';
import fs from 'fs-extra';
import { DEFAULT_STYLE_DICTIONARY_CONFIG, WHALE_PREFIX } from '../config.mjs';
import {
  PRIMITIVE_INPUT_FILES,
  PRIMITIVE_OUTPUT_DIRECTORY,
  PRIMITIVE_TYPOGRAPHY_TRANSFORMS,
} from './constants.mjs';
import type { PlatformConfig } from 'style-dictionary/types';
import { prependCssHeader } from '../utils.mjs';

export async function buildPrimitives() {
  console.log('═'.repeat(60));
  console.log('🏗️  Building primitive tokens...');
  console.log('═'.repeat(60));
  await fs.ensureDir(PRIMITIVE_OUTPUT_DIRECTORY);

  for (const file of PRIMITIVE_INPUT_FILES) {
    const { name, src } = file;
    const exists = await fs.pathExists(src);
    if (!exists) {
      throw new Error(`Input not found: ${src}`);
    }

    const outputFileName = `${name}.css`;
    const platform: PlatformConfig = {
      css: {
        transformGroup: 'css',
        buildPath: path.join(PRIMITIVE_OUTPUT_DIRECTORY, '/'),
        prefix: WHALE_PREFIX,
        files: [
          {
            destination: outputFileName,
            format: 'css/variables',
            options: {
              showFileHeader: false,
            },
          },
        ],
      },
    };

    if (name === 'typography') {
      platform.css.transformGroup = undefined;
      platform.css.transforms = [...PRIMITIVE_TYPOGRAPHY_TRANSFORMS];
    }

    const sd = new StyleDictionary({
      source: [src],
      platforms: platform,
      ...DEFAULT_STYLE_DICTIONARY_CONFIG,
    } as const);

    await sd.buildAllPlatforms();
    const outputPath = path.join(PRIMITIVE_OUTPUT_DIRECTORY, outputFileName);
    await prependCssHeader(outputPath);
    console.log(`  ✅ Built primitive/${outputFileName}`);
  }
}
