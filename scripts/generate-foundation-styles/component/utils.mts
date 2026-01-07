import path from 'path';
import StyleDictionary from 'style-dictionary';

import {
  DEFAULT_CSS_PLATFORM,
  DEFAULT_STYLE_DICTIONARY_CONFIG,
  TOKENS_DIRECTORY,
} from '../config.mjs';
import type { BuildSemanticConfig } from '../semantic/types.js';
import { COLOR_BY_MODE } from '../semantic/constants.mjs';
import { getPrimitiveSources } from '../primitive/utils.mjs';
import { ensureFilesExist } from '../../common/utils.mjs';
import type { PlatformConfig } from 'style-dictionary/types';
import { COMPONENT_OUTPUT_DIRECTORY } from './constants.mjs';
import { prependCssHeader } from '../utils.mjs';

export async function buildComponentCss(config: BuildSemanticConfig) {
  const { inputFile, destination, selector } = config;

  const lightColorSourcePath = path.join(
    TOKENS_DIRECTORY,
    COLOR_BY_MODE['light'],
  );
  const sourcePaths = [
    ...getPrimitiveSources(),
    lightColorSourcePath,
    inputFile,
  ];
  await ensureFilesExist(sourcePaths);

  const platform = JSON.parse(
    JSON.stringify(DEFAULT_CSS_PLATFORM),
  ) as PlatformConfig;

  platform.css.buildPath = path.join(COMPONENT_OUTPUT_DIRECTORY, '/');
  platform.css.files[0].destination = destination;

  platform.css.files[0].filter = (token: { filePath?: string }) =>
    token.filePath === inputFile;
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

  const outputPath = path.join(COMPONENT_OUTPUT_DIRECTORY, destination);
  await prependCssHeader(outputPath);
  return outputPath;
}
