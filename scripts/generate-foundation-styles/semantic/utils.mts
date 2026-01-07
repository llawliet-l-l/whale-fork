import path from 'path';
import StyleDictionary from 'style-dictionary';

import {
  DEFAULT_STYLE_DICTIONARY_CONFIG,
  TOKENS_DIRECTORY,
  WHALE_PREFIX,
} from '../config.mjs';
import type {
  BuildSemanticConfig,
  ColorMode,
  TextBreakpoint,
} from './types.js';
import { getPrimitiveSources } from '../primitive/utils.mjs';
import type { PlatformConfig } from 'style-dictionary/types';
import {
  SEMANTIC_OUTPUT_DIRECTORY,
  SEMANTIC_OUTPUT_TEXT_CSS,
  SEMANTIC_OUTPUT_COLOR_CSS,
  SEMANTIC_OUTPUT_HEADING_CSS,
} from './constants.mjs';
import { ensureFilesExist } from '../../common/utils.mjs';
import { prependCssHeader } from '../utils.mjs';

export function getSemanticSelectorTheme(mode: ColorMode): string {
  return `[data-theme="${mode}"]`;
}

export function getSemanticTempColorFileName(mode: ColorMode): string {
  return `color.${mode}.css`;
}

export function getSemanticTempHeadingFileName(
  breakpoint: TextBreakpoint,
): string {
  return `heading.${breakpoint}.css`;
}

export async function buildSemanticCss(config: BuildSemanticConfig) {
  const { inputFile, destination, selector } = config;

  const semanticInputPath = path.join(TOKENS_DIRECTORY, inputFile);
  const sourcePaths = [...getPrimitiveSources(), semanticInputPath];
  await ensureFilesExist(sourcePaths);

  const platform: PlatformConfig = {
    css: {
      transformGroup: 'css',
      buildPath: path.join(SEMANTIC_OUTPUT_DIRECTORY, '/'),
      prefix: WHALE_PREFIX,
      files: [
        {
          destination: destination,
          format: 'css/variables',
          options: {
            showFileHeader: false,
          },
        },
      ],
    },
  };

  platform.css.files[0].filter = function onlyKeepSemanticInputTokens(token: {
    filePath?: string;
  }) {
    return token.filePath === semanticInputPath;
  };

  platform.css.files[0].options.outputReferences = true;
  if (selector) {
    platform.css.files[0].options.selector = selector;
  }

  const dictionary = new StyleDictionary({
    source: sourcePaths,
    platforms: platform,
    ...DEFAULT_STYLE_DICTIONARY_CONFIG,
  } as const);

  await dictionary.buildAllPlatforms();

  const outputPath = path.join(SEMANTIC_OUTPUT_DIRECTORY, destination);
  const isTempFile =
    destination.includes('.') &&
    destination !== SEMANTIC_OUTPUT_TEXT_CSS &&
    destination !== SEMANTIC_OUTPUT_COLOR_CSS &&
    destination !== SEMANTIC_OUTPUT_HEADING_CSS;
  if (!isTempFile) {
    await prependCssHeader(outputPath);
  }
  return outputPath;
}
